import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Shared social-card renderer for the opengraph-image routes. Tajawal covers
// both Latin and Arabic, so one font set serves both language cards.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Read assets lazily, inside the renderer, never at module scope. Next.js
// imports this module while generating page metadata (to read the `size` and
// `contentType` exports above), and that import must not touch the filesystem:
// on Vercel the `assets/og` files aren't in the page's serverless bundle, so a
// top-level readFileSync throws and crashes every page's render. The OG routes
// are statically generated at build time, where these reads run safely.
export function renderOgImage({
  tagline,
  dir,
}: {
  tagline: string;
  dir: "ltr" | "rtl";
}) {
  const fontsDir = join(process.cwd(), "assets", "og");
  const tajawalRegular = readFileSync(join(fontsDir, "Tajawal-Regular.ttf"));
  const tajawalBold = readFileSync(join(fontsDir, "Tajawal-Bold.ttf"));
  const cubeBase64 = readFileSync(
    join(process.cwd(), "app", "icon.svg")
  ).toString("base64");
  const logo = `data:image/svg+xml;base64,${cubeBase64}`;

  const rtl = dir === "rtl";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: rtl ? "flex-end" : "flex-start",
          textAlign: rtl ? "right" : "left",
          padding: "90px",
          background:
            "radial-gradient(circle at 72% 28%, #2c2611 0%, #1a1a1a 58%)",
          fontFamily: "Tajawal",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={132} height={132} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#faf8f3",
            marginTop: 44,
            letterSpacing: "-0.02em",
          }}
        >
          Binaa Labs
        </div>
        <div
          style={{ display: "flex", fontSize: 42, color: "#d4a017", marginTop: 14 }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 27,
            color: "#a0a09a",
            marginTop: 54,
          }}
        >
          Dubai, UAE · binaalabs.com
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Tajawal", data: tajawalRegular, weight: 400, style: "normal" },
        { name: "Tajawal", data: tajawalBold, weight: 700, style: "normal" },
      ],
    }
  );
}
