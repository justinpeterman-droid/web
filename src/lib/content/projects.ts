import { mockProjects } from "@/lib/content/mock-data";
import type { Project } from "@/types/content";

export async function getProjects(): Promise<Project[]> {
  // Phase 7 will swap this for Sanity fetches when env vars are present.
  return mockProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit = 2): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}
