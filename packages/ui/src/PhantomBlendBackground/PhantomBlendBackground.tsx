export type PhantomBlendBackgroundProps = {
  /** Full-bleed background image URL. */
  src: string;
  /** Alt text — usually empty since this layer is decorative (aria-hidden). */
  alt?: string;
  className?: string;
};

/**
 * Per-route ambient texture: a photographic image desaturated and tinted
 * sage/teal, fading to obsidian at the edges so it reads as atmosphere
 * behind frosted-glass content rather than a competing visual.
 */
export function PhantomBlendBackground({
  src,
  alt = "",
  className = "",
}: PhantomBlendBackgroundProps) {
  return (
    <div
      className={`phantom-blend pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- framework-agnostic package, no next/image here */}
      <img src={src} alt={alt} className="phantom-blend__image" />
      <div className="phantom-blend__tint" />
      <div className="phantom-blend__fade" />
    </div>
  );
}
