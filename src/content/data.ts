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
  price: { mode: 'fixed' | 'quote'; value?: number; monthly?: boolean }
  bullets: Bi[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'landing',
    name: { es: 'Landing page', en: 'Landing page' },
    price: { mode: 'fixed', value: 120 },
    bullets: [
      { es: 'Diseño propio, responsive', en: 'Original design, responsive' },
      { es: 'SEO básico y deploy incluido', en: 'Basic SEO, deploy included' },
      { es: 'Entrega: 5–10 días', en: 'Delivery: 5–10 days' },
    ],
  },
  {
    id: 'web-app',
    name: { es: 'Web completa / app', en: 'Full website / app' },
    price: { mode: 'fixed', value: 350 },
    bullets: [
      { es: 'Múltiples secciones o panel', en: 'Multiple sections or panel' },
      { es: 'Lógica a medida', en: 'Custom logic' },
      { es: 'Entrega: 2–4 semanas', en: 'Delivery: 2–4 weeks' },
    ],
  },
  {
    id: 'bot-discord',
    name: { es: 'Bot de Discord', en: 'Discord bot' },
    price: { mode: 'fixed', value: 80 },
    bullets: [
      { es: 'Moderación, tickets o economía', en: 'Moderation, tickets or economy' },
      { es: 'Hosting el primer mes incluido', en: 'First month hosting included' },
      { es: 'Entrega: 1–2 semanas', en: 'Delivery: 1–2 weeks' },
    ],
  },
  {
    id: 'mantenimiento',
    name: { es: 'Mantenimiento', en: 'Maintenance' },
    price: { mode: 'fixed', value: 30, monthly: true },
    bullets: [
      { es: 'Cambios y soporte mensual', en: 'Monthly changes and support' },
      { es: 'Cancela cuando quieras', en: 'Cancel anytime' },
      { es: 'Respuesta en 24h', en: '24h response time' },
    ],
  },
  {
    id: 'automatizacion',
    name: { es: 'Automatización / scripts', en: 'Automation / scripts' },
    price: { mode: 'quote' },
    bullets: [
      { es: 'Elimina el trabajo manual', en: 'Kill manual work' },
      { es: 'Integra tus herramientas', en: 'Make your tools talk' },
      { es: 'Cotización según alcance', en: 'Quoted per scope' },
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
  url: string
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
    url: GITHUB_URL, // PROVISIONAL
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
    url: GITHUB_URL, // PROVISIONAL
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
    url: GITHUB_URL, // PROVISIONAL
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
    url: GITHUB_URL, // PROVISIONAL
  },
]

/* --------------------------------- Equipo -------------------------------- */
/* Nombres y roles reales (del sitio anterior). Fotos: drop your files in   */
/* src/assets/team/ and import them here. GitHub: PROVISIONAL.              */

export interface Member {
  id: string
  name: string
  role: Bi
  bio: Bi
  github: string
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
    github: GITHUB_URL, // PROVISIONAL
  },
  {
    id: 'santiago',
    name: 'Santiago Ortega',
    role: { es: 'IA & automatización', en: 'AI & automation' },
    bio: {
      es: 'Bots, RPA y agentes autónomos. Escribe los pipelines que ahorran horas de trabajo aburrido.',
      en: 'Bots, RPA and autonomous agents. Writes the pipelines that save hours of boring work.',
    },
    github: GITHUB_URL, // PROVISIONAL
  },
  {
    id: 'ortiz',
    name: 'Ortiz R.',
    role: { es: 'Frontend & pagos', en: 'Frontend & payments' },
    bio: {
      es: 'Interfaces precisas y arquitectura de pagos. Diseña lo que ves y cobra a tiempo.',
      en: 'Precise interfaces and payment architecture. Designs what you see and invoices on time.',
    },
    github: GITHUB_URL, // PROVISIONAL
  },
]
