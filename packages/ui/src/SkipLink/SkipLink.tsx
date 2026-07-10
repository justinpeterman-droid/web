export type SkipLinkProps = {
  /** Anchor id of the page's main content region (without the `#`). */
  targetId?: string;
  children?: string;
};

/**
 * Visually hidden until focused — the first tab stop on every page, letting
 * keyboard users jump past the nav straight to page content.
 */
export function SkipLink({ targetId = "main-content", children = "Skip to main content" }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {children}
    </a>
  );
}
