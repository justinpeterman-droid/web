import { ButtonLink } from "@hometown-serenity/ui";

// Every real ButtonLink in the app sits on the obsidian page background
// (or a GlassPanel over it) — Ghost's border/tint especially depend on that
// dark backdrop for contrast, so the preview matches real placement.
const onObsidian = {
  background: "var(--obsidian)",
  padding: "1.5rem",
  display: "inline-flex",
};

export function Gold() {
  return (
    <div style={onObsidian}>
      <ButtonLink href="#" variant="gold">Book Free Discovery Call</ButtonLink>
    </div>
  );
}

export function Sage() {
  return (
    <div style={onObsidian}>
      <ButtonLink href="#" variant="sage">Schedule Session</ButtonLink>
    </div>
  );
}

export function Ghost() {
  return (
    <div style={onObsidian}>
      <ButtonLink href="#" variant="ghost">View Services</ButtonLink>
    </div>
  );
}

export function ExternalLink() {
  return (
    <div style={onObsidian}>
      <ButtonLink href="https://example.com/booking" variant="gold">
        Open Booking Page
      </ButtonLink>
    </div>
  );
}
