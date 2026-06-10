import Image from "next/image";
import type { BackgroundKey } from "@/lib/constants";
import { BACKGROUND_IMAGES } from "@/lib/constants";

type PhantomBlendBackgroundProps = {
  backgroundKey: BackgroundKey;
  className?: string;
};

/**
 * V2 Phantom Blend: photographic texture desaturated into obsidian with sage/teal tint.
 */
export function PhantomBlendBackground({
  backgroundKey,
  className = "",
}: PhantomBlendBackgroundProps) {
  const src = BACKGROUND_IMAGES[backgroundKey];

  return (
    <div
      className={`phantom-blend pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="phantom-blend__image object-cover"
      />
      <div className="phantom-blend__tint" />
      <div className="phantom-blend__fade" />
    </div>
  );
}
