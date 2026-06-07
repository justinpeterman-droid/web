# Master Build Checklist — Immersive Portfolio + Marketing Site

Use this alongside [`00_MASTER_PROJECT.md`](00_MASTER_PROJECT.md) and the phase files (`PHASE_00`–`PHASE_12`). Check items off as you complete them. A phase is done only when **every** item in its section passes.

**How to read this doc**

- `[ ]` = not started · `[~]` = in progress · `[x]` = done
- **Gate** items block the next phase — do not skip them.
- **Verify** items need evidence (screenshot, log, score, or test result), not just “looks fine.”

---

## Cross-cutting gates (every phase)

- [ ] `pnpm dev` starts with no errors
- [ ] No new TypeScript or ESLint errors introduced
- [ ] Keyboard navigation still works on all routes touched
- [ ] `prefers-reduced-motion: reduce` still produces a calm experience
- [ ] Persistent canvas still mounts **once** (if Phase 4+ complete)
- [ ] Changes committed with a clear message (`phase N: …`)

---

## Phase 0 — Foundation

**Goal:** Machine, accounts, and tooling ready.

### Tooling
- [ ] Node.js LTS installed (`node --version`)
- [ ] pnpm installed (`pnpm --version`)
- [ ] Git installed and identity configured (`git config user.name` / `user.email`)
- [ ] Cursor installed and signed in

### Accounts (free tiers OK)
- [ ] GitHub account
- [ ] Vercel account
- [ ] Sanity account
- [ ] Resend account

### Gate
- [ ] All four version commands succeed in terminal

---

## Phase 1 — Scaffold

**Goal:** Next.js App Router app with pinned deps and 3D smoke test.

### Project setup
- [ ] Next.js app created (App Router, TypeScript, Tailwind, ESLint, `src/`)
- [ ] `.cursor/rules` (or `.cursor/rules/*.mdc`) contains full Project Rules from master doc
- [ ] `.gitignore` includes `node_modules/`, `.env*`, `.next/`
- [ ] `.env.example` created (empty placeholders for later phases)
- [ ] `packageManager` field set in `package.json` (e.g. `pnpm@…`)
- [ ] `pnpm-workspace.yaml` includes `allowBuilds` for packages that need postinstall scripts (e.g. `puppeteer` if used for screenshots)

### Dependencies installed & pinned
- [ ] `three`, `@react-three/fiber`, `@react-three/drei` — versions listed and compatible with React version
- [ ] `gsap`, `lenis`
- [ ] `react-hook-form`, `zod`, `@hookform/resolvers`
- [ ] Compatibility notes documented (comment in commit or `DEPENDENCIES.md`)

### Smoke test (temporary — removed in Phase 4)
- [ ] Home page renders a spinning cube via R3F
- [ ] Cube has basic lighting (ambient + directional)
- [ ] Cube implemented as a **client component** (`"use client"`)

### Gate
- [ ] `pnpm dev` runs; home page loads in browser
- [ ] `pnpm build` succeeds (catch prod-only issues early)

---

## Phase 2 — UX Architecture & Design System

**Goal:** Tokens, content model, sitemap, a11y baseline before visual build-out.

### Decisions locked (write these down before coding)
- [ ] Three brand adjectives chosen
- [ ] Color palette chosen (background, accent(s), text) — AA contrast checked
- [ ] Display + body fonts chosen
- [ ] Type scale defined
- [ ] Spacing + border-radius scale defined
- [ ] `Project` fields finalized (including `sceneId` / 3D variant field)
- [ ] `SiteSettings` fields finalized

### Deliverables
- [ ] Tailwind theme extended with design tokens
- [ ] `DESIGN_TOKENS.md` documents every token and usage
- [ ] `src/types/content.ts` — `Project` and `SiteSettings` types with comments
- [ ] `SITEMAP.md` — all five routes documented
- [ ] `ACCESSIBILITY.md` — acceptance criteria for all later phases

### Gate
- [ ] All text/background pairs pass WCAG AA (or exceptions documented in `DESIGN_TOKENS.md`)

---

## Phase 3 — Site Shell

**Goal:** Nav, layouts, five routes, keyboard-accessible — no real 3D yet.

### Layout & navigation
- [ ] Root layout: semantic `<header>`, `<main>`, `<footer>`
- [ ] Commented placeholder for persistent canvas mount (above/below content per design)
- [ ] Primary nav: real `<Link>` elements, not click-only divs
- [ ] Active route styling
- [ ] Desktop nav complete
- [ ] Mobile menu: focus trap, Escape closes, `aria-expanded` on toggle
- [ ] Footer: social links, copyright, contact email placeholders

### Routes (placeholder content, real structure)
- [ ] `/` — hero block, selected work preview, intro
- [ ] `/work` — project card grid
- [ ] `/work/[slug]` — detail template with static placeholder data
- [ ] `/about` — bio / timeline placeholders
- [ ] `/contact` — form placeholder (non-functional until Phase 8)

### App Router hygiene
- [ ] `not-found.tsx` — custom 404
- [ ] `error.tsx` — route error boundary
- [ ] `loading.tsx` on at least `/work` and `/work/[slug]` (optional elsewhere)

### Metadata (baseline only — full SEO in Phase 10)
- [ ] Each route exports `title` + `description` via Metadata API
- [ ] Exactly one `<h1>` per page

### Gate
- [ ] Full site navigable via keyboard only; focus visible everywhere
- [ ] All five routes reachable from nav
- [ ] Canvas mount placeholder present in layout

---

## Phase 4 — Persistent Canvas (KEYSTONE)

**Goal:** One R3F `<Canvas>` survives all navigations.

### Architecture
- [ ] **Gate:** Approach proposed and approved before coding
- [ ] Single `<Canvas>` in root layout only — never inside a page file
- [ ] Canvas loaded via `next/dynamic` with `ssr: false`
- [ ] Client boundary: `CanvasProvider` / `SceneCanvas` wrapper component with `"use client"`
- [ ] Shared store (React Context or Zustand) holds `activeSceneId` + scene params
- [ ] `SceneController` inside canvas swaps scenes on id change
- [ ] `usePageScene(sceneId)` hook — sets scene on mount, cleans up on unmount
- [ ] Smooth transition between scenes (not hard cut)
- [ ] `frameloop` throttles or pauses when idle / tab hidden
- [ ] `pointer-events` managed — DOM UI remains clickable
- [ ] Phase 1 per-page cube **removed**

### Placeholder scenes
- [ ] `home` scene (cube moved here)
- [ ] `default` idle scene

### Wired routes
- [ ] `/` → `home`
- [ ] `/work` → appropriate scene id
- [ ] `/about` → scene id
- [ ] `/contact` → scene id
- [ ] `/work/[slug]` — defer scene variant to Phase 7; uses `default` for now

### Verification (evidence required)
- [ ] Mount counter or console log proves Canvas mounts **once** across 10+ navigations
- [ ] No white flash on route change
- [ ] No WebGL context loss errors in console
- [ ] Memory stable after repeated navigation (DevTools heap snapshot spot-check)

### Gate
- [ ] Second pair of eyes on architecture (Claude review) before Phase 5

---

## Phase 5 — Hero 3D Scene

**Goal:** Real home hero + reusable scene pattern.

### Decisions
- [ ] Hero concept chosen (generative / glTF / typographic 3D)
- [ ] Interaction level decided (ambient vs mouse/scroll-reactive)
- [ ] Asset sourced (if glTF): `.glb`, Draco-compressed, reasonable poly count

### Scene pattern
- [ ] `SCENES.md` documents standard: mount, Suspense loading, lighting, materials, input, disposal
- [ ] Example scene included in docs

### Hero implementation
- [ ] Hero follows `SCENES.md` pattern
- [ ] Lazy-loaded with Suspense + loading fallback
- [ ] Load failure handled gracefully
- [ ] `prefers-reduced-motion` → calm/static variant
- [ ] Mobile: reduced detail / fewer particles
- [ ] Wired to `home` scene id via `usePageScene`
- [ ] Hero copy in **DOM above canvas** (h1, subhead, CTA) — not baked into 3D
- [ ] Text readable (contrast / scrim)

### Gate
- [ ] Navigate away from `/` and back — no memory leak (geometries/materials disposed)
- [ ] Acceptable frame rate on throttled mobile (DevTools CPU 4× slowdown)

---

## Phase 6 — Animation

**Goal:** Lenis + GSAP scroll sequences, route transitions, micro-interactions.

### Foundation
- [ ] Lenis integrated; ScrollTrigger uses Lenis scroll position
- [ ] `MOTION.md` documents global motion policy
- [ ] Single `prefers-reduced-motion` source of truth
- [ ] Reduced motion: Lenis off, scroll sequences off/simplified, instant transitions

### Home scroll sequence
- [ ] Scroll story implemented per design decision
- [ ] 3D driven via shared canvas state (canvas does not remount)
- [ ] Animations use `transform` + `opacity` only (no layout-thrashing props)
- [ ] `ScrollTrigger.refresh()` on resize and after async content loads
- [ ] **ScrollTrigger instances killed on route leave** (no orphaned triggers)

### Route transitions
- [ ] Transition style implemented (overlay / cross-fade / scene morph)
- [ ] Canvas survives transitions
- [ ] Focus not trapped; screen readers not broken
- [ ] Skipped under reduced motion

### Micro-interactions
- [ ] Nav links, buttons, cards: subtle hover/focus motion
- [ ] Focus rings remain visible (not hover-only)

### Gate
- [ ] Smooth scroll on mid-range hardware during home sequence
- [ ] Navigate `/` → `/work` → `/` — no duplicate ScrollTriggers (check with `ScrollTrigger.getAll().length`)

### Note after Phase 7
- [ ] Revisit home scroll sequence once CMS content is live (section heights may change)

---

## Phase 7 — CMS (Sanity)

**Goal:** Projects and copy editable without code changes.

### Sanity setup
- [ ] Sanity packages installed (current stable)
- [ ] Embedded Studio at `/studio` **or** hosted studio documented
- [ ] **Production:** Studio route protected (middleware auth) or use hosted studio only
- [ ] Schemas mirror `src/types/content.ts` field names exactly
- [ ] `project` document: slug, images with alt, portable text description, `sceneId`
- [ ] `siteSettings` singleton
- [ ] Env vars in `.env.local` + documented in `.env.example`:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_READ_TOKEN` (if needed for draft/preview)

### Data layer
- [ ] Typed GROQ queries: all projects, project by slug, site settings
- [ ] Images via Sanity image URL builder + `next/image`
- [ ] Revalidation strategy chosen (`revalidate` tag/path or ISR interval)

### Routes wired
- [ ] `/work` — cards from CMS
- [ ] `/work/[slug]` — `generateStaticParams` from slugs; proper `notFound()` for missing slug
- [ ] `/about` — bio from CMS
- [ ] Nav + footer from `siteSettings`
- [ ] Per-project metadata from CMS fields

### 3D integration
- [ ] `/work/[slug]` calls `usePageScene(project.sceneId)` with fallback to `default`

### Gate
- [ ] Create project in Studio → appears on `/work` within revalidation window
- [ ] Edit project title in Studio → updates on live route
- [ ] No Sanity secrets in git

---

## Phase 8 — Contact Form

**Goal:** Validated form → Resend email delivery.

### Form UI
- [ ] Fields: name, email, message (+ optional subject/company per decision)
- [ ] Shared zod schema: `src/lib/contact-schema.ts` (or similar)
- [ ] react-hook-form + zod resolver
- [ ] Labels, `aria-describedby` on errors, keyboard operable
- [ ] Focus moves to first error on failed submit
- [ ] Honeypot field (hidden from users)
- [ ] Loading, success, error UI states

### Server
- [ ] Server Action or Route Handler re-validates with same zod schema
- [ ] Honeypot rejection server-side
- [ ] Resend sends to destination email
- [ ] `RESEND_API_KEY` server-only (in `.env.example`)
- [ ] Rate limiting on submit endpoint
- [ ] Success shown only on genuine Resend 2xx
- [ ] Resend failure → friendly error, not false success

### Gate
- [ ] Submit real test message → arrives in inbox
- [ ] Honeypot filled → rejected
- [ ] Invalid email → client + server error
- [ ] API key not in client bundle (`pnpm build` + search dist for key)

---

## Phase 9 — Optimization & Quality

**Goal:** Responsive, accessible, fast on target devices.

### Responsiveness
- [ ] All routes: mobile / tablet / desktop layouts verified
- [ ] Touch targets ≥ 44×44px where applicable
- [ ] 3D: reduced particles/poly/effects on mobile or low-power detection

### Accessibility audit
- [ ] Heading hierarchy correct (one h1, logical h2–h6)
- [ ] All meaningful images have alt; decorative images `alt=""`
- [ ] AA contrast verified
- [ ] Full keyboard pass on every route
- [ ] Mobile menu + form errors screen-reader friendly
- [ ] Reduced motion fully calms site

### Performance
- [ ] All glTF assets Draco-compressed; textures sized appropriately
- [ ] Heavy 3D code-split; Suspense lazy-loads assets
- [ ] Canvas idle throttle confirmed
- [ ] `next/image` everywhere with correct `sizes`
- [ ] No per-frame allocations in render loop
- [ ] Lighthouse mobile **before** scores recorded per route

### Gate
- [ ] Lighthouse mobile performance **> 85** on each route (or documented exception)
- [ ] Lighthouse accessibility **= 100**
- [ ] No stutter on target device during scroll + navigation

---

## Phase 10 — SEO, Metadata & Analytics

**Goal:** Discoverable, shareable, measurable.

### Metadata system
- [ ] Global defaults: title template, description, OG image
- [ ] Per-route metadata: `/`, `/work`, `/about`, `/contact`
- [ ] Per-project metadata from CMS on `/work/[slug]`
- [ ] Open Graph + Twitter cards on every page
- [ ] Canonical URLs use production domain (not localhost)

### OG images
- [ ] Default branded OG image for static pages
- [ ] Dynamic OG images for `/work/[slug]` (Next.js `ImageResponse`)

### Crawling
- [ ] `sitemap.xml` — static routes + all CMS project slugs (dynamic)
- [ ] `robots.txt`
- [ ] JSON-LD: Person/Organization + CreativeWork on projects

### Analytics
- [ ] Vercel Analytics (or chosen alternative) installed non-blocking
- [ ] Privacy: cookie banner / privacy policy if required by jurisdiction

### Gate
- [ ] Structured data validates (Google Rich Results Test)
- [ ] **Re-run Lighthouse** on all routes — performance still > 85 after SEO additions

---

## Phase 11 — Deployment

**Goal:** Live on Vercel with env vars and domain.

### Pre-deploy
- [ ] `pnpm build` clean locally
- [ ] Full env var list documented (build-time vs runtime, public vs secret)
- [ ] No secrets in git history (rotate if ever committed)

### Deploy
- [ ] Repo on GitHub
- [ ] Vercel project connected
- [ ] All env vars set in Vercel dashboard
- [ ] First production deploy succeeds

### Live verification
- [ ] All five routes load on production URL
- [ ] Canvas persists across navigation on production
- [ ] Contact form sends email from production
- [ ] CMS edit reflects on production (within revalidation)
- [ ] `sitemap.xml` and `robots.txt` reachable
- [ ] OG preview correct (link preview validator)
- [ ] Lighthouse mobile scores meet targets **on production**

### Domain (optional)
- [ ] Custom domain DNS configured
- [ ] HTTPS active
- [ ] `NEXT_PUBLIC_SITE_URL` (or equivalent) updated to real domain

### Gate
- [ ] Production contact form test email received

---

## Phase 12 — Handoff & Maintenance

**Goal:** Safe ongoing updates.

### Documentation
- [ ] `MAINTENANCE.md` — Sanity editing, git preview loop, new project workflow, Vercel rollback, dependency updates
- [ ] `OPERATIONS.md` — monthly 15-minute health checklist

### Workflow proven
- [ ] Branch → local test → push → Vercel preview → merge to main — completed once with trivial change
- [ ] Know how to add a project end-to-end in Sanity (including `sceneId`)
- [ ] Know how to roll back a bad deploy in Vercel

### Gate
- [ ] Future-you can update content without reading code

---

## Final launch checklist (all phases complete)

- [ ] Site live on custom domain (or Vercel URL) with HTTPS
- [ ] Home hero 3D loads and performs on mobile
- [ ] Persistent canvas never remounts
- [ ] Portfolio projects editable in Sanity
- [ ] Contact form delivers to inbox
- [ ] SEO: sitemap, robots, OG, structured data
- [ ] Analytics receiving page views
- [ ] Accessibility: keyboard + reduced motion + Lighthouse a11y 100
- [ ] Performance: Lighthouse mobile > 85
- [ ] `MAINTENANCE.md` + `OPERATIONS.md` in repo
- [ ] All phase commits tagged or changelog noted

---

## Known rework triggers (plan for these)

| When | Likely rework |
|------|----------------|
| After Phase 7 on home page | ScrollTrigger positions / section pins (Phase 6) |
| After Phase 10 | Lighthouse performance — re-run Phase 9 checks |
| After adding new 3D scene | Register scene id in store + `SCENES.md` pattern |
| After dependency major bump | R3F + drei + three compatibility + GSAP/Lenis integration |
