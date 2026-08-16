import Link from "next/link";
import {
  EXTERNAL_LINKS,
  NAV_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

type SiteFooterProps = {
  maintenanceMode?: boolean;
};

export function SiteFooter({ maintenanceMode = false }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const navLinks = maintenanceMode
    ? NAV_LINKS.filter((link) => link.href === "/")
    : NAV_LINKS;

  return (
    <footer className="site-footer mt-auto border-t border-white/10">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-medium text-[var(--color-parchment)]">{SITE_NAME}</p>
          <p className="max-w-md text-sm text-[var(--color-muted)]">{SITE_TAGLINE}</p>
          <p className="text-sm text-[var(--color-muted)]">
            {EXTERNAL_LINKS.phoneDisplay} · {EXTERNAL_LINKS.emailDisplay}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Explore
          </p>
          <ul className="grid gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Follow
          </p>
          <ul className="grid gap-2 text-sm">
            <li>
              <a href={EXTERNAL_LINKS.instagram} className="footer-link" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.facebook} className="footer-link" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.indeed} className="footer-link" target="_blank" rel="noopener noreferrer">
                Indeed
              </a>
            </li>
            {EXTERNAL_LINKS.youtubeChannel ? (
              <li>
                <a
                  href={EXTERNAL_LINKS.youtubeChannel}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="container-shell border-t border-white/10 py-4 text-xs text-[var(--color-muted)]">
        © {year} {SITE_NAME}. Clinical hypnotherapy & behavioral coaching.
      </div>
    </footer>
  );
}
