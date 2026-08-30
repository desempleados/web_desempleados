import { Mail } from 'lucide-react'

import { DISCORD_URL, EMAIL, GITHUB_URL } from '@/content/data'
import { useI18n } from '@/i18n'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function Footer() {
  const { t, lang } = useI18n()
  const year = new Date().getFullYear()

  const sections = [
    { href: '#servicios', label: t.nav.services },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#precios', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
    { href: '#equipo', label: t.nav.team },
  ]

  return (
    <footer className="border-t border-border px-4 pt-16 pb-10 md:px-6 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-2xl font-bold tracking-tight md:text-3xl">
          <span className="text-accent">~/</span>desempleados.dev
        </p>
        <p className="mt-3 text-muted-foreground">{t.footer.tagline}</p>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
          <nav aria-label={t.footer.sections}>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.sections}</h2>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-sm underline-offset-4 hover:text-accent hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.contact}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:text-accent hover:underline"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline-offset-4 hover:text-accent hover:underline"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs text-muted-foreground uppercase">{t.footer.follow}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:text-accent hover:underline"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} desempleados.dev — {t.footer.rights}
          </p>
          <p className="inline-flex items-center gap-2">
            <span
              className="dd-dot inline-block size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {t.footer.status}
            <span aria-hidden="true">·</span>
            <span className="text-accent">
              {lang === 'es' ? 'v1.0' : 'v1.0'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
