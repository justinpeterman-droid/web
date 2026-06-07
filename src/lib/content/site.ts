import { mockSiteSettings } from "@/lib/content/mock-data";
import type { SiteSettings } from "@/types/content";

export async function getSiteSettings(): Promise<SiteSettings> {
  return mockSiteSettings;
}
