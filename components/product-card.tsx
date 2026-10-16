import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden bg-charcoal text-paper">
      <div className={cn('relative overflow-hidden', featured ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[4/3]')}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={featured ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" aria-hidden="true" />
        <span className="absolute top-5 left-5 font-serif text-sm text-paper/80">{product.index}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-2xl leading-tight text-balance md:text-3xl">{product.name}</h3>
        <p className="mt-3 max-w-md flex-1 text-sm leading-relaxed text-paper/65">{product.summary}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-paper after:absolute after:inset-0 focus-visible:outline-none"
        >
          <span className="border-b border-sand/60 pb-0.5 transition-colors group-hover:border-paper">
            Explore Product
          </span>
          <span className="sr-only">: {product.name}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      <span
        className="pointer-events-none absolute inset-0 ring-2 ring-transparent ring-inset transition group-has-[a:focus-visible]:ring-sand"
        aria-hidden="true"
      />
    </article>
  )
}
