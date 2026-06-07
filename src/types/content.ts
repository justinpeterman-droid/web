/**
 * Content model — Phase 2.
 *
 * This is the single source of truth for the shapes that flow through the site.
 * We will mirror this EXACT shape in the Sanity CMS in Phase 7, so field names
 * are kept clean and stable. Avoid renaming fields casually after this point.
 */

/** A reference to an image asset (mirrors a Sanity image once CMS lands). */
export interface ImageAsset {
  /** Public URL (CMS-hosted or /public path during placeholder phases). */
  url: string;
  /** Required alt text — accessibility baseline: every image has alt. */
  alt: string;
  /** Optional intrinsic dimensions for layout stability (next/image). */
  width?: number;
  height?: number;
}

/**
 * Which 3D scene/variant a project drives in the persistent canvas (Phase 4+).
 * Pages publish this id to the shared canvas store; the SceneController swaps
 * scenes by it. Extend the union as real scenes are authored.
 */
export type SceneId = "default" | "home" | "work-detail";

/** A single portfolio project. */
export interface Project {
  /** Display title. */
  title: string;
  /** URL-safe identifier; used at /work/[slug]. Stable + unique. */
  slug: string;
  /** Your role on the project (e.g. "Design & Build"). */
  role: string;
  /** Year shipped (string to allow ranges like "2024–25"). */
  year: string;
  /** One- or two-sentence summary for cards and previews. */
  summary: string;
  /** Hero image shown on the detail page and card. */
  heroImage: ImageAsset;
  /** Additional gallery images on the detail page. */
  gallery: ImageAsset[];
  /**
   * Rich description. Stored as an array of block strings now; becomes Sanity
   * Portable Text in Phase 7. Decided up front to avoid sentence-vs-paragraph
   * ambiguity (a common CMS-rework trap).
   */
  description: string[];
  /** Tools / tech used (e.g. ["Next.js", "Three.js", "GLSL"]). */
  tech: string[];
  /** Optional external link (live site, case study, repo). */
  externalUrl?: string;
  /** Which 3D scene this project shows in the persistent canvas. */
  scene: SceneId;
  /** Whether to surface this project in "selected work" previews. */
  featured?: boolean;
}

/** A single navigation entry. */
export interface NavLink {
  label: string;
  href: string;
}

/** A social/contact link rendered in the footer. */
export interface SocialLink {
  label: string;
  href: string;
}

/** Global, site-wide content (mirrors a Sanity singleton in Phase 7). */
export interface SiteSettings {
  /** Site / studio title. */
  title: string;
  /** Short tagline used in hero + meta. */
  tagline: string;
  /** Primary navigation, in order. */
  nav: NavLink[];
  /** Social links for the footer. */
  socials: SocialLink[];
  /** Public contact email. */
  contactEmail: string;
}
