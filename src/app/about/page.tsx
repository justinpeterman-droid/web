import { PageIntro } from "@/components/layout/PageIntro";
import { getSiteSettings } from "@/lib/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Studio story, craft, and the architecture behind the experience.",
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <main id="main-content" className="container-shell py-16 md:py-20">
      <PageIntro eyebrow="Studio" title="About" description={settings.aboutIntro} />

      <div className="grid gap-5 md:grid-cols-2">
        <section className="glass-panel p-6">
          <h2 className="mb-3 text-xl font-medium text-white">Persistent canvas</h2>
          <p className="hero-copy">
            One WebGL stage lives above the entire site. Routes change the scene,
            not the renderer — avoiding white flashes, context churn, and memory
            leaks between pages.
          </p>
        </section>
        <section className="glass-panel p-6">
          <h2 className="mb-3 text-xl font-medium text-white">Performance first</h2>
          <p className="hero-copy">
            Motion respects reduced-motion preferences, images use optimized
            delivery, and each route ships only the content it needs for SEO and
            speed.
          </p>
        </section>
      </div>
    </main>
  );
}
