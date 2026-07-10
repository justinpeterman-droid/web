# design-sync notes — @hometown-serenity/ui

## Repo-specific setup

- This is a pnpm workspace member (`packages/ui`), not a standalone repo.
  `.design-sync/` lives inside `packages/ui/` — all package-relative config
  paths (`cssEntry`, `tokensGlob`) resolve from there, not the monorepo root.
- Build: `pnpm build` inside `packages/ui/` runs `tsup` (JS/types) then
  `node scripts/build-css.mjs` (flattens `src/styles.css`'s `@import` chain
  into `dist/styles.css` via postcss-import — required because the converter
  expects `cssEntry` to point at an already-compiled stylesheet, not one with
  unresolved relative `@import`s; see `[CSS_PLACEHOLDER]` in the sub-skill).
- Chromium for the render check: this environment has no browser install
  permitted via `playwright install` (network-restricted), but a pre-built
  chromium ships at `/opt/pw-browsers/chromium-1194` with
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` already set. `package-validate.mjs`
  supports `DS_CHROMIUM_PATH` for exactly this — installed the bare
  `playwright` package (no browser download) and ran validate with
  `DS_CHROMIUM_PATH=/opt/pw-browsers/chromium` (a symlink straight to the
  binary, bypassing revision matching).

## Component decisions

- **SkipLink** is intentionally left on the floor card. It's visually hidden
  (`position: absolute; top: -100%`) until keyboard focus — a state that
  can't be captured in a static screenshot without simulating `:focus`,
  which the preview pipeline doesn't drive. Same category as the skill's
  documented "states that can't render statically (hover, drag)."
- **AccreditationBadges** preview uses inline SVG data-URI seals (no network
  dependency) standing in for the real AHA/HMI/ISSA certification art, which
  hasn't been exported from Canva yet (see the main app's
  `docs/hometown-v2-spec/ASSETS.md`). A second export (`FallbackState`)
  deliberately uses broken image paths to demonstrate the graceful
  text-badge fallback — a real state the component must handle.
- **PhantomBlendBackground** requires a sized, `position: relative` parent —
  it's a full-bleed absolute layer with no intrinsic height. Its preview
  wraps it in a 400×260 box with a GlassPanel on top, matching exactly how
  every route in the app composes it (texture behind, glass content above).

## Re-sync risks

- **Tokens are hand-duplicated**, not generated: `packages/ui/src/tokens.css`
  copies the hex values from `apps/web`'s `src/app/globals.css`
  (`--obsidian`, `--sage`, etc.). If the app's palette changes, this file
  will silently drift — there's no build-time link between them. Same for
  each component's CSS file (hand-ported from the app's `globals.css`
  blocks, not shared).
- **Fonts ARE bundled** (`src/fonts/fonts.css` + two woff2 files), sourced
  directly from Google Fonts' `css2` API (latin-subset variable 100–900,
  matching the main app's `next/font` config exactly) rather than copied
  from the app's `.next/` build output — that output is gitignored, ephemeral,
  and its filenames are content-hashed per build, so it isn't a legitimate
  source for a committed package. `build-css.mjs` copies the woff2 files
  next to the flattened `dist/styles.css` (postcss-import inlines the
  `@font-face` rules but does NOT rewrite relative `url()` targets — the
  physical files must land wherever those paths now resolve to post-flatten).
  If Inter/Outfit ever get a version bump upstream, re-run the same
  `curl … fonts.googleapis.com/css2?family=…` fetch and replace both woff2s.
- **AccreditationBadges' preview seals are placeholders.** When the real
  Canva-exported seal images are wired into the main app, consider whether
  this package's preview should switch from inline SVG standins to real
  seal artwork for higher-fidelity cards.
