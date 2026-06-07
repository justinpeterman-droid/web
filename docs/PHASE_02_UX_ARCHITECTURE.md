# Phase 2 — UX Architecture & Design System

**Goal:** Define the design tokens, content model, sitemap, and accessibility
baseline *before* building anything visual.

## Why this phase matters
This is the phase people skip and regret. Deciding your colors, type scale,
spacing, and — crucially — what a "project" actually *is* (its fields) up front
means every later component is consistent and the CMS in Phase 7 slots in without
rework. This is where being a UX Architect rather than just a coder pays off.
Loop Claude in heavily here; it's a thinking phase more than a typing phase.

## Prerequisites
- Phase 1 complete.

## Decisions / inputs you provide
This phase is mostly decisions. Have these ready (talk them through with Claude):

1. **Brand feel** — three adjectives (e.g. "precise, cinematic, warm").
2. **Color direction** — dark-immersive is typical for 3D; pick a base background,
   one or two accent colors, and text colors. Aim for AA contrast.
3. **Typography** — a display font for headings, a readable font for body. Decide a
   type scale (e.g. a modular scale from 14px body up to large hero sizes).
4. **Project fields** — for each portfolio project, what do you store? A starting
   set: title, slug, role, year, short summary, hero image, gallery images,
   description (rich text), tech/tools, external link, and which 3D scene/variant
   it uses.
5. **Spacing & radius system** — a consistent scale (e.g. 4/8/16/24/32/64) and a
   corner-radius default.

## Steps overview
1. Lock the tokens with Cursor as Tailwind theme config.
2. Write the content model down as a typed schema (used again in Phase 7).
3. Confirm the sitemap and URL structure.
4. Establish the accessibility baseline.

## Prompts for Cursor

**Prompt 1 — design tokens into Tailwind:**
```
Set up our design system as Tailwind theme tokens. Use these decisions:
- Colors: [your background, accent(s), text colors as hex]
- Fonts: [display font] for headings, [body font] for body. Load them with
  next/font for performance.
- Type scale: [your scale]
- Spacing scale: [your scale]; default border radius: [value]
Create the Tailwind theme config and a short DESIGN_TOKENS.md in the repo
documenting each token and when to use it. Verify all text/background color
pairs meet WCAG AA contrast and flag any that don't.
```

**Prompt 2 — content model as types:**
```
Create a TypeScript types file (e.g. src/types/content.ts) defining a Project
type with these fields: [list your fields from decision 4]. Add a SiteSettings
type for global content (site title, nav labels, social links, contact email).
Comment each field. We will mirror this exact shape in the Sanity CMS later, so
make the names clean and stable.
```

**Prompt 3 — sitemap + a11y baseline:**
```
Document the sitemap in a SITEMAP.md: routes /, /work, /work/[slug], /about,
/contact, with a one-line purpose for each and the primary content each holds.
Then add an ACCESSIBILITY.md baseline stating our rules: AA contrast, full
keyboard navigation with visible focus, prefers-reduced-motion support, semantic
landmarks (header/main/nav/footer), and alt text on all images. These are
acceptance criteria for every later phase.
```

## Definition of done
- Tailwind theme reflects your tokens; `DESIGN_TOKENS.md` explains them.
- `src/types/content.ts` defines `Project` and `SiteSettings`.
- `SITEMAP.md` and `ACCESSIBILITY.md` exist and match the plan.
- All chosen color pairings pass AA contrast (or you've consciously accepted any
  exceptions).

## Common pitfalls
- **Picking colors that look great but fail contrast:** dark immersive themes
  often fail on muted body text. Fix at the token stage, not per-component.
- **Vague project fields:** if "description" is sometimes a sentence and sometimes
  three paragraphs, decide now (use a rich-text field). Ambiguity here causes CMS
  rework in Phase 7.

## Bring back to Claude
- Your three brand adjectives and color picks — I'll pressure-test them for
  contrast and cohesion before you commit.
- Your draft project fields — I'll check they'll hold up against real content.

## Commit before moving on
```bash
git add -A && git commit -m "phase 2: design tokens, content model, sitemap, a11y baseline"
```
