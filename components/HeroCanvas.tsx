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
  return `rgba(227,174,58,${a})`;
}

/**
 * Animated isometric node-cube that "builds in" (nodes pop outward, edges draw
 * themselves), then floats with traveling pulses. Theme-aware and respects
 * prefers-reduced-motion (renders the finished cube, statically).
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getVar = (n: string) => getComputedStyle(cv).getPropertyValue(n).trim();
    const isLight = () =>
      document.documentElement.getAttribute("data-theme") === "light";

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

    // intro timing — center node first, then ring nodes radiating out
    const nodeOrder = [6, 0, 1, 2, 3, 4, 5];
    const nodeAt: Record<number, number> = {};
    nodeOrder.forEach((idx, o) => {
      nodeAt[idx] = o;
    });
    const NODE_STAGGER = 0.085;
    const NODE_GROW = 0.34;
    const NODES_DONE = motion ? nodeOrder.length * NODE_STAGGER + NODE_GROW : 0;
    const EDGE_DRAW = 0.5;
    const EDGE_DUR = motion ? (allEdges.length + 2) * 0.11 + EDGE_DRAW : 0;
    const INTRO_END = NODES_DONE + EDGE_DUR;
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
    const easeInOut = (p: number) =>
      p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const edgeDelay = (i: number) => NODES_DONE + i * 0.11;

    const draw = (now: number) => {
      const light = isLight();
      const time = (now - t0) / 1000;
      const intro = motion ? Math.min(time / Math.max(INTRO_END, 0.001), 1) : 1;
      const built = intro >= 1;
      const gold = getVar("--gold") || "#D4A017";
      const ink = getVar("--ink-3") || "#6A6A64";
      const eAlpha = light ? 0.5 : 0.3;
      const dAlpha = light ? 0.55 : 0.4;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.62;
      const cy = H * 0.5;
      const R = Math.min(W, H) * 0.26;
      const liveT = Math.max(time - INTRO_END, 0);
      const motionGain = built ? easeInOut(Math.min(liveT / 1.2, 1)) : 0;
      const floatY = motion ? Math.sin(liveT * 0.6) * 8 * motionGain : 0;
      const pts = baseHex.map(([x, y]) => ({ x: cx + x * R, y: cy + y * R + floatY }));
      pts.push({ x: cx, y: cy + floatY }); // center node = index 6

      // ambient dots
      ctx.save();
      const ambAlpha = dAlpha * (motion ? easeOut(Math.min(time / 1.4, 1)) : 1);
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
        ctx.strokeStyle = hexA(gold, drawing ? Math.min(eAlpha + 0.3, 0.85) : eAlpha);
        ctx.stroke();
      });

      // traveling pulses (only after fully built)
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

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" />;
}
