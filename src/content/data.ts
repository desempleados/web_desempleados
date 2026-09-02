import type { Lang } from '@/content/copy'

type Bi = Record<Lang, string>

/* ------------------------------------------------------------------------ */
/* PROVISIONAL: montos, métricas, commits, fotos y URLs son de relleno      */
/* plausible mientras llegan los reales. Busca la marca PROVISIONAL.        */
/* ------------------------------------------------------------------------ */

export const DISCORD_URL = 'https://discord.gg/desempleados' // PROVISIONAL
export const GITHUB_URL = 'https://github.com/desempleados-dev' // PROVISIONAL
export const EMAIL = 'hola@desempleados.dev' // PROVISIONAL
export const SOCIALS = {
  x: 'https://x.com/desempleadosdev', // PROVISIONAL
  youtube: 'https://youtube.com/@desempleadosdev', // PROVISIONAL
  instagram: 'https://instagram.com/desempleadosdev', // PROVISIONAL
  linkedin: 'https://linkedin.com/company/desempleadosdev', // PROVISIONAL
}

/** Cuentas con acceso al panel (PROVISIONAL: muévelo a publicMetadata de Clerk). */
export const ADMIN_EMAILS = ['admin@synthex.dev', 'ortegaplatasantiago@gmail.com']

/* ------------------------------- Productos ------------------------------- */

export interface Product {
  id: string
  name: Bi
  price: { mode: 'fixed' | 'range' | 'quote'; value?: number; min?: number; max?: number; monthly?: boolean }
  bullets: Bi[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'landing',
    name: { es: 'Landing Page', en: 'Landing Page' },
    price: { mode: 'range', min: 15, max: 30 },
    bullets: [
      { es: 'Sitio de una sola página, diseño a medida', en: 'One-page site, custom design' },
      { es: 'Responsive y con formulario de contacto', en: 'Responsive, with contact form' },
      { es: 'Entrega: 5–10 días', en: 'Delivery: 5–10 days' },
    ],
  },
  {
    id: 'web-app',
    name: { es: 'Web o App a Medida', en: 'Custom Website or App' },
    price: { mode: 'range', min: 40, max: 100 },
    bullets: [
      { es: 'Sitio web, plataforma o app móvil completa', en: 'Full website, platform or mobile app' },
      { es: 'Diseño, desarrollo y despliegue incluidos', en: 'Design, development and deployment included' },
      { es: 'Alcance mayor: cotización aparte', en: 'Larger scope: quoted separately' },
    ],
  },
  {
    id: 'bots-automatizaciones',
    name: { es: 'Bots & Automatizaciones', en: 'Bots & Automations' },
    price: { mode: 'range', min: 10, max: 25 },
    bullets: [
      { es: 'Discord, Telegram, WhatsApp o Slack', en: 'Discord, Telegram, WhatsApp or Slack' },
      { es: 'Scraping, reportes automáticos y más', en: 'Scraping, automated reports and more' },
      { es: 'Automatizaciones complejas: a cotizar', en: 'Complex automations: quoted' },
    ],
  },
  {
    id: 'mantenimiento',
    name: { es: 'Mantenimiento Mensual', en: 'Monthly Maintenance' },
    price: { mode: 'range', min: 5, max: 15, monthly: true },
    bullets: [
      { es: 'Soporte y ajustes continuos', en: 'Ongoing support and tweaks' },
      { es: 'Para un proyecto ya entregado', en: 'For an already-delivered project' },
      { es: 'Cancela cuando quieras', en: 'Cancel anytime' },
    ],
  },
]

/* ------------------------------- Proyectos ------------------------------- */

export type ShotKind = 'board' | 'chat' | 'invoice' | 'cv'

export interface Project {
  id: string
  name: string
  shot: ShotKind
  tagline: Bi
  stack: string[]
  metrics: Bi
  commits: string[]
  status: 'live' | 'beta' | 'wip'
  /** Repo real: existe pero todavía no se linkea públicamente. Se completa después. */
  url?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'chambea-board',
    name: 'chambea-board',
    shot: 'board',
    tagline: {
      es: 'Ofertas de trabajo para devs de LATAM con filtros que entienden cómo se busca trabajo de verdad.',
      en: 'Job listings for LATAM devs with filters that understand how people actually job-hunt.',
    },
    stack: ['React', 'Node.js', 'PostgreSQL'],
    metrics: { es: '130 usuarios · 42 ofertas activas', en: '130 users · 42 active listings' },
    commits: ['feat: filtro de salario real', 'fix: zona horaria en remotas', 'chore: drizzle ORM'],
    status: 'beta',
  },
  {
    id: 'pingui-bot',
    name: 'pingui-bot',
    shot: 'chat',
    tagline: {
      es: 'Bot de moderación con niveles y comandos en español para comunidades de Discord.',
      en: 'Moderation bot with levels and Spanish commands for Discord communities.',
    },
    stack: ['Discord.js', 'Redis'],
    metrics: { es: '8 servidores · 3.1k miembros', en: '8 servers · 3.1k members' },
    commits: ['feat: niveles anti-farm', 'fix: rate limit /limpiar', 'perf: cache redis'],
    status: 'live',
  },
  {
    id: 'factura-feliz',
    name: 'factura-feliz',
    shot: 'invoice',
    tagline: {
      es: 'Facturas PDF para freelancers que solo quieren cobrar y ya.',
      en: 'PDF invoices for freelancers who just want to get paid.',
    },
    stack: ['TypeScript', 'pdf-lib'],
    metrics: { es: '214 facturas generadas', en: '214 invoices generated' },
    commits: ['feat: plantilla con logo', 'fix: redondeo de IVA', 'chore: export JSON'],
    status: 'live',
  },
  {
    id: 'stack-cv',
    name: 'stack-cv',
    shot: 'cv',
    tagline: {
      es: 'CVs para devs en un formato que los reclutadores sí leen.',
      en: 'CVs for devs in a format recruiters actually read.',
    },
    stack: ['React', 'Tailwind'],
    metrics: { es: 'en construcción', en: 'under construction' },
    commits: ['feat: parser JSON a CV', 'wip: modo ATS'],
    status: 'wip',
  },
]

/* --------------------------------- Equipo -------------------------------- */
/* Nombres y roles reales (del sitio anterior). Fotos: drop your files in   */
/* src/assets/team/ and import them here. Perfiles de GitHub: existen pero  */
/* se linkean después (ver Project.url).                                    */

export interface Member {
  id: string
  name: string
  role: Bi
  bio: Bi
  github?: string
  photo?: string
}

export const TEAM: Member[] = [
  {
    id: 'barlo',
    name: 'BaRLO',
    role: { es: 'Backend & robótica', en: 'Backend & robotics' },
    bio: {
      es: 'Sistemas embebidos, APIs y bases de datos. Lo que se cae, lo levanta; lo que funciona, es suyo.',
      en: 'Embedded systems, APIs and databases. If it goes down he fixes it; if it works, it is his.',
    },
  },
  {
    id: 'santiago',
    name: 'Santiago Ortega',
    role: { es: 'IA & automatización', en: 'AI & automation' },
    bio: {
      es: 'Bots, RPA y agentes autónomos. Escribe los pipelines que ahorran horas de trabajo aburrido.',
      en: 'Bots, RPA and autonomous agents. Writes the pipelines that save hours of boring work.',
    },
  },
  {
    id: 'ortiz',
    name: 'Ortiz R.',
    role: { es: 'Frontend & pagos', en: 'Frontend & payments' },
    bio: {
      es: 'Interfaces precisas y arquitectura de pagos. Diseña lo que ves y cobra a tiempo.',
      en: 'Precise interfaces and payment architecture. Designs what you see and invoices on time.',
    },
  },
]
