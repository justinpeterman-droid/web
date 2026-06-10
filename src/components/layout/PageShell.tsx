import type { BackgroundKey } from "@/lib/constants";
import { PageIntro } from "@/components/layout/PageIntro";
import { PhantomBlendBackground } from "@/components/ui/PhantomBlendBackground";
import type { ReactNode } from "react";

type PageShellProps = {
  backgroundKey: BackgroundKey;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageShell({
  backgroundKey,
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main id="main-content" className="page-route relative pb-20">
      <PhantomBlendBackground backgroundKey={backgroundKey} />
      <div className="container-shell pt-10">
        <PageIntro eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </main>
  );
}
