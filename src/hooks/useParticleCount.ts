"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PARTICLE_COUNT,
  resolveParticleCount,
} from "@/lib/canvas/resolveParticleCount";

/**
 * Reactive particle count — re-resolves when viewport crosses mobile breakpoints.
 */
export function useParticleCount(
  baseCount: number = DEFAULT_PARTICLE_COUNT,
): number {
  const [count, setCount] = useState(baseCount);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const sync = () => setCount(resolveParticleCount(baseCount));

    sync();
    mobileQuery.addEventListener("change", sync);
    coarseQuery.addEventListener("change", sync);

    return () => {
      mobileQuery.removeEventListener("change", sync);
      coarseQuery.removeEventListener("change", sync);
    };
  }, [baseCount]);

  return count;
}
