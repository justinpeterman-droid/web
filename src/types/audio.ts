export type AudioTrackTier = "free" | "premium";

export type AudioTrack = {
  id: string;
  title: string;
  description: string;
  duration?: string;
  /** Path under public/ or absolute URL — wire when MP3s are committed */
  audioSrc?: string;
  downloadUrl?: string;
  /** Premium checkout URL — falls back to discovery call when unset */
  checkoutUrl?: string;
  price?: string;
};

export type AudioLibrarySection = {
  title: string;
  subtitle: string;
  tracks: readonly AudioTrack[];
};
