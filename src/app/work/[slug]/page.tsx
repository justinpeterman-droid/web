import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { getProjectBySlug, getProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({ title: "Project not found", path: `/work/${slug}` });
  }

  return createPageMetadata({
    title: project.title,
    description: project.tagline,
    path: `/work/${project.slug}`,
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main id="main-content" className="container-shell py-16 md:py-20">
      <PageIntro
        eyebrow={`${project.year} · Case study`}
        title={project.title}
        description={project.tagline}
      />

      <article className="glass-panel max-w-3xl space-y-6 p-6 md:p-8">
        <p className="hero-copy">{project.description}</p>
        <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
          {project.services.map((service) => (
            <li
              key={service}
              className="rounded-full border border-white/10 px-2.5 py-1"
            >
              {service}
            </li>
          ))}
        </ul>
        <Link href="/work" className="nav-link">
          Back to all work
        </Link>
      </article>
    </main>
  );
}
