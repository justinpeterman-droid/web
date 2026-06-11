import { ContactForm } from "@/components/contact/ContactForm";
import { AccreditationBadges } from "@/components/ui/AccreditationBadges";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PhantomBlendBackground } from "@/components/ui/PhantomBlendBackground";
import { hometownContent } from "@/lib/content/hometown";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Ashley Romero, CMH · CAHA — clinical hypnotherapy and behavioral coaching.",
  path: "/about",
});

export default function AboutPage() {
  const { about } = hometownContent;

  return (
    <main id="main-content" className="about-page relative pb-20">
      <PhantomBlendBackground backgroundKey="about" />
      <div className="container-shell pt-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="about-page__guide">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="page-title">{about.title}</h1>
            <AccreditationBadges />
            <p className="mt-6 text-base leading-relaxed text-[var(--color-parchment)]">
              {about.bio}
            </p>
            <p className="mt-4 text-sm italic text-[var(--color-muted)]">
              {about.pullQuote}
            </p>
            <p className="mt-4 text-sm text-[var(--color-muted)]">{about.credentials}</p>
            <p className="mt-4 text-sm text-[var(--color-sage)]">{about.closingLine}</p>
            <ButtonLink
              href={EXTERNAL_LINKS.indeed}
              variant="ghost"
              className="mt-6"
              external
            >
              View Indeed Profile
            </ButtonLink>
          </section>

          <section id="connect" className="about-page__connection">
            <GlassPanel className="p-6">
              <h2 className="text-2xl font-semibold text-[var(--color-parchment)]">
                Let&apos;s Connect
              </h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                <a href={EXTERNAL_LINKS.phone} className="footer-link">
                  {EXTERNAL_LINKS.phoneDisplay}
                </a>
                {" · "}
                <a href={EXTERNAL_LINKS.email} className="footer-link">
                  {EXTERNAL_LINKS.emailDisplay}
                </a>
              </p>
              <ContactForm />
            </GlassPanel>
          </section>
        </div>
      </div>
    </main>
  );
}
