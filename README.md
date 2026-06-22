# Binaa Labs — Landing Page

A bilingual (English / Arabic with full RTL) marketing site for **Binaa Labs**, a
Dubai software studio. Implemented in **Next.js (App Router) + TypeScript** from
the original Claude Design prototype.

## Features

- **Bilingual EN / AR** with full right-to-left layout — toggled in the nav and persisted in `localStorage`.
- **URL-aware language rendering** — `/?lang=ar` renders the Arabic version on first load, while the nav keeps the live toggle behavior.
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
npm run check        # typecheck + lint
npm run test:e2e     # Playwright smoke tests
```

Requires Node.js 18.18+ (Node 20+ recommended).

## Project structure

```
app/
  layout.tsx         Root layout: fonts (next/font), metadata, pre-paint theme script
  page.tsx           Page composition (server component) — section order lives here
  globals.css        Theme tokens, keyframes, responsive rules, all component styles
components/
  Providers.tsx      Theme + language context (useSite hook)
  ClientEffects.tsx  Reveal / count-up / magnetic (document-level enhancements)
  Nav, Hero, HeroCanvas, Stats, TheGap, WhatWeBuild,
  SelectedWork, HowItWorks, Offer, Guarantee, Team, Contact, Footer
  SectionLabel.tsx   Shared "— LABEL" eyebrow heading
  icons.tsx          Logo mark + inline SVG icons
lib/
  i18n.ts            All copy, in English and Arabic (typed)
```

## Customizing

- **Copy / translations** — edit `lib/i18n.ts`. The `en` object defines the shape; `ar` must match it. Both render through the same components.
- **Brand accent (gold)** — change `--gold` (and `--gold-ink` / `--gold-line` / `--gold-soft`) in the `[data-theme]` blocks of `app/globals.css`.
- **Theme palettes** — the full dark and light token sets live in `app/globals.css`.
- **Fonts** — configured in `app/layout.tsx` via `next/font/google` (Bricolage Grotesque, Inter, JetBrains Mono, Tajawal).
- **Sections** — reorder or remove sections in `app/page.tsx`.

## Notes for production

- The **contact form** has no backend yet: on submit it opens the visitor's email app pre-addressed to `admin@binaalabs.com` (change `LEAD_INBOX` in `components/Contact.tsx`) and shows a success state. Wire `onSubmit` to a backend or form service when you want automated capture.
- The **"Prefer to pick a time?" / Calendly** link is hidden for now — re-add it in `components/Contact.tsx` and point it at your scheduling link when ready.
- Replace the **Selected Work** placeholder slide with real project case studies as they ship.
- Add real Open Graph / favicon assets (`app/opengraph-image`, `app/icon`) before launch.
