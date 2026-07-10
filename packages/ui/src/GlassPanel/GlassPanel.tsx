import clsx from "clsx";
import type { ReactNode } from "react";

export type GlassPanelProps = {
  /** Panel content. */
  children: ReactNode;
  /** Extra class names merged onto the root element. */
  className?: string;
  /** Colored glow ring — none for a neutral panel, sage/gold to draw the eye. */
  glow?: "none" | "sage" | "gold";
};

/**
 * Frosted-glass container — the core surface of the Sage & Obsidian Alchemy
 * system. Every card, form panel, and callout sits inside one of these.
 */
export function GlassPanel({ children, className, glow = "none" }: GlassPanelProps) {
  return (
    <div
      className={clsx(
        "glass-panel",
        glow === "sage" && "glass-panel--sage",
        glow === "gold" && "glass-panel--gold",
        className,
      )}
    >
      {children}
    </div>
  );
}
