"use client";

import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";
import { BuildIcon } from "./icons";

export default function WhatWeBuild() {
  const { t } = useSite();
  const w = t.whatWeBuild;

  return (
    <section id="what-we-build" className="section bg-2 bt">
      <div className="wrap">
        <SectionLabel>{w.label}</SectionLabel>
        <h2 className="section-title mw-18" data-reveal="" data-reveal-delay="60">
          {w.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {w.subtext}
        </p>

        <div className="grid-2">
          {w.cards.map((c, i) => (
            <div className="build-card" data-reveal="" key={i}>
              <span className="build-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="build-icon">
                <BuildIcon i={i} />
              </span>
              <h3 className="card-title">{c.title}</h3>
              <p className="card-desc">{c.description}</p>
              <div className="build-foot">
                <div className="build-foot-divider" />
                <div className="stack-row">
                  <span className="stack-label">{t.ui.stack}</span>
                  {c.tags.map((tag, j) => (
                    <span className="stack-tag" key={j}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
