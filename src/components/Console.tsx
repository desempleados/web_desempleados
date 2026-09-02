import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { PROJECTS } from '@/content/data'
import { getOrders, markOrderPaid, deleteOrder } from '@/lib/store'
import { useI18n } from '@/i18n'

interface Line {
  type: 'input' | 'output'
  text: string
}

/** Consola interactiva del panel admin (inspirada en la del sitio anterior). */
export function Console() {
  const { t, lang } = useI18n()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLines([{ type: 'output', text: t.admin.consoleWelcome }])
  }, [t])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  function run(cmd: string): Line[] {
    const out: string[] = []
    const [name, arg] = cmd.trim().split(/\s+/)

    switch (name) {
      case 'help':
        out.push('help · whoami · proyectos · ventas · pagado <id> · borrar <id> · clear')
        break
      case 'whoami':
        out.push(t.admin.prompt)
        break
      case 'proyectos':
        PROJECTS.forEach((p) => out.push(`${p.name} — ${p.metrics[lang]}`))
        break
      case 'ventas': {
        const orders = getOrders()
        if (!orders.length) out.push(t.admin.emptySales)
        orders.forEach((o) => out.push(`${o.id}  $${o.total}  ${o.paid ? '✓' : '…'}  ${o.email}`))
        break
      }
      case 'pagado':
        if (getOrders().some((o) => o.id === arg)) {
          markOrderPaid(arg)
          out.push(`${arg} → ${t.admin.salesState.paid}`)
        } else out.push(t.admin.notFound)
        break
      case 'borrar':
        if (getOrders().some((o) => o.id === arg)) {
          deleteOrder(arg)
          out.push(`${arg}: ${t.admin.removed}`)
        } else out.push(t.admin.notFound)
        break
      case 'clear':
        setLines([])
        return []
      case '':
        return []
      default:
        out.push(`? ${name}`)
    }
    return out.map((text) => ({ type: 'output' as const, text }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const cmd = input
    setInput('')
    setLines((prev) => [...prev, { type: 'input', text: cmd }, ...run(cmd)])
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-background">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{t.admin.tabs.console}</span>
      </div>
      <div ref={scrollRef} className="h-72 overflow-y-auto p-4 font-mono text-sm" aria-live="polite">
        {lines.map((l, i) =>
          l.type === 'input' ? (
            <p key={i} className="text-foreground">
              <span className="text-accent">$</span> {l.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-muted-foreground">
              {l.text}
            </p>
          )
        )}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-3 border-t border-border px-4 py-3">
        <span className="shrink-0 font-mono text-sm text-accent" aria-hidden="true">
          $
        </span>
        <label htmlFor="admin-console" className="sr-only">
          {t.admin.tabs.console}
        </label>
        <input
          id="admin-console"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          className="w-full rounded-chip bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="help"
        />
      </form>
    </div>
  )
}
