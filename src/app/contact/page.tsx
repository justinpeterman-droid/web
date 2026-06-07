import type { Metadata } from "next";
import { siteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about a project or collaboration.",
};

/**
 * Contact page (Phase 3). The form is a non-functional PLACEHOLDER — the real,
 * validated, sending form arrives in Phase 8. Fields are labelled and keyboard-
 * accessible so the structure is correct now.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
      <p className="text-muted mt-3 text-lg">
        Tell us about your project. Or email{" "}
        <a
          href={`mailto:${siteSettings.contactEmail}`}
          className="text-accent"
        >
          {siteSettings.contactEmail}
        </a>
        .
      </p>

      <form className="mt-10 flex flex-col gap-6" aria-describedby="form-note">
        <p id="form-note" className="text-subtle text-sm">
          Placeholder form — not yet wired up (Phase 8).
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="border-border bg-surface focus:border-accent rounded border px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="border-border bg-surface focus:border-accent rounded border px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="border-border bg-surface focus:border-accent rounded border px-3 py-2 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled
          className="bg-accent text-accent-foreground rounded px-5 py-3 text-sm font-medium disabled:opacity-60"
        >
          Send (coming in Phase 8)
        </button>
      </form>
    </div>
  );
}
