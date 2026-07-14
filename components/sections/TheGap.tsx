"use client";

import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";

function XMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

export default function TheGap() {
  const { t } = useSite();
  const g = t.theGap;

  return (
    <section id="gap" className="section bg-2 bt">
      <div className="wrap">
        <SectionLabel>{g.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {g.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {g.subtext}
        </p>

        {/* adversarial split-screen: rose half vs gold half, center spine */}
        <div className="gap-split">
          <div className="gap-half usual" data-reveal="from-start">
            <div className="half-title">
              <h3>{g.usual.title}</h3>
              <span className="side-tag">{g.usual.tag}</span>
            </div>
            {g.usual.items.map((it, i) => (
              <div className="gap-item" key={i}>
                <span className="gap-ico">
                  <XMark />
                </span>
                <div>
                  <b>{it.title}</b>
                  <p>{it.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gap-spine">
            <span className="spine-node" data-reveal="fade" data-reveal-delay="200">
              {g.spineLabel}
            </span>
          </div>

          <div className="gap-half studio" data-reveal="from-end">
            <div className="half-title">
              <h3>{g.studio.title}</h3>
              <span className="side-tag">{g.studio.tag}</span>
            </div>
            {g.studio.items.map((it, i) => (
              <div className="gap-item" key={i}>
                <span className="gap-ico">
                  <CheckMark />
                </span>
                <div>
                  <b>{it.title}</b>
                  <p>{it.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
