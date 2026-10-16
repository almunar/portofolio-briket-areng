import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { CtaLink } from '@/components/cta-link'
import { SocialLinks } from '@/components/social-links'
import { FinalCta } from '@/components/final-cta'
import { principles } from '@/lib/content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Munar Briquette Trading is an independent Indonesia-based trading and sourcing partner for international B2B charcoal buyers.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Munar"
        title="An Independent Partner for Indonesian Charcoal Sourcing."
        intro="Munar Briquette Trading helps international B2B buyers source coconut shell charcoal briquettes and selected Indonesian charcoal products."
        image="/images/hardwood-lump.png"
        imageAlt="Illustrative natural hardwood charcoal"
      />

      <section aria-labelledby="who-heading" className="bg-paper py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Who we are" title={<span id="who-heading">A sourcing partner, not a factory.</span>} />
            <Reveal delay={100} className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Munar Briquette Trading is an independent, Indonesia-based international trading and sourcing business.
                We work on behalf of importers, distributors, wholesalers, and private label brands who want a clear
                point of contact for Indonesian charcoal supply.
              </p>
              <p>
                We do not own a factory, and we are not an exclusive agent for any manufacturer. That independence lets
                us focus on your requirement first, then look for supply partners that may be able to meet it.
              </p>
              <p>
                Specifications, grades, shapes, packaging, availability, and commercial terms are always confirmed with
                the selected supplier and finalised in agreement with you. We prefer to under-promise and confirm,
                rather than publish claims we cannot verify.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/coconut-origin.png"
                alt="Illustrative coconut shells, the raw material for coconut shell charcoal"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="founder-heading" className="bg-charcoal py-20 text-paper md:py-28">
        <Container className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-sand">Founder</p>
            <h2 id="founder-heading" className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              {site.founder}
            </h2>
            <p className="mt-3 text-paper/60">{site.position}</p>
            <p className="mt-8 max-w-xl leading-relaxed text-paper/75">
              Buyers work directly with the founder, from the first requirement review through quotation, order
              communication, and supplier-side shipment coordination.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:col-span-5 md:items-end">
            <SocialLinks />
            <CtaLink href="/contact" variant="outline-light">
              Contact Munar
            </CtaLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach-heading" className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Our approach" title={<span id="approach-heading">How we work with buyers.</span>} />
          <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="bg-card p-8">
                <span className="font-serif text-sm text-sand">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-xl leading-snug text-charcoal">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}
