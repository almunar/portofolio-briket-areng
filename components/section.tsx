import Image from 'next/image'
import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 md:px-8', className)}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'light',
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <p className={cn('eyebrow flex items-center gap-3', tone === 'dark' ? 'text-sand' : 'text-forest')}>
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          'mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl',
          tone === 'dark' ? 'text-paper' : 'text-charcoal',
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            'mt-6 max-w-2xl text-base leading-relaxed text-pretty md:text-lg',
            tone === 'dark' ? 'text-paper/70' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  image?: string
  imageAlt?: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-paper">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ''}
            fill
            priority
            sizes="100vw"
            className="animate-slow-zoom -z-20 object-cover opacity-60"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30"
            aria-hidden="true"
          />
        </>
      )}
      <Container className="py-24 md:py-32">
        <div className="animate-rise-in max-w-3xl">
          <p className="eyebrow flex items-center gap-3 text-sand">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-paper/75 md:text-lg">{intro}</p>
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  )
}

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex gap-3 border-l-2 border-sand bg-stone/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
