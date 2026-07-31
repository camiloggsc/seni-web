"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";
import Rich from "../Rich";

export default function Culture() {
  const { t } = useLang();

  return (
    <section className="section culture" data-tone="light" id="nosotros">
      <div className="shell culture-grid">
        <Reveal className="culture-copy">
          <p className="eyebrow">{t.culture.eyebrow}</p>
          <h2 className="h2">
            <Rich text={t.culture.title} />
          </h2>
          {t.culture.body.map((para, i) => (
            <p className="lede" key={i}>
              {para}
            </p>
          ))}
        </Reveal>

        <ul className="culture-points">
          {t.culture.points.map((point, i) => (
            <Reveal as="li" key={i} className="culture-point" delay={i * 80}>
              <h3 className="h3">{point.title}</h3>
              <p>{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
