import { useI18n } from '@/i18n'

interface SectionHeadingProps {
  label?: string
  title: string
  lead?: string
  id?: string
}

export function SectionHeading({ label, title, lead, id }: SectionHeadingProps) {
  const { lang } = useI18n()
  return (
    <div className="max-w-3xl">
      {label && (
        <p
          className="font-mono text-sm text-accent"
          aria-hidden={false}
          lang={lang}
        >
          <span aria-hidden="true">$ </span>
          {label}
        </p>
      )}
      <h2
        id={id}
        className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-5xl"
      >
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
    </div>
  )
}
