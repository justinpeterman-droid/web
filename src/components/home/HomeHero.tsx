import { hometownContent } from "@/lib/content/hometown";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function HomeHero() {
  const { home } = hometownContent;

  return (
    <section className="hero-section container-shell" aria-labelledby="home-hero-title">
      <GlassPanel className="home-hero__panel p-8 md:p-10">
        <p className="eyebrow">{home.eyebrow}</p>
        <h1 id="home-hero-title" className="home-hero__title">
          {home.title}
        </h1>
        <p className="home-hero__lead">{home.description}</p>
        <p className="home-hero__tagline">{home.tagline}</p>
        <p className="home-hero__practitioner">
          {home.subtitle}, {home.credentials}
        </p>
        <div className="hero-section__actions">
          <ButtonLink href={EXTERNAL_LINKS.discoveryCall} variant="gold" external>
            {home.discoveryCta}
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            View Services
          </ButtonLink>
        </div>
      </GlassPanel>
    </section>
  );
}
