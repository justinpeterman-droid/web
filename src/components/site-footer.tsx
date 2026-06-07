import { siteSettings } from "@/lib/site";

/** Site footer (Phase 3): social links, contact email, copyright. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-display font-bold">{siteSettings.title}</span>
          <a
            href={`mailto:${siteSettings.contactEmail}`}
            className="text-muted hover:text-foreground text-sm transition-colors"
          >
            {siteSettings.contactEmail}
          </a>
        </div>

        <nav aria-label="Social">
          <ul className="flex gap-6">
            {siteSettings.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground text-sm transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-subtle text-sm">
          © {year} {siteSettings.title}
        </p>
      </div>
    </footer>
  );
}
