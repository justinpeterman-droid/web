import { PageShell } from "@/components/layout/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Audio Library",
  description: "Free sanctuary audio and premium deep-dive tracks.",
  path: "/audio-library",
});

export default function AudioLibraryPage() {
  return (
    <PageShell
      backgroundKey="audio"
      eyebrow="The Flow"
      title="Audio Library"
      description="Open Sanctuary tracks are free to play and download. Deep Dive sessions are premium audio for deeper integration work."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <GlassPanel glow="sage" className="p-6">
          <h2 className="text-xl font-semibold text-[var(--color-parchment)]">
            Open Sanctuary
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Free grounding and nervous-system regulation tracks — coming in Demo 3.
          </p>
        </GlassPanel>
        <GlassPanel glow="gold" className="p-6">
          <h2 className="text-xl font-semibold text-[var(--color-parchment)]">
            Deep Dive
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Premium audio purchases — checkout URLs pending.
          </p>
        </GlassPanel>
      </div>
    </PageShell>
  );
}
