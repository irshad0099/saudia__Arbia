import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedMarquee from "@/components/TrustedMarquee";
import Services from "@/components/Services";
import ImpactBanner from "@/components/ImpactBanner";
import AISection from "@/components/AISection";
import SectorsTree from "@/components/SectorsTree";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import Values from "@/components/Values";
import WhyUs from "@/components/WhyUs";
import Team from "@/components/Team";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Cursor />
      <Navbar />
      <Hero />
      <TrustedMarquee />
      <Services />
      <ImpactBanner />
      <AISection />
      <SectorsTree />
      <Industries />
      <Stats />
      <Values />
      <WhyUs />
      <Team />
      <Portfolio />
      <Process />
      <TechStack />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
