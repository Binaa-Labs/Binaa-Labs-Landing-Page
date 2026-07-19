// Single source of truth for the Selected Work video slot — the pattern is
// ported from the Wazen landing repo's lib/video.ts (first-party code port,
// not a new library).
//
// ASSET PASS: when the 20–30s silent Wazen screen capture exists, this file
// is the whole swap — point WAZEN_LOOP_SRC at the file (e.g. a /video/*.mp4
// under public/) and the slot starts playing. Requirements for the capture
// (STAGE2-DESIGN §6.1): seamless loop, NO audio track at all, seeded demo
// accounts only — never real client data.
export const WAZEN_LOOP_SRC: string | null = null;
