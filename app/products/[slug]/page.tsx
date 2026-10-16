import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Container, PageHero } from '@/components/section'
import { CtaLink } from '@/components/cta-link'
import { ProductCard } from '@/components/product-card'
import { ProductDetails } from '@/components/products/product-details'
import { WhatsAppIcon } from '@/components/social-links'
import { getProduct, products } from '@/lib/products'
import { catalogueDisclaimer, imageDisclaimer, site, whatsappLink } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: product.description,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const others = products.filter((p) => p.slug !== product.slug)

  return (
    <>
      <PageHero
        eyebrow={`Product ${product.index} — ${product.shortName}`}
        title={product.name}
        intro={product.description}
        image={product.image}
        imageAlt={product.imageAlt}
      >
        <CtaLink href={`/request-quote?product=${product.slug}`} variant="solid-light">
          Request a Quotation
        </CtaLink>
        <CtaLink
          href={whatsappLink(`Hello ${site.name}, I would like to discuss ${product.name}.`)}
          variant="whatsapp"
          external
          icon={<WhatsAppIcon className="size-4" />}
        >
          Ask on WhatsApp
        </CtaLink>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link
              href="/products"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-charcoal"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All products
            </Link>
            <ProductDetails slug={product.slug} disclaimer={catalogueDisclaimer} />
            <p className="mt-6 text-xs text-muted-foreground">{imageDisclaimer}</p>
          </div>

          <aside className="lg:col-span-4" aria-label="Next step">
            <div className="sticky top-28 flex flex-col gap-5 bg-charcoal p-8 text-paper">
              <p className="eyebrow text-sand">Next step</p>
              <p className="font-serif text-2xl leading-snug">Tell us your exact requirement.</p>
              <p className="text-sm leading-relaxed text-paper/65">
                Share shape, size, target specification, quantity, packaging, and destination. Munar will review it
                against suitable supply options.
              </p>
              <CtaLink href={`/request-quote?product=${product.slug}`} variant="solid-light">
                Start Your Inquiry
              </CtaLink>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="other-products" className="border-t border-border bg-stone/50 py-20 md:py-28">
        <Container>
          <h2 id="other-products" className="font-serif text-3xl text-charcoal md:text-4xl">
            Other product categories
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
