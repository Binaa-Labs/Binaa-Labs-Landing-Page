"use client";

import { useEffect } from "react";

/**
 * Document-level progressive enhancements that mirror the original design:
 *  - scroll reveal for [data-reveal] (with optional [data-reveal-delay])
 *  - count-up for [data-count] elements as they reveal
 *  - magnetic pull for [data-magnetic] on fine-pointer devices
 */
export default function ClientEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // iOS Safari only honors the CSS :active pseudo-class on elements that
    // have (or descend from) a literal touchstart listener; React's
    // delegated click handlers don't count. A single no-op listener here
    // makes tap/press feedback register site-wide.
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });

    const countUp = (el: HTMLElement) => {
      if (el.getAttribute("data-counted")) return;
      const raw = el.getAttribute("data-count") || el.textContent || "";
      const m = raw.match(/([0-9]+(?:\.[0-9]+)?)/);
      if (!m) return;
      el.setAttribute("data-counted", "1");
      const target = parseFloat(m[1]);
      const idx = m.index ?? 0;
      const prefix = raw.slice(0, idx);
      const suffix = raw.slice(idx + m[1].length);
      const isInt = m[1].indexOf(".") < 0;
      if (reduce) {
        el.textContent = raw;
        return;
      }
      const dur = 1100;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const val = target * e;
        el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // ---- scroll reveal ----
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
    );
    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            const d = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
            el.style.transitionDelay = d / 1000 + "s";
            el.setAttribute("data-revealed", "");
            // Drop the compositor hint once the reveal transition is done so we
            // don't keep a live layer per element for the page's lifetime.
            el.addEventListener(
              "transitionend",
              () => {
                el.style.willChange = "auto";
              },
              { once: true }
            );
            io!.unobserve(el);
            el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
            if (el.hasAttribute("data-count")) countUp(el);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io!.observe(el));
    }

    // ---- magnetic buttons ----
    const cleanups: Array<() => void> = [];
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer:coarse)").matches;
    if (!coarse) {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
            const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
            el.style.transform = `translate(${x}px,${y}px)`;
          };
          const leave = () => {
            el.style.transform = "translate(0,0)";
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
    }

    return () => {
      io?.disconnect();
      cleanups.forEach((f) => f());
      document.removeEventListener("touchstart", noop);
    };
  }, []);

  return null;
}
