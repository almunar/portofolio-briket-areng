import { Container } from '@/components/section'
import { CtaLink } from '@/components/cta-link'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-charcoal pt-28 text-paper">
      <Container>
        <p className="eyebrow text-sand">404</p>
        <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">This page could not be found.</h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/" variant="solid-light">
            Back to Home
          </CtaLink>
          <CtaLink href="/products" variant="outline-light">
            View Products
          </CtaLink>
        </div>
      </Container>
    </section>
  )
}
