"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
  type Points,
} from "three";
import { useParticleCount } from "@/hooks/useParticleCount";
import { DEFAULT_PARTICLE_COUNT } from "@/lib/canvas/resolveParticleCount";
import { createParticleGeometry } from "@/components/canvas/particles/createParticleGeometry";
import {
  particleFragmentShader,
  particleVertexShader,
} from "@/components/canvas/particles/particleShader";

type ParticleUniforms = {
  uTime: { value: number };
  uPointScale: { value: number };
  uWarp: { value: number };
  uDensity: { value: number };
  uTealMix: { value: number };
  uColorTeal: { value: Color };
  uColorNeutral: { value: Color };
};

type ParticleCloudProps = {
  /** When false, uniforms stop advancing (canvas idle throttle). */
  isActive?: boolean;
};

function createParticleUniforms(): ParticleUniforms {
  return {
    uTime: { value: 0 },
    uPointScale: { value: 1 },
    uWarp: { value: 0.35 },
    uDensity: { value: 1 },
    uTealMix: { value: 0.68 },
    uColorTeal: { value: new Color("#5b7b7f") },
    uColorNeutral: { value: new Color("#8ba892") },
  };
}

export function ParticleCloud({ isActive = true }: ParticleCloudProps) {
  const pointsRef = useRef<Points>(null);
  const count = useParticleCount(DEFAULT_PARTICLE_COUNT);

  const buffers = useMemo(() => createParticleGeometry(count), [count]);

  const material = useMemo(() => {
    const uniforms = createParticleUniforms();
    return new ShaderMaterial({
      uniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
  }, []);

  useEffect(() => {
    return () => {
      buffers.geometry.dispose();
      material.dispose();
    };
  }, [buffers.geometry, material]);

  useFrame((_, delta) => {
    if (!isActive) return;

    // Shader uniform `.value` fields are mutated every frame (standard R3F/Three.js).
    /* eslint-disable react-hooks/immutability -- intentional GPU uniform updates */
    const { uniforms } = material;
    uniforms.uTime.value += delta;

    const targetDensity = 0.92;
    const targetWarp = 0.38;
    const targetTeal = 0.75;
    const lerpFactor = 1 - Math.pow(0.001, delta);

    uniforms.uDensity.value +=
      (targetDensity - uniforms.uDensity.value) * lerpFactor;
    uniforms.uWarp.value += (targetWarp - uniforms.uWarp.value) * lerpFactor;
    uniforms.uTealMix.value +=
      (targetTeal - uniforms.uTealMix.value) * lerpFactor;
    /* eslint-enable react-hooks/immutability */
  });

  return (
    <points ref={pointsRef} geometry={buffers.geometry} material={material} />
  );
}
