# Stage 2 — Section-by-Section Redesign Design Document

> The owner-approval document for the redesign's design pass. Governed by
> PROJECT.md D1–D14 (D13 section strategy, D14 color lock, D6 copy framing,
> D2 render gates). Every redesigned section has rendered mock proofs in
> `renders/` ({section}-{theme}-{width}.png, plus `hero-ar-dark-1440.png` and
> the splash filmstrip `splash-f{1..6}.png`). Mocks share `tokens-draft.css` —
> the proposed presentation-layer token system (D4) — and render final
> (post-entrance) states.
>
> **Nothing here is implemented.** Approval of this document (via the decision
> checklist at the end) is the gate to the implementation passes.

**Revision 2b (this pass)** — five owner rulings applied, plus a global copy diet:

1. **Intro splash added** as a page-level moment (§1) — playable mock, filmstrip.
2. **What We Build reframed** to four *scenario* cards (§5); service categories
   and stack tags removed from the section.
3. **How It Works + Offer merged** into one section (§7); the standalone Process
   chapter is gone, chapters renumbered, nav anchors replanned.
4. **Selected Work fidelity raised** (§6): dense product UI, a silent video slot,
   Almani placeholder brought to the same floor.
5. **Contact de-generified** (§11): the form is the star; a receipt strip lands
   under the submit.
6. **Global copy diet** — every section cut to *headline + one supporting line*;
   body prose down **43%** overall (§13 word-count table). EN and AR equally.

**Fidelity floor for everything re-rendered this pass:** real elevation/glow
tokens, dense plausible UI inside every frame, no empty grey bars. The grey-bar
placeholder primitives (`.f-item`, `.f-row`, `.f-lab`, `.ph-mark`) are **deleted
from `stage2-base.css`** — the mock system can no longer produce one.

---

## 0 · Draft token system (`tokens-draft.css`)

Color is D14 verbatim (dark `--ink-3` bumped to `#8A8A84`: 5.01 on `--bg`,
5.30 on `--bg-2` — both clear AA). New scales, proposed for implementation:

| Scale | Tokens | Notes |
|---|---|---|
| Spacing | `--sp-1…10` = 4/8/12/16/24/32/48/64/96/128px | 4-base; replaces ad-hoc paddings |
| Radius | `--r-1` 6 · `--r-2` 10 · `--r-3` 16 · `--r-4` 24 · `--r-pill` | 4 steps + pill replaces ~15 ad-hoc values |
| Elevation | `--elev-1/2/3` per theme + `--glow-gold` | shadows navy-tinted in light theme |
| Glow | `--glow-radial` (Guarantee only) · `--hero-light` (hero, dark only) | the two sanctioned in-page glow treatments |
| Motion | `--dur-fast` 150ms · `--dur-base` 300ms · `--dur-slow` 600ms · `--ease-enter` cubic-bezier(.16,1,.3,1) · `--ease-hover` cubic-bezier(.4,0,.2,1) | all in-page animation comes from these five |
| **Splash timeline** | `--spl-close-dur` 400 · `--spl-hex-dur` 900 · `--spl-inner-dur` 750 · `--spl-text-dur` 600 · `--spl-exit-dur` 600ms | see below |

**Why the splash gets its own durations.** A logo line-draw that reads as
*drawing* cannot finish inside `--dur-slow` (600ms) — the storyboard asks for
1.2–1.5s of draw. The splash therefore declares five timeline tokens rather than
hard-coding numbers, and reuses the standard **easings** (`--ease-enter` to
close, `--ease-hover` to draw and to part). These are the **only** durations
outside the 150/300/600 scale, and they exist on one element that appears once
per session.

Reduced-motion architecture is unchanged (PROJECT.md §6): the global CSS
kill-switch stays, **plus** explicit `matchMedia` checks wherever JS drives
motion (splash, count-up, rail draw, accordion height, video loop).

---

## 1 · Intro splash — page-level (NEW)

Proofs: `splash-f1.png` … `splash-f6.png` (filmstrip) + `splash-reduced-motion.png`.
**Playable mock: `splash.html`** — open it in a browser and it runs the full
storyboard. Alternate choreography: `splash-alt.html` (§1.6).

- **Purpose.** One branded moment before the page: name the studio, draw the
  mark, hand off to the hero. It is **not** a loading screen — nothing is
  waiting on it, and the hero is in the DOM and painted underneath from the
  first frame.
- **Scope.** Page-level overlay, not a section. It has no anchor, no nav entry,
  and it never reappears once dismissed.

### 1.1 Storyboard & timings

Total **3.7s**. Beats, in order:

| # | Beat | Starts | Duration | Easing |
|---|---|---|---|---|
| 1 | Two brand-dark panels slide in from left/right, closing at center | 0 | `--spl-close-dur` **400ms** | `--ease-enter` (decisive settle) |
| 2a | Gold line-draw: the logo cube's outer hexagon | 400ms | `--spl-hex-dur` **900ms** | `--ease-hover` |
| 2b | Gold line-draw: the inner Y (the cube's three inner edges) | 1000ms | `--spl-inner-dur` **750ms** | `--ease-hover` |
| 2c | The three cube nodes pop in (staggered 110ms) | 1450ms | `--dur-base` **300ms** each | `--ease-enter` |
| 3 | Text fades up: “Welcome to Binaa Labs” → بناء لابس → tagline (120ms stagger) | 1900ms | `--spl-text-dur` **600ms** | `--ease-enter` |
| 4 | **Hold** (full lockup, nothing moves) | ~2740ms | **~360ms** | — |
| 5 | Panels part to the edges + lockup dissolves, revealing the hero | 3100ms | `--spl-exit-dur` **600ms** | `--ease-hover` (smooth reveal) |

Line-draw (2a+2b overlapping) spans 400 → 1750ms = **1.35s**, inside the
1.2–1.5s the storyboard asked for.

**Easing choice, stated because it is not obvious:** the panels *close* on
`--ease-enter` (front-loaded — it should feel decisive, like a shutter) but
*part* on `--ease-hover` (symmetric). On `--ease-enter` the 600ms part is over
in ~150 perceived ms and the reveal is thrown away; the symmetric curve spends
the whole 600ms actually revealing.

**Geometry.** The cube is `app/icon.svg`'s node-cube path (the mark, with its
background plate stripped) — simplified strokes, drawn with `pathLength="1"` +
`stroke-dashoffset`. It is a stand-in for `trace.svg`, which is **not in the
repo yet**: the logo asset lands in the D14 asset pass (de-trace, strip
background, dual-color variants). When it lands, the splash swaps the path data
and nothing else changes.

### 1.2 The three rules

1. **Once per session.** A `sessionStorage` flag (`binaa-splash-seen`) is set on
   first render; every later navigation in that tab removes the overlay before
   paint. Not `localStorage` — a visitor returning next week should get the brand
   moment again; a visitor clicking to `/ar` and back should not. (Language
   switching is client-side `router.push` with no reload, so the splash cannot
   re-fire on it regardless.)
   **Verified by driving the mock:** first view plays → reload skips → a fresh
   session plays again. Note the spec'd semantics, so nobody files it as a bug:
   `sessionStorage` is scoped **per tab**, so opening the site in a *new tab* is
   a new session and does show the splash again. That is the intended reading of
   "once per session." If the owner wants once-per-*visitor-per-day* instead,
   that is a `localStorage` timestamp — a different rule, not a bug fix.
2. **Skip after ~1s.** A Skip affordance fades in at **1000ms** (≥40px target,
   `:focus-visible` ring, `Esc` also dismisses). It is deliberately not instant:
   a button that appears at 0ms invites a reflex click before the visitor has
   seen anything.
3. **Reduced motion skips entirely.** Two layers, per PROJECT.md §6:
   CSS (`@media (prefers-reduced-motion: reduce) { #splash { display: none } }`)
   **and** JS (`matchMedia(...).matches → splash.remove()` before any animation).
   There is no degraded "static splash" — under reduced motion the visitor lands
   on the hero, full stop. **Verified:** rendered with Playwright's
   `reducedMotion: "reduce"`; the overlay is absent from the DOM
   (`splash-reduced-motion.png` is the bare hero).

### 1.3 The LCP trade (owner-accepted)

**The cost, stated plainly.** For the first page view of a session, the hero is
visually occluded for up to 3.7s. The hero *paints* immediately (the splash is
an overlay above it, not a replacement), so the DOM, SSR content and
interactivity are unaffected — but the browser's LCP candidate becomes the
splash lockup, which finishes fading in at **~2.5s**. That sits on the
"needs improvement" boundary of the 2.5s LCP threshold. Today's production
Lighthouse is Performance 96; this is the one change in the redesign that can
move that number down.

**What limits the damage:**
- Session-once — only the first view of a session pays it at all.
- Skip at 1s, `Esc` at any time.
- Reduced-motion visitors never see it.
- The splash is pure CSS animation over inline SVG: **no images, no fonts
  blocking the draw, no network request, no blocking JS.** It does not delay the
  hero's own resources — it only covers them.

**Fallbacks if the preview deploy measures badly** (in order of preference):
shorten the hold and the exit (3.7s → ~3.0s); then drop the splash on mobile
(where LCP budgets are tightest and the moment lands weakest); then gate it to
first-ever visit rather than first-of-session. **Measure on the Vercel preview
before merging — do not ship this on trust.**

### 1.4 Composition

Brand-dark in **both themes** (`#141414` panels, `#FAFAF8` ink, `#D4A017`
gold) — the splash is a brand moment, not a themed surface, and a light-theme
splash would make the gold line-draw invisible. The hero behind it is themed
normally, so the reveal at beat 5 is also the theme reveal.

Centered stage: cube (148px) → “Welcome to Binaa Labs” (display, 1.9rem) →
**بناء لابس** (Tajawal, gold — the D10 transliteration) → tagline (mono, caps).

### 1.5 Copy

| Slot | Wording (proposed) |
|---|---|
| Title | Welcome to Binaa Labs |
| Arabic | بناء لابس *(D10 spelling — the one being fixed in `ar.ts`)* |
| Tagline | **Software Studio · Dubai** ← **placeholder; checklist item 1** |

The tagline is the one piece of splash copy with no existing source. It should
be the shortest true thing the studio says about itself. Options in the
checklist. In AR the title becomes «أهلاً بك في بناء لابس» and the Latin line
drops (it would be redundant next to the Arabic mark).

### 1.6 Alternate choreography — `splash-alt.html`

**"Reveal from the mark."** No panels. An opaque brand-dark scrim covers the
hero from first paint; the cube draws, the lockup fades in, and then the entire
scrim is clipped away by a **circle collapsing into the mark** — the page
appears to come *out of* the logo. Total **~3.0s** (0.7s shorter).

**Rationale for offering it.** The panel version's opening beat (two panels
sliding closed) is theatrically strong but semantically empty — it says
"curtains," which is a cinema metaphor, not a software one. The alt version's
exit *is* the brand statement: everything you're about to see came out of this
mark. It is also **0.7s cheaper on LCP**, which matters given §1.3. Its cost is
that it has no opening gesture at all — it starts already-covered, so the first
thing the visitor sees is a dark screen, which is a worse cold-start feeling.

**Recommendation: ship the panel version (`splash.html`)** — the storyboard the
owner specified — and hold the alt as the fallback if §1.3's measurement forces
a shorter splash. Checklist item 2.

---

## 2 · Nav (keep/restyle — D13)

- **Purpose.** Orientation + persistent CTA. Not a redesign target.
- **Composition.** Unchanged structure: brand (mark + "Binaa Labs" + subtext),
  anchor links, EN/AR + theme toggles, CTA button, scroll-progress bar. Restyle
  to tokens only. Subtext becomes **"Software Studio"** (D9; Arabic:
  "استوديو برمجيات", updated alongside the D10 transliteration fix).
- **Anchor plan (revised — the merge changes it).**

  | Anchor | Section |
  |---|---|
  | `#gap` | The Gap |
  | `#build` | What We Build |
  | `#work` | Selected Work |
  | **`#how-we-work`** | **How We Work & What You Get (new — §7)** |
  | `#guarantee` | Guarantee |
  | `#faq` | FAQ |
  | `#contact` | Contact |

  **Retired:** `#how-it-works` and `#offer`. The footer currently links to
  `#offer`, so the merged section carries **`id="offer"` as an alias** — old
  deep links keep working instead of scrolling to nothing. Nav + footer link
  labels retarget to the merged section. Which four links the desktop nav shows
  is **checklist item 5.**
- **Motion.** Existing: progress bar (transform), menu sheet slide
  (`--dur-base`/`--ease-enter`). Reduced motion: instant.

## 3 · Hero — full redesign (D13) + stats fold-in

Proofs: `hero-{dark,light}-{1440,390}.png`, `hero-ar-dark-1440.png`
(**re-rendered this pass** — frame raised to the fidelity floor, copy dieted).

- **Purpose.** Ten-second verdict: a real software studio with a real shipped
  product. Product-anchored, not abstraction-anchored.
- **Composition — desktop (1440).** Two columns (1.04fr/0.96fr). Left: location
  badge → headline (gold `<em>` highlights) → **one** supporting line → CTA row
  → **proof band** (slim 4-item stat row under a hairline, replacing the Stats
  section). Right: **layered frame stack** — offset back-plate, browser-chrome
  product frame containing the Wazen coach dashboard (sidebar nav, three KPI
  tiles, three client rows with status chips), one floating data chip. In dark
  theme a single radial **gold light source** (`--hero-light`) sits behind the
  frame; light theme uses elevation instead (glow reads as smudge on white).
  The old canvas node-cube is **retired**.
- **Composition — mobile (390).** MUST exist, reduced not hidden: badge →
  headline → sub → stacked CTAs → proof band as 2×2 → frame stack below.
  Breakpoint-divergent → **D2 render gate; both renders shipped.**
- **Exclusive mechanic.** Layered product-frame stack + single gold light source.
- **Copy.** Headline kept verbatim (it *is* the pitch — D6). Supporting line cut
  **33 → 17 words**. Highlight terms move into the dictionary (fixes the
  hard-coded-terms violation, PROJECT.md §6). Proof band: 100% · AR+EN · 2 wks ·
  24h — **drops the current "1:1 direct" stat; checklist item 6.** Floating chip
  ("96% check-in rate") is a **placeholder metric — must be replaced by a real
  Wazen figure at asset pass or dropped (D1: no fabricated proof); checklist
  item 7.**
- **RTL.** Whole composition mirrors (proven: `hero-ar-dark-1440.png`); glow
  flips via `scaleX(-1)`; CTA arrow uses `--arrowflip`; **the frame interior
  stays LTR** — a browser chrome is an LTR artifact and the URL is Latin. The
  floating chip is anchored to the frame's **lower** edge, not the upper: an
  inline-end-anchored chip extends inward, and at the top it lands on the
  sidebar nav once mirrored (caught in the RTL render).
- **Motion.** Entrance on load (after the splash hands off): copy children
  stagger fade-rise 12px (`--dur-slow`, `--ease-enter`, 60ms stagger); frame
  stack settles from 8px (`--dur-slow`, 150ms delay); chip pops last
  (`--dur-base`). Proof-band values count up. Reduced motion: final state
  instantly; count-up sets values immediately.

## 4 · The Gap — keep concept, redesign mechanic (D13)

Proofs: `gap-{dark,light}-{1440,390}.png` (re-rendered — copy dieted).

- **Purpose.** Disqualify the alternatives; make "real studio vs claim-maker"
  visceral rather than two polite cards.
- **Composition — desktop.** One bordered `--r-4` container split
  `1fr / 1px / 1fr`: **rose-tinted half** ("The Usual Option", ✗ items) vs
  **gold-tinted half** ("Binaa Labs — The Studio Model", ✓ items). The shared
  **center spine** is a `--line-2` rule with a floating "THE GAP" node pill.
  Four items per side, hairline-separated, icon-chip + title + one-liner.
- **Composition — mobile.** Halves stack; the spine rotates horizontal with the
  node still centered. Covered by the 390 renders.
- **Exclusive mechanic.** Adversarial split-screen, tinted halves, center spine.
  The only section using `--rose` at surface scale.
- **Copy.** Item content unchanged (it already carries D6's framing). The
  supporting line is cut **43 → 16 words** — the two halves *are* the argument,
  so the sub only has to point at them.
- **RTL.** Halves keep semantic order (usual option first in reading direction);
  tinted gradients are vertical, no flip; spine node is centered.
- **Motion.** Halves translate in from their outer edges (±24px, `--dur-slow`,
  `--ease-enter`); spine node scales in after (`--dur-base`, 200ms delay); items
  stagger-fade within each half. Reduced: static.

## 5 · What We Build — **scenario reframe** (revised this pass)

Proofs: `build-{dark,light}-{1440,390}.png` (re-rendered).

> Supersedes both earlier drafts (vignette-bento, then service-cards-with-a-
> from→to-line). The owner's ruling: **lead with the outcome, not the
> discipline.** A buyer does not want "Web Applications." They want the clinic
> to stop losing bookings.

- **Purpose.** Four capabilities, each shown as **the world after we build it**.
- **Composition.** Even **2×2 grid** of `--r-3` cards (single column at 390).
  Each card, top to bottom:
  1. icon chip (gold-tinted, per-scenario glyph)
  2. **scenario headline** — the picture, in the customer's words
  3. **one line** of what we build to make it true
  4. the **from → to line** on a top hairline — kept as the punch
  A faint mono index (01–04) sits in each card's corner as texture.
- **What is gone.** **No stack tags. No service-category titles.** The four
  categories (Web apps · Mobile apps · Process automation · System integration)
  now appear **once**, as a single mono `Disciplines —` line inside §7; the
  stack itself lives in FAQ Q7. Neither is repeated anywhere else.
- **Exclusive mechanic.** The **from→to transformation line**: "from" side in
  `--ink-3` with a 1px strike-through, mono arrow glyph in gold, "to" side in
  `--ink` at weight 600. The only before/after text treatment on the page.
- **Copy — final, for owner approval (checklist item 3).** EN with Arabic
  direction per line (final Arabic wording lands in `ar.ts` at implementation):

  **01 — A clinic that books itself** · عيادة تحجز مواعيدها بنفسها
  - *Build:* A booking system your patients use directly — appointments,
    reminders and records in one place.
    نظام حجز يستخدمه مرضاك مباشرة — المواعيد والتذكيرات والسجلات في مكان واحد
  - *From → to:* phone tag and a paper calendar **→** slots that book, confirm
    and remind on their own
    مكالمات متبادلة وتقويم ورقي ← مواعيد تُحجز وتُؤكَّد وتُذكِّر من تلقاء نفسها

  **02 — A warehouse that knows every part it holds** · مستودع يعرف كل قطعة يحتويها
  - *Build:* An inventory system tracking every part, price and location in real
    time.
    نظام جرد يتتبّع كل قطعة وسعرها وموقعها لحظة بلحظة
  - *From → to:* a storeroom only one person understands **→** live stock every
    device can see
    مخزن لا يفهمه إلا شخص واحد ← مخزون حيّ يراه كل جهاز

  **03 — Reports that write themselves** · تقارير تكتب نفسها
  - *Build:* Automation that pulls your numbers and assembles the report the
    moment it is due.
    أتمتة تجمع أرقامك وتُعِدّ التقرير في موعده تلقائياً
  - *From → to:* a night of copy-paste every month **→** it is already in your
    inbox
    ليلة نسخ ولصق كل شهر ← التقرير جاهز في بريدك

  **04 — Ten tools that finally talk** · عشر أدوات تتحدث أخيراً
  - *Build:* Integration wiring your CRM, accounting and payments into one
    connected flow.
    ربط يوصل نظام العملاء والمحاسبة والمدفوعات في مسار واحد
  - *From → to:* ten disconnected tools **→** one connected operation
    عشر أدوات منفصلة ← عملية واحدة مترابطة

  ⚠ **Honesty check (D1).** These scenarios are *illustrations of capability*,
  not claims of delivered clients. None names a customer, and the section must
  never imply Binaa Labs has shipped a clinic or a warehouse. The one place the
  page claims delivery is §6, which names only Wazen and Almani.
- **RTL.** Grid flips; the arrow glyph flips via `--arrowflip` (→ becomes ←);
  strike-through and weights are direction-neutral; from/to order follows text
  direction naturally.
- **Motion.** Cards use the **base reveal** (the section's identity lives in the
  line, not the entrance). On reveal, each card's from→to line plays one
  sequenced emphasis: the "from" fades to its muted struck state, then arrow and
  "to" resolve in (~1.5× `--dur-base`, staggered per card, once). Reduced
  motion: skipped — the line renders in final state (pure CSS, kill-switch
  covers it).

## 6 · Selected Work — case panels + **video slot** (fidelity raised this pass)

Proofs: `work-{dark,light}-{1440,390}.png` (re-rendered).

- **Purpose.** The proof section. Two real projects, treated like case studies.
  Carousel retired. No third panel, no "coming soon."
- **Composition.** Approved **alternating panel** structure kept: Panel 1 Wazen
  (copy left / visual right), Panel 2 Almani (**visual left / copy right**, via
  `order`). Panels stack at 390 (copy first — alternation is a desktop rhythm).
  Copy column: badge pill → name → category → dieted description → **mono meta
  rows** (Role / Stack / Status) → link.
- **Wazen frame — raised to the floor.** No longer a grey-bar wireframe: a
  browser-chrome frame containing the real coach dashboard shape — sidebar
  (Dashboard/Clients/Plans/Check-ins/Templates/Messages), three KPI tiles
  (128 active clients · 96% check-in rate · 24 plans updated), a **weekday
  check-in bar chart with axis labels**, and a three-row client table with
  status chips. This still ships as a *poster*, replaced by the real capture at
  the asset pass.

### 6.1 The video slot (new spec)

The Wazen visual is a **video slot**, not a static image.

| Property | Spec |
|---|---|
| Content | Silent **screen capture** of the live Wazen app |
| Length | **20–30s**, seamless loop (last frame matches first) |
| Audio | **None.** No audio track in the file at all — not "muted by default" |
| Attributes | `muted`, `loop`, `playsinline`, `autoplay` (gated below) |
| Poster | Required. The poster **is** the dense frame above — it is what shows before load, on error, and under reduced motion |
| Loading | **Lazy.** No fetch until the panel nears the viewport (IntersectionObserver); poster carries the layout in the meantime |
| Reduced motion | **Never autoplays.** `matchMedia` check → poster held as a still. No play button appears — a reduced-motion visitor is not asked to opt into motion |
| Controls | None. It is a texture, not a player |
| Layout | Fixed aspect box so the poster→video swap causes **zero CLS** |

States are proofed as annotated stills in the mock (the strip under the panels):
**1 · Idle (lazy, out of view)** → **2 · In view (playing)** → **3 · Reduced
motion (paused on poster)**.

**Implementation dependency.** The player component is **ported from the Wazen
landing repo** (lazy IntersectionObserver mount + poster + reduced-motion
guard). This is a **first-party code port, not a new library** — it needs no
D-row under the "no new frameworks/libraries" rule, but it *is* a cross-repo
dependency and the implementation pass cannot start the Work section until the
component is copied in and the capture exists.

**Asset dependency — the capture itself.** Shot list is **checklist item 4.**
The capture must use **seeded demo accounts, never real client data** — Wazen is
a live product with real coaches and real people's health data in it. No real
names, photos, or metrics in the recording.

### 6.2 Almani — placeholder at the same floor

Almani has no assets yet (D7). Its frame is therefore a **schematic**: a dense,
plausible parts-catalog UI (sidebar, filter chips, three part cards with
prices and New/Used badges, an offers table showing the negotiable-price flow
that is genuinely their differentiator). It meets the fidelity floor — it is not
an empty grey box.

⚠ **It must never be mistaken for a screenshot.** Two disclosures, both outside
the frame so they cannot be read as part of the product UI:
1. the frame border is **dashed**, not solid — every other frame on the page is
   solid;
2. a mono note sits in the copy column: **“Schematic — real frames land in the
   asset pass (D7).”**

An earlier draft put a ribbon *inside* the frame; it covered the URL bar and
read like a UI element. Annotations go outside the artifact they annotate.

- **Copy.** Descriptions dieted (Wazen 38 → 19 words; Almani 36 → 21). Meta-row
  values are new dictionary keys — Role wording is **checklist item 8**; panel
  order (Wazen first) is **checklist item 9.**
- **Exclusive mechanic.** Alternating case panels + the silent video loop. The
  only section with full-width panel blocks and the only moving image on the page.
- **RTL.** Panels mirror; meta labels translate, values stay Latin (`dir` on the
  value spans); frame interiors stay LTR.
- **Motion.** Each panel's visual slides in from its own side (±32px,
  `--dur-slow`), alternating with the panels, while copy fades in place. The
  video's own playback is governed by §6.1. Reduced: static, poster held.

## 7 · How We Work & What You Get — **merged section** (Process → Offer)

Proofs: `offer-{dark,light}-{1440,390}.png` (new mock; `process.html` and its
renders are **deleted**).

> **The merge.** "How It Works" (three steps) and "Offer" (deliverables + price)
> were answering one question in two places — *what happens, and what do I get?*
> Separately, the process section was abstract (three paragraphs of reassurance)
> and the offer section was a list with no narrative. Merged, the process
> becomes the **spine** and the deliverables become its **payload**.

- **Purpose.** Kill process anxiety and price anxiety in one pass.
- **Composition — desktop.** Two stacked movements inside one section:

  **(a) The journey rail.** Three numbered nodes on a horizontal gold→line
  gradient connector. Each step: number node → title → **one line** → and then
  the thing that makes this section work: **a concrete artifact fragment** —
  what physically lands in the client's hands at that step.

  | Step | Artifact fragment |
  |---|---|
  | 01 · Free analysis | **Fixed-quote doc fragment** — a miniature proposal: three scoped line items, each "included", ruled off to a `Total — One fixed price` |
  | 02 · You watch it build | **Demo-link chip** — a browser URL chip (`preview.binaalabs.dev/your-app`) with a live pill, under it `Build 0.6 · Booking module · Updated 2h ago` |
  | 03 · Launch and own it | **Repo-handover card** — `your-company/platform` with a `Yours` pill and three rows: source + history, infra & DNS accounts, docs & runbook, each `transferred ✓` |

  Each artifact is labelled **“You receive”**. They are what turn three claims
  into three receipts.

  **(b) What you get.** Below a hairline: the five deliverables (number + title
  + one dieted line) on the wide side, and the **sticky fixed-price proposal
  card** on the narrow side (label → title → intro → four checks → free-first-
  step box → CTA). The proposal card sticks while the deliverables scroll past
  it — the price stays on screen for the whole list.

  Under the deliverables, one mono line absorbs the categories removed from §5:
  **`Disciplines — Web apps · Mobile apps · Process automation · System integration`**.

- **Composition — mobile.** The rail rotates vertical (connector on the
  inline-start edge, nodes on it, artifacts indented under each step); then
  deliverables; then the proposal card un-sticks and sits at the bottom, right
  before the reader would go looking for it. Divergent by breakpoint →
  **D2 render gate; both renders shipped.**
- ⚠ **Artifact honesty (D1).** The fragments are deliberately generic —
  `your-app`, `your-company/platform`. An earlier draft used a plausible client
  name (`atlas-clinic`), which on a live page reads as a real customer. No
  invented client names anywhere in these artifacts.
- **Exclusive mechanic.** The **artifact-bearing journey rail feeding a sticky
  proposal card.** (Absorbs both retired mechanics: the drawn connector line and
  the sticky card, which now belong to one section instead of two.)
- **Copy.** Cut **259 → 160 words (−38%)**. The three steps lose their
  paragraphs entirely — an artifact says "you get a working link" better than a
  sentence claiming it does. Section ordering (rail → deliverables → proposal)
  is **checklist item 10.**
- **RTL.** Connector gradient flips (explicit `[dir="rtl"]` override); nodes and
  numbers stay Latin (D1); artifact fragments keep `direction: ltr` internally
  (URLs, repo paths and version strings are Latin artifacts); the sticky card
  mirrors automatically.
- **Motion.** **The section's motion moment:** on scroll-into-view the connector
  draws start→end (`--dur-slow`, `--ease-enter`), each node pops (scale .6→1,
  `--dur-base`) as the draw reaches it, and **each step's artifact settles in
  (fade + 8px rise, `--dur-base`) right after its node** — the artifact is the
  payoff of the draw. JS-driven → **explicit `matchMedia` check: connector
  pre-drawn, nodes and artifacts shown, copy static.**

## 8 · Guarantee — the theatrical moment (D13)

Proofs: `guarantee-{dark,light}-{1440,390}.png` (re-rendered — copy dieted).

- **Purpose.** Risk reversal as a signed promise — the one place the page slows
  down and speaks directly.
- **Composition.** Single centered column (max 720px): seal (gold circle, check,
  `--glow-gold`) → mono label → headline → **Arabic pull-line "اعتمد قبل أن تدفع"
  kept** → body → secondary → **three mono term chips** → hairline → signature.
  Behind it, `--glow-radial` — the page's only *centered radial* glow.
- **Copy.** Cut **99 → 41 words (−59%)**, the deepest cut on the page. The old
  secondary paragraph said the same thing four times ("No surprise bills. No
  paying for promises. You see it, you approve it, then we build it."). The
  promise now lands once in prose, and its three terms move into mono chips:
  **See it first · Approve it · Then we build.** Slowing down is not the same as
  repeating yourself.
- **Exclusive mechanic.** Radial-glow centered stage.
- **RTL.** Centered — nothing repositions; pull-line already RTL.
- **Motion.** Glow blooms 0→1 (`--dur-slow`), seal scales in (`--dur-base`),
  text children stagger-fade, chips last. Reduced: static (CSS-only).

## 9 · Team — compact strip (D13 light restyle)

No mock (keep-tier).

- **Composition.** Today's four tall cards compress into a **single horizontal
  strip** on desktop: one row, four entries (initials avatar inline with
  name/role, one-line description, hairlines between) — roughly half the current
  vertical weight. Mobile: 2×2 compact grid.
- **Copy/RTL.** Content unchanged; initials stay Latin; layout flips.
- **Motion.** One fade-rise for the whole strip (no per-card stagger — it is not
  a feature section). Reduced: static.

## 10 · FAQ — new section (D8)

Proofs: `faq-{dark,light}-{1440,390}.png` (**re-rendered** — answers dieted and
Q7 added, so the proofs are no longer stale).

- **Purpose.** Clear the last objections before Contact; honest answers as a
  trust instrument.
- **Composition.** Narrow column (max 760px): label → title → one line → **seven**
  accordion rows (`--r-3`, question + chevron chip ≥56px tap target). Open item
  gets a `--gold-line` border. First item open in the proofs. No divergence at 390.
- **Exclusive mechanic.** Accordion — the page's only expand/collapse.
- **Copy — dieted, for owner edit (checklist item 11).** Answers cut **292 → 210
  words (−28%)** — the lightest cut on the page, deliberately: these answers
  *are* the section's substance, and an FAQ that answers in fragments reads
  evasive. What was cut was hedging and repetition, not content.
  1. **Who owns the code when the project is done?** You do — 100%, from
     handover. Source, repositories, infrastructure accounts and documentation
     all transfer to you. No license fee, no lock-in.
  2. **What does the process actually look like?** Three steps: a free analysis
     with a visual demo, a build you watch through a working link, then launch
     with 12 months of support. You approve each stage before it is billed.
  3. **How does the fixed price work?** We scope the whole build up front and
     commit to one price. Overruns are our cost, not yours. Changes beyond that
     scope are quoted before any work starts.
  4. **Is Arabic really first-class, or translated at the end?** First-class. We
     design right-to-left from the first wireframe — layouts, forms and payment
     flows built bilingual from day one. This site itself runs full RTL.
  5. **What happens after launch?** Twelve months included: hosting, backups,
     fixes and a direct line to the people who built it. After that, stay on a
     plan or take it in-house — it is your code either way.
  6. **Do you build native apps or web apps?** Whichever your problem actually
     needs — and we will tell you honestly. A fast web app or PWA beats native
     for many operations; native earns its cost for deep device integration or
     app-store presence.
  7. **What do you build with?** Modern, boring-on-purpose tools: React, React
     Native, Node.js, PostgreSQL, Next.js — proven stacks any competent team can
     maintain after handover, not exotic tech that locks you to us.
     *(This is where the stack tags went when they came off the §5 cards.)*
- **Placement:** between Team and Contact — **checklist item 12.**
- **RTL.** Chevron is rotation-based; rows flex with logical padding; Arabic
  answers are new `ar.ts` keys (typed `Dict` enforces parity).
- **Motion.** Accordion height animates (`--dur-base`/`--ease-hover`), chevron
  rotates (`--dur-fast`). JS-driven height → **explicit reduced-motion check:
  toggle instantly.**

## 11 · Contact — **the form is the star** (revised this pass)

Proofs: `contact-{dark,light}-{1440,390}.png` (re-rendered).

> The old composition gave equal weight to a three-step explainer and the form,
> and the explainer repeated what §7 had already said twice. The page has one
> job. The section that does that job should look like it.

- **Purpose.** The page's one job. The optimistic fake success is removed; the UI
  is designed around a real request lifecycle. The handler/backend is
  developer-owned (D5) — the design defines the contract:
  `idle → submitting → success | failure`.
- **Composition — desktop.** Two columns, **deliberately unequal (0.78fr /
  1.22fr)** — the form column is the wider and the heavier one (`--elev-3`,
  `--r-4`, the only card on the page at that elevation).
  - **Left — tightened to the bone:** label → headline → **three one-line steps**
    (numbered chips, hairline-separated). Nothing else. The old trust sentence is
    gone — it is now a receipt chip.
  - **Right — the form:** "Book your call" cap → Name/Email → Company/Phone →
    project textarea → **full-width gold CTA** → the receipt strip. Inputs ≥46px.
- **The receipt strip (new).** Under the submit, above nothing: a **dashed
  perforation** rule (it should read as a receipt tear, not another hairline),
  a mono `What happens next` cap, and three mono chips —
  **`✓ 24h response` · `✓ Free analysis` · `✓ No commitment`.** It answers the
  question every visitor has with their cursor over the button, at the exact
  moment they have it.
- **The three honest states (kept).**
  1. **Submitting** — button disabled, spinner + "Sending…", inputs inert.
  2. **Success (server-confirmed only)** — check chip + "Request received" +
     "We'll be in touch within 24 hours…" + "Send another →".
  3. **Failure** — rose-tinted inline alert: "Couldn't send. Nothing was lost —
     your message is still below." + Try again + `admin@binaalabs.com` mailto
     fallback. **Form data is never cleared on failure.**
- **Composition — mobile.** Columns stack (steps, then form); states identical.
- **Exclusive mechanic.** The state-machine form + the receipt strip — the
  page's only stateful UI and its only perforated rule.
- **Copy.** Cut **81 → 24 words (−70%)**, the deepest proportional cut on the
  page. The section header sub is gone entirely: the headline plus three
  one-liners say all of it. The Calendly line stays **out** until a real link
  exists — **checklist item 13.**
- **RTL.** Labels/inputs flip via logical properties; Latin placeholders and the
  email get `dir="ltr"` spans; receipt chips mirror; error/success blocks mirror.
- **Motion.** State transitions crossfade (`--dur-base`/`--ease-hover`). The
  spinner is **not** exempt from the kill-switch — under reduced motion it is
  replaced by a static "Sending…" label. Entrance: base fade-rise.

## 12 · Footer (keep-tier + a11y — D13)

No mock (keep-tier).

- **Composition.** Unchanged structure, retokenized. Its "Offer" link retargets
  to `#how-we-work` (§2 anchor plan). Three a11y fixes specced:
  1. **Contrast** — covered globally by the D14 `--ink-3` bumps (#8A8A84 dark /
     #616B80 light); no local override needed.
  2. **Non-color link affordance** — footer links (and the Wazen plug) get a
     persistent underline (`text-underline-offset: 3px`), not hover-only.
  3. **Brand-link aria mismatch** — remove the `aria-label="Binaa Labs home"` so
     the visible "Binaa Labs" text names the link; move `ui.aria.home` into a
     visually-hidden suffix span if disambiguation is wanted.
     (Axe rule: `label-content-name-mismatch`.)
- **Motion.** Base reveal only.

---

## 13 · Copy diet — before / after (EN body prose)

Counts are the prose a visitor actually reads per section: supporting line +
card/step/answer body. Excludes headlines (kept — they are the pitch), labels,
CTAs, and mono meta rows. Measured against the current `en.ts` + the pre-2b
mocks.

| Section | Before | After | Cut | What moved |
|---|---:|---:|---:|---|
| Hero | 33 | 17 | **−48%** | Second sentence dropped; claims already live in the proof band |
| The Gap | 43 | 16 | **−63%** | The two tinted halves *are* the argument |
| What We Build | 124 | 62 | **−50%** | Service prose → scenario headline + one build line; tags → §7/FAQ |
| Selected Work | 86 | 51 | **−41%** | Feature lists → mono meta rows (Role/Stack/Status) |
| How We Work & What You Get | 259 | 160 | **−38%** | Step paragraphs → **artifact fragments**; two section intros → one |
| Guarantee | 99 | 41 | **−59%** | Repetition cut; the three terms → mono chips |
| FAQ | 292 | 210 | **−28%** | Hedging cut, content kept (answers are the substance) |
| Contact | 81 | 24 | **−70%** | Section sub deleted; trust line → receipt chips |
| **Total** | **1017** | **581** | **−43%** | |

**AR discipline is equal, not looser.** Arabic is not exempt: the hero's Arabic
sub is cut 30 → 14 words in `hero-ar.html`, the same 48% as EN. Arabic prose
runs longer than English at equal meaning, so an undieted `ar.ts` would leave
the RTL page visibly heavier than the LTR one — the exact asymmetry D1's
"Arabic is first-class" rule exists to prevent. Every `ar.ts` string lands within
±10% of its EN counterpart's line count at implementation.

**The rule going forward:** one headline, one supporting line, and everything
else is a card, a chip, a meta row, or an artifact. If a fact can be a mono row,
it is not a sentence.

---

## 14 · Anti-uniformity table

Rule: every redesigned section owns exactly one visual mechanic and one entrance
signature; no repeats. Keep-tier sections use the shared base reveal (a single
fade-rise) by design — the base reveal is the page default, not a "mechanic."

| Section | Exclusive mechanic | Entrance motion | Repeats? |
|---|---|---|---|
| **Splash** *(page-level)* | **Closing panel wipe + gold logo line-draw** | Once-per-session intro sequence (not a scroll reveal) | — unique |
| Hero | Layered product-frame stack + gold light source | Load-time stagger fade-rise + frame settle + chip pop | — unique |
| The Gap | Adversarial tinted split-screen w/ center spine | Halves slide from opposite edges | — unique |
| What We Build | Scenario card + from→to transformation line | Base reveal + one sequenced line emphasis | — unique |
| Selected Work | Alternating case panels + **silent video loop** | Visual slides from alternating side | — unique |
| **How We Work & What You Get** | **Artifact-bearing journey rail → sticky proposal card** | Connector line draw + node pops + artifact settle | — unique *(absorbs both retired mechanics)* |
| Guarantee | Radial-glow centered stage | Glow bloom + seal scale + chips last | — unique |
| Team (keep) | — (compact strip, no mechanic) | Base reveal (single row) | — n/a |
| FAQ | Accordion expand/collapse | Base reveal; accordion is interaction | — unique |
| Contact | State-machine form + **perforated receipt strip** | Base reveal; state crossfades are interaction | — unique |
| Nav/Footer (keep) | — | n/a / base reveal | — n/a |

**Zero duplicates. Two adjacencies flagged, both deliberate:**

- ⚠ **Line-draw ×2.** The splash draws the **logo mark**; §7's rail draws a
  **connector rule**. Different objects, different purposes — and the splash is a
  page-level overlay seen once per session, not a section competing for identity
  in the scroll. The rail remains **the only line-draw inside the page.** If the
  owner reads them as the same trick, the splash keeps the draw (it is the whole
  point of it) and §7's connector becomes a static rule with node pops only.
  **Checklist item 14.**
- ⚠ **Gold ambience ×3.** Splash (glow around the drawn cube), hero
  (`--hero-light`, directional, dark only), guarantee (`--glow-radial`, centered
  stage). Three different geometries; all gold. **Checklist item 15.**

## 15 · Motion inventory

All in-page durations/easings are tokens; "RM" = reduced-motion behavior.
Layer 1 (CSS kill-switch) covers everything; the RM column lists the explicit
layer-2 (`matchMedia`) handling wherever JS drives the effect.

| Element | Trigger | Duration / easing | RM behavior |
|---|---|---|---|
| **Splash — panels close** | load (first view of session) | `--spl-close-dur` 400ms / `--ease-enter` | **splash never renders (CSS + JS both)** |
| **Splash — hex line-draw** | +400ms | `--spl-hex-dur` 900ms / `--ease-hover` | n/a (splash absent) |
| **Splash — inner-Y line-draw** | +1000ms | `--spl-inner-dur` 750ms / `--ease-hover` | n/a |
| **Splash — node pops (×3)** | +1450ms, 110ms stagger | `--dur-base` / `--ease-enter` | n/a |
| **Splash — text fade-up (×3)** | +1900ms, 120ms stagger | `--spl-text-dur` 600ms / `--ease-enter` | n/a |
| **Splash — hold** | ~2740ms | ~360ms, no motion | n/a |
| **Splash — panels part + lockup dissolve** | +3100ms | `--spl-exit-dur` 600ms / `--ease-hover` | n/a |
| **Splash — skip affordance** | +1000ms | `--dur-base` / `--ease-enter` | n/a |
| Nav progress bar | scroll | transform, continuous | static |
| Nav mobile sheet | tap | `--dur-base` / `--ease-enter` | instant toggle |
| Hero copy children | load | `--dur-slow` / `--ease-enter`, 60ms stagger | static final state |
| Hero frame stack | load (+150ms) | `--dur-slow` / `--ease-enter` | static |
| Hero floating chip | load (last) | `--dur-base` / `--ease-enter` | static |
| Hero proof-band count-up | in-view | `--dur-slow`, JS | **matchMedia: set values instantly** |
| Gap halves | in-view | `--dur-slow` / `--ease-enter`, ±24px | static |
| Gap spine node | in-view (+200ms) | `--dur-base` / `--ease-enter` | static |
| Build cards | in-view | base reveal | static |
| Build from→to line | card reveal | ~1.5× `--dur-base` / `--ease-enter`, once | **skipped — line renders final** |
| Case-panel visuals | in-view | `--dur-slow` / `--ease-enter`, ±32px alternating | static |
| **Work video loop** | in-view | continuous, 20–30s loop | **matchMedia: never autoplays; poster held** |
| **Rail connector draw** | in-view | `--dur-slow` / `--ease-enter`, JS/SVG | **matchMedia: pre-drawn** |
| **Rail node pops** | draw progress | `--dur-base` / `--ease-enter` | static |
| **Rail artifact settle** | after its node | `--dur-base` / `--ease-enter`, fade + 8px | static |
| Guarantee glow bloom | in-view | `--dur-slow`, opacity | static (CSS-only) |
| Guarantee seal + term chips | in-view | `--dur-base` / `--ease-enter` | static |
| FAQ accordion | tap | `--dur-base` / `--ease-hover`, JS height | **matchMedia: instant toggle** |
| FAQ chevron | tap | `--dur-fast` / `--ease-hover` | instant |
| Contact state swap | submit lifecycle | `--dur-base` / `--ease-hover` crossfade | instant swap |
| Contact spinner | submitting | continuous rotate | **replaced by static label** |
| Base reveal (defaults) | in-view | `--dur-base` / `--ease-enter`, fade-rise 12px | static |

---

## 16 · OWNER DECISION CHECKLIST

Answer each with the number + a word (or a short ruling). Items marked ⚠ are
flagged conflicts/risks, not preferences.

**Splash**

1. **Splash tagline wording** — the one piece of splash copy with no source.
   Pick one, or write your own:
   (a) **Software Studio · Dubai** *(as mocked)* · (b) **We build the systems
   your business runs on** · (c) **Custom software. Built in Dubai. Owned by
   you.** · (d) no tagline — mark + name only.
   (a / b / c / d / own-words)
2. **Splash choreography** — ship the panel version (`splash.html`, 3.7s, the
   storyboard as specified), or the alternate "reveal from the mark"
   (`splash-alt.html`, 3.0s, cheaper on LCP — §1.6)? Recommendation: **panels**,
   with the alt held as the fallback if LCP measures badly.
   (panels / alt)

**What We Build**

3. **Scenario card copy** — approve the four scenarios as worded in §5 (headline
   + build line + from→to, EN with Arabic direction)? Edits welcome inline.
   (yes / edits)

**Selected Work**

4. **Video loop shot list** — what should the 20–30s Wazen capture show?
   Proposed, in loop order (seeded demo data only, no real client information):
   1. Coach dashboard — KPI tiles + weekly check-in chart *(~3s)*
   2. Open a client → their plan, with templates attached *(~5s)*
   3. A check-in lands; the client's status flips to "Checked in" *(~4s)*
   4. Attach a reusable template to a client and tweak one field *(~6s)*
   5. Progress analytics view *(~4s)*
   6. Return to the dashboard — loop point matches frame 1 *(~2s)*
   (approve / reorder / different-shots)

**Structure**

5. **Nav link set** — the merge frees a slot. Which four anchors does the desktop
   nav show? Proposed: **The Gap · What We Build · Selected Work · How We Work**
   (Guarantee drops out of the nav; it still exists on the page and in the
   footer). Alternative: keep Our Guarantee and drop The Gap.
   (proposed / keep-guarantee / other)
6. **Hero proof-band final set** — directive set is 100% · AR+EN · 2 wks · 24h,
   which **drops the current "1:1 direct with builders" stat**. Keep directive
   set, or swap 24h→1:1? (directive / swap)
7. ⚠ **Hero floating chip metric** — "96% check-in rate" is a **placeholder**.
   D1 forbids fabricated proof: supply a real Wazen metric at the asset pass, or
   drop the chip? (real-metric / drop)
8. **Case-panel Role rows** — as mocked (Wazen "Product · Design · Build";
   Almani "Design · Build · Launch")? (yes / edit)
9. **Case-panel order** — Wazen first (own product, strongest visual) or Almani
   first (client work reads less self-referential)? (wazen / almani)
10. **Merged-section ordering** — rail (3 steps + artifacts) → deliverables →
    sticky proposal card, as mocked? Or proposal card first (price up front,
    process after)? (as-mocked / price-first)

**Copy**

11. **FAQ copy** — approve the seven dieted Q&As (§10)? Edits welcome inline.
    (yes / edits)
12. **FAQ placement** — between Team and Contact (as proposed), or before Team?
    (after-team / before-team)
13. **Calendly line** — the mock omits the dead "book directly" link until a real
    Calendly exists. Confirm omission? (omit / keep-dead)

**Flagged adjacencies**

14. ⚠ **Line-draw ×2** — splash draws the logo mark; §7's rail draws a connector.
    Distinct objects, and the splash is page-level, not a section. Keep both, or
    make §7's connector static (node pops only)? (both / static-rail)
15. ⚠ **Gold ambience ×3** — splash cube glow · hero directional light (dark) ·
    guarantee radial glow. Distinct geometries, all gold. Keep all three, or drop
    the hero's to elevation-only in dark? (all-three / hero-plain)

**Keep-tier**

16. **Team strip** — approve the compact-strip direction without a mock, or
    require a render gate before implementation? (approve / render-first)

---

## 17 · Implementation dependencies (new — surfaced by this pass)

Not owner decisions; blockers the implementation passes inherit.

| # | Dependency | Blocks | Notes |
|---|---|---|---|
| 1 | **Logo asset** (`trace.svg` → de-traced, background stripped, dual-color) | Splash line-draw fidelity | Splash currently draws `app/icon.svg`'s path as a stand-in. Lands in the D14 asset pass; swapping it is a path-data change, not a rework. |
| 2 | **Video-loop component**, ported from the **Wazen landing repo** | §6 Work section | First-party code port — **not** a new library, so no D-row needed. Must bring: lazy IntersectionObserver mount, poster, reduced-motion guard. |
| 3 | **Wazen screen capture** (20–30s, silent, seeded demo data) | §6 video slot | Shot list = checklist item 4. **No real client data in the recording.** |
| 4 | **Almani real frames** (D7) | §6 Almani panel | Until then the schematic ships, dashed-bordered and labelled. |
| 5 | **Real Wazen metric** for the hero chip | §3 hero | Or the chip is dropped (checklist item 7). D1 forbids the placeholder shipping. |
| 6 | **LCP measurement on the Vercel preview** | Splash go/no-go | §1.3. If it regresses past budget, apply the §1.3 fallbacks in order. |

---

*Leftover processes: none — renders use `file://` URLs; the Playwright browser
closes in a `finally` block and exits with the script. `render-stage2.mjs`
(sections) and `render-splash.mjs` (filmstrip + reduced-motion proof) both
terminate; no dev server is started and none is left listening.*
