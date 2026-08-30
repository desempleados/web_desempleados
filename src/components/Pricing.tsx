import { ArrowDownRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { EMAIL, PRICE_ROWS } from '@/content/data'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function Pricing() {
  const { t, lang } = useI18n()

  return (
    <section id="precios" aria-labelledby="precios-title" className="px-4 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="precios-title"
          label={t.pricing.label}
          title={t.pricing.title}
          lead={t.pricing.lead}
        />

        {/* Tabla densa en filas (no cards): lectura rápida, comparación honesta */}
        <div className="mt-14 overflow-hidden rounded-card border border-border">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.pricing.title}</caption>
            <tbody>
              {PRICE_ROWS.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-b border-border last:border-b-0',
                    i % 2 === 1 && 'bg-surface/60'
                  )}
                >
                  <th
                    scope="row"
                    className="px-5 py-6 align-top font-medium md:px-8 md:py-7"
                  >
                    <span className="block text-base md:text-lg">{row.name}</span>
                    <span className="mt-1 block max-w-md text-sm font-normal text-muted-foreground">
                      {row.description[lang]}
                    </span>
                  </th>
                  <td className="whitespace-nowrap px-5 py-6 align-top font-display text-xl font-bold md:px-8 md:py-7 md:text-2xl">
                    {row.amount.mode === 'fixed' && row.amount.value ? (
                      <>
                        <span className="mr-2 align-middle font-mono text-xs font-normal text-muted-foreground">
                          {t.pricing.from}
                        </span>
                        {row.amount.value[lang]}
                        {row.fine && (
                          <span className="mt-1.5 block font-mono text-[11px] font-normal text-accent">
                            {row.fine[lang]}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="font-mono text-base font-normal text-accent">
                        {t.pricing.quote}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-6 text-right align-top md:px-8 md:py-7">
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[precio] ${row.name}`)}`}
                      className={buttonVariants({ size: 'sm', variant: row.amount.mode === 'fixed' ? 'default' : 'outline' })}
                    >
                      {row.amount.mode === 'fixed' ? t.pricing.ctaFixed : t.pricing.ctaQuote}
                      <ArrowDownRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-border bg-surface px-5 py-4 font-mono text-xs text-muted-foreground md:px-8">
            {t.pricing.note}
          </p>
        </div>
      </div>
    </section>
  )
}
