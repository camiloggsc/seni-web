"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import { useLang } from "../LangProvider";

function Counter({ value, suffix, lang }: { value: number; suffix: string; lang: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const DURATION = 1100;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          // easeOutCubic: arranca rapido y se asienta
          setShown(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const decimals = Number.isInteger(value) ? 0 : 1;
  const formatted = new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(shown);

  return (
    <span ref={ref} className="stat-value grad-text">
      {formatted}
      {suffix}
    </span>
  );
}

export default function Results() {
  const { t, lang } = useLang();
  const hasStats = t.results.stats.some((stat) => stat.value > 0);

  return (
    <section className="section results" data-tone="dark" id="resultados">
      <div className="aurora" aria-hidden="true" />
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.results.eyebrow}</p>
          <h2 className="h2">{t.results.title}</h2>
          <p className="lede">{t.results.lede}</p>
        </Reveal>

        {/* Mientras las cifras estén en cero la fila no se dibuja: publicar
            "0x / 0%" se ve roto, y estimarlas sería inventar credenciales. */}
        {hasStats && (
          <>
            <ul className="stats">
              {t.results.stats.map((stat, i) => (
                <Reveal as="li" key={i} className="stat" delay={i * 60}>
                  <Counter value={stat.value} suffix={stat.suffix} lang={lang} />
                  <span className="stat-label">{stat.label}</span>
                </Reveal>
              ))}
            </ul>
            <p className="placeholder-note">{t.results.statsNote}</p>
          </>
        )}

        <ul className="cases">
          {t.results.cases.map((item, i) => (
            <Reveal as="li" key={i} className="case" delay={i * 80}>
              <span className="case-tag">{item.tag}</span>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
              <p className="case-metric">{item.metric}</p>
            </Reveal>
          ))}
        </ul>
        <p className="placeholder-note">{t.results.casesNote}</p>
      </div>
    </section>
  );
}
