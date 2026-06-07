import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

// Pre-render a page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Per-project SEO metadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        {project.title}
      </h1>

      {/* Meta row */}
      <dl className="text-muted mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div>
          <dt className="text-subtle">Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt className="text-subtle">Year</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt className="text-subtle">Tools</dt>
          <dd>{project.tech.join(", ")}</dd>
        </div>
      </dl>

      {/* Image area (placeholder until CMS) */}
      <div
        className="bg-surface border-border mt-8 aspect-video rounded-lg border"
        role="img"
        aria-label={project.heroImage.alt}
      />

      {/* Description area */}
      <div className="mt-8 flex flex-col gap-4">
        {project.description.map((para, i) => (
          <p key={i} className="text-muted text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent mt-8 inline-block text-sm font-medium"
        >
          Visit project →
        </a>
      )}
    </article>
  );
}
