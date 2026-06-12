import { ImageResponse } from "next/og";
import {
  PRACTITIONER_CREDENTIALS,
  PRACTITIONER_NAME,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Sage & Obsidian Alchemy palette (V2 tokens).
const OBSIDIAN = "#181C1F";
const SAGE = "#8BA892";
const GOLD = "#D4C193";
const PARCHMENT = "#F7F7F2";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `radial-gradient(circle at 30% 20%, #232a2e 0%, ${OBSIDIAN} 60%)`,
          color: PARCHMENT,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: SAGE,
          }}
        >
          Clinical Hypnotherapy &amp; Healing
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 36,
            marginTop: 28,
            color: PARCHMENT,
            opacity: 0.85,
            maxWidth: 900,
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: "auto",
            color: GOLD,
          }}
        >
          {`${PRACTITIONER_NAME}, ${PRACTITIONER_CREDENTIALS}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
