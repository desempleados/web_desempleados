import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem('dd-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage no disponible */
  }
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('dd-theme', theme)
    } catch {
      /* noop */
    }
  }, [theme])

  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')) }),
    [theme]
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
