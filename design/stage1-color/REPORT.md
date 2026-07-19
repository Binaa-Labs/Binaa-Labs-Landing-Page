# Stage 1 — Color-direction A/B render proofs

Open decision #1 (PROJECT.md §4): gold-on-charcoal (A) vs navy+gold on
blue-black (B). Mock/report pass only — nothing committed, no source touched.

## Files

- `hero-{a,b}.html`, `cards-{a,b}.html` — the two mock compositions. Each a/b
  pair is byte-identical except the single `tokens-{a,b}.css` import line
  (verified with `diff`).
- `mock.css` — shared token-agnostic layout (mobile-first, 920px desktop
  breakpoint, matching the site).
- `tokens-a.css` — current production token sets, verbatim from PROJECT.md §2.
- `tokens-b.css` — Direction B token proposal (values below).
- `render.mjs` — Playwright render script (file:// URLs, no server); also
  prints the WCAG contrast table.
- `renders/` — the 16-shot matrix: `{a,b}-{dark,light}-{1440w,390w}-{hero,cards}.png`.

## Direction B token values (as built)

**Dark** — base `#0D1220`, band `#0A0E1A`, nav `rgba(13,18,32,.82)`,
surface `#18202F`, surface-2 `#1E2839` (both derived from logo navy `#24324B`),
line `rgba(250,250,248,.08)` / line-2 `.16` (unchanged off-white alphas),
ink `#FAFAF8`, ink-2 `#A8ACB8`, ink-3 `#6E7380`, gold `#D4A017` (unchanged),
gold-ink `#0D1220`, gold-soft `rgba(212,160,23,.15)`, gold-line
`rgba(212,160,23,.38)` (alphas raised from .13/.34 because the navy base is
darker than `#1A1A1A` — keeps the composited tint strength equal relative to
base), rose `#D67A6E`.

**Light** — base `#FAFAF8` (warm off-white kept), band `#F0F2F6` (navy-tinted),
nav `rgba(250,250,248,.82)`, surface `#FFFFFF`, surface-2 `#F3F5F8`,
line `rgba(36,50,75,.14)` / line-2 `.28` (navy-tinted hairlines),
ink `#24324B` (logo navy as primary ink/headings), ink-2 `#4E5A70`,
ink-3 `#667085` (both derived from the navy hue; ink-3 chosen to clear
AA 4.5 on the base — the current site's light ink-3 does not),
gold `#A87810`, gold-ink `#FFFFFF`, gold-soft `rgba(212,160,23,.12)`,
gold-line `rgba(168,120,16,.32)`, rose `#BC5346`.

**Logo mark** — A: gold in both themes. B: navy `#24324B` in light; in dark the
hero mock renders both candidates side by side (variant 1 = gold `#D4A017`,
variant 2 = off-white `#FAFAF8`) in the "logo mark treatment" strip.

## WCAG contrast ratios (normal text AA ≥ 4.5, large ≥ 3.0)

| Pair | A dark | A light | B dark | B light |
|---|---|---|---|---|
| `--ink` on `--bg` | 16.65 ✓ | 16.65 ✓ | 17.87 ✓ | 12.31 ✓ |
| `--ink` on `--bg-2` | 17.63 ✓ | 15.25 ✓ | 18.42 ✓ | 11.47 ✓ |
| `--ink-2` on `--bg` | 6.78 ✓ | 6.40 ✓ | 8.23 ✓ | 6.65 ✓ |
| `--ink-2` on `--bg-2` | 7.18 ✓ | 5.86 ✓ | 8.49 ✓ | 6.20 ✓ |
| `--ink-3` on `--bg` | 3.20 ✗ (large-only) | 3.24 ✗ (large-only) | 3.94 ✗ (large-only) | **4.76 ✓** |
| `--ink-3` on `--bg-2` | 3.38 ✗ (large-only) | 2.96 ✗ (fails even large) | 4.06 ✗ (large-only) | 4.44 ✗ (large-only, 4.5 within reach) |
| `--gold-ink` on `--gold` (CTA) | 7.33 ✓ | 3.92 ✗ (large-only) | 7.86 ✓ | 3.92 ✗ (large-only) |
| `--gold` on `--bg` (accent text) | 7.33 ✓ | 3.75 ✗ (large-only) | 7.86 ✓ | 3.75 ✗ (large-only) |

## Technical findings (no palette recommendation — design authority is Claude chat)

1. **Neither direction introduces a new WCAG failure.** Every failing cell above
   also fails (equally or worse) in Direction A today.
2. **`--ink-3` (muted text):** fails AA in both directions' dark themes — this is
   the known footer-contrast launch-checklist item and needs a value bump
   regardless of which direction wins. B dark (3.94) is closer to passing than
   A dark (3.20). In light theme, B's ink-3 passes on the base (4.76) where A's
   fails (3.24); on the alternate band B sits at 4.44 — a one-step darkening of
   `#667085` (e.g. `#616B80`) would clear both.
3. **Light-theme gold:** `#A87810` on white/off-white is 3.75–3.92 — large-text/
   UI-component territory only, identical in both directions. White-on-gold CTA
   text at button size (~15px semibold) is below the 18.7px/14px-bold large-text
   threshold, so it is a pre-existing AA miss both directions inherit; darkening
   toward `#8F660D` would clear 4.5 if desired.
4. **Gold pops harder on B's dark base** (7.86 vs 7.33) — the blue-black is
   darker and hue-opposed to gold, so accent elements read slightly stronger at
   the same token value.
5. **Logo variants on blue-black:** both survive; gold reads as the accent
   system, off-white reads quieter/more neutral — judgment call, both are
   technically fine (off-white stroke on `#0D1220` ≈ 17.9:1, gold ≈ 7.9:1).

## Leftover processes

None — rendering used `file://` URLs (no server spawned); the Playwright
browser is closed in a `finally` block and exited with the script.

---

# Addendum — hybrid light-theme candidate (dark locked to Direction A)

Dark theme is decided: Direction A, unchanged. This addendum renders only the
adjusted light theme for the final color lock.

## Files added

- `tokens-hybrid-light.css` — the candidate token set (light only).
- `hero-hybrid.html`, `cards-hybrid.html` — copies of the `-a` mocks differing
  only in the token import line (verified with `diff`).
- `render-hybrid.mjs` — 4-shot render + contrast table.
- `renders/hybrid-light-{1440,390}w-{hero,cards}.png`.
- `mock.css` gained one hook: button fills use `var(--gold-btn, var(--gold))` —
  a fallback, so the A/B token sheets and prior renders are unaffected.

## Hybrid light token values (as built)

Base `#FAFAFA` (neutral, warm cast dropped), band `#F1F2F4`, nav
`rgba(250,250,250,.82)`, surface `#FFFFFF`, surface-2 `#F5F6F8`,
line `rgba(36,50,75,.10)` / line-2 `.18`, ink `#24324B`, ink-2 `#4E5A70`,
ink-3 `#667085`, gold `#A87810` (text/accents), **gold-btn `#8F660D`**
(button fills, white text), gold-ink `#FFFFFF`, gold-soft
`rgba(212,160,23,.11)`, gold-line `rgba(168,120,16,.30)` (alphas trimmed one
step vs Direction B light — the neutral base is marginally brighter/cooler),
rose `#BC5346`, logo mark native navy `#24324B`.

## Contrast (normal text AA ≥ 4.5, large ≥ 3.0)

| Pair | Ratio | AA |
|---|---|---|
| `--ink` `#24324B` on `--bg` `#FAFAFA` | 12.32 | pass |
| `--ink` on `--bg-2` `#F1F2F4` | 11.48 | pass |
| `--ink-2` `#4E5A70` on `--bg` | 6.66 | pass |
| `--ink-2` on `--bg-2` | 6.21 | pass |
| `--ink-3` `#667085` on `--bg` | 4.77 | pass |
| `--ink-3` on `--bg-2` | 4.44 | **miss** (large-only; 4.5 needs e.g. `#616B80`) |
| `--gold-ink` `#FFFFFF` on `--gold-btn` `#8F660D` (CTA) | 5.15 | pass — fixes the 3.92 miss both A and B light had |
| `--gold` `#A87810` on `--bg` (accent text) | 3.75 | large-text/UI-component only (unchanged from A/B; fine for the mono-caps labels and headline highlights, not body-size text) |

## Leftover processes (addendum run)

None — same harness pattern: `file://` URLs, browser closed in `finally`.
