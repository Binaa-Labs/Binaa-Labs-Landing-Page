import * as React from "react";

const GOLD = "var(--gold)";

export function LogoMark({ size = 30 }: { size?: number }) {
  // isometric node-cube — mirrors the Binaa Labs brand mark
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M50 24 L74 38 L74 64 L50 78 L26 64 L26 38 Z"
        stroke={GOLD}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M50 24 L50 51 M50 51 L74 38 M50 51 L26 38"
        stroke={GOLD}
        strokeWidth={4}
        strokeLinejoin="round"
        opacity={0.55}
      />
      <circle cx={50} cy={24} r={5.5} fill={GOLD} />
      <circle cx={26} cy={38} r={5.5} fill={GOLD} />
      <circle cx={74} cy={64} r={5.5} fill={GOLD} />
    </svg>
  );
}

const BUILD_PATHS: string[][] = [
  ["M3 5h18v11H3z", "M3 16h18", "M9 20h6M12 16v4"],
  ["M7 2h10v20H7z", "M11 18h2"],
  ["M4 5h16v14H4z", "M7 9l3 2.5L7 14", "M13 14h4"],
  ["M5 5h6v6H5zM13 13h6v6h-6z", "M11 8h4a2 2 0 0 1 2 2v3M8 11v4a2 2 0 0 0 2 2h3"],
];

export function BuildIcon({ i }: { i: number }) {
  const paths = BUILD_PATHS[i] || BUILD_PATHS[0];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d, k) => (
        <path
          key={k}
          d={d}
          fill="none"
          stroke={GOLD}
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
