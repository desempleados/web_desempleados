import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/i18n'

export function Faq() {
  const { t } = useI18n()

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-y border-border bg-surface/40 px-4 py-20 md:px-6 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Columna izquierda: título + diferencial. Sticky en desktop. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="faq-title"
              label={t.why.label}
              title={t.why.title}
              lead={t.why.lead}
            />
            <dl className="mt-10 space-y-7">
              {t.why.points.map((p, i) => (
                <div key={i} className="border-l-2 border-accent/50 pl-4">
                  <dt className="font-medium">{p.title}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Columna derecha: acordeón */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
