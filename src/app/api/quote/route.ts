import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  const body = await request.json();
  const result = quoteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  // NOTE: no email service is wired up yet — this logs the request
  // server-side so it is not silently discarded. Wire up a provider
  // (e.g. Resend) here to deliver these to sasha.spasovski@sasakomerc.mk /
  // marija.jordanova@sasakomerc.mk once one is chosen.
  console.log("[quote-request]", JSON.stringify(result.data, null, 2));

  return NextResponse.json({ ok: true });
}
