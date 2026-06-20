"use client";

import React, { useRef, useState } from "react";
import { useSite } from "./Providers";
import { SectionLabel } from "./SectionLabel";

// Where booking requests go for now — no backend; opens the visitor's mail app.
const LEAD_INBOX = "admin@binaalabs.com";

export default function Contact() {
  const { t, lang } = useSite();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const fields = [
    { name: "name", label: c.form.name, ph: c.form.namePlaceholder, type: "text", req: "*" },
    { name: "email", label: c.form.email, ph: c.form.emailPlaceholder, type: "email", req: "*" },
    { name: "company", label: c.form.company, ph: c.form.companyPlaceholder, type: "text", req: "" },
    { name: "phone", label: c.form.phone, ph: c.form.phonePlaceholder, type: "tel", req: "" },
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = formRef.current;
    if (!f) return;
    const data = new FormData(f);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const company = (data.get("company") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const project = (data.get("project") || "").toString().trim();
    if (!name || !email || !project) {
      setError(
        lang === "ar"
          ? "يرجى تعبئة الحقول المطلوبة"
          : "Please fill in the required fields."
      );
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(
        lang === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email."
      );
      return;
    }
    // Simple no-backend handoff: open the visitor's email client with a
    // pre-filled message to Binaa Labs, then show the success state.
    const subject = `New project inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Phone: ${phone || "—"}`,
      "",
      "Project:",
      project,
    ].join("\n");
    window.location.href = `mailto:${LEAD_INBOX}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setError("");
    setSent(true);
  };

  return (
    <section id="contact" className="section bg-2 bt">
      <div className="contact-grid">
        <div>
          <SectionLabel>{c.label}</SectionLabel>
          <h2 className="section-title bold" data-reveal="" data-reveal-delay="60">
            {c.headline}
          </h2>
          <p className="section-sub mw-52" data-reveal="" data-reveal-delay="120">
            {c.subtext}
          </p>
          <ul className="contact-steps">
            {c.steps.map((s, i) => (
              <li className="contact-step" data-reveal="" key={i}>
                <span className="contact-step-num">{i + 1}</span>
                <div>
                  <p className="contact-step-title">{s.title}</p>
                  <p className="contact-step-desc">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="contact-trust" data-reveal="">
            <span className="trust-dot" />
            {c.trustLine}
          </p>
        </div>

        <div className="contact-form-card" data-reveal="" data-reveal-delay="120">
          {sent ? (
            <div className="form-sent">
              <span className="form-sent-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </span>
              <h3 className="form-sent-title">{c.form.sentTitle}</h3>
              <p className="form-sent-text">{c.form.sentText}</p>
              <button
                type="button"
                className="form-reset"
                onClick={() => setSent(false)}
              >
                {c.form.sendAnother}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                {fields.map((fld) => (
                  <div className="field" key={fld.name}>
                    <label className="field-label" htmlFor={fld.name}>
                      {fld.label}
                      <span className="req"> {fld.req}</span>
                    </label>
                    <input
                      className="field-input"
                      id={fld.name}
                      name={fld.name}
                      type={fld.type}
                      placeholder={fld.ph}
                    />
                  </div>
                ))}
              </div>
              <div className="field-full">
                <label className="field-label" htmlFor="project">
                  {c.form.project}
                  <span className="req"> *</span>
                </label>
                <textarea
                  className="field-textarea"
                  id="project"
                  name="project"
                  rows={4}
                  placeholder={c.form.projectPlaceholder}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button
                type="submit"
                data-magnetic=""
                className="btn-primary block form-submit"
              >
                {c.form.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
