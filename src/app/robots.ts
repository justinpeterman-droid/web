import type { MetadataRoute } from "next";
import { createSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: createSiteUrl("/sitemap.xml"),
  };
}
