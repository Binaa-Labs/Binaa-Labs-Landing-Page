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

export default function Home() {
  return (
    <>
      <div className="ambient-grid" aria-hidden="true" />
      <Nav />
      <main id="top" style={{ position: "relative", zIndex: 1 }}>
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
    </>
  );
}
