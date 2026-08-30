export type Lang = 'es' | 'en'

/**
 * Diccionario maestro. `es` define la forma; `en` debe cumplirla.
 * Todo el copy de la página vive aquí para revisión en un solo lugar.
 */
const es = {
  nav: {
    services: 'Servicios',
    projects: 'Proyectos',
    pricing: 'Precios',
    faq: 'FAQ',
    team: 'Equipo',
    discord: 'Discord',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  theme: {
    toDark: 'Cambiar a modo oscuro',
    toLight: 'Cambiar a modo claro',
  },
  lang: { toEn: 'Switch to English', toEs: 'Cambiar a español' },
  hero: {
    status: 'estado: contratables',
    title1: 'Sí, estamos',
    title2: 'desempleados.',
    title3: 'Por eso tu proyecto es la prioridad.',
    lead: 'Tres parados que convierten café en webs, apps y bots. Sin agencia de por medio: el que te cotiza es el que teclea.',
    ctaPrimary: 'Pedir presupuesto',
    ctaSecondary: 'Ver proyectos',
    terminal: '~/desempleados.dev $ hire --now',
    terminalReply: 'ok — cuéntanos qué necesitas',
    monitorTitle: 'monitor — desempleados.dev',
    monitor: [
      { proc: 'frontend', state: 'escribiendo…' },
      { proc: 'backend', state: 'compilando…' },
      { proc: 'diseño', state: 'iterando…' },
      { proc: 'rrhh', state: 'proceso terminado (exit 0)' },
    ],
  },
  stack: { label: 'stack que dominamos' },
  services: {
    label: '~/servicios',
    title: 'Lo que hacemos (y bien)',
    lead: 'Dos líneas de trabajo, cero plantillas recicladas. Cada proyecto sale del repositorio con tu nombre.',
    ctaFixed: 'Lo quiero',
    ctaQuote: 'Pedir presupuesto',
    fixedNote: 'Precio fijo, alcance cerrado',
    quoteNote: 'Presupuesto según alcance',
  },
  projects: {
    label: '~/proyectos',
    title: 'Lo que construimos cuando nadie nos paga',
    lead: 'Proyectos propios: nuestra forma de aprender, ensayar y demostrar nivel antes de que confíes en nosotros.',
    ctaDemo: 'Ver demo',
    ctaCode: 'Código',
    more: 'Más en GitHub',
    logLabel: 'git log --oneline',
    statuses: {
      live: 'en producción',
      beta: 'beta',
      wip: 'en progreso',
    } as Record<string, string>,
  },
  pricing: {
    label: '~/precios',
    title: 'Precios sin letra pequeña',
    lead: 'Punto de partida honesto: el monto final depende del alcance y lo sabes antes de empezar.',
    from: 'desde',
    quote: 'presupuesto',
    ctaFixed: 'Pedir este',
    ctaQuote: 'Cuéntame',
    note: '50% para arrancar, 50% al entregar. Entrega típica: 5–10 días una landing, 2–4 semanas una web o bot. Transferencia, PayPal o cripto.',
  },
  why: {
    label: '~/por-qué-nosotros',
    title: 'Lo que todos preguntan antes de pagarnos',
    lead: 'Y de paso, por qué elegirnos:',
    points: [
      {
        title: 'Hablas con quien programa',
        body: 'Sin intermediarios ni account managers: el dev que responde tu mensaje es el que escribe tu código.',
      },
      {
        title: 'Respuesta en horas, no semanas',
        body: 'Vivimos en Discord y el email. Empezamos este equipo entre trabajos: el tiempo libre sobra.',
      },
      {
        title: 'Nivel técnico sin precio de agencia',
        body: 'Código limpio, moderno y documentado, a precio de equipo pequeño. Revisa nuestros proyectos y juzga tú.',
      },
    ],
  },
  faq: {
    items: [
      {
        q: '¿Cuánto tarda un proyecto?',
        a: 'Una landing page: entre 5 y 10 días. Una web completa o un bot: de 2 a 4 semanas según alcance. Te damos una fecha estimada antes de empezar y la cumplimos.',
      },
      {
        q: '¿Cómo funcionan los pagos?',
        a: '50% para arrancar y 50% al entregar. Aceptamos transferencia, PayPal y, si lo prefieres, cripto.',
      },
      {
        q: '¿Qué necesito para empezar?',
        a: 'Solo una idea clara de lo que quieres. Nosotros te guiamos con preguntas concretas y proponemos la solución técnica. Si aún no lo tienes claro, el Discord es un buen lugar para pensarlo.',
      },
      {
        q: '¿El código es mío?',
        a: 'Sí. Entregamos el repositorio completo con documentación de instalación. Sin candados ni dependencia eterna hacia nosotros.',
      },
      {
        q: '¿Ofrecen mantenimiento?',
        a: 'Opcional, con precio fijo mensual. Y si prefieres volar solo, te dejamos todo documentado para que nadie te necesite.',
      },
      {
        q: '¿Por qué “desempleados”?',
        a: 'Porque empezamos este equipo entre trabajos y decidimos abrazarlo: sin jefes, sin reuniones inútiles y con todo el tiempo del mundo para tu proyecto.',
      },
    ],
  },
  community: {
    label: '~/comunidad',
    title: 'Espía el taller',
    lead: 'Construimos en público. Sigue lo que sale del repo antes que nadie.',
    discordTitle: 'Únete al Discord',
    discordBody: 'El taller abierto: preguntas, avances en vivo, revisiones de código y alguna que otra celebración cuando algo compila a la primera.',
    discordCta: 'Entrar al servidor',
    newsTitle: 'Newsletter sin spam',
    newsBody: 'Un email cuando sacamos algo nuevo. Ni uno más. Palabra de desempleados.',
    newsSample: 'último envío: “cómo montamos chambea-board en 3 findes”',
    newsPlaceholder: 'tu@correo.dev',
    newsCta: 'Avísame cuando publiquemos',
    newsSuccess: 'Listo, estás dentro. Te escribimos solo cuando haya novedades.',
    newsError: 'Ese email no parece un email. Revísalo e intenta de nuevo.',
    newsLabel: 'Tu email',
  },
  team: {
    label: '~/quienes-somos',
    title: 'Tres en paro, cero en plantilla',
    lead: 'Pocos, heavys y disponibles. Esto es lo que hace cada quien mientras busca trabajo… digo, mientras trabaja contigo.',
    roles: [
      {
        name: 'Frontend Dev',
        role: 'interfaces',
        bio: 'Convierte diseños en píxeles que no se rompen en el Safari de nadie.',
      },
      {
        name: 'Backend Dev',
        role: 'servidores y datos',
        bio: 'APIs, bases de datos y bots. Si se cae, es del hosting; si funciona, es suyo.',
      },
      {
        name: 'El que hace de todo',
        role: 'producto y caos',
        bio: 'Escribe copy, atiende el Discord, prueba todo tres veces y cobra a tiempo.',
      },
    ],
    verifyLabel: 'El historial completo, verificable:',
    verifyLink: 'github.com/desempleados-dev',
  },
  footer: {
    tagline: 'Hecho sin empleos, con café.',
    contact: 'Contacto',
    follow: 'Síguenos',
    sections: 'Secciones',
    rights: 'Todos los derechos reservados (los pocos que quedan).',
    status: 'sistemas operativos',
  },
}

type Dict = typeof es

const en: Dict = {
  nav: {
    services: 'Services',
    projects: 'Projects',
    pricing: 'Pricing',
    faq: 'FAQ',
    team: 'Team',
    discord: 'Discord',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  theme: {
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  lang: { toEn: 'Switch to English', toEs: 'Cambiar a español' },
  hero: {
    status: 'estado: contratables',
    title1: 'Yes, we are',
    title2: 'unemployed.',
    title3: 'That is why your project is the priority.',
    lead: 'Three jobless devs turning coffee into websites, apps and bots. No agency in between: whoever quotes your project is the one who types it.',
    ctaPrimary: 'Get a quote',
    ctaSecondary: 'See projects',
    terminal: '~/desempleados.dev $ hire --now',
    terminalReply: 'ok — tell us what you need',
    monitorTitle: 'monitor — desempleados.dev',
    monitor: [
      { proc: 'frontend', state: 'writing…' },
      { proc: 'backend', state: 'compiling…' },
      { proc: 'design', state: 'iterating…' },
      { proc: 'hr', state: 'process finished (exit 0)' },
    ],
  },
  stack: { label: 'stack we master' },
  services: {
    label: '~/services',
    title: 'What we do (and do well)',
    lead: 'Two lines of work, zero recycled templates. Every project leaves the repo with your name on it.',
    ctaFixed: 'I want this',
    ctaQuote: 'Get a quote',
    fixedNote: 'Fixed price, scoped deliverables',
    quoteNote: 'Quoted per project scope',
  },
  projects: {
    label: '~/projects',
    title: 'What we build when nobody pays us',
    lead: 'Our own projects: how we learn, rehearse and prove our level before you trust us with yours.',
    ctaDemo: 'Live demo',
    ctaCode: 'Code',
    more: 'More on GitHub',
    logLabel: 'git log --oneline',
    statuses: {
      live: 'in production',
      beta: 'beta',
      wip: 'work in progress',
    } as Record<string, string>,
  },
  pricing: {
    label: '~/pricing',
    title: 'Pricing with no fine print',
    lead: 'An honest starting point: the final quote depends on scope, and you know it before we start.',
    from: 'from',
    quote: 'quoted',
    ctaFixed: 'I want this one',
    ctaQuote: 'Tell us',
    note: '50% upfront, 50% on delivery. Typical turnaround: 5–10 days for a landing, 2–4 weeks for a site or bot. Bank transfer, PayPal or crypto.',
  },
  why: {
    label: '~/why-us',
    title: 'What everyone asks before paying us',
    lead: 'And while we are at it, why choose us:',
    points: [
      {
        title: 'You talk to the person coding',
        body: 'No middlemen, no account managers: the dev replying to your message is the one writing your code.',
      },
      {
        title: 'Answers in hours, not weeks',
        body: 'We live on Discord and email. We started this team between jobs: free time is not scarce.',
      },
      {
        title: 'Senior work without agency pricing',
        body: 'Clean, modern, documented code at a small-team price. Check our projects and judge for yourself.',
      },
    ],
  },
  faq: {
    items: [
      {
        q: 'How long does a project take?',
        a: 'A landing page: 5 to 10 days. A full website or a bot: 2 to 4 weeks depending on scope. We give you an estimated date before starting, and we keep it.',
      },
      {
        q: 'How do payments work?',
        a: '50% to kick off, 50% on delivery. We accept bank transfer, PayPal and crypto if you prefer.',
      },
      {
        q: 'What do I need to get started?',
        a: 'Just a clear idea of what you want. We walk you through it with concrete questions and propose the technical solution. If you are still figuring it out, the Discord is a good place to think it through.',
      },
      {
        q: 'Do I own the code?',
        a: 'Yes. We hand over the full repository with setup documentation. No locks, no eternal dependency on us.',
      },
      {
        q: 'Do you offer maintenance?',
        a: 'Optionally, at a fixed monthly price. And if you would rather fly solo, we leave everything documented so you never need us.',
      },
      {
        q: 'Why “unemployed”?',
        a: 'Because we started this team between jobs and decided to own it: no bosses, no pointless meetings, and all the time in the world for your project.',
      },
    ],
  },
  community: {
    label: '~/community',
    title: 'Watch the workshop',
    lead: 'We build in public. Follow what ships before anyone else does.',
    discordTitle: 'Join the Discord',
    discordBody: 'The open workshop: questions, live progress, code reviews and the occasional celebration when something compiles on the first try.',
    discordCta: 'Enter the server',
    newsTitle: 'Spam-free newsletter',
    newsBody: 'One email whenever we ship something new. Not one more. Unemployed’s word.',
    newsSample: 'last issue: “how we built chambea-board in 3 weekends”',
    newsPlaceholder: 'you@mail.dev',
    newsCta: 'Ping me when we ship',
    newsSuccess: 'Done, you are in. We only write when there is news.',
    newsError: 'That does not look like an email. Check it and try again.',
    newsLabel: 'Your email',
  },
  team: {
    label: '~/who-we-are',
    title: 'Three unemployed, zero on payroll',
    lead: 'Small, solid and available. This is what each of us does while job hunting… I mean, while working with you.',
    roles: [
      {
        name: 'Frontend Dev',
        role: 'interfaces',
        bio: 'Turns designs into pixels that do not break in anyone’s Safari.',
      },
      {
        name: 'Backend Dev',
        role: 'servers and data',
        bio: 'APIs, databases and bots. If it goes down, it is the host’s fault; if it works, it is his.',
      },
      {
        name: 'The everything person',
        role: 'product and chaos',
        bio: 'Writes copy, runs the Discord, tests everything three times and invoices on time.',
      },
    ],
    verifyLabel: 'Full track record, verifiable:',
    verifyLink: 'github.com/desempleados-dev',
  },
  footer: {
    tagline: 'Built without jobs, fueled by coffee.',
    contact: 'Contact',
    follow: 'Follow us',
    sections: 'Sections',
    rights: 'All rights reserved (the few we had left).',
    status: 'all systems operational',
  },
}

export const dict: Record<Lang, Dict> = { es, en }
export type { Dict }
