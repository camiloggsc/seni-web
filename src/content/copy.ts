export type Lang = "es" | "en";

/**
 * Todo el texto de la página vive aquí.
 *
 * Las frases de marca salen de material real de SENI:
 *  - "Marketing Everywhere" y "Let's get started" — manual de marca (presentacion.pdf, p.3)
 *  - "Marketing que conecta y convierte", "Content • Paid Ads • Strategy",
 *    "Ayudamos negocios a crecer online" — bio de @seni.marketing
 *  - "contenido que conecta + mensajes que venden + consistencia" — caption de @seni.marketing
 *
 * Los valores marcados con TODO son marcadores: reemplázalos con datos reales
 * antes de publicar.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CONFIRMAR CON YAIMA ANTES DE PROMOCIONAR EL SITIO
 *
 * Estas cifras las puse yo para que el copy fuera concreto, pero son
 * PROMESAS que el cliente va a exigir. Si no coinciden con cómo trabaja
 * SENI de verdad, hay que cambiarlas o quitarlas:
 *
 *   · "Una llamada de 45 minutos"          → system.steps[0], contact.bullets
 *   · "Diagnóstico por escrito en 3 días"  → contact.bullets
 *   · "Entre 15 y 20 piezas por sesión"    → system.steps[2], culture.points[0]
 *   · "Contestamos el mismo día"           → hero.note
 *   · "Al aire cuatro días después"        → culture.title y culture.body
 *
 * Lo mismo aplica a los problemas de la sección "El problema": están
 * escritos desde la tríada que SENI publicó ("qué decir, cómo decirlo y a
 * quién llegarle"), pero lo que de verdad cuentan los clientes en la
 * primera llamada solo lo sabe quien las toma.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const copy = {
  es: {
    htmlLang: "es",
    meta: {
      title: "SENI marketing — Contenido, Ads y estrategia en Houston",
      description:
        "Producimos el video, escribimos el mensaje y corremos los anuncios. Realtors, creadores y negocios de Houston.",
    },
    nav: {
      links: [
        { href: "#problema", label: "El problema" },
        { href: "#sistema", label: "Cómo trabajamos" },
        { href: "#servicios", label: "Servicios" },
        { href: "#resultados", label: "Trabajo" },
      ],
      cta: "Evalúa tu marketing",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      skip: "Saltar al contenido",
      langLabel: "Idioma del sitio",
    },
    // Bloque tomado literal de la bio de @seni.marketing.
    hero: {
      eyebrow: "Agencia de marketing",
      titleLead: "Ayudamos negocios",
      titleAccent: "a *crecer online*.",
      tagline: "Marketing que conecta y convierte",
      chips: ["Content", "Paid Ads", "Strategy"],
      place: "Houston · Social Media & Branding",
      lede: "Producimos el video, escribimos el mensaje y ponemos a correr los anuncios. Trabajamos con realtors, creadores y negocios de Houston.",
      ctaPrimary: "Solicita tu evaluación gratis",
      ctaSecondary: "Ver cómo trabajamos",
      note: "Contestamos el mismo día por mensaje. La primera llamada no cuesta nada.",
      // Los cinco servicios tal cual los lista la bio.
      globe: ["Content", "Paid Ads", "Strategy", "Social Media", "Branding"],
      globeAlt:
        "Animación: un globo de malla girando, con los servicios de SENI dispuestos en arco alrededor.",
      // El isotipo es un marco con rayos: la página se ve por el visor.
      frameStatus: "En cuadro",
      framePlace: "Houston, TX",
    },
    marquee: {
      label: "Con quién trabajamos",
      items: [
        "Realtors",
        "Fotógrafos y creadores",
        "Restaurantes",
        "Clínicas y consultorios",
        "Estudios y renta de espacios",
        "Marcas personales",
        "Retail",
        "Servicios profesionales",
      ],
    },
    // Los tres ejes salen textuales de un caption de @seni.marketing:
    // "es entender qué decir, cómo decirlo y a quién llegarle".
    // PENDIENTE: cuando Yaima diga qué le cuentan los clientes en la primera
    // llamada, esos testimonios reemplazan los cuerpos de abajo.
    problems: {
      eyebrow: "El problema",
      title: "Qué decir, cómo decirlo y *a quién llegarle*.",
      items: [
        {
          title: "Qué decir",
          body: "La mayoría de las cuentas publican lo que el negocio hace. Casi ninguna dice qué gana el cliente si compra, y esa es la frase que decide.",
        },
        {
          title: "Cómo decirlo",
          body: "El mismo mensaje rinde distinto en un reel, en un anuncio y en una llamada. Elegir mal el formato desperdicia una idea que sí servía.",
        },
        {
          title: "A quién llegarle",
          body: "Llegarle a todo Houston cuesta caro y convierte poco. La segmentación decide cuánto pagas por cada persona que sí te iba a comprar.",
        },
      ],
      closer: {
        lead: "Los tres tienen que apuntar al mismo lado.",
        body: "El mensaje lo escribe uno, el video lo graba otro y los ads los corre un tercero. Esas tres personas nunca se sentaron a hablar entre sí, y así cada quien entrega bien lo suyo mientras el negocio no se mueve.",
      },
    },
    // Frase publicada por SENI en su propio Facebook. Va textual.
    pullquote: {
      text: "Los resultados que buscas están en el trabajo que evades.",
      source: "SENI marketing",
    },
    system: {
      eyebrow: "Cómo trabajamos",
      title: "Qué pasa desde que nos escribes hasta el *primer reporte*.",
      lede: "La primera semana no grabamos nada. Necesitamos entender qué vendes y a quién antes de decidir cómo se ve.",
      steps: [
        {
          title: "Te escuchamos",
          body: "Una llamada de 45 minutos con quien conoce el negocio de verdad. Qué vendes, quién te compra, qué ya intentaste y cuánto puedes invertir al mes.",
          out: "Diagnóstico por escrito",
        },
        {
          title: "Armamos el mensaje",
          body: "Elegimos una promesa y la manera de decirla. Si tu oferta no cabe en una frase que tu cliente entienda a la primera, todavía no está lista para pautarse.",
          out: "Mensaje y oferta",
        },
        {
          title: "Grabamos",
          body: "Llegamos con cámara, luces y micrófono, o nos vemos en estudio. Sales tú, sale tu equipo o resolvemos con producto. De un día de grabación salen entre 15 y 20 piezas.",
          out: "Video, foto y piezas",
        },
        {
          title: "Publicamos",
          body: "El contenido orgánico y los ads salen del mismo material y cuentan la misma historia. Meta, Google o TikTok según dónde esté tu cliente, no según la moda.",
          out: "Calendario y campañas",
        },
        {
          title: "Medimos",
          body: "Al mes te llega un reporte con la inversión, los leads que entraron y el costo de cada uno. Media hora de junta para decidir qué se repite.",
          out: "Reporte mensual",
        },
      ],
    },
    services: {
      eyebrow: "Servicios",
      title: "En qué te podemos *ayudar*.",
      lede: "Contrata lo que te haga falta. Si nos pides algo que a nuestro juicio todavía no vas a necesitar, te lo decimos antes de cotizarlo.",
      items: [
        {
          name: "Creación de contenido",
          benefit: "Reels y video hechos donde trabajas, con tu gente y tu producto.",
          detail:
            "Producción completa: guion, grabación, edición y corrección de color. Vertical para redes, entrevistas, eventos, foto de producto y de marca personal.",
        },
        {
          name: "Paid Ads",
          benefit: "Cada mes vas a tener el costo exacto de traer un lead nuevo.",
          detail:
            "Meta Ads, Google Ads y TikTok Ads. Configuración de medición, pruebas de creativos y control de presupuesto.",
        },
        {
          name: "Estrategia de redes sociales",
          benefit: "Saber qué decir, cómo decirlo y a quién le estás hablando.",
          detail:
            "Mensaje, oferta, calendario y prioridades del trimestre. Una junta mensual donde se revisan decisiones en vez de gráficas.",
        },
        {
          name: "Redes sociales",
          benefit: "Tu marca aparece cada semana y tú ya no tienes que inventar qué subir el domingo en la noche.",
          detail:
            "Calendario, redacción, publicación y respuesta a comentarios y mensajes.",
        },
        {
          name: "Posicionamiento de marca",
          benefit: "Que tu negocio se vea del tamaño que ya tiene.",
          detail:
            "Logo, paleta, tipografía, aplicaciones y manual de uso. También ordenamos marcas que ya existen y están sueltas.",
        },
        {
          name: "Sitio web y landing pages",
          benefit: "Que el clic termine en una cita y no en una página que tarda seis segundos en abrir.",
          detail:
            "Sitios rápidos, con formulario, WhatsApp y medición conectada desde el primer día.",
        },
      ],
    },
    results: {
      eyebrow: "Trabajo",
      title: "Con quién *hemos trabajado*.",
      lede: "Comparamos cada cuenta contra cómo estaba el mes que llegamos. Ese es el único punto de partida que los dos podemos verificar.",
      // TODO: SENI es una operación joven. No publiques estas cifras hasta que
      // salgan de tus propios reportes de Meta/Google. Inventarlas es un riesgo real.
      stats: [
        { value: 0, suffix: "x", label: "Retorno sobre la inversión publicitaria" },
        { value: 0, suffix: "%", label: "Baja en el costo por lead a los 90 días" },
        { value: 0, suffix: "+", label: "Piezas de contenido producidas al mes" },
        { value: 0, suffix: "", label: "Negocios acompañados" },
      ],
      statsNote:
        "PENDIENTE: llenar con cifras sacadas de tus reportes de Meta Ads y Google Ads. Si aún no las tienes, quita esta fila completa en vez de estimar.",
      cases: [
        {
          tag: "Realtor",
          title: "Video semanal, todas las semanas",
          body: "Estrategia de contenido para una agente de bienes raíces en Houston: qué decir, cómo decirlo y a quién llegarle. Reels de comunidades, tips para compradores primerizos y respuesta a mensajes.",
          metric: "PENDIENTE: métrica real",
        },
        {
          tag: "Fotógrafa / creadora",
          title: "Branding en video para una marca personal",
          body: "Detrás de cámaras y piezas de marca grabadas mientras trabajaba, para que su portafolio se vea tan bien como lo que produce.",
          metric: "PENDIENTE: métrica real",
        },
        {
          tag: "Estudio de renta",
          title: "Contenido para llenar el calendario de reservas",
          body: "Piezas de espacio y sesión para un estudio de Houston, dirigidas a creadores y dueños de negocio que necesitan un lugar donde grabar.",
          metric: "PENDIENTE: métrica real",
        },
      ],
      casesNote:
        "Casos basados en trabajo real de @seni.marketing. Antes de publicar: pide autorización por escrito para usar el nombre de cada cliente y sustituye las métricas.",
    },
    // Manifiesto: tres golpes cortos a escala grande, no un párrafo con lista.
    culture: {
      eyebrow: "Por qué nosotros",
      beats: [
        {
          line: "Grabamos nosotros.",
          note: "Cámara, luces y edición con equipo propio. Nada se subcontrata, así que nada espera turno.",
        },
        {
          line: "Escribimos nosotros.",
          note: "El guion sale del mismo lado que la campaña. Por eso el reel y el anuncio cuentan la misma historia.",
        },
        {
          line: "Y te decimos qué pasó.",
          note: "Un reporte al mes con lo que se invirtió y lo que entró. Sin capturas de alcance.",
        },
      ],
      closer: "Una sola persona te contesta y responde por todo el trabajo. No vas a explicar tu negocio cinco veces.",
    },
    testimonials: {
      eyebrow: "Clientes",
      title: "Lo que dicen los que *ya trabajan* con nosotros.",
      // TODO: sustituir por testimonios reales con autorización por escrito.
      note: "PENDIENTE: reemplazar con citas reales de tus clientes y su autorización por escrito.",
      items: [
        {
          quote: "PENDIENTE: cita real del cliente.",
          name: "Nombre del cliente",
          role: "Puesto, Nombre del negocio",
        },
        {
          quote: "PENDIENTE: cita real del cliente.",
          name: "Nombre del cliente",
          role: "Puesto, Nombre del negocio",
        },
        {
          quote: "PENDIENTE: cita real del cliente.",
          name: "Nombre del cliente",
          role: "Puesto, Nombre del negocio",
        },
      ],
    },
    contact: {
      eyebrow: "Let's get started",
      title: "Cuéntanos *qué traes entre manos*.",
      lede: "Revisamos lo que ya tienes (redes, ads, sitio, medición) y te decimos qué arreglaríamos primero. Sale gratis y no queda ningún compromiso de contratarnos.",
      bullets: [
        "Una llamada de 45 minutos",
        "Diagnóstico por escrito en 3 días hábiles",
        "Un plan con prioridades y rango de inversión",
      ],
      form: {
        name: { label: "Tu nombre", placeholder: "María López" },
        business: { label: "Negocio", placeholder: "Nombre del negocio" },
        email: { label: "Correo", placeholder: "maria@negocio.com" },
        phone: { label: "Teléfono o WhatsApp", placeholder: "(832) 000-0000" },
        goal: {
          label: "Qué necesitas resolver",
          placeholder: "Cuéntanos en una o dos frases qué está pasando hoy.",
        },
        budget: {
          label: "Presupuesto mensual aproximado",
          options: [
            "Todavía no lo sé",
            "Menos de $500 USD",
            "$500 a $1,500 USD",
            "$1,500 a $3,000 USD",
            "Más de $3,000 USD",
          ],
        },
        submit: "Solicitar mi evaluación",
        sending: "Enviando…",
        success: "Listo, ya nos llegó. Te contestamos hoy mismo.",
        error: "No se pudo enviar. Escríbenos directo por Instagram.",
        privacy: "Tus datos solo los usamos para contactarte. No los compartimos con nadie.",
        required: "Obligatorio",
      },
    },
    footer: {
      tagline: "Marketing Everywhere. Contenido, Ads y estrategia para negocios de Houston.",
      // TODO: correo y teléfono reales de SENI.
      contact: {
        label: "Contacto",
        email: "PENDIENTE@senimarketing.com",
        phone: "(832) 000-0000",
        city: "Houston, TX",
      },
      social: { label: "Redes" },
      navLabel: "Secciones",
      rights: "Todos los derechos reservados.",
      credits: "SENI marketing es una marca registrada.",
    },
  },

  en: {
    htmlLang: "en",
    meta: {
      title: "SENI marketing — Content, Ads and strategy in Houston",
      description:
        "We produce the video, write the message and run the ads. Realtors, creators and Houston businesses.",
    },
    nav: {
      links: [
        { href: "#problema", label: "The problem" },
        { href: "#sistema", label: "How we work" },
        { href: "#servicios", label: "Services" },
        { href: "#resultados", label: "Work" },
      ],
      cta: "Review my marketing",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skip: "Skip to content",
      langLabel: "Site language",
    },
    hero: {
      eyebrow: "Marketing agency",
      titleLead: "We help businesses",
      titleAccent: "*grow online*.",
      tagline: "Marketing that connects and converts",
      chips: ["Content", "Paid Ads", "Strategy"],
      place: "Houston · Social Media & Branding",
      lede: "We produce the video, write the message and get the ads running. We work with realtors, creators and Houston businesses.",
      ctaPrimary: "Get your free marketing review",
      ctaSecondary: "See how we work",
      note: "We answer the same day by message. The first call costs nothing.",
      // The five services exactly as the bio lists them.
      globe: ["Content", "Paid Ads", "Strategy", "Social Media", "Branding"],
      globeAlt:
        "Animation: a rotating wireframe globe with SENI's services arranged in an arc around it.",
      frameStatus: "In frame",
      framePlace: "Houston, TX",
    },
    marquee: {
      label: "Who we work with",
      items: [
        "Realtors",
        "Photographers and creators",
        "Restaurants",
        "Clinics and practices",
        "Studios and rental spaces",
        "Personal brands",
        "Retail",
        "Professional services",
      ],
    },
    problems: {
      eyebrow: "The problem",
      title: "What to say, how to say it and *who to reach*.",
      items: [
        {
          title: "What to say",
          body: "Most accounts post what the business does. Almost none say what the customer gets out of buying, and that is the line that decides.",
        },
        {
          title: "How to say it",
          body: "The same message lands differently in a reel, in an ad and on a call. Picking the wrong format wastes an idea that was working.",
        },
        {
          title: "Who to reach",
          body: "Reaching all of Houston costs a lot and converts little. Targeting decides what you pay for each person who was going to buy anyway.",
        },
      ],
      closer: {
        lead: "All three have to point the same way.",
        body: "One person writes the message, another shoots the video, a third runs the ads. Those three have never sat in a room together, so each one delivers their piece fine while the business stays put.",
      },
    },
    // Frase publicada por SENI en su propio Facebook. Se deja en espanol a proposito.
    pullquote: {
      text: "Los resultados que buscas están en el trabajo que evades.",
      source: "SENI marketing",
    },
    system: {
      eyebrow: "How we work",
      title: "What happens between your first message and the *first report*.",
      lede: "We shoot nothing the first week. We need to know what you sell and who buys it before we decide how any of it looks.",
      steps: [
        {
          title: "We listen",
          body: "A 45-minute call with whoever actually knows the business. What you sell, who buys it, what you've already tried and what you can spend per month.",
          out: "Written diagnosis",
        },
        {
          title: "We build the message",
          body: "We pick one promise and how to say it. If your offer doesn't fit in a sentence your client gets on the first read, it isn't ready to put money behind.",
          out: "Message and offer",
        },
        {
          title: "We shoot",
          body: "We arrive with camera, lights and a mic, or we meet at the studio. You're on camera, your team is, or we work with the product. One shoot day gives us 15 to 20 pieces.",
          out: "Video, photo and assets",
        },
        {
          title: "We publish",
          body: "Organic content and paid ads come out of the same footage and tell the same story. Meta, Google or TikTok based on where your client is, not what's trending.",
          out: "Calendar and campaigns",
        },
        {
          title: "We measure",
          body: "Once a month you get a report with the spend, the leads that came in and the cost of each one. Half an hour on a call to decide what gets repeated.",
          out: "Monthly report",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "What we can *help you* with.",
      lede: "Hire whatever you actually need. If you ask for something we think you don't need yet, we say so before we quote it.",
      items: [
        {
          name: "Content and video",
          benefit: "Reels and video shot where you work, with your people and your product.",
          detail:
            "Full production: script, shoot, edit and color. Vertical for social, interviews, events, product and personal-brand photography.",
        },
        {
          name: "Paid Ads",
          benefit: "Every month you get the exact cost of bringing in a new lead.",
          detail:
            "Meta Ads, Google Ads and TikTok Ads. Tracking setup, creative testing and budget control.",
        },
        {
          name: "Strategy",
          benefit: "Knowing what to say, how to say it and who you're saying it to.",
          detail:
            "Message, offer, calendar and quarterly priorities. A monthly call where we go through decisions instead of charts.",
        },
        {
          name: "Social media",
          benefit: "Your brand shows up every week and you stop inventing posts on Sunday night.",
          detail:
            "Calendar, copywriting, publishing, and replies to comments and messages.",
        },
        {
          name: "Branding",
          benefit: "Your business looks the size it already is.",
          detail:
            "Logo, palette, type, applications and a usage guide. We also tidy up brands that exist but sit scattered.",
        },
        {
          name: "Website and landing pages",
          benefit: "The click ends in an appointment instead of a page that takes six seconds to open.",
          detail:
            "Fast sites with a form, WhatsApp and tracking wired up from day one.",
        },
      ],
    },
    results: {
      eyebrow: "Work",
      title: "Who we've *worked with*.",
      lede: "We compare each account against where it stood the month we arrived. That's the only starting point both of us can verify.",
      stats: [
        { value: 0, suffix: "x", label: "Return on ad spend" },
        { value: 0, suffix: "%", label: "Drop in cost per lead within 90 days" },
        { value: 0, suffix: "+", label: "Content pieces produced per month" },
        { value: 0, suffix: "", label: "Businesses supported" },
      ],
      statsNote:
        "TODO: fill from your own Meta Ads and Google Ads reports. If you don't have them yet, delete this row rather than estimate.",
      cases: [
        {
          tag: "Realtor",
          title: "Weekly video, every single week",
          body: "Content strategy for a Houston real estate agent: what to say, how to say it and who to reach. Community reels, first-time buyer tips and message handling.",
          metric: "TODO: real metric",
        },
        {
          tag: "Photographer / creator",
          title: "Video branding for a personal brand",
          body: "Behind-the-scenes and brand pieces shot while she worked, so her portfolio looks as good as what she produces.",
          metric: "TODO: real metric",
        },
        {
          tag: "Rental studio",
          title: "Content to fill the booking calendar",
          body: "Space and session pieces for a Houston studio, aimed at creators and business owners who need somewhere to shoot.",
          metric: "TODO: real metric",
        },
      ],
      casesNote:
        "Cases based on real @seni.marketing work. Before publishing: get written permission to use each client's name and replace the metrics.",
    },
    culture: {
      eyebrow: "Why us",
      beats: [
        {
          line: "We shoot it.",
          note: "Camera, lights and editing with our own gear. Nothing gets outsourced, so nothing waits in line.",
        },
        {
          line: "We write it.",
          note: "The script comes from the same place as the campaign. That is why the reel and the ad tell one story.",
        },
        {
          line: "And we tell you what happened.",
          note: "One report a month with what went in and what came back. No screenshots of reach.",
        },
      ],
      closer: "One person answers you and owns the whole job. You will not explain your business five times.",
    },
    testimonials: {
      eyebrow: "Clients",
      title: "What the people *already working with us* say.",
      note: "TODO: replace with real client quotes and written approval.",
      items: [
        {
          quote: "TODO: real client quote.",
          name: "Client name",
          role: "Role, Business name",
        },
        {
          quote: "TODO: real client quote.",
          name: "Client name",
          role: "Role, Business name",
        },
        {
          quote: "TODO: real client quote.",
          name: "Client name",
          role: "Role, Business name",
        },
      ],
    },
    contact: {
      eyebrow: "Let's get started",
      title: "Tell us *what you're working on*.",
      lede: "We go through what you already have (social, ads, site, tracking) and tell you what we'd fix first. It's free and it doesn't commit you to hiring us.",
      bullets: [
        "A 45-minute call",
        "Written diagnosis within 3 business days",
        "A plan with priorities and a budget range",
      ],
      form: {
        name: { label: "Your name", placeholder: "Maria Lopez" },
        business: { label: "Business", placeholder: "Business name" },
        email: { label: "Email", placeholder: "maria@business.com" },
        phone: { label: "Phone or WhatsApp", placeholder: "(832) 000-0000" },
        goal: {
          label: "What do you need to solve",
          placeholder: "Tell us in a sentence or two what's happening today.",
        },
        budget: {
          label: "Approximate monthly budget",
          options: [
            "I don't know yet",
            "Under $500 USD",
            "$500 to $1,500 USD",
            "$1,500 to $3,000 USD",
            "Over $3,000 USD",
          ],
        },
        submit: "Request my review",
        sending: "Sending…",
        success: "Got it. We'll get back to you today.",
        error: "That didn't go through. Message us on Instagram instead.",
        privacy: "We only use your details to contact you. We don't share them.",
        required: "Required",
      },
    },
    footer: {
      tagline: "Marketing Everywhere. Content, Ads and strategy for Houston businesses.",
      contact: {
        label: "Contact",
        email: "TODO@senimarketing.com",
        phone: "(832) 000-0000",
        city: "Houston, TX",
      },
      social: { label: "Social" },
      navLabel: "Sections",
      rights: "All rights reserved.",
      credits: "SENI marketing is a registered trademark.",
    },
  },
} as const;

export type Copy = (typeof copy)["es"];
