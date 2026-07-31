import { BrandGradientDefs } from "@/components/brand/Logo";
import { LangProvider } from "@/components/LangProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Problems from "@/components/sections/Problems";
import System from "@/components/sections/System";
import Services from "@/components/sections/Services";
import PullQuote from "@/components/sections/PullQuote";
import Results from "@/components/sections/Results";
import Culture from "@/components/sections/Culture";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <LangProvider>
      <BrandGradientDefs />
      <Nav />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Problems />
        <PullQuote />
        <System />
        <Services />
        <Results />
        <Culture />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
