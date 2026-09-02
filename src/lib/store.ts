/**
 * Venta y almacenamiento local: carrito y órdenes.
 * Front-only por ahora; cuando haya backend, mover a API.
 */

import type { Product } from '@/content/data'

export interface CartItem {
  productId: string
  qty: number
}

export interface Order {
  id: string
  items: { name: string; qty: number; amount: number }[]
  total: number
  email: string
  date: string
  paid: boolean
}

const CART_KEY = 'dd-cart'
const ORDERS_KEY = 'dd-orders'

/* --------------------------------- Carrito -------------------------------- */

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('dd-cart-changed'))
}

export function addToCart(productId: string) {
  const cart = getCart()
  const found = cart.find((i) => i.productId === productId)
  if (found) found.qty += 1
  else cart.push({ productId, qty: 1 })
  setCart(cart)
}

export function removeFromCart(productId: string) {
  setCart(getCart().filter((i) => i.productId !== productId))
}

export function clearCart() {
  setCart([])
}

export function cartDetailed(cart: CartItem[], products: Product[]) {
  return cart
    .map((i) => {
      const p = products.find((pr) => pr.id === i.productId)
      const base = p?.price.mode === 'fixed' ? p.price.value : p?.price.mode === 'range' ? p.price.min : undefined
      if (!p || base === undefined) return null
      return { product: p, qty: i.qty, amount: base * i.qty }
    })
    .filter((x): x is { product: Product; qty: number; amount: number } => x !== null)
}

/* --------------------------------- Órdenes -------------------------------- */

function readOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  window.dispatchEvent(new Event('dd-orders-changed'))
}

export function getOrders(): Order[] {
  return readOrders().sort((a, b) => b.date.localeCompare(a.date))
}

export function placeOrder(items: { name: string; qty: number; amount: number }[], email: string): Order {
  const order: Order = {
    id: 'DD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    items,
    total: items.reduce((s, i) => s + i.amount, 0),
    email,
    date: new Date().toISOString(),
    paid: false,
  }
  writeOrders([order, ...readOrders()])
  return order
}

export function markOrderPaid(id: string) {
  writeOrders(readOrders().map((o) => (o.id === id ? { ...o, paid: true } : o)))
}

export function deleteOrder(id: string) {
  writeOrders(readOrders().filter((o) => o.id !== id))
}
