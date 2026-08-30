import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/i18n'

/**
 * Sin fotos (decisión del brief): monogramas tipográficos por rol.
 * Nombres reales pendientes — ver Fase 4 de la entrega.
 */
const GLYPHS = ['</>', '{ }', '///']

export function Team() {
  const { t } = useI18n()

  return (
    <section
      id="equipo"
      aria-labelledby="equipo-title"
      className="border-t border-border bg-surface/40 px-4 py-20 md:px-6 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="equipo-title"
          label={t.team.label}
          title={t.team.title}
          lead={t.team.lead}
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.team.roles.map((member, i) => (
            <li
              key={i}
              className="flex flex-col rounded-card border border-border bg-background p-7"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-14 items-center justify-center rounded-chip bg-muted font-mono text-lg font-bold text-accent"
              >
                {GLYPHS[i % GLYPHS.length]}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-accent">{member.role}</p>
              <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
