import { site } from './site'

export const productInterestOptions = [
  'Shisha / Hookah',
  'BBQ / Grilling',
  'Natural Hardwood',
  'Private Label / OEM',
  'Not Sure Yet',
] as const

export const buyerTypeOptions = [
  'Importer',
  'Distributor',
  'Wholesaler',
  'Trading Company',
  'Private Label Brand',
  'Hospitality / Restaurant',
  'Retail Chain',
  'Other',
] as const

export const incotermOptions = ['FOB', 'CFR', 'CIF', 'EXW', 'DAP', 'To be discussed'] as const

export type InquiryValues = {
  companyName: string
  contactName: string
  email: string
  phone: string
  country: string
  buyerType: string
  productInterest: string
  specification: string
  quantity: string
  destination: string
  shapeSize: string
  packaging: string
  incoterm: string
  additional: string
  consent: boolean
}

export type InquiryField = keyof InquiryValues
export type InquiryErrors = Partial<Record<InquiryField, string>>

export const emptyInquiry: InquiryValues = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  buyerType: '',
  productInterest: '',
  specification: '',
  quantity: '',
  destination: '',
  shapeSize: '',
  packaging: '',
  incoterm: '',
  additional: '',
  consent: false,
}

export const fieldOrder: InquiryField[] = [
  'companyName',
  'contactName',
  'email',
  'phone',
  'country',
  'buyerType',
  'productInterest',
  'specification',
  'quantity',
  'destination',
  'shapeSize',
  'packaging',
  'incoterm',
  'additional',
  'consent',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_ALLOWED = /^[+]?[\d\s().-]+$/
const QUANTITY_PATTERN = /^\d+(\.\d+)?$/

const MAX_LENGTH: Partial<Record<InquiryField, number>> = {
  companyName: 160,
  contactName: 120,
  email: 254,
  phone: 40,
  country: 120,
  specification: 400,
  destination: 160,
  shapeSize: 300,
  packaging: 400,
  additional: 1500,
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {}
  const t = (v: string) => v.trim()

  if (!t(values.companyName)) errors.companyName = 'Please enter your company name.'
  if (!t(values.contactName)) errors.contactName = 'Please enter a contact name.'

  if (!t(values.email)) {
    errors.email = 'Please enter your business email.'
  } else if (!EMAIL_PATTERN.test(t(values.email))) {
    errors.email = 'Please enter a valid email address, for example name@company.com.'
  }

  if (t(values.phone)) {
    const digits = values.phone.replace(/\D/g, '')
    if (!PHONE_ALLOWED.test(t(values.phone))) {
      errors.phone = 'Use digits, spaces, parentheses, hyphens, and an optional leading +.'
    } else if (digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please include the full number with country code (7 to 15 digits).'
    }
  }

  if (!t(values.country)) errors.country = 'Please enter your country or target market.'

  if (!(productInterestOptions as readonly string[]).includes(values.productInterest)) {
    errors.productInterest = 'Please select a product interest.'
  }

  if (t(values.quantity) && !QUANTITY_PATTERN.test(t(values.quantity))) {
    errors.quantity = 'Please enter a number in metric tonnes, for example 18 or 24.5.'
  }

  for (const [field, max] of Object.entries(MAX_LENGTH) as [InquiryField, number][]) {
    const value = values[field]
    if (typeof value === 'string' && value.length > max && !errors[field]) {
      errors[field] = `Please keep this under ${max} characters.`
    }
  }

  if (!values.consent) {
    errors.consent = 'Please confirm consent so Munar can respond to your inquiry.'
  }

  return errors
}

export const inquirySubject = 'B2B Charcoal Sourcing Inquiry — Munar Briquette Trading'

export function formatInquiry(values: InquiryValues): string {
  const clean = (v: string) => v.replace(/\s+/g, ' ').trim()
  const line = (label: string, value: string) => `${label}: ${clean(value) || '—'}`
  const quantity = clean(values.quantity) ? `${clean(values.quantity)} MT` : ''

  const additional = values.additional.trim()

  return [
    `Hello ${site.name},`,
    '',
    'I would like to discuss a B2B charcoal sourcing requirement.',
    '',
    'BUYER DETAILS',
    line('Company', values.companyName),
    line('Contact name', values.contactName),
    line('Business email', values.email),
    line('Phone / WhatsApp', values.phone),
    line('Country / Market', values.country),
    line('Buyer type', values.buyerType),
    '',
    'PRODUCT REQUIREMENTS',
    line('Product interest', values.productInterest),
    line('Grade / Specification preference', values.specification),
    line('Estimated quantity', quantity),
    line('Product shape / size', values.shapeSize),
    line('Packaging requirements', values.packaging),
    line('Preferred Incoterm', values.incoterm),
    line('Destination port / city', values.destination),
    '',
    'ADDITIONAL REQUIREMENTS',
    additional || '—',
    '',
    'I understand that availability, specifications, and commercial terms are subject to supplier confirmation.',
    '',
    `Regards,`,
    clean(values.contactName),
    clean(values.companyName),
  ].join('\n')
}

export function buildMailtoUrl(body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(body)}`
}

export function buildWhatsAppUrl(body: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(body)}`
}
