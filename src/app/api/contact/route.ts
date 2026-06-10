import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

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
