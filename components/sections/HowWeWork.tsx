"use client";

import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";

function BranchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 3v13a3 3 0 0 0 3 3h9"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="6"
        cy="4"
        r="2"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
      />
      <circle
        cx="18"
        cy="19"
        r="2"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
      />
    </svg>
  );
}

// Merged "How We Work & What You Get" (Process + Offer, STAGE2-DESIGN §7):
// the journey rail is the spine, the artifact fragments are its receipts,
// and the deliverables feed the sticky proposal card.
export default function HowWeWork() {
  const { t } = useSite();
  const h = t.howWeWork;
  const [s1, s2, s3] = h.steps;

  return (
    <section id="how-we-work" className="section bg-2 bt">
      {/* alias for retired deep links (footer/nav used to point at #offer) */}
      <span id="offer" className="anchor-alias" aria-hidden="true" />
      <div className="wrap">
        <SectionLabel>{h.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {h.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {h.subtext}
        </p>

        {/* the journey rail: connector draw + node pops + artifact settles
            are CSS transitions keyed off this wrapper's [data-revealed] */}
        <div className="journey" data-reveal="hold">
          <div className="jstep">
            <span className="jnode">{s1.num}</span>
            <h3 className="jtitle">{s1.title}</h3>
            <p className="jline">{s1.line}</p>
            <div className="artifact">
              <span className="art-cap">{h.youReceive}</span>
              <div className="quote-doc">
                <div className="qh">
                  <span>{h.quoteDoc.title}</span>
                  <span dir="ltr">{h.quoteDoc.version}</span>
                </div>
                {h.quoteDoc.rows.map((r, i) => (
                  <div className="qr" key={i}>
                    <span>{r.item}</span>
                    <span>{r.included}</span>
                  </div>
                ))}
                <div className="qt">
                  <span>{h.quoteDoc.totalLabel}</span>
                  <b>{h.quoteDoc.totalValue}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="jstep">
            <span className="jnode">{s2.num}</span>
            <h3 className="jtitle">{s2.title}</h3>
            <p className="jline">{s2.line}</p>
            <div className="artifact">
              <span className="art-cap">{h.youReceive}</span>
              <div className="demo-chip">
                <span className="demo-lock" aria-hidden="true">
                  ⌁
                </span>
                <span className="demo-url">{h.demo.url}</span>
                <span className="live-pill">{h.demo.live}</span>
              </div>
              <div className="demo-meta">
                <span>{h.demo.meta1}</span>
                <span>{h.demo.meta2}</span>
              </div>
            </div>
          </div>

          <div className="jstep">
            <span className="jnode">{s3.num}</span>
            <h3 className="jtitle">{s3.title}</h3>
            <p className="jline">{s3.line}</p>
            <div className="artifact">
              <span className="art-cap">{h.youReceive}</span>
              <div className="repo">
                <div className="repo-top">
                  <BranchIcon />
                  <span className="repo-name">{h.repo.name}</span>
                  <span className="repo-owner">{h.repo.owner}</span>
                </div>
                <div className="repo-rows">
                  {h.repo.rows.map((row, i) => (
                    <div className="repo-row" key={i}>
                      <b>{row}</b>
                      <span className="ok">{h.repo.done}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* what you get: deliverables + the sticky fixed-price proposal */}
        <div className="getgrid">
          <div data-reveal="">
            <h3 className="get-head">{h.deliverablesHead}</h3>
            {h.deliverables.map((d, i) => (
              <div className="del" key={i}>
                <span className="dn">{d.num}</span>
                <div>
                  <b>{d.title}</b>
                  <p>{d.line}</p>
                </div>
              </div>
            ))}
            <p className="disciplines">
              {h.disciplinesLabel}: <b>{h.disciplines}</b>
            </p>
          </div>

          <aside className="proposal" data-reveal="" data-reveal-delay="120">
            <span className="prop-label">{h.proposal.label}</span>
            <h3 className="prop-title">{h.proposal.title}</h3>
            <p className="prop-intro">{h.proposal.intro}</p>
            <ul className="checks">
              {h.proposal.checks.map((c, i) => (
                <li key={i}>
                  <span className="ck" aria-hidden="true">
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="freebox">
              <span className="fl">{h.proposal.freeLabel}</span>
              <p>{h.proposal.freeText}</p>
            </div>
            <a
              href="#contact"
              data-magnetic=""
              className="btn-primary block prop-cta"
            >
              {h.proposal.cta}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
