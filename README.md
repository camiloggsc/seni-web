# SENI Marketing — sitio web

Landing de una página para **SENI Marketing**, agencia de contenido, Paid Ads
y estrategia en Houston, Texas.

- **En vivo:** https://seniagency.com
- **Repo:** https://github.com/camiloggsc/seni-web
- **Instagram:** [@seni.marketing](https://www.instagram.com/seni.marketing/)

---

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila el sitio estático en `./out` |
| `npm run lint` | Revisa el código |
| `npx tsc --noEmit` | Revisa los tipos |

## Cómo se publica

Cada `git push` a `main` dispara el workflow de GitHub Actions, que compila y
publica en GitHub Pages. Tarda unos 50 segundos.

```
git push origin main  →  Actions compila  →  Pages sirve  →  seniagency.com
```

El avance se ve en [Actions](https://github.com/camiloggsc/seni-web/actions).
Palomita verde significa que ya está en vivo.

**No agregues `public/CNAME`.** En despliegues por Actions el dominio se
configura en Settings → Pages. Si el archivo viaja dentro del artefacto, cada
despliegue reaplica el dominio y reinicia la emisión del certificado HTTPS,
que se queda rebotando en `bad_authz` sin salir nunca. Nos costó tres horas
averiguarlo.

### El DNS

El dominio está en Hostinger, con los nameservers de Hostinger. Solo hay
registros apuntando a GitHub:

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    camiloggsc.github.io
```

---

## Cómo está armado

**Next.js 16** con App Router, exportado como sitio estático (`output: 'export'`).
No hay servidor: GitHub Pages solo sirve archivos. **Tailwind v4** carga los
tokens, pero casi todo el diseño vive en CSS propio con propiedades
personalizadas.

```
src/
  app/
    globals.css      Sistema de diseño completo. Tokens, secciones, componentes.
    layout.tsx       Fuentes, metadatos, Open Graph, viewport.
    page.tsx         Orden de las secciones y datos estructurados JSON-LD.
    icon.svg         Favicon, generado del vector real del manual de marca.
  content/
    copy.ts          TODO el texto, en español e inglés. Empieza por aquí.
  components/
    brand/           Logo y vectores extraídos del manual (no redibujados).
    LangProvider     Estado del idioma y conmutador ES/EN.
    ServiceGlobe     El globo del hero, en WebGL.
    Viewfinder       El encuadre de cámara que rodea al globo.
    Rich             Renderiza los acentos *itálica* y ==resaltado== del copy.
    Reveal           Aparición al entrar en pantalla.
    Nav              Encabezado, menú móvil y conmutador de idioma.
    sections/        Una por sección de la página.
public/
  og.png             Imagen que sale al compartir el link.
```

### El sistema de diseño

Los tokens salen del manual de marca (`SENI mkt/Presentacion/presentacion.pdf`):

```
#3B63E2  azul        #C31DAF  magenta       #4D0783  violeta
#1A1C21  tinta       #56C7F0  cian (del degradado del wallpaper)
```

Las secciones alternan entre claro y oscuro con `data-tone="light|dark"`.
Los mismos tokens semánticos (`--text`, `--surface`, `--rule`) cambian de valor
según el tono, así que un componente funciona en los dos sin condicionales.
Donde cambia el tono aparece sola una curva, con un selector de hermano
adyacente.

La tipografía de marca es **Galyon**, que no tiene licencia web. Se usa
**Outfit** como sustituta (mismas terminaciones planas y 'a' de doble piso),
**Instrument Sans** para texto e **Instrument Serif** en itálica como único
acento de contraste.

### Cómo editar el texto

Todo vive en `src/content/copy.ts`, en dos bloques: `es` y `en`. Dentro de
cualquier título se pueden marcar acentos:

```ts
title: "Qué decir, cómo decirlo y *a quién llegarle*."   // itálica serif
title: "Escribimos las campañas ==dos veces==."          // resaltado de marca
```

Los componentes ya saben interpretarlos, no hay que tocar código.

Varias secciones **se ocultan solas si no hay datos reales**: los testimonios
sin cita, la fila de cifras en cero, el correo y el teléfono vacíos, y la
métrica de cada caso. Es a propósito: publicar "PENDIENTE" donde va la prueba
social hace más daño que no tener la sección.

---

## Lo que falta antes de promocionarlo

### 1. El formulario no manda a ningún lado

Es lo único que puede costar un cliente hoy. Al ser un sitio estático no hay
servidor que reciba el envío, así que va directo a un servicio de formularios.

1. Crea una cuenta en [Web3Forms](https://web3forms.com) o
   [Formspree](https://formspree.io) y consigue la URL del endpoint.
2. En GitHub: **Settings → Secrets and variables → Actions → Variables**,
   crea `NEXT_PUBLIC_FORM_ENDPOINT` con esa URL.
3. Empuja cualquier cambio para que se recompile.

Sin esa variable el formulario **avisa del fallo** y manda a la persona a
Instagram. Es deliberado: peor sería decirle "listo, ya nos llegó" y que el
mensaje no exista en ningún lado.

### 2. Datos que solo tiene SENI

En `copy.ts`, el bloque de comentario del inicio lista las cifras que se
escribieron para que el texto fuera concreto, pero que son **promesas que el
cliente va a exigir**:

- "Una llamada de 45 minutos"
- "Diagnóstico por escrito en 3 días hábiles"
- "Entre 15 y 20 piezas por sesión"
- "Contestamos el mismo día"

Si no coinciden con cómo trabaja SENI, hay que corregirlas o quitarlas.

Faltan además el **correo y el teléfono reales**, los **testimonios con
autorización por escrito**, y las **métricas verificadas** sacadas de los
reportes de Meta Ads y Google Ads.

### 3. Video propio

La sección de trabajo usa el embebido oficial de Instagram, con el pie
recortado por altura fija para que no salgan los contadores de me gusta. Eso
es frágil: si Instagram cambia la altura de su embed, hay que reajustar
`--alto-reel` en `globals.css`.

Con los archivos originales de video se resuelve mejor en todo: sin marco de
terceros, mejor calidad, control total del diseño, y la página carga bastante
más rápido al ahorrarse tres iframes y un script externo.

---

## Decisiones que conviene conocer

**Por qué sitio estático y no servidor.** GitHub Pages es gratis para siempre
y ya es donde vive el otro proyecto. El costo es que no hay endpoint propio
para el formulario.

**Por qué el idioma no se detecta solo.** Antes se miraba `navigator.language`
y eso reescribía la página al inglés después de hidratar: el HTML servido
siempre sale en español, así que el visitante veía el texto cambiar debajo.
Ahora solo se respeta una elección explícita en el conmutador.

**Por qué el globo lleva un encuadre de cámara.** El isotipo de SENI es un
marco con rayos saliendo, y el negocio es grabar. Así el globo deja de ser un
elemento genérico de agencia (dos de las tres referencias del cliente usan
uno) y pasa a ser lo que SENI tiene en la mira.

**Por qué el degradado no va sobre el texto.** Es el recurso que más delata
una plantilla, y competía con el globo detrás. Se reserva para el botón
principal y el isotipo.

---

## Accesibilidad y rendimiento

El sitio pasó una auditoría de siete dimensiones con verificación adversaria.
Lo que se sostiene hoy:

- Contrastes que cumplen AA en ambos tonos
- Foco visible en todo lo interactivo
- Áreas tocables de 44 px en pantallas táctiles
- `prefers-reduced-motion` respetado en el globo, las apariciones y la
  marquesina
- El globo se detiene fuera de pantalla y al cambiar de pestaña, y se
  recupera si el sistema le quita el contexto WebGL
- Datos estructurados de negocio local para Houston

Queda pendiente: el sitio bilingüe vive en una sola URL con el idioma decidido
por JavaScript, así que para los buscadores solo existe la versión en español.
Resolverlo bien pide rutas separadas (`/es` y `/en`) con `hreflang`.
