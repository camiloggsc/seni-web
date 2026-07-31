"use client";

import dynamic from "next/dynamic";
import { useLang } from "../LangProvider";
import Rich from "../Rich";

// El globo solo existe en el cliente: es puro WebGL y no aporta nada al HTML.
const ServiceGlobe = dynamic(() => import("../ServiceGlobe"), { ssr: false });

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <section className="section hero" data-tone="dark" id="top">
      <div className="aurora" aria-hidden="true" />

      <div className="shell hero-head">
        <p className="eyebrow">{t.hero.eyebrow}</p>

        {/* key={lang} rearma el titular al cambiar de idioma */}
        <h1 className="hero-title" key={lang}>
          <span className="hero-line">{t.hero.titleLead}</span>{" "}
          <span className="hero-line grad-text">
            <Rich text={t.hero.titleAccent} />
          </span>
        </h1>

        <div className="hero-aside">
          <p className="hero-tagline">{t.hero.tagline}</p>

          {/* Los tres servicios con el mismo separador que usa la bio. */}
          <ul className="hero-chips">
            {t.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>

          <p className="lede hero-lede">{t.hero.lede}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#contacto">
              {t.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#sistema">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="hero-place">{t.hero.place}</p>
          <p className="hero-note">{t.hero.note}</p>
        </div>
      </div>

      <div className="hero-globe">
        <ServiceGlobe services={t.hero.globe} label={t.hero.globeAlt} />
      </div>
    </section>
  );
}
