"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/Providers";
import {
  LogoMark,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/icons";

// Anchor plan per STAGE2-DESIGN §2: the merged section owns #how-we-work
// (and carries an invisible #offer alias for old deep links).
const SECTION_IDS = ["gap", "build", "work", "how-we-work"] as const;

export default function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);

  const links = [
    { id: "gap", href: "#gap", label: t.nav.links.theGap },
    { id: "build", href: "#build", label: t.nav.links.whatWeBuild },
    { id: "work", href: "#work", label: t.nav.links.selectedWork },
    { id: "how-we-work", href: "#how-we-work", label: t.nav.links.howWeWork },
  ];

  // scroll progress bar + nav border
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? (window.scrollY / max) * 100 : 0;
        if (barRef.current) barRef.current.style.width = p + "%";
        setScrolled(window.scrollY > 6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // while the mobile menu is open: close on Escape and lock body scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // active link highlight
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className={"nav-header" + (scrolled ? " scrolled" : "")}>
      <div ref={barRef} className="nav-progress" aria-hidden="true" />
      <nav className="nav-inner">
        {/* No aria-label here: the visible text names the link (axe
            label-content-name-mismatch fix); the sr-only suffix disambiguates. */}
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <LogoMark size={34} />
          </span>
          <span className="brand-text">
            <span className="brand-name">{t.nav.brandName}</span>
            <span className="brand-sub">{t.nav.brandSub}</span>
          </span>
          <span className="sr-only">{t.ui.aria.home}</span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                className={"nav-link" + (active === l.id ? " active" : "")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions" style={{ marginInlineStart: "auto" }}>
          <div
            className="lang-group"
            role="group"
            aria-label={t.ui.aria.language}
          >
            <button
              type="button"
              className={"lang-btn" + (lang === "en" ? " active" : "")}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <span className="lang-sep" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className={"lang-btn" + (lang === "ar" ? " active" : "")}
              onClick={() => setLang("ar")}
              aria-pressed={lang === "ar"}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            className="icon-btn theme"
            onClick={toggleTheme}
            aria-label={t.ui.aria.toggleTheme}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>

          <a
            href="#contact"
            data-magnetic=""
            className="btn-primary btn-sm nav-cta"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            className="icon-btn burger nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.ui.aria.toggleMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
