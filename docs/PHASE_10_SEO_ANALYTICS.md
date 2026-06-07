# Phase 10 — SEO, Metadata & Analytics

**Goal:** Make the marketing half of the site actually work — be found in search,
look right when shared, and give you data on what visitors do.

## Why this phase matters
An immersive site that no one finds, or that shows a blank box when shared on
social media, is a beautiful object in an empty room. This phase makes the site
discoverable and shareable, and gives you analytics so you can learn what's
working. For a marketing-plus-portfolio site, this is the difference between a
showpiece and a tool that brings you opportunities.

## Prerequisites
- Phase 7 (so metadata can be content-driven) and ideally Phase 9.

## Decisions / inputs you provide
- Site name, tagline, and a default description.
- A default social-share image direction (you may want a branded card).
- Analytics choice — Vercel Analytics is the simplest given you're deploying
  there; alternatives exist if you prefer.

## What "SEO" concretely means here
Each page needs a clear title and description, a canonical URL, Open Graph and
Twitter card tags (the things that make a nice preview when shared), structured
data where it helps (e.g. marking up that this is a person/portfolio or
organization), a sitemap so search engines can find every page, and a robots file
telling crawlers what to index.

## Prompts for Cursor

**Prompt 1 — metadata system:**
```
Implement a complete metadata system using Next.js metadata APIs:
- Sensible defaults (site name, default title template, default description,
  default OG image) set globally.
- Per-route metadata: /, /work, /about, /contact each with tailored title +
  description.
- Per-project metadata on /work/[slug] driven by the project's CMS content.
- Open Graph + Twitter card tags on every page, with images.
- Canonical URLs.
Show me the structure before coding.
```

**Prompt 2 — social share images:**
```
Set up dynamic Open Graph images so shared links look intentional: a branded
default card for the main pages, and per-project OG images for /work/[slug]
generated from each project's title/role (use Next.js dynamic OG image
generation). Verify the dimensions and that they render correctly.
```

**Prompt 3 — sitemap, robots, structured data:**
```
Add an auto-generated sitemap.xml that includes all static routes plus every
project slug from the CMS, and a robots.txt. Add appropriate JSON-LD structured
data (e.g. Person or Organization for the site, and CreativeWork for projects if
suitable). Validate the structured data is well-formed.
```

**Prompt 4 — analytics:**
```
Add [Vercel Analytics / your choice] to track page views and basic engagement,
configured privacy-consciously. Confirm it loads without hurting performance and
doesn't block rendering. Tell me where I'll view the data after deploy.
```

## Definition of done
- Every route has a tailored title, description, canonical URL, and OG/Twitter
  tags.
- Project pages get content-driven metadata and per-project share images.
- `sitemap.xml` includes all routes + project slugs; `robots.txt` exists.
- Structured data is present and validates.
- Analytics is installed and won't be visible-until-deploy (that's expected).
- None of this measurably hurt the Phase 9 performance scores.

## Common pitfalls
- **Same title/description on every page:** search engines and humans both hate
  it; make each page distinct.
- **Broken or missing OG image:** the #1 reason shared links look cheap. Test the
  preview (you can fully verify only once deployed in Phase 11).
- **Analytics that blocks rendering:** load it the recommended, non-blocking way.
- **Forgetting CMS slugs in the sitemap:** the sitemap must be generated from
  live content, not a hardcoded list.

## Bring back to Claude
- Your titles/descriptions per page — I'll help make them both human-appealing
  and search-friendly.
- Anything about structured data you want explained; it's fiddly and worth
  understanding rather than copy-pasting.

## Commit before moving on
```bash
git add -A && git commit -m "phase 10: SEO metadata, OG images, sitemap, analytics"
```
