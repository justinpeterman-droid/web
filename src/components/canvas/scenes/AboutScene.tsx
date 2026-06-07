"use client";

import { Float } from "@react-three/drei";

export function AboutScene() {
  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 3, 4]} intensity={1} color="#fde68a" />

      <Float speed={0.7} floatIntensity={0.2}>
        <mesh>
          <dodecahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#fbbf24"
            wireframe
            emissive="#78350f"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}
