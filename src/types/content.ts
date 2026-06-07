export type Project = {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  services: string[];
  coverImage?: string;
  featured?: boolean;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  aboutIntro: string;
  contactEmail: string;
};
