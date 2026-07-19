"use client";

import { useSite } from "@/components/Providers";

// Risk reversal as a signed promise — the page's only centered radial glow.
export default function Guarantee() {
  const { t } = useSite();
  const g = t.guarantee;

  return (
    <section id="guarantee" className="guarantee-sec">
      <div className="guarantee-glow" data-reveal="fade" aria-hidden="true" />
      <div className="guarantee-inner">
        <span className="seal" data-reveal="" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <p className="guarantee-label" data-reveal="" data-reveal-delay="40">
          {g.label}
        </p>
        <h2
          className="section-title guarantee-title"
          data-reveal=""
          data-reveal-delay="80"
        >
          {g.headline}
        </h2>
        <p className="guarantee-ar" data-reveal="" data-reveal-delay="120">
          {g.arabicSubline}
        </p>
        <p className="guarantee-body" data-reveal="" data-reveal-delay="160">
          {g.body}
        </p>
        <p
          className="guarantee-secondary"
          data-reveal=""
          data-reveal-delay="200"
        >
          {g.secondary}
        </p>
        <ul className="terms" data-reveal="" data-reveal-delay="240">
          {g.terms.map((term, i) => (
            <li key={i}>{term}</li>
          ))}
        </ul>
        <div className="sig" data-reveal="" data-reveal-delay="280">
          <b>{g.signName}</b>
          <span>
            {g.signRole} · {g.signOrg}
          </span>
        </div>
      </div>
    </section>
  );
}
