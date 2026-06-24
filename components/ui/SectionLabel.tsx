import * as React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow" data-reveal="">
      <span className="eyebrow-line" />
      <span className="eyebrow-text">{children}</span>
    </div>
  );
}
