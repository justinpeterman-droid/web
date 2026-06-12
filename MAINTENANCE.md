# Maintenance Guide — Hometown Serenity

How to update the site safely without reading the code. Most day-to-day changes
touch **one file**: `src/lib/content/hometown.ts` (copy) or
`src/lib/constants.ts` (links).

## Where things live

| You want to change… | Edit |
|---|---|
| Page copy (hero, bios, service text, audio/essay lists) | `src/lib/content/hometown.ts` |
| External links (booking, Jotform, social, Substack, YouTube) | `src/lib/constants.ts` → `EXTERNAL_LINKS` |
| Nav items | `src/lib/constants.ts` → `NAV_LINKS` |
| Brand colors / fonts | `src/app/globals.css` (`@theme`) + `DESIGN_TOKENS.md` |
| Background images per page | replace files in `public/images/backgrounds/` (keep filenames) |
| Logo / portrait / badges | drop files into `public/images/` per `docs/hometown-v2-spec/ASSETS.md` |

## Common tasks

### Add or edit a service, audio track, or essay
Open `src/lib/content/hometown.ts`, find the relevant array, copy an existing
entry, and change its fields. No JSX changes needed — pages read from this file.

### Wire a real external link
In `src/lib/constants.ts`, set the value in `EXTERNAL_LINKS`. Empty strings
(e.g. `substackPublication`, `youtubeChannel`) are placeholders; fill them in and
the matching buttons/embeds activate.

### Swap a placeholder image for Ashley's original
Export the asset and commit it over the existing path (same filename) listed in
`docs/hometown-v2-spec/ASSETS.md`. The current background images are licensed
stock placeholders.

### Turn the maintenance bridge on/off
Set `MAINTENANCE_MODE=true` (only the bridge page shows at `/`) or `false` (full
site live). This is an env var — change it in Vercel and redeploy. Handled by
`src/proxy.ts`.

### Enable live contact email
Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in the host env. Without them, the
form still works in dev and logs submissions to the server console.

## Preview → publish loop

1. `git checkout -b my-change`
2. Edit content/links.
3. `pnpm dev` and check it locally at http://localhost:3000.
4. `pnpm build` (must pass — this is the gate).
5. Push the branch → open a PR → review the Vercel preview deploy.
6. Merge to the default branch → Vercel deploys production.

## Before every change ships

- [ ] `pnpm build` passes
- [ ] `pnpm lint` clean
- [ ] Keyboard-navigate any page you touched; focus stays visible
- [ ] `prefers-reduced-motion` still calms the canvas/particles

## Rolling back a bad deploy

In the Vercel dashboard → **Deployments** → find the last good deploy →
**Promote to Production**. No code change needed.
