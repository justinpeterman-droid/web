<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Services

| Service | Required? | Command | Notes |
|---------|-----------|---------|-------|
| Next.js dev server | Yes (dev) | `pnpm dev` | http://localhost:3000 |
| Sanity CMS | Optional | — | Mock data until `.env.local` configured |
| Resend (email) | Optional | — | Contact API needs `RESEND_API_KEY` |

### Commands

- Install: `pnpm install` (requires `allowBuilds` for `sharp` in `pnpm-workspace.yaml`)
- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`

### Architecture note

One persistent R3F `<Canvas>` in the root layout — see `src/components/canvas/` and `RouteSceneSync`. Do not mount per-page canvases.

### Planning docs

Build phases and checklist: `docs/00_MASTER_PROJECT.md`, `docs/CHECKLIST.md`.

### Env vars

Copy `.env.example` → `.env.local` for Sanity and Resend when configuring those services.
