# Phase 11 — Deployment

**Goal:** Get the site live on the internet via Vercel, with environment variables
configured, a custom domain attached, and the live build confirmed working.

## Why this phase matters
This is the moment the project stops being a thing on your laptop and becomes a
real website people can visit. The reason we chose Next.js + Vercel back at the
start pays off here: deployment is close to one click, and every future Git push
can redeploy automatically. The care in this phase is mostly about environment
variables (your secret keys) and confirming the production build behaves like your
local one.

## Prerequisites
- A GitHub account and a Vercel account (Phase 0).
- All earlier phases working locally.
- Your Sanity and Resend credentials handy.

## Decisions / inputs you provide
- A custom domain (if you have one — you can launch on the free Vercel URL first
  and add a domain later).

## Steps overview
1. Push the project to a GitHub repository.
2. Import the repo into Vercel.
3. Add environment variables in Vercel.
4. Deploy and test the live site.
5. Attach your custom domain.

## Prompts for Cursor

**Prompt 1 — prep for deploy:**
```
Prepare this project for a Vercel production deploy. Confirm: .env files are
gitignored and no secrets are committed; there's a clean production build with no
errors (run the production build locally and fix anything that only breaks in
prod); and list every environment variable the app needs (Sanity project
ID/dataset, Resend API key, any analytics keys, the site's public URL) with a
one-line description of each, so I can enter them in Vercel.
```

**Prompt 2 — push to GitHub:**
```
Walk me through creating a GitHub repository and pushing this project to it,
step by step with the exact git commands. Confirm the .gitignore is correct so I
don't leak secrets.
```

**Prompt 3 — Vercel import + env vars:**
```
Walk me through importing the GitHub repo into Vercel: selecting the project,
confirming the framework preset is detected as Next.js, and entering each
environment variable from your earlier list into Vercel's project settings
(noting which must be available at build time vs runtime, and which are public
vs secret). Then trigger the first deploy.
```

**Prompt 4 — verify live:**
```
Give me a post-deploy verification checklist for the LIVE site: all five routes
load; the persistent 3D canvas works and doesn't remount on navigation; the
contact form actually sends an email in production; CMS content displays and a
content edit appears after revalidation; social share previews render correctly
(test with a link-preview/OG validator); sitemap.xml and robots.txt are
reachable; and Lighthouse mobile scores still meet our targets in production.
```

**Prompt 5 — custom domain:**
```
Walk me through attaching my custom domain [your domain] in Vercel: the DNS
records I need to add at my registrar, how to verify, and how to ensure HTTPS is
active. Also tell me how to update NEXT_PUBLIC site URL / canonical/OG URLs to use
the real domain.
```

## Definition of done
- The site is live at a Vercel URL (and your custom domain, if you added one).
- No secrets are in the repo; all keys live in Vercel env vars.
- All five routes work in production; the canvas persists across navigation.
- The contact form sends a real email from the live site.
- CMS edits appear on the live site (within revalidation).
- Share previews, sitemap, and robots all work on the live domain.
- HTTPS is active on the custom domain.

## Common pitfalls
- **"Works locally, fails in prod":** almost always a missing environment variable
  or a build-time vs runtime mismatch. Prompt 1's full env list prevents most of
  this.
- **Leaked secret in Git history:** if a key was ever committed, rotate it (issue
  a new key) — removing it from the latest commit isn't enough.
- **OG/canonical URLs still pointing at localhost:** update the public site URL to
  the real domain (Prompt 5) or share previews break.
- **DNS confusion:** propagation can take time; don't assume the domain is broken
  if it isn't live within minutes.

## Bring back to Claude
- The env-var list from Prompt 1 — I'll sanity-check you haven't missed one.
- Any production-only error with the full Vercel build log.
- DNS records you're unsure about before you change them at your registrar.

## Commit
```bash
git add -A && git commit -m "phase 11: production-ready; deployed to Vercel"
```
