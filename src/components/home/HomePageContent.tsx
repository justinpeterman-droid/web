import Link from "next/link";
import { hometownContent } from "@/lib/content/hometown";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PhantomBlendBackground } from "@/components/ui/PhantomBlendBackground";

export function HomePageContent() {
  const { home } = hometownContent;

  return (
    <main id="main-content" className="home-page relative">
      <PhantomBlendBackground backgroundKey="home" />
      <section className="hero-section container-shell">
        <div className="hero-section__copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 className="page-title">{home.title}</h1>
          <p className="text-xl text-[var(--color-parchment)]">
            {home.subtitle}, {home.credentials}
          </p>
          <p className="page-description">{home.description}</p>
          <div className="hero-section__actions">
            <ButtonLink href={EXTERNAL_LINKS.discoveryCall} variant="gold" external>
              {home.discoveryCta}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="mb-8">
          <p className="eyebrow">Explore</p>
          <h2 className="text-3xl font-semibold text-[var(--color-parchment)]">
            Three paths inward
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {home.pillars.map((pillar) => (
            <GlassPanel key={pillar.href} className="p-6">
              <h3 className="text-xl font-semibold text-[var(--color-parchment)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {pillar.description}
              </p>
              <Link href={pillar.href} className="button-link button-link--sage mt-6">
                Explore {pillar.title}
              </Link>
            </GlassPanel>
          ))}
        </div>
      </section>
    </main>
  );
}
