"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import { useLang } from "../LangProvider";

/**
 * Trabajo real.
 *
 * SENI vende video y el sitio no tenia ni un segundo. Estos son los reels
 * publicados en @seni.marketing, embebidos con el mecanismo oficial de
 * Instagram: el video lo sirve Instagram, con su atribucion intacta, asi que
 * no hay que descargar nada ni pedir permisos aparte.
 *
 * El script se carga solo cuando la seccion se acerca a pantalla. Son tres
 * iframes de terceros y no tienen por que pesar en la primera carga.
 */
const REELS = [
  "https://www.instagram.com/reel/DXadXfDjqw6/",
  "https://www.instagram.com/reel/DXAskeCDppi/",
  "https://www.instagram.com/reel/DWxCUC_jqjB/",
];

export default function Work() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCargar(true);
        io.disconnect();
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!cargar) return;
    const YA = "instagram-embed";
    const procesar = () =>
      (window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm?.Embeds.process();

    if (document.getElementById(YA)) {
      procesar();
      return;
    }
    const s = document.createElement("script");
    s.id = YA;
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = procesar;
    document.body.appendChild(s);
  }, [cargar]);

  return (
    <section className="section work" data-tone="dark" id="trabajo" ref={ref}>
      <div className="aurora" aria-hidden="true" />
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="h2">{t.work.title}</h2>
          <p className="lede">{t.work.lede}</p>
        </Reveal>

        <ul className="reels">
          {REELS.map((url, i) => (
            <Reveal as="li" key={url} className="reel" delay={i * 90}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url} rel="noopener noreferrer" target="_blank">
                  {t.work.fallback}
                </a>
              </blockquote>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="work-more">
          <a href="https://www.instagram.com/seni.marketing/" rel="noopener noreferrer" target="_blank">
            {t.work.more}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
