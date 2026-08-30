import { STACK_STATES, STACK_TECH } from '@/content/data'
import { useI18n } from '@/i18n'

export function StackMarquee() {
  const { t, lang } = useI18n()

  // Intercala tecnologías (texto) y estados del equipo (acento, mono con humor)
  const items: { kind: 'tech' | 'state'; text: string }[] = [
    ...STACK_TECH.map((tech) => ({ kind: 'tech' as const, text: tech })),
    ...STACK_STATES.map((s) => ({ kind: 'state' as const, text: s[lang] })),
  ]

  const row = (
    <>
      {items.map((item, i) => (
        <span key={`${item.kind}-${i}`} className="inline-flex items-center gap-6">
          {item.kind === 'state' ? (
            <span className="font-mono text-sm text-accent">{item.text}</span>
          ) : (
            <span className="font-mono text-sm text-muted-foreground">{item.text}</span>
          )}
          <span aria-hidden="true" className="font-mono text-sm text-muted-foreground/50">
            //
          </span>
        </span>
      ))}
    </>
  )

  return (
    <section aria-label={t.stack.label} className="border-y border-border py-5">
      <div className="dd-marquee-mask overflow-hidden">
        <div className="dd-marquee-track flex w-max items-center gap-6">
          <div className="flex items-center gap-6">{row}</div>
          <div className="flex items-center gap-6" aria-hidden="true">
            {row}
          </div>
        </div>
      </div>
    </section>
  )
}
