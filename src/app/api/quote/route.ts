import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().min(1),
  email: z.string().email(),
  originCountry: z.string().min(1),
  destCountry: z.string().min(1),
  cargoType: z.string().optional(),
  weight: z.string().optional(),
  date: z.string().optional(),
  message: z.string().optional(),
  locale: z.string().optional(),
});

const QUOTE_RECIPIENT = "sasha.spasovski@sasakomerc.mk";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: z.infer<typeof quoteSchema>) {
  const rows: [string, string | undefined][] = [
    ["Име и презиме", data.name],
    ["Компанија", data.company],
    ["Телефон", data.phone],
    ["Е-маил", data.email],
    ["Товарање", data.originCountry],
    ["Достава", data.destCountry],
    ["Тип на стока", data.cargoType],
    ["Тежина / димензии", data.weight],
    ["Посакуван датум", data.date],
  ];

  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:14px;white-space:nowrap;">${label}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;">${escapeHtml(
          value!
        )}</td></tr>`
    )
    .join("");

  const messageHtml = data.message
    ? `<p style="margin-top:16px;color:#0f172a;font-size:14px;white-space:pre-wrap;">${escapeHtml(
        data.message
      )}</p>`
    : "";

  return `<div style="font-family:Arial,sans-serif;max-width:560px;">
    <h2 style="color:#0f172a;">Ново барање за понуда</h2>
    <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
    ${messageHtml}
  </div>`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = quoteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[quote-request] RESEND_API_KEY is not set; email not sent");
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 502 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "САША КОМЕРЦ веб-сајт <noreply@sasakomerc.mk>",
    to: [QUOTE_RECIPIENT],
    replyTo: result.data.email,
    subject: `Ново барање за понуда — ${result.data.name}`,
    html: buildEmailHtml(result.data),
  });

  if (error) {
    console.error("[quote-request] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "email_failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
