import { hometownContent } from "@/lib/content/hometown";
import { PhantomBlendBackground } from "@/components/ui/PhantomBlendBackground";
import { HomeHero } from "./HomeHero";
import { HomePillarGrid } from "./HomePillarGrid";

export function HomePageContent() {
  const { maintenance } = hometownContent;

  return (
    <main id="main-content" className="home-page relative">
      <PhantomBlendBackground backgroundKey="home" />
      <HomeHero />
      <HomePillarGrid />
      <footer className="container-shell pb-10">
        <p className="home-page__mantra text-center text-lg text-[var(--color-sage)]">
          {maintenance.footerLine}
        </p>
      </footer>
    </main>
  );
}
