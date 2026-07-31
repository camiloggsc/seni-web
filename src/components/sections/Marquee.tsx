"use client";

import { useLang } from "../LangProvider";

export default function Marquee() {
  const { t } = useLang();
  const items = t.marquee.items;

  return (
    <section className="section band" data-tone="dark" aria-label={t.marquee.label}>
      <div className="marquee">
        {/* La pista lleva dos copias de la lista y se desplaza -50%: el bucle
            no muestra huecos. La segunda copia queda fuera del arbol a11y. */}
        <div className="marquee-track">
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul aria-hidden="true">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
