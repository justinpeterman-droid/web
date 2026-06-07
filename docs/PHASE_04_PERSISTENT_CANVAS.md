# Phase 4 — The Persistent Canvas (Keystone)

**Goal:** Implement the single, persistent React Three Fiber canvas that lives
above the whole site and survives navigation. This is the most important phase in
the project.

## Why this phase matters
Read this slowly, because the whole "immersive everywhere, still fast" promise
depends on it. A 3D scene runs inside a WebGL context, which is expensive to
create and destroy. If you mount a new canvas on each page, every navigation
rebuilds that context — causing slow loads, white flashes, and memory leaks.

Instead you mount **one** canvas at the app shell level, positioned above the
page content. It never unmounts. Pages don't create 3D; they publish a small
piece of state ("show scene A", "camera should look here") that the one canvas
reads and reacts to. The theater stays built; only the scene changes. Every later
3D phase plugs into this one canvas.

## Prerequisites
- Phase 3 complete (shell with a reserved canvas mount point).

## Decisions / inputs you provide
- None new — this is structural. Just understand the pattern before prompting.

## The pattern (so you can verify Cursor builds it correctly)
1. A single `<Canvas>` is rendered once in the root layout, fixed-position,
   covering the viewport, sitting behind or above the page DOM as the design
   needs.
2. A shared state store (React context or a small store like Zustand) holds "what
   the canvas should currently show."
3. Each page, on mount, sets that state (e.g. `setScene('home-hero')`).
4. Inside the canvas, a controller component reads the state and swaps which 3D
   scene is active, ideally with a smooth transition rather than a hard cut.
5. Heavy 3D is lazy-loaded and suspended so the page shell appears instantly.

## Prompts for Cursor

**Prompt 1 — propose before building:**
```
We are implementing the persistent-canvas architecture from our project rules.
Before writing code, propose the approach in plain language: where the single
<Canvas> mounts, how pages communicate which scene to show (recommend React
context vs a small store and justify the choice), how scene swapping and
transitions work, and how lazy-loading/Suspense fits. Wait for my approval.
```

**Prompt 2 — build it:**
```
Implement the approved persistent-canvas architecture:
- One <Canvas> mounted once in the root layout, fixed to the viewport.
- A shared store holding the active scene id + any camera/state the scene needs.
- A SceneController inside the canvas that renders the active scene and
  transitions smoothly when the active scene id changes.
- A simple usePageScene(sceneId) hook that pages call on mount to set the active
  scene, and resets/handles cleanup on unmount.
- Two placeholder scenes ("home" = the spinning cube from Phase 1 moved here;
  "default" = an empty/idle scene) to prove switching works.
Remove the old per-page cube from Phase 1. Add a frameloop/perf note: ensure the
canvas pauses or throttles rendering when idle/offscreen to save battery.
Comment the WHY throughout.
```

**Prompt 3 — prove persistence:**
```
Wire /, /work, /about, /contact to call usePageScene with appropriate scene ids
(reuse "home" and "default" for now). Then verify: navigating between pages does
NOT remount the Canvas (no WebGL context recreation, no white flash). Tell me how
you verified it (e.g. a mount counter or console log on canvas mount that fires
only once across navigations).
```

## Definition of done
- Exactly one `<Canvas>` exists in the app, mounted in the root layout.
- Navigating between all routes does **not** remount the canvas (proven, not
  assumed).
- Pages switch the active scene via the shared store + hook.
- Scene changes transition smoothly rather than hard-cutting.
- The canvas throttles/pauses when idle.
- No console errors; no memory growth when navigating repeatedly.

## Common pitfalls
- **Accidentally mounting Canvas inside a page:** defeats the entire purpose.
  Confirm it lives only in the layout.
- **State not resetting between scenes:** leftover scene state bleeds into the
  next page. The `usePageScene` hook should handle cleanup.
- **Canvas rendering at full speed while idle:** drains laptop/phone batteries;
  insist on the idle throttle.
- **Z-index/pointer-events fights:** the fixed canvas can block clicks on the DOM.
  Make sure `pointer-events` is managed so the UI stays interactive.

## Bring back to Claude
- Paste Prompt 2's output here for review **before** you build anything on top of
  it. This is the one phase where a second pair of eyes is most worth it.
- The persistence verification method — I'll confirm it actually proves the canvas
  survives navigation.

## Commit before moving on
```bash
git add -A && git commit -m "phase 4: persistent canvas architecture (keystone)"
```
