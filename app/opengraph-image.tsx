import { ogContentType, ogSize, renderOgImage } from "@/components/og-card";

// Branded social share card for the English route.
export const alt = "Binaa Labs · Custom Software Studio for the Gulf";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    tagline: "Custom Software Studio for the Gulf",
    dir: "ltr",
  });
}
