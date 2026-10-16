import type { Metadata } from 'next'
import { Container, Notice, PageHero } from '@/components/section'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { CtaLink } from '@/components/cta-link'
import { FinalCta } from '@/components/final-cta'
import { products } from '@/lib/products'
import { catalogueDisclaimer, imageDisclaimer } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Shisha and hookah briquettes, BBQ charcoal, natural hardwood charcoal, and private label sourcing from Indonesia, matched to buyer requirements.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Indonesian charcoal, matched to your requirement."
        intro="Explore the product categories Munar can help you source. Every option is subject to supplier confirmation, so you always see what is potential rather than promised."
        image="/images/shisha-cubes.png"
        imageAlt="Illustrative coconut shell charcoal briquettes"
      >
        <CtaLink href="/request-quote" variant="solid-light">
          Request a Quotation
        </CtaLink>
      </PageHero>

      <section aria-label="Product categories" className="bg-paper py-20 md:py-28">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">{imageDisclaimer}</p>
          <Notice className="mt-10 max-w-3xl">{catalogueDisclaimer}</Notice>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}
