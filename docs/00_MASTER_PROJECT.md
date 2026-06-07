# Master Project Brief — Immersive Portfolio + Marketing Site

This is the single document that orients the whole build. Keep it open while you
work. Each phase has its own file (`PHASE_00` through `PHASE_12`); this master
file explains the big picture, the stack, the core architecture idea, how to work
with Cursor and Claude together, and the order everything happens in.

---

## What you are building

A multi-page website that serves two purposes at once: marketing (it sells you or
your product and is found through search) and portfolio (it showcases your work).
It is fully immersive — real-time 3D and cinematic animation throughout — while
still loading fast and running smoothly, because performance was a design
requirement from the first decision, not an afterthought.

---

## The one idea that governs everything: the persistent canvas

A 3D scene in the browser runs inside a WebGL context. The naive approach drops a
fresh 3D scene onto every page. The problem: each navigation tears down the old
WebGL context and builds a new one, which is slow, flashes white, and leaks
memory.

The professional approach mounts **one** 3D canvas that lives *above* the entire
site and persists as you move between pages. Individual pages don't create 3D;
they simply tell the one canvas what to show. It's a stage that never goes dark —
the props and actors change between scenes, but the theater is never rebuilt.

This is why the site can feel immersive on every page yet still load fast. Almost
every architectural decision in this project exists to support this pattern.
**Phase 4 implements it. Get that phase right and everything after it is easy.**

---

## The chosen stack (and why)

| Layer | Tool | Why |
|---|---|---|
| Framework / routing | **Next.js (App Router)** + TypeScript | True multi-page routing, excellent SEO, React underneath (what the 3D ecosystem expects) |
| 3D | **React Three Fiber** + **drei** | Write Three.js the React way; drei provides ready-made helpers (loaders, controls, effects) |
| Styling | **Tailwind CSS** | Fast, consistent, no context-switching to separate CSS files |
| Scroll animation | **GSAP** + **ScrollTrigger** | Industry standard for cinematic scroll-driven sequences |
| Smooth scroll | **Lenis** | Buttery scrolling that GSAP hooks into |
| CMS | **Sanity** | Edit projects and copy without touching code; pairs cleanly with Next.js |
| Forms | **react-hook-form** + **zod** | Robust validation with clear error states |
| Email delivery | **Resend** | Simple, reliable transactional email for the contact form |
| Hosting | **Vercel** | Built by the Next.js team; near one-click deploy |
| Package manager | **pnpm** | Faster installs, stricter dependency handling |

**Version honesty:** "Newest" is a moving target and these libraries update often.
Do **not** trust any specific version number from memory. Phase 1 includes a step
to pin everything to the *latest stable* versions and confirm they are compatible
with each other. That habit matters more than any single version number.

---

## Site structure

Five routes. Multiple real pages beat one long scroll here — better for SEO (each
page ranks for different things) and for performance (each route loads only what
it needs). The persistent canvas makes all five still feel like one continuous
world.

1. **Home** (`/`) — signature hero 3D scene + a curated taste of the work
2. **Work index** (`/work`) — lists all projects
3. **Work detail** (`/work/[slug]`) — one page per project, generated from the CMS
4. **About** (`/about`)
5. **Contact** (`/contact`) — the form

---

## How to work: Cursor + Claude division of labor

**Cursor writes and edits files inside your project. Claude helps you think,
decide, debug, and review.**

Bring Claude four kinds of moments:

1. **Before each phase** — paste the phase file to Claude; get tailored advice and
   any decisions clarified before you prompt Cursor.
2. **When unsure code is right** — paste Cursor's output to Claude for a
   performance / accessibility / correctness review.
3. **When an error appears** — give Claude the message + surrounding code; get the
   *cause* explained, not just a patch.
4. **For judgment calls** — talk UX/design decisions through with Claude first,
   then take a clear instruction to Cursor.

---

## The Cursor project rules (paste once, applies to every request)

Create `.cursor/rules` (or use Settings → Rules) in your project root and paste:

```markdown
# Project Rules — Immersive Portfolio + Marketing Site

## Role
You are a Senior UX Architect and Senior Front-End Engineer specializing in
immersive, performant web experiences. You write production-quality, accessible,
well-commented code. You explain trade-offs before making non-obvious choices.

## Stack (pin to latest STABLE versions; confirm compatibility before installing)
- Next.js (App Router) + React + TypeScript
- React Three Fiber + drei for all 3D
- Tailwind CSS for styling
- GSAP + ScrollTrigger for scroll-driven animation; Lenis for smooth scroll
- Sanity for CMS content
- react-hook-form + zod for forms; Resend for transactional email
- Deploy target: Vercel

## Architecture rules (do not violate without flagging)
- Use ONE persistent R3F <Canvas> mounted at the app shell level. Pages declare
  what the canvas shows via shared state/context; never mount a new Canvas per page.
- 3D assets: use glTF with Draco compression. Lazy-load heavy models. Use
  instancing and LOD where many objects appear. Dispose of geometries/materials
  on unmount.
- Animations must respect `prefers-reduced-motion` and degrade gracefully.
- Every interactive element must be keyboard-accessible with visible focus states.
- All images use next/image. All routes have proper metadata for SEO.
- Target: Lighthouse performance > 85 on mobile, accessibility = 100.

## Working style
- When I describe a feature, first propose the file structure and approach in
  plain language, wait for my OK, THEN write code.
- Comment the WHY behind important decisions, not just the what.
- Keep components small and single-purpose. Prefer composition over giant files.
- If a request would hurt performance or accessibility, say so and offer an
  alternative before proceeding.
```

---

## Phase index

| Phase | File | What it produces |
|---|---|---|
| 0 | `PHASE_00_FOUNDATION.md` | Tools installed, Cursor configured, Git initialized |
| 1 | `PHASE_01_SCAFFOLD.md` | Blank but correctly-wired Next.js app running locally |
| 2 | `PHASE_02_UX_ARCHITECTURE.md` | Design tokens, content model, sitemap, a11y baseline |
| 3 | `PHASE_03_SHELL.md` | Nav, layouts, all five routes with placeholder content |
| 4 | `PHASE_04_PERSISTENT_CANVAS.md` | The single persistent 3D canvas (the keystone) |
| 5 | `PHASE_05_HERO_SCENE.md` | First real 3D scene + the reusable scene pattern |
| 6 | `PHASE_06_ANIMATION.md` | Scroll sequences, smooth scroll, transitions, micro-interactions |
| 7 | `PHASE_07_CMS.md` | Sanity wired in; projects/copy come from the CMS |
| 8 | `PHASE_08_CONTACT_FORM.md` | Validated contact form with real email delivery |
| 9 | `PHASE_09_OPTIMIZATION.md` | Responsive, accessible, performance-tuned |
| 10 | `PHASE_10_SEO_ANALYTICS.md` | Metadata, social previews, analytics |
| 11 | `PHASE_11_DEPLOYMENT.md` | Live on Vercel with custom domain + env vars |
| 12 | `PHASE_12_HANDOFF.md` | How to update, change safely, and maintain |

**Detailed checklist:** [`CHECKLIST.md`](CHECKLIST.md) — every gate, verify step, and acceptance item in one place.

---

## Plan logic (read before building)

### Critical path

```
Phase 0 → 1 → 2 → 3 → 4 (keystone) → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12
                              ↑
                    Nothing 3D-heavy before Phase 4
```

Phases **4** and **5** are the architectural hinge. Phases **9** and **10** both touch performance — re-run Lighthouse after Phase 10.

### Phase dependencies (what each phase actually needs)

| Phase | Hard prerequisites | Soft notes |
|---|---|---|
| 4 | Phase 3 layout with canvas mount point | Requires client/server split (see below) |
| 5 | Phase 4 persistent canvas proven | Hero replaces Phase 1 smoke-test cube |
| 6 | Phase 5 hero + scene pattern | Scroll sequences may need **retuning after Phase 7** when real CMS content changes section heights |
| 7 | Phase 2 content types | Can run in parallel with Phase 8 after Phase 3, but plan order keeps content before polish |
| 8 | Phase 3 contact route + Phase 1 form libs | Independent of CMS |
| 9 | Phases 4–8 functionally complete | Optimization before final SEO pass |
| 10 | Phase 7 for dynamic project metadata | Re-verify Phase 9 performance scores after adding OG/analytics |
| 11 | All prior phases locally green | Production build (`pnpm build`) is a gate |
| 12 | Phase 11 live | Documentation only |

### App Router + persistent canvas (non-negotiable pattern)

Next.js App Router layouts are **Server Components** by default. R3F `<Canvas>` is **client-only**. The plan therefore requires:

1. A thin **client wrapper** (e.g. `SceneCanvas.tsx` with `"use client"`) mounted once from the root layout.
2. Load the canvas with `next/dynamic(..., { ssr: false })` so WebGL never runs on the server.
3. Pages that call `usePageScene()` must be Client Components **or** use a small client child (e.g. `PageSceneSetter`) — server pages cannot call hooks directly.
4. Default stacking: canvas **behind** DOM content (`z-index` lower); use `pointer-events: none` on the canvas unless specific 3D hit areas need clicks.

### Metadata is layered (not duplicated work)

| When | Scope |
|---|---|
| Phase 3 | Baseline `title` + `description` per route |
| Phase 7 | Project pages pull title/description from CMS |
| Phase 10 | Full system: OG/Twitter, canonical URLs, sitemap, robots, JSON-LD, dynamic OG images |

### Intentional phase-order tradeoffs

- **Animation (6) before CMS (7):** Build scroll motion on stable placeholder layout first; expect a short **revisit of ScrollTrigger** after CMS content lands (refresh triggers, adjust pin heights).
- **Optimization (9) before SEO (10):** Tune performance on near-final UI; SEO additions (dynamic OG routes, analytics) can add weight — **re-run Lighthouse** at end of Phase 10.

### Security & ops gaps addressed in phase updates

- `.env.example` from Phase 1; real secrets only in `.env.local` / Vercel.
- Sanity Studio at `/studio`: protect in production (middleware) or use Sanity-hosted studio.
- Contact form: server-side re-validation always; Resend key never in client bundle.
- `ScrollTrigger.kill()` on route change — orphaned triggers are a common Phase 6 bug.

---

## How to use the phase files

1. Open the phase file. Read the **Goal** and **Why this phase matters**.
2. Make the **Decisions / inputs** it asks for (loop in Claude if unsure).
3. Paste the **Prompts for Cursor** one at a time. Let Cursor plan, approve, let
   it code.
4. Check the work against **Definition of done**.
5. Watch for the **Common pitfalls**.
6. **Commit to Git** before moving on (`git add -A && git commit -m "phase N done"`).

Do the phases in order. Each assumes the previous one is complete.

---

## A note on "done"

A phase is done when its Definition of done is fully met *and* the site still runs.
If something feels shaky, fix it before advancing — bugs compound across phases,
and the persistent-canvas architecture in particular punishes shortcuts taken
early. Slow is smooth, and smooth is fast.
