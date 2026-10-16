import Image from 'next/image'
import { Container, SectionHeading } from '../section'
import { Reveal } from '../reveal'
import { CtaLink } from '../cta-link'
import { site } from '@/lib/site'

export function AboutMunar() {
  return (
    <section aria-labelledby="about-heading" className="bg-paper py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1">
          <Image
            src="/images/coconut-origin.png"
            alt="Illustrative image of coconut shells, the raw material for coconut shell charcoal"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About Munar"
            title={<span id="about-heading">An Independent Partner for Indonesian Charcoal Sourcing.</span>}
          />
          <Reveal delay={120} className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Munar Briquette Trading is an independent, Indonesia-based trading and sourcing business. We connect
              international B2B requirements with suitable Indonesian charcoal supply options.
            </p>
            <p>
              Munar does not own a factory and is not an exclusive agent. Our role is to understand your requirement,
              identify supply partners that may be able to meet it, and coordinate specification, commercial, and
              supplier-side shipment communication on your behalf.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-10 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-xl text-charcoal">{site.founder}</p>
              <p className="mt-1 text-sm text-muted-foreground">Founder, {site.name}</p>
            </div>
            <CtaLink href="/about" variant="outline-dark">
              More About Munar
            </CtaLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
