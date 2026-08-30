import { ArrowDownRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="hero-title" className="px-4 pt-6 pb-16 md:px-6 md:pt-10 md:pb-24">
      <div className="dd-grid-bg relative mx-auto max-w-6xl overflow-hidden rounded-panel bg-panel px-6 py-16 text-panel-foreground md:px-14 md:py-24">
        {/* Franjas decorativas tipo terminal, al margen (aria-hidden) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-[repeating-linear-gradient(90deg,transparent_0_14px,rgba(0,0,0,0.22)_14px_28px)]"
        />

        <p className="inline-flex items-center gap-2.5 rounded-chip border border-panel-foreground/20 px-3 py-1.5 font-mono text-xs font-medium">
          <span className="dd-dot inline-block size-2 rounded-full bg-panel-foreground" aria-hidden="true" />
          {t.hero.status}
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] font-extrabold tracking-tight text-balance"
        >
          {t.hero.title1} <span className="underline decoration-4 underline-offset-8">{t.hero.title2}</span>
          <br />
          <span className="text-[clamp(1.4rem,3.4vw,2.6rem)] leading-tight font-semibold opacity-80">
            {t.hero.title3}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">{t.hero.lead}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#precios"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-panel-foreground text-panel hover:opacity-90'
            )}
          >
            {t.hero.ctaPrimary}
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a
            href="#proyectos"
            className={cn(buttonVariants({ variant: 'panel-ghost', size: 'lg' }))}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <p className="mt-10 font-mono text-sm opacity-60">{t.hero.terminal}</p>
      </div>
    </section>
  )
}
