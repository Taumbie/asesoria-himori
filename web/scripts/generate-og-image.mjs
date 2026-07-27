// scripts/generate-og-image.mjs
// Genera la imagen Open Graph (1200×630) con sharp + SVG embebido.
// Sin Playwright ni Chromium: más liviano y más rápido para CI.

import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "og-image.png");

// SVG con la marca Himori en 1200x630. Terracota degradado,
// tipografía editorial (Georgia como fallback de Fraunces).
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5C2E25"/>
      <stop offset="100%" stop-color="#8B4A3F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decoración: círculo sutil -->
  <circle cx="980" cy="315" r="220" fill="none" stroke="#F5EBE6" stroke-opacity="0.12" stroke-width="1"/>
  <circle cx="980" cy="315" r="160" fill="none" stroke="#F5EBE6" stroke-opacity="0.08" stroke-width="1"/>

  <!-- Eyebrow -->
  <text x="80" y="155" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" letter-spacing="5" fill="#F5EBE6" opacity="0.85">TALLERES DE JOURNALING</text>

  <!-- Title -->
  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="140" font-weight="500" letter-spacing="-3" fill="#FAF6F1">Himori<tspan fill="#B07A6F">.</tspan></text>

  <!-- Tagline -->
  <text x="80" y="420" font-family="Georgia, serif" font-size="30" font-weight="300" font-style="italic" fill="#F5EBE6" opacity="0.92">Un espacio seguro para reencontrarte</text>
  <text x="80" y="460" font-family="Georgia, serif" font-size="30" font-weight="300" font-style="italic" fill="#F5EBE6" opacity="0.92">a través de la escritura.</text>

  <!-- Footer -->
  <text x="80" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" letter-spacing="3" fill="#F5EBE6" opacity="0.7">@PSICOISI · CONCEPCIÓN, CHILE</text>
</svg>`;

(async () => {
  console.log("Generando og-image.png (1200×630)…");
  await sharp(Buffer.from(svg))
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outFile);
  const kb = fs.statSync(outFile).size / 1024;
  console.log(`✓ og-image.png (${kb.toFixed(0)} KB)`);
})().catch((e) => {
  console.error("✗ Error:", e);
  process.exit(1);
});
