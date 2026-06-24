"use client";

import { useSite } from "@/components/Providers";
import { SectionLabel } from "@/components/ui/SectionLabel";

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

        <div className="grid-4">
          {tm.members.map((m, i) => (
            <div className="team-card" data-reveal="" key={i}>
              <span className="team-avatar">{m.initials}</span>
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p className="team-desc">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
