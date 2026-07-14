"use client";

import { useEffect, useRef } from "react";

function hexA(c: string, a: number): string {
  c = (c || "").trim();
  if (c.startsWith("#")) {
    let h = c.slice(1);
    if (h.length === 3)
      h = h
        .split("")
        .map((x) => x + x)
        .join("");
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  if (c.startsWith("rgb"))
    return c.replace(/rgba?\(([^)]+)\)/, (_m, inner) => {
      const p = String(inner)
        .split(",")
        .slice(0, 3)
        .map((s) => s.trim());
      return `rgba(${p.join(",")},${a})`;
    });
  return `rgba(212,160,23,${a})`;
}

/**
 * The original animated isometric node-cube, ported to the splash (v2): it
 * "builds in" (nodes pop outward, edges draw themselves), then stays alive —
 * floating, with traveling pulses and ambient particle dust. Centered in its
 * box; the build is compressed to ~1.5s so it fits the splash beat between
 * the panel close and the lockup rise.
 *
 * Colors come from the CSS custom properties in scope (`#splash` pins the
 * brand-dark palette in both themes). The splash never mounts under reduced
 * motion, but the matchMedia static path is kept as belt-and-braces.
 */
export default function HeroCanvas({
  startDelayMs = 0,
}: {
  startDelayMs?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const getVar = (n: string) =>
      getComputedStyle(cv).getPropertyValue(n).trim();
    const delay = startDelayMs / 1000;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;

    const size = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const baseHex: number[][] = [
      [0, -1],
      [0.866, -0.5],
      [0.866, 0.5],
      [0, 1],
      [-0.866, 0.5],
      [-0.866, -0.5],
    ];
    const edges: number[][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ];
    const innerEdges: number[][] = [
      [6, 1],
      [6, 3],
      [6, 5],
    ];
    const allEdges = edges.concat(innerEdges);
    const ambient = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.5,
      sx: (Math.random() - 0.5) * 0.00018,
      sy: (Math.random() - 0.5) * 0.00018,
    }));
    const t0 = performance.now();

    // intro timing — center node first, then ring nodes radiating out.
    // Compressed vs the original hero values so the whole build lands ~1.5s.
    const nodeOrder = [6, 0, 1, 2, 3, 4, 5];
    const nodeAt: Record<number, number> = {};
    nodeOrder.forEach((idx, o) => {
      nodeAt[idx] = o;
    });
    const NODE_STAGGER = 0.05;
    const NODE_GROW = 0.24;
    const NODES_DONE = motion ? nodeOrder.length * NODE_STAGGER + NODE_GROW : 0;
    const EDGE_DRAW = 0.3;
    const EDGE_DUR = motion ? (allEdges.length + 2) * 0.055 + EDGE_DRAW : 0;
    const INTRO_END = NODES_DONE + EDGE_DUR; // ≈ 1.5s
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
    const easeInOut = (p: number) =>
      p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const edgeDelay = (i: number) => NODES_DONE + i * 0.055;

    const draw = (now: number) => {
      // hold at t=0 until the panels finish closing
      const time = Math.max(0, (now - t0) / 1000 - delay);
      const intro = motion ? Math.min(time / Math.max(INTRO_END, 0.001), 1) : 1;
      const built = intro >= 1;
      const gold = getVar("--gold") || "#D4A017";
      const ink = getVar("--ink-3") || "#8A8A84";
      const eAlpha = 0.3;
      const dAlpha = 0.4;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H * 0.5;
      const R = Math.min(W, H) * 0.32;
      const liveT = Math.max(time - INTRO_END, 0);
      const motionGain = built ? easeInOut(Math.min(liveT / 1.2, 1)) : 0;
      const floatY = motion ? Math.sin(liveT * 0.6) * 8 * motionGain : 0;
      const pts = baseHex.map(([x, y]) => ({
        x: cx + x * R,
        y: cy + y * R + floatY,
      }));
      pts.push({ x: cx, y: cy + floatY }); // center node = index 6

      // ambient dust
      ctx.save();
      const ambAlpha = dAlpha * (motion ? easeOut(Math.min(time / 1.2, 1)) : 1);
      ambient.forEach((p) => {
        if (motion && built) {
          p.x += p.sx;
          p.y += p.sy;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;
          if (p.y > 1) p.y = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexA(ink, ambAlpha);
        ctx.fill();
      });
      ctx.restore();

      // edges — each draws itself a->b during the build
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      allEdges.forEach((e, i) => {
        const a = pts[e[0]];
        const b = pts[e[1]];
        let prog = 1;
        if (motion && !built) {
          prog = Math.max(0, Math.min((time - edgeDelay(i)) / EDGE_DRAW, 1));
          prog = easeOut(prog);
        }
        if (prog <= 0) return;
        const ex = a.x + (b.x - a.x) * prog;
        const ey = a.y + (b.y - a.y) * prog;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(ex, ey);
        const drawing = !built && prog < 1;
        ctx.strokeStyle = hexA(
          gold,
          drawing ? Math.min(eAlpha + 0.3, 0.85) : eAlpha
        );
        ctx.stroke();
      });

      // traveling pulses (only after fully built — the "stays alive" beat)
      if (motion && built) {
        const pAlpha = motionGain;
        allEdges.forEach((e, i) => {
          const a = pts[e[0]];
          const b = pts[e[1]];
          const tt = (liveT * 0.35 + i * 0.13) % 1;
          const px = a.x + (b.x - a.x) * tt;
          const py = a.y + (b.y - a.y) * tt;
          const grd = ctx.createRadialGradient(px, py, 0, px, py, 7);
          grd.addColorStop(0, hexA(gold, 0.9 * pAlpha));
          grd.addColorStop(1, hexA(gold, 0));
          ctx.beginPath();
          ctx.fillStyle = grd;
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // nodes — pop in staggered (center outward), each with a flash ring
      pts.forEach((p, i) => {
        const isHub = i === 6 || i === 0 || i === 1 || i === 3 || i === 5;
        const baseR = isHub ? 4.6 : 3.2;
        let grow = 1;
        let popRing = 0;
        if (motion && !built) {
          const appear = (nodeAt[i] || 0) * NODE_STAGGER;
          const g = Math.max(0, Math.min((time - appear) / NODE_GROW, 1));
          if (g <= 0) return;
          grow = easeOut(g);
          popRing = g < 1 ? 1 - g : 0;
        }
        const rr = baseR * grow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = gold;
        ctx.fill();
        if (popRing > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, rr + popRing * 14, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(gold, 0.5 * popRing);
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
        if (motion && built && isHub) {
          const pulse = Math.sin(liveT * 2 + i) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, baseR + pulse * 6, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(gold, 0.25 * (1 - pulse) * motionGain);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      });
    };

    // Only animate while the canvas is on-screen and the tab is visible —
    // otherwise the rAF loop keeps burning CPU/battery off-screen.
    let onScreen = true;
    const isActive = () => onScreen && document.visibilityState === "visible";

    const frame = (now: number) => {
      draw(now);
      raf = isActive() ? requestAnimationFrame(frame) : 0;
    };
    const startLoop = () => {
      if (!raf && isActive()) raf = requestAnimationFrame(frame);
    };

    startLoop();

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              onScreen = entries.some((e) => e.isIntersecting);
              startLoop();
            },
            { threshold: 0 }
          )
        : null;
    io?.observe(cv);

    const onVisibility = () => startLoop();
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [startDelayMs]);

  return <canvas ref={ref} />;
}
