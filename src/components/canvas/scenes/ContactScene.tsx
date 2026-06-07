"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ContactScene() {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <>
      <color attach="background" args={["#071018"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 2, 3]} intensity={1.2} color="#34d399" />

      <group ref={groupRef}>
        <Float speed={1} floatIntensity={0.35}>
          <mesh>
            <ringGeometry args={[0.75, 1.05, 48]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#065f46"
              emissiveIntensity={0.35}
              metalness={0.5}
              roughness={0.25}
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}
