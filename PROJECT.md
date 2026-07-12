# Binaa Labs Landing — Project Document

> **Single source of truth** for the site redesign: product context, current-site
> inventory, decisions log, open decisions, status, and do-not-regress learnings.
> Read this before any task. Process rules live in `CONTRIBUTING-WITH-CLAUDE.md`;
> repo conventions live in `CLAUDE.md`. Every pass updates this file in the same
> commit — if a decision isn't written here, it didn't happen.

Last updated: 2026-07-13 · Status: **audit complete, strategy pass next**

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
| **D1** | **Standing constraints (owner-set, non-negotiable):** **"Binaa Labs"** is the display name everywhere; **"Binaa Lab"** (legal name) appears in legal pages only. The company is described as a **"software company" / "product company"** — describing it as a "studio" (in any wording) is **BANNED everywhere**, including metadata, OG images, dictionaries, legal pages, and `package.json`. **No fabricated social proof** — Wazen and Almani Motors are the only claimable projects; every claim on the page must be true of the company today. **No women in any imagery**, including backgrounds. **Arabic + English are first-class, full RTL** — every visual pass is verified EN + AR × light + dark × desktop + mobile. **Latin digits in UI.** |
| **D2** | **Redesign methodology: the Wazen Phase 2 process applies.** Audit → strategy → design pass with rendered mocks → implementation in small reviewed passes on a feature branch. Two-gate approvals (screenshot review is gate one; explicit commit instruction is gate two). Pre-build render gates for breakpoint-divergent compositions and any photographic placement. |

*(New decisions get the next D-number with a one-line rationale. Nothing below
in §4 is decided yet.)*

---

## 4 · Open decisions (awaiting owner — explicitly NOT yet D-rows)

1. **Color direction** — gold-led vs navy+gold vs navy-led. The logo SVG is navy
   `#24324B` and is **held out of the repo until this is locked**.
2. **Light-theme survival** — keep the dual-theme system or go dark-only.
3. **Imagery strategy** — photography vs abstract/UI-screenshot visuals
   (today the site has zero raster imagery).
4. **Section list changes** — which of the 12 sections survive, merge, or die.
5. **Stack decision** — proposal on the table: keep the hand-rolled systems
   (CSS tokens, reveal engine, theme, i18n), introduce **no new frameworks**.
6. **Arabic brand transliteration** — `en.ts` has "بناء لابس", `ar.ts` has
   "بناء لابز" (sīn vs zāy). Must unify; owner picks the spelling.
7. **Fate of the unverifiable claims flagged in the audit** — "24-hour
   response", "2 weeks to a demo", native-mobile capability (Swift/Kotlin tags
   with no shipped app). Keep, soften, or cut.
8. **Contact-path architecture** — replace the `mailto:` form + the translated
   but never-rendered Calendly string with a real backend and/or scheduler.

---

## 5 · Redesign status & remaining work

**Status: audit complete, strategy pass next.**

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
4. **Purge the banned brand language and unify the brand.** The banned
   descriptor sits in the meta title, descriptions, keywords, both OG cards,
   both dictionaries, the privacy pages, and `package.json`; the Arabic
   transliteration is split (see open decision 6).
5. **Pay down the trust-surface polish debt.** Real a11y failures (footer
   contrast, brand-link name mismatch, color-only links) and unverifiable
   promises sitting next to a placeholder slide.

### Launch checklist (stub — grows during the redesign)

- [ ] Banned-descriptor purge complete — copy, metadata, dictionaries, legal
      pages, `package.json`, **and both OG cards** (the tagline is baked into
      the rendered images)
- [ ] Footer contrast a11y fix (`--ink-3` on `--bg` fails WCAG)
- [ ] Brand-link aria fix (`label-content-name-mismatch` on `.brand`)
- [ ] Contact path rebuilt (real submission + confirmation; Calendly decision)
- [ ] Logo asset integration (navy SVG, pending color-direction decision)
- [ ] Analytics decision implemented (currently none installed)
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
