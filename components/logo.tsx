import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="22" width="9" height="9" fill="currentColor" />
      <rect x="22" y="22" width="9" height="9" fill="currentColor" />
      <rect x="15.5" y="9" width="9" height="9" fill="var(--sand)" />
    </svg>
  )
}

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4',
        tone === 'dark' ? 'text-paper focus-visible:outline-paper' : 'text-charcoal focus-visible:outline-charcoal',
        className,
      )}
    >
      <LogoMark className="size-9 shrink-0 transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-tight">Munar</span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.28em] uppercase opacity-70">
          Briquette Trading
        </span>
      </span>
      <span className="sr-only">, home</span>
    </Link>
  )
}
