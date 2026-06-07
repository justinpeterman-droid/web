import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { getSiteSettings } from "@/lib/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Start a project conversation with the studio.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main id="main-content" className="container-shell py-16 md:py-20">
      <PageIntro
        eyebrow="Contact"
        title="Let’s build something immersive"
        description={`Tell us about your project. You can also reach us at ${settings.contactEmail}.`}
      />

      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
        <section className="glass-panel p-6">
          <h2 className="mb-3 text-xl font-medium text-white">What to include</h2>
          <ul className="hero-copy list-disc space-y-2 pl-5">
            <li>Timeline and launch goals</li>
            <li>Whether you need 3D, motion, CMS, or all three</li>
            <li>Any reference sites or aesthetic direction</li>
          </ul>
        </section>

        <section className="glass-panel p-6">
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
