"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSite } from "@/components/Providers";

const HeroCanvas = dynamic(() => import("@/components/sections/HeroCanvas"), {
  ssr: false,
});

const SEEN_KEY = "binaa-splash-seen";

/**
 * Intro splash v2 (page-level, once per session). Beats, all CSS-driven from
 * the --spl-* timeline tokens: panels close (gold seam) → the HeroCanvas cube
 * builds ~1.5s and stays alive → "Binaa Labs" / بناء لابس / slogan rise →
 * hold → panels part (~3.7s total).
 *
 * Contract (STAGE2-DESIGN §1 + splash v2 spec):
 * - Session-once via sessionStorage; the layout boot script sets
 *   `html.splash-seen` BEFORE paint on repeat loads, so there is no flash.
 * - Reduced motion never mounts it: CSS layer (`display:none`) + the
 *   matchMedia check below (layer 2).
 * - Skip button fades in at ~1s; ANY wheel / touchmove / scroll /
 *   pointerdown / keydown skips instantly.
 * - Zero layout shift: fixed overlay; the page paints beneath from t=0
 *   (beat 1 is the panels closing OVER the visible page).
 */
export default function Splash() {
  const { t } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);
  const [skipping, setSkipping] = useState(false);
  // The CSS beats start at first paint; the canvas mounts at hydration.
  // Aim the cube's build at ~panel-close end regardless of hydration lag.
  const [canvasDelay] = useState(() =>
    typeof performance !== "undefined"
      ? Math.max(0, 420 - performance.now())
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || seen) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }

    let finished = false;
    let fadeTimer = 0;
    const finish = () => {
      if (finished) return;
      finished = true;
      setSkipping(true);
      fadeTimer = window.setTimeout(() => setGone(true), 320);
    };
    finishRef.current = finish;

    // any input skips instantly (v2 rule)
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });
    window.addEventListener("scroll", finish, { passive: true });
    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);

    // natural end: the right panel's part animation completes
    const panel = el.querySelector<HTMLElement>(".spl-r");
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === "splPartR" && !finished) {
        finished = true;
        setGone(true);
      }
    };
    panel?.addEventListener("animationend", onAnimEnd);

    return () => {
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
      window.removeEventListener("scroll", finish);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      panel?.removeEventListener("animationend", onAnimEnd);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="splash" ref={ref} className={skipping ? "skipping" : undefined}>
      <div className="spl-panel spl-l" aria-hidden="true" />
      <div className="spl-panel spl-r" aria-hidden="true" />
      <div className="spl-stage">
        <div className="spl-canvas" aria-hidden="true">
          <HeroCanvas startDelayMs={canvasDelay} />
        </div>
        <div>
          <p className="spl-title">{t.splash.title}</p>
          <p className="spl-ar">{t.splash.arabicName}</p>
          <p className="spl-slogan">{t.splash.slogan}</p>
        </div>
      </div>
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
