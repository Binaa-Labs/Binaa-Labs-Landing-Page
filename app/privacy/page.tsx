import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Binaa Labs collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy",
    languages: { en: "/privacy", ar: "/ar/privacy", "x-default": "/privacy" },
  },
};

export default function PrivacyEN() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">← Back to Home</Link>

        <header className="legal-header">
          <p className="legal-label">Legal</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">
            Binaa Lab · Effective date: June 24, 2026
          </p>
        </header>

        <div className="legal-body">

          <section className="legal-section">
            <h2>1. Who We Are</h2>
            <p>
              Binaa Lab (“Binaa Labs”, “we”, “our”, or “us”) is a software
              studio registered in Dubai, United Arab Emirates. We build custom
              web applications, mobile apps, process automation, and system
              integrations for businesses in the Gulf and wider MENA region.
              This Privacy Policy explains how we handle information collected
              through our website at{" "}
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                binaalabs.com
              </a>{" "}
              (the “Site”).
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Information You Give Us</h3>
            <p>
              When you fill in the contact form on our Site, you provide us with
              your name, email address, company name, phone number, and a
              description of your project. We use this solely to respond to your
              enquiry and to provide the free system analysis you requested.
            </p>

            <h3>2.2 Information Collected Automatically</h3>
            <p>
              When you visit the Site, standard web-server logs and analytics
              tools may automatically record your IP address, browser type,
              referring URL, pages visited, and the time and date of your visit.
              This data is used in aggregate to understand how the Site is used
              and to improve it.
            </p>

            <h3>2.3 Cookies and Local Storage</h3>
            <p>
              The Site stores a single preference in your browser’s{" "}
              <code>localStorage</code>: your chosen colour theme (light or
              dark). This value never leaves your device and is not linked to
              any personal identifier. We do not use advertising cookies or
              third-party tracking cookies.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your enquiries and deliver the free analysis you requested.</li>
              <li>Communicate with you about potential or ongoing projects.</li>
              <li>Improve the performance and content of the Site.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
            <p>
              We do not use your personal information for automated
              decision-making or profiling, and we do not sell, rent, or trade
              your information with third parties for their marketing purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Legal Basis for Processing (GDPR / UAE PDPL)</h2>
            <p>
              Where applicable, we rely on the following legal bases to process
              your personal data:
            </p>
            <ul>
              <li>
                <strong>Legitimate interests</strong>: responding to business
                enquiries you initiate through our contact form.
              </li>
              <li>
                <strong>Legal obligation</strong>: complying with applicable
                UAE and international law.
              </li>
              <li>
                <strong>Consent</strong>: where you have explicitly agreed to a
                specific use of your data.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Sharing Your Information</h2>
            <p>
              We do not sell or share your personal information with third
              parties, except in the following limited circumstances:
            </p>
            <ul>
              <li>
                <strong>Service providers</strong>: we use third-party tools
                (such as email delivery and hosting providers) that process data
                on our behalf under strict confidentiality agreements.
              </li>
              <li>
                <strong>Legal requirements</strong>: if required by law, court
                order, or governmental authority in the UAE or another
                applicable jurisdiction.
              </li>
              <li>
                <strong>Business transfer</strong>: in the event of a merger,
                acquisition, or sale of all or part of our business, your data
                may be transferred as part of that transaction.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              We retain enquiry and contact information for as long as is
              necessary to respond to you and for a reasonable period thereafter
              in case you re-engage with us, or as required by applicable law.
              When data is no longer needed, we delete or anonymise it securely.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Data Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect
              your personal information against unauthorised access, alteration,
              disclosure, or destruction. All data in transit is encrypted using
              TLS. However, no method of transmission over the internet is
              entirely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Object to or restrict how we process your data.</li>
              <li>Request a portable copy of your data.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
              respond within 30 days.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. International Transfers</h2>
            <p>
              Our hosting infrastructure may be located outside the UAE. Where
              we transfer personal data internationally, we take steps to ensure
              it receives an equivalent level of protection in accordance with
              applicable data protection laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Children’s Privacy</h2>
            <p>
              Our Site is directed at businesses and professionals. We do not
              knowingly collect personal information from anyone under the age of
              18. If you believe a minor has submitted information to us, please
              contact us and we will delete it promptly.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the effective date at the top of this page. We
              encourage you to review this page periodically. Your continued use
              of the Site after any changes constitutes your acceptance of the
              updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <div className="legal-contact-block">
              <p><strong>Binaa Lab</strong></p>
              <p>Dubai, United Arab Emirates</p>
              <p>
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
              <p>
                Website:{" "}
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                  {SITE_URL}
                </a>
              </p>
            </div>
          </section>

        </div>

        <div className="legal-footer">
          <Link href="/" className="legal-back">← Back to Home</Link>
          <Link href="/ar/privacy" className="legal-lang-switch">عربي</Link>
        </div>
      </div>
    </main>
  );
}
