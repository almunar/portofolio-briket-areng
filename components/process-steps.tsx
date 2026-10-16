import { Reveal } from './reveal'
import { Notice } from './section'
import { processDisclaimer, processSteps } from '@/lib/content'
import { cn } from '@/lib/utils'

export function ProcessSteps({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  return (
    <>
      <ol
        className={cn(
          'grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-3',
          dark ? 'border-paper/10 bg-paper/10' : 'border-border bg-border',
        )}
      >
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={(i % 3) * 90}
            className={cn(
              'group relative flex flex-col p-8 transition-colors duration-500 md:p-10',
              dark ? 'bg-charcoal hover:bg-charcoal-soft' : 'bg-card hover:bg-paper',
            )}
          >
            <span
              className={cn(
                'font-serif text-6xl leading-none transition-colors duration-500',
                dark ? 'text-paper/15 group-hover:text-sand' : 'text-charcoal/15 group-hover:text-forest',
              )}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={cn('mt-8 font-serif text-xl leading-snug md:text-2xl', dark ? 'text-paper' : 'text-charcoal')}>
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className={cn('mt-3 text-sm leading-relaxed', dark ? 'text-paper/60' : 'text-muted-foreground')}>
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
      {dark ? (
        <p className="mt-8 max-w-3xl border-l-2 border-sand pl-4 text-sm leading-relaxed text-paper/65">
          {processDisclaimer}
        </p>
      ) : (
        <Notice className="mt-8 max-w-3xl">{processDisclaimer}</Notice>
      )}
    </>
  )
}
