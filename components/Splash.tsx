"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSite } from "@/components/Providers";

const HeroCanvas = dynamic(() => import("@/components/sections/HeroCanvas"), {
  ssr: false,
});

const SEEN_KEY = "binaa-splash-seen";

/**
 * Intro splash v3 "singularity" (page-level, once per session). Beats, all
 * CSS-driven from the --spl-* timeline tokens:
 *   0 · cover present at first paint; dim gold glow breathing at center,
 *       canvas dust drifting inward (~0.6s)
 *   1 · soft flare; the cube births CENTER-OUT on the canvas (~1.4s) and
 *       stays alive (traveling pulses); dust reverses to slow outward drift
 *   2 · masked lockup rise: "Binaa Labs" → بناء لابس (+120ms) → slogan
 *       letter-spaced resolve (+240ms)
 *   3 · radial light bloom from the cube center dissolves the cover outward;
 *       the hero is revealed out of the brightness (~3.8s total)
 *
 * Contract (carried over from v2, D15):
 * - Session-once via sessionStorage; the layout boot script sets
 *   `html.splash-seen` BEFORE paint on repeat loads, so there is no flash.
 * - Reduced motion never mounts it: CSS layer (`display:none`) + the
 *   matchMedia check below (layer 2).
 * - Mobile never mounts it either (D19, LCP rung 2): same two layers,
 *   gated at the site's 920px desktop breakpoint (`(max-width: 919px)`).
 *   Desktop choreography, session-once logic and the reduced-motion path
 *   are unchanged.
 * - Skip button fades in at ~1s; ANY wheel / touchmove / scroll /
 *   pointerdown / keydown dismisses instantly. Dismissal = accelerated
 *   bloom (~350ms via .skipping), never a hard cut.
 * - Zero layout shift: fixed overlay; the page paints beneath from t=0.
 * - Unmount is anchored to the bloom's animationend (natural and skipped
 *   exits both end in splBloom), with a safety timer behind it.
 */
export default function Splash() {
  const { t } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);
  const [skipping, setSkipping] = useState(false);
  // The CSS beats start at first paint; the canvas mounts at hydration.
  // Aim the cube's center-out birth at the end of beat 0 (~600ms after
  // paint) regardless of hydration lag.
  const [canvasDelay] = useState(() =>
    typeof performance !== "undefined"
      ? Math.max(0, 620 - performance.now())
      : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // layer 2 of the reduced-motion rule + the session-once rule
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 919px)").matches ||
      seen
    ) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }

    let finished = false;
    let safety = 0;
    const finish = () => {
      if (finished) return;
      finished = true;
      setSkipping(true); // restarts the bloom at 350ms — accelerated exit
      safety = window.setTimeout(() => setGone(true), 900);
    };
    finishRef.current = finish;

    // any input dismisses instantly (accelerated bloom, not a hard cut)
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });
    window.addEventListener("scroll", finish, { passive: true });
    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);

    // both exits (natural + skipped) end when the bloom finishes
    const bloom = el.querySelector<HTMLElement>(".spl-bloom");
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === "splBloom") setGone(true);
    };
    bloom?.addEventListener("animationend", onAnimEnd);

    return () => {
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("scroll", finish);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      bloom?.removeEventListener("animationend", onAnimEnd);
      window.clearTimeout(safety);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="splash" ref={ref} className={skipping ? "skipping" : undefined}>
      <div className="spl-cover" aria-hidden="true" />
      <div className="spl-glow" aria-hidden="true" />
      <div className="spl-flare" aria-hidden="true" />
      <div className="spl-stage">
        <div className="spl-canvas" aria-hidden="true">
          <HeroCanvas startDelayMs={canvasDelay} />
        </div>
        <div className="spl-lockup">
          <span className="spl-line">
            <span className="spl-title">{t.splash.title}</span>
          </span>
          <span className="spl-line">
            <span className="spl-ar">{t.splash.arabicName}</span>
          </span>
          <p className="spl-slogan">{t.splash.slogan}</p>
        </div>
      </div>
      <div className="spl-bloom" aria-hidden="true" />
      <button
        type="button"
        className="spl-skip"
        onClick={() => finishRef.current()}
      >
        {t.splash.skip}
      </button>
    </div>
  );
}
