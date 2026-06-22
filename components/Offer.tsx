"use client";

import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";

function CheckMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

export default function Offer() {
  const { t } = useSite();
  const o = t.offer;

  return (
    <section id="offer" className="section bg">
      <div className="wrap">
        <SectionLabel>{o.label}</SectionLabel>
        <h2 className="section-title mw-20" data-reveal="" data-reveal-delay="60">
          {o.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {o.subtext}
        </p>

        <div className="offer-grid">
          <ul className="deliverables">
            {o.deliverables.map((d, i) => (
              <li className="deliverable" data-reveal="" key={i}>
                <span className="deliverable-num">{d.number}</span>
                <div>
                  <h3 className="deliverable-title">{d.title}</h3>
                  <p className="deliverable-desc">{d.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="offer-proposal">
            <div className="proposal-card" data-reveal="">
              <p className="proposal-label">{o.proposal.label}</p>
              <h3 className="proposal-title">{o.proposal.title}</h3>
              <p className="proposal-intro">{o.proposal.intro}</p>
              <ul className="proposal-checks">
                {o.proposal.checks.map((c, i) => (
                  <li className="proposal-check" key={i}>
                    <CheckMark />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="proposal-free">
                <p className="proposal-free-label">{o.proposal.freeBox.label}</p>
                <p className="proposal-free-text">{o.proposal.freeBox.text}</p>
              </div>
              <a
                href="#contact"
                data-magnetic=""
                className="btn-primary block proposal-cta"
              >
                {o.proposal.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
