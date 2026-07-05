import sharp from "sharp";
import { stat } from "node:fs/promises";

const kb = async (p) => `${((await stat(p)).size / 1024).toFixed(0)}K`;

// ── Logo: trim white margins → square → circular alpha mask → 512px WebP ──
async function logo() {
  const src = "public/images/brand/hometown-serenity-logo-mark.png";
  const out = "public/images/brand/hometown-serenity-logo-mark.webp";

  // 1. Trim the baked white background down to the circle's bounding box.
  const trimmed = await sharp(src)
    .trim({ background: "#ffffff", threshold: 12 })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  const side = Math.max(meta.width, meta.height);

  // 2. Pad to an exact square (white padding — masked away next).
  const squared = await sharp(trimmed)
    .extend({
      top: Math.floor((side - meta.height) / 2),
      bottom: Math.ceil((side - meta.height) / 2),
      left: Math.floor((side - meta.width) / 2),
      right: Math.ceil((side - meta.width) / 2),
      background: "#ffffff",
    })
    .resize(512, 512)
    .toBuffer();

  // 3. Circular mask (r slightly inset to swallow any white halo at the rim).
  const mask = Buffer.from(
    `<svg width="512" height="512"><circle cx="256" cy="256" r="253" fill="#fff"/></svg>`,
  );

  await sharp(squared)
    .composite([{ input: mask, blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(out);

  console.log("logo:", await kb(src), "->", await kb(out));
}

// ── Backgrounds: cap at 1920w, re-encode WebP q80 ──
async function backgrounds() {
  const names = [
    "about-mountains",
    "audio-water-ripples",
    "home-celestial",
    "inked-bookshelf",
    "services-forest",
  ];

  for (const name of names) {
    const src = `public/images/backgrounds/${name}.jpg`;
    const out = `public/images/backgrounds/${name}.webp`;
    const meta = await sharp(src).metadata();

    await sharp(src)
      .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);

    console.log(
      `${name}: ${meta.width}x${meta.height}`,
      await kb(src),
      "->",
      await kb(out),
    );
  }
}

await logo();
await backgrounds();
