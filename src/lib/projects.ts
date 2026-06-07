import type { Project } from "@/types/content";

/**
 * Placeholder projects (Phase 3). Static data that reflects the real Project
 * shape so the shell exercises the content model. Replaced by the Sanity query
 * in Phase 7 — the shape stays identical, only the source changes.
 */
export const projects: Project[] = [
  {
    title: "Aurora Atlas",
    slug: "aurora-atlas",
    role: "Design & Build",
    year: "2025",
    summary:
      "An interactive data globe visualizing aurora forecasts in real time.",
    heroImage: { url: "", alt: "Placeholder hero for Aurora Atlas" },
    gallery: [],
    description: [
      "Placeholder description paragraph one.",
      "Placeholder description paragraph two.",
    ],
    tech: ["Next.js", "Three.js", "GLSL"],
    scene: "work-detail",
    featured: true,
  },
  {
    title: "Tessellate",
    slug: "tessellate",
    role: "Creative Development",
    year: "2024",
    summary: "A generative identity system that reassembles on every load.",
    heroImage: { url: "", alt: "Placeholder hero for Tessellate" },
    gallery: [],
    description: ["Placeholder description paragraph."],
    tech: ["WebGL", "GSAP"],
    scene: "work-detail",
    featured: true,
  },
  {
    title: "Drift",
    slug: "drift",
    role: "Design & Build",
    year: "2024",
    summary: "A scroll-driven product story with a single persistent scene.",
    heroImage: { url: "", alt: "Placeholder hero for Drift" },
    gallery: [],
    description: ["Placeholder description paragraph."],
    tech: ["Next.js", "Lenis", "Three.js"],
    scene: "work-detail",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
