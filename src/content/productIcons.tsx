import { Bot, Code2, LayoutTemplate, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Un ícono funcional por producto — no decoración, ayuda a escanear la tienda. */
export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  landing: LayoutTemplate,
  'web-app': Code2,
  'bots-automatizaciones': Bot,
  mantenimiento: Wrench,
}
