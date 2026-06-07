import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Body font — readable, neutral. Loaded via next/font for zero layout shift.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Display font — geometric grotesk for a precise, cinematic heading voice.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO baseline (Phase 2 a11y/SEO rule). metadataBase lets relative OG URLs resolve.
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Studio — Immersive Portfolio",
    template: "%s · Studio",
  },
  description:
    "An immersive portfolio built around a single persistent 3D canvas — precise, cinematic, warm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col">
        {/*
          PERSISTENT CANVAS MOUNT POINT (Phase 4).
          The single <Canvas> will mount HERE — fixed to the viewport, stacked
          ABOVE the page content in DOM order so it can sit behind or in front
          via z-index/pointer-events. Do NOT mount any per-page canvas; that
          defeats the whole persistent-canvas architecture. Left intentionally
          empty until Phase 4.
        */}

        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
