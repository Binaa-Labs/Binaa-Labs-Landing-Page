"use client";

import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScenarioIcon } from "@/components/ui/icons";

// Scenario cards: the world after we build it. Illustrations of capability,
// never delivery claims (D1) — the only delivered work named on the page is
// in Selected Work. No stack tags, no category titles (those live in the
// merged section's Disciplines line and FAQ Q7).
export default function WhatWeBuild() {
  const { t } = useSite();
  const w = t.whatWeBuild;

  return (
    <section id="build" className="section bg">
      <div className="wrap">
        <SectionLabel>{w.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {w.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {w.subtext}
        </p>

        <div className="scn-grid">
          {w.cards.map((c, i) => (
            <article className="scn-card" data-reveal="" key={i}>
              <span className="scn-idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="scn-chip">
                <ScenarioIcon i={i} />
              </span>
              <h3 className="scn-head">{c.headline}</h3>
              <p className="scn-build">{c.build}</p>
              <p className="fromto">
                <span className="from">{c.from}</span>
                <span className="arr" aria-hidden="true">
                  →
                </span>
                <span className="to">{c.to}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
