// Stage 1 addendum — hybrid light-theme candidate: 4 renders + contrast table.
// Run from the repo root: node design/stage1-color/render-hybrid.mjs
// Uses file:// URLs — no local server is spawned.

import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const rendersDir = path.join(here, "renders");
fs.mkdirSync(rendersDir, { recursive: true });

function parseColor(s) {
  s = s.trim();
  const hex = s.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = s.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) return rgb[1].split(",").slice(0, 3).map((v) => parseFloat(v));
  throw new Error(`Cannot parse color: ${s}`);
}
function luminance([r, g, b]) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(fg, bg) {
  const l1 = luminance(parseColor(fg));
  const l2 = luminance(parseColor(bg));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const browser = await chromium.launch();
let tokens;
try {
  for (const comp of ["hero", "cards"]) {
    const url = pathToFileURL(path.join(here, `${comp}-hybrid.html`)).href;
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: width === 1440 ? 900 : 844 },
        deviceScaleFactor: 1,
      });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
      await page.evaluate(() => document.fonts.ready);
      const name = `hybrid-light-${width}w-${comp}.png`;
      await page.screenshot({ path: path.join(rendersDir, name), fullPage: true });
      console.log(`rendered ${name}`);
      if (comp === "hero" && width === 1440) {
        tokens = await page.evaluate(() => {
          const cs = getComputedStyle(document.documentElement);
          const get = (n) => cs.getPropertyValue(n).trim();
          return {
            bg: get("--bg"),
            bg2: get("--bg-2"),
            ink: get("--ink"),
            ink2: get("--ink-2"),
            ink3: get("--ink-3"),
            gold: get("--gold"),
            goldBtn: get("--gold-btn"),
            goldInk: get("--gold-ink"),
          };
        });
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log("\nHybrid light — WCAG contrast (normal text: AA ≥ 4.5, AA large ≥ 3.0):");
console.log("pair | fg | bg | ratio | AA");
const pairs = [
  ["--ink on --bg", tokens.ink, tokens.bg],
  ["--ink on --bg-2", tokens.ink, tokens.bg2],
  ["--ink-2 on --bg", tokens.ink2, tokens.bg],
  ["--ink-2 on --bg-2", tokens.ink2, tokens.bg2],
  ["--ink-3 on --bg", tokens.ink3, tokens.bg],
  ["--ink-3 on --bg-2", tokens.ink3, tokens.bg2],
  ["--gold-ink on --gold-btn (CTA)", tokens.goldInk, tokens.goldBtn],
  ["--gold on --bg (accent text)", tokens.gold, tokens.bg],
];
for (const [pair, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  console.log(
    `${pair} | ${fg} | ${bg} | ${r.toFixed(2)} | ${r >= 4.5 ? "pass" : r >= 3 ? "FAIL (large-only)" : "FAIL"}`
  );
}
