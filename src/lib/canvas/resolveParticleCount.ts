/** Desktop baseline — tuned for mid-range laptop GPUs. */
export const DEFAULT_PARTICLE_COUNT = 12_000;

/** Mobile/coarse pointer: reduce allocation by 60% (keep 40%). */
export const MOBILE_PARTICLE_MULTIPLIER = 0.4;

const MOBILE_MAX_WIDTH_QUERY = "(max-width: 768px)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";

export function isMobileParticleProfile(
  viewport: Pick<Window, "matchMedia"> = window,
): boolean {
  return (
    viewport.matchMedia(MOBILE_MAX_WIDTH_QUERY).matches ||
    viewport.matchMedia(COARSE_POINTER_QUERY).matches
  );
}

/**
 * Resolves particle buffer size for the current device/viewport.
 * On mobile or coarse-pointer devices, allocation is scaled down by 60%.
 */
export function resolveParticleCount(
  baseCount: number = DEFAULT_PARTICLE_COUNT,
  viewport: Pick<Window, "matchMedia"> = window,
): number {
  const scaled = isMobileParticleProfile(viewport)
    ? baseCount * MOBILE_PARTICLE_MULTIPLIER
    : baseCount;

  return Math.max(512, Math.floor(scaled));
}
