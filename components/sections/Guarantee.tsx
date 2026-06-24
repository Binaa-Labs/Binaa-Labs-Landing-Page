"use client";

import { useSite } from "@/components/Providers";

export default function Guarantee() {
  const { t } = useSite();
  const g = t.guarantee;

  return (
    <section id="our-guarantee" className="guarantee-sec">
      <div className="guarantee-glow" aria-hidden="true" />
      <div className="guarantee-inner">
        <div className="guarantee-badge-wrap" data-reveal="">
          <span className="guarantee-badge">
            <span className="guarantee-ping" aria-hidden="true" />
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12l2.5 2.5L16 9" />
            </svg>
          </span>
        </div>
        <p className="guarantee-label" data-reveal="" data-reveal-delay="40">
          {g.label}
        </p>
        <h2 className="guarantee-title" data-reveal="" data-reveal-delay="80">
          {g.headline}
        </h2>
        <p className="guarantee-arabic" data-reveal="" data-reveal-delay="120">
          {g.arabicSubline}
        </p>
        <p className="guarantee-body" data-reveal="" data-reveal-delay="160">
          {g.body}
        </p>
        <p className="guarantee-secondary" data-reveal="" data-reveal-delay="200">
          {g.secondary}
        </p>
        <div className="guarantee-sign" data-reveal="" data-reveal-delay="240">
          <p className="guarantee-sign-name">{g.signName}</p>
          <p className="guarantee-sign-role">
            {g.signRole} · {g.signOrg}
          </p>
        </div>
      </div>
    </section>
  );
}
