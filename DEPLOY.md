# Publicar en seniagency.com

El dominio ya está en Hostinger y activo hasta 2027-06-06. Falta subir el
sitio a un hosting y apuntarle el DNS.

## 1. Recibir los prospectos del formulario

Hazlo **antes** de publicar. Sin esto el formulario devuelve error.

1. Entra a [Zapier](https://zapier.com) o [Make](https://make.com) (ambos
   tienen plan gratis) y crea un flujo con disparador **Webhook / Catch Hook**.
2. Como acción, elige "enviar correo" a la dirección de SENI.
3. Copia la URL del webhook que te dan.
4. Guárdala como variable `CONTACT_WEBHOOK_URL` en el panel del hosting.

El sitio manda un JSON con: `name`, `business`, `email`, `phone`, `budget`,
`goal`, `lang`, `receivedAt`.

## 2. Subir el sitio

Desde esta carpeta, en la terminal:

```bash
npx netlify-cli login      # abre el navegador, crea cuenta gratis
npx netlify-cli init       # crea el sitio, detecta Next.js solo
npx netlify-cli deploy --prod
```

Netlify detecta Next.js sin configuración. El plan gratis permite uso
comercial, que es el caso de SENI.

> Vercel también funciona (`npx vercel`) y es la plataforma nativa de
> Next.js, pero su plan gratis (Hobby) es solo para proyectos personales
> y no comerciales. Para un sitio de agencia haría falta el plan Pro.

## 3. Conectar el dominio

1. En el panel de Netlify: **Domain settings → Add custom domain →**
   `seniagency.com`.
2. Netlify te muestra los registros exactos a crear. Normalmente son dos.
3. En Hostinger: **Domains → seniagency.com → Manage → DNS**, y agrégalos.
4. El certificado HTTPS se emite solo. Los cambios de DNS pueden tardar
   desde minutos hasta unas horas.

## Antes de dar la dirección a nadie

- [ ] Correo y teléfono reales en `src/content/copy.ts` (buscar `PENDIENTE`)
- [ ] Métricas verificadas de Meta Ads y Google Ads, o dejar la fila oculta
- [ ] Testimonios reales con autorización por escrito
- [ ] `CONTACT_WEBHOOK_URL` cargada y probada con un envío de prueba
