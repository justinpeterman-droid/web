# Accessibility Baseline

These are **acceptance criteria for every phase** — not optional polish. New work
must keep all of them true.

## Rules

1. **Color contrast — WCAG AA.** Normal text ≥ 4.5:1, large text ≥ 3:1. Verified
   pairings and the one accepted exception (`subtle` for large/decorative text
   only) are documented in `DESIGN_TOKENS.md`.
2. **Full keyboard navigation.** Every interactive element is reachable and
   operable with Tab / Shift+Tab / Enter / Space / Escape, in a logical order.
3. **Visible focus.** A clear `:focus-visible` ring (accent, 2px, offset) on all
   focusable elements. Never remove outlines without an equivalent replacement.
4. **Reduced motion.** Respect `prefers-reduced-motion`: animations, transitions,
   and (later) 3D motion/scroll must dial down. A global CSS guard is in
   `globals.css`; JS-driven motion (GSAP, Lenis, R3F) must check the media query
   too.
5. **Semantic landmarks.** Exactly one `<header>`, `<main>`, and `<footer>`;
   navigation in `<nav>` with an `aria-label`. One `<h1>` per page; headings
   nest in order.
6. **Alt text on all images.** Every meaningful image has descriptive `alt`;
   purely decorative visuals are `aria-hidden` / empty-alt. The `ImageAsset` type
   makes `alt` required.

## Phase-specific notes

- **Mobile menu:** focus is trapped while open, Escape closes and returns focus
  to the toggle, and `aria-expanded` reflects state.
- **Skip link:** a "Skip to content" link is the first focusable element and
  jumps to `#main-content`.
- **Persistent canvas (Phase 4):** the fixed canvas must manage `pointer-events`
  so it never blocks DOM interaction, and must be `aria-hidden` (decorative).

## How to check

- Tab through every route start to finish; confirm order and visible focus.
- Operate the mobile menu with the keyboard only.
- Toggle OS "reduce motion" and confirm animations calm down.
- Run an automated audit (e.g. Lighthouse / axe) per page before merging a phase.
