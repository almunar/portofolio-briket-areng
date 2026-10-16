import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid-light' | 'solid-dark' | 'outline-light' | 'outline-dark' | 'whatsapp'

const variants: Record<Variant, string> = {
  'solid-light': 'bg-paper text-charcoal hover:bg-sand focus-visible:outline-paper',
  'solid-dark': 'bg-charcoal text-paper hover:bg-forest focus-visible:outline-charcoal',
  'outline-light':
    'border border-paper/30 text-paper hover:border-paper hover:bg-paper/5 focus-visible:outline-paper',
  'outline-dark':
    'border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5 focus-visible:outline-charcoal',
  whatsapp:
    'border border-paper/30 text-paper hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_24px_-6px_rgba(37,211,102,0.6)] focus-visible:outline-paper',
}

export const ctaBase =
  'group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2'

export function CtaLink({
  href,
  children,
  variant = 'solid-dark',
  external = false,
  icon,
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  external?: boolean
  icon?: ReactNode
  className?: string
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {!icon && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )
  const classes = cn(ctaBase, variants[variant], className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
