"use client";

import { useState } from "react";

export type AccreditationSeal = {
  id: string;
  src: string;
  alt: string;
};

export type AccreditationBadgesProps = {
  /** Circular certification seals, shown in order. */
  seals: AccreditationSeal[];
  /** Practitioner name + credentials line under the seals row. */
  credentialLine: string;
  className?: string;
};

/**
 * Row of certification seals with a credential caption underneath. Falls
 * back to a text badge (the seal id, uppercased) if an image 404s — trust
 * marks should never silently vanish.
 */
export function AccreditationBadges({
  seals,
  credentialLine,
  className = "",
}: AccreditationBadgesProps) {
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  return (
    <div className={`accreditation-badges ${className}`}>
      <div className="accreditation-badges__seals" role="list" aria-label="Accreditation seals">
        {seals.map((seal) => (
          <div key={seal.id} className="accreditation-badges__seal" role="listitem">
            {failedIds.has(seal.id) ? (
              <span className="accreditation-badges__fallback" title={seal.alt}>
                {seal.id.toUpperCase()}
              </span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- framework-agnostic package, no next/image here
              <img
                src={seal.src}
                alt={seal.alt}
                width={72}
                height={72}
                className="accreditation-badges__image"
                onError={() => setFailedIds((prev) => new Set(prev).add(seal.id))}
              />
            )}
          </div>
        ))}
      </div>
      <p className="accreditation-badges__text">{credentialLine}</p>
    </div>
  );
}
