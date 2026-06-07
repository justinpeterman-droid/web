# Phase 1 — Scaffold

**Goal:** A blank but correctly-wired Next.js app, with all libraries pinned to
current stable versions, running on your machine.

## Why this phase matters
This is the skeleton everything hangs on. If the framework, TypeScript, Tailwind,
and the 3D libraries are installed cleanly and proven to start, every later phase
is just adding meat to a sound skeleton. The most valuable step here is **pinning
to latest stable versions and confirming compatibility** — it prevents the
"works on the tutorial, breaks for me" problem caused by stale version numbers.

## Prerequisites
- Phase 0 complete.

## Decisions / inputs you provide
- A project name (lowercase, hyphenated, e.g. `my-immersive-site`).

## Steps overview
1. Create the Next.js app.
2. Add the Cursor rules file.
3. Install and pin the libraries.
4. Confirm it runs.
5. Commit to Git.

## Prompts for Cursor

**Prompt 1 — create the app:**
```
Create a new Next.js app named "my-immersive-site" using the App Router,
TypeScript, Tailwind CSS, ESLint, and the src/ directory. Use pnpm. After
scaffolding, show me the folder structure and explain what each top-level
folder is for.
```

**Prompt 2 — add the rules file** (paste the rules block from the master file):
```
Create a .cursor/rules file in the project root with the following content,
exactly as given: [paste the full Project Rules block from 00_MASTER_PROJECT.md]
```

**Prompt 3 — install and PIN dependencies:**
```
Install these libraries with pnpm, pinning each to its LATEST STABLE version.
Before installing, check the latest stable version of each and confirm they are
mutually compatible (especially React Three Fiber + drei + the installed React
version). List the exact versions you are about to install and the compatibility
notes, then install:

- three, @react-three/fiber, @react-three/drei
- gsap
- lenis
- react-hook-form, zod, @hookform/resolvers

Do not install Sanity or Resend yet — those come in later phases.
```

**Prompt 4 — verify it runs:**
```
Start the dev server and tell me the local URL. Then create a minimal test:
render a single spinning cube using React Three Fiber on the home page, just to
prove the 3D pipeline works end to end. Keep it crude — we will replace it. Note:
this temporary canvas will be REMOVED in Phase 4 when we build the persistent
canvas.
```

## Definition of done
- `pnpm dev` starts the app and you can open it in the browser.
- A spinning cube renders on the home page (proof the 3D toolchain works).
- `.cursor/rules` exists with the full rules block.
- Cursor has listed the exact installed versions of every library.

## Common pitfalls
- **R3F / React version mismatch:** the most frequent scaffold failure. This is
  exactly why Prompt 3 forces a compatibility check before install.
- **Cube renders black or not at all:** usually a missing light or camera default;
  ask Cursor to add a basic ambient + directional light to the test scene.
- **Tailwind classes do nothing:** the Tailwind content paths may not include
  `src/`. Have Cursor confirm the Tailwind config scans your actual source dirs.

## Bring back to Claude
- The version list from Prompt 3 — I'll sanity-check the combination.
- Any install or first-run error in full.

## Commit before moving on
```bash
git add -A && git commit -m "phase 1: scaffold + pinned deps + 3D smoke test"
```
