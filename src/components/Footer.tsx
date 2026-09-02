import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { DISCORD_URL, EMAIL, GITHUB_URL, SOCIALS } from '@/content/data'
import { useI18n } from '@/i18n'
import { Show } from '@clerk/react'

export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.5 0 12.6 12.6 0 0 0-.61-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.04.03C.53 9.05-.32 13.58.1 18.06c0 .02.02.04.04.05a19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.13c.13-.09.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.38.3a.08.08 0 0 1-.01.12c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .09.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const onStore = pathname === '/tienda'

  const sections = [
    { to: '/', label: t.nav.home },
    { to: '/proyectos', label: t.nav.projects },
    { to: '/tienda', label: t.nav.store },
    { to: '/nosotros', label: t.nav.about },
  ]

  const socials = [
    { href: DISCORD_URL, label: 'Discord', Icon: DiscordIcon },
    { href: GITHUB_URL, label: 'GitHub', Icon: GithubIcon, pending: true },
    { href: SOCIALS.x, label: 'X', Icon: XIcon },
    { href: SOCIALS.youtube, label: 'YouTube', Icon: YoutubeIcon },
    { href: SOCIALS.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ]

  return (
    <footer className="border-t border-border">
      <div className="dd-hero-bg border-b border-border px-4 py-14 md:px-6 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs text-accent">{onStore ? t.footer.ctaLabelStore : t.footer.ctaLabel}</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {onStore ? t.footer.ctaTitleStore : t.footer.ctaTitle}
            </h2>
          </div>
          {onStore ? (
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={buttonVariants({ size: 'lg' })}>
              {t.footer.ctaButtonStore}
              <ArrowRight aria-hidden="true" />
            </a>
          ) : (
            <Link to="/tienda" className={buttonVariants({ size: 'lg' })}>
              {t.footer.ctaButton}
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      <div className="px-4 pt-14 pb-8 md:px-6 md:pt-16">
        <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-lg font-bold tracking-tight">
              <span className="text-accent">~/</span>desempleados.dev
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.sections}>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.sections}</h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-sm underline-offset-4 hover:text-accent hover:underline active:text-accent-strong">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.account}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/login" className="text-sm underline-offset-4 hover:text-accent hover:underline active:text-accent-strong">
                  {t.footer.loginLink}
                </Link>
              </li>
              <li>
                <Link to="/registro" className="text-sm underline-offset-4 hover:text-accent hover:underline active:text-accent-strong">
                  {t.footer.registerLink}
                </Link>
              </li>
            </ul>
            <h2 className="mt-6 font-mono text-xs text-muted-foreground uppercase">{t.footer.contact}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:text-accent hover:underline active:text-accent-strong">
                  <Mail aria-hidden="true" className="size-4" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.follow}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon, pending }) =>
                pending ? (
                  <li key={label}>
                    <span
                      aria-label={`${label} — ${t.footer.pendingSocial}`}
                      title={`${label} — ${t.footer.pendingSocial}`}
                      className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-chip border border-dashed border-input text-muted-foreground/40"
                    >
                      <Icon className="size-4" />
                    </span>
                  </li>
                ) : (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex size-9 items-center justify-center rounded-chip border border-border text-muted-foreground transition-colors active:scale-[0.94] hover:border-accent hover:text-accent active:text-accent-strong"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                )
              )}
            </ul>
            <Show when="signed-out">
              <p className="mt-5 font-mono text-xs text-muted-foreground">
                <Link to="/login" className="text-accent underline-offset-4 hover:underline">
                  {t.footer.loginLink}
                </Link>
              </p>
            </Show>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} desempleados.dev — {t.footer.rights}</p>
        </div>
      </div>
      </div>
    </footer>
  )
}
