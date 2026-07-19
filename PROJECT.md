# Binaa Labs Landing — Project Document

> **Single source of truth** for the site redesign: product context, current-site
> inventory, decisions log, open decisions, status, and do-not-regress learnings.
> Read this before any task. Process rules live in `CONTRIBUTING-WITH-CLAUDE.md`;
> repo conventions live in `CLAUDE.md`. Every pass updates this file in the same
> commit — if a decision isn't written here, it didn't happen.

Last updated: 2026-07-19 · Status: **Push-prep complete (`d888d75` pushed); owner preview review completed and approved on the `feat/site-redesign` preview; binding Lighthouse measurement done (mobile LCP 3.3s vs. 2.5s budget) → D19 disables the splash on mobile; next measurement (LCP 3.4s, `h1.hero-title`) traced to a second JS-gated hider → D19 rung 2b makes mobile hero copy paint from CSS alone; refinement pass 2 (D20) and pass 3 (D21, AR Guarantee accent line) landed; final pre-merge pass (D22) adds Vercel Analytics and gates the splash's HeroCanvas chunk off mobile/reduced-motion, re-measure on the Vercel preview pending**

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
| **D15** | *(2026-07-14, owner)* **Splash v2 adopted; its D2 mock gate waived.** The intro splash ships as specified in the implementation brief, superseding STAGE2-DESIGN §1's SVG line-draw storyboard (and checklist items 1–2): panels close over the painted page (gold hairline seam) → the **original HeroCanvas node-cube**, centered at ~60vh, builds in ~1.5s and **stays alive** (traveling pulses, particle dust, float) → "Binaa Labs" rises → بناء لابس (+120ms) → slogan **"Where your software gets built"** / **«حيث تُبنى برمجياتك»** (+240ms) → ~0.4s hold → panels part (total ~3.7s, ≤4s). Session-once (`sessionStorage` + pre-paint boot-script class); Skip at ~1s; **any** wheel/touchmove/scroll/pointerdown/keydown skips instantly; reduced motion never mounts it (CSS + matchMedia); zero layout shift. The §1.3 LCP fallback ladder stands — measure on the Vercel preview before merging. |
| **D16** | *(2026-07-14, owner)* **D2's small-reviewed-passes rule waived for the Stage 2 implementation.** The full redesign landed in one pass as per-stage checkpoint commits (A: tokens+dictionaries · B: splash/nav/hero · C: gap/scenarios/merged section · D: work/guarantee/team/FAQ/contact/footer · E: docs+verification) on `feat/site-redesign`; the owner accepts single-pass review. Screenshot review and the explicit push instruction remain the gates — nothing is pushed without them. Owner also ruled the open checklist items: nav shows the proposed four links (The Gap · What We Build · Selected Work · How We Work), the hero floating chip is **dropped** (D1 — no placeholder metric), and case-panel Role rows ship as mocked. |

| **D17** | *(2026-07-16, owner, refinement pass 1)* **Brand mark integrated · em-dash rule · splash v3.** (a) The real logo (owner-placed trace, now `assets/brand/logo-source.{svg,png}`) is de-traced into clean stroke geometry (partial isometric wireframe cube, circuit gaps, three hollow ring nodes) and replaces the placeholder everywhere: `LogoMark` on `var(--logo)`, `app/icon.svg` gold-on-dark, regenerated `apple-icon.png`/`favicon.ico`, OG card mark; tab title is exactly **"Binaa Labs"** (template `%s · Binaa Labs`). The splash keeps the generic full cube (owner ruling). (b) **House copy rule: zero em dashes in rendered copy** (dictionaries, metadata, OG); rephrase with comma/colon/period/middot. Headline is now "Run Your Business Online, Not Out of a WhatsApp Group and a Spreadsheet". (c) **Splash v3 "singularity"** supersedes v2's panel choreography (D15 beats retired): cover at first paint → breathing gold glow + inward dust (~0.6s) → flare + CENTER-OUT cube birth (~1.4s) + pulses + outward dust → masked lockup rise (+120/+240ms, slogan letter-spaced resolve) → radial bloom dissolves the cover, hero revealed out of the brightness (~3.8s). Dismissal = accelerated 350ms bloom; session-once/reduced-motion/no-JS/zero-CLS contracts unchanged. *(Amended 2026-07-16, owner:)* **Favicon gold-on-dark is now an explicit owner ruling.** It originally shipped as the D17 default without a ruling; this converts the accident into a decision. |
| **D18** | *(2026-07-16, owner)* **Standard process reinstated.** Supersedes D15/D16 going forward; their rows stay as written (do not rewrite history). Reason: the mock waiver existed only because a splash animation cannot be judged from a still; the splash is approved, so the reason is gone. Back in force: pre-build render gates for compositional changes, small passes, two-gate approvals. |
| **D19** | *(2026-07-18, owner)* **Splash disabled on mobile viewports (LCP rung 2).** Binding preview Lighthouse measured mobile LCP at 3.3s against the 2.5s budget, driven by the splash's HeroCanvas mount; rung 2 of the §1.3 fallback ladder (disable the splash below the site's 920px desktop breakpoint) is applied rather than a heavier rung. Same two-layer contract as reduced-motion: CSS `display:none` at `(max-width: 919px)` (zero flash, zero CLS) plus a matching `matchMedia` check in `Splash.tsx` (unmounts, doesn't consume the session-once flag). **Desktop splash choreography, session-once logic, and the reduced-motion path are all unchanged.** *(Amended 2026-07-19, owner, rung 2b:)* **Root cause of the next LCP measurement (3.4s, element `h1.hero-title`) identified as a second JS-gated hider on the same element.** The pre-paint boot script adds `.js` to `<html>` before hydration starts, which immediately applies `.js [data-reveal] { opacity:0 }` to every hero copy element (badge, title, subcopy, CTAs, proof band); they only reach `opacity:1` once `ClientEffects`'s `IntersectionObserver` mounts and sets `[data-revealed]`, which throttled-CPU hydration delays well past first paint. Fix: `@media (max-width: 919px) { .js .hero-copy [data-reveal] { opacity:1; transform:none; transition:none; } }` — hero copy paints fully visible from CSS alone below 920px, no JS dependency, zero CLS. `.hero-stack` (the product frame) sits below the fold on mobile and keeps its normal scroll reveal; the desktop hero (splash covers its entrance) and every other section are unchanged. Verified via a no-JS Playwright context (the strongest hydration-never-runs proxy) asserting `opacity:1` on the hero copy elements. |
| **D20** | *(2026-07-19, owner, refinement pass 2)* **Hero mock variation + FAQ fit question.** (a) The hero product frame swaps from a "Coach Dashboard" overview to a **Clients list view**: nav active tab moves to Clients, frame title is "Clients", header reads "Sorted by check-in", and the three tiles are relabeled "Total clients" / "Checked in" / "Plans updated" (owner correction: "Awaiting plan" read as a service backlog, not the dashboard's intended positive framing) while keeping the existing 128/96%/24 figures; the "Khalid M. · Onboarding · Plan due" row stays as pipeline detail at row level. `Hero.tsx`'s active-nav highlight is now driven by a new `frame.navActive` dictionary field instead of a hardcoded index. AR inherits the frame unchanged (`ar.hero.frame = en.hero.frame`, Latin/LTR by design). Render gate: EN/AR × dark/light × 1440/390 approved (`design/impl-review/hero-r2-*.png`, uncommitted). (b) **FAQ grows to 8 questions**: appended "Who do you work best with?" / AR mirror, scoping fit around established Gulf operators wanting one owned system, not a no-code patch or template site. (c) **Report-only finding, no change made:** the AR Guarantee's `arabicSubline` is the literal same Arabic string as the EN page's cross-language accent line, not an English mirror of it. On `/ar` it reads as the same Arabic sentence repeated back to back rather than a deliberate cross-language accent; left as is pending an owner call. **Resolved by D21 (refinement pass 3).** |
| **D21** | *(2026-07-19, owner, refinement pass 3)* **AR Guarantee gets its own cross-language accent line.** D20(c)'s finding is resolved: `ar.ts`'s `guarantee.arabicSubline` no longer repeats the Arabic headline sentence, it now carries the English mirror "Approve before you pay." (matching the cross-language accent effect the EN page already gets from the Arabic subline). The value ends with a trailing U+200E (LRM) mark, added purely as data in `ar.ts` (no component/CSS change), because Chromium's bidi resolution otherwise floats the trailing period to the visual start of the run when a pure-LTR sentence sits inside the `.guarantee-ar` element's `direction: rtl` context, rendering it as ".Approve before you pay"; the LRM anchors the period after "pay" as intended. Verified EN untouched, AR renders correctly at dark/light × 1440/390 (`design/impl-review/guarantee-r3-*.png`, uncommitted). |

| **D22** | *(2026-07-19, owner, final pre-merge pass)* **Vercel Analytics added; splash HeroCanvas chunk fetch gated off mobile/reduced-motion.** (a) `@vercel/analytics` (^2.0.1) added as a dependency (D5's remaining Analytics item) — `<Analytics />` mounted in `app/layout.tsx`, no server/route changes. (b) **Audit finding B5-high fixed:** `Splash.tsx` previously rendered `<HeroCanvas>` unconditionally from its first commit, so `next/dynamic`'s chunk fetch fired before the mount effect could gate it off for mobile/reduced-motion sessions (this chunk is the likely "919" culprit in the ~600ms mobile TBT audit finding). Fix: a new `showCanvas` state, default `false` (identical on SSR and the first client render, so no hydration mismatch), flips `true` only inside the same mount effect that already computes `gone`, and only for qualifying (desktop, motion-allowed, not-yet-seen) sessions — `<HeroCanvas>` is absent from the JSX until then, so the import is never triggered at all on mobile/reduced-motion. Desktop choreography unchanged (the existing `canvasDelay` calc already compensates for hydration-timed mounting). |

*(New decisions get the next D-number with a one-line rationale.)*

---

## 4 · Open decisions (awaiting owner — explicitly NOT yet D-rows)

None currently open. *(Color direction resolved by D14; the logo SVG enters the
repo via the asset pass — cleanup scope in D14.)*

---

## 5 · Redesign status & remaining work

**Status: push-prep complete (`d888d75` pushed to `feat/site-redesign`);
owner preview review completed and approved on the Vercel preview
(2026-07-16); binding Lighthouse measurement done (2026-07-18) — mobile LCP
3.3s vs. 2.5s budget, D19 disables the splash on mobile (rung 2); re-measure
on the preview after this lands.**

> **Owner confirmation (2026-07-16):** Splash session-once behavior confirmed
> by owner as built (survives refreshes within a session, replays on new
> visit). No code change.

### Shipped in the Stage 2 implementation pass

- **Token system (D4/D14):** `globals.css` fully rewritten — D14 palettes
  (dark `--ink-3` → `#8A8A84`; light hybrid with navy inks/hairlines and the
  gold button split), spacing/radius/elevation/motion scales, splash timeline
  tokens, reveal variants. Old warm light theme deleted; legal-page block kept.
- **Splash v2** (D15) — page-level, session-once, both reduced-motion layers.
- **All twelve sections** per STAGE2-DESIGN 2b: nav (4 links, Software Studio,
  aria fix) · hero (proof band replaces Stats, layered product frame, dieted
  copy, dictionary-driven highlights) · gap split-screen · four scenario cards
  with from→to lines · case panels (carousel cut; Wazen video slot with lazy
  silent-loop contract, `lib/work-video.ts` single-source src, poster
  schematic; Almani dashed schematic, D7 note internal-only per owner ruling) ·
  merged How We Work & What You Get (journey rail + artifact fragments +
  sticky proposal, `#offer` alias kept) · guarantee radial-glow stage with
  term chips · compact team strip · 7-question FAQ accordion (D8) · contact
  form-as-star with honest idle/submitting/success/failure states wired to a
  clearly-marked `/api/lead` stub (D5) · footer with persistent-underline
  links.
- **Dictionaries** rewritten to the copy diet (EN and AR equally); D10
  transliteration unified; frame-interior schematics deliberately Latin/LTR
  in both locales.
- **Verification:** `npm run check` clean · Playwright 18/18 (chromium +
  mobile-chrome; spec updated — carousel/stats/anchor selectors replaced,
  splash + FAQ specs added, tests seed the splash session flag) · full
  screenshot matrix + splash filmstrip + reduced-motion/skip proofs in
  `design/impl-review/` (uncommitted) · Lighthouse on the local prod build:
  **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 91**
  (the SEO deduction is the known meta-description measurement artifact —
  the tag is verified present in the served HTML), LCP 0.7s, CLS 0.001.
- **Known metric miss, reported honestly:** the rewritten `globals.css` is
  3,041 lines vs. the 1,738 target ceiling. Prettier-normalized, the OLD
  sheet was 2,082 lines (it predated formatting); the growth is the five new
  systems (splash, video slot, journey artifacts, FAQ, form states, two dense
  frame schematics), not legacy carry-over — zero dead rules remain.

### Remaining work

1. **Asset pass:** Wazen 20–30s silent capture (seeded demo data only) →
   `lib/work-video.ts`; real Almani frames (D7); logo SVG de-trace +
   dual-color variants (D14); real Wazen metric if the hero chip is revived
   (D16 dropped it).
2. **Lead backend:** implement `/api/lead` (or swap the marked stub in
   `Contact.tsx`) — until then submissions land in the honest failure state
   with the mailto fallback. **Vercel Analytics added** (D5 — `@vercel/analytics`,
   `<Analytics />` mounted in `app/layout.tsx`).
3. **Pre-merge measurement:** LCP/Lighthouse on the Vercel preview — binding
   mobile LCP measured at 3.3s vs. the 2.5s budget; **D19 applies rung 2 of
   the fallback ladder (splash disabled on mobile)**; re-measure after to
   confirm the budget is met. Calendly link stays out until one exists
   (checklist 13).
4. **Parked (post-launch):** a mobile lite splash (~1.5-1.8s micro-intro:
   glow pulse + text rise + bloom), owner-gated; re-measure LCP after
   building it (D19). Also parked from the pre-launch code-quality audit
   (2026-07-19, report-only, not implemented): **B5-medium** — defer
   hydration of the below-fold `SelectedWork.tsx` case panels (idle-callback
   or intersection-gated mount) to trim mobile TBT; **B5-low** — defer
   `ClientEffects.tsx`'s `IntersectionObserver`/count-up `requestAnimationFrame`
   setup off the hydration-critical tick (`requestIdleCallback` or confirm via
   trace it's already effectively deferred).

### Launch checklist

- [x] Transliteration unification to "بناء لابس" (D10)
- [x] Footer contrast a11y fix (`--ink-3` → `#8A8A84` dark / `#616B80` light)
- [x] Brand-link aria fix (`label-content-name-mismatch` on `.brand`)
- [x] Contact section rebuilt with honest submitting/success/failure states
      (D5 — `/api/lead` handler still developer-owned)
- [x] Vercel Analytics added (D5 — `@vercel/analytics`, `<Analytics />` in `app/layout.tsx`)
- [x] FAQ content finalized (D8 — 8 questions after D20(b), doc §10 wording)
- [x] Nav subtext swap: "Software Studio" replaces "Software Solutions" (D9)
- [x] Logo asset integration (D17): de-traced, background stripped, dual-color
      via `var(--logo)` (gold dark / navy light); favicon set + OG regenerated
- [x] Light theme retokenized to the D14 hybrid set; old warm set removed
- [x] Visual pass verified EN + AR × light + dark × 1440 + 390
      (`design/impl-review/` matrix, 2026-07-14)
- [x] `npm run check` + Playwright green · Lighthouse on local prod build
      (100/100/100/91) — [ ] re-run on the Vercel preview before merge

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
- **Hero highlight terms are dictionary-driven, not hard-coded.** `Hero.tsx`
  reads `h.highlights` from the dictionary (both locales) and highlights
  whichever terms match, instead of hard-coding واتساب/إكسل vs
  WhatsApp/Spreadsheet. *(Corrected 2026-07-19: this note previously described
  the fix as still outstanding; it had already landed and the note was
  stale.)* Keep new copy the same way — never hard-code translatable terms
  in a component.
- **The `await headers()` SSR lang/dir mechanism must not break.**
  `middleware.ts` sets `x-binaa-lang`; the root layout awaits `headers()` to
  render `<html lang dir>` server-side. Any new Arabic route must be added to
  the middleware `matcher` or its `<html>` renders as English.
- **The splash contract must survive as shipped (D15):** session-once =
  `sessionStorage['binaa-splash-seen']` **plus** the boot-script
  `html.splash-seen` class (pre-paint, no flash); reduced motion never mounts
  it (CSS `display:none` **and** the matchMedia unmount); `html:not(.js)`
  hides it for no-JS visitors; any input skips instantly. E2E covers all of
  this — and every new e2e test must seed the session flag or the overlay
  intercepts its clicks.
- **`#offer` must stay as an invisible alias anchor** on the merged
  How We Work section — old deep links and the no-JS e2e test depend on it.
- **Frame interiors stay Latin/LTR in both locales** (browser chrome is an
  LTR artifact — STAGE2-DESIGN §3/§6). `ar.ts` reuses the `en.ts` frame
  objects on purpose; do not "fix" them by translating.
- **`lib/work-video.ts` is the single source for the Wazen loop src.** The
  capture must be silent (no audio track), seamless, and shot on seeded demo
  accounts — never real client data (§6.1).
- **The scenario cards are capability illustrations, not client claims (D1).**
  Only Selected Work names delivered products; never add customer names or
  implied deliveries to What We Build or the journey artifacts.
- **Copy stays em-dash-free (D17).** No `—` in dictionaries, metadata, OG
  strings or rendered JSX literals; rephrase with comma, colon, period or
  middot. Grep guard: `grep -c "—"` = 0 on `lib/i18n/*.ts`, layout/page
  metadata, the OG files and both privacy pages (cleaned in the push-prep
  pass; privacy titles now inherit the `%s · Binaa Labs` template).
- **The splash unmount is anchored to the bloom** (`animationend` of
  `splBloom` covers both natural and skipped exits); don't rename that
  keyframe without updating `Splash.tsx`.
- **Tooling: `html { scroll-behavior: smooth }` breaks programmatic
  `window.scrollTo` loops** (each call becomes a superseded animation — the
  page never reaches the bottom, and IO reveals silently don't fire).
  Screenshot/scroll harnesses must set `scroll-behavior: auto` first
  (see `design/impl-review/shots.mjs`).
