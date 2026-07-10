import { SectionHeading } from "@hometown-serenity/ui";

// SectionHeading's title/description use --parchment (near-white), styled
// for the app's obsidian page background — every real instance sits there.
const onObsidian = { background: "var(--obsidian)", padding: "1.5rem" };

export function WithDescription() {
  return (
    <div style={onObsidian}>
      <SectionHeading
        eyebrow="The Grounding"
        title="Work With Me"
        description="Step into a container of intentional healing — discovery calls, integration sessions, and handwriting insight meet you where you are."
      />
    </div>
  );
}

export function TitleOnly() {
  return (
    <div style={onObsidian}>
      <SectionHeading eyebrow="The Flow" title="Audio Library" />
    </div>
  );
}
