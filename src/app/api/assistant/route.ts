import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { locales, localeLabels } from "@/i18n/routing";
import { assistantInstructions } from "@/lib/assistant-prompt";

const MAX_HISTORY = 12;
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Tried in order, because a free-tier model can be busy or out of its daily
// quota. The last one is the slowest, so it gets the longest wait.
const MODELS = [
  { id: "gemini-3.6-flash", firstTextMs: 8_000 },
  { id: "gemini-3.5-flash-lite", firstTextMs: 25_000 },
];

const assistantSchema = z.object({
  locale: z.enum(locales),
  messages: z
    .array(
      z.discriminatedUnion("role", [
        z.object({ role: z.literal("user"), content: z.string().trim().min(1).max(1000) }),
        z.object({ role: z.literal("assistant"), content: z.string().min(1).max(6000) }),
      ])
    )
    .min(1)
    .max(MAX_HISTORY)
    .refine((messages) => messages[messages.length - 1].role === "user"),
});

// Per server instance, so one visitor can't use up the free daily quota alone.
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;

  recentRequests.set(ip, [...recent, now]);
  if (recentRequests.size > 5000) recentRequests.clear();
  return false;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function isCrossOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin !== null && origin.split("//")[1] !== request.headers.get("host");
}

export async function POST(request: Request) {
  if (isCrossOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const result = assistantSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("[assistant] GEMINI_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 502 });
  }

  // The widget sends a window of the chat, which may open on one of our replies.
  const { locale, messages } = result.data;
  const history = messages[0].role === "user" ? messages : messages.slice(1);

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async function* streamAnswer(model: string, signal: AbortSignal) {
    const events = await client.interactions.create(
      {
        model,
        stream: true,
        store: false,
        system_instruction: `${assistantInstructions}\n\nThe visitor is on the ${localeLabels[locale].name} version of the site. Write your whole answer in the language of their latest message, translating the company information, which is in Macedonian.`,
        generation_config: { max_output_tokens: 1000, thinking_level: "low" },
        input: history.map((message) => ({
          type: message.role === "user" ? ("user_input" as const) : ("model_output" as const),
          content: [{ type: "text" as const, text: message.content }],
        })),
      },
      { signal, timeout: 60_000, maxRetries: 0 }
    );

    for await (const event of events) {
      if (event.event_type === "step.delta" && event.delta.type === "text") {
        yield event.delta.text;
      } else if (event.event_type === "error") {
        throw new Error(event.error?.message ?? "stream error");
      }
    }
  }

  // Waiting for the first text means a busy model can still hand over to the
  // next one, and the widget gets a real error status if none of them answers.
  let answer: AsyncGenerator<string> | undefined;
  let firstText = "";

  for (const { id, firstTextMs } of MODELS) {
    const attempt = new AbortController();
    const timer = setTimeout(() => attempt.abort(), firstTextMs);
    request.signal.addEventListener("abort", () => attempt.abort());

    try {
      const candidate = streamAnswer(id, attempt.signal);
      const first = await candidate.next();
      if (first.done) throw new Error("empty answer");
      answer = candidate;
      firstText = first.value;
      break;
    } catch (error) {
      console.error(`[assistant] ${id} failed:`, errorMessage(error));
    } finally {
      clearTimeout(timer);
    }
  }

  if (!answer) {
    return NextResponse.json({ ok: false, error: "assistant_failed" }, { status: 502 });
  }

  const rest = answer;
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(firstText));
      try {
        for await (const text of rest) {
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("[assistant] answer cut off:", errorMessage(error));
        }
        // Ending with an error makes the widget offer the phone and WhatsApp.
        controller.error(error);
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
