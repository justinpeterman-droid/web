"use client";

import Image from "next/image";
import { useState } from "react";
import { hometownContent } from "@/lib/content/hometown";
import { PRACTITIONER_CREDENTIALS, PRACTITIONER_NAME } from "@/lib/constants";

export function AccreditationBadges() {
  const { seals } = hometownContent.about;
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  return (
    <div className="accreditation-badges">
      <div className="accreditation-badges__seals" role="list" aria-label="Accreditation seals">
        {seals.map((seal) => (
          <div key={seal.id} className="accreditation-badges__seal" role="listitem">
            {failedIds.has(seal.id) ? (
              <span className="accreditation-badges__fallback" title={seal.alt}>
                {seal.id.toUpperCase()}
              </span>
            ) : (
              <Image
                src={seal.src}
                alt={seal.alt}
                width={72}
                height={72}
                className="accreditation-badges__image"
                onError={() =>
                  setFailedIds((prev) => new Set(prev).add(seal.id))
                }
              />
            )}
          </div>
        ))}
      </div>
      <p className="accreditation-badges__text">
        {PRACTITIONER_NAME}, {PRACTITIONER_CREDENTIALS}
      </p>
    </div>
  );
}
