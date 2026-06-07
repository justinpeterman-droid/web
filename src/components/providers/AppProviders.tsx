"use client";

import type { ReactNode } from "react";
import { CanvasProvider } from "@/components/providers/CanvasProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CanvasProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </CanvasProvider>
  );
}
