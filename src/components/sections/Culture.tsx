"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";

/**
 * Manifiesto.
 *
 * Antes era título a la izquierda y lista de tres a la derecha, igual que la
 * sección del problema. Dos secciones con la misma forma hacían la página
 * plana. Aquí el texto crece hasta ser el elemento gráfico y las líneas se
 * escalonan, para que haya un momento de escala en todo el recorrido.
 */
export default function Culture() {
  const { t } = useLang();

  return (
    <section className="section manifesto" data-tone="light" id="nosotros">
      <div className="shell">
        <Reveal as="p" className="eyebrow">
          {t.culture.eyebrow}
        </Reveal>

        <ol className="beats">
          {t.culture.beats.map((beat, i) => (
            <Reveal as="li" key={i} className="beat" delay={i * 90}>
              <h2 className="beat-line">{beat.line}</h2>
              <p className="beat-note">{beat.note}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" className="beats-closer">
          {t.culture.closer}
        </Reveal>
      </div>
    </section>
  );
}
