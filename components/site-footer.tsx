import Link from 'next/link'
import { Logo } from './logo'
import { SocialLinks } from './social-links'
import { catalogueDisclaimer, mainNav, site } from '@/lib/site'
import { products } from '@/lib/products'

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-paper">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
              {site.position}. Connecting international B2B buyers with suitable Indonesian charcoal supply options.
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <nav aria-label="Footer site" className="md:col-span-2">
            <h2 className="eyebrow text-paper/50">Company</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/75 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer products" className="md:col-span-2">
            <h2 className="eyebrow text-paper/50">Products</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-paper/75 transition-colors hover:text-paper">
                    {p.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-paper/50">Contact</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="text-paper/75 transition-colors hover:text-paper">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/75 transition-colors hover:text-[#25D366]"
                >
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li className="text-paper/50">Based in {site.location}</li>
            </ul>
            <Link
              href="/request-quote"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm border border-paper/30 px-5 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-charcoal"
            >
              Request a Quotation
            </Link>
          </div>
        </div>

        <p className="mt-16 max-w-3xl text-xs leading-relaxed text-paper/45">
          {catalogueDisclaimer} Munar Briquette Trading is an independent trader and sourcing partner and does not
          own or operate manufacturing facilities.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            {'© '}
            {new Date().getFullYear()} {site.name}. {site.founder}.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-paper">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
