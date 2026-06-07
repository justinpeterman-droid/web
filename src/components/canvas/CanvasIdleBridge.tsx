"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

type CanvasIdleBridgeProps = {
  isRendering: boolean;
};

/**
 * Wakes the WebGL loop when interaction resumes (frameloop="demand").
 * Does not invalidate while idle — the canvas stays paused until activity.
 */
export function CanvasIdleBridge({ isRendering }: CanvasIdleBridgeProps) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (isRendering) invalidate();
  }, [isRendering, invalidate]);

  return null;
}
