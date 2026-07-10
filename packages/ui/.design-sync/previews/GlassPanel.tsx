import { GlassPanel } from "@hometown-serenity/ui";

// GlassPanel ships with no built-in padding — callers add their own
// spacing, exactly as demonstrated here.
const pad = { padding: "1.5rem", maxWidth: 360 };

export function Neutral() {
  return (
    <GlassPanel>
      <div style={pad}>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--parchment)", margin: 0 }}>
          A neutral frosted-glass surface — the default for content panels, forms, and callouts.
        </p>
      </div>
    </GlassPanel>
  );
}

export function SageGlow() {
  return (
    <GlassPanel glow="sage">
      <div style={pad}>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--parchment)", margin: 0 }}>
          Sage glow marks a secondary, supportive offering — e.g. a free resource card.
        </p>
      </div>
    </GlassPanel>
  );
}

export function GoldGlow() {
  return (
    <GlassPanel glow="gold">
      <div style={pad}>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--parchment)", margin: 0 }}>
          Gold glow marks the featured offering — e.g. the highlighted 1:1 session card.
        </p>
      </div>
    </GlassPanel>
  );
}
