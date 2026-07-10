export type SectionHeadingProps = {
  /** Small uppercase label above the title (e.g. "The Grounding"). */
  eyebrow?: string;
  title: string;
  /** id for the heading, so a wrapping <section> can aria-labelledby it. */
  titleId?: string;
  description?: string;
  className?: string;
};

/**
 * Eyebrow + heading + description block used above every content section
 * and page intro across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <header className={`section-heading ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId} className="section-heading__title">
        {title}
      </h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
