import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Discovery calls, 1:1 integration sessions, and handwriting analysis.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell
      backgroundKey="services"
      eyebrow="The Grounding"
      title="Work With Me"
      description="Frosted offerings for discovery, integration, and handwriting insight."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-parchment)]">
            Discovery Call
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            A complimentary conversation to explore fit and direction.
          </p>
          <ButtonLink
            href={EXTERNAL_LINKS.discoveryCall}
            variant="gold"
            className="mt-6"
            external
          >
            Book Free Discovery Call
          </ButtonLink>
        </GlassPanel>
        <GlassPanel glow="gold" className="p-6 md:scale-[1.02]">
          <h2 className="text-lg font-semibold text-[var(--color-parchment)]">
            1:1 Integration Session
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Personalized clinical hypnotherapy and behavioral coaching.
          </p>
          <ButtonLink
            href={EXTERNAL_LINKS.integrationSession}
            variant="gold"
            className="mt-6"
            external
          >
            Schedule Session
          </ButtonLink>
        </GlassPanel>
        <GlassPanel glow="sage" className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-parchment)]">
            Handwriting Analysis
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Submit a sample for integrative handwriting insight.
          </p>
          <ButtonLink
            href={EXTERNAL_LINKS.handwritingJotform}
            variant="sage"
            className="mt-6"
            external
          >
            Free Mini Reading
          </ButtonLink>
        </GlassPanel>
      </div>
    </PageShell>
  );
}
