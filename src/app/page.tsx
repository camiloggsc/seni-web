import { BrandGradientDefs } from "@/components/brand/Logo";
import { LangProvider } from "@/components/LangProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Problems from "@/components/sections/Problems";
import System from "@/components/sections/System";
import Services from "@/components/sections/Services";
import PullQuote from "@/components/sections/PullQuote";
import Work from "@/components/sections/Work";
import Results from "@/components/sections/Results";
import Culture from "@/components/sections/Culture";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * Datos estructurados para buscadores.
 *
 * Solo lleva lo verificable: nombre, sitio, zona y perfiles reales. Sin
 * teléfono ni dirección hasta tener los de verdad, porque un NAP falso le
 * hace más daño al posicionamiento local que no tener ninguno.
 * PENDIENTE: agregar telephone y address cuando Yaima los confirme.
 */
const DATOS_NEGOCIO = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SENI Marketing",
  url: "https://seniagency.com",
  image: "https://seniagency.com/og.png",
  description:
    "Agencia de marketing en Houston: creación de contenido, Paid Ads y estrategia de redes sociales.",
  areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
  knowsLanguage: ["es", "en"],
  sameAs: [
    "https://www.instagram.com/seni.marketing/",
    "https://www.facebook.com/profile.php?id=61564070956542",
  ],
};

export default function Page() {
  return (
    <LangProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATOS_NEGOCIO) }}
      />
      <BrandGradientDefs />
      <Nav />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Problems />
        <PullQuote />
        <System />
        <Services />
        <Work />
        <Results />
        <Culture />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
