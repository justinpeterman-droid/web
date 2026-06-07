"use client";

import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroScene() {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <>
      <color attach="background" args={["#05070f"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} color="#c7d2fe" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#f472b6" />

      {!reducedMotion && (
        <Stars
          radius={80}
          depth={40}
          count={2500}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />
      )}

      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.35}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        <mesh ref={meshRef} scale={1.65}>
          <torusKnotGeometry args={[0.85, 0.28, 220, 32]} />
          <MeshDistortMaterial
            color="#818cf8"
            emissive="#312e81"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.65}
            distort={reducedMotion ? 0 : 0.28}
            speed={reducedMotion ? 0 : 2}
          />
        </mesh>
      </Float>
    </>
  );
}
