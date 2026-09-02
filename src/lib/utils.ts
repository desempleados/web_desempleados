import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Product } from '@/content/data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: Product['price'], quoteLabel: string, monthlySuffix: string) {
  if (price.mode === 'quote') return quoteLabel
  const suffix = price.monthly ? monthlySuffix : ''
  if (price.mode === 'range') return `US$${price.min}–${price.max}${suffix}`
  return `US$${price.value}${suffix}`
}
