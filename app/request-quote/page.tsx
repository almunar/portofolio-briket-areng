import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Mail } from 'lucide-react'
import { Container } from '@/components/section'
import { QuoteForm } from '@/components/quote/quote-form'
import { WhatsAppIcon } from '@/components/social-links'
import { catalogueDisclaimer, site, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Request a Quotation',
  description:
    'Share your charcoal sourcing requirement with Munar Briquette Trading. Prepare a structured inquiry and send it via WhatsApp or email.',
  alternates: { canonical: '/request-quote' },
}

const steps = [
  { title: 'Fill in your requirement', body: 'Required fields are marked. Everything else helps us respond faster.' },
  { title: 'Review the formatted inquiry', body: 'We prepare a clear, structured message from your answers.' },
  { title: 'Send via WhatsApp or Email', body: 'Your app opens with the message pre-filled. Press send to deliver it.' },
]

export default function RequestQuotePage() {
  return (
    <>
      <section className="bg-charcoal pt-36 pb-16 text-paper md:pt-44 md:pb-20">
        <Container>
          <p className="eyebrow text-sand">Request a Quotation</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
            Tell us what you need to source.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg">
            This form does not send anything on its own. It prepares a structured inquiry that you then send to Munar
            through WhatsApp or email, so you keep a copy and always know exactly what was shared.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-[60rem] animate-pulse bg-stone/40" aria-hidden="true" />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-8 lg:col-span-4" aria-label="How this form works">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-muted-foreground">How this works</p>
              <ol className="mt-6 flex flex-col gap-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="font-serif text-2xl leading-none text-sand" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground">Prefer to write directly?</p>
                <ul className="mt-4 flex flex-col gap-3 text-sm">
                  <li>
                    <a
                      href={whatsappLink(`Hello ${site.name}, I would like to discuss a charcoal sourcing requirement.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-charcoal underline-offset-4 hover:underline"
                    >
                      <WhatsAppIcon className="size-4" />
                      {site.whatsappDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center gap-2.5 text-charcoal underline-offset-4 hover:underline"
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>

              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{catalogueDisclaimer}</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
