// compress-video.mjs
// Comprime el video del taller a WebM (VP9) + MP4 (H.264) y extrae un poster.
// No requiere ffmpeg global: usa el binario estático de @ffmpeg-installer/ffmpeg.
//
// Input:  ../../WhatsApp Video 2026-07-26 at 19.36.18.mp4
// Output: ../public/video/hero.{webm,mp4} + hero-poster.jpg
//
// Uso:  npm run compress:video

import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../.."); // asesoria-himori/
const webRoot = path.resolve(__dirname, ".."); // web/

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const input = path.join(
  projectRoot,
  "WhatsApp Video 2026-07-26 at 19.36.18.mp4"
);
const outDir = path.join(webRoot, "public", "video");
fs.mkdirSync(outDir, { recursive: true });

const outWebm = path.join(outDir, "hero.webm");
const outMp4 = path.join(outDir, "hero.mp4");
const outPoster = path.join(outDir, "hero-poster.jpg");

const TRIM_DURATION = 20;
const MAX_WIDTH = 720;
const FPS = 30;

function logSize(p) {
  const mb = fs.statSync(p).size / 1024 / 1024;
  console.log(`  → ${path.basename(p)} (${mb.toFixed(2)} MB)`);
}

function compressToMp4() {
  return new Promise((resolve, reject) => {
    console.log("▸ Codificando hero.mp4 (H.264)…");
    ffmpeg(input)
      .outputOptions([
        "-c:v libx264",
        "-crf 28",
        "-preset slow",
        "-movflags +faststart",
        `-vf scale='min(${MAX_WIDTH},iw)':-2`,
        "-an",
        `-r ${FPS}`,
        `-t ${TRIM_DURATION}`,
      ])
      .output(outMp4)
      .on("end", () => {
        logSize(outMp4);
        resolve();
      })
      .on("error", reject)
      .run();
  });
}

function compressToWebm() {
  return new Promise((resolve, reject) => {
    console.log("▸ Codificando hero.webm (VP9)…");
    ffmpeg(input)
      .outputOptions([
        "-c:v libvpx-vp9",
        "-crf 35",
        "-b:v 0",
        "-row-mt 1",
        "-threads 4",
        `-vf scale='min(${MAX_WIDTH},iw)':-2`,
        "-an",
        `-r ${FPS}`,
        `-t ${TRIM_DURATION}`,
      ])
      .output(outWebm)
      .on("end", () => {
        logSize(outWebm);
        resolve();
      })
      .on("error", reject)
      .run();
  });
}

function extractPoster() {
  return new Promise((resolve, reject) => {
    console.log("▸ Extrayendo poster (frame @ 2s)…");
    ffmpeg(input)
      .on("end", () => {
        const kb = fs.statSync(outPoster).size / 1024;
        console.log(`  → ${path.basename(outPoster)} (${kb.toFixed(0)} KB)`);
        resolve();
      })
      .on("error", reject)
      .screenshots({
        timestamps: ["2.0"],
        filename: "hero-poster.jpg",
        folder: outDir,
        size: `${MAX_WIDTH}x?`,
      });
  });
}

(async () => {
  if (!fs.existsSync(input)) {
    console.error(`✗ No encuentro el video: ${input}`);
    process.exit(1);
  }
  console.log("Compresión de video Himori — hero.mp4 + hero.webm + poster\n");
  const t0 = Date.now();
  try {
    await compressToMp4();
    await compressToWebm();
    await extractPoster();
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`\n✓ Listo en ${dt}s`);
  } catch (e) {
    console.error("\n✗ Error:", e.message);
    process.exit(1);
  }
})();
