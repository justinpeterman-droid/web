"use client";

import { ParticleCloud } from "@/components/canvas/particles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroSceneProps = {
  isActive?: boolean;
};

export function HeroScene({ isActive = true }: HeroSceneProps) {
  const reducedMotion = useReducedMotion();
  const particleActive = isActive && !reducedMotion;

  return (
    <>
      <color attach="background" args={["#181c1f"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={0.85} color="#8ba892" />

      {!reducedMotion && <ParticleCloud isActive={particleActive} />}
    </>
  );
}
