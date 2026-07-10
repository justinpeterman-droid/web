# Operations — Hometown Serenity

A short, repeatable health routine plus the deploy checklist. Pair with
`MAINTENANCE.md` (content edits) and `docs/HOMETOWN_SERENITY_SITE_PLAN.md` (full
plan).

## Monthly 15-minute health check

- [ ] Site loads on production; all 6 pages + `/contact` redirect work
- [ ] Contact form sends a real test message (arrives in inbox)
- [ ] External links still resolve (booking, Jotform, social, Substack, YouTube)
- [ ] Background images and badges still render (no broken assets)
- [ ] `sitemap.xml` and `robots.txt` reachable
- [ ] Lighthouse mobile: performance > 85, accessibility = 100
- [ ] Dependencies: `pnpm outdated` — note any major bumps for a planned update

## Deploy checklist (Vercel)

- [ ] `pnpm build` clean locally
- [ ] Env vars set in Vercel:
  - `NEXT_PUBLIC_SITE_URL` (production domain, not localhost)
  - `MAINTENANCE_MODE` (`false` for full site)
  - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
  - Sanity vars (only when CMS is wired)
- [ ] First production deploy succeeds
- [ ] Post-deploy smoke: navigate all routes, submit contact form, check OG
      preview with a link-preview validator

## Environment variables reference

See `.env.example` for the full list. Secrets (`RESEND_API_KEY`) live only in
the host env — never commit them.

## Known follow-on work (post-launch)

- Sanity CMS schemas (`service`, `audioTrack`, `essay`, `siteSettings`) to make
  content editable without code — currently content is in `hometown.ts`.
- Real assets: Ashley's portrait, accreditation seals, branded backgrounds,
  audio MP3s, Dream Journal PDF (placeholders in place today).
- Confirm whether the 1:1 Integration Session booking link should differ from
  the Discovery Call link (same URL today in `EXTERNAL_LINKS`).

## Rate limiting note

The contact API uses a simple in-memory rate limit (5 requests/minute/IP). On
serverless this resets per instance — fine for current traffic. If abuse becomes
an issue, move to a shared store (Upstash/Vercel KV).
