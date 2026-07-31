"use client";

import { useEffect, useState } from "react";
import { Lockup } from "./brand/Logo";
import { useLang } from "./LangProvider";
import type { Lang } from "@/content/copy";

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const options: Lang[] = ["es", "en"];

  return (
    <div className="lang" role="group" aria-label={t.nav.langLabel}>
      <span className="lang-pill" data-pos={lang} aria-hidden="true" />
      {options.map((code) => (
        <button
          key={code}
          type="button"
          className="lang-option"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => document.getElementById("menu")?.hidePopover?.();

  return (
    <header className="header" data-scrolled={scrolled}>
      <a className="skip-link visually-hidden" href="#contenido">
        {t.nav.skip}
      </a>

      <div className="shell header-inner">
        <a href="#top" className="header-logo" aria-label="SENI marketing">
          <Lockup className="header-lockup" />
        </a>

        <nav className="header-nav" aria-label="Principal">
          <ul>
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LangSwitch />
          <a className="btn btn-primary header-cta" href="#contacto">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="header-burger"
            popoverTarget="menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Popover nativo: cierre con Esc y clic fuera sin codigo extra.
          toggle mantiene aria-expanded del boton en sintonia con el estado real. */}
      <div
        id="menu"
        className="menu"
        popover="auto"
        onToggle={(e) => setMenuOpen((e as unknown as ToggleEvent).newState === "open")}
      >
        <nav aria-label={t.nav.menuOpen}>
          <ul>
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary" href="#contacto" onClick={close}>
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
