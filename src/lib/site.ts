import type { SiteSettings } from "@/types/content";

/**
 * Global site content. Placeholder values for now — replaced by Sanity in
 * Phase 7. Nav labels/order live here so the header stays data-driven.
 */
export const siteSettings: SiteSettings = {
  title: "Studio",
  tagline: "Immersive work, built to feel fast.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Bluesky", href: "https://bsky.app" },
  ],
  contactEmail: "hello@example.com",
};
