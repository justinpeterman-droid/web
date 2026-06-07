# Phase 9 — Optimization & Quality

**Goal:** Make the site responsive across devices, accessible, and genuinely fast
— this is the phase that earns the smooth frame rates an immersive site lives or
dies by.

## Why this phase matters
An immersive 3D site has a special burden: it asks the browser to do a lot, so
without deliberate optimization it can feel sluggish on exactly the mid-range
phones most visitors use. This phase is where "looks amazing on my machine"
becomes "runs well for everyone." It's also where you pay down the accessibility
checks you've been carrying as acceptance criteria all along.

## Prerequisites
- Phases 4–8 complete (the site is functionally whole).

## Decisions / inputs you provide
- Your minimum target devices (e.g. "a 2–3 year old mid-range Android phone") so
  testing has a concrete bar.

## The three fronts

### Responsiveness
The layout, type, and 3D detail must all adapt to screen size. 3D especially:
mobile should often render fewer particles, lower-poly variants, or simpler
effects than desktop.

### Accessibility
Everything you've been promising — AA contrast, keyboard operability, visible
focus, reduced-motion support, semantic structure, alt text — gets verified
systematically here rather than assumed.

### Performance
3D and animation are heavy. The wins come from compressing assets, loading only
what's needed when it's needed, and keeping the render loop disciplined.

## Prompts for Cursor

**Prompt 1 — responsive pass:**
```
Do a full responsive pass across mobile, tablet, and desktop for every route.
Fix layout breakage, tighten type scaling, and ensure touch targets are large
enough. For the 3D scenes specifically, implement device-appropriate detail:
reduce particle counts / geometry detail / expensive effects on small or
low-power devices, using sensible breakpoints or a capability check. Report what
you changed per route.
```

**Prompt 2 — accessibility audit:**
```
Run a structured accessibility audit against our ACCESSIBILITY.md baseline.
Check: heading order (one h1 per page, logical structure), all images have
meaningful alt text (decorative ones marked empty), color contrast meets AA,
every interactive element is keyboard-reachable with visible focus, focus order
is logical, the mobile menu and form errors are screen-reader friendly, and
prefers-reduced-motion fully calms the site. Fix issues and give me a checklist
of what passed and what you corrected.
```

**Prompt 3 — performance pass:**
```
Optimize performance with the goal of Lighthouse performance > 85 on mobile and
accessibility = 100:
- Confirm all 3D models are Draco-compressed and textures are appropriately sized
  (KTX2/Basis where it helps); lazy-load heavy assets with Suspense.
- Audit the JS bundle; code-split heavy 3D/animation so it doesn't block initial
  load. Ensure the persistent canvas idle-throttles.
- Confirm all images use next/image with correct sizing and modern formats.
- Check for unnecessary re-renders in React and per-frame allocations in the 3D
  loop (a common cause of stutter and GC pauses).
Run Lighthouse (mobile) on each route and report the scores before and after.
```

**Prompt 4 — real-device check:**
```
Help me test on a real/throttled mobile device matching my target [your target
device]. Walk me through using browser devtools CPU/network throttling and, if
possible, remote-debugging an actual phone. Identify the worst-performing route
and propose the highest-impact fix.
```

## Definition of done
- Every route looks and works well from small phones to large desktops.
- 3D detail scales down appropriately on low-power devices.
- Accessibility checklist passes (target Lighthouse a11y = 100).
- Lighthouse mobile performance is > 85 on each route (or you understand and
  accept any documented exception).
- No per-frame stutter on your target device; the idle throttle works.

## Common pitfalls
- **Optimizing only for your dev machine:** the whole point is the mid-range
  phone. Test there.
- **Per-frame object creation in the 3D loop:** allocating new vectors/objects
  every frame causes garbage-collection stutter; reuse objects.
- **Lazy-loading nothing:** if the big 3D loads up front, first paint suffers.
  Confirm heavy assets actually stream in after the shell.
- **Chasing a perfect 100 performance score:** diminishing returns. >85 mobile on
  a 3D-heavy site is a strong, realistic bar.

## Bring back to Claude
- Your before/after Lighthouse numbers and the worst route — I'll help prioritize
  the fixes that buy the most.
- Any stutter you can't trace; describe device + what triggers it.

## Commit before moving on
```bash
git add -A && git commit -m "phase 9: responsive, accessible, performance-tuned"
```
