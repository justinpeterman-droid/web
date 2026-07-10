import { PhantomBlendBackground, GlassPanel } from "@hometown-serenity/ui";

// A soft radial gradient standing in for a real photographic texture
// (celestial map / forest / water) — the effect (desaturate + tint + fade)
// is what's under test, not the specific source photo.
const textureDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
    <defs>
      <radialGradient id="g" cx="30%" cy="20%" r="80%">
        <stop offset="0%" stop-color="#8ba892"/>
        <stop offset="50%" stop-color="#5b7b7f"/>
        <stop offset="100%" stop-color="#181c1f"/>
      </radialGradient>
    </defs>
    <rect width="800" height="500" fill="url(#g)"/>
  </svg>
`)}`;

// PhantomBlendBackground is a full-bleed layer — it requires a sized,
// positioned parent (exactly how every route in the app composes it).
export function OnRoute() {
  return (
    <div style={{ position: "relative", width: 400, height: 260, overflow: "hidden" }}>
      <PhantomBlendBackground src={textureDataUri} />
      <div style={{ position: "relative", padding: 24 }}>
        <GlassPanel glow="sage">
          <div style={{ padding: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--parchment)", margin: 0 }}>
              Content sits in frosted glass above the ambient texture.
            </p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
