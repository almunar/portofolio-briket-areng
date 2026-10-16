import { Container, SectionHeading } from '../section'
import { Reveal } from '../reveal'
import { ProductCard } from '../product-card'
import { CtaLink } from '../cta-link'
import { products } from '@/lib/products'
import { imageDisclaimer } from '@/lib/site'

export function ProductOverview() {
  return (
    <section aria-labelledby="products-heading" className="bg-paper py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Product Categories"
            title={<span id="products-heading">Four ways to source Indonesian charcoal.</span>}
            intro="From shisha cubes to private label programmes, each category is matched to your requirement and confirmed against the selected supplier’s actual specification."
          />
          <CtaLink href="/products" variant="outline-dark" className="shrink-0">
            View All Products
          </CtaLink>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-12">
          {products.map((p, i) => (
            <Reveal
              as="li"
              key={p.slug}
              delay={(i % 2) * 100}
              className={i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'}
            >
              <ProductCard product={p} featured={i === 0 || i === 3} />
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">{imageDisclaimer}</p>
      </Container>
    </section>
  )
}
