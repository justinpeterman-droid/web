import { AccreditationBadges } from "@hometown-serenity/ui";

// Self-contained SVG data URIs (no network dependency) standing in for
// real certification seal exports — flat circle + initials, sage/gold ring.
function sealDataUri(label: string, ring: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144">
    <circle cx="72" cy="72" r="66" fill="#181c1f" stroke="${ring}" stroke-width="6"/>
    <text x="72" y="82" font-family="sans-serif" font-size="30" font-weight="700"
      fill="${ring}" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const seals = [
  { id: "aha", src: sealDataUri("AHA", "#8ba892"), alt: "American Hypnosis Association member seal" },
  { id: "hmi", src: sealDataUri("HMI", "#d4c193"), alt: "Hypnosis Motivation Institute — 58 years" },
  { id: "issa", src: sealDataUri("ISSA", "#5b7b7f"), alt: "ISSA certified" },
];

// The credential-line caption uses --parchment (near-white), styled for the
// app's obsidian page background — every real instance sits there.
const onObsidian = { background: "var(--obsidian)", padding: "1.5rem" };

export function ThreeSeals() {
  return (
    <div style={onObsidian}>
      <AccreditationBadges seals={seals} credentialLine="Ashley Romero, CMH · CAHA" />
    </div>
  );
}

export function FallbackState() {
  // Broken image URLs — demonstrates the graceful text-badge fallback,
  // a real state the component must handle (seal art not yet exported).
  const brokenSeals = seals.map((s) => ({ ...s, src: "/does-not-exist.png" }));
  return (
    <div style={onObsidian}>
      <AccreditationBadges seals={brokenSeals} credentialLine="Ashley Romero, CMH · CAHA" />
    </div>
  );
}
