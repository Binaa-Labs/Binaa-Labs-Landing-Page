import * as React from "react";

export function LogoMark({ size = 30 }: { size?: number }) {
  // isometric node-cube — mirrors the Binaa Labs brand mark.
  // Color rides on --logo: gold in dark theme, navy in light (D14).
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 24 L74 38 L74 64 L50 78 L26 64 L26 38 Z"
        stroke="var(--logo)"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M50 24 L50 51 M50 51 L74 38 M50 51 L26 38"
        stroke="var(--logo)"
        strokeWidth={4}
        strokeLinejoin="round"
        opacity={0.55}
      />
      <circle cx={50} cy={24} r={5.5} fill="var(--logo)" />
      <circle cx={26} cy={38} r={5.5} fill="var(--logo)" />
      <circle cx={74} cy={64} r={5.5} fill="var(--logo)" />
    </svg>
  );
}

// Per-scenario glyphs for What We Build (calendar-check / stacked crates /
// report doc / connected nodes) — geometry from the approved build.html mock.
const SCENARIO_PATHS: string[][] = [
  ["M3.5 5h17v15h-17z", "M3.5 9h17M8 3v4M16 3v4", "M9 14.5l2 2 3.5-4"],
  [
    "M4 12h7v8H4z",
    "M13 12h7v8h-7z",
    "M8.5 4h7v8h-7z",
    "M7 12v-1M17 12v-1M12 4V3",
  ],
  ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6M9 15h6M9 18h4"],
  ["M7.6 7.6l3 8M16.4 7.6l-3 8M8 6h8"],
];

export function ScenarioIcon({ i }: { i: number }) {
  const paths = SCENARIO_PATHS[i] || SCENARIO_PATHS[0];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      {i === 3 && (
        <>
          <circle
            cx={6}
            cy={6}
            r={2.4}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.7}
          />
          <circle
            cx={18}
            cy={6}
            r={2.4}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.7}
          />
          <circle
            cx={12}
            cy={18}
            r={2.4}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.7}
          />
        </>
      )}
      {paths.map((d, k) => (
        <path
          key={k}
          d={d}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
