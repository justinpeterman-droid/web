import { hometownContent } from "@/lib/content/hometown";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function BridgeLinks() {
  return (
    <div className="bridge-links grid gap-6 md:grid-cols-2">
      {hometownContent.bridgeSections.map((section) => (
        <GlassPanel key={section.title} className="p-6">
          <h2 className="bridge-links__title">{section.title}</h2>
          <ul className="bridge-links__list">
            {section.links.map((link) => (
              <li key={link.label} className="bridge-links__item">
                <ButtonLink href={link.href} variant={link.variant}>
                  {link.label}
                </ButtonLink>
                {"description" in link && link.description ? (
                  <p className="bridge-links__description">{link.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </GlassPanel>
      ))}
    </div>
  );
}
