export type SceneId =
  | "hero"
  | "work"
  | "work-detail"
  | "about"
  | "contact"
  | "default";

export type SceneConfig = {
  id: SceneId;
  /** Optional slug passed to work-detail scenes */
  slug?: string;
};
