"use client";

import { useSite } from "@/components/Providers";
import { LogoMark } from "@/components/ui/icons";

export default function Footer() {
  const { t, lang } = useSite();
  const f = t.footer;

  const links = [
    { href: "#gap", label: f.links.theGap },
    { href: "#build", label: f.links.whatWeBuild },
    { href: "#work", label: f.links.selectedWork },
    { href: "#how-we-work", label: f.links.howWeWork },
    { href: "#guarantee", label: f.links.guarantee },
    { href: "#contact", label: f.links.contact },
    {
      href: lang === "ar" ? "/ar/privacy" : "/privacy",
      label: f.links.privacy,
    },
  ];
  const [productName, productLink] = (f.product || "").split(" — ");

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-row">
          {/* visible text names the link; sr-only suffix disambiguates */}
          <a href="#top" className="footer-brand">
            <span className="footer-logo" aria-hidden="true">
              <LogoMark size={38} />
            </span>
            <span className="brand-text">
              <span className="footer-brand-name">Binaa Labs</span>
              <span className="footer-brand-sub">{f.logoSubtext}</span>
            </span>
            <span className="sr-only">{t.ui.aria.home}</span>
          </a>
          <nav className="footer-nav">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="footer-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-meta">
          <p className="footer-product">
            {productName} —{" "}
            <a
              href="https://wazen.fit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {productLink || "wazen.fit"}
            </a>
          </p>
          <p className="footer-loc">
            <span className="footer-loc-dot" aria-hidden="true" />
            {f.location}
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom">
          <p className="footer-copy">{f.copyright}</p>
          <div className="footer-bottom-end">
            <p className="footer-note">{f.bottomNote}</p>
            <a
              href="#top"
              aria-label={t.ui.aria.backToTop}
              className="footer-top-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
