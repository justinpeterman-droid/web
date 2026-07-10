import { hometownContent } from "@/lib/content/hometown";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function HomeHero() {
  const { home } = hometownContent;

  return (
    <section className="hero-section container-shell" aria-labelledby="home-hero-title">
      <GlassPanel className="home-hero__panel p-8 md:p-10">
        <p className="eyebrow rise-in">{home.eyebrow}</p>
        <h1 id="home-hero-title" className="home-hero__title rise-in rise-in--1">
          {home.title}
        </h1>
        <p className="home-hero__lead rise-in rise-in--2">{home.description}</p>
        <p className="home-hero__tagline rise-in rise-in--3">{home.tagline}</p>
        <p className="home-hero__practitioner rise-in rise-in--4">
          {home.subtitle}, {home.credentials}
        </p>
        <div className="hero-section__actions rise-in rise-in--5">
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
