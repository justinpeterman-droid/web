import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { hometownContent } from "@/lib/content/hometown";
import { createPageMetadata } from "@/lib/metadata";

const { services } = hometownContent;

export const metadata = createPageMetadata({
  title: "Services",
  description: services.description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell
      backgroundKey="services"
      eyebrow={services.eyebrow}
      title={services.title}
      description={services.description}
    >
      <Reveal className="grid gap-6 md:grid-cols-3" stagger={0.12}>
        {services.offerings.map((offering) => (
          <GlassPanel
            key={offering.id}
            glow={offering.glow}
            className={offering.featured ? "p-6 md:scale-[1.02]" : "p-6"}
          >
            <h2 className="text-lg font-semibold text-[var(--color-parchment)]">
              {offering.title}
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{offering.description}</p>
            <ButtonLink
              href={offering.href}
              variant={offering.variant}
              className="mt-6"
              external
            >
              {offering.cta}
            </ButtonLink>
          </GlassPanel>
        ))}
      </Reveal>
    </PageShell>
  );
}
