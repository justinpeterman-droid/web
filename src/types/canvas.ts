export type SceneId =
  | "hero"
  | "audio"
  | "work"
  | "inked"
  | "about"
  | "contact"
  | "default";

export type SceneConfig = {
  id: SceneId;
  slug?: string;
};
