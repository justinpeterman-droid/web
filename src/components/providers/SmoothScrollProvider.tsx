"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function getCurrentHashTarget() {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) return null;

  try {
    return document.getElementById(decodeURIComponent(rawHash));
  } catch {
    return document.getElementById(rawHash);
  }
}

/**
 * Lenis smooth scroll integrates with GSAP ScrollTrigger in scroll-driven scenes.
 * Disabled when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      window.dispatchEvent(new CustomEvent("canvas:activity"));
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
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const frame = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      lenis.resize();

      const hashTarget = getCurrentHashTarget();
      lenis.scrollTo(hashTarget ?? 0, { immediate: true });
      window.dispatchEvent(new CustomEvent("canvas:activity"));
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname, reducedMotion]);

  return <>{children}</>;
}
