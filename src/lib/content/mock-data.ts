import type { Project, SiteSettings } from "@/types/content";

/** Fallback content when Sanity env vars are not configured */
export const mockSiteSettings: SiteSettings = {
  siteName: "Studio Meridian",
  tagline: "Immersive digital experiences with cinematic craft.",
  aboutIntro:
    "We design and build portfolio-grade marketing sites where real-time 3D, motion, and editorial craft share one persistent stage.",
  contactEmail: "hello@studiomeridian.example",
};

export const mockProjects: Project[] = [
  {
    _id: "1",
    slug: "aurora-finance",
    title: "Aurora Finance",
    tagline: "Brand platform for a next-gen fintech launch",
    description:
      "A cinematic marketing site with scroll-driven product storytelling and a persistent WebGL hero that transitions into case-study detail pages without tearing down the canvas.",
    year: 2025,
    services: ["Art direction", "3D", "Front-end"],
    featured: true,
  },
  {
    _id: "2",
    slug: "northline-atelier",
    title: "Northline Atelier",
    tagline: "Editorial commerce for a luxury house",
    description:
      "An immersive lookbook experience pairing Lenis smooth scroll with GSAP sequences and lightweight instanced geometry for gallery moments.",
    year: 2024,
    services: ["UX", "Motion", "Development"],
    featured: true,
  },
  {
    _id: "3",
    slug: "signal-relay",
    title: "Signal Relay",
    tagline: "Product site for a developer tools startup",
    description:
      "Performance-first marketing pages with structured metadata, accessible navigation, and a contact funnel wired to transactional email.",
    year: 2024,
    services: ["Strategy", "Design systems", "Engineering"],
    featured: false,
  },
];
