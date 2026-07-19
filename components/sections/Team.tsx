"use client";

import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Compact strip (keep-tier): one hairline-separated row on desktop,
// 2×2 at mobile. One reveal for the whole strip — not a feature section.
export default function Team() {
  const { t } = useSite();
  const tm = t.team;

  return (
    <section className="section bg">
      <div className="wrap">
        <SectionLabel>{tm.label}</SectionLabel>
        <h2 className="section-title" data-reveal="" data-reveal-delay="60">
          {tm.headline}
        </h2>
        <p className="section-sub" data-reveal="" data-reveal-delay="120">
          {tm.subtext}
        </p>

        <div className="team-strip" data-reveal="">
          {tm.members.map((m, i) => (
            <div className="member" key={i}>
              <div className="member-top">
                <span className="member-avatar" aria-hidden="true">
                  {m.initials}
                </span>
                <div>
                  <p className="member-name">{m.name}</p>
                  <p className="member-role">{m.role}</p>
                </div>
              </div>
              <p className="member-desc">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
