import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";

type HomePillarCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  glow?: "none" | "sage" | "gold";
};

export function HomePillarCard({
  eyebrow,
  title,
  description,
  href,
  glow = "sage",
}: HomePillarCardProps) {
  return (
    <Link href={href} className="home-pillar-card group block rounded-[var(--radius-lg)]">
      <GlassPanel glow={glow} className="home-pillar-card__panel p-6 transition-transform duration-200 group-hover:-translate-y-1">
        <p className="home-pillar-card__eyebrow">{eyebrow}</p>
        <h3 className="home-pillar-card__title">{title}</h3>
        <p className="home-pillar-card__description">{description}</p>
        <span className="home-pillar-card__cta">Explore {title}</span>
      </GlassPanel>
    </Link>
  );
}
