export const site = {
  name: 'Munar Briquette Trading',
  shortName: 'Munar',
  founder: 'Padlan Al Munar',
  position: 'Independent International Trader & Sourcing Partner',
  location: 'Indonesia',
  url: 'https://munarbriquette.com',
  email: 'info@munarbriquette.com',
  whatsappDisplay: '+62 831-7424-0557',
  whatsappNumber: '6283174240557',
  whatsappUrl: 'https://wa.me/6283174240557',
  instagramUrl: 'https://www.instagram.com/padlanmunarbriquette',
  linkedinUrl: 'https://www.linkedin.com/in/padlan-munar-briquette-8a87b8370/',
  title: 'Munar Briquette Trading | Indonesian Charcoal Sourcing for International Buyers',
  description:
    'Source coconut shell charcoal briquettes and selected Indonesian charcoal products through an independent Indonesia-based B2B sourcing partner.',
} as const

export const catalogueDisclaimer =
  'Product specifications, grades, shapes, dimensions, packaging, availability, and commercial terms are subject to supplier confirmation and final agreement.'

export const imageDisclaimer =
  'Images are illustrative. Actual product appearance may vary by supplier and specification.'

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function whatsappLink(message?: string) {
  return message
    ? `${site.whatsappUrl}?text=${encodeURIComponent(message)}`
    : site.whatsappUrl
}
