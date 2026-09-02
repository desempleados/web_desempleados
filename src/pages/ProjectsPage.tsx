import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { ProjectShot } from '@/components/ProjectShot'
import { SectionHeading } from '@/components/SectionHeading'
import { PROJECTS } from '@/content/data'
import { useI18n } from '@/i18n'
import type { Project } from '@/content/data'

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useI18n()
  return (
    <article className="grid gap-6 border-b border-border py-12 first:pt-0 last:border-b-0 lg:grid-cols-12 lg:gap-10">
      {/* Captura */}
      <div className={cn2(index % 2 === 1 ? 'lg:order-2' : undefined, 'lg:col-span-7')}>
        <ProjectShot kind={project.shot} name={project.name} tall={index === 0} />
      </div>

      {/* Información */}
      <div className="flex flex-col justify-center lg:col-span-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="font-mono text-xl font-bold tracking-tight md:text-2xl">{project.name}</h2>
          <Badge variant="status">{t.projectsPage.statuses[project.status]}</Badge>
        </div>
        <p className="mt-3 text-muted-foreground">{project.tagline[lang]}</p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{project.stack.join(' · ')}</p>
        <p className="mt-1 font-mono text-xs text-accent">{project.metrics[lang]}</p>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-chip font-mono text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t.projectsPage.ctaCode}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-chip font-mono text-sm text-muted-foreground">
            {t.projectsPage.comingSoon}
          </span>
        )}
      </div>
    </article>
  )
}

// helper local para no importar cn dos veces con orden
function cn2(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

export function ProjectsPage() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="proyectos-title" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="proyectos-title" label={t.projectsPage.label} title={t.projectsPage.title} lead={t.projectsPage.lead} />
        <div className="mt-4">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
        <p className="mt-12 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground/70">
          {t.projectsPage.more}
        </p>
      </div>
    </section>
  )
}
