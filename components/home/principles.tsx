import { Container } from '../section'
import { Reveal } from '../reveal'
import { principles } from '@/lib/content'

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="border-b border-border bg-paper">
      <h2 id="principles-heading" className="sr-only">
        How Munar works with buyers
      </h2>
      <Container>
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 80}
              className="py-10 sm:border-border sm:px-6 sm:odd:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <span className="font-serif text-sm text-sand">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-xl leading-snug text-charcoal">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
