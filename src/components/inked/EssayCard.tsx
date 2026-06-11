import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { InkedEssay } from "@/types/inked";

type EssayCardProps = {
  essay: InkedEssay;
};

export function EssayCard({ essay }: EssayCardProps) {
  const canRead = Boolean(essay.href);

  return (
    <article className="inked-essay" aria-labelledby={`essay-${essay.id}`}>
      <GlassPanel className="inked-essay__panel flex h-full flex-col p-6">
        <h3 id={`essay-${essay.id}`} className="inked-essay__title">
          {essay.title}
        </h3>
        <p className="inked-essay__excerpt">{essay.excerpt}</p>
        <div className="inked-essay__footer">
          {canRead ? (
            <ButtonLink href={essay.href!} variant="ghost" external className="inked-essay__cta">
              Read Essay
            </ButtonLink>
          ) : (
            <>
              <button
                type="button"
                className="button-link button-link--ghost inked-essay__cta"
                disabled
                aria-describedby={`essay-${essay.id}-status`}
              >
                Read Essay
              </button>
              <p id={`essay-${essay.id}-status`} className="inked-essay__note">
                Substack post URL coming soon.
              </p>
            </>
          )}
        </div>
      </GlassPanel>
    </article>
  );
}
