"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { CanvasIdleBridge } from "@/components/canvas/CanvasIdleBridge";
import { SceneRenderer } from "@/components/canvas/SceneRenderer";
import { useCanvasIdleThrottle } from "@/hooks/useCanvasIdleThrottle";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ONE persistent WebGL canvas for the entire app shell.
 * It never unmounts on route changes — pages only change scene intent.
 */
export function PersistentCanvas() {
  const reducedMotion = useReducedMotion();
  const { isRendering } = useCanvasIdleThrottle(3_000);

  const frameloop =
    reducedMotion || !isRendering ? "demand" : "always";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-[100dvh] w-full"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={reducedMotion ? 1 : [1, 1.75]}
        gl={{
          antialias: !reducedMotion,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={frameloop}
      >
        <CanvasIdleBridge isRendering={isRendering && !reducedMotion} />
        <SceneRenderer isCanvasActive={isRendering && !reducedMotion} />
      </Canvas>
    </div>
  );
}

export const PersistentCanvasLazy = dynamic(
  () => Promise.resolve(PersistentCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-[var(--color-canvas-fallback)]"
      />
    ),
  },
);
