import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { DISCORD_URL } from '@/content/data'
import { useI18n } from '@/i18n'
import { useTheme } from '@/theme'
import { cn } from '@/lib/utils'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#servicios', label: t.nav.services },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#precios', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="#"
          className="font-mono text-sm font-bold tracking-tight"
          aria-label="desempleados.dev — inicio"
        >
          <span className="text-accent">~/</span>desempleados.dev
          <span className="dd-cursor text-accent" aria-hidden="true"></span>
        </a>

        <nav aria-label="principal" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-chip px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Idioma / Language"
            className="hidden items-center rounded-chip border border-border p-0.5 sm:flex"
          >
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  'rounded-[3px] px-2 py-1 font-mono text-xs font-medium transition-colors',
                  lang === l
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}
          >
            {t.nav.discord}
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <nav aria-label="móvil" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-chip px-3 py-3 text-base text-foreground hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-3">
            <div
              role="group"
              aria-label="Idioma / Language"
              className="flex items-center rounded-chip border border-border p-0.5"
            >
              {(['es', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    'rounded-[3px] px-2.5 py-1.5 font-mono text-xs font-medium transition-colors',
                    lang === l
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-chip bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              {t.nav.discord}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
