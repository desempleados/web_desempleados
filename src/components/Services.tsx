import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { SERVICES, EMAIL } from '@/content/data'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function Services() {
  const { t, lang } = useI18n()

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="px-4 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="servicios-title"
          label={t.services.label}
          title={t.services.title}
          lead={t.services.lead}
        />

        {/* Tratamientos distintos por panel: nada de cards gemelas.
            Webs = ventana destacada con borde lima. Bots = panel de log. */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              className={cn(
                'flex flex-col rounded-card border p-7 md:p-9',
                i === 0
                  ? 'border-l-2 border-l-accent border-border bg-surface lg:col-span-7'
                  : 'border-border bg-muted lg:col-span-5'
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm text-accent">{s.number}</span>
                <span
                  className={cn(
                    'font-mono text-xs',
                    s.price.mode === 'fixed' ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.price.mode === 'fixed' && s.price.amount
                    ? s.price.amount[lang]
                    : t.pricing.quote}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {s.title[lang]}
              </h3>
              <p className="mt-4 text-muted-foreground">{s.description[lang]}</p>

              <ul className="mt-7 space-y-3 border-t border-border pt-7">
                {s.includes.map((item) => (
                  <li key={item.tag} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-0.5 shrink-0 rounded-[3px] bg-background px-1.5 py-0.5 font-mono text-[11px] text-accent"
                      aria-hidden="true"
                    >
                      [{item.tag}]
                    </span>
                    <span>{item.text[lang]}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-9">
                {s.price.mode === 'fixed' ? (
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[servicio] ${s.title[lang]}`)}`}
                    className={buttonVariants()}
                  >
                    {t.services.ctaFixed}
                  </a>
                ) : (
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[presupuesto] ${s.title[lang]}`)}`}
                    className={buttonVariants()}
                  >
                    {t.services.ctaQuote}
                  </a>
                )}
                <span className="font-mono text-xs text-muted-foreground">
                  {s.price.mode === 'fixed' ? t.services.fixedNote : t.services.quoteNote}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
