"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onValid = handleSubmit(
    async (values) => {
      setStatus("idle");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        // Only a genuine 2xx counts as success.
        if (!response.ok) throw new Error("Request failed");

        setStatus("success");
        reset();
      } catch {
        setStatus("error");
      }
    },
    (formErrors) => {
      // Move focus to the first field with an error for keyboard/SR users.
      const firstError = (
        ["name", "email", "message"] as const
      ).find((field) => formErrors[field]);
      if (firstError) setFocus(firstError);
    },
  );

  return (
    <form className="contact-form" onSubmit={onValid} noValidate>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="form-error" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="form-error" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="form-error" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden="true" className="contact-form__honeypot">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <button
        type="submit"
        className="button-link button-link--gold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {status === "success" ? (
        <p className="form-success" role="status">
          Thanks — your message is on its way.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-error" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
