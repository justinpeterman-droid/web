import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { resolveContactDeliveryMode } from "@/lib/contactDeliveryMode";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(12),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom =
    process.env.CONTACT_FROM_EMAIL ?? "Hometown Serenity <onboarding@resend.dev>";

  const deliveryMode = resolveContactDeliveryMode({
    resendApiKey,
    contactTo,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });

  if (deliveryMode === "unavailable") {
    console.error("[contact] email delivery is not configured", {
      hasResendApiKey: Boolean(resendApiKey),
      hasContactTo: Boolean(contactTo),
    });
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  if (deliveryMode === "log") {
    // Local/dev fallback so the form can be tested without secrets.
    console.info("[contact] message received", { name, email, message });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  if (!resendApiKey || !contactTo) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
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
