# Design Tokens

Brand feel: **precise · cinematic · warm.** Dark-immersive theme chosen because
the site is built around a persistent 3D canvas — a calm near-black base lets 3D
and imagery carry the color.

> Tokens live in `src/app/globals.css` under `@theme` (Tailwind v4). A token like
> `--color-accent` is usable as `bg-accent`, `text-accent`, `border-accent`, etc.

## Color

| Token | Hex | Use |
|---|---|---|
| `background` | `#0B0B0D` | App base. Near-black, calm backdrop for 3D. |
| `surface` | `#16161A` | Cards, panels. |
| `surface-raised` | `#1F1F25` | Hover / elevated surfaces. |
| `border` | `#2A2A31` | Hairlines, dividers. |
| `foreground` | `#F4F4F5` | Primary text. |
| `muted` | `#A9A9B3` | Secondary text. |
| `subtle` | `#71717A` | Large/decorative text only (see contrast note). |
| `accent` | `#FF8A4C` | Warm amber. Interactive elements, highlights. |
| `accent-foreground` | `#0B0B0D` | Text/icons placed **on** accent fills. |

### WCAG AA contrast (verified)

AA requires 4.5:1 for normal text, 3:1 for large text (≥24px or ≥19px bold).

| Pair | Ratio | Result |
|---|---|---|
| `foreground` on `background` | 17.9:1 | AA ✓ |
| `muted` on `background` | 8.4:1 | AA ✓ |
| `subtle` on `background` | 4.1:1 | **AA-large only** — use ≥24px / decorative |
| `foreground` on `surface` | 16.4:1 | AA ✓ |
| `muted` on `surface` | 7.7:1 | AA ✓ |
| `muted` on `surface-raised` | 7.0:1 | AA ✓ |
| `accent` on `background` | 8.4:1 | AA ✓ |
| `accent` on `surface` | 7.7:1 | AA ✓ |
| `background` on `accent` (button labels) | 8.4:1 | AA ✓ |

**Accepted exception:** `subtle` (`#71717A`) is **not** AA for normal-size body
text. It is reserved for large headings, year stamps, and decorative meta. Do not
use it for paragraph copy — use `muted` instead.

## Typography

- **Display** (`font-display`, Space Grotesk): headings `h1`–`h3`. Geometric
  grotesk for a precise, cinematic voice.
- **Body** (`font-sans`, Geist): paragraphs, UI.
- **Mono** (`font-mono`, Geist Mono): code, year stamps, meta.

Fonts load via `next/font` (no layout shift, no external request at runtime).

### Type scale (modular ~1.25, body = 16px)

| Class | Size | Typical use |
|---|---|---|
| `text-xs` | 12px | captions, eyebrow labels |
| `text-sm` | 14px | meta, footnotes |
| `text-base` | 16px | body |
| `text-lg` | 18px | lead paragraphs |
| `text-xl` | 20px | small headings |
| `text-2xl` | 25px | h3 |
| `text-3xl` | 31px | h2 |
| `text-4xl` | 39px | h1 |
| `text-5xl` | 49px | section hero |
| `text-6xl` | 61px | page hero |
| `text-7xl` | 76px | display hero |

## Spacing

4px base scale: **4 / 8 / 16 / 24 / 32 / 64** (Tailwind `1 / 2 / 4 / 6 / 8 / 16`).
Named aliases for intent:

- `section` = 96px — vertical rhythm between major sections.
- `gutter` = 24px — default page side padding.

## Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | inputs, small chips |
| `radius` | 8px | **default** — buttons, cards |
| `radius-lg` | 16px | large cards, media |
| `radius-full` | pill | tags, avatars |

## Overriding

Everything above is centralized in `globals.css`. To rebrand, change the hex
values / font imports there — components reference tokens, not raw colors.
