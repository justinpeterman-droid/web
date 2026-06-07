# Phase 7 — CMS (Sanity)

**Goal:** Move your projects and copy out of hardcoded files and into Sanity, so
you can update the site later without writing code.

## Why this phase matters
Right now your content lives inside the code. That's fine for building, but it
means every typo fix or new project requires a developer. Connecting a CMS turns
content into something you edit in a friendly admin UI, while the site stays fast
because Next.js fetches that content at build/request time. This is what makes the
site maintainable after launch — directly relevant to your goal of using this long
term, not just shipping it once.

## Prerequisites
- Phase 2 content model (`src/types/content.ts`) — Sanity will mirror it.
- A Sanity account (from Phase 0).

## Decisions / inputs you provide
- Confirm the final list of `Project` fields (should match Phase 2).
- Your actual content: project entries, images, bio, site settings. (If you're
  still gathering these, you can seed with a few real entries and add more later.)

## How it fits
Sanity stores your content and gives you a Studio (admin UI). Next.js queries
Sanity using GROQ (Sanity's query language) and renders the pages. The
`/work/[slug]` route generates one page per project from this data.

## Prompts for Cursor

**Prompt 1 — install + schema:**
```
Integrate Sanity into this Next.js project. Install the current stable Sanity
packages and set up an embedded Sanity Studio (so I can edit content at a /studio
route). Create Sanity schemas that MIRROR our src/types/content.ts: a "project"
document with fields [list fields] and a "siteSettings" singleton with [site
title, nav labels, social links, contact email]. Use proper Sanity field types
(slug, image with alt text, rich text/portable text for descriptions, etc.).
Walk me through how to get my Sanity project ID and dataset and where to put them
as environment variables. Show the plan before coding.
```

**Prompt 2 — data fetching layer:**
```
Create a typed data-access layer: GROQ queries + functions to fetch all projects,
a single project by slug, and site settings. Return data typed against our
content types. Handle the image fields with Sanity's image URL builder, sized
appropriately and used via next/image. Add sensible revalidation/caching so
content updates appear without a full redeploy, but pages stay fast.
```

**Prompt 3 — wire the routes:**
```
Replace the placeholder content in /work, /work/[slug], /about, and the global
nav/footer with real data from Sanity:
- /work: render project cards from the projects query.
- /work/[slug]: generate static params from project slugs; render each project's
  fields, gallery (next/image), and portable-text description. Handle a missing
  slug with a proper 404.
- nav/footer: pull labels and links from siteSettings.
Keep all SEO metadata dynamic (each project page's title/description from its
content).
```

**Prompt 4 — connect 3D variants (optional but on-brand):**
```
Our project type includes a field for which 3D scene/variant a project uses. Wire
that field so each /work/[slug] page tells the persistent canvas which scene
variant to show via usePageScene. If a project has no variant set, fall back to a
default scene.
```

## Definition of done
- Sanity Studio is reachable (e.g. at `/studio`) and you can create/edit projects
  and site settings.
- `/work` and `/work/[slug]` render real CMS data; `/work/[slug]` generates one
  page per project.
- Nav/footer pull from site settings.
- Images come through `next/image` via Sanity's image pipeline.
- Editing content in the Studio updates the site (within your revalidation window)
  without a code change.
- Each project page has content-driven SEO metadata.

## Common pitfalls
- **Schema drifting from your types:** keep Sanity field names identical to
  `content.ts` so the typed layer stays honest.
- **Unoptimized Sanity images:** always size via the image builder + `next/image`;
  raw full-res images will wreck performance.
- **Secrets in the repo:** Sanity project ID/dataset go in environment variables,
  never committed. Confirm `.env*` is gitignored.

## Bring back to Claude
- Your final field list before Cursor builds the schema — cheap to get right now,
  expensive to migrate later.
- Any GROQ query returning unexpected shapes — paste the query and result.

## Commit before moving on
```bash
git add -A && git commit -m "phase 7: Sanity CMS, typed data layer, dynamic routes"
```
