export type SceneId =
  | "hero"
  | "work"
  | "about"
  | "contact"
  | "default";

export type SceneConfig = {
  id: SceneId;
  slug?: string;
};
