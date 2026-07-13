// Stage 2 — splash filmstrip + reduced-motion proof.
// Freezes splash.html at six timeline points via ?t=<ms> and screenshots each,
// then renders a reduced-motion frame to prove the splash is skipped entirely.
// Run from the repo root: node design/stage2/render-splash.mjs
// Uses file:// URLs — no local server is spawned.

import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const rendersDir = path.join(here, "renders");
fs.mkdirSync(rendersDir, { recursive: true });

const fileUrl = pathToFileURL(path.join(here, "splash.html")).href;

// six representative beats (ms into the 3700ms timeline)
const frames = [
  { n: 1, t: 220, note: "panels closing" },
  { n: 2, t: 900, note: "cube line-draw (hex mid)" },
  { n: 3, t: 1750, note: "cube complete, nodes popping" },
  { n: 4, t: 2800, note: "full lockup: cube + text hold" },
  { n: 5, t: 3250, note: "panels parting, hero peeking" },
  { n: 6, t: 3700, note: "hero revealed" },
];

const browser = await chromium.launch();
try {
  for (const f of frames) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(`${fileUrl}?t=${f.t}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // deterministic freeze — re-pin every animation to the seek time regardless of rAF timing
    await page.evaluate((t) => {
      document.getAnimations().forEach((a) => {
        a.pause();
        a.currentTime = t;
      });
    }, f.t);
    const name = `splash-f${f.n}.png`;
    await page.screenshot({ path: path.join(rendersDir, name) });
    console.log(`rendered ${name}  (t=${f.t}ms — ${f.note})`);
    await page.close();
  }

  // reduced-motion proof: emulate `reduce`, confirm the splash overlay is gone
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const splashPresent = await page.evaluate(() => !!document.getElementById("splash"));
  await page.screenshot({ path: path.join(rendersDir, "splash-reduced-motion.png") });
  console.log(`reduced-motion: splash overlay present = ${splashPresent}  (expected false)`);
  if (splashPresent) {
    console.error("FAIL: splash overlay still in DOM under reduced motion");
    process.exitCode = 1;
  }
  await page.close();
} finally {
  await browser.close();
}
console.log("done");
