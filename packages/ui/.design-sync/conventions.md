## Conventions — @hometown-serenity/ui (Sage & Obsidian Alchemy)

**Setup.** No provider or wrapper is required — every component renders
standalone, reading tokens straight from CSS custom properties. Import the
stylesheet once at the app root (`import "@hometown-serenity/ui/styles.css"`);
fonts (Outfit + Inter, latin-subset variable) ship inside it as real
`@font-face` files, nothing else to load.

**The page is always dark.** Every real composition in this system sits on
the obsidian page background (`var(--obsidian)`, `#181c1f`) — text colors
like `--parchment` (near-white) and `ButtonLink`'s `ghost` variant are tuned
for that backdrop and read as washed-out or invisible on a light page. Wrap
any standalone text or ghost button in a `background: var(--obsidian)`
container; components that carry their own opaque surface (`GlassPanel`,
`PhantomBlendBackground`) don't need this.

**Styling idiom: CSS custom properties, not a utility-class system.** No
Tailwind, no prop-based style API — every component's own CSS reads tokens
via `var(--token-name)`. The real token vocabulary:

| Token | Role |
|---|---|
| `--obsidian` | Page background |
| `--parchment` | Primary text (dark backgrounds only) |
| `--muted` | Secondary/description text |
| `--sage`, `--ethereal-teal` | Primary accent, secondary-CTA gradient |
| `--alchemy-gold` | Premium/featured accent, primary-CTA gradient |
| `--surface`, `--surface-border` | Glass panel fill + border |
| `--radius-lg` (1.25rem), `--radius-md` (0.875rem) | Corner radii |
| `--shadow-soft` | Panel drop shadow |
| `--focus-ring` | Keyboard focus outline (gold) |
| `--font-display` (Outfit), `--font-sans` (Inter) | Headings / body |

**Component vocabulary.** `GlassPanel` (`glow`: `none`\|`sage`\|`gold`) is the
base surface for any card, form, or callout — it has no built-in padding,
callers add their own. `ButtonLink` (`variant`: `gold`\|`sage`\|`ghost`) is
the only interactive CTA — gold for the primary action on a screen, sage for
a secondary one, ghost for quiet/tertiary links. `SectionHeading` is the
eyebrow+title+description block above any content section.
`PhantomBlendBackground` is a full-bleed ambient image layer — it has no
intrinsic size, so it must sit inside a `position: relative` parent with an
explicit height (see the build snippet below). `AccreditationBadges` and
`SkipLink` are narrowly-purposed (certification seals; keyboard
skip-to-content) — reach for them by name, not as general patterns.

**Where the truth lives.** `styles.css` (bound alongside this package) is the
complete, real compiled stylesheet — read it before inventing a class or
color. Each component's own `.prompt.md` documents its exact prop API.

**Build snippet** (a featured-offering card, exactly how the real app
composes services):

```tsx
import { GlassPanel, SectionHeading, ButtonLink } from "@hometown-serenity/ui";

function FeaturedOffering() {
  return (
    <GlassPanel glow="gold">
      <div style={{ padding: "1.5rem" }}>
        <SectionHeading
          eyebrow="The Grounding"
          title="1:1 Integration Session"
          description="Personalized clinical hypnotherapy and behavioral coaching in a grounded, somatic-aware container."
        />
        <div style={{ marginTop: "1.5rem" }}>
          <ButtonLink href="https://calendar.example.com" variant="gold">
            Schedule Session
          </ButtonLink>
        </div>
      </div>
    </GlassPanel>
  );
}
```
