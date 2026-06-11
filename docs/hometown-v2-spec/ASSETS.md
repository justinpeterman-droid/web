# Hometown Serenity — Asset manifest

## Background textures (`public/images/backgrounds/`)

| File | Route | Notes |
|------|-------|-------|
| `home-celestial.jpg` | `/`, `/resources`, maintenance | Replace with user celestial map export |
| `audio-water-ripples.jpg` | `/audio-library` | Replace with user water ripples image |
| `services-forest.jpg` | `/services` | Misty forest B&W |
| `inked-bookshelf.jpg` | `/inked-integration` | Blurred bookshelf |
| `about-mountains.jpg` | `/about` | Mountains / forest |

Current files are **Pexels stock placeholders** until Ashley's originals are committed over these paths.

## Brand

| File | Use |
|------|-----|
| `brand/hometown-serenity-logo-mark.png` | Header, favicon source |

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

## About portrait (pending)

`about/ashley-romero-headshot.webp` — Phase 7
