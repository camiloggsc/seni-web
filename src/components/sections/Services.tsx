"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";
import Rich from "../Rich";
import { Mark } from "../brand/Logo";

export default function Services() {
  const { t } = useLang();

  return (
    <section className="section services" data-tone="light" id="servicios">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2 className="h2">
            <Rich text={t.services.title} />
          </h2>
          <p className="lede">{t.services.lede}</p>
        </Reveal>

        <ul className="service-grid">
          {t.services.items.map((item, i) => (
            <Reveal as="li" key={i} className="service" delay={(i % 3) * 70}>
              <Mark className="service-mark" variant="mono" aria-hidden="true" />
              <h3 className="h3">{item.name}</h3>
              <p className="service-benefit">{item.benefit}</p>
              <p className="service-detail">{item.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
