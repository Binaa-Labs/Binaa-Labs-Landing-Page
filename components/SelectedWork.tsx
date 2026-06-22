"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";

export default function SelectedWork() {
  const { t, lang } = useSite();
  const sw = t.selectedWork;
  const carousel = t.ui.carousel;
  const projects = sw.projects;
  const n = projects.length;

  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<number | null>(null);

  const clamped = Math.max(0, Math.min(index, n - 1));

  // position the track (RTL slides move the opposite way)
  useEffect(() => {
    const tr = trackRef.current;
    if (!tr) return;
    const rtl = lang === "ar";
    tr.style.transform = `translateX(${rtl ? "" : "-"}${clamped * 100}%)`;
  }, [clamped, lang]);

  const stop = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };
  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    autoRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % n),
      5000
    );
  };

  // autoplay (cleared on unmount)
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const go = (i: number) => {
    setIndex(i);
    start();
  };
  const next = () => {
    setIndex((i) => (i + 1) % n);
    start();
  };
  const prev = () => {
    setIndex((i) => (i - 1 + n) % n);
    start();
  };
  const status = carousel.status
    .replace("{current}", String(clamped + 1))
    .replace("{total}", String(n));

  return (
    <section id="selected-work" className="section bg">
      <div className="wrap">
        <SectionLabel>{sw.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {sw.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {sw.subtext}
        </p>

        <div
          className="work-wrap"
          data-reveal=""
          role="region"
          aria-roledescription="carousel"
          aria-label={carousel.region}
          onMouseEnter={stop}
          onMouseLeave={start}
          onFocus={stop}
          onBlur={start}
        >
          <div className="work-viewport">
            <div className="work-track" ref={trackRef} aria-live="polite">
              {projects.map((p, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div
                    className="work-slide"
                    key={i}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={carousel.status
                      .replace("{current}", String(i + 1))
                      .replace("{total}", String(n))}
                    aria-hidden={i !== clamped}
                  >
                    <div className="slide-grid">
                      <div className="slide-text">
                        <div className="slide-meta">
                          <span className="slide-cat">{p.cat}</span>
                          {p.badge && (
                            <span className="slide-badge">
                              <span className="slide-badge-dot" />
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="slide-title">{p.name}</h3>
                        <p className="slide-desc">{p.description}</p>
                        {p.link && (
                          <a
                            className="slide-link"
                            href={`https://${p.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={i === clamped ? undefined : -1}
                          >
                            {p.link} <span aria-hidden="true" style={{display:'inline-block', transform: `scaleX(var(--arrowflip, 1))`}}>↗</span>
                          </a>
                        )}
                      </div>
                      <div className="slide-preview">
                        <div className="slide-preview-grid" aria-hidden="true" />
                        <span className="slide-ghost" aria-hidden="true">
                          {num}
                        </span>
                        <span className="slide-tag">[ {p.name} ]</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="work-controls">
            <div className="work-dots">
              {projects.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={"work-dot" + (i === clamped ? " active" : "")}
                  aria-label={`${carousel.goToProject} ${i + 1}`}
                  aria-current={i === clamped ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <div className="work-arrows">
              <button
                type="button"
                className="work-arrow"
                aria-label={carousel.previous}
                onClick={prev}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="work-arrow"
                aria-label={carousel.next}
                onClick={next}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}
