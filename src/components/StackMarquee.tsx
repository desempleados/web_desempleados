import { STACK } from '@/content/data'
import { useI18n } from '@/i18n'

export function StackMarquee() {
  const { t } = useI18n()

  const items = (
    <>
      {STACK.map((tech) => (
        <span
          key={tech}
          className="inline-flex items-center gap-6 font-mono text-sm text-muted-foreground"
        >
          {tech}
          <span aria-hidden="true" className="text-accent">
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
          <div className="flex items-center gap-6">{items}</div>
          <div className="flex items-center gap-6" aria-hidden="true">
            {items}
          </div>
        </div>
      </div>
    </section>
  )
}
