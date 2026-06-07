"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCanvas } from "@/components/providers/CanvasProvider";
import { ROUTE_SCENE_MAP } from "@/lib/constants";
import type { SceneId } from "@/types/canvas";

function sceneFromPath(pathname: string): { id: SceneId; slug?: string } {
  if (pathname.startsWith("/work/") && pathname !== "/work") {
    const slug = pathname.split("/").pop();
    return { id: "work-detail", slug };
  }

  return { id: ROUTE_SCENE_MAP[pathname] ?? "default" };
}

/**
 * Pages never mount their own Canvas — they declare intent via routing.
 * This syncs the active route to the one persistent scene controller.
 */
export function RouteSceneSync() {
  const pathname = usePathname();
  const { setSceneId } = useCanvas();

  useEffect(() => {
    const nextScene = sceneFromPath(pathname);
    setSceneId(nextScene.id, nextScene.slug);
  }, [pathname, setSceneId]);

  return null;
}
