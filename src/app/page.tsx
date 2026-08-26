import { HomePageContent } from "@/components/home/HomePageContent";
import { MaintenanceBridge } from "@/components/maintenance/MaintenanceBridge";
import { isMaintenanceMode } from "@/lib/env";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  if (isMaintenanceMode()) {
    return createPageMetadata({
      title: "Website Refinement in Progress",
      description:
        "Hometown Serenity is being refined. Essential contact and booking links remain available while the full website is prepared.",
      path: "/",
    });
  }

  return createPageMetadata({
    title: "Home",
    description:
      "Welcome to Hometown Serenity — nervous system healing, mind-body alchemy, and self-discovery with Ashley Romero, CMH · CAHA.",
    path: "/",
  });
}

export default function HomePage() {
  if (isMaintenanceMode()) {
    return <MaintenanceBridge />;
  }

  return <HomePageContent />;
}
