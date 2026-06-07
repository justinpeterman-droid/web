# Phase 3 — Site Shell

**Goal:** Build the navigation, page layouts, and all five routes with real
placeholder content — so you can click through the entire site before adding any
3D spectacle.

## Why this phase matters
A site you can navigate end to end, even with grey boxes for content, surfaces
structural problems early and cheaply. It's far easier to fix a confusing nav now
than after it's tangled with 3D and animation. This phase gives you the "bones"
to walk through.

## Prerequisites
- Phase 2 complete (tokens, types, sitemap exist).

## Decisions / inputs you provide
- Navigation labels and order (likely Home, Work, About, Contact).
- Footer content (social links, copyright, contact email).

## Steps overview
1. Build the root layout (header + main + footer landmarks).
2. Build the navigation, accessible and responsive.
3. Create all five routes with placeholder content.
4. Add App Router hygiene: `not-found.tsx`, `error.tsx`, and `loading.tsx` where useful.
5. Confirm keyboard navigation works across the whole site.

## Prompts for Cursor

**Prompt 1 — root layout:**
```
Build the App Router root layout with semantic landmarks: a <header> containing
the nav, a <main> for page content, and a <footer>. Apply our design tokens and
fonts. The layout must be the place where the persistent 3D canvas will later
mount (Phase 4) — leave a clearly commented placeholder for it ABOVE the page
content in the DOM/stacking order, but don't build the canvas yet.
```

**Prompt 2 — accessible nav:**
```
Build the primary navigation using our nav labels: [your labels]. Requirements:
- Real <a>/Link elements, keyboard-focusable, visible focus rings.
- Responsive: a clean desktop bar and an accessible mobile menu (focus trap when
  open, closes on Escape, aria-expanded on the toggle).
- Active-route styling.
Show me the approach before coding.
```

**Prompt 3 — the five routes with placeholders:**
```
Create these routes with placeholder content that reflects real structure:
- / (Home): hero placeholder block, "selected work" preview row, intro section
- /work: a grid of placeholder project cards
- /work/[slug]: a project detail template with title, meta row, image area,
  description area (use static placeholder data for now; CMS comes in Phase 7)
- /about: heading, bio placeholder, optional timeline placeholder
- /contact: heading + a placeholder form (real form comes in Phase 8)
Each route must export baseline page metadata (title + description only — full
OG/sitemap/structured data comes in Phase 10). Use semantic headings (one h1 per
page).
```

**Prompt 4 — error and loading states:**
```
Add a custom not-found.tsx and error.tsx at the app level. Add loading.tsx for
/work and /work/[slug] so navigation feels intentional while placeholders (later
CMS data) load.
```

**Prompt 5 — keyboard pass:**
```
Walk through the site using only the keyboard (Tab, Shift+Tab, Enter, Escape).
Fix anything that can't be reached or operated, and ensure focus order is logical
on every route. Report what you changed.
```

## Definition of done
- All five routes exist and are reachable from the nav.
- You can navigate the entire site with the keyboard alone, with visible focus.
- Mobile menu opens/closes correctly and traps focus.
- Each page has one `h1` and baseline metadata (title + description).
- `not-found.tsx` and `error.tsx` exist.
- A clearly commented placeholder marks where the persistent canvas will mount.

## Common pitfalls
- **Building nav as `<div onClick>` instead of links:** breaks keyboard access and
  SEO. Insist on real links.
- **Forgetting the canvas mount point:** if the placeholder isn't reserved in the
  layout now, Phase 4 gets messier. The comment is small insurance.

## Bring back to Claude
- A description (or screenshots) of the nav and page structure if anything feels
  off — UX judgment is exactly where I'm useful.

## Commit before moving on
```bash
git add -A && git commit -m "phase 3: shell, nav, five routes, keyboard-accessible"
```
