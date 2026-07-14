import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Splash from "@/components/Splash";
import Hero from "@/components/sections/Hero";
import TheGap from "@/components/sections/TheGap";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import SelectedWork from "@/components/sections/SelectedWork";
import HowWeWork from "@/components/sections/HowWeWork";
import Guarantee from "@/components/sections/Guarantee";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import ClientEffects from "@/components/ClientEffects";
import Providers from "@/components/Providers";
import { dictionaries, type Lang } from "@/lib/i18n";

// Shared page composition. EN renders at `/`, AR renders at `/ar`; both pass
// their language down so the entire tree is server-rendered in that language.
export default function Landing({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];

  return (
    <Providers initialLang={lang}>
      <a href="#top" className="skip-link">
        {t.ui.skipToContent}
      </a>
      <div className="ambient-grid" aria-hidden="true" />
      <Splash />
      <Nav />
      <main id="top">
        <Hero />
        <TheGap />
        <WhatWeBuild />
        <SelectedWork />
        <HowWeWork />
        <Guarantee />
        <Team />
        <Contact />
      </main>
      <Footer />
      <ClientEffects />
    </Providers>
  );
}
