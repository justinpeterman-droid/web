import type { MetadataRoute } from "next";
import { createSiteUrl } from "@/lib/site-url";

const ROUTES = [
  "/",
  "/audio-library",
  "/services",
  "/inked-integration",
  "/resources",
  "/about",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: createSiteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
