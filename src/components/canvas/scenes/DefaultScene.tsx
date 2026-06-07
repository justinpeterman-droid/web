"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";

export function DefaultScene() {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#6b7280"
          roughness={0.35}
          metalness={0.15}
          distort={0.25}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}
