import type { SceneId } from "@/types/canvas";

export const SITE_NAME = "Hometown Serenity";
export const SITE_TAGLINE = "Where the nervous system finds its way home.";
export const PRACTITIONER_NAME = "Ashley Romero";
export const PRACTITIONER_CREDENTIALS = "CMH · CAHA";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/audio-library", label: "Audio Library" },
  { href: "/services", label: "Services" },
  { href: "/inked-integration", label: "Inked Integration" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/about#connect", label: "Contact" },
] as const;

export const EXTERNAL_LINKS = {
  discoveryCall: "https://calendar.app.google/cRjyQ2t3FXPMPLSC7",
  integrationSession: "https://calendar.app.google/cRjyQ2t3FXPMPLSC7",
  serenityApp: "https://www.jotform.com/app/261251095682155",
  canvaSite: "https://hometownserenity.my.canva.site/ashmarie423",
  dreamJournalSample:
    "https://drive.google.com/file/d/1ioXAcCwEHSMNmDIrIL15oXs-9syZVdUf/view?usp=drivesdk",
  handwritingJotform: "https://form.jotform.com/261354618025050",
  phone: "tel:8707501275",
  phoneDisplay: "(870) 750-1275",
  email: "mailto:ashleyromero@hometownserenity.com",
  emailDisplay: "ashleyromero@hometownserenity.com",
  instagram:
    "https://www.instagram.com/hometownserenity?igsh=emI5aG9ubnY4M3U3&utm_source=qr",
  facebook: "https://www.facebook.com/profile.php?id=61583873646491",
  indeed: "https://profile.indeed.com/p/ashleyr-y56g66d",
  /** Substack publication + subscribe — wire when live */
  substackPublication: "",
  substackSubscribe: "",
  /** YouTube channel + one featured embed ID */
  youtubeChannel: "",
  youtubeFeaturedVideoId: "",
} as const;

export const ROUTE_SCENE_MAP: Record<string, SceneId> = {
  "/": "hero",
  "/audio-library": "work",
  "/services": "work",
  "/inked-integration": "about",
  "/resources": "hero",
  "/about": "about",
  "/contact": "contact",
};

export const BACKGROUND_IMAGES = {
  home: "/images/backgrounds/home-celestial.jpg",
  audio: "/images/backgrounds/audio-water-ripples.jpg",
  services: "/images/backgrounds/services-forest.jpg",
  inked: "/images/backgrounds/inked-bookshelf.jpg",
  resources: "/images/backgrounds/home-celestial.jpg",
  about: "/images/backgrounds/about-mountains.jpg",
  maintenance: "/images/backgrounds/home-celestial.jpg",
} as const;

export type BackgroundKey = keyof typeof BACKGROUND_IMAGES;
