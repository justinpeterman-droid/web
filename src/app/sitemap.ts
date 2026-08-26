import type { MetadataRoute } from "next";
import { isMaintenanceMode } from "@/lib/env";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  const routes = isMaintenanceMode() ? ["/"] : ROUTES;

  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
