export type ProductSlug = 'shisha' | 'bbq' | 'hardwood' | 'private-label'

export type SpecRow = { label: string; values: string[] }

export type Product = {
  slug: ProductSlug
  navLabel: string
  name: string
  shortName: string
  index: string
  tagline: string
  summary: string
  description: string
  image: string
  imageAlt: string
  formValue: string
}

export const products: Product[] = [
  {
    slug: 'shisha',
    navLabel: 'Shisha / Hookah',
    name: 'Shisha / Hookah Charcoal Briquettes',
    shortName: 'Shisha / Hookah',
    index: '01',
    tagline: 'Coconut shell briquettes for shisha and hookah',
    summary:
      'Coconut shell charcoal briquettes in a range of shapes, matched to buyer requirements and supplier-confirmed specifications.',
    description:
      'Coconut shell charcoal briquettes for shisha and hookah applications, with product options determined by buyer requirements and supplier-confirmed specifications.',
    image: '/images/shisha-cubes.png',
    imageAlt: 'Illustrative coconut shell charcoal briquettes in cube, finger and hexagonal shapes',
    formValue: 'Shisha / Hookah',
  },
  {
    slug: 'bbq',
    navLabel: 'BBQ / Grilling',
    name: 'BBQ / Grilling Charcoal',
    shortName: 'BBQ / Grilling',
    index: '02',
    tagline: 'Hexagonal coconut shell and blended options',
    summary:
      'Hexagonal coconut shell BBQ briquettes and selected blended or hardwood options, subject to availability.',
    description:
      'Charcoal sourcing options for barbecue and grilling applications, including hexagonal coconut shell briquettes and selected blended or hardwood alternatives.',
    image: '/images/bbq-hexagonal.png',
    imageAlt: 'Illustrative hexagonal charcoal briquettes with hollow centres in a grill',
    formValue: 'BBQ / Grilling',
  },
  {
    slug: 'hardwood',
    navLabel: 'Natural Hardwood',
    name: 'Natural Hardwood Charcoal',
    shortName: 'Natural Hardwood',
    index: '03',
    tagline: 'Natural hardwood charcoal by requirement',
    summary:
      'Natural hardwood charcoal sourcing options according to buyer requirements, including potential Kachi and Halaban wood types.',
    description:
      'Natural hardwood charcoal sourcing options according to buyer requirements. Wood type, sizing, and specification are confirmed with the selected supply partner.',
    image: '/images/hardwood-lump.png',
    imageAlt: 'Illustrative natural hardwood lump charcoal with visible wood grain',
    formValue: 'Natural Hardwood',
  },
  {
    slug: 'private-label',
    navLabel: 'Private Label / OEM',
    name: 'Private Label / OEM Sourcing',
    shortName: 'Private Label / OEM',
    index: '04',
    tagline: 'Custom branding and packaging discussions',
    summary:
      'Custom branding and packaging discussions with suitable supply partners, subject to minimums, approvals, and agreement.',
    description:
      'Custom branding and packaging can be discussed with suitable supply partners, subject to minimum order requirements, design approval, product availability, and commercial agreement.',
    image: '/images/private-label.png',
    imageAlt: 'Illustrative unbranded retail box, master carton and inner wrap packaging',
    formValue: 'Private Label / OEM',
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export const shishaShapes: SpecRow[] = [
  { label: 'Cube', values: ['22 mm', '25 mm', '26 mm', '28 mm'] },
  { label: 'Finger Cylinder', values: ['20 × 35 mm', '20 × 50 mm'] },
  { label: 'Finger Hexagon', values: ['20 × 35 mm', '20 × 50 mm'] },
  { label: 'Half Finger', values: ['20 × 35 mm', '20 × 50 mm'] },
  { label: 'Sigma', values: ['26 × 36 mm'] },
  { label: 'Flat', values: ['25 × 25 × 25 mm', '25 × 25 × 15 mm'] },
  { label: 'Kaloud / Lotus-compatible', values: ['Fit and size require supplier confirmation'] },
]

export const technicalParameters = [
  'Ash content',
  'Moisture',
  'Volatile matter',
  'Fixed carbon',
  'Calorific value',
  'Ash colour',
]

export const bbqOptions: SpecRow[] = [
  {
    label: 'Hexagonal coconut shell BBQ briquettes',
    values: ['50 × 50 mm', '50 × 100 mm', '50 × 200 mm'],
  },
  {
    label: 'Blended coconut-charcoal-granular options',
    values: ['Subject to availability and specification confirmation'],
  },
  {
    label: 'Selected hardwood options',
    values: ['Subject to availability and specification confirmation'],
  },
]

export const hardwoodTypes: SpecRow[] = [
  { label: 'Kachi', values: ['Subject to availability and supplier confirmation'] },
  { label: 'Halaban', values: ['Subject to availability and supplier confirmation'] },
]

export const packagingOptions = [
  {
    title: 'Inner wrapping',
    body: 'Inner wrap or pouch formats around individual product units, where offered by the supply partner.',
  },
  {
    title: 'Retail boxes',
    body: 'Branded consumer-facing boxes, subject to design approval and minimum order requirements.',
  },
  {
    title: 'Master cartons',
    body: 'Outer cartons for grouping retail units for shipment, with marking requirements discussed in advance.',
  },
  {
    title: 'Bulk packaging',
    body: 'Bulk formats for importers and distributors who repack or handle their own retail presentation.',
  },
]
