import {
  EXTERNAL_LINKS,
  PRACTITIONER_NAME,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * JSON-LD describing the practice as a ProfessionalService with Ashley as the
 * founder. Rendered once in the root layout for rich-results eligibility.
 */
export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    telephone: EXTERNAL_LINKS.phoneDisplay,
    email: EXTERNAL_LINKS.emailDisplay,
    founder: {
      "@type": "Person",
      name: PRACTITIONER_NAME,
      jobTitle: "Clinical Hypnotherapist & Behavioral Coach",
    },
    sameAs: [
      EXTERNAL_LINKS.instagram,
      EXTERNAL_LINKS.facebook,
      EXTERNAL_LINKS.indeed,
    ].filter(Boolean),
  };
}
