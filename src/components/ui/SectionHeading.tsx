type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  className?: string;
};

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
      <h2 id={titleId} className="section-heading__title">{title}</h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </header>
  );
}
