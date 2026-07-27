// scripts/snapshot.mjs
// Captura screenshots del sitio estático para previsualización.
// Hace scroll programático para activar todos los IntersectionObservers
// (Reveal) antes de tomar el fullPage screenshot.

import playwright from "file:///C:/Users/yessi/AppData/Roaming/npm/node_modules/playwright/index.js";
const { chromium } = playwright;
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
const outDir = path.join(projectRoot, "preview-landing");
fs.mkdirSync(outDir, { recursive: true });

const URL = process.env.SITE_URL || "http://localhost:3001/asesoria-himori/";

async function activateReveals(page) {
  // Scroll lento de arriba a abajo para activar los IntersectionObservers
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = window.innerHeight / 2;
      const id = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(id);
          window.scrollTo(0, 0);
          setTimeout(resolve, 800);
        }
      }, 200);
    });
  });
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  console.log("Cargando", URL);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluateHandle("document.fonts.ready");
  await page.waitForTimeout(1500);

  // Hero (above the fold)
  await page.screenshot({
    path: path.join(outDir, "01-hero-desktop.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("✓ 01-hero-desktop.png");

  // Activar todos los Reveal con scroll programático
  console.log("Activando animaciones de scroll…");
  await activateReveals(page);
  await page.waitForTimeout(500);

  // Full page desktop (ahora con todo visible)
  await page.screenshot({
    path: path.join(outDir, "02-fullpage-desktop.png"),
    fullPage: true,
  });
  console.log("✓ 02-fullpage-desktop.png");

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await activateReveals(page);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, "03-fullpage-mobile.png"),
    fullPage: true,
  });
  console.log("✓ 03-fullpage-mobile.png");

  await browser.close();
  console.log("\n✓ Screenshots en:", outDir);
})().catch((e) => { console.error("✗", e); process.exit(1); });
