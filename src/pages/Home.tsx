import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { DiscordIcon, GithubIcon } from '@/components/Footer'
import { DISCORD_URL, PRODUCTS } from '@/content/data'
import { useI18n } from '@/i18n'
import { cn, formatPrice } from '@/lib/utils'

/** Placeholder honesto: nada de terminal simulada tipeando — cuando haya un
 * proyecto real que mostrar, esto se reemplaza por su captura real. */
function HeroPreview() {
  const { t } = useI18n()
  return (
    <div className="hidden overflow-hidden rounded-card border border-dashed border-input bg-background/40 lg:block" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-dashed border-input px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted" />
        <span className="size-2.5 rounded-full bg-muted" />
        <span className="size-2.5 rounded-full bg-muted" />
      </div>
      <div className="flex h-44 items-center justify-center">
        <p className="font-mono text-xs text-muted-foreground/70">{t.hero.previewPending}</p>
      </div>
    </div>
  )
}

function Hero() {
  const { t } = useI18n()
  return (
    <section className="dd-hero-bg px-4 md:px-6" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 py-20 md:py-24 lg:min-h-[62vh] lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-start justify-center">
          <h1 id="hero-title" className="max-w-3xl font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] font-extrabold tracking-tight text-balance">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/tienda" className={cn(buttonVariants({ size: 'lg' }))}>
              {t.hero.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/proyectos" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              {t.hero.ctaSecondary}
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs text-muted-foreground">{t.hero.stackLine}</p>
        </div>
        <HeroPreview />
      </div>
    </section>
  )
}

function Services() {
  const { t, lang } = useI18n()
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="servicios-title" label={t.home.servicesLabel} title={t.home.servicesTitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              to="/tienda"
              className="group rounded-card border border-border bg-surface p-7 transition-colors hover:border-accent/50 active:border-accent"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold tracking-tight">{p.name[lang]}</h3>
                <span className="shrink-0 font-mono text-sm text-accent">{formatPrice(p.price, t.store.quote, t.store.monthly)}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.bullets.map((b) => b[lang]).join(' · ')}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                {t.home.servicesCta}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <Link to="/tienda" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline active:text-accent-strong">
          {t.home.servicesMore}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  )
}

function Why() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="why-title" className="border-y border-border bg-surface/40 px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="why-title" title={t.home.whyTitle} />
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {t.home.whyPoints.map((p, i) => (
            <div key={i} className="border-l-2 border-accent/60 pl-4">
              <dt className="font-medium">{p.title}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Faq() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="faq-title" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="faq-title" label={t.home.faqLabel} title={t.home.faqTitle} />
        <Accordion type="single" collapsible className="mt-8 w-full">
          {t.home.faq.items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Community() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="comunidad-title" className="border-t border-border bg-surface/40 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="comunidad-title" title={t.home.communityTitle} lead={t.home.communityLead} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-card border border-border bg-background p-6 transition-colors hover:border-accent/50 active:border-accent"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-chip bg-[#5865F2]/15 text-[#8b9bff]">
              <DiscordIcon className="size-6" />
            </span>
            <span>
              <span className="block font-medium">{t.home.discordCta}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{t.home.discordNote}</span>
            </span>
            <ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="flex items-center gap-4 rounded-card border border-dashed border-input bg-background/60 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-chip bg-muted text-muted-foreground/60">
              <GithubIcon className="size-6" />
            </span>
            <span>
              <span className="block font-medium text-muted-foreground">{t.home.githubCta}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground/70">{t.home.githubNote}</span>
            </span>
            <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">{t.home.githubPending}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Why />
      <Faq />
      <Community />
    </>
  )
}
