# web — immersive portfolio site

A Next.js (App Router) + TypeScript + Tailwind site built around a single
**persistent React Three Fiber canvas** (Phase 4). Built phase by phase.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind 4**
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`
- Animation/scroll: `gsap`, `lenis`
- Forms/validation: `react-hook-form`, `zod`, `@hookform/resolvers`

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Status

- **Phase 1 — Scaffold:** ✅ Next.js app, pinned deps, 3D smoke test (spinning
  cube on the home page). The cube is temporary and is removed in Phase 4.

See `.cursor/rules` for the project conventions.
