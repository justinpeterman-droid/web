# Hometown Serenity — Asset manifest

## Background textures (`public/images/backgrounds/`)

| File | Route | Notes |
|------|-------|-------|
| `home-celestial.webp` | `/`, `/resources`, maintenance | Replace with user celestial map export |
| `audio-water-ripples.webp` | `/audio-library` | Replace with user water ripples image |
| `services-forest.webp` | `/services` | Misty forest B&W |
| `inked-bookshelf.webp` | `/inked-integration` | Blurred bookshelf |
| `about-mountains.webp` | `/about` | Mountains / forest |

Current files are **Pexels stock placeholders** until Ashley's originals are committed over these paths.

**Optimizing replacements:** drop the original JPG/PNG at the target path and
run `node scripts/optimize-assets.mjs` (adjust its file list if names differ) —
it resizes to ≤1920w and re-encodes WebP. Backgrounds tolerate aggressive
quality (~q62) because Phantom Blend filters them to ~10–15% effective opacity.

## Brand

| File | Use |
|------|-----|
| `brand/hometown-serenity-logo-mark.webp` | Header, favicon source — square, circle-masked, transparent corners |

## Badges (pending Canva export)

| File | Seal |
|------|------|
| `badges/aha-seal.webp` | American Hypnosis Association |
| `badges/hmi-58-years-seal.webp` | HMI 58 Years |
| `badges/issa-certified-seal.webp` | ISSA Certified |

Until exported, `AccreditationBadges` shows fallback labels (AHA, HMI, ISSA).

## Audio tracks (`public/audio/`)

Wire MP3s here, then uncomment `audioSrc` in `src/lib/content/hometown.ts`.

| File | Track ID | Tier |
|------|----------|------|
| `grounding-nervous-system.mp3` | `grounding-nervous-system` | Open Sanctuary (free) |
| `evening-downshift.mp3` | `evening-downshift` | Open Sanctuary (free) |
| `safe-container.mp3` | `safe-container` | Open Sanctuary (free) |

Premium Deep Dive tracks use `checkoutUrl` in content (not local MP3 until purchased).

## Inked Integration (Phase 5)

Wire in `src/lib/constants.ts`:

| Constant | Purpose |
|----------|---------|
| `substackPublication` | Publication home URL |
| `substackSubscribe` | Subscribe endpoint (email pre-fill) |
| `youtubeChannel` | Channel URL for Subscribe CTA |
| `youtubeFeaturedVideoId` | Featured embed ID (lazy-loaded player) |

Uncomment per-essay `href` in `hometown.ts` when Substack posts are live.

## About portrait (pending)

`about/ashley-romero-headshot.webp` — Phase 7
