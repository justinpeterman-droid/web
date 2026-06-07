export const SITE_NAME = "Studio Meridian";
export const SITE_TAGLINE = "Immersive digital experiences with cinematic craft.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const ROUTE_SCENE_MAP: Record<string, import("@/types/canvas").SceneId> = {
  "/": "hero",
  "/work": "work",
  "/about": "about",
  "/contact": "contact",
};
