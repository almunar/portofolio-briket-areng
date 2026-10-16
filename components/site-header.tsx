'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { SocialLinks } from './social-links'
import { mainNav, site } from '@/lib/site'
import { products } from '@/lib/products'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

const navLinkClass =
  'relative py-2 text-sm text-paper/75 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-sand after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 data-[active=true]:text-paper data-[active=true]:after:scale-x-100'

function ProductsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrapperRef.current?.querySelector('button')?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center gap-1"
      onPointerEnter={(e) => e.pointerType === 'mouse' && openNow()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && closeSoon()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <Link href="/products" className={navLinkClass} data-active={isActive(pathname, '/products')}>
        Products
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        aria-label="Show product categories"
        onClick={() => setOpen((v) => !v)}
        className="flex size-7 items-center justify-center rounded-sm text-paper/70 hover:text-paper focus-visible:outline-2 focus-visible:outline-paper"
      >
        <ChevronDown className={cn('size-4 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div
        id="products-menu"
        className={cn(
          'absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-4 transition-all duration-300',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-paper/10 bg-paper/10 shadow-2xl">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex h-full flex-col gap-1 bg-charcoal-soft p-5 transition-colors hover:bg-charcoal focus-visible:bg-charcoal focus-visible:outline-none"
              >
                <span className="text-[0.65rem] tracking-[0.22em] text-sand">{p.index}</span>
                <span className="font-serif text-lg text-paper">{p.navLabel}</span>
                <span className="text-xs leading-relaxed text-paper/60">{p.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-500',
        scrolled || mobileOpen
          ? 'border-paper/10 bg-charcoal/95 backdrop-blur-md'
          : 'border-transparent bg-charcoal',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) =>
              item.href === '/products' ? (
                <li key={item.href}>
                  <ProductsMenu pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClass} data-active={isActive(pathname, item.href)}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks size="sm" className="hidden xl:flex" />
          <Link
            href="/request-quote"
            className="hidden min-h-10 items-center rounded-sm bg-paper px-4 text-sm font-medium text-charcoal transition-colors duration-300 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper sm:inline-flex"
          >
            Request a Quotation
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-sm text-paper focus-visible:outline-2 focus-visible:outline-paper lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-18 bottom-0 overflow-y-auto bg-charcoal transition-all duration-500 ease-out lg:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
        )}
        inert={!mobileOpen}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pt-6 pb-10">
          <ul className="flex flex-col border-t border-paper/10">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  'border-b border-paper/10 transition-all duration-500',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                )}
                style={{ transitionDelay: mobileOpen ? `${80 + i * 50}ms` : '0ms' }}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 font-serif text-3xl text-paper"
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(pathname, item.href) && <span className="size-2 rounded-full bg-sand" aria-hidden="true" />}
                </Link>
                {item.href === '/products' && (
                  <ul className="grid grid-cols-2 gap-2 pb-5">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="block rounded-sm border border-paper/10 px-3 py-3 text-sm text-paper/75 hover:border-paper/30 hover:text-paper"
                        >
                          {p.navLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-6">
            <Link
              href="/request-quote"
              className="flex min-h-12 items-center justify-center rounded-sm bg-paper text-sm font-medium text-charcoal"
            >
              Request a Quotation
            </Link>
            <div className="flex items-center justify-between">
              <a href={`mailto:${site.email}`} className="text-sm text-paper/70 hover:text-paper">
                {site.email}
              </a>
              <SocialLinks size="sm" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
