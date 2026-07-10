import { InkedIntegrationSections } from "@/components/inked/InkedIntegrationSections";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { hometownContent } from "@/lib/content/hometown";
import { createPageMetadata } from "@/lib/metadata";

const { inkedIntegration } = hometownContent;

export const metadata = createPageMetadata({
  title: "Inked Integration",
  description:
    "Written essays and spoken word reflections on identity, nervous-system healing, and inner excavation.",
  path: "/inked-integration",
});

export default function InkedIntegrationPage() {
  return (
    <PageShell
      backgroundKey="inked"
      eyebrow={inkedIntegration.eyebrow}
      title={inkedIntegration.title}
      description={inkedIntegration.description}
    >
      <Reveal>
        <InkedIntegrationSections />
      </Reveal>
    </PageShell>
  );
}
