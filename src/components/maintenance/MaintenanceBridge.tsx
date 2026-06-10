import { hometownContent } from "@/lib/content/hometown";
import { AccreditationBadges } from "@/components/ui/AccreditationBadges";
import { PhantomBlendBackground } from "@/components/ui/PhantomBlendBackground";
import { BridgeLinks } from "./BridgeLinks";

export function MaintenanceBridge() {
  const { maintenance } = hometownContent;

  return (
    <main id="main-content" className="maintenance-page relative">
      <PhantomBlendBackground backgroundKey="maintenance" />
      <div className="container-shell maintenance-page__inner">
        <header className="maintenance-page__hero">
          <p className="eyebrow">Clinical Hypnotherapy & Healing</p>
          <h1 className="page-title">{maintenance.heroTitle}</h1>
          <p className="text-lg text-[var(--color-parchment)]">{maintenance.heroSubtitle}</p>
          <p className="page-description">{maintenance.tagline}</p>
          <p className="maintenance-page__status">{maintenance.statusLine}</p>
        </header>

        <AccreditationBadges />

        <BridgeLinks />

        <p className="maintenance-page__footer-line">{maintenance.footerLine}</p>
      </div>
    </main>
  );
}
