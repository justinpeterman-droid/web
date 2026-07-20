const DEFAULT_PUBLIC_SITE_URL = "https://hometownserenity.com";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getPublicSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return trimTrailingSlash(configuredSiteUrl);
  }

  return DEFAULT_PUBLIC_SITE_URL;
}
