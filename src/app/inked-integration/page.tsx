import { PageShell } from "@/components/layout/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Inked Integration",
  description: "Essays, spoken word, and reflective practices.",
  path: "/inked-integration",
});

export default function InkedIntegrationPage() {
  return (
    <PageShell
      backgroundKey="inked"
      eyebrow="The Knowledge"
      title="Inked Integration"
      description="Written word essays and spoken word reflections — full layout in Demo 5."
    >
      <GlassPanel className="p-6">
        <h2 className="text-xl font-semibold text-[var(--color-parchment)]">
          Written & Spoken Word
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Substack and YouTube URLs pending — essay cards and embed land in Phase 5.
        </p>
      </GlassPanel>
    </PageShell>
  );
}
