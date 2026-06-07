import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PersistentCanvasLazy } from "@/components/canvas/PersistentCanvas";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { AppProviders } from "@/components/providers/AppProviders";
import { RouteSceneSync } from "@/components/providers/RouteSceneSync";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createPageMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>
          <SkipLink />
          <PersistentCanvasLazy />
          <RouteSceneSync />
          <SiteHeader />
          <div className="page-shell">{children}</div>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
