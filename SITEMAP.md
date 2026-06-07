# Sitemap

| Route | Purpose | Primary content |
|---|---|---|
| `/` | Home / landing | Hero (immersive 3D placeholder), selected-work preview, studio intro. |
| `/work` | Work index | Grid of project cards linking to detail pages. |
| `/work/[slug]` | Project detail | Title, meta row (role/year/tools), image area, rich description, optional external link. |
| `/about` | About the studio | Heading, bio, timeline. |
| `/contact` | Contact | Heading + contact form (placeholder until Phase 8) and email. |

## URL conventions

- Lowercase, hyphenated slugs (e.g. `/work/aurora-atlas`).
- One `<h1>` per page; section headings step down (`h2`, `h3`) in order.
- Project slugs are stable identifiers (they map to CMS documents in Phase 7).

## 3D scenes per route (Phase 4+)

Each route publishes a `SceneId` to the persistent canvas store:

- `/` → `home`
- `/work`, `/about`, `/contact` → `default`
- `/work/[slug]` → `work-detail` (per the project's `scene` field)
