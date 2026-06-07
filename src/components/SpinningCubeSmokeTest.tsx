"use client";

// TEMPORARY — Phase 1 smoke test only.
// This proves the 3D toolchain (three + @react-three/fiber + @react-three/drei)
// renders end to end. It will be REMOVED in Phase 4 when the single persistent
// canvas is introduced at the app-shell level. Do not build anything on top of it.

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function SpinningCube() {
  const meshRef = useRef<Mesh>(null);

  // Rotate a little each frame so we can visually confirm the render loop runs.
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.6;
    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {/* A standard material needs light to be visible — see lights below. */}
      <meshStandardMaterial color="#6ee7ff" />
    </mesh>
  );
}

export default function SpinningCubeSmokeTest() {
  return (
    <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 50 }}>
      {/* Without lights a meshStandardMaterial renders black — common pitfall. */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <SpinningCube />
    </Canvas>
  );
}
