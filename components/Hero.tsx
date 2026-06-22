"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSite } from "./Providers";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const { t, lang } = useSite();
  const heroRef = useRef<HTMLElement>(null);

  // cursor-follow glow
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  // highlight "WhatsApp" / "Spreadsheet" in the headline
  const highlightTerms = lang === 'ar'
    ? ['واتساب', 'إكسل']
    : ['WhatsApp', 'Spreadsheet'];
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${highlightTerms.map(escapeRegex).join('|')})`, 'g');
  const parts = t.hero.headline.split(pattern).filter(Boolean);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <HeroCanvas />
      </div>

      <div className="hero-inner">
        <div>
          <div className="hero-badges" data-reveal="">
            <span className="badge-loc">
              <span className="badge-dot" />
              {t.hero.badgeLocation}
            </span>
            <span className="badge-ar">{t.hero.badgeArabic}</span>
          </div>

          <h1 className="hero-title" data-reveal="" data-reveal-delay="80">
            {parts.map((p, i) =>
              highlightTerms.includes(p) ? (
                <span key={i} className="hot">
                  {p}
                </span>
              ) : (
                <span key={i}>{p}</span>
              )
            )}
          </h1>

          <p className="hero-sub" data-reveal="" data-reveal-delay="160">
            {t.hero.subtext}
          </p>

          <div className="hero-cta-row" data-reveal="" data-reveal-delay="240">
            <a href="#contact" data-magnetic="" className="btn-primary glow">
              {t.hero.ctaPrimary}
            </a>
            <a href="#selected-work" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-visual" />
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">{t.ui.scroll}</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
