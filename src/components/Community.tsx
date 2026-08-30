import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, MessageCircle, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionHeading } from '@/components/SectionHeading'
import { DISCORD_URL } from '@/content/data'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

function Email() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'ok' | 'error'>('idle')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    setState(valid ? 'ok' : 'error')
  }

  return (
    <div className="flex h-full flex-col rounded-card border border-border bg-surface p-7 md:p-9">
      <h3 className="font-display text-2xl font-bold tracking-tight">{t.community.newsTitle}</h3>
      <p className="mt-3 text-muted-foreground">{t.community.newsBody}</p>

      {state === 'ok' ? (
        <p
          role="status"
          className="mt-auto flex items-center gap-2 rounded-chip border border-accent/40 bg-accent/10 px-4 py-3 font-mono text-sm text-accent"
        >
          {t.community.newsSuccess}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-auto pt-8" noValidate>
          <p className="mb-3 font-mono text-xs text-muted-foreground" aria-hidden="true">
            <span className="text-accent">↳</span> {t.community.newsSample}
          </p>
          <label htmlFor="newsletter-email" className="mb-2 block font-mono text-xs text-muted-foreground">
            {t.community.newsLabel}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder={t.community.newsPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (state === 'error') setState('idle')
              }}
              aria-invalid={state === 'error'}
              aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
              required
            />
            <Button type="submit" className="shrink-0">
              {t.community.newsCta}
              <Send aria-hidden="true" />
            </Button>
          </div>
          {state === 'error' && (
            <p id="newsletter-error" className="mt-2 text-sm text-accent" role="alert">
              {t.community.newsError}
            </p>
          )}
          {/* Integración real (Mailchimp/Resend) pendiente: ver Fase 4 */}
        </form>
      )}
    </div>
  )
}

export function Community() {
  const { t } = useI18n()

  return (
    <section
      id="comunidad"
      aria-labelledby="comunidad-title"
      className="px-4 py-20 md:px-6 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="comunidad-title"
          label={t.community.label}
          title={t.community.title}
          lead={t.community.lead}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Discord: panel de acento, contrapeso visual del hero */}
          <div className="flex flex-col justify-between gap-10 rounded-card bg-panel p-7 text-panel-foreground md:p-9">
            <div>
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                <MessageCircle aria-hidden="true" className="size-6" />
                {t.community.discordTitle}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed">{t.community.discordBody}</p>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'border-0 bg-panel-foreground text-panel hover:opacity-90'
              )}
            >
              {t.community.discordCta}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <Email />
        </div>
      </div>
    </section>
  )
}
