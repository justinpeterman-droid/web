import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Case studies and selected projects from the studio.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main id="main-content" className="container-shell py-16 md:py-20">
      <PageIntro
        eyebrow="Portfolio"
        title="Work"
        description="Each route loads only what it needs while the persistent canvas keeps the world continuous."
      />

      <div className="grid gap-5">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}
