export type InkedEssay = {
  id: string;
  title: string;
  excerpt: string;
  /** Substack post URL — wire when publication is live */
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type InkedWrittenWord = {
  title: string;
  description: string;
  essays: readonly InkedEssay[];
  optInTitle: string;
  optInDescription: string;
};

export type InkedSpokenWord = {
  title: string;
  description: string;
  channelDescription: string;
  subscribeLabel: string;
};
