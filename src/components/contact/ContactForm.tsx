"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(12, "Please share a bit more detail."),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" autoComplete="name" {...register("name")} />
        {errors.name ? (
          <p className="form-error" role="alert">
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
          {...register("email")}
        />
        {errors.email ? (
          <p className="form-error" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" rows={6} {...register("message")} />
        {errors.message ? (
          <p className="form-error" role="alert">
            {errors.message.message}
          </p>
        ) : null}
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
