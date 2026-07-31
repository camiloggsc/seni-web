import { NextResponse } from "next/server";

/**
 * Recibe las solicitudes de evaluacion.
 *
 * Configura CONTACT_WEBHOOK_URL con el endpoint que reciba los prospectos
 * (Zapier, Make, tu CRM o una funcion que mande correo). Sin esa variable el
 * endpoint responde 503 en produccion a proposito: es preferible que el
 * formulario avise del fallo a que un prospecto se pierda en silencio.
 */

type Payload = Record<string, unknown>;

const REQUIRED = ["name", "business", "email", "phone", "goal"] as const;

function isValid(body: Payload) {
  for (const key of REQUIRED) {
    const value = body[key];
    if (typeof value !== "string" || value.trim().length === 0) return false;
  }
  const email = String(body.email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // La trampa solo la llena un bot.
  if (typeof body["company-url"] === "string" && body["company-url"].length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const lead = {
    name: String(body.name).slice(0, 120),
    business: String(body.business).slice(0, 120),
    email: String(body.email).slice(0, 160),
    phone: String(body.phone).slice(0, 40),
    budget: String(body.budget ?? "").slice(0, 80),
    goal: String(body.goal).slice(0, 2000),
    lang: body.lang === "en" ? "en" : "es",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] Falta CONTACT_WEBHOOK_URL: el prospecto no se guardo.", lead.email);
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.info("[contact] Sin CONTACT_WEBHOOK_URL. Prospecto en consola:", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (error) {
    console.error("[contact] El webhook fallo:", error);
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
