# Phase 8 — Contact Form

**Goal:** A real, validated contact form that delivers messages to your inbox via
Resend, with spam protection and clear success/error states.

## Why this phase matters
For a marketing site, the contact form is often the single most important
conversion point — it's where interest becomes a message you can act on. A form
that silently fails, lets spam through, or gives no feedback quietly costs you
real opportunities. This phase makes that path reliable.

## Prerequisites
- Phase 3 contact route (placeholder form).
- `react-hook-form`, `zod`, `@hookform/resolvers` installed (Phase 1).
- A Resend account (Phase 0).

## Decisions / inputs you provide
- Which fields the form collects (typical: name, email, message; optionally
  subject or budget/company for business inquiries).
- The destination email address.
- Spam-protection approach (a honeypot field is simple and effective; you can add
  a service like a CAPTCHA later if spam becomes a problem).

## How it fits
The browser form is validated client-side with react-hook-form + zod for instant
feedback. On submit, it POSTs to a Next.js server route (or server action), which
re-validates with the **same** zod schema (never trust the client alone) and then
sends the email through Resend. The UI reflects loading, success, and error.

## Prompts for Cursor

**Prompt 1 — validated form UI:**
```
Build the contact form on /contact using react-hook-form + zod. Fields: [your
fields]. Requirements:
- A single zod schema shared between client and server validation.
- Accessible: each field has a real <label>, errors are associated via
  aria-describedby, the form is fully keyboard operable, and focus moves to the
  first error on failed submit.
- Visible loading state on submit; clear success and error messaging.
- A hidden honeypot field for basic spam filtering.
Show the schema and approach before coding.
```

**Prompt 2 — server handling + Resend:**
```
Create the server endpoint (server action or route handler) that the form
submits to. It must: re-validate with the same zod schema; reject submissions
that fill the honeypot; send the message via Resend to [your destination email]
with a clear subject and the submitter's details; and return structured
success/error responses the UI can use. Walk me through getting a Resend API key
and the env vars to set. Never expose the API key to the client.
```

**Prompt 3 — resilience:**
```
Harden the submission path: handle Resend failures gracefully (user sees a
friendly error and isn't told the message sent when it didn't), add basic rate
limiting to deter abuse, and log failures server-side for debugging. Confirm the
success state only shows on a genuine 2xx from Resend.
```

## Definition of done
- Submitting the form sends a real email to your inbox.
- Client and server both validate using the same schema.
- The honeypot blocks naive bots; obviously-bad input is rejected with clear
  messages.
- Loading, success, and error states all work and are accessible.
- The Resend API key lives only in server-side environment variables.
- A failed send never shows a false "success."

## Common pitfalls
- **Client-only validation:** trivially bypassed. The server must re-validate.
- **Leaking the API key:** it must never reach the browser bundle. Confirm it's
  only used server-side.
- **False success:** showing "sent!" before Resend confirms delivery. Gate success
  on the real response.
- **Inaccessible errors:** color-only error indication fails screen-reader and
  colorblind users; associate errors with fields via ARIA.

## Bring back to Claude
- Paste the server handler for review — this is security-sensitive (validation,
  key handling, rate limiting), exactly the kind of code worth a second look.
- Any Resend delivery issue with the error response.

## Commit before moving on
```bash
git add -A && git commit -m "phase 8: validated contact form with Resend delivery"
```
