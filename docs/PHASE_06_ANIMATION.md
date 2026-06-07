# Phase 6 — Animation

**Goal:** Layer in cinematic motion — scroll-driven sequences (GSAP +
ScrollTrigger), smooth scrolling (Lenis), page transitions, and micro-
interactions — all respecting reduced-motion preferences.

## Why this phase matters
Animation is what turns a static immersive site into one that feels alive and
intentional. But motion is also where sites most often become nauseating,
inaccessible, or janky. Doing it as a deliberate phase — with reduced-motion
support and performance discipline baked in — is how you get the "wow" without the
harm.

## Prerequisites
- Phase 5 complete (hero scene + scene pattern).

**Plan note:** This phase runs before the CMS (Phase 7). ScrollTrigger pin
positions are based on placeholder content heights. After Phase 7, revisit this
phase briefly to `ScrollTrigger.refresh()` and adjust any pins that drift when
real project copy and images load.

## Decisions / inputs you provide
1. **Scroll story for the home page** — what should happen as the visitor scrolls?
   (e.g. hero object morphs/rotates, sections fade and rise, the 3D camera drifts.)
2. **Page-transition style** — how do route changes feel? (e.g. a brief overlay
   wipe, a cross-fade, the 3D scene morphing between page states.)
3. **Micro-interaction taste** — how much do buttons, links, and cards react to
   hover/focus? (Subtle is usually more premium than bouncy.)

## How the pieces fit
Lenis provides smooth scrolling and emits scroll position. GSAP ScrollTrigger
listens to that position to drive timelines (both DOM animations and 3D state).
The persistent canvas reads shared state that these timelines update, so scroll
can drive the 3D without the canvas ever remounting.

## Prompts for Cursor

**Prompt 1 — smooth scroll + reduced-motion foundation:**
```
Integrate Lenis for smooth scrolling, wired so GSAP ScrollTrigger reads Lenis's
scroll position (use the recommended Lenis + ScrollTrigger integration). Then
establish a global motion policy: a single source of truth for prefers-reduced-
motion that disables or simplifies animations when the user prefers reduced
motion (including disabling smooth scroll and heavy scroll sequences). Document it
in MOTION.md. Show the approach before coding.
```

**Prompt 2 — home scroll sequence:**
```
Build the home-page scroll sequence using GSAP + ScrollTrigger: [describe your
scroll story from decision 1]. Where it affects the hero 3D, drive it by updating
the shared canvas state (not by touching a separate canvas). Use scrubbed
timelines tied to scroll, pin sections where appropriate, and ensure everything
is fully disabled/simplified under reduced motion. Keep it performant: avoid
animating layout-thrashing properties; prefer transforms and opacity.

Critical: on route change, kill all ScrollTrigger instances created for the
leaving page (ScrollTrigger.getAll().forEach(t => t.kill()) or scoped cleanup in
useEffect). Orphaned triggers cause jank and wrong scroll positions after
navigation.
```

**Prompt 3 — page transitions:**
```
Implement route transitions in the App Router: [describe your transition style
from decision 2]. The persistent canvas must NOT remount during transitions; if
the 3D changes between pages, do it by transitioning scene state. Make sure
transitions don't trap focus or hide content from screen readers, and that they
are skipped under reduced motion.
```

**Prompt 4 — micro-interactions:**
```
Add tasteful micro-interactions to interactive elements (nav links, buttons,
project cards): hover and focus states with smooth, subtle transitions consistent
with our brand [adjectives]. Focus states must remain clearly visible (do not
replace focus rings with hover-only effects). Keep durations short and easing
natural. Disable non-essential motion under reduced motion.
```

## Definition of done
- Smooth scrolling works and feeds ScrollTrigger.
- The home scroll sequence plays as designed and drives the hero 3D via shared
  state (canvas never remounts).
- Page transitions feel intentional and don't break focus, screen-reader output,
  or the persistent canvas.
- Micro-interactions are present, subtle, and never remove visible focus.
- With `prefers-reduced-motion: reduce` enabled in the OS, the site becomes calm:
  no smooth-scroll hijack, no large scroll animations, instant transitions.
- Frame rate stays smooth during scroll on mid-range hardware.

## Common pitfalls
- **Scroll hijacking that fights the user:** Lenis should feel smooth, not
  sluggish or "stuck." Tune the settings.
- **Animations that ignore reduced motion:** a real accessibility failure and an
  easy one to miss — test it explicitly by toggling the OS setting.
- **Janky scroll from animating `top`/`width`/`height`:** stick to transforms and
  opacity for anything that runs every frame.
- **ScrollTrigger positions drifting after layout changes:** ensure triggers
  refresh on resize and after async content loads.

## Bring back to Claude
- Your scroll story idea — I'll help shape it into something that reads as
  intentional rather than busy, and that won't tank performance.
- Any jank: describe what stutters and on what device; I'll help diagnose.

## Commit before moving on
```bash
git add -A && git commit -m "phase 6: smooth scroll, scroll sequences, transitions, micro-interactions"
```
