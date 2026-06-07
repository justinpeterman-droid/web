import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of immersive projects and case studies.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Work</h1>
      <p className="text-muted mt-3 max-w-xl text-lg">
        Selected projects. Content is placeholder until the CMS lands (Phase 7).
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="border-border bg-surface hover:bg-surface-raised block h-full rounded-lg border p-6 transition-colors"
            >
              <div className="bg-surface-raised mb-4 aspect-video rounded" />
              <h2 className="font-display text-xl font-semibold">{p.title}</h2>
              <p className="text-subtle mt-1 text-sm">
                {p.role} · {p.year}
              </p>
              <p className="text-muted mt-2 text-sm">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
