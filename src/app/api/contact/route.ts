import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_BUCKETS = 1000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  message: z.string().min(12).max(4000),
  website: z.string().max(200).optional(),
});

function isSameOriginRequest(request: Request): boolean {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  try {
    if (origin && new URL(origin).origin !== requestOrigin) return false;
    if (!origin && referer && new URL(referer).origin === requestOrigin) return true;
  } catch {
    return false;
  }

  return origin !== null;
}

function getRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

function isRateLimited(key: string, now = Date.now()): boolean {
  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(bucketKey);
    }
  }

  const existing = rateLimitBuckets.get(key);

  if (!existing) {
    if (rateLimitBuckets.size >= MAX_RATE_LIMIT_BUCKETS) {
      return true;
    }

    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isRateLimited(getRateLimitKey(request))) {
    return NextResponse.json({ error: "Too many contact requests." }, { status: 429 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;

  if (website?.trim()) {
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
