// Stage 2 — renders every redesigned-section mock at {dark,light} × {1440,390},
// plus the hero AR/RTL proof (dark, 1440).
// Run from the repo root: node design/stage2/render-stage2.mjs
// Uses file:// URLs — no local server is spawned.

import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const rendersDir = path.join(here, "renders");
fs.mkdirSync(rendersDir, { recursive: true });

// "offer" is the merged How We Work & What You Get section (Process folded in —
// the standalone process.html mock is retired).
const all = ["hero", "gap", "build", "work", "offer", "guarantee", "faq", "contact"];
// optional filter: node render-stage2.mjs build,gap  (hero-ar only renders unfiltered)
const filter = process.argv[2];
const sections = filter ? filter.split(",") : all;

const browser = await chromium.launch();
try {
  for (const section of sections) {
    const url = pathToFileURL(path.join(here, `${section}.html`)).href;
    for (const theme of ["dark", "light"]) {
      for (const width of [1440, 390]) {
        const page = await browser.newPage({
          viewport: { width, height: width === 1440 ? 900 : 844 },
          deviceScaleFactor: 1,
        });
        await page.goto(url, { waitUntil: "networkidle" });
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
        await page.evaluate(() => document.fonts.ready);
        const name = `${section}-${theme}-${width}.png`;
        await page.screenshot({ path: path.join(rendersDir, name), fullPage: true });
        console.log(`rendered ${name}`);
        await page.close();
      }
    }
  }
  if (!filter) {
    // hero AR/RTL risk proof
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(here, "hero-ar.html")).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(rendersDir, "hero-ar-dark-1440.png"), fullPage: true });
    console.log("rendered hero-ar-dark-1440.png");
  }
} finally {
  await browser.close();
}
console.log("done");
