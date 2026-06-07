"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";

export function WorkScene() {
  return (
    <>
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 5]} intensity={1.1} />

      <group position={[-1.2, 0, 0]}>
        <Float speed={1} floatIntensity={0.35}>
          <mesh>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.4} roughness={0.3} />
          </mesh>
        </Float>
      </group>

      <group position={[0, 0.2, 0]}>
        <Float speed={1.2} floatIntensity={0.45}>
          <mesh>
            <octahedronGeometry args={[0.75, 0]} />
            <MeshDistortMaterial
              color="#a78bfa"
              distort={0.18}
              speed={1.2}
              metalness={0.5}
              roughness={0.25}
            />
          </mesh>
        </Float>
      </group>

      <group position={[1.3, -0.1, -0.2]}>
        <Float speed={0.9} floatIntensity={0.3}>
          <mesh>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial color="#f472b6" metalness={0.35} roughness={0.35} />
          </mesh>
        </Float>
      </group>
    </>
  );
}
