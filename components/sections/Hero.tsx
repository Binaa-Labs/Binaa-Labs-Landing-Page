"use client";

import { useSite } from "@/components/Providers";

export default function Hero() {
  const { t } = useSite();
  const h = t.hero;

  // highlight terms come from the dictionary (both locales) — never
  // hard-coded here (PROJECT.md §6 violation, fixed this pass)
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(${h.highlights.map(escapeRegex).join("|")})`,
    "g"
  );
  const parts = h.headline.split(pattern).filter(Boolean);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-badge" data-reveal="">
            <span className="badge-dot" aria-hidden="true" />
            {h.badgeLocation}
          </p>

          <h1 className="hero-title" data-reveal="" data-reveal-delay="60">
            {parts.map((p, i) =>
              h.highlights.includes(p) ? (
                <em key={i}>{p}</em>
              ) : (
                <span key={i}>{p}</span>
              )
            )}
          </h1>

          <p className="hero-sub" data-reveal="" data-reveal-delay="120">
            {h.subtext}
          </p>

          <div className="hero-ctas" data-reveal="" data-reveal-delay="180">
            <a href="#contact" data-magnetic="" className="btn-primary">
              {h.ctaPrimary}
            </a>
            <a href="#work" className="btn-ghost">
              {h.ctaSecondary}
            </a>
          </div>

          {/* mobile-only trust strip: no data-reveal, always visible at
              first paint (part of the 3-second message, not the scroll
              reveal system). Hidden ≥920px where the full proof band below
              already carries these signals. */}
          <p className="hero-mobile-proof">{h.mobileProof}</p>

          <div className="proof-band" data-reveal="" data-reveal-delay="240">
            {h.proof.map((p, i) => (
              <div className="proof" key={i}>
                <b data-count={p.value}>{p.value}</b>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Layered frame stack — a product schematic at the fidelity floor.
            At the asset pass, a real capture replaces the .app schematic
            inside the same .frame (an <img> or <video> slots straight in). */}
        <div
          className="hero-stack"
          data-reveal=""
          data-reveal-delay="150"
          aria-hidden="true"
          dir="ltr"
        >
          <div className="frame">
            <div className="frame-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="frame-url">{h.frame.url}</span>
            </div>
            <div className="app">
              <div className="app-side">
                {h.frame.nav.map((n, i) => (
                  <span
                    key={i}
                    className={"app-nav" + (n === h.frame.navActive ? " on" : "")}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <div className="app-main">
                <div className="app-head">
                  <span className="app-title">{h.frame.title}</span>
                  <span className="app-date">{h.frame.period}</span>
                </div>
                <div className="tiles">
                  {h.frame.tiles.map((tile, i) => (
                    <div className="tile" key={i}>
                      <b>{tile.value}</b>
                      <span>{tile.label}</span>
                    </div>
                  ))}
                </div>
                <div className="rows">
                  {h.frame.rows.map((r, i) => (
                    <div className="rowi" key={i}>
                      <span>{r.name}</span>
                      <span className={"st" + (r.muted ? " mut" : "")}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
