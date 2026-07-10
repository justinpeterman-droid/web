"use client";

import { useCanvas } from "@/components/providers/CanvasProvider";
import { ParticleCloud } from "@/components/canvas/particles";

type SceneRendererProps = {
  isCanvasActive?: boolean;
};

/**
 * One continuous world: a single always-mounted ParticleCloud that morphs
 * between per-route personalities (see SCENE_PARTICLE_PROFILES). Route changes
 * never remount geometry — they only retarget uniforms, so navigation reads
 * as a smooth crossfade of density, motion, and color.
 */
export function SceneRenderer({ isCanvasActive = true }: SceneRendererProps) {
  const { scene } = useCanvas();

  return (
    <>
      <color attach="background" args={["#181c1f"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={0.85} color="#8ba892" />

      <ParticleCloud sceneId={scene.id} isActive={isCanvasActive} />
    </>
  );
}
