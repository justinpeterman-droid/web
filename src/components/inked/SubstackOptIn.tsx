"use client";

import { FormEvent, useId, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { EXTERNAL_LINKS } from "@/lib/constants";

type SubstackOptInProps = {
  title: string;
  description: string;
};

export function SubstackOptIn({ title, description }: SubstackOptInProps) {
  const [email, setEmail] = useState("");
  const emailId = useId();
  const noteId = useId();
  const subscribeUrl = EXTERNAL_LINKS.substackSubscribe;
  const canSubscribe = Boolean(subscribeUrl);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subscribeUrl || !email.trim()) return;

    const url = new URL(subscribeUrl);
    url.searchParams.set("email", email.trim());
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <GlassPanel glow="sage" className="inked-opt-in p-6 md:p-8">
      <h3 className="inked-opt-in__title">{title}</h3>
      <p className="inked-opt-in__description">{description}</p>
      <form className="inked-opt-in__form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor={emailId}>Email address</label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!canSubscribe}
            aria-describedby={noteId}
            required={canSubscribe}
          />
        </div>
        <button
          type="submit"
          className="button-link button-link--sage"
          disabled={!canSubscribe || !email.trim()}
        >
          Subscribe on Substack
        </button>
      </form>
      <p id={noteId} className="inked-opt-in__note">
        {canSubscribe
          ? "Opens Substack in a new tab with your email pre-filled."
          : "Substack subscribe URL pending — wire EXTERNAL_LINKS.substackSubscribe in constants."}
      </p>
    </GlassPanel>
  );
}
