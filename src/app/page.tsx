import { connection } from "next/server";
import { HomePageContent } from "@/components/home/HomePageContent";
import { MaintenanceBridge } from "@/components/maintenance/MaintenanceBridge";
import { isMaintenanceMode } from "@/lib/env";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "Welcome to Hometown Serenity — nervous system healing, mind-body alchemy, and self-discovery with Ashley Romero, CMH · CAHA.",
  path: "/",
});

export default async function HomePage() {
  await connection();

  if (isMaintenanceMode()) {
    return <MaintenanceBridge />;
  }

  return <HomePageContent />;
}
