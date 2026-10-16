import type { Metadata } from 'next'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { ProcessSteps } from '@/components/process-steps'
import { CtaLink } from '@/components/cta-link'
import { FinalCta } from '@/components/final-cta'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'A transparent six-step sourcing process, from requirement review and supplier matching to supplier-side export and shipment coordination.',
  alternates: { canonical: '/how-it-works' },
}

const roles = [
  {
    title: 'What Munar does',
    items: [
      'Reviews and clarifies your requirement',
      'Identifies Indonesian supply options that may fit',
      'Coordinates specification confirmation and quotation',
      'Handles order communication with the supply side',
      'Follows up on supplier-side export and shipment preparation',
    ],
  },
  {
    title: 'What Munar does not claim',
    items: [
      'Ownership of a factory or production facility',
      'Exclusive agency for any manufacturer',
      'Fixed in-house grades or quality standards',
      'Guaranteed stock, pricing, or lead times before supplier confirmation',
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="A clear, requirement-first sourcing process."
        intro="Every inquiry starts with your requirement, not a fixed catalogue. Here is how Munar moves it from brief to supplier-side shipment coordination."
        image="/images/coconut-origin.png"
        imageAlt="Illustrative coconut shells"
      >
        <CtaLink href="/request-quote" variant="solid-light">
          Submit Your Requirements
        </CtaLink>
      </PageHero>

      <section aria-labelledby="steps-heading" className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="The six steps" title={<span id="steps-heading">From brief to shipment.</span>} />
          <div className="mt-14">
            <ProcessSteps tone="light" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="roles-heading" className="border-t border-border bg-stone/50 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Transparency"
            title={<span id="roles-heading">A clear role, stated plainly.</span>}
            intro="International buyers deserve to know exactly who they are working with. Munar is an independent trading and sourcing partner."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 100} className="bg-card p-8 md:p-10">
                <h3 className="font-serif text-2xl text-charcoal">{role.title}</h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {role.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className={i === 0 ? 'mt-2 size-1.5 shrink-0 bg-forest' : 'mt-2 size-1.5 shrink-0 bg-sand'}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}
