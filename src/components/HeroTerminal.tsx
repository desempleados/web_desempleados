import { useEffect, useState } from 'react'

const SEQUENCE: { cmd: string; out: string }[] = [
  { cmd: 'git init tu-proyecto', out: '✓ equipo asignado en menos de 24h' },
  { cmd: 'npm run entrega', out: '✓ landing: 5-10 días · app: 2-4 semanas' },
  { cmd: 'echo $DUEÑO_DEL_CODIGO', out: 'vos. siempre.' },
]

/** Terminal decorativa del hero: tipea comandos en loop. Estática si hay prefers-reduced-motion. */
export function HeroTerminal() {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [showOut, setShowOut] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced) return
    const { cmd } = SEQUENCE[step]
    setTyped('')
    setShowOut(false)
    let i = 0
    const typing = setInterval(() => {
      i += 1
      setTyped(cmd.slice(0, i))
      if (i >= cmd.length) {
        clearInterval(typing)
        setTimeout(() => setShowOut(true), 300)
      }
    }, 45)
    return () => clearInterval(typing)
  }, [step, reduced])

  useEffect(() => {
    if (reduced || !showOut) return
    const next = setTimeout(() => setStep((s) => (s + 1) % SEQUENCE.length), 2200)
    return () => clearTimeout(next)
  }, [showOut, reduced])

  const current = SEQUENCE[step]

  return (
    <div
      aria-hidden="true"
      className="dd-glow-border hidden overflow-hidden rounded-card border border-border bg-background/90 backdrop-blur-sm lg:block"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">~/desempleados</span>
      </div>
      <div className="flex h-44 flex-col justify-center gap-2 p-5 font-mono text-sm">
        <p className="text-foreground">
          <span className="text-accent">$</span> {reduced ? current.cmd : typed}
          {!reduced && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />}
        </p>
        {(reduced || showOut) && <p className="text-muted-foreground">{current.out}</p>}
      </div>
    </div>
  )
}
