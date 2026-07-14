"use client";

import React, { useRef, useState } from "react";
import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/site";

interface LeadPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  project: string;
}

/* ============================================================
   D5 STUB — DEVELOPER-OWNED. Replace me.
   The form UI is final; this transport is not. It POSTs the lead to
   /api/lead and treats anything but an OK response as failure — so until
   that route exists, every submit lands (honestly) in the failure state
   with the mailto fallback. Implement the API route (or swap this function
   for the real transport) and the three-state UI works unchanged.
   There is deliberately NO optimistic success path: success renders only
   after the server confirms (STAGE2-DESIGN §11).
   ============================================================ */
async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`);
  }
}

type Status = "idle" | "submitting" | "success" | "failure";

export default function Contact() {
  const { t } = useSite();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const fields = [
    { name: "name", label: c.form.name, ph: c.form.namePlaceholder, type: "text", req: true },
    { name: "email", label: c.form.email, ph: c.form.emailPlaceholder, type: "email", req: true },
    { name: "company", label: c.form.company, ph: c.form.companyPlaceholder, type: "text", req: false },
    { name: "phone", label: c.form.phone, ph: c.form.phonePlaceholder, type: "tel", req: false },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const f = formRef.current;
    if (!f) return;
    const data = new FormData(f);
    const payload: LeadPayload = {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      company: (data.get("company") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim(),
      project: (data.get("project") || "").toString().trim(),
    };
    if (!payload.name || !payload.email || !payload.project) {
      setValidationError(c.form.errRequired);
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
      setValidationError(c.form.errEmail);
      return;
    }
    setValidationError("");
    setStatus("submitting");
    try {
      await submitLead(payload);
      setStatus("success");
    } catch {
      // form data is never cleared on failure — the message is still below
      setStatus("failure");
    }
  };

  return (
    <section id="contact" className="section bg-2 bt">
      <div className="wrap">
        <div className="contact-cols">
          {/* left — tightened to the bone: headline + three one-liners */}
          <div className="contact-pitch">
            <SectionLabel>{c.label}</SectionLabel>
            <h2 className="section-title" data-reveal="" data-reveal-delay="60">
              {c.headline}
            </h2>
            <div className="contact-steps" data-reveal="" data-reveal-delay="120">
              {c.steps.map((s, i) => (
                <div className="cstep" key={i}>
                  <span className="cstep-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* right — the form, the star of the section */}
          <div className="contact-form" data-reveal="" data-reveal-delay="120">
            <p className="form-cap">{c.form.cap}</p>

            {status === "success" ? (
              <div className="form-ok" role="status">
                <span className="ok-mark" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <b className="ok-title">{c.form.sentTitle}</b>
                  <p className="ok-text">{c.form.sentText}</p>
                  <button
                    type="button"
                    className="form-reset"
                    onClick={() => setStatus("idle")}
                  >
                    {c.form.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <fieldset
                  disabled={status === "submitting"}
                  style={{ border: "none", margin: 0, padding: 0 }}
                >
                  <div className="row2">
                    {fields.slice(0, 2).map((fld) => (
                      <Field key={fld.name} fld={fld} />
                    ))}
                  </div>
                  <div className="row2" style={{ marginTop: "var(--sp-4)" }}>
                    {fields.slice(2).map((fld) => (
                      <Field key={fld.name} fld={fld} />
                    ))}
                  </div>
                  <div className="fld" style={{ marginTop: "var(--sp-4)" }}>
                    <label htmlFor="project">
                      {c.form.project}
                      <span className="req"> *</span>
                    </label>
                    <textarea
                      className="field-area"
                      id="project"
                      name="project"
                      rows={4}
                      placeholder={c.form.projectPlaceholder}
                      required
                      aria-required="true"
                    />
                  </div>

                  {validationError && (
                    <p className="form-error" role="alert" style={{ marginTop: "var(--sp-3)" }}>
                      {validationError}
                    </p>
                  )}

                  {status === "failure" && (
                    <div className="form-err" role="alert" style={{ marginTop: "var(--sp-4)" }}>
                      <b>{c.form.failTitle}</b> {c.form.failText}{" "}
                      {c.form.failEmailPrefix}{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </div>
                  )}

                  <button
                    type="submit"
                    data-magnetic=""
                    className="btn-primary block form-submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        {c.form.submitting}
                      </>
                    ) : status === "failure" ? (
                      c.form.failRetry
                    ) : (
                      c.form.cta
                    )}
                  </button>
                </fieldset>
              </form>
            )}

            {/* the receipt strip: what happens after you press the button */}
            <div className="receipt">
              <span className="receipt-cap">{c.form.receiptCap}</span>
              <div className="rchips">
                {c.form.receiptChips.map((chip, i) => (
                  <span className="rchip" key={i}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  fld,
}: {
  fld: { name: string; label: string; ph: string; type: string; req: boolean };
}) {
  return (
    <div className="fld">
      <label htmlFor={fld.name}>
        {fld.label}
        {fld.req && <span className="req"> *</span>}
      </label>
      <input
        className="field-in"
        id={fld.name}
        name={fld.name}
        type={fld.type}
        placeholder={fld.ph}
        required={fld.req}
        aria-required={fld.req || undefined}
      />
    </div>
  );
}
