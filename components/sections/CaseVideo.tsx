"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * The Selected Work video slot (STAGE2-DESIGN §6.1) — pattern ported from
 * the Wazen landing repo's video section (lazy mount + poster + reduced-
 * motion guard), adapted to a silent autoplay loop:
 *
 * - `children` is the DOM poster (the dense schematic frame interior). It
 *   always renders and carries the layout, so the poster→video swap causes
 *   zero CLS.
 * - With `src` set, an IntersectionObserver mounts the <video> only when the
 *   panel nears the viewport (no fetch while idle), and it fades in over the
 *   poster once actually playing.
 * - Reduced motion: matchMedia check — the video never mounts, the poster is
 *   held as a still, and no play affordance is offered.
 * - No controls, no audio: it is a texture, not a player.
 */
export default function CaseVideo({
  src,
  children,
}: {
  src: string | null;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mountVideo, setMountVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    // layer 2 of the reduced-motion rule: never autoplay, poster held
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      setMountVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMountVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={ref} className={"case-video" + (playing ? " playing" : "")}>
      {children}
      {src && mountVideo && (
        <video
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onPlaying={() => setPlaying(true)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
