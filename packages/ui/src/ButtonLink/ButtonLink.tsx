import clsx from "clsx";
import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";

export type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** Gold = primary CTA, sage = secondary CTA, ghost = tertiary/quiet action. */
  variant?: "gold" | "sage" | "ghost";
  className?: string;
  /** Force external-link behavior (new tab + rel). Auto-detected from href when omitted. */
  external?: boolean;
  /**
   * Injects the host app's own link component (e.g. Next.js `Link`) for
   * internal navigation. Defaults to a plain `<a>` so this package has no
   * router dependency.
   */
  linkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
};

/**
 * Pill-shaped call-to-action. Three variants carry the full weight of the
 * system's action hierarchy — gold for "book now," sage for supporting
 * actions, ghost for quiet/secondary links.
 */
export function ButtonLink({
  href,
  children,
  variant = "sage",
  className,
  external,
  linkComponent: LinkComponent,
}: ButtonLinkProps) {
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

  const classes = clsx(
    "button-link",
    variant === "gold" && "button-link--gold",
    variant === "sage" && "button-link--sage",
    variant === "ghost" && "button-link--ghost",
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  if (LinkComponent) {
    return (
      <LinkComponent href={href} className={classes}>
        {children}
      </LinkComponent>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
