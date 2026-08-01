# Pendientes antes de promocionar el sitio

El sitio ya está en vivo en https://seniagency.com y funciona. Esto es lo que
falta para que aguante que le mandes el link a un cliente.

Ordenado por lo que más cuesta si no se hace.

---

## 🔴 1. El formulario no manda a ningún lado

**Hoy alguien llena la evaluación, ve un aviso de error, y tú no te enteras.**

El sitio es estático, así que no hay servidor propio que reciba los envíos.
Se resuelve con un servicio gratis:

1. Entra a [web3forms.com](https://web3forms.com), pon el correo donde quieres
   recibir los prospectos y copia la llave que te dan.
2. En GitHub, ve a
   [Settings → Secrets and variables → Actions → Variables](https://github.com/camiloggsc/seni-web/settings/variables/actions)
3. **New repository variable**, nombre `NEXT_PUBLIC_FORM_ENDPOINT`,
   valor `https://api.web3forms.com/submit`
4. Avísame y empujo un cambio para que se recompile.

> El formulario manda: nombre, negocio, correo, teléfono, presupuesto,
> qué necesita resolver, e idioma en que llenó.

---

## 🔴 2. Contacto real

El pie del sitio **no muestra correo ni teléfono** porque los que había eran
marcadores, y enlazarlos era peor que no ponerlos: quien los tocaba se
quedaba sin manera de contactar.

Hace falta:

- [ ] Correo de SENI
- [ ] Teléfono o WhatsApp
- [ ] ¿Hay dirección física en Houston? Sirve mucho para que Google lo
      encuentre en búsquedas locales

Van en `src/content/copy.ts`, buscando `footer.contact`.

---

## 🟠 3. Confirmar las cifras que están publicadas

Estas se escribieron para que el texto fuera concreto, pero **son promesas
que el cliente va a exigir**. Si no coinciden con cómo trabaja SENI, hay que
corregirlas.

| Dice el sitio | ¿Es cierto? |
|---|---|
| "Una llamada de 45 minutos" | ☐ |
| "Diagnóstico por escrito en 3 días hábiles" | ☐ |
| "De un día de grabación salen entre 15 y 20 piezas" | ☐ |
| "Contestamos el mismo día por mensaje" | ☐ |
| "La primera llamada no cuesta nada" | ☐ |

---

## 🟠 4. Prueba social

Tres secciones están vacías o incompletas porque no hay datos reales. Se
ocultan solas, así que el sitio no se ve roto, pero **le falta lo que más
convence**.

- [ ] **Testimonios.** Tres citas reales de clientes, con su autorización por
      escrito para publicarlas con nombre y negocio.
- [ ] **Métricas de los casos.** Sacadas de los reportes de Meta Ads y Google
      Ads, no estimadas.
- [ ] **Números generales.** Retorno sobre inversión, costo por lead, piezas
      al mes, negocios acompañados. Mientras estén en cero, esa fila no se
      dibuja.

> Regla que seguimos: si no sale de un reporte verificable, no se publica.
> Inventar credenciales en el sitio de una agencia joven es un riesgo real.

---

## 🟡 5. Video propio

La sección de trabajo usa los reels de Instagram embebidos. Funciona, pero:

- Depende de que Instagram no cambie su embed
- Carga tres iframes y un script de terceros
- No se puede controlar el diseño

**Con los archivos originales de Yaima se resuelve mejor en todo.** Idealmente:

- [ ] 3 o 4 videos cortos en horizontal o cuadrado, sin texto quemado
- [ ] 3 fotos fijas de una grabación real (cámara, luces, el equipo trabajando)
- [ ] Una foto decente de Yaima, para la parte de "una sola persona a cargo"

---

## 🟡 6. Decisión pendiente: el conmutador ES / EN

El sitio está completo en los dos idiomas y el conmutador funciona, pero para
los buscadores **solo existe la versión en español**, porque las dos viven en
la misma dirección y el idioma lo decide JavaScript.

Hay tres caminos:

1. **Dejarlo así.** Funciona para quien ya está en la página.
2. **Quitar el inglés.** Menos que mantener, y la mayoría del público de
   Houston lee español.
3. **Rutas separadas** (`seniagency.com/en`) con las señales que piden los
   buscadores. Es la correcta si quieres aparecer en búsquedas en inglés,
   y es la que más trabajo lleva.

---

## Cómo hacer cambios de texto

Casi todo lo de arriba se arregla editando **un solo archivo**:
`src/content/copy.ts`. Está dividido en `es` y `en`.

Después:

```bash
git add -A
git commit -m "lo que cambiaste"
git push
```

En unos 50 segundos está en vivo. Se ve el avance en
[Actions](https://github.com/camiloggsc/seni-web/actions).
