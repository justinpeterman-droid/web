import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto border-t border-white/10">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-medium text-white">{SITE_NAME}</p>
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            {SITE_TAGLINE}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Explore
          </p>
          <ul className="grid gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-shell border-t border-white/10 py-4 text-xs text-[var(--color-muted)]">
        © {year} {SITE_NAME}. Built with a persistent WebGL stage.
      </div>
    </footer>
  );
}
