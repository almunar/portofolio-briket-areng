import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

type IconProps = { className?: string }

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.53 4.8 5.83v5.62h-4v-4.98c0-1.19-.02-2.72-1.75-2.72-1.75 0-2.02 1.29-2.02 2.63v5.07h-4v-11Z" />
    </svg>
  )
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

const socials = [
  {
    key: 'whatsapp',
    label: 'Chat with Munar on WhatsApp',
    short: 'WhatsApp',
    href: site.whatsappUrl,
    Icon: WhatsAppIcon,
    hover:
      'hover:text-[#25D366] hover:border-[#25D366]/60 hover:shadow-[0_0_22px_-2px_rgba(37,211,102,0.55)] focus-visible:text-[#25D366] focus-visible:shadow-[0_0_22px_-2px_rgba(37,211,102,0.55)]',
  },
  {
    key: 'instagram',
    label: 'Munar Briquette Trading on Instagram',
    short: 'Instagram',
    href: site.instagramUrl,
    Icon: InstagramIcon,
    hover:
      'hover:text-[#E1306C] hover:border-[#C13584]/60 hover:shadow-[0_0_18px_-2px_rgba(225,48,108,0.55),0_0_30px_-6px_rgba(131,58,180,0.5),0_0_30px_-10px_rgba(247,119,55,0.55)] focus-visible:text-[#E1306C] focus-visible:shadow-[0_0_18px_-2px_rgba(225,48,108,0.55),0_0_30px_-6px_rgba(131,58,180,0.5)]',
  },
  {
    key: 'linkedin',
    label: 'Padlan Al Munar on LinkedIn',
    short: 'LinkedIn',
    href: site.linkedinUrl,
    Icon: LinkedInIcon,
    hover:
      'hover:text-[#4A9AD8] hover:border-[#0A66C2]/60 hover:shadow-[0_0_20px_-4px_rgba(10,102,194,0.6)] focus-visible:text-[#4A9AD8] focus-visible:shadow-[0_0_20px_-4px_rgba(10,102,194,0.6)]',
  },
] as const

export function SocialLinks({
  className,
  tone = 'dark',
  size = 'md',
}: {
  className?: string
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
}) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socials.map(({ key, label, short, href, Icon, hover }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={short}
            className={cn(
              'group relative flex items-center justify-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2',
              size === 'sm' ? 'size-9' : 'size-11',
              tone === 'dark'
                ? 'border-paper/20 text-paper/80 focus-visible:outline-paper'
                : 'border-charcoal/20 text-charcoal/80 focus-visible:outline-charcoal',
              hover,
            )}
          >
            <Icon className={size === 'sm' ? 'size-4' : 'size-[18px]'} />
          </a>
        </li>
      ))}
    </ul>
  )
}
