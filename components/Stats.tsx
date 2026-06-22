"use client";

import { useSite } from "./Providers";

export default function Stats() {
  const { t } = useSite();

  return (
    <section className="stats-sec">
      <div className="stats-grid">
        {t.statsBar.stats.map((s, i) => (
          <div className="stat" data-reveal="" key={i}>
            <span className="stat-value" data-count={s.value}>
              {s.value}
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
