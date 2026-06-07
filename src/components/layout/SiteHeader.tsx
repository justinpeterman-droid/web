"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container-shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="brand-link">
          <span className="brand-mark" aria-hidden="true" />
          <span>{SITE_NAME}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx("nav-link", active && "nav-link-active")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
