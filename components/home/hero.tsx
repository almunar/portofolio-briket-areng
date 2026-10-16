import Image from 'next/image'
import { CtaLink } from '../cta-link'
import { WhatsAppIcon } from '../social-links'
import { Container } from '../section'
import { imageDisclaimer, site, whatsappLink } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-paper">
      <Image
        src="/images/hero-charcoal.png"
        alt="Illustrative stack of coconut shell charcoal briquettes with one cube glowing"
        fill
        priority
        sizes="100vw"
        className="animate-slow-zoom -z-20 object-cover object-[70%_center] opacity-80"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20 md:bg-gradient-to-r md:from-charcoal md:via-charcoal/80 md:to-transparent"
        aria-hidden="true"
      />

      <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pt-32 pb-12 md:justify-center md:pb-24">
        <div className="max-w-3xl">
          <p className="animate-rise-in eyebrow flex items-center gap-3 text-sand">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            Independent International Trader &amp; Sourcing Partner
          </p>
          <h1
            className="animate-rise-in mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-8xl"
            style={{ animationDelay: '120ms' }}
          >
            Indonesian Charcoal.
            <span className="block text-paper/60 italic">Connected to Global B2B&nbsp;Buyers.</span>
          </h1>
          <p
            className="animate-rise-in mt-8 max-w-xl text-base leading-relaxed text-pretty text-paper/75 md:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            Coconut shell charcoal briquettes and selected Indonesian charcoal products, sourced according to buyer
            requirements through independent B2B sourcing and commercial coordination.
          </p>
          <div
            className="animate-rise-in mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: '360ms' }}
          >
            <CtaLink href="/request-quote" variant="solid-light">
              Request a Quotation
            </CtaLink>
            <CtaLink href="/products" variant="outline-light">
              Explore Our Products
            </CtaLink>
            <CtaLink
              href={whatsappLink(`Hello ${site.name}, I would like to discuss a charcoal sourcing requirement.`)}
              variant="whatsapp"
              external
              icon={<WhatsAppIcon className="size-4" />}
            >
              Talk to Munar
            </CtaLink>
          </div>
        </div>

        <p className="mt-16 text-[0.7rem] text-paper/40 md:absolute md:right-8 md:bottom-6 md:mt-0">
          {imageDisclaimer}
        </p>
      </Container>
    </section>
  )
}
