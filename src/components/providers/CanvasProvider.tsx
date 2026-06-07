"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SceneConfig, SceneId } from "@/types/canvas";

type CanvasContextValue = {
  scene: SceneConfig;
  setScene: (scene: SceneConfig) => void;
  setSceneId: (id: SceneId, slug?: string) => void;
};

const CanvasContext = createContext<CanvasContextValue | null>(null);

export function CanvasProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<SceneConfig>({ id: "hero" });

  const setSceneId = useCallback((id: SceneId, slug?: string) => {
    setScene({ id, slug });
  }, []);

  const value = useMemo(
    () => ({ scene, setScene, setSceneId }),
    [scene, setSceneId],
  );

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within CanvasProvider");
  }
  return context;
}
