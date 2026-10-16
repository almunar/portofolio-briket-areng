import { Container, SectionHeading } from '../section'
import { Reveal } from '../reveal'
import { markets } from '@/lib/content'

export function Markets() {
  return (
    <section aria-labelledby="markets-heading" className="bg-stone/60 py-24 md:py-32">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Target Markets"
            title={<span id="markets-heading">Where we aim to serve buyers.</span>}
            intro="These are the markets Munar is focused on developing. They are target regions, not a list of existing customers or confirmed sales destinations."
          />
        </div>
        <div className="lg:col-span-7">
          <ul className="border-t border-charcoal/15">
            {markets.map((m, i) => (
              <Reveal as="li" key={m.region} delay={i * 90} className="grid gap-4 border-b border-charcoal/15 py-8 md:grid-cols-[14rem_1fr]">
                <h3 className="font-serif text-2xl text-charcoal">{m.region}</h3>
                {m.countries.length > 0 ? (
                  <ul className="flex flex-wrap gap-2" aria-label={`${m.region} target countries`}>
                    {m.countries.map((c) => (
                      <li
                        key={c}
                        className="rounded-sm border border-charcoal/15 bg-paper/70 px-3 py-1.5 text-sm text-charcoal/80"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.note}</p>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
