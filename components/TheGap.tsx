"use client";

import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";

function XMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

export default function TheGap() {
  const { t } = useSite();
  const g = t.theGap;
  return (
    <section id="the-gap" className="section bg">
      <div className="wrap">
        <SectionLabel>{g.label}</SectionLabel>
        <h2 className="section-title mw-18" data-reveal="" data-reveal-delay="60">
          {g.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {g.subtext}
        </p>

        <div className="gap-grid">
          <div className="gap-card" data-reveal="">
            <h3 className="gap-title">{g.usualOption.title}</h3>
            <div className="gap-divider" />
            <ul className="gap-list">
              {g.usualOption.items.map((it, i) => (
                <li className="gap-item" key={i}>
                  <span className="gap-mark bad">
                    <XMark />
                  </span>
                  <div>
                    <p className="gap-item-title">{it.title}</p>
                    <p className="gap-item-desc">{it.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="gap-card studio" data-reveal="" data-reveal-delay="120">
            <div className="gap-head">
              <h3 className="gap-title">{g.studioModel.title}</h3>
              <span className="gap-badge">{g.studioModel.badge}</span>
            </div>
            <div className="gap-divider" />
            <ul className="gap-list">
              {g.studioModel.items.map((it, i) => (
                <li className="gap-item" key={i}>
                  <span className="gap-mark good">
                    <CheckMark />
                  </span>
                  <div>
                    <p className="gap-item-title">{it.title}</p>
                    <p className="gap-item-desc">{it.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
