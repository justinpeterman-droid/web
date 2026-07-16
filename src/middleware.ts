import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_ALLOWED_PATHS = new Set([
  "/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    MAINTENANCE_ALLOWED_PATHS.has(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
