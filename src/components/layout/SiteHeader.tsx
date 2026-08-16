"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

type SiteHeaderProps = {
  maintenanceMode?: boolean;
};

export function SiteHeader({ maintenanceMode = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const navLinks = maintenanceMode
    ? NAV_LINKS.filter((link) => link.href === "/")
    : NAV_LINKS;

  return (
    <header className="site-header">
      <div className="container-shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="brand-link">
          <Image
            src="/images/brand/hometown-serenity-logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="brand-logo"
          />
          <span>{SITE_NAME}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const hrefPath = link.href.split("#")[0] || "/";
              const active =
                hrefPath === "/"
                  ? pathname === "/"
                  : pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);

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
