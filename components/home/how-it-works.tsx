import { Container, SectionHeading } from '../section'
import { ProcessSteps } from '../process-steps'
import { CtaLink } from '../cta-link'

export function HowItWorks() {
  return (
    <section aria-labelledby="process-heading" className="bg-charcoal py-24 text-paper md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="How It Works"
            title={<span id="process-heading">A clear six-step sourcing process.</span>}
            intro="From your first brief to supplier-side shipment coordination, every step is communicated transparently."
          />
          <CtaLink href="/how-it-works" variant="outline-light" className="shrink-0">
            See the Full Process
          </CtaLink>
        </div>
        <div className="mt-16">
          <ProcessSteps />
        </div>
      </Container>
    </section>
  )
}
