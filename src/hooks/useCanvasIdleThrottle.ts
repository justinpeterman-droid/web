"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_IDLE_MS = 3_000;

const ACTIVITY_EVENTS = [
  "scroll",
  "wheel",
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
  /** Emitted by SmoothScrollProvider when Lenis scrolls (no native scroll event). */
  "canvas:activity",
] as const;

/**
 * Returns whether the canvas should actively render (user recently interacted).
 * After `idleMs` without scroll or interaction, `isRendering` becomes false.
 */
export function useCanvasIdleThrottle(idleMs: number = DEFAULT_IDLE_MS) {
  const [isRendering, setIsRendering] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleIdle = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsRendering(false), idleMs);
  }, [idleMs]);

  const markActive = useCallback(() => {
    setIsRendering(true);
    scheduleIdle();
  }, [scheduleIdle]);

  useEffect(() => {
    scheduleIdle();

    const onActivity = () => markActive();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [markActive, scheduleIdle]);

  return { isRendering, markActive };
}
