import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TheGap from "@/components/TheGap";
import WhatWeBuild from "@/components/WhatWeBuild";
import SelectedWork from "@/components/SelectedWork";
import HowItWorks from "@/components/HowItWorks";
import Offer from "@/components/Offer";
import Guarantee from "@/components/Guarantee";
// import Team from "@/components/Team"; // hidden for now — re-enable with <Team /> below
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import Providers from "@/components/Providers";
import type { Lang } from "@/lib/i18n";

type SearchParams = Record<string, string | string[] | undefined>;

function getInitialLang(params?: SearchParams): Lang {
  const raw = Array.isArray(params?.lang) ? params?.lang[0] : params?.lang;
  return raw === "ar" ? "ar" : "en";
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const initialLang = getInitialLang(params);

  return (
    <Providers initialLang={initialLang}>
      <div className="ambient-grid" aria-hidden="true" />
      <Nav />
      <main id="top">
        <Hero />
        <Stats />
        <TheGap />
        <WhatWeBuild />
        <SelectedWork />
        <HowItWorks />
        <Offer />
        <Guarantee />
        {/* <Team /> hidden for now — re-enable to restore the team section */}
        <Contact />
      </main>
      <Footer />
      <ClientEffects />
    </Providers>
  );
}
