"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { canvasScrollState } from "@/lib/canvas/scrollState";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/**
 * Lenis smooth scroll, bridged to both consumers of scroll position:
 * - GSAP ScrollTrigger (DOM reveal choreography) via ScrollTrigger.update
 * - the persistent canvas (scroll-driven particle uniforms) via canvasScrollState
 * Disabled when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      window.dispatchEvent(new CustomEvent("canvas:activity"));
      canvasScrollState.progress = Number.isFinite(lenis.progress)
        ? lenis.progress
        : 0;
      ScrollTrigger.update();
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      canvasScrollState.progress = 0;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
