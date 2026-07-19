"use client";

import { useState } from "react";
import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";

// FAQ (D8) — the page's only accordion. The height animation is pure CSS
// (grid-template-rows 0fr→1fr), so the reduced-motion kill-switch makes the
// toggle instant with no extra JS.
export default function Faq() {
  const { t } = useSite();
  const f = t.faq;
  const [open, setOpen] = useState<boolean[]>(() =>
    f.items.map((_, i) => i === 0)
  );

  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="faq" className="section bg-2 bt">
      <div className="wrap">
        <SectionLabel>{f.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {f.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {f.subtext}
        </p>

        <div className="faq-list" data-reveal="">
          {f.items.map((item, i) => (
            <div className={"qa" + (open[i] ? " open" : "")} key={i}>
              <button
                type="button"
                className="qa-q"
                aria-expanded={open[i]}
                aria-controls={`faq-a-${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="chev" aria-hidden="true">
                  ▾
                </span>
              </button>
              <div className="qa-a" id={`faq-a-${i}`} aria-hidden={!open[i]}>
                <div className="qa-a-inner">
                  <p className="qa-p">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
