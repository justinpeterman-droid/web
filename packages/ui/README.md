# @hometown-serenity/ui

**Sage & Obsidian Alchemy** — the shared UI primitives from the Hometown
Serenity site, extracted into a standalone, framework-agnostic package.

Six components, faithfully ported from `apps/web` (the Next.js site):

| Component | Use |
|---|---|
| `GlassPanel` | Frosted-glass container — the base surface for cards, forms, callouts |
| `ButtonLink` | Pill CTA — gold (primary), sage (secondary), ghost (quiet) |
| `SectionHeading` | Eyebrow + title + description block above content sections |
| `AccreditationBadges` | Certification seal row with credential caption and image-fallback |
| `PhantomBlendBackground` | Full-bleed desaturated/tinted ambient texture behind glass content |
| `SkipLink` | Keyboard accessibility: visually-hidden skip-to-content link |

## Install

```bash
pnpm add @hometown-serenity/ui
```

Import the stylesheet once at your app root:

```ts
import "@hometown-serenity/ui/styles.css";
```

## Conventions

- **No CSS framework dependency.** Every class is hand-authored CSS, not
  Tailwind utilities — this package works in any React app, not just ones
  running Tailwind.
- **Tokens live in `tokens.css`**, all consumed via `var(--token-name)`:
  `--obsidian`, `--sage`, `--ethereal-teal`, `--alchemy-gold`, `--parchment`,
  `--surface`, `--surface-border`, `--radius-lg`, `--radius-md`,
  `--shadow-soft`, `--focus-ring`.
- **Fonts are bundled.** `--font-display` (Outfit) for headings, `--font-sans`
  (Inter) for body text — both ship as real `@font-face` woff2 files
  (latin subset, variable weight 100–900, OFL-licensed) inside the package;
  importing `styles.css` is all that's needed. Falls back to `system-ui` only
  if the stylesheet itself isn't imported.
- **No router/image-optimizer dependency.** `ButtonLink` renders a plain
  `<a>` by default; pass your own `linkComponent` (e.g. Next.js `Link`) for
  internal navigation. `AccreditationBadges` / `PhantomBlendBackground` use
  plain `<img>`.
- **No provider/wrapper required.** Every component renders standalone —
  there's no ThemeProvider or context to wrap the tree in.

## Example

```tsx
import { GlassPanel, ButtonLink, SectionHeading } from "@hometown-serenity/ui";
import "@hometown-serenity/ui/styles.css";

function ServiceCard() {
  return (
    <GlassPanel glow="gold" className="p-6">
      <SectionHeading
        eyebrow="The Grounding"
        title="1:1 Integration Session"
        description="Personalized clinical hypnotherapy and behavioral coaching in a grounded, somatic-aware container."
      />
      <ButtonLink href="https://calendar.app.google/example" variant="gold" className="mt-6">
        Schedule Session
      </ButtonLink>
    </GlassPanel>
  );
}
```

## Source of truth

This package is a faithful extraction from `apps/web`'s
`src/components/ui/` and `src/app/globals.css` (Sage & Obsidian Alchemy
tokens). If the app's design system changes, port the change here too —
there is no build-time link between the two; keeping them in sync is manual.
