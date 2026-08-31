import { cn } from '@/lib/utils'
import type { ShotKind } from '@/content/data'
import { useI18n } from '@/i18n'

/**
 * "Captura" de cada proyecto: mockup de su interfaz real hecha en CSS.
 * Sin glifos sueltos: se ve como el producto que es.
 */
export function ProjectShot({ kind, name, tall }: { kind: ShotKind; name: string; tall?: boolean }) {
  const { lang } = useI18n()
  const es = lang === 'es'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-card border border-border bg-background',
        tall && 'dd-glow-border'
      )}
      role="img"
      aria-label={name}
    >
      {/* Barra de ventana */}
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{name}</span>
      </div>

      {kind === 'board' && (
        <div className="flex" aria-hidden="true">
          <div className="hidden w-28 shrink-0 border-r border-border bg-surface p-3 sm:block">
            <div className="h-2 w-16 rounded bg-accent/60" />
            <div className="mt-3 space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={cn('h-2 rounded', i === 0 ? 'w-14 bg-muted-foreground/40' : 'w-12 bg-muted')} />
              ))}
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn('h-6 w-20 rounded-chip border', i === 1 ? 'border-accent/50 bg-accent/10' : 'border-border')} />
              ))}
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                { w: 'w-3/4', tag: true },
                { w: 'w-2/3', tag: false },
                { w: 'w-4/5', tag: true },
                { w: 'w-1/2', tag: false },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-3 rounded-chip border border-border bg-surface px-3 py-2.5">
                  <div className={cn('h-2 rounded bg-muted-foreground/35', r.w)} />
                  {r.tag && <div className="h-4 w-14 rounded-full bg-emerald-400/15 px-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {kind === 'chat' && (
        <div className="flex" aria-hidden="true">
          <div className="hidden w-28 shrink-0 border-r border-border bg-surface p-3 sm:block">
            <div className="h-2 w-16 rounded bg-muted-foreground/40" />
            <div className="mt-3 space-y-2">
              {['# general', '# soporte', '# demos'].map((c, i) => (
                <div key={c} className={cn('h-5 rounded-chip px-2 py-1 font-mono text-[10px]', i === 0 ? 'bg-accent/15 text-accent' : 'text-muted-foreground')}>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="flex items-start gap-2.5">
              <div className="size-7 shrink-0 rounded-full bg-accent/25" />
              <div className="flex-1">
                <div className="h-2 w-20 rounded bg-muted-foreground/40" />
                <div className="mt-1.5 h-2 w-full rounded bg-muted" />
                <div className="mt-1.5 h-2 w-3/4 rounded bg-muted" />
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="size-7 shrink-0 rounded-full bg-emerald-400/20" />
              <div className="flex-1">
                <div className="h-2 w-16 rounded bg-muted-foreground/40" />
                <div className="mt-1.5 w-fit rounded-chip border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[10px] text-accent">
                  @aquí tu comando
                </div>
              </div>
            </div>
            <div className="rounded-chip border border-border bg-surface px-3 py-2 font-mono text-[10px] text-muted-foreground">
              {es ? 'Escribe un mensaje…' : 'Message…'}
            </div>
          </div>
        </div>
      )}

      {kind === 'invoice' && (
        <div className="p-5" aria-hidden="true">
          <div className="mx-auto max-w-xs rounded-card border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-24 rounded bg-accent/60" />
              <div className="font-mono text-[10px] text-muted-foreground">PDF</div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { w: 'w-2/3', v: 'w-12' },
                { w: 'w-1/2', v: 'w-16' },
                { w: 'w-3/5', v: 'w-10' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className={cn('h-2 rounded bg-muted', r.w)} />
                  <div className={cn('h-2 rounded bg-muted-foreground/40', r.v)} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <div className="h-2.5 w-16 rounded bg-muted-foreground/40" />
              <div className="font-mono text-xs font-bold text-accent">$2,450.00</div>
            </div>
          </div>
        </div>
      )}

      {kind === 'cv' && (
        <div className="p-5" aria-hidden="true">
          <div className="mx-auto max-w-xs rounded-card border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-accent/25" />
              <div>
                <div className="h-2 w-28 rounded bg-foreground/60" />
                <div className="mt-1.5 h-2 w-20 rounded bg-muted" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-16 rounded bg-accent/50" />
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-5/6 rounded bg-muted" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['React', 'Node', 'SQL'].map((s) => (
                <div key={s} className="rounded-[3px] border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
