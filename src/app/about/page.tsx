import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About the studio — approach, background, and timeline.",
};

const timeline = [
  { year: "2025", text: "Placeholder milestone." },
  { year: "2024", text: "Placeholder milestone." },
  { year: "2023", text: "Placeholder milestone." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">About</h1>

      <p className="text-muted mt-6 text-lg leading-relaxed">
        Placeholder bio. We&apos;re a studio focused on immersive, performant web
        experiences — where 3D and motion serve the story rather than getting in
        its way.
      </p>
      <p className="text-muted mt-4 text-lg leading-relaxed">
        Second placeholder paragraph with more background detail to come.
      </p>

      <h2 className="font-display mt-12 text-2xl font-bold">Timeline</h2>
      <ol className="border-border mt-6 border-l">
        {timeline.map((item) => (
          <li key={item.year} className="border-border ml-0 border-b py-4 pl-6">
            <span className="text-accent font-mono text-sm">{item.year}</span>
            <p className="text-muted mt-1">{item.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
