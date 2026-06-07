# Phase 5 — Hero 3D Scene

**Goal:** Build your first real immersive scene — the home hero — and in doing so
establish the reusable pattern every other 3D scene will follow.

## Why this phase matters
The hero is the first thing visitors see and the piece that sets the tone for the
whole site. Just as important: by building it well, you create the template
(loading, lighting, materials, interaction, disposal) that makes every later
scene faster to build and consistent in quality.

## Prerequisites
- Phase 4 complete (persistent canvas proven).

## Decisions / inputs you provide
1. **What is the hero?** Options, roughly in order of effort:
   - An abstract generative object (shader-driven blob, particles, flowing field).
   - A glTF model (an object that represents you/your product).
   - A typographic 3D treatment (your name/brand as dimensional type).
   Decide with Claude based on your brand adjectives from Phase 2.
2. **Interaction level** — does it react to mouse/scroll, or is it ambient?
3. **If using a model:** where does it come from? (Commissioned, bought from a 3D
   marketplace, or made in Blender.) You'll need a `.glb`/`.gltf` file.

## Asset rules (important for performance)
- Use **glTF** format (`.glb` preferred — single file).
- Compress with **Draco** (geometry) and, if textures are heavy, **KTX2/Basis**.
- Keep polygon counts sane; the web is not a film render.
- Lazy-load the model so the page shell appears instantly while 3D streams in.

## Prompts for Cursor

**Prompt 1 — define the reusable scene pattern:**
```
Before building the hero, define a reusable Scene module pattern that all our 3D
scenes will follow, consistent with the persistent-canvas architecture. It should
standardize: how a scene mounts into the SceneController, how it loads assets with
Suspense + a loading state, a lighting setup convention, a materials convention,
how it reads interaction input (pointer/scroll) from shared state, and how it
disposes geometries/materials/textures on unmount. Document it in SCENES.md with
a tiny example scene. Wait for my OK.
```

**Prompt 2 — build the hero:**
```
Build the home hero scene following the SCENES.md pattern. Concept: [describe
your hero from decision 1]. Interaction: [decision 2]. 
- If a model: load this asset [path/URL], Draco-compressed, lazy-loaded, with a
  graceful loading state and a fallback if it fails.
- Lighting and materials should express our brand: [your three adjectives].
- Respect prefers-reduced-motion: provide a calm/static variant when motion is
  reduced.
- Make it responsive: it must look good and perform on mobile (consider lower
  detail or fewer particles on small screens).
Wire it to the "home" scene id so it shows on / via the existing usePageScene.
```

**Prompt 3 — overlay the hero copy:**
```
Layer the hero's text content (headline, subhead, primary CTA) as accessible DOM
ABOVE the canvas — real headings and a real link/button, not baked into the 3D.
Ensure the text remains readable over the 3D (contrast, optional subtle scrim) and
keyboard-focusable. The h1 here is the page's main heading.
```

## Definition of done
- `SCENES.md` documents the reusable scene pattern with an example.
- The hero renders on the home page through the persistent canvas (no new canvas).
- It loads gracefully (shell instant, 3D streams in, failure handled).
- A reduced-motion variant exists and is calm.
- It's responsive and performs acceptably on a phone.
- Hero copy is real accessible DOM over the canvas, not baked into 3D.
- Geometries/materials dispose cleanly (no leak when navigating away and back).

## Common pitfalls
- **Giant uncompressed model:** the classic "why is my site 40MB" mistake. Draco +
  reasonable poly counts are non-negotiable.
- **Text baked into 3D:** looks cool, kills accessibility and SEO. Keep copy in
  the DOM.
- **Great on desktop, melts phones:** test on a real or throttled mobile device;
  scale detail down for small screens.

## Bring back to Claude
- Your hero concept idea — I'll help you judge whether it fits your brand and is
  achievable at good performance.
- Prompt 1's SCENES.md pattern for review, since every future scene inherits it.

## Commit before moving on
```bash
git add -A && git commit -m "phase 5: hero scene + reusable scene pattern"
```
