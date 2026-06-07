# Immersive Portfolio + Marketing Site

A multi-page Next.js site with a **persistent React Three Fiber canvas** that stays mounted across routes. Marketing pages, portfolio case studies, CMS-ready content, and a validated contact form share one immersive stage.

## Stack

- Next.js (App Router) + TypeScript
- React Three Fiber + drei
- Tailwind CSS
- GSAP + Lenis (smooth scroll provider wired)
- Sanity client scaffold + mock fallback data
- react-hook-form + zod + Resend contact API

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and add Sanity / Resend values when you reach those phases.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Hero scene + featured work |
| `/work` | Project index |
| `/work/[slug]` | Case study detail |
| `/about` | Studio story |
| `/contact` | Validated contact form |

## Architecture highlight

One `<Canvas>` lives in the root layout. `RouteSceneSync` maps the active pathname to a scene id so navigation never tears down WebGL.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```
