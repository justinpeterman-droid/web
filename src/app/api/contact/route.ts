import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Naive in-memory rate limiter. Good enough to blunt casual abuse on a single
 * instance; swap for a shared store (Upstash/KV) if the form ever runs hot or
 * scales to multiple regions.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot: pretend success so bots don't learn the field is a trap.
  if (company && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom =
    process.env.CONTACT_FROM_EMAIL ?? "Hometown Serenity <onboarding@resend.dev>";

  if (!resendApiKey || !contactTo) {
    // Local/dev fallback so the form can be tested without secrets.
    console.info("[contact] message received", { name, email, message });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: contactFrom,
    to: contactTo,
    replyTo: email,
    subject: `Hometown Serenity inquiry from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Email delivery failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
