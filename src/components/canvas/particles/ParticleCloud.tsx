"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
  type Group,
} from "three";
import { useParticleCount } from "@/hooks/useParticleCount";
import { DEFAULT_PARTICLE_COUNT } from "@/lib/canvas/resolveParticleCount";
import {
  SCENE_PARTICLE_PROFILES,
  SCROLL_INFLUENCE,
} from "@/lib/canvas/sceneProfiles";
import { canvasScrollState } from "@/lib/canvas/scrollState";
import { createParticleGeometry } from "@/components/canvas/particles/createParticleGeometry";
import {
  particleFragmentShader,
  particleVertexShader,
} from "@/components/canvas/particles/particleShader";
import type { SceneId } from "@/types/canvas";

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
  /** Active route scene — the field morphs toward this profile's targets. */
  sceneId?: SceneId;
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

export function ParticleCloud({
  isActive = true,
  sceneId = "default",
}: ParticleCloudProps) {
  const groupRef = useRef<Group>(null);
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

  // Target colors are mutated when the scene changes and lerped per frame.
  // Allocated once — nothing in the render loop allocates.
  const targets = useRef({
    base: new Color("#8ba892"),
    accent: new Color("#5b7b7f"),
  });

  useEffect(() => {
    const profile = SCENE_PARTICLE_PROFILES[sceneId];
    targets.current.base.set(profile.base);
    targets.current.accent.set(profile.accent);
  }, [sceneId]);

  // Pointer parallax target — fine pointers only; a ref, never state.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Dispose geometry and material independently. Geometry is re-created when
  // `count` changes (e.g. crossing the mobile breakpoint), so its cleanup must
  // run then — but the material is stable for the component's life and must NOT
  // be disposed while still assigned to the live <points>.
  useEffect(() => {
    return () => buffers.geometry.dispose();
  }, [buffers.geometry]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  // Mutating shader uniform `.value` fields (and Three object transforms)
  // inside the render loop is standard R3F/Three.js — not React render state.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    if (!isActive) return;

    const profile = SCENE_PARTICLE_PROFILES[sceneId];
    const rawScroll = canvasScrollState.progress;
    const scroll = Number.isFinite(rawScroll)
      ? Math.min(Math.max(rawScroll, 0), 1)
      : 0;

    // Clamp delta so the first frame after an idle (demand-loop) resume doesn't
    // arrive with a large accumulated dt that snaps the wave phase and lerps.
    const dt = Math.min(delta, 1 / 30);

    /* eslint-disable react-hooks/immutability -- intentional GPU uniform + transform updates */
    const { uniforms } = material;
    uniforms.uTime.value += dt * profile.timeScale;

    // Scene profile + scroll influence = the morph targets for this frame.
    const targetDensity = profile.density + scroll * SCROLL_INFLUENCE.density;
    const targetWarp = profile.warp + scroll * SCROLL_INFLUENCE.warp;
    const targetAccent = Math.min(
      profile.accentMix + scroll * SCROLL_INFLUENCE.accentMix,
      1,
    );
    const lerpFactor = 1 - Math.pow(0.001, dt);

    uniforms.uDensity.value +=
      (targetDensity - uniforms.uDensity.value) * lerpFactor;
    uniforms.uWarp.value += (targetWarp - uniforms.uWarp.value) * lerpFactor;
    uniforms.uTealMix.value +=
      (targetAccent - uniforms.uTealMix.value) * lerpFactor;
    uniforms.uPointScale.value +=
      (profile.pointScale - uniforms.uPointScale.value) * lerpFactor;

    // Color morph (e.g. teal depth on cool routes → gold depth on About).
    uniforms.uColorNeutral.value.lerp(targets.current.base, lerpFactor);
    uniforms.uColorTeal.value.lerp(targets.current.accent, lerpFactor);

    // Pointer parallax + scroll drift on the wrapping group — the field leans
    // gently toward the cursor and rises as the page scrolls.
    const group = groupRef.current;
    if (group) {
      const targetRotX = pointer.current.y * 0.06 + scroll * SCROLL_INFLUENCE.pitch;
      const targetRotY = pointer.current.x * 0.09;
      const targetPosY = scroll * SCROLL_INFLUENCE.drift;

      group.rotation.x += (targetRotX - group.rotation.x) * lerpFactor;
      group.rotation.y += (targetRotY - group.rotation.y) * lerpFactor;
      group.position.y += (targetPosY - group.position.y) * lerpFactor;
    }
    /* eslint-enable react-hooks/immutability */
  });

  return (
    <group ref={groupRef}>
      <points geometry={buffers.geometry} material={material} />
    </group>
  );
}
