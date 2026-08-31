import { GithubIcon } from '@/components/Footer'
import { SectionHeading } from '@/components/SectionHeading'
import { TEAM } from '@/content/data'
import { useI18n } from '@/i18n'

export function About() {
  const { t, lang } = useI18n()

  return (
    <section aria-labelledby="nosotros-title" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="nosotros-title" label={t.aboutPage.label} title={t.aboutPage.title} lead={t.aboutPage.lead} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.id} className="flex flex-col rounded-card border border-border bg-surface p-6">
              {/* Espacio reservado para la foto: suelta la imagen en src/assets/team/
                  e impórtala aquí (campo photo de TEAM en src/content/data.ts). */}
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={`${t.aboutPage.photoAlt} ${m.name}`}
                  className="size-24 rounded-card object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex size-24 items-center justify-center rounded-card border border-dashed border-input bg-muted font-display text-2xl font-bold text-muted-foreground"
                >
                  {t.aboutPage.photoPending}
                </div>
              )}

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{m.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-accent">{m.role[lang]}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio[lang]}</p>

              <a
                href={m.github}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-5 font-mono text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                <GithubIcon className="size-4" />
                {t.aboutPage.github}
                <span className="sr-only"> — {m.name}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
