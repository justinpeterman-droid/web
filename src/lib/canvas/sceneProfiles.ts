import type { SceneId } from "@/types/canvas";

/**
 * Per-route particle "personality" — the one persistent ParticleCloud lerps
 * toward the active profile, so navigation reads as a smooth morph between
 * rooms of the same world (never a hard scene cut).
 *
 * All values stay inside the Sage & Obsidian palette. `accent` is the depth
 * color the field mixes toward (teal for cool routes, gold for warm ones).
 */
export type SceneParticleProfile = {
  /** uDensity target — spatial spread of the field (0.85–1.15 usable). */
  density: number;
  /** uWarp target — wave displacement amplitude. */
  warp: number;
  /** uTealMix target — how strongly depth pulls toward the accent color. */
  accentMix: number;
  /** uPointScale target — particle size multiplier. */
  pointScale: number;
  /** Multiplier on uTime advancement — drift speed. */
  timeScale: number;
  /** Base particle color (near camera). */
  base: string;
  /** Depth accent color (far particles mix toward this). */
  accent: string;
};

const SAGE = "#8ba892";
const TEAL = "#5b7b7f";
const GOLD = "#d4c193";
const DEEP_TEAL = "#46595d";

export const SCENE_PARTICLE_PROFILES: Record<SceneId, SceneParticleProfile> = {
  /** Home — The Entryway: calm celestial baseline. */
  hero: {
    density: 0.92,
    warp: 0.38,
    accentMix: 0.75,
    pointScale: 1,
    timeScale: 1,
    base: SAGE,
    accent: TEAL,
  },
  /** Audio Library — The Flow: faster, ripple-like water motion. */
  audio: {
    density: 0.9,
    warp: 0.62,
    accentMix: 0.85,
    pointScale: 0.95,
    timeScale: 1.35,
    base: SAGE,
    accent: TEAL,
  },
  /** Services — The Grounding: slow, dense, rooted forest drift. */
  work: {
    density: 1.05,
    warp: 0.24,
    accentMix: 0.5,
    pointScale: 1.15,
    timeScale: 0.6,
    base: SAGE,
    accent: DEEP_TEAL,
  },
  /** Inked Integration — The Knowledge: quiet library stillness. */
  inked: {
    density: 0.85,
    warp: 0.3,
    accentMix: 0.55,
    pointScale: 0.9,
    timeScale: 0.75,
    base: SAGE,
    accent: TEAL,
  },
  /** About — The Guide: warm, gold-touched depth. */
  about: {
    density: 0.95,
    warp: 0.32,
    accentMix: 0.7,
    pointScale: 1.05,
    timeScale: 0.7,
    base: SAGE,
    accent: GOLD,
  },
  /** Contact — same warmth as About (form lives at /about#connect). */
  contact: {
    density: 0.95,
    warp: 0.3,
    accentMix: 0.65,
    pointScale: 1.05,
    timeScale: 0.7,
    base: SAGE,
    accent: GOLD,
  },
  /** Fallback for unmapped routes. */
  default: {
    density: 0.92,
    warp: 0.35,
    accentMix: 0.68,
    pointScale: 1,
    timeScale: 0.85,
    base: SAGE,
    accent: TEAL,
  },
};

/** How far scroll progress (0–1) pushes the field beyond its profile. */
export const SCROLL_INFLUENCE = {
  warp: 0.22,
  accentMix: 0.15,
  density: 0.08,
  /** World-units the field drifts upward over a full page scroll. */
  drift: 0.55,
  /** Radians of extra pitch at full scroll. */
  pitch: 0.1,
} as const;
