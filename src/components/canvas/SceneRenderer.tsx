"use client";

import { Suspense } from "react";
import { useCanvas } from "@/components/providers/CanvasProvider";
import { AboutScene } from "@/components/canvas/scenes/AboutScene";
import { ContactScene } from "@/components/canvas/scenes/ContactScene";
import { DefaultScene } from "@/components/canvas/scenes/DefaultScene";
import { HeroScene } from "@/components/canvas/scenes/HeroScene";
import { WorkScene } from "@/components/canvas/scenes/WorkScene";

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshBasicMaterial color="#4b5563" wireframe />
    </mesh>
  );
}

type SceneRendererProps = {
  isCanvasActive?: boolean;
};

export function SceneRenderer({ isCanvasActive = true }: SceneRendererProps) {
  const { scene } = useCanvas();

  return (
    <Suspense fallback={<SceneLoader />}>
      {scene.id === "hero" && <HeroScene isActive={isCanvasActive} />}
      {scene.id === "work" && <WorkScene />}
      {scene.id === "about" && <AboutScene />}
      {scene.id === "contact" && <ContactScene />}
      {scene.id === "default" && <DefaultScene />}
    </Suspense>
  );
}
