import Image from 'next/image'
import { Container } from './section'
import { Reveal } from './reveal'
import { CtaLink } from './cta-link'
import { WhatsAppIcon } from './social-links'
import { site, whatsappLink } from '@/lib/site'

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative isolate overflow-hidden bg-charcoal text-paper">
      <Image
        src="/images/hero-charcoal.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-right opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/50" aria-hidden="true" />
      <Container className="py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <h2
            id="final-cta-heading"
            className="font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl"
          >
            Let&apos;s Discuss Your Charcoal Sourcing Requirements.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
            Share what you need and Munar will review it and respond with suitable next steps.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/request-quote" variant="solid-light">
              Request a Quotation
            </CtaLink>
            <CtaLink
              href={whatsappLink(`Hello ${site.name}, I would like to discuss a charcoal sourcing requirement.`)}
              variant="whatsapp"
              external
              icon={<WhatsAppIcon className="size-4" />}
            >
              Talk to Munar on WhatsApp
            </CtaLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
