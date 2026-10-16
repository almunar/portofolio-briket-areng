'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Field, FieldGroup, controlClass, describedBy } from './fields'
import { InquiryReady } from './inquiry-ready'
import {
  buyerTypeOptions,
  emptyInquiry,
  fieldOrder,
  formatInquiry,
  incotermOptions,
  productInterestOptions,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryValues,
} from '@/lib/inquiry'
import { getProduct } from '@/lib/products'
import { cn } from '@/lib/utils'

function initialValues(productSlug: string | null): InquiryValues {
  const product = productSlug ? getProduct(productSlug) : undefined
  return product ? { ...emptyInquiry, productInterest: product.formValue } : emptyInquiry
}

const labels: Record<InquiryField, string> = {
  companyName: 'Company Name',
  contactName: 'Contact Name',
  email: 'Business Email',
  phone: 'Phone / WhatsApp',
  country: 'Country / Market',
  buyerType: 'Buyer Type',
  productInterest: 'Product Interest',
  specification: 'Grade / Specification Preference',
  quantity: 'Estimated Quantity (MT)',
  destination: 'Destination Port / City',
  shapeSize: 'Product Shape / Size',
  packaging: 'Packaging Requirements',
  incoterm: 'Preferred Incoterm',
  additional: 'Additional Requirements',
  consent: 'Consent',
}

export function QuoteForm() {
  const searchParams = useSearchParams()
  const [values, setValues] = useState<InquiryValues>(() => initialValues(searchParams.get('product')))
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [inquiry, setInquiry] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const update = (field: InquiryField, value: string | boolean) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (attempted) setErrors(validateInquiry(next))
  }

  const onText = (field: InquiryField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    update(field, e.target.value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (processing) return
    setProcessing(true)
    setAttempted(true)

    const found = validateInquiry(values)
    setErrors(found)

    const firstInvalid = fieldOrder.find((f) => found[f])
    if (firstInvalid) {
      setProcessing(false)
      requestAnimationFrame(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus({ preventScroll: true })
      })
      return
    }

    setInquiry(formatInquiry(values))
    setProcessing(false)
  }

  const handleEdit = () => {
    setInquiry(null)
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[name="companyName"]')?.focus()
    })
  }

  if (inquiry) return <InquiryReady inquiry={inquiry} onEdit={handleEdit} />

  const errorList = fieldOrder.filter((f) => errors[f])
  const a11y = (field: InquiryField, hint?: string) => ({
    id: field,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(field, errors[field], hint),
  })

  const hints = {
    phone: 'Include the country code, for example +971 50 123 4567.',
    quantity: 'Numbers only, in metric tonnes. A 20 ft container is often around 18 to 20 MT, depending on product.',
    specification: 'For example, your targets for ash content, moisture, or ash colour.',
    shapeSize: 'For example, 25 mm cube or 50 × 100 mm hexagonal.',
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Request a quotation" className="flex flex-col gap-10">
      <div ref={summaryRef} className="scroll-mt-28">
        {errorList.length > 0 && (
          <div role="alert" className="border border-destructive/40 bg-destructive/5 p-5 text-sm">
            <p className="font-medium text-destructive">
              Please check {errorList.length === 1 ? '1 field' : `${errorList.length} fields`} before continuing:
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {errorList.map((f) => (
                <li key={f}>
                  <a href={`#${f}`} className="text-charcoal underline underline-offset-4 hover:text-destructive">
                    {labels[f]}
                  </a>
                  <span className="text-muted-foreground"> — {errors[f]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <FieldGroup legend="Buyer details">
        <Field id="companyName" label={labels.companyName} required error={errors.companyName}>
          <input
            {...a11y('companyName')}
            type="text"
            autoComplete="organization"
            required
            value={values.companyName}
            onChange={onText('companyName')}
            className={controlClass}
          />
        </Field>
        <Field id="contactName" label={labels.contactName} required error={errors.contactName}>
          <input
            {...a11y('contactName')}
            type="text"
            autoComplete="name"
            required
            value={values.contactName}
            onChange={onText('contactName')}
            className={controlClass}
          />
        </Field>
        <Field id="email" label={labels.email} required error={errors.email}>
          <input
            {...a11y('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            spellCheck={false}
            value={values.email}
            onChange={onText('email')}
            className={controlClass}
            placeholder="name@company.com"
          />
        </Field>
        <Field id="phone" label={labels.phone} hint={hints.phone} error={errors.phone}>
          <input
            {...a11y('phone', hints.phone)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={onText('phone')}
            className={controlClass}
          />
        </Field>
        <Field id="country" label={labels.country} required error={errors.country}>
          <input
            {...a11y('country')}
            type="text"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={onText('country')}
            className={controlClass}
          />
        </Field>
        <Field id="buyerType" label={labels.buyerType} error={errors.buyerType}>
          <select {...a11y('buyerType')} value={values.buyerType} onChange={onText('buyerType')} className={controlClass}>
            <option value="">Select buyer type</option>
            {buyerTypeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </FieldGroup>

      <FieldGroup
        legend="Product requirements"
        description="Share what you know. Anything unclear can be discussed and confirmed with the selected supplier."
      >
        <Field id="productInterest" label={labels.productInterest} required error={errors.productInterest}>
          <select
            {...a11y('productInterest')}
            required
            value={values.productInterest}
            onChange={onText('productInterest')}
            className={controlClass}
          >
            <option value="">Select a product</option>
            {productInterestOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="quantity" label={labels.quantity} hint={hints.quantity} error={errors.quantity}>
          <input
            {...a11y('quantity', hints.quantity)}
            type="text"
            inputMode="decimal"
            value={values.quantity}
            onChange={onText('quantity')}
            className={controlClass}
            placeholder="e.g. 18"
          />
        </Field>
        <Field id="shapeSize" label={labels.shapeSize} hint={hints.shapeSize} error={errors.shapeSize}>
          <input
            {...a11y('shapeSize', hints.shapeSize)}
            type="text"
            value={values.shapeSize}
            onChange={onText('shapeSize')}
            className={controlClass}
          />
        </Field>
        <Field id="specification" label={labels.specification} hint={hints.specification} error={errors.specification}>
          <input
            {...a11y('specification', hints.specification)}
            type="text"
            value={values.specification}
            onChange={onText('specification')}
            className={controlClass}
          />
        </Field>
        <Field id="packaging" label={labels.packaging} error={errors.packaging} className="sm:col-span-2">
          <textarea
            {...a11y('packaging')}
            rows={3}
            value={values.packaging}
            onChange={onText('packaging')}
            className={cn(controlClass, 'resize-y')}
            placeholder="e.g. inner wrap, retail box, master carton, bulk, or private label"
          />
        </Field>
      </FieldGroup>

      <FieldGroup legend="Shipment preferences">
        <Field id="incoterm" label={labels.incoterm} error={errors.incoterm}>
          <select {...a11y('incoterm')} value={values.incoterm} onChange={onText('incoterm')} className={controlClass}>
            <option value="">Select Incoterm</option>
            {incotermOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="destination" label={labels.destination} error={errors.destination}>
          <input
            {...a11y('destination')}
            type="text"
            value={values.destination}
            onChange={onText('destination')}
            className={controlClass}
            placeholder="e.g. Jebel Ali, Dubai"
          />
        </Field>
        <Field id="additional" label={labels.additional} error={errors.additional} className="sm:col-span-2">
          <textarea
            {...a11y('additional')}
            rows={5}
            value={values.additional}
            onChange={onText('additional')}
            className={cn(controlClass, 'resize-y')}
            placeholder="Timeline, sampling needs, certifications you require, or anything else we should know."
          />
        </Field>
      </FieldGroup>

      <div className="border-t border-border pt-8">
        <div className="flex gap-3">
          <input
            {...a11y('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-charcoal"
          />
          <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-charcoal">
            I agree that Munar Briquette Trading may use the information above to respond to my sourcing inquiry. I
            understand that availability, specifications, and commercial terms are subject to supplier confirmation.
            <span className="text-destructive" aria-hidden="true">
              {' *'}
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-2 pl-8 text-sm text-destructive">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-destructive" aria-hidden="true">
            *
          </span>{' '}
          Required fields
        </p>
        <button
          type="submit"
          disabled={processing}
          aria-disabled={processing}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-charcoal px-7 text-sm font-medium text-paper transition-all duration-300 hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {processing ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          )}
          {processing ? 'Preparing…' : 'Prepare My Inquiry'}
        </button>
      </div>
    </form>
  )
}
