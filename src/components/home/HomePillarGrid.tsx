import { hometownContent } from "@/lib/content/hometown";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HomePillarCard } from "./HomePillarCard";

export function HomePillarGrid() {
  const { home } = hometownContent;

  return (
    <section className="container-shell pb-20" aria-labelledby="home-pillars-title">
      <SectionHeading
        eyebrow="Choose your path"
        title="Three paths inward"
        titleId="home-pillars-title"
        description="Each doorway opens a different layer of healing, reflection, and integration."
        className="mb-8"
      />
      <Reveal className="grid gap-5 md:grid-cols-3" stagger={0.12}>
        {home.pillars.map((pillar, index) => (
          <HomePillarCard
            key={pillar.href}
            eyebrow={pillar.eyebrow}
            title={pillar.title}
            description={pillar.description}
            href={pillar.href}
            glow={index === 1 ? "gold" : "sage"}
          />
        ))}
      </Reveal>
    </section>
  );
}
