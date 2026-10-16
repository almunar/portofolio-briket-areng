import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { Container } from '@/components/section'
import { CtaLink } from '@/components/cta-link'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/social-links'
import { site, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name} via WhatsApp, email, Instagram, or LinkedIn to discuss Indonesian charcoal sourcing.`,
  alternates: { canonical: '/contact' },
}

type Channel = { label: string; value: string; href?: string; icon: ReactNode; external?: boolean }

const channels: Channel[] = [
  {
    label: 'WhatsApp',
    value: site.whatsappDisplay,
    href: whatsappLink(`Hello ${site.name}, I would like to discuss a charcoal sourcing requirement.`),
    icon: <WhatsAppIcon className="size-5" />,
    external: true,
  },
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-5" aria-hidden="true" /> },
  {
    label: 'Instagram',
    value: '@padlanmunarbriquette',
    href: site.instagramUrl,
    icon: <InstagramIcon className="size-5" />,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: site.founder,
    href: site.linkedinUrl,
    icon: <LinkedInIcon className="size-5" />,
    external: true,
  },
  { label: 'Location', value: `Based in ${site.location}`, icon: <MapPin className="size-5" aria-hidden="true" /> },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal pt-36 pb-20 text-paper md:pt-44 md:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sand">Contact</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
              Talk directly with Munar.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
              For a structured quotation, use the request form. For a quick question, WhatsApp is usually the fastest
              way to reach {site.founder}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <CtaLink href="/request-quote" variant="solid-light">
              Request a Quotation
            </CtaLink>
          </div>
        </Container>
      </section>

      <section aria-label="Contact channels" className="bg-paper py-20 md:py-28">
        <Container>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-full border border-border text-charcoal transition-colors group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-paper">
                    {c.icon}
                  </span>
                  <span className="mt-8 eyebrow text-muted-foreground">{c.label}</span>
                  <span className="mt-2 flex items-center gap-2 font-serif text-xl break-all text-charcoal">
                    {c.value}
                    {c.href && (
                      <ArrowUpRight
                        className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                </>
              )
              return (
                <li key={c.label} className="bg-card">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex h-full flex-col p-8 transition-colors hover:bg-stone/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-charcoal md:p-10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex h-full flex-col p-8 md:p-10">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
    </>
  )
}
