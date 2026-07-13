// Stage 1 color-direction proofs — renders the 16-shot matrix and prints
// WCAG contrast ratios for the ink scale on both bases, per direction × theme.
// Run from the repo root: node design/stage1-color/render.mjs
// Uses file:// URLs — no local server is spawned.

import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const rendersDir = path.join(here, "renders");
fs.mkdirSync(rendersDir, { recursive: true });

const directions = ["a", "b"];
const themes = ["dark", "light"];
const widths = [1440, 390];
const comps = ["hero", "cards"];

// ---- WCAG contrast helpers ----
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
const contrastRows = [];
try {
  for (const dir of directions) {
    for (const comp of comps) {
      const url = pathToFileURL(path.join(here, `${comp}-${dir}.html`)).href;
      for (const theme of themes) {
        for (const width of widths) {
          const page = await browser.newPage({
            viewport: { width, height: width === 1440 ? 900 : 844 },
            deviceScaleFactor: 1,
          });
          await page.goto(url, { waitUntil: "networkidle" });
          await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
          await page.evaluate(() => document.fonts.ready);
          const name = `${dir}-${theme}-${width}w-${comp}.png`;
          await page.screenshot({ path: path.join(rendersDir, name), fullPage: true });
          console.log(`rendered ${name}`);

          // collect resolved tokens once per direction × theme (hero @1440 only)
          if (comp === "hero" && width === 1440) {
            const tokens = await page.evaluate(() => {
              const cs = getComputedStyle(document.documentElement);
              const get = (n) => cs.getPropertyValue(n).trim();
              return {
                bg: get("--bg"),
                bg2: get("--bg-2"),
                ink: get("--ink"),
                ink2: get("--ink-2"),
                ink3: get("--ink-3"),
                gold: get("--gold"),
                goldInk: get("--gold-ink"),
              };
            });
            for (const inkName of ["ink", "ink2", "ink3"]) {
              for (const baseName of ["bg", "bg2"]) {
                contrastRows.push({
                  dir: dir.toUpperCase(),
                  theme,
                  pair: `--${inkName.replace("2", "-2").replace("3", "-3")} on --${baseName.replace("2", "-2")}`,
                  fg: tokens[inkName],
                  bg: tokens[baseName],
                  ratio: ratio(tokens[inkName], tokens[baseName]),
                });
              }
            }
            contrastRows.push({
              dir: dir.toUpperCase(),
              theme,
              pair: "--gold-ink on --gold (CTA)",
              fg: tokens.goldInk,
              bg: tokens.gold,
              ratio: ratio(tokens.goldInk, tokens.gold),
            });
            contrastRows.push({
              dir: dir.toUpperCase(),
              theme,
              pair: "--gold on --bg (accent text)",
              fg: tokens.gold,
              bg: tokens.bg,
              ratio: ratio(tokens.gold, tokens.bg),
            });
          }
          await page.close();
        }
      }
    }
  }
} finally {
  await browser.close();
}

console.log("\nWCAG contrast ratios (normal text: AA ≥ 4.5, AA large ≥ 3.0):");
console.log("dir | theme | pair | fg | bg | ratio | AA");
for (const r of contrastRows) {
  console.log(
    `${r.dir} | ${r.theme} | ${r.pair} | ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)} | ${r.ratio >= 4.5 ? "pass" : r.ratio >= 3 ? "FAIL (large-only)" : "FAIL"}`
  );
}
