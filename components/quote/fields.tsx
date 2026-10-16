import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const controlClass =
  'block w-full rounded-sm border border-input bg-card px-4 py-3 text-base text-charcoal transition-colors placeholder:text-muted-foreground/70 hover:border-charcoal/40 focus:border-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/15 aria-invalid:border-destructive aria-invalid:ring-destructive/15 md:text-sm'

export function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-charcoal">
        <span>
          {label}
          {required && (
            <span className="text-destructive" aria-hidden="true">
              {' *'}
            </span>
          )}
        </span>
        {!required && <span className="text-xs font-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

export function FieldGroup({ legend, description, children }: { legend: string; description?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-8">
      <legend className="float-left w-full font-serif text-2xl text-charcoal">{legend}</legend>
      {description && <p className="clear-both pt-2 text-sm text-muted-foreground">{description}</p>}
      <div className="clear-both grid gap-6 pt-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}
