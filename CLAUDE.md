# Binaa Labs Landing — Project Guide & Standards

> Conventions and repo guide for how this project is built. Written for **both
> developers and AI assistants**. **Before any task, read `PROJECT.md` at the
> repo root — it is the single source of truth** for product context, the
> decisions log, open decisions, and remaining work; this file covers the repo
> conventions only. Process rules live in `CONTRIBUTING-WITH-CLAUDE.md`. If you
> use another AI tool (Cursor, etc.), mirror this file to its expected name
> (e.g. `AGENTS.md`).

---

## 0. Standing repo rules (binding)

- **Read `PROJECT.md` first.** New decisions must land in its decisions log
  (D-numbers) in the same commit as the work.
- **No new frameworks or libraries without a D-row in `PROJECT.md`.** The
  hand-rolled systems (CSS tokens, reveal engine, theme, i18n) are deliberate.
- **Edit-tool only for source edits.** Shell-regex patches (sed/awk/python -c
  and equivalents) on repo files are banned — they have corrupted files before.
  Exception: `app/globals.css` is edited by **full-file rewrite**, never by
  targeted string replacement (string replacement fails on it).
- **Screenshot each changed area for review before committing.** Screenshot
  review is not a commit-go; the owner's explicit commit instruction is.
- **Frontend-only discipline.** Never touch backend/API/schema territory unless
  the prompt says so; never rebuild beyond what the task needs.
- All redesign work happens on `feat/site-redesign`. **Never commit to `main`
  directly** (docs-only commits by explicit owner instruction are the sanctioned
  exception) — `main` is production binaalabs.com via Vercel auto-deploy.

---

## 1. What this is

A **single-page, bilingual (English / Arabic, full RTL) marketing & lead-generation
site** for **Binaa Lab** (brand: **Binaa Labs**), a Dubai software company. Its job
is to get visitors to book a free system-analysis call.

- **Legal entity name:** `Binaa Lab` (singular, on the trade license — no "L.L.C").
- **Brand name:** `Binaa Labs` (plural) — use this for all marketing/UI copy.
- **Live at:** https://binaalabs.com (apex) · Arabic at https://binaalabs.com/ar
- **Hosting:** Vercel (auto-deploys on push to `main`) · **DNS:** Namecheap

---

## 2. Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict mode)
- **No CSS framework** — all styles are hand-written in `app/globals.css` using CSS
  custom-property theme tokens.
- **`next/font/google`**: Bricolage Grotesque (display), Inter (sans),
  JetBrains Mono (mono), Tajawal (Arabic + Latin).
- **Tooling:** ESLint (`next/core-web-vitals` + `next/typescript`), Prettier,
  Playwright (e2e), GitHub Actions CI.

---

## 3. Commands

```bash
npm run dev          # local dev (http://localhost:3000)
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run check        # typecheck + lint  ← run before every commit
npm run format       # prettier --write .   (format:check to verify only)
npm run test:e2e     # Playwright (spins up dev server on :3005)
```

**Always run `npm run check` before committing.** CI runs `npm ci → check → e2e`
and will go red otherwise.

---

## 4. Architecture

### Routing & i18n (path-based — important)
- **English** lives at `/` (`app/page.tsx`); **Arabic** at `/ar` (`app/ar/page.tsx`).
  Both render the shared `components/Landing.tsx` with a `lang` prop.
- **`<html lang/dir>` is set server-side.** `middleware.ts` reads the URL path and
  sets an `x-binaa-lang` header; the root `app/layout.tsx` reads that header to
  render `<html lang dir>`. **The middleware `matcher` must include every localized
  route** — it is currently `["/", "/ar", "/ar/:path*"]`. If you add a new Arabic
  sub-route, make sure it's covered or its `<html>` will wrongly render as English.
- **Language switching is in-place, no reload.** `Providers.tsx` `setLang()` calls
  `router.push(target, { scroll: false })` between `/` and `/ar`, preserving scroll
  position and query params. Do **not** reintroduce full-page reloads or `?lang=`.
- **Dictionaries:** `lib/i18n/` — `en.ts` defines the shape (exported as `Dict`),
  `ar.ts` must match it (TypeScript enforces this via `ar: Dict`), `index.ts`
  exposes `dictionaries`, `types.ts` has `Lang`. Components read copy through
  `useSite().t`.

### Theme (dark / light)
- CSS token sets under `:root[data-theme="dark"|"light"]` in `globals.css`.
- A small inline **boot script** in `app/layout.tsx` applies the saved theme before
  paint (no flash) and adds the `.js` class. Stored in `localStorage` as
  `binaa-theme`. **Theme is the only thing stored client-side** — language is
  path-based, not stored.

### Rendering
- Section components are `"use client"` but are **server-rendered** (content is in
  the initial HTML and works without JS; JS only layers on enhancements). Keep it
  this way — it matters for SEO and resilience.

### Styling
- All styles live in `app/globals.css`. Use the **theme tokens** (`--bg`, `--bg-2`,
  `--ink`, `--ink-2`, `--gold`, `--line`, …) — never hard-code colors.
- **RTL** is handled with logical properties (`inset-inline-start`,
  `margin-inline-start`) and `[dir="rtl"]` selectors. Prefer logical properties.
- **Mobile-first**: base styles are mobile; `@media (min-width: 920px)` layers on
  desktop. Keep touch targets ≥ 40px. Hero canvas is disabled below 920px.

---

## 5. Project structure

```
app/
  layout.tsx          Root <html>: fonts, metadata, JSON-LD, boot script (reads lang header)
  page.tsx            English route (/)  → <Landing lang="en">
  ar/page.tsx         Arabic route (/ar) → <Landing lang="ar">
  privacy/page.tsx    EN privacy policy (standalone legal page)
  ar/privacy/page.tsx AR privacy policy
  opengraph-image.tsx EN social card (next/og)
  ar/opengraph-image.tsx  AR social card
  sitemap.ts          sitemap.xml          robots.ts   robots.txt
  icon.svg favicon.ico apple-icon.png      Favicons
  globals.css         ALL styles (tokens, keyframes, components, responsive, legal)
middleware.ts         Sets x-binaa-lang header from path (for SSR <html lang/dir>)
components/
  Landing.tsx         Shared page composition — section order lives here
  Providers.tsx       Theme + language context (useSite hook)
  ClientEffects.tsx   Scroll-reveal / count-up / magnetic enhancements
  og-card.tsx         Shared OG image renderer (loads Tajawal font)
  layout/             Nav, Footer
  sections/           Hero, HeroCanvas, Stats, TheGap, WhatWeBuild, SelectedWork,
                      HowItWorks, Offer, Guarantee, Team, Contact
  ui/                 SectionLabel, icons
lib/
  i18n/               types.ts, en.ts, ar.ts, index.ts (dictionaries)
  site.ts             SITE_URL, CONTACT_EMAIL (single source of truth)
assets/og/            Tajawal-Regular.ttf, Tajawal-Bold.ttf (for OG images)
tests/e2e/            Playwright specs        scripts/e2e.mjs   playwright.config.ts
```

---

## 6. Conventions / Standards

1. **Never hard-code user-facing copy in section components.** Add it to
   `lib/i18n/en.ts` **and** `lib/i18n/ar.ts` (identical shapes — TS enforces).
   Read it via `useSite().t`. *Exception:* standalone legal pages (privacy) keep
   inline content per-locale, since the text is long and rarely changes.
2. **JSX text must not contain raw `"` or `'`** — ESLint `react/no-unescaped-entities`
   will fail the build. Use typographic quotes **“ ” ’** (preferred) or HTML
   entities. (This has broken the build before.)
3. **Constants** (`SITE_URL`, `CONTACT_EMAIL`) live only in `lib/site.ts`. Import
   them; don't duplicate literals.
4. **Accessibility is a standard, not optional:** `:focus-visible` rings, the skip
   link, `scroll-padding-top` for the sticky nav, aria labels sourced from i18n,
   `prefers-reduced-motion` respected, ≥40px tap targets. Don't regress these.
5. **Run `npm run check` before committing.** Keep typecheck and lint green.
6. **Match the surrounding code** — comment density, naming, and idioms.

### Recipe: add a new section
1. Create `components/sections/MySection.tsx` (`"use client"`, read copy from
   `useSite().t`). 2. Add its copy to `en.ts` + `ar.ts`. 3. Import and place it in
   `components/Landing.tsx`. 4. Style it in `globals.css` using tokens.

### Recipe: add a translated string
Add the key to the right nested object in `en.ts`; TypeScript will then *require*
the same key in `ar.ts`. Use it via `t.<path>`.

### Recipe: add a new page/route
- If it's an **Arabic** route, confirm `middleware.ts` `matcher` covers it (else
  `<html lang/dir>` is wrong).
- Export `metadata` with `alternates.canonical` and `languages`
  (`en` / `ar` / `x-default`).
- Add it to `app/sitemap.ts`.
- Add a discoverable link (e.g. in the footer, with i18n labels).

---

## 7. SEO (all implemented — keep intact)

- `metadataBase` + per-route **canonical** and **hreflang** (`en`, `ar`, `x-default`).
- `app/sitemap.ts`, `app/robots.ts`, **Organization JSON-LD** in `layout.tsx`.
- **OG images** for EN and AR via `next/og` (`components/og-card.tsx`). Note: the
  `opengraph-image` file convention does **not** cascade into sibling segments —
  each localized route needs its own `opengraph-image.tsx` (the `/ar` one
  re-exports the shared renderer). Arabic needs the bundled **Tajawal** font (Satori
  can't render Arabic with its default font).
- Favicons: `favicon.ico` (multi-size) + `apple-icon.png` + `icon.svg`.
- **`NEXT_PUBLIC_SITE_URL`** env var drives canonical/OG/sitemap URLs (defaults to
  `https://binaalabs.com`). Set it in Vercel for production; `.env.local` for dev.

---

## 8. Deployment

- **Vercel** auto-deploys on push to `main` (production). It uses lenient
  `npm install`, so a deploy can succeed even if CI (`npm ci`) fails — they can
  diverge.
- **Domain:** `binaalabs.com` is the apex (canonical). `www.binaalabs.com` → 308
  redirect to apex. DNS at Namecheap (apex A record → Vercel IP; `www` CNAME →
  Vercel). Don't add a Namecheap "URL Redirect Record" — it injects a parking IP
  that conflicts with the apex A record.

---

## 9. CI

`.github/workflows/ci.yml` runs on push/PR: `npm ci` → `npm run check` →
`playwright install chromium` → `npm run test:e2e --project=chromium`.

---

## 10. Gotchas

- **Cross-platform lockfile:** developed on Windows, CI on Linux. Running
  `npm install` on Windows can drop Linux-only optional deps (`@emnapi/*`, a `sharp`
  dependency) from `package-lock.json`, making CI `npm ci` fail with
  `EUSAGE … Missing … from lock file`. Fix: `rm -rf node_modules package-lock.json
  && npm install`, then commit the lockfile. Verify `grep -c "@emnapi" package-lock.json` > 0.
- **Favicon caching:** browsers cache favicons aggressively (separate from normal
  cache). Test in an Incognito window or by visiting `/favicon.ico` directly.
- **Verify before deleting/overwriting** generated assets (favicons, OG fonts) —
  they're produced from `app/icon.svg` and `assets/og/` respectively.

---

## 11. Parked / TODO (deferred by the owner)

> Superseded by `PROJECT.md` §5 (remaining work + launch checklist) — kept here
> as a pointer only. The redesign absorbs the old parked list: contact form
> backend, analytics, Calendly link, real case studies, Lighthouse pass.
