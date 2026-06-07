import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getSiteSettings } from "@/lib/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "An immersive portfolio and marketing site with a persistent real-time 3D canvas.",
  path: "/",
});

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(2),
  ]);

  return (
    <main id="main-content">
      <section className="hero-section container-shell">
        <PageIntro
          eyebrow="Immersive portfolio"
          title={settings.siteName}
          description={settings.tagline}
        />
        <div className="flex flex-wrap gap-3">
          <Link href="/work" className="button-primary">
            View selected work
          </Link>
          <Link href="/contact" className="nav-link">
            Start a project
          </Link>
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="text-3xl font-medium text-white">Selected projects</h2>
          </div>
          <Link href="/work" className="nav-link">
            See all work
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
