"use client";

import Reveal from "../Reveal";
import { useLang } from "../LangProvider";
import Rich from "../Rich";

export default function Problems() {
  const { t } = useLang();

  return (
    <section className="section problems" data-tone="light" id="problema">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.problems.eyebrow}</p>
          <h2 className="h2">
            <Rich text={t.problems.title} />
          </h2>
        </Reveal>

        <ul className="problem-list">
          {t.problems.items.map((item, i) => (
            <Reveal as="li" key={i} className="problem" delay={i * 60}>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="problem-closer">
          <p className="problem-closer-lead">{t.problems.closer.lead}</p>
          <p className="lede">{t.problems.closer.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
