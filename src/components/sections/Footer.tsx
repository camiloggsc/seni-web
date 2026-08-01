"use client";

import { useEffect, useState } from "react";
import { Lockup } from "../brand/Logo";
import { useLang } from "../LangProvider";

const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/seni.marketing/" },
  // TODO: agregar los perfiles reales cuando existan.
  { name: "TikTok", href: "https://www.tiktok.com/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61564070956542" },
];

export default function Footer() {
  const { t } = useLang();
  // Se anotan como string porque el copy usa "as const" y la cadena vacía
  // se estrecha a never dentro de la comprobación.
  const email: string = t.footer.contact.email;
  const phone: string = t.footer.contact.phone;
  // Se resuelve tras montar: calcularlo en render puede desincronizar
  // servidor y cliente justo en el cambio de anio.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="section footer" data-tone="dark">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Lockup className="footer-lockup" />
          <p>{t.footer.tagline}</p>
        </div>

        <nav className="footer-col" aria-label={t.footer.navLabel}>
          <h2 className="footer-heading">{t.footer.navLabel}</h2>
          <ul>
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-heading">{t.footer.contact.label}</h2>
          {/* Enlazar un correo o un teléfono falso es peor que no ponerlo:
              quien lo toca se queda sin manera de contactar. */}
          <ul>
            {email && (
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
              </li>
            )}
            <li>{t.footer.contact.city}</li>
          </ul>
        </div>

        <div className="footer-col">
          <h2 className="footer-heading">{t.footer.social.label}</h2>
          <ul>
            {SOCIAL.map((item) => (
              <li key={item.name}>
                <a href={item.href} rel="noopener noreferrer" target="_blank">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell footer-legal">
        <p>
          © {year ?? ""} <span translate="no">SENI marketing</span>. {t.footer.rights}
        </p>
        <p>{t.footer.credits}</p>
      </div>
    </footer>
  );
}
