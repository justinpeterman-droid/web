import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/site-url";

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
  const siteUrl = getPublicSiteUrl();

  return ROUTES.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
