"use client";

import React from "react";
import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import CaseVideo from "@/components/sections/CaseVideo";
import { WAZEN_LOOP_SRC } from "@/lib/work-video";

const revealX = { "--reveal-x": "32px" } as React.CSSProperties;

// Two case panels — the page's proof section. Carousel retired; no third
// panel, no "coming soon". Frame interiors are LTR product schematics.
export default function SelectedWork() {
  const { t } = useSite();
  const sw = t.selectedWork;
  const wz = sw.wazen;
  const al = sw.almani;
  const wf = sw.wazenFrame;
  const af = sw.almaniFrame;

  return (
    <section id="work" className="section bg-2 bt">
      <div className="wrap">
        <SectionLabel>{sw.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {sw.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {sw.subtext}
        </p>

        <div className="work-panels">
          {/* ── Panel 1 · Wazen — copy start / video slot end ── */}
          <article className="work-panel">
            <div className="panel-copy" data-reveal="">
              <span className="case-badge">{wz.badge}</span>
              <h3 className="case-name">{wz.name}</h3>
              <p className="case-cat">{wz.cat}</p>
              <p className="case-desc">{wz.description}</p>
              <dl className="case-meta">
                <div className="pair">
                  <dt>{sw.meta.role}</dt>
                  <dd dir="ltr">{wz.role}</dd>
                </div>
                <div className="pair">
                  <dt>{sw.meta.stack}</dt>
                  <dd dir="ltr">{wz.stack}</dd>
                </div>
                <div className="pair">
                  <dt>{sw.meta.status}</dt>
                  <dd dir="ltr">{wz.status}</dd>
                </div>
              </dl>
              <a
                className="case-link"
                href={`https://${wz.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {wz.linkLabel}{" "}
                <span className="ext" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div
              className="panel-visual"
              data-reveal="from-end"
              style={revealX}
              aria-hidden="true"
              dir="ltr"
            >
              <CaseVideo src={WAZEN_LOOP_SRC}>
                <div className="frame">
                  <div className="frame-bar">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <span className="frame-url">{wf.url}</span>
                  </div>
                  {/* poster = the dense coach-dashboard schematic; the real
                      capture replaces it via lib/work-video.ts at asset pass */}
                  <div className="ui">
                    <div className="ui-side">
                      <span className="ui-brand">{wf.brand}</span>
                      {wf.nav.map((n, i) => (
                        <span key={i} className={"ui-nav" + (i === 0 ? " on" : "")}>
                          {n}
                        </span>
                      ))}
                    </div>
                    <div className="ui-main">
                      <div className="ui-head">
                        <span className="ui-h1">{wf.title}</span>
                        <span className="ui-sub">{wf.period}</span>
                      </div>
                      <div className="kpis">
                        {wf.kpis.map((k, i) => (
                          <div className="kpi" key={i}>
                            <b>{k.value}</b>
                            <span>{k.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="chart">
                        <div className="chart-cap">
                          <span>{wf.chartCap}</span>
                          <span>{wf.chartVal}</span>
                        </div>
                        <div className="bars">
                          {wf.chartBars.map((hgt, i) => (
                            <i
                              key={i}
                              className={hgt >= 96 ? "hi" : undefined}
                              style={{ height: `${hgt}%` }}
                            />
                          ))}
                        </div>
                        <div className="axis">
                          {wf.chartAxis.map((a, i) => (
                            <span key={i}>{a}</span>
                          ))}
                        </div>
                      </div>
                      <div className="tbl">
                        <div className="tr th">
                          {wf.tableHead.map((th, i) => (
                            <span key={i}>{th}</span>
                          ))}
                        </div>
                        {wf.tableRows.map((r, i) => (
                          <div className="tr" key={i}>
                            <span>{r.a}</span>
                            <span>{r.b}</span>
                            <span className={"pill" + (r.muted ? " mut" : "")}>
                              {r.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CaseVideo>
              {WAZEN_LOOP_SRC && <span className="loop-chip">{sw.loopChip}</span>}
            </div>
          </article>

          {/* ── Panel 2 · Almani — visual start / copy end (alternated) ──
              The frame is a SCHEMATIC, dashed-bordered so it can never be
              mistaken for a screenshot; real frames land at the asset pass
              (D7). No coming-soon copy anywhere. */}
          <article className="work-panel alt">
            <div className="panel-copy" data-reveal="">
              <span className="case-badge">{al.badge}</span>
              <h3 className="case-name">{al.name}</h3>
              <p className="case-cat">{al.cat}</p>
              <p className="case-desc">{al.description}</p>
              <dl className="case-meta">
                <div className="pair">
                  <dt>{sw.meta.role}</dt>
                  <dd dir="ltr">{al.role}</dd>
                </div>
                <div className="pair">
                  <dt>{sw.meta.stack}</dt>
                  <dd dir="ltr">{al.stack}</dd>
                </div>
                <div className="pair">
                  <dt>{sw.meta.status}</dt>
                  <dd dir="ltr">{al.status}</dd>
                </div>
              </dl>
            </div>

            <div
              className="panel-visual"
              data-reveal="from-start"
              style={revealX}
              aria-hidden="true"
              dir="ltr"
            >
              <div className="frame dashed">
                <div className="frame-bar">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="frame-url">{af.url}</span>
                </div>
                <div className="ui">
                  <div className="ui-side">
                    <span className="ui-brand">{af.brand}</span>
                    {af.nav.map((n, i) => (
                      <span key={i} className={"ui-nav" + (i === 0 ? " on" : "")}>
                        {n}
                      </span>
                    ))}
                  </div>
                  <div className="ui-main">
                    <div className="ui-head">
                      <span className="ui-h1">{af.title}</span>
                      <span className="ui-sub">{af.period}</span>
                    </div>
                    <div className="filters">
                      {af.filters.map((f, i) => (
                        <span key={i} className={f.on ? "on" : undefined}>
                          {f.label}
                        </span>
                      ))}
                    </div>
                    <div className="cat-grid">
                      {af.parts.map((p, i) => (
                        <div className="part" key={i}>
                          <div className="part-img">
                            <PartGlyph i={i} />
                          </div>
                          <span className="part-name">{p.name}</span>
                          <div className="part-foot">
                            <span className="part-price">{p.price}</span>
                            <span className={"pill" + (p.muted ? " mut" : "")}>
                              {p.pill}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tbl">
                      <div className="tr th">
                        {af.tableHead.map((th, i) => (
                          <span key={i}>{th}</span>
                        ))}
                      </div>
                      {af.tableRows.map((r, i) => (
                        <div className="tr" key={i}>
                          <span>{r.a}</span>
                          <span>{r.b}</span>
                          <span className={"pill" + (r.muted ? " mut" : "")}>
                            {r.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

// schematic part thumbnails (brake disc / alternator / oil filter)
function PartGlyph({ i }: { i: number }) {
  if (i === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.5" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" />
      </svg>
    );
  }
  if (i === 1) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="7" width="14" height="10" rx="2" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" />
        <path d="M9 7V5h6v2M8 17v2M16 17v2" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 15V9l4-2 4 2v6l-4 2z" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 11h4M16 9v4" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
