"use client";

import { Float, Text } from "@react-three/drei";

type WorkDetailSceneProps = {
  slug?: string;
};

export function WorkDetailScene({ slug }: WorkDetailSceneProps) {
  const label = slug?.replace(/-/g, " ") ?? "project";

  return (
    <>
      <color attach="background" args={["#111827"]} />
      <ambientLight intensity={0.45} />
      <spotLight position={[3, 5, 2]} angle={0.35} intensity={1.5} />

      <Float speed={0.8} floatIntensity={0.25}>
        <mesh rotation={[0.4, 0.6, 0]}>
          <planeGeometry args={[2.4, 1.4]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
        </mesh>
      </Float>

      <Text
        position={[0, -1.2, 0.5]}
        fontSize={0.22}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {label}
      </Text>
    </>
  );
}
