import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/data'

/**
 * "Captura" de cada proyecto: panel de terminal con git log y métricas.
 * Prueba de trabajo sin necesitar screenshots (hasta que los haya).
 * Los commits y métricas son datos reales para lectores de pantalla.
 */
export function ProjectArt({ project, tall }: { project: Project; tall?: boolean }) {
  const { t, lang } = useI18n()
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card border border-border bg-background font-mono',
        tall ? 'text-sm' : 'text-xs'
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border" aria-hidden="true" />
        <span className="ml-3 text-muted-foreground">{project.name}</span>
        <span className="ml-auto hidden text-muted-foreground/60 sm:inline">
          {project.stack.join(' · ')}
        </span>
      </div>
      <div className={cn('px-4 py-4 md:px-5', tall ? 'md:py-6' : 'md:py-4')}>
        <p aria-hidden="true" className="text-muted-foreground">
          <span className="text-accent">$</span> {t.projects.logLabel}
        </p>
        <ul className={cn('mt-3', tall ? 'space-y-2' : 'space-y-1.5')}>
          {project.commits.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent/70">
                {['a1f2c9e', '7b39d04', 'e5821aa'][i % 3]}
              </span>
              <span className={cn(i === 0 ? 'text-foreground' : 'text-muted-foreground')}>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-border pt-3 text-accent">{project.metrics[lang]}</p>
      </div>
    </div>
  )
}
