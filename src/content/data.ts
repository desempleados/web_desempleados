import type { Lang } from '@/content/copy'

type Bi = Record<Lang, string>

/* ------------------------------------------------------------------------ */
/* Datos estructurados. Montos y enlaces marcados como PROVISIONALES:       */
/* son los únicos valores inventados a la espera de los reales.             */
/* ------------------------------------------------------------------------ */

export const DISCORD_URL = 'https://discord.gg/desempleados' // PROVISIONAL
export const GITHUB_URL = 'https://github.com/desempleados-dev' // PROVISIONAL
export const EMAIL = 'hola@desempleados.dev' // PROVISIONAL

export interface Service {
  id: string
  number: string
  title: Bi
  description: Bi
  includes: Bi[]
  price: { mode: 'fixed' | 'quote'; amount?: Bi }
}

export const SERVICES: Service[] = [
  {
    id: 'webs-apps',
    number: '01',
    title: { es: 'Webs y apps a medida', en: 'Custom websites and apps' },
    description: {
      es: 'Landing pages, sitios completos y aplicaciones web construidas desde cero. Diseño propio, rendimiento medible y código que heredarás sin miedo.',
      en: 'Landing pages, full websites and web applications built from scratch. Original design, measurable performance and code you will inherit without fear.',
    },
    includes: [
      { es: 'Diseño propio: nada de plantillas genéricas', en: 'Original design: no generic templates' },
      { es: 'Responsive de verdad, no “lo revisamos luego”', en: 'Actually responsive, not “we’ll check later”' },
      { es: 'SEO técnico y rendimiento desde el día uno', en: 'Technical SEO and performance from day one' },
      { es: 'Te entregamos el repositorio completo', en: 'You get the full repository' },
    ],
    price: {
      mode: 'fixed',
      amount: { es: 'desde US$120', en: 'from US$120' },
    },
  },
  {
    id: 'bots-automatizacion',
    number: '02',
    title: { es: 'Bots y automatización', en: 'Bots and automation' },
    description: {
      es: 'Bots de Discord que tu comunidad querrá usar, scripts que eliminan trabajo repetitivo e integraciones entre herramientas que no se hablan entre sí.',
      en: 'Discord bots your community will actually use, scripts that kill repetitive work, and integrations between tools that do not talk to each other.',
    },
    includes: [
      { es: 'Bots de Discord: moderación, tickets, economía', en: 'Discord bots: moderation, tickets, economy' },
      { es: 'Automatizaciones y scrapers a medida', en: 'Custom automations and scrapers' },
      { es: 'Integraciones con APIs y bases de datos', en: 'API and database integrations' },
      { es: 'Hosting y mantenimiento opcional', en: 'Optional hosting and maintenance' },
    ],
    price: { mode: 'quote' },
  },
]

export interface Project {
  id: string
  name: string
  tagline: Bi
  stack: string[]
  status: 'live' | 'beta' | 'wip'
  url: string
  featured?: boolean
  glyph: string
}

export const PROJECTS: Project[] = [
  {
    id: 'chambea-board',
    name: 'chambea-board',
    tagline: {
      es: 'Tablero de ofertas de trabajo para devs de LATAM, con filtros que entienden cómo se busca trabajo de verdad.',
      en: 'A job board for LATAM devs, with filters that understand how people actually look for jobs.',
    },
    stack: ['React', 'Node.js', 'PostgreSQL'],
    status: 'beta',
    url: GITHUB_URL, // PROVISIONAL
    featured: true,
    glyph: '▣',
  },
  {
    id: 'pingui-bot',
    name: 'pingui-bot',
    tagline: {
      es: 'Bot de moderación con niveles y comandos en español para comunidades de Discord.',
      en: 'Moderation bot with levels and Spanish-language commands for Discord communities.',
    },
    stack: ['Discord.js', 'Redis'],
    status: 'live',
    url: GITHUB_URL, // PROVISIONAL
    glyph: '❄',
  },
  {
    id: 'factura-feliz',
    name: 'factura-feliz',
    tagline: {
      es: 'Generador de facturas PDF para freelancers que solo quieren cobrar y ya.',
      en: 'PDF invoice generator for freelancers who just want to get paid already.',
    },
    stack: ['TypeScript', 'pdf-lib'],
    status: 'live',
    url: GITHUB_URL, // PROVISIONAL
    glyph: '▦',
  },
  {
    id: 'stack-cv',
    name: 'stack-cv',
    tagline: {
      es: 'CVs para devs en un formato que los reclutadores sí leen.',
      en: 'CVs for devs in a format recruiters actually read.',
    },
    stack: ['React', 'Tailwind'],
    status: 'wip',
    url: GITHUB_URL, // PROVISIONAL
    glyph: '▤',
  },
]

export interface PriceRow {
  id: string
  name: string
  description: Bi
  amount: { mode: 'fixed' | 'quote'; value?: Bi }
}

export const PRICE_ROWS: PriceRow[] = [
  {
    id: 'landing',
    name: 'Landing page',
    description: {
      es: 'Una página, diseño propio, responsive, SEO básico y deploy incluido.',
      en: 'One page, original design, responsive, basic SEO and deploy included.',
    },
    amount: { mode: 'fixed', value: { es: 'US$120', en: 'US$120' } },
  },
  {
    id: 'web-app',
    name: 'Web completa / app',
    description: {
      es: 'Múltiples secciones, panel de contenido o lógica a medida.',
      en: 'Multiple sections, a content panel or custom logic.',
    },
    amount: { mode: 'fixed', value: { es: 'US$350', en: 'US$350' } },
  },
  {
    id: 'bot-discord',
    name: 'Bot de Discord',
    description: {
      es: 'Moderación, economía, tickets o lo que tu comunidad necesite.',
      en: 'Moderation, economy, tickets or whatever your community needs.',
    },
    amount: { mode: 'fixed', value: { es: 'US$80', en: 'US$80' } },
  },
  {
    id: 'automatizacion',
    name: 'Automatización / scripts',
    description: {
      es: 'Elimina trabajo manual, integra tus herramientas entre sí.',
      en: 'Kill manual work, make your tools talk to each other.',
    },
    amount: { mode: 'quote' },
  },
]

export const STACK = [
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Tailwind CSS',
  'Discord.js',
  'Vite',
  'Git',
  'Linux',
  'REST APIs',
]
