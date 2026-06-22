"use client";

import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";

export default function HowItWorks() {
  const { t } = useSite();
  const h = t.howItWorks;

  return (
    <section className="section bg-2 bt">
      <div className="wrap">
        <SectionLabel>{h.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {h.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {h.subtext}
        </p>

        <div className="grid-3">
          {h.steps.map((s, i) => (
            <div className="step-card" data-reveal="" key={i}>
              <span className="step-num">{s.number}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
