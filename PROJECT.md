# Binaa Labs Landing — Project Document

> **Single source of truth** for the site redesign: product context, current-site
> inventory, decisions log, open decisions, status, and do-not-regress learnings.
> Read this before any task. Process rules live in `CONTRIBUTING-WITH-CLAUDE.md`;
> repo conventions live in `CLAUDE.md`. Every pass updates this file in the same
> commit — if a decision isn't written here, it didn't happen.

Last updated: 2026-07-13 · Status: **color locked (D14); design pass continues — composition/section mocks next**

---

## 1 · Product context

- **Binaa Labs** is a **UAE product company** — Dubai, DET licensed. Legal entity
  name: **Binaa Lab** (singular, on the trade license — used in legal pages only).
- What it builds: **custom web applications, internal systems, workflow
  automation, and AI-enhanced software** for Gulf businesses.
- **Claimable projects — exactly two:**
  - **Wazen** (wazen.fit) — coaching SaaS, Binaa Labs' own product, **live**
    (verified reachable in the 2026-07-13 audit).
  - **Almani Motors** — auto-parts e-commerce, **live in Saudi Arabia**, no
    public URL to link.
- **Team of four:**
  | Name | Role |
  |---|---|
  | Naser Shadid | Founder & Product Lead |
  | Yahya Bawadekji | Lead Engineer |
  | Abdulmohaimin Bachir | Backend Lead |
  | Suha Mirza | Full-Stack Engineer |
- **Site purpose: company portfolio.** A visitor should immediately read
  "software company" — a real engineering firm with real shipped products.
- Live at https://binaalabs.com (EN) · https://binaalabs.com/ar (AR, full RTL).

---

## 2 · Current-site inventory (from the 2026-07-13 read-only audit)

### Stack

- **Next.js 15.5.19** (App Router) · **React 19.2.7** · **TypeScript 5.9** (strict).
- Everything else is **hand-rolled — NO Tailwind, NO Framer Motion, NO
  next-themes, NO i18n library**:
  - Styling: ~1,740 lines of token-based CSS in `app/globals.css`.
  - Motion: IntersectionObserver reveal system (`components/ClientEffects.tsx`),
    CSS keyframes, and a raw 2D `<canvas>` hero animation.
  - Theme: hand-rolled context (`components/Providers.tsx`) + pre-paint inline
    boot script in `app/layout.tsx` (`binaa-theme` in localStorage).
  - i18n: path-based routing + typed dictionaries (see below).
- Fonts via `next/font/google`: Bricolage Grotesque (display), Inter (sans),
  JetBrains Mono (mono), Tajawal (Arabic + Latin fallback in every stack).

### Routes

| Route | Purpose |
|---|---|
| `/` | English landing → `<Landing lang="en">` |
| `/ar` | Arabic landing, full RTL |
| `/privacy` · `/ar/privacy` | Standalone legal pages (inline per-locale copy) |
| `/opengraph-image` · `/ar/opengraph-image` | Generated `next/og` social cards |
| `/sitemap.xml` · `/robots.txt` | Generated from `app/sitemap.ts` / `app/robots.ts` |

### Landing structure (12 sections, top to bottom)

Composition lives in `components/Landing.tsx`; all copy comes from the i18n
dictionaries via `useSite().t`.

1. **Nav** — sticky header, scroll-progress bar, EN/AR + theme toggles, CTA
2. **Hero** — value prop + CTAs; animated canvas node-cube (desktop only, hidden <920px)
3. **Stats** — 4-cell credibility strip with count-up
4. **TheGap** — two-card comparison (✗ usual option vs ✓ Binaa Labs)
5. **WhatWeBuild** — 2×2 service cards with stack tags
6. **SelectedWork** — 3-slide carousel (Wazen, Almani Motors, "coming soon" placeholder); no imagery, typographic slides only
7. **HowItWorks** — 3-step process cards
8. **Offer** — numbered deliverables list + sticky fixed-price proposal card
9. **Guarantee** — centered risk-reversal statement with founder signature
10. **Team** — 4 cards, initials avatars (no photos)
11. **Contact** — 3-step explainer + lead form (currently a `mailto:` handoff with optimistic success)
12. **Footer** — anchors, privacy links, Wazen plug, DET-licensed line

Audit's uniformity finding: six of the ten content sections share one structural
stamp (mono-caps label → title → subtext → bordered card grid) with identical
reveal motion — the primary redesign target.

### Theme tokens (dual-theme; dark is default)

**Dark theme:**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#1A1A1A` | page background |
| `--bg-2` | `#141414` | alternate section bands |
| `--bg-nav` | `rgba(26,26,26,.82)` | translucent sticky nav |
| `--surface` | `#202020` | cards |
| `--surface-2` | `#272727` | raised surfaces (inputs) |
| `--line` | `rgba(250,250,248,.08)` | hairline borders |
| `--line-2` | `rgba(250,250,248,.16)` | stronger borders |
| `--ink` | `#FAFAF8` | headings / primary text |
| `--ink-2` | `#A2A29C` | secondary text |
| `--ink-3` | `#6A6A64` | muted text (fails WCAG contrast in footer — fix) |
| `--gold` | `#D4A017` | brand accent |
| `--gold-ink` | `#1A1A1A` | text on gold |
| `--gold-soft` | `rgba(212,160,23,.13)` | gold tint fills |
| `--gold-line` | `rgba(212,160,23,.34)` | gold borders |
| `--rose` | `#D67A6E` | negative accent (✗ marks) |

**Light theme:**

| Token | Value |
|---|---|
| `--bg` | `#FAFAF8` |
| `--bg-2` | `#F1F0EB` |
| `--bg-nav` | `rgba(250,250,248,.82)` |
| `--surface` | `#FFFFFF` |
| `--surface-2` | `#F4F3EE` |
| `--line` / `--line-2` | `#E7E5DD` / `#D7D4C9` |
| `--ink` / `--ink-2` / `--ink-3` | `#1A1A1A` / `#5C5C5C` / `#8C8C86` |
| `--gold` | `#A87810` (darkened for contrast on light) |
| `--gold-ink` | `#FFFFFF` |
| `--gold-soft` / `--gold-line` | `rgba(212,160,23,.12)` / `rgba(168,120,16,.32)` |
| `--rose` | `#BC5346` |

Off-token stragglers found in the audit: OG card colors (`#2C2611` gradient,
`#FAF8F3`, `#A0A09A` — near-misses of the token values), canvas fallback gold
`rgba(227,174,58,…)`, and a `GOLD` constant in `components/ui/icons.tsx`.

### i18n architecture

- Path-based: `/` = EN, `/ar` = AR. `middleware.ts` sets an `x-binaa-lang`
  header (matcher `["/", "/ar", "/ar/:path*"]`); the root layout reads it via
  `await headers()` to render `<html lang dir>` server-side.
- Typed dictionaries: `lib/i18n/en.ts` defines the `Dict` shape; `ar.ts` is
  declared `ar: Dict`, so TypeScript enforces full key parity.
- In-place language switching (`router.push`, no reload), RTL via logical
  properties + `[dir="rtl"]` overrides + `--arrowflip`, RTL-aware carousel and
  canvas, Arabic OG card with bundled Tajawal TTFs in `assets/og/`.

### Assets

- **All-SVG, no raster content imagery, no `public/` directory.** Complete list:
  `app/icon.svg` (gold node-cube mark), `app/favicon.ico`, `app/apple-icon.png`,
  two Tajawal TTFs (OG cards only). Logo is code-drawn (`LogoMark` in
  `components/ui/icons.tsx`). No photography anywhere; Team uses initials.

### CI / deploy

- **Vercel auto-deploys `main` to production** (binaalabs.com); no `vercel.json`
  (zero-config). `NEXT_PUBLIC_SITE_URL` drives canonical/OG/sitemap URLs.
- GitHub Actions CI: `npm ci → npm run check → Playwright chromium e2e`
  (one spec, `tests/e2e/landing.spec.ts`).
- Lighthouse (production, 2026-07-13): Performance 96 · Accessibility 92 ·
  Best Practices 100 · SEO 91 (the SEO deduction was a measurement artifact;
  the a11y 92 is real — footer contrast, brand-link name mismatch, color-only link).

---

## 3 · Decisions log & standing constraints

| # | Decision |
|---|---|
| **D1** | **Standing constraints (owner-set, non-negotiable):** **"Binaa Labs"** is the display name everywhere; **"Binaa Lab"** (legal name) appears in legal pages only. *(Amended 2026-07-13:)* **"software studio" is approved positioning; the "Binaa Labs" display-name / "Binaa Lab" legal-pages-only rule is unchanged.** **No fabricated social proof** — Wazen and Almani Motors are the only claimable projects; every claim on the page must be true of the company today. **No women in any imagery**, including backgrounds. **Arabic + English are first-class, full RTL** — every visual pass is verified EN + AR × light + dark × desktop + mobile. **Latin digits in UI.** |
| **D2** | **Redesign methodology: the Wazen Phase 2 process applies.** Audit → strategy → design pass with rendered mocks → implementation in small reviewed passes on a feature branch. Two-gate approvals (screenshot review is gate one; explicit commit instruction is gate two). Pre-build render gates for breakpoint-divergent compositions and any photographic placement. |
| **D3** | *(2026-07-13, owner)* **"Software studio" positioning approved** — explicitly reverses the original brief's ban; no language purge will occur; the remaining "software studio" occurrences in source/metadata/OG are now compliant. |
| **D4** | *(2026-07-13, owner)* **Refactor scope:** keep the architecture (i18n, theme, motion, SSR mechanisms); rebuild the presentation layer with a real token system (spacing/radius/elevation/motion scales); remove dead CSS section-by-section during the redesign. No big-bang rewrite. |
| **D5** | *(2026-07-13, owner)* **Contact path:** the section UI is redesigned with honest submitting/success/failure states; the form handler/backend is developer-owned and out of Claude scope. **Vercel Analytics will be added** (implementation pass). |
| **D6** | *(2026-07-13, owner)* **Claims kept:** "2 wks to demo," "24-hour response," and the four service capabilities stand — owner confirms all are deliverable. Copy direction for the redesign: frame around digital transformation / eliminating manual processes, with Wazen as proof of the gap-finding approach. |
| **D7** | *(2026-07-13, owner)* **Almani Motors:** real visual assets will be provided later; design and build proceed with placeholder frames in the real layout. Not a blocker. |
| **D8** | *(2026-07-13, owner)* **FAQ section added** to the page (5–6 questions; content in design pass). |
| **D9** | *(2026-07-13, design-authority call, owner-delegated)* **Nav subtext:** "Software Studio" replaces "Software Solutions". |
| **D10** | *(2026-07-13, owner)* **Arabic transliteration unified to "بناء لابس"** — `ar.ts`'s "بناء لابز" is the incorrect one and will be fixed in implementation. |
| **D11** | *(2026-07-13, design-authority call, owner-delegated)* **Imagery strategy: UI-led, no human photography** — real Wazen product frames, Almani placeholders, abstract/typographic treatments elsewhere. |
| **D12** | *(2026-07-13, owner)* **Dual-theme confirmed:** light and dark both survive the redesign; every pass verified in both. |
| **D13** | *(2026-07-13, owner-reviewed)* **Section strategy:** Nav keep/restyle · Hero full redesign (must exist on mobile) · Stats merged into hero band · The Gap keep-concept/redesign-mechanic · What We Build redesign with UI vignettes · Selected Work full redesign as case panels, placeholder slide CUT · How It Works redesign as process rail · Offer keep-tier polish · Guarantee keep/elevate · Team keep/light restyle · Contact redesign UI · Footer keep-tier + a11y fixes · FAQ added. |
| **D14** | *(2026-07-13, design-authority call, owner-approved)* **Color lock.** **Dark theme = Direction A:** the current charcoal system unchanged (`#1A1A1A`/`#141414`, gold `#D4A017` accent, gold logo mark), with `--ink-3` bumped to clear WCAG AA on both bands. **Light theme = hybrid:** `#FAFAFA` base / `#F1F2F4` band / white surfaces, navy-derived hairlines, ink scale `#24324B` / `#4E5A70` / `#616B80`, gold split — `#A87810` for accents/large text, `#8F660D` for button fills with white text — navy `#24324B` logo mark. The old warm light theme (`#FAFAF8`/`#F1F0EB`, `#A87810`-everything) is retired. Logo SVG cleanup (de-trace, strip background path, dual-color variants) enters the asset pass. Render proofs: `design/stage1-color/` (Stage 1 matrix + hybrid addendum, uncommitted). |

*(New decisions get the next D-number with a one-line rationale.)*

---

## 4 · Open decisions (awaiting owner — explicitly NOT yet D-rows)

None currently open. *(Color direction resolved by D14; the logo SVG enters the
repo via the asset pass — cleanup scope in D14.)*

---

## 5 · Redesign status & remaining work

**Status: color locked (D14); design pass continues — composition/section
mocks next.**

Remaining work, seeded from the audit's five-gap ranking:

1. **Rebuild the lead path and add measurement.** The contact form is a
   `mailto:` handoff with a fake success screen; the Calendly path is dead copy;
   there is zero analytics. The page's one job is currently broken and unmeasured.
2. **Add visual proof.** Zero screenshots or product imagery anywhere; the work
   carousel is typographic ghosts plus a "coming soon" placeholder; Almani
   Motors ships without a link. The proof-driven pitch has no proof a visitor
   can see.
3. **Break the templated uniformity.** Six of ten sections are the same
   label/title/sub/card-grid stamp with identical reveal motion; after the hero
   (desktop-only) there is no second memorable visual moment.
4. **Unify the brand.** The Arabic transliteration is split — unified to
   "بناء لابس" per D10, fix lands in implementation. (The descriptor language
   is compliant as-is per D3 — no purge.)
5. **Pay down the trust-surface polish debt.** Real a11y failures (footer
   contrast, brand-link name mismatch, color-only links). (The flagged claims
   are retained per D6; the placeholder slide is cut per D13.)

### Launch checklist (stub — grows during the redesign)

- [ ] Transliteration unification to "بناء لابس" (D10 — fix `ar.ts`)
- [ ] Footer contrast a11y fix (`--ink-3` on `--bg` fails WCAG — D14 mandates
      the bump in both themes; light lands at `#616B80`, dark value chosen at
      implementation)
- [ ] Brand-link aria fix (`label-content-name-mismatch` on `.brand`)
- [ ] Contact section rebuilt with honest submitting/success/failure states
      (D5 — handler/backend developer-owned)
- [ ] Vercel Analytics added (D5)
- [ ] FAQ content finalized (D8 — 5–6 questions)
- [ ] Nav subtext swap: "Software Studio" replaces "Software Solutions" (D9)
- [ ] Logo asset integration — asset pass per D14: de-trace, strip background
      path, dual-color variants (gold for dark theme, navy for light)
- [ ] Light theme retokenized to the D14 hybrid set (`#FAFAFA`/`#F1F2F4`,
      navy ink scale, `#A87810`/`#8F660D` gold split); old warm set removed
- [ ] Every visual pass verified EN + AR × light + dark × desktop + mobile
- [ ] `npm run check` + Playwright green; Lighthouse re-run on preview

---

## 6 · Key learnings — do not regress

- **Reduced-motion architecture must survive the redesign.** The current system
  is a global CSS kill-switch (`@media (prefers-reduced-motion: reduce)` zeroing
  animation/transition durations) **plus** explicit `matchMedia` checks in the
  hero canvas (renders the finished state statically), the carousel (autoplay
  disabled), and the count-up (value set instantly). Any new motion system must
  keep both layers.
- **Typed `Dict` parity is the i18n enforcement mechanism — never bypass it.**
  `ar.ts` is declared `ar: Dict`, so missing/extra keys fail typecheck. Don't
  weaken the type, don't add untyped copy paths.
- **Hero highlight terms are hard-coded in `Hero.tsx`** (واتساب/إكسل vs
  WhatsApp/Spreadsheet) — a standing violation of the everything-in-the-dictionary
  convention. Fix during the redesign; don't repeat the pattern elsewhere.
- **The `await headers()` SSR lang/dir mechanism must not break.**
  `middleware.ts` sets `x-binaa-lang`; the root layout awaits `headers()` to
  render `<html lang dir>` server-side. Any new Arabic route must be added to
  the middleware `matcher` or its `<html>` renders as English.
