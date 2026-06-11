import { EssayCard } from "@/components/inked/EssayCard";
import { SubstackOptIn } from "@/components/inked/SubstackOptIn";
import { YouTubeFeatured } from "@/components/inked/YouTubeFeatured";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { hometownContent } from "@/lib/content/hometown";

export function InkedIntegrationSections() {
  const { writtenWord, spokenWord } = hometownContent.inkedIntegration;
  const channelUrl = EXTERNAL_LINKS.youtubeChannel;

  return (
    <div className="inked-page">
      <section className="inked-section" aria-labelledby="written-word-title">
        <SectionHeading
          eyebrow="Essays"
          title={writtenWord.title}
          titleId="written-word-title"
          description={writtenWord.description}
        />
        <ul className="inked-essay-grid">
          {writtenWord.essays.map((essay) => (
            <li key={essay.id}>
              <EssayCard essay={essay} />
            </li>
          ))}
        </ul>
        <SubstackOptIn
          title={writtenWord.optInTitle}
          description={writtenWord.optInDescription}
        />
      </section>

      <section className="inked-section" aria-labelledby="spoken-word-title">
        <SectionHeading
          eyebrow="Video"
          title={spokenWord.title}
          titleId="spoken-word-title"
          description={spokenWord.description}
        />
        <div className="inked-spoken__grid">
          <YouTubeFeatured title={spokenWord.title} />
          <GlassPanel glow="gold" className="inked-spoken__copy p-6 md:p-8">
            <h3 className="inked-spoken__heading">On the channel</h3>
            <p className="inked-spoken__description">{spokenWord.channelDescription}</p>
            {channelUrl ? (
              <ButtonLink href={channelUrl} variant="gold" external className="mt-6">
                {spokenWord.subscribeLabel}
              </ButtonLink>
            ) : (
              <p className="inked-spoken__note mt-6">
                YouTube channel URL pending — wire{" "}
                <code className="inked-video__code">EXTERNAL_LINKS.youtubeChannel</code>.
              </p>
            )}
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}
