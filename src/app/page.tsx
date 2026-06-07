import Link from "next/link";
import SpinningCubeSmokeTest from "@/components/SpinningCubeSmokeTest";
import { projects } from "@/lib/projects";
import { siteSettings } from "@/lib/site";

// Home metadata uses the layout's title template (default applies here).
export const metadata = {
  description:
    "Selected immersive work, built around a single persistent 3D canvas.",
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero — placeholder. The cube is the Phase 1 smoke test; in Phase 4 it
          moves into the persistent canvas and is removed from this page. */}
      <section className="grid items-center gap-8 py-20 sm:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            {siteSettings.tagline}
          </h1>
          <p className="text-muted max-w-md text-lg">
            A portfolio that feels immersive everywhere and still loads fast —
            one 3D scene that follows you through the site.
          </p>
          <div className="flex gap-4">
            <Link
              href="/work"
              className="bg-accent text-accent-foreground rounded px-5 py-3 text-sm font-medium"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="border-border hover:bg-surface rounded border px-5 py-3 text-sm font-medium transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="h-[40vh] min-h-64 w-full" aria-hidden="true">
          <SpinningCubeSmokeTest />
        </div>
      </section>

      {/* Selected work preview row */}
      <section className="py-16" aria-labelledby="selected-work">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 id="selected-work" className="font-display text-3xl font-bold">
            Selected work
          </h2>
          <Link
            href="/work"
            className="text-muted hover:text-foreground text-sm transition-colors"
          >
            All work →
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="border-border bg-surface hover:bg-surface-raised block rounded-lg border p-6 transition-colors"
              >
                <div className="bg-surface-raised mb-4 aspect-video rounded" />
                <h3 className="font-display text-xl font-semibold">
                  {p.title}
                </h3>
                <p className="text-muted mt-1 text-sm">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Intro section */}
      <section className="border-border border-t py-16" aria-labelledby="intro">
        <h2 id="intro" className="font-display text-3xl font-bold">
          About the studio
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          Placeholder intro copy. We design and build immersive web experiences
          where 3D enhances the story without slowing it down.
        </p>
      </section>
    </div>
  );
}
