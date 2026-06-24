# Binaa Labs — Landing Page

A bilingual (English / Arabic with full RTL) marketing site for **Binaa Labs**, a
Dubai software studio. Implemented in **Next.js (App Router) + TypeScript** from
the original Claude Design prototype.

## Features

- **Bilingual EN / AR** with full right-to-left layout — English at `/`, Arabic at `/ar`.
- **Path-based language** — each language is its own server-rendered, indexable route (with `hreflang` alternates). The nav toggle switches languages with an in-place client navigation: no full reload, scroll position and query params preserved.
- **Dark / light theme** via CSS variables, applied before paint (no flash), persisted in `localStorage`.
- **Animated hero canvas** — an isometric node-cube that "builds in", then floats with traveling pulses (theme-aware).
- **Motion & micro-interactions**: scroll-reveal, count-up stats, magnetic buttons, cursor-follow hero glow, scroll-progress bar, active-section nav highlighting.
- **Selected Work carousel** — autoplaying, pause-on-hover, dots + arrows, RTL-aware.
- **Contact form** with client-side validation and a success state.
- **Accessible & resilient**: semantic HTML, `prefers-reduced-motion` support, and content is server-rendered (works without JS; JS only layers on enhancements).
- **Responsive** from mobile through desktop via CSS media queries.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript validation
npm run lint         # ESLint validation
npm run format       # Prettier (write) — format:check to verify only
npm run check        # typecheck + lint
npm run test:e2e     # Playwright smoke tests
```

Set `NEXT_PUBLIC_SITE_URL` to your production origin so canonical/OG URLs,
`sitemap.xml` and `robots.txt` resolve correctly (defaults to
`https://binaalabs.com`).

Requires Node.js 18.18+ (Node 20+ recommended).

## Project structure

```
app/
  layout.tsx         Root layout: fonts (next/font), metadata, JSON-LD, pre-paint theme script
  page.tsx           English route (/) — renders <Landing lang="en">
  ar/page.tsx        Arabic route (/ar) — renders <Landing lang="ar">
  sitemap.ts         sitemap.xml (both language routes + hreflang)
  robots.ts          robots.txt
  globals.css        Theme tokens, keyframes, responsive rules, all component styles
middleware.ts        Sets the language header from the route path for SSR <html lang/dir>
components/
  Landing.tsx        Shared page composition — section order lives here
  Providers.tsx      Theme + language context (useSite hook)
  ClientEffects.tsx  Reveal / count-up / magnetic (document-level enhancements)
  layout/            Nav, Footer
  sections/          Hero, HeroCanvas, Stats, TheGap, WhatWeBuild,
                     SelectedWork, HowItWorks, Offer, Guarantee, Team, Contact
  ui/                SectionLabel (eyebrow heading), icons (logo + inline SVGs)
lib/
  i18n/              Typed copy: types.ts, en.ts, ar.ts, index.ts (dictionaries)
  site.ts            Site constants: SITE_URL, CONTACT_EMAIL
```

## Customizing

- **Copy / translations** — edit `lib/i18n/en.ts` and `lib/i18n/ar.ts`. The `en` object defines the shape (`Dict`); `ar` must match it. Both render through the same components.
- **Brand accent (gold)** — change `--gold` (and `--gold-ink` / `--gold-line` / `--gold-soft`) in the `[data-theme]` blocks of `app/globals.css`.
- **Theme palettes** — the full dark and light token sets live in `app/globals.css`.
- **Fonts** — configured in `app/layout.tsx` via `next/font/google` (Bricolage Grotesque, Inter, JetBrains Mono, Tajawal).
- **Sections** — reorder or remove sections in `components/Landing.tsx`.

## Notes for production

- The **contact form** has no backend yet: on submit it opens the visitor's email app pre-addressed to `admin@binaalabs.com` (change `LEAD_INBOX` in `components/Contact.tsx`) and shows a success state. Wire `onSubmit` to a backend or form service when you want automated capture.
- The **"Prefer to pick a time?" / Calendly** link is hidden for now — re-add it in `components/Contact.tsx` and point it at your scheduling link when ready.
- Replace the **Selected Work** placeholder slide with real project case studies as they ship.
- **Open Graph image** — metadata, Twitter card, JSON-LD, `sitemap.xml` and `robots.txt` are wired up, but there is still **no OG image**. Add `app/opengraph-image.(png|tsx)` (and a richer `app/icon`) before launch so social shares render a preview.
