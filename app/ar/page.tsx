import type { Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  // no title override: the tab shows the layout default, exactly "Binaa Labs"
  description:
    "بناء لابس استوديو برمجيات في دبي ينقل أعمال الخليج بالكامل إلى الإنترنت — تطبيقات ويب وجوال مخصصة، أتمتة عمليات وتكامل أنظمة، مبنية بالعربية أولاً.",
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "ar_AE",
  },
};

export default function HomeAr() {
  return <Landing lang="ar" />;
}
