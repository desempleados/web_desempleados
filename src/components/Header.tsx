import { Show, SignInButton, UserButton } from '@clerk/react'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { useTheme } from '@/theme'
import { cn } from '@/lib/utils'
import { getCart } from '@/lib/store'
import { useEffect } from 'react'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const update = () => setCartCount(getCart().reduce((s, i) => s + i.qty, 0))
    update()
    window.addEventListener('dd-cart-changed', update)
    return () => window.removeEventListener('dd-cart-changed', update)
  }, [])

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/proyectos', label: t.nav.projects },
    { to: '/tienda', label: t.nav.store },
    { to: '/nosotros', label: t.nav.about },
  ]

  const navCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-chip px-3 py-2 text-sm transition-colors',
      isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" className="font-mono text-sm font-bold tracking-tight" aria-label="desempleados.dev">
          <span className="text-accent">~/</span>desempleados.dev
        </Link>

        <nav aria-label="principal" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navCls} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label="Idioma / Language" className="hidden items-center rounded-chip border border-border p-0.5 sm:flex">
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  'rounded-[3px] px-2 py-1 font-mono text-xs font-medium transition-colors',
                  lang === l ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}>
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>

          <Link to="/tienda" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative')} aria-label={t.nav.store}>
            <ShoppingCart aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/tienda">
              <Button size="sm">{t.nav.login}</Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>

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

      <div id="menu-movil" hidden={!open} className="border-t border-border bg-background md:hidden">
        <nav aria-label="móvil" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className="rounded-chip px-3 py-3 text-base hover:bg-muted">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
