import { useEffect, useState } from 'react'
import { useClerk, useUser } from '@clerk/react'
import { Plus, ShoppingCart, Trash2 } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { DISCORD_URL, PRODUCTS } from '@/content/data'
import { useI18n } from '@/i18n'
import { formatPrice } from '@/lib/utils'
import {
  addToCart,
  cartDetailed,
  clearCart,
  getCart,
  placeOrder,
  removeFromCart,
} from '@/lib/store'

export function Store() {
  const { t, lang } = useI18n()
  const { isSignedIn, user } = useUser()
  const clerk = useClerk()
  const [, force] = useState(0)
  const [lastOrder, setLastOrder] = useState<string | null>(null)

  useEffect(() => {
    const update = () => force((n) => n + 1)
    window.addEventListener('dd-cart-changed', update)
    return () => window.removeEventListener('dd-cart-changed', update)
  }, [])

  const cart = cartDetailed(getCart(), PRODUCTS)
  const total = cart.reduce((s, i) => s + i.amount, 0)
  const quoteInCart = getCart().some((i) => PRODUCTS.find((p) => p.id === i.productId)?.price.mode === 'quote')

  function checkout() {
    if (!isSignedIn || !user) {
      void clerk.openSignIn({ fallbackRedirectUrl: '/tienda' })
      return
    }
    const order = placeOrder(
      cart.map((i) => ({ name: i.product.name[lang], qty: i.qty, amount: i.amount })),
      user.primaryEmailAddress?.emailAddress ?? ''
    )
    clearCart()
    setLastOrder(order.id)
  }

  return (
    <section aria-labelledby="tienda-title" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="tienda-title" label={t.store.label} title={t.store.title} lead={t.store.lead} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Catálogo */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {PRODUCTS.map((p) => {
              const inCart = getCart().some((i) => i.productId === p.id)
              return (
                <article key={p.id} className="flex flex-col rounded-card border border-border bg-surface p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold tracking-tight">{p.name[lang]}</h3>
                    <span className="shrink-0 font-mono text-sm font-bold text-accent">
                      {formatPrice(p.price, t.store.quote, t.store.monthly)}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {p.bullets.map((b, i) => (
                      <li key={i}>· {b[lang]}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    {p.price.mode !== 'quote' ? (
                      <Button size="sm" variant={inCart ? 'outline' : 'default'} onClick={() => (inCart ? removeFromCart(p.id) : addToCart(p.id))}>
                        {inCart ? <Trash2 aria-hidden="true" /> : <Plus aria-hidden="true" />}
                        {inCart ? t.store.added : t.store.add}
                      </Button>
                    ) : (
                      <a
                        href={`mailto:hola@desempleados.dev?subject=${encodeURIComponent('[tienda] automatización')}`}
                        className={buttonVariants({ size: 'sm', variant: 'outline' })}
                      >
                        {t.store.quoteCta}
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {/* Carrito */}
          <aside className="lg:col-span-4" aria-label={t.store.cartTitle}>
            <div className="sticky top-24 rounded-card border border-border bg-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
                <ShoppingCart aria-hidden="true" className="size-5" />
                {t.store.cartTitle}
              </h3>

              {lastOrder ? (
                <p role="status" className="mt-4 rounded-chip border border-accent/40 bg-accent/10 px-4 py-3 font-mono text-sm text-accent">
                  {t.store.success} ({t.store.orderPlaced} {lastOrder})
                </p>
              ) : cart.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">{t.store.cartEmpty}</p>
              ) : (
                <>
                  <ul className="mt-4 space-y-3">
                    {cart.map((i) => (
                      <li key={i.product.id} className="flex items-center justify-between gap-3 text-sm">
                        <span>
                          {i.product.name[lang]}
                          {i.qty > 1 && <span className="text-muted-foreground"> ×{i.qty}</span>}
                        </span>
                        <span className="font-mono">US${i.amount}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-medium">
                    <span>{t.store.total}</span>
                    <span className="font-mono">US${total}</span>
                  </div>
                  <Button className="mt-5 w-full" onClick={checkout}>
                    {isSignedIn ? t.store.checkout : t.store.checkoutSignIn}
                  </Button>
                </>
              )}

              {quoteInCart && !lastOrder && (
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">{t.store.quoteCta} → mailto</p>
              )}
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {t.store.fine} · <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">Discord</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
