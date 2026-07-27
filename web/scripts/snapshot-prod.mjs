// scripts/snapshot-prod.mjs
// Captura un screenshot del sitio en producción para verificar.

import playwright from "file:///C:/Users/yessi/AppData/Roaming/npm/node_modules/playwright/index.js";
const { chromium } = playwright;
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../..", "preview-landing");
fs.mkdirSync(outDir, { recursive: true });

const URL = "https://taumbie.github.io/asesoria-himori/";

async function activateReveals(page) {
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
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluateHandle("document.fonts.ready");
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: path.join(outDir, "00-PROD-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("✓ 00-PROD-hero.png");

  await activateReveals(page);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, "00-PROD-fullpage.png"),
    fullPage: true,
  });
  console.log("✓ 00-PROD-fullpage.png");

  await browser.close();
  console.log("\n✓ Listo");
})().catch((e) => { console.error("✗", e); process.exit(1); });
