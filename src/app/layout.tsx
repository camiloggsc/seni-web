import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { copy } from "@/content/copy";
import "./globals.css";

/**
 * La marca usa Galyon, que no tiene licencia web.
 * Outfit es la geometrica libre mas cercana: mismas terminaciones planas,
 * 'a' de doble piso y altura de x parecida.
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

/**
 * La itálica de contraste. Sin ella todo era geométrico y frío: es lo que
 * separa una agencia latina de un dashboard de software.
 * Misma fundición que Instrument Sans, así que armonizan de fábrica.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: copy.es.meta.title,
  description: copy.es.meta.description,
  applicationName: "SENI marketing",
  openGraph: {
    title: copy.es.meta.title,
    description: copy.es.meta.description,
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    siteName: "SENI marketing",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c11",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${instrument.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
