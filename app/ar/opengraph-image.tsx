import { ogContentType, ogSize, renderOgImage } from "@/components/og-card";

// Branded social share card for the Arabic route.
export const alt = "Binaa Labs — استوديو برمجيات مخصص للخليج";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImageAr() {
  return renderOgImage({
    tagline: "استوديو برمجيات مخصص للخليج",
    dir: "rtl",
  });
}
