import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Resources",
  description: "Sanctuary Toolkit — dream journal and Serenity app.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <PageShell
      backgroundKey="resources"
      eyebrow="The Exploration"
      title="Resources & Tools"
      description="Gold and Sage toolkit offerings from the Sanctuary collection."
    >
      <Reveal className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        <GlassPanel glow="gold" className="p-6">
          <h2 className="text-xl font-semibold text-[var(--color-parchment)]">
            Dream Journal Sample
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Preview the guided dream journal PDF.
          </p>
          <ButtonLink
            href={EXTERNAL_LINKS.dreamJournalSample}
            variant="gold"
            className="mt-6"
            external
          >
            View Sample PDF
          </ButtonLink>
        </GlassPanel>
        <GlassPanel glow="sage" className="p-6">
          <h2 className="text-xl font-semibold text-[var(--color-parchment)]">
            Serenity Sanctuary App
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Jotform app for ongoing sanctuary practices.
          </p>
          <ButtonLink
            href={EXTERNAL_LINKS.serenityApp}
            variant="sage"
            className="mt-6"
            external
          >
            Open App
          </ButtonLink>
        </GlassPanel>
      </Reveal>
    </PageShell>
  );
}
