import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/SectionHeading'
import { GITHUB_URL, PROJECTS } from '@/content/data'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/data'

/** Mockup abstracto hecho en CSS: sustituye screenshots sin fotos reales. */
function ProjectArt({ project, tall }: { project: Project; tall?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-card border border-border bg-background',
        tall ? 'h-56 md:h-72' : 'h-32 md:h-36'
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{project.name}</span>
      </div>
      <div className="dd-grid-bg flex h-full items-center justify-center">
        <span className="font-display text-6xl font-extrabold text-accent/25 md:text-8xl">
          {project.glyph}
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useI18n()
  return (
    <article className="group flex flex-col gap-4">
      <ProjectArt project={project} tall={project.featured} />
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3
            className={cn(
              'font-mono font-bold',
              project.featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            )}
          >
            {project.name}
          </h3>
          <Badge variant="status">{t.projects.statuses[project.status]}</Badge>
        </div>
        <p
          className={cn(
            'mt-2 text-muted-foreground',
            project.featured ? 'max-w-xl text-base' : 'text-sm'
          )}
        >
          {project.tagline[lang]}
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {project.stack.join(' · ')}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-chip font-mono text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t.projects.ctaCode}
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">{` — ${project.name}`}</span>
        </a>
      </div>
    </article>
  )
}

export function Projects() {
  const { t } = useI18n()
  const featured = PROJECTS.find((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="border-y border-border bg-surface/40 px-4 py-20 md:px-6 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="proyectos-title"
          label={t.projects.label}
          title={t.projects.title}
          lead={t.projects.lead}
        />

        {/* Grid irregular: 1 destacado + 3 secundarios en proporciones distintas */}
        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {featured && (
            <div className="lg:col-span-12">
              <ProjectCard project={featured} />
            </div>
          )}
          {rest.map((p, i) => (
            <div
              key={p.id}
              className={cn(i === 0 && 'lg:col-span-5', i === 1 && 'lg:col-span-4', i === 2 && 'lg:col-span-3')}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            {t.projects.more}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
