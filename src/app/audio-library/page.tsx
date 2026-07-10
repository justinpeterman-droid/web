import { AudioLibraryPanels } from "@/components/audio/AudioLibraryPanels";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { hometownContent } from "@/lib/content/hometown";
import { createPageMetadata } from "@/lib/metadata";

const { audioLibrary } = hometownContent;

export const metadata = createPageMetadata({
  title: "Audio Library",
  description:
    "Free Open Sanctuary audio for nervous-system regulation and premium Deep Dive hypnotherapy tracks.",
  path: "/audio-library",
});

export default function AudioLibraryPage() {
  return (
    <PageShell
      backgroundKey="audio"
      eyebrow={audioLibrary.eyebrow}
      title={audioLibrary.title}
      description={audioLibrary.description}
    >
      <Reveal>
        <AudioLibraryPanels />
      </Reveal>
    </PageShell>
  );
}
