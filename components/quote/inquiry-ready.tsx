'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Mail, PencilLine, TriangleAlert } from 'lucide-react'
import { WhatsAppIcon } from '../social-links'
import { buildMailtoUrl, buildWhatsAppUrl, inquirySubject } from '@/lib/inquiry'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'copied' | 'failed'
type Opened = 'whatsapp' | 'email' | null

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Permission denied or unsupported; fall through to the legacy path.
  }
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

const actionClass =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-5 text-sm font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal'

export function InquiryReady({ inquiry, onEdit }: { inquiry: string; onEdit: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previewRef = useRef<HTMLPreElement>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [opened, setOpened] = useState<Opened>(null)

  useEffect(() => {
    headingRef.current?.focus()
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleCopy = async () => {
    const ok = await copyText(inquiry)
    setCopyState(ok ? 'copied' : 'failed')
    if (!ok && previewRef.current) {
      const range = document.createRange()
      range.selectNodeContents(previewRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const mailtoUrl = buildMailtoUrl(inquiry)
  const longMailto = mailtoUrl.length > 1900

  return (
    <section aria-labelledby="inquiry-ready-heading" className="scroll-mt-28">
      <div className="border border-forest/30 bg-forest/5 p-6 md:p-8">
        <p className="eyebrow text-forest">Step 2 of 2 — Send your inquiry</p>
        <h2
          id="inquiry-ready-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 scroll-mt-40 font-serif text-2xl leading-snug text-charcoal focus:outline-none md:text-3xl"
        >
          Your sourcing requirement is ready to send. Choose WhatsApp or Email to complete your inquiry.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Nothing has been sent yet. Each button opens WhatsApp or your email app with the message pre-filled. Your
          inquiry is only delivered once you press send in that app.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a
            href={buildWhatsAppUrl(inquiry)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpened('whatsapp')}
            className={cn(actionClass, 'bg-[#1f9d55] text-white hover:bg-[#178246] hover:shadow-[0_0_24px_-6px_rgba(37,211,102,0.7)]')}
          >
            <WhatsAppIcon className="size-4" />
            Send via WhatsApp
          </a>
          <a
            href={mailtoUrl}
            onClick={() => setOpened('email')}
            className={cn(actionClass, 'bg-charcoal text-paper hover:bg-charcoal-soft')}
          >
            <Mail className="size-4" aria-hidden="true" />
            Send via Email
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(actionClass, 'border border-charcoal/30 bg-card text-charcoal hover:border-charcoal')}
          >
            {copyState === 'copied' ? (
              <Check className="size-4 text-forest" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copyState === 'copied' ? 'Copied' : 'Copy Requirement'}
          </button>
        </div>

        <div aria-live="polite" className="mt-4 min-h-6 text-sm">
          {copyState === 'copied' && (
            <p className="text-forest">
              Requirement copied. You can paste it into any message to {site.email} or {site.whatsappDisplay}.
            </p>
          )}
          {copyState === 'failed' && (
            <p className="flex gap-2 text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Your browser blocked automatic copying. The text below has been selected. Press Ctrl+C (or Cmd+C) to
              copy it manually.
            </p>
          )}
          {opened === 'whatsapp' && copyState === 'idle' && (
            <p className="text-muted-foreground">
              WhatsApp should now be open with your message. Please press send there to deliver it. If WhatsApp did not
              open, use Copy Requirement and message {site.whatsappDisplay} directly.
            </p>
          )}
          {opened === 'email' && copyState === 'idle' && (
            <p className="text-muted-foreground">
              Your email app should now be open, addressed to {site.email}. Please press send there to deliver it. If
              no email app opened, use Copy Requirement and email {site.email} directly.
            </p>
          )}
        </div>
        {longMailto && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Your inquiry is long. Some email apps shorten pre-filled messages, so please check the email body before
            sending, or paste the copied requirement instead.
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-xl text-charcoal">Review your requirement</h3>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm text-charcoal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-charcoal"
          >
            <PencilLine className="size-4" aria-hidden="true" />
            Edit details
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Email subject: <span className="text-charcoal">{inquirySubject}</span>
        </p>
        <pre
          ref={previewRef}
          className="mt-4 max-h-[32rem] overflow-auto border border-border bg-card p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-charcoal md:p-6"
          aria-label="Formatted inquiry preview"
        >
          {inquiry}
        </pre>
      </div>
    </section>
  )
}
