import type { Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
};

export default function Home() {
  return <Landing lang="en" />;
}
