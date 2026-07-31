"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";
import Rich from "../Rich";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="section testimonials" data-tone="light">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.testimonials.eyebrow}</p>
          <h2 className="h2">
            <Rich text={t.testimonials.title} />
          </h2>
        </Reveal>

        <ul className="quotes">
          {/* La lista es fija y no se reordena, asi que el indice sirve de
              clave. Con el texto fallaba: los marcadores son identicos. */}
          {t.testimonials.items.map((item, i) => (
            <Reveal as="li" key={i} className="quote" delay={i * 80}>
              <figure>
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote-name">{item.name}</span>
                  <span className="quote-role">{item.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="placeholder-note">{t.testimonials.note}</p>
      </div>
    </section>
  );
}
