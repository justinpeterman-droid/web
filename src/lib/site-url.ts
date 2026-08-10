const DEFAULT_SITE_URL = "http://localhost:3000";

function parseHttpUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/**
 * Keep build-time metadata resilient to host UIs that save cleared env vars as
 * empty strings or invalid values. SEO may still need a real production URL.
 */
export function getSiteUrl(): URL {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const parsedSiteUrl = configuredSiteUrl
    ? parseHttpUrl(configuredSiteUrl)
    : null;

  return parsedSiteUrl ?? new URL(DEFAULT_SITE_URL);
}

export function createSiteUrl(path: string = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
