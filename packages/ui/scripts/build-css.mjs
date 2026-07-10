import { readFile, writeFile, mkdir, copyFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import postcssImport from "postcss-import";

const pkgRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const entry = join(pkgRoot, "src/styles.css");
const outDir = join(pkgRoot, "dist");
const out = join(outDir, "styles.css");
const fontsSrcDir = join(pkgRoot, "src/fonts");

const css = await readFile(entry, "utf8");
const result = await postcss([postcssImport()]).process(css, { from: entry, to: out });

await mkdir(outDir, { recursive: true });
await writeFile(out, result.css);

// postcss-import flattens every @import into one file but does NOT rewrite
// relative url() targets inside them — so font url()s written relative to
// src/fonts/ must physically land next to the flattened dist/styles.css.
const fontFiles = (await readdir(fontsSrcDir)).filter((f) => f.endsWith(".woff2"));
await Promise.all(
  fontFiles.map((f) => copyFile(join(fontsSrcDir, f), join(outDir, f))),
);

console.log(
  `built ${out} (${(result.css.length / 1024).toFixed(1)} KB, imports flattened, ${fontFiles.length} font file(s) copied)`,
);
