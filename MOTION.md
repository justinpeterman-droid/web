# Motion Policy — Hometown Serenity

Global rules for animation across the site. Every new animated feature must fit
this document.

## Single source of truth for reduced motion

`prefers-reduced-motion: reduce` is respected at three layers, all driven by
the same media query:

1. **CSS** — `globals.css` zeroes all animation/transition durations globally,
   which disables the hero entrance (`.rise-in`) and any CSS motion.
2. **JS hooks** — `useReducedMotion()` gates Lenis (`SmoothScrollProvider`
   doesn't start it), the canvas frameloop (`PersistentCanvas` drops to
   `demand` + inactive), and GSAP reveals (`Reveal` bails before creating
   tweens; content stays fully visible).
3. **Canvas** — with `isActive=false` the particle field renders one static
   frame and stops advancing uniforms.

Result under reduced motion: static particle field, native scrolling, no
reveals, no parallax — a calm page with nothing hidden.

## Motion inventory

| Layer | Mechanism | File |
|---|---|---|
| Smooth scroll | Lenis (`lerp: 0.08`), rAF-driven | `SmoothScrollProvider` |
| Scroll → DOM reveals | GSAP ScrollTrigger, `once: true` rise/fade, optional child stagger | `components/motion/Reveal` |
| Scroll → canvas | `canvasScrollState.progress` (mutable module, no React state) modulates warp/accent/density + field drift/pitch | `lib/canvas/scrollState`, `ParticleCloud` |
| Route → scene morph | Per-route particle profiles lerped in `useFrame` (~1–2s morph = the scene "crossfade") | `lib/canvas/sceneProfiles`, `SceneRenderer` |
| Pointer parallax | Window `pointermove` → lerped group rotation; fine pointers only | `ParticleCloud` |
| Hero entrance | Staggered CSS `rise-in` keyframes | `globals.css`, `HomeHero` |
| Idle throttle | 3s without activity → `frameloop="demand"` (battery) | `useCanvasIdleThrottle` |

## Hard rules

- **ScrollTriggers must die on route leave.** `Reveal` uses
  `gsap.context(...).revert()` in its effect cleanup — any new ScrollTrigger
  usage must do the same. Check with `ScrollTrigger.getAll().length` after
  navigating `/` → `/work` → `/`.
- **No per-frame allocations** in `useFrame`. Preallocate `Color`/vector
  scratch objects in refs; mutate `.value` on uniforms.
- **Never hide content by default.** GSAP sets the hidden state only after JS
  runs (`fromTo`), so no-JS visitors see everything.
- **Scroll state is not React state.** Per-frame scroll reads go through
  `canvasScrollState`, never `useState`, to avoid re-render storms.
- **Animate `transform` + `opacity` only** in the DOM — no layout-thrashing
  properties.
- **One Canvas, forever.** Scenes are uniform retargets, not component swaps;
  nothing may mount a second `<Canvas>` or remount the field per route.

## Tuning knobs

- Per-route feel: `SCENE_PARTICLE_PROFILES` in `lib/canvas/sceneProfiles.ts`
  (density/warp/speed/colors per scene id).
- Scroll intensity: `SCROLL_INFLUENCE` in the same file.
- Reveal timing: `Reveal` props (`delay`, `y`, `stagger`).
