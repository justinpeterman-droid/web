"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the rise begins once in view. */
  delay?: number;
  /** Pixels the content rises from. */
  y?: number;
  /**
   * When set, animates the element's direct children with this stagger
   * (seconds) instead of the wrapper — use on grids so cards cascade in.
   */
  stagger?: number;
};

/**
 * Scroll-triggered rise/fade reveal.
 *
 * - Content is visible by default; GSAP hides it only after JS runs, so no-JS
 *   and reduced-motion visitors always see everything.
 * - gsap.context().revert() on cleanup kills the tween AND its ScrollTrigger,
 *   so route changes never orphan triggers (Phase 6 checklist rule).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets =
        stagger !== undefined && el.children.length > 0
          ? Array.from(el.children)
          : el;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
