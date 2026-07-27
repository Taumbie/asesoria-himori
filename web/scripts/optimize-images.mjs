// optimize-images.mjs
// Optimiza las 4 fotos del taller a WebP responsive (sm/md/lg) usando sharp.
//
// Input:  ../../WhatsApp Image 2026-07-26 at *.jpeg
// Output: ../public/images/taller-{01..04}-{sm,md,lg}.webp
//
// Uso:  npm run optimize:images

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../.."); // asesoria-himori/
const outDir = path.resolve(__dirname, "../public/images");
fs.mkdirSync(outDir, { recursive: true });

const images = [
  { input: "WhatsApp Image 2026-07-26 at 19.36.16.jpeg", slug: "taller-01" },
  { input: "WhatsApp Image 2026-07-26 at 19.36.17.jpeg", slug: "taller-02" },
  { input: "WhatsApp Image 2026-07-26 at 19.36.17 (1).jpeg", slug: "taller-03" },
  { input: "WhatsApp Image 2026-07-26 at 19.36.18.jpeg", slug: "taller-04" },
];

const sizes = [
  { suffix: "sm", width: 480 },
  { suffix: "md", width: 768 },
  { suffix: "lg", width: 1200 },
];

async function processOne({ input, slug }) {
  const inputPath = path.join(projectRoot, input);
  if (!fs.existsSync(inputPath)) {
    console.warn(`  ⚠ No encontrado: ${input}`);
    return;
  }
  const meta = await sharp(inputPath).metadata();
  console.log(`▸ ${slug} (${meta.width}×${meta.height})`);

  for (const { suffix, width } of sizes) {
    const out = path.join(outDir, `${slug}-${suffix}.webp`);
    await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(out);
    const kb = fs.statSync(out).size / 1024;
    console.log(`  → ${path.basename(out)} (${kb.toFixed(0)} KB)`);
  }
}

(async () => {
  console.log("Optimización de imágenes del taller — WebP responsive\n");
  const t0 = Date.now();
  for (const img of images) {
    await processOne(img);
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n✓ Listo en ${dt}s`);
})().catch((e) => {
  console.error("✗ Error:", e);
  process.exit(1);
});
