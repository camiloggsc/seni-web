"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";

/** Frase real publicada por SENI. Va textual, en español en ambos idiomas. */
export default function PullQuote() {
  const { t, lang } = useLang();

  return (
    <section className="section pullquote" data-tone="dark">
      <div className="aurora" aria-hidden="true" />
      <div className="shell">
        <Reveal as="figure">
          <blockquote>
            <p lang="es" className="display pullquote-text">
              {t.pullquote.text}
            </p>
          </blockquote>
          <figcaption>
            {t.pullquote.source}
            {lang === "en" ? " · in their own words" : " · en sus propias palabras"}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
