"use client";

import { useEffect } from "react";
import { PageIntro } from "@/components/layout/PageIntro";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="container-shell py-20">
      <PageIntro
        eyebrow="Something interrupted the flow"
        title="We hit an unexpected moment"
        description="Take a breath — the page can be reloaded. If it keeps happening, please reach out and we’ll help."
      />
      <button type="button" onClick={() => reset()} className="button-primary">
        Try again
      </button>
    </main>
  );
}
