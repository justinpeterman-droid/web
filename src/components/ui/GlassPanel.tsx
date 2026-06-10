import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  glow?: "none" | "sage" | "gold";
};

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
