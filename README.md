# web — Immersive Portfolio + Marketing Site

A multi-page Next.js site with a **persistent React Three Fiber canvas** that stays mounted across routes. Marketing pages, portfolio case studies, CMS-ready content, and a validated contact form share one immersive stage.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind 4**
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`
- Animation/scroll: `gsap`, `lenis`
- CMS scaffold: `sanity`, `next-sanity` (mock fallback until configured)
- Forms: `react-hook-form`, `zod`, `resend`

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

Copy `.env.example` to `.env.local` and add Sanity / Resend values when you configure those services.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Hero scene + featured work |
| `/work` | Project index |
| `/work/[slug]` | Case study detail |
| `/about` | Studio story |
| `/contact` | Validated contact form |

## Architecture

One `<Canvas>` lives in the root layout. `RouteSceneSync` maps the active pathname to a scene id so navigation never tears down WebGL.

## Planning docs

Phase-by-phase build guides: [`docs/`](docs/) · Master checklist: [`docs/CHECKLIST.md`](docs/CHECKLIST.md)

## Project rules

See [`.cursor/rules/project.mdc`](.cursor/rules/project.mdc).
