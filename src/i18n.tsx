import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { dict, type Dict, type Lang } from '@/content/copy'

interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem('dd-lang')
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* localStorage no disponible */
  }
  return 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('dd-lang', lang)
    } catch {
      /* noop */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, t: dict[lang], setLang }), [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
