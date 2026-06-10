import { EXTERNAL_LINKS, PRACTITIONER_CREDENTIALS, PRACTITIONER_NAME } from "@/lib/constants";

export const hometownContent = {
  maintenance: {
    heroTitle: "Hometown Serenity",
    heroSubtitle: `${PRACTITIONER_NAME}, ${PRACTITIONER_CREDENTIALS}`,
    tagline:
      "Allow self-discovery to flow through you and illuminate your soul's purpose",
    footerLine: "Where the nervous system finds its way home.",
    statusLine:
      "Our full website is being refined. Everything you need is still here.",
  },
  home: {
    eyebrow: "The Entryway",
    title: "Welcome to Hometown Serenity",
    subtitle: PRACTITIONER_NAME,
    credentials: PRACTITIONER_CREDENTIALS,
    description:
      "Nervous System Healing, Mind-Body Alchemy, and Self-Discovery.",
    tagline:
      "Allow self-discovery to flow through you and illuminate your soul's purpose.",
    discoveryCta: "Book Free Discovery Call",
    pillars: [
      {
        eyebrow: "The Grounding",
        title: "Services",
        description:
          "Discovery calls, 1:1 integration sessions, and handwriting analysis in a grounded container.",
        href: "/services",
      },
      {
        eyebrow: "The Flow",
        title: "Audio Library",
        description:
          "Open Sanctuary tracks for regulation, plus premium Deep Dive audio for integration.",
        href: "/audio-library",
      },
      {
        eyebrow: "The Knowledge",
        title: "Inked Integration",
        description:
          "Written essays, spoken word, and reflective practices for inner excavation.",
        href: "/inked-integration",
      },
    ],
  },
  about: {
    eyebrow: "A Fellow Traveler on the Path to Self-Discovery.",
    title: "I am Ashley Romero.",
    bio: `I'm Ashley Romero, a practitioner of clinical hypnotherapy and behavioral coaching. My work at Hometown Serenity is rooted in the belief that everyone possesses a vibrant, iridescent soul purpose that simply needs the right environment to illuminate. I am not here to fix you; I am here to help you peel back the layers and reconstruct an identity that feels authentically yours.`,
    pullQuote:
      "I know what it feels like to navigate the world through the lens of your titles…",
    closingLine: "Allow the veil to lift. The light was always there.",
    credentials: `${PRACTITIONER_CREDENTIALS} · AOS Mind Body Psychology (graduating June 2027) · ISSA Yoga 200`,
    seals: [
      {
        id: "aha",
        src: "/images/badges/aha-seal.webp",
        alt: "American Hypnosis Association member seal",
      },
      {
        id: "hmi",
        src: "/images/badges/hmi-58-years-seal.webp",
        alt: "Hypnosis Motivation Institute — 58 years of excellence",
      },
      {
        id: "issa",
        src: "/images/badges/issa-certified-seal.webp",
        alt: "ISSA certified — International Sports Sciences Association",
      },
    ],
  },
  bridgeSections: [
    {
      title: "Begin Your Journey",
      links: [
        {
          label: "Book Free Discovery Call",
          href: EXTERNAL_LINKS.discoveryCall,
          variant: "gold" as const,
        },
        {
          label: "Schedule 1:1 Session",
          href: EXTERNAL_LINKS.integrationSession,
          variant: "gold" as const,
        },
        {
          label: "Serenity Sanctuary App",
          href: EXTERNAL_LINKS.serenityApp,
          variant: "sage" as const,
        },
      ],
    },
    {
      title: "Free Resources",
      links: [
        {
          label: "Sample Dream Journal",
          href: EXTERNAL_LINKS.dreamJournalSample,
          variant: "ghost" as const,
          description: "Preview the Sanctuary Toolkit dream journal.",
        },
        {
          label: "Handwriting Analysis — Free Mini Reading",
          href: EXTERNAL_LINKS.handwritingJotform,
          variant: "ghost" as const,
          description: "Submit a sample for a complimentary mini reading.",
        },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          label: EXTERNAL_LINKS.phoneDisplay,
          href: EXTERNAL_LINKS.phone,
          variant: "ghost" as const,
        },
        {
          label: EXTERNAL_LINKS.emailDisplay,
          href: EXTERNAL_LINKS.email,
          variant: "ghost" as const,
        },
      ],
    },
    {
      title: "Follow Along",
      links: [
        {
          label: "Instagram",
          href: EXTERNAL_LINKS.instagram,
          variant: "ghost" as const,
        },
        {
          label: "Facebook",
          href: EXTERNAL_LINKS.facebook,
          variant: "ghost" as const,
        },
        {
          label: "Indeed",
          href: EXTERNAL_LINKS.indeed,
          variant: "ghost" as const,
        },
      ],
    },
  ],
} as const;
