import { ArrowDownRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="hero-title" className="px-4 pt-6 pb-16 md:px-6 md:pt-10 md:pb-24">
      <div className="dd-grid-bg relative mx-auto max-w-6xl overflow-hidden rounded-panel bg-panel px-6 py-14 text-panel-foreground md:px-14 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Columna principal */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-chip border border-panel-foreground/20 px-3 py-1.5 font-mono text-xs font-medium">
              <span
                className="dd-dot inline-block size-2 rounded-full bg-panel-foreground"
                aria-hidden="true"
              />
              {t.hero.status}
            </p>

            <h1
              id="hero-title"
              className="mt-8 max-w-3xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-extrabold tracking-tight text-balance"
            >
              {t.hero.title1}{' '}
              <span className="underline decoration-4 underline-offset-8">{t.hero.title2}</span>
              <br />
              <span className="text-[clamp(1.4rem,3vw,2.4rem)] leading-tight font-semibold opacity-80">
                {t.hero.title3}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">{t.hero.lead}</p>

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

            <p className="mt-10 font-mono text-sm opacity-70">
              <span className="dd-cursor">{t.hero.terminal}</span>
              <br />
              <a
                href="#precios"
                className="mt-1.5 inline-block underline underline-offset-4 hover:opacity-100 opacity-60"
              >
                ↳ {t.hero.terminalReply}
              </a>
            </p>
          </div>

          {/* Monitor de procesos: el chiste de marca como producto funcional */}
          <div className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="mx-auto w-full max-w-md rounded-card border border-panel-foreground/20 bg-[#0B0C0E]/92 font-mono text-sm text-[#B8F53A] shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center gap-1.5 border-b border-[#B8F53A]/15 px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#B8F53A]/70" />
                <span className="size-2.5 rounded-full bg-[#B8F53A]/30" />
                <span className="size-2.5 rounded-full bg-[#B8F53A]/30" />
                <span className="ml-3 truncate text-xs text-[#B8F53A]/60">{t.hero.monitorTitle}</span>
              </div>
              <div className="px-5 py-5">
                <p className="text-[#B8F53A]/60">$ status --equipo</p>
                <ul className="mt-4 space-y-3">
                  {t.hero.monitor.map((m) => (
                    <li key={m.proc} className="flex items-baseline gap-3">
                      <span className="w-20 shrink-0 text-[#EDEDEA]">{m.proc}</span>
                      <span className="text-[#B8F53A]/60">{m.state}</span>
                      {m.proc === 'rrhh' && m.state.includes('exit 0') ? (
                        <span className="ml-auto rounded-[3px] border border-[#B8F53A]/40 px-1.5 text-[10px] uppercase">
                          done
                        </span>
                      ) : (
                        <span className="dd-cursor ml-auto text-[10px]" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
