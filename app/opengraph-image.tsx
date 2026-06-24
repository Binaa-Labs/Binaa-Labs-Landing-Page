import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Branded social share card. Applies to `/` and cascades to `/ar`.
export const alt = "Binaa Labs — Custom Software Studio for the Gulf";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const cube = readFileSync(join(process.cwd(), "app", "icon.svg")).toString(
    "base64"
  );
  const logo = `data:image/svg+xml;base64,${cube}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "radial-gradient(circle at 72% 28%, #2c2611 0%, #1a1a1a 58%)",
          fontFamily: "sans-serif",
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
          style={{
            display: "flex",
            fontSize: 42,
            color: "#d4a017",
            marginTop: 14,
          }}
        >
          Custom Software Studio for the Gulf
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 27,
            color: "#a0a09a",
            marginTop: 54,
          }}
        >
          Dubai, UAE · binaalabs.com
        </div>
      </div>
    ),
    { ...size }
  );
}
