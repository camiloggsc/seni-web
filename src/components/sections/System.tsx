"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";
import Rich from "../Rich";

export default function System() {
  const { t } = useLang();

  return (
    <section className="section system" data-tone="dark" id="sistema">
      <div className="aurora" aria-hidden="true" />
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.system.eyebrow}</p>
          <h2 className="h2">
            <Rich text={t.system.title} />
          </h2>
          <p className="lede">{t.system.lede}</p>
        </Reveal>

        {/* Es una secuencia real, por eso va numerada y en lista ordenada. */}
        <ol className="steps">
          {t.system.steps.map((step, i) => (
            <Reveal as="li" key={i} className="step" delay={i * 70}>
              <span className="step-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="step-body">
                <h3 className="h3">{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <span className="step-out">{step.out}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
