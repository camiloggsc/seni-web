"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import { useLang } from "../LangProvider";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * El sitio es estatico, asi que el formulario va directo a un servicio de
 * formularios (Web3Forms, Formspree, Zapier...). La URL se define al compilar
 * con NEXT_PUBLIC_FORM_ENDPOINT. Si falta, el envio falla a proposito y la
 * persona ve el aviso para escribir por Instagram: peor seria decirle "listo,
 * ya nos llego" y que el mensaje no exista en ningun lado.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function Contact() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const f = t.contact.form;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const data = Object.fromEntries(new FormData(form).entries());
    // La trampa solo la llena un bot: fingimos exito y no mandamos nada.
    if (typeof data["company-url"] === "string" && data["company-url"].length > 0) {
      form.reset();
      setStatus("sent");
      return;
    }

    if (!ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          lang,
          subject: `Nueva solicitud de evaluacion — ${data.business ?? ""}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact" data-tone="dark" id="contacto">
      <div className="aurora" aria-hidden="true" />
      <div className="shell contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="h2">{t.contact.title}</h2>
          <p className="lede">{t.contact.lede}</p>
          <ul className="contact-bullets">
            {t.contact.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="contact-form-wrap">
          <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
            <div className="field">
              <label htmlFor="name">{f.name.label}</label>
              <input id="name" name="name" type="text" required placeholder={f.name.placeholder} autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="business">{f.business.label}</label>
              <input id="business" name="business" type="text" required placeholder={f.business.placeholder} autoComplete="organization" />
            </div>

            <div className="field">
              <label htmlFor="email">{f.email.label}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={f.email.placeholder}
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
              />
            </div>

            <div className="field">
              <label htmlFor="phone">{f.phone.label}</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder={f.phone.placeholder}
                autoComplete="tel"
                inputMode="tel"
                spellCheck={false}
              />
            </div>

            <div className="field field-wide">
              <label htmlFor="budget">{f.budget.label}</label>
              <select id="budget" name="budget" defaultValue={f.budget.options[0]}>
                {f.budget.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field field-wide">
              <label htmlFor="goal">{f.goal.label}</label>
              <textarea id="goal" name="goal" rows={4} required placeholder={f.goal.placeholder} />
            </div>

            {/* Trampa para bots: invisible y fuera del arbol de accesibilidad. */}
            <p className="honeypot" aria-hidden="true">
              <label htmlFor="company-url">No llenar</label>
              <input id="company-url" name="company-url" type="text" tabIndex={-1} autoComplete="off" />
            </p>

            <div className="field-wide contact-submit">
              <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                {status === "sending" ? f.sending : f.submit}
              </button>
              <p className="contact-privacy">{f.privacy}</p>
            </div>

            <p className="form-status field-wide" role="status" data-state={status}>
              {status === "sent" ? f.success : status === "error" ? f.error : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
