/**
 * Mutable scroll state shared between the DOM (Lenis) and the canvas render
 * loop. A plain module object — NOT React state — so per-frame reads in
 * useFrame never trigger re-renders.
 */
export const canvasScrollState = {
  /** 0..1 progress through the current page's scrollable height. */
  progress: 0,
};
