import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useUser } from '@clerk/react'

import { Button } from '@/components/ui/button'
import { Console } from '@/components/Console'
import { SectionHeading } from '@/components/SectionHeading'
import { ADMIN_EMAILS, PRODUCTS, PROJECTS } from '@/content/data'
import { useI18n } from '@/i18n'
import { deleteOrder, getOrders, markOrderPaid } from '@/lib/store'

export function Admin() {
  const { t, lang } = useI18n()
  const { isSignedIn, user, isLoaded } = useUser()
  const [tab, setTab] = useState<'console' | 'projects' | 'sales'>('console')
  const [, force] = useState(0)

  useEffect(() => {
    const update = () => force((n) => n + 1)
    window.addEventListener('dd-orders-changed', update)
    return () => window.removeEventListener('dd-orders-changed', update)
  }, [])

  if (!isLoaded) return null

  const email = user?.primaryEmailAddress?.emailAddress ?? ''
  const isAdmin =
    isSignedIn && (ADMIN_EMAILS.includes(email) || user?.publicMetadata?.role === 'admin')

  if (!isSignedIn || !isAdmin) {
    return (
      <section aria-labelledby="admin-title" className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="admin-title" label={t.admin.label} title={t.admin.title} lead={t.admin.lead} />
          <div className="mx-auto mt-12 max-w-lg rounded-card border border-border bg-surface p-8 text-center">
            <h2 className="font-display text-xl font-bold tracking-tight">{t.admin.locked}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t.admin.lockedBody}</p>
            <Button className="mt-6" disabled>
              {t.admin.signIn}
            </Button>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              → {t.nav.login} / login
            </p>
          </div>
        </div>
      </section>
    )
  }

  const orders = getOrders()
  const revenue = orders.filter((o) => o.paid).reduce((s, o) => s + o.total, 0)
  const pending = orders.filter((o) => !o.paid).length
  const metrics = [
    { label: t.admin.metrics.revenue, value: `US$${revenue}` },
    { label: t.admin.metrics.pending, value: String(pending) },
    { label: t.admin.metrics.projects, value: String(PROJECTS.length) },
    { label: t.admin.metrics.products, value: String(PRODUCTS.length) },
  ]

  const tabs = [
    { id: 'console' as const, label: t.admin.tabs.console },
    { id: 'projects' as const, label: t.admin.tabs.projects },
    { id: 'sales' as const, label: t.admin.tabs.sales },
  ]

  return (
    <section aria-labelledby="admin-title" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="admin-title" label={t.admin.label} title={t.admin.title} lead={t.admin.lead} />

        {/* Métricas */}
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-card border border-border bg-surface p-5">
              <dt className="text-xs text-muted-foreground">{m.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* Tabs */}
        <div role="tablist" aria-label={t.admin.title} className="mt-10 flex flex-wrap gap-1 border-b border-border">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              aria-selected={tab === tb.id}
              onClick={() => setTab(tb.id)}
              className={`-mb-px rounded-t-chip border-b-2 px-4 py-2.5 text-sm transition-colors active:text-accent ${
                tab === tb.id
                  ? 'border-accent font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === 'console' && <Console />}

          {tab === 'projects' && (
            <div className="overflow-hidden rounded-card border border-border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{t.admin.tabs.projects}</caption>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <th scope="row" className="px-5 py-4 font-mono font-medium">
                        {p.name}
                      </th>
                      <td className="px-5 py-4 text-muted-foreground">{p.metrics[lang]}</td>
                      <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{p.stack.join(' · ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'sales' && (
            <div className="overflow-hidden rounded-card border border-border">
              {orders.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">{t.admin.emptySales}</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">{t.admin.tabs.sales}</caption>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={o.id} className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? 'bg-surface' : ''}`}>
                        <th scope="row" className="px-5 py-4 font-mono font-medium">
                          {o.id}
                        </th>
                        <td className="px-5 py-4 text-muted-foreground">{o.email}</td>
                        <td className="px-5 py-4">
                          {o.items.map((it) => `${it.name} ×${it.qty}`).join(', ')}
                        </td>
                        <td className="px-5 py-4 font-mono">US${o.total}</td>
                        <td className="px-5 py-4">
                          <span className={`font-mono text-xs ${o.paid ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                            {o.paid ? t.admin.salesState.paid : t.admin.salesState.pending}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            {!o.paid && (
                              <Button size="sm" variant="outline" onClick={() => markOrderPaid(o.id)}>
                                {t.admin.markPaid}
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" aria-label={`${t.admin.remove} ${o.id}`} onClick={() => deleteOrder(o.id)}>
                              <Trash2 aria-hidden="true" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
