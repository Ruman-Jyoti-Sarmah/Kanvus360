import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../config/site'
import { LUX_EASE } from './primitives'

/**
 * Floating WhatsApp button (every page).
 * Desktop: minimal circle that expands to "CHAT WITH US" on hover.
 * Mobile: compact circular button.
 */
export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const href = buildWhatsAppLink()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-5 z-[3400] flex items-center overflow-hidden rounded-full border border-ivory/15 bg-ink-900/80 backdrop-blur-md md:bottom-8 md:right-8"
      style={{ boxShadow: '0 8px 30px rgba(14,42,110,0.28)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduced ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6, ease: LUX_EASE }}
      data-cursor="button"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center text-champagne md:h-14 md:w-14">
        <MessageCircle size={22} strokeWidth={1.5} />
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="whitespace-nowrap pr-5 font-body text-[12px] uppercase tracking-wide2 text-ivory"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: LUX_EASE }}
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}