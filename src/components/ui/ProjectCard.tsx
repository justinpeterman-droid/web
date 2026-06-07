import Link from "next/link";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-accent" aria-hidden="true" />
      <div className="space-y-3">
        <p className="eyebrow">{project.year}</p>
        <h2 className="text-2xl font-medium text-white">
          <Link href={`/work/${project.slug}`} className="project-card-link">
            {project.title}
          </Link>
        </h2>
        <p className="text-[var(--color-muted)]">{project.tagline}</p>
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
      </div>
    </article>
  );
}
