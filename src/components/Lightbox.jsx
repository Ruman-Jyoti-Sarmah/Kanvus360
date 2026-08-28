import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { LUX_EASE } from './primitives'
import { siteConfig } from '../config/site'

/**
 * Immersive gallery lightbox.
 * Full viewport · dark backdrop · keyboard (ESC/←/→) · prev/next · info.
 */
export default function Lightbox({ items, index, onClose, onNav }) {
  const reduced = useReducedMotion()
  const closeRef = useRef(null)

  const item = items[index]

  const next = useCallback(
    () => onNav((index + 1) % items.length),
    [index, items.length, onNav]
  )
  const prev = useCallback(
    () => onNav((index - 1 + items.length) % items.length),
    [index, items.length, onNav]
  )

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    // Focus the close button for a11y
    const t = setTimeout(() => closeRef.current?.focus(), 60)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [onClose, next, prev])

  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 z-[3800] flex flex-col bg-ink-950/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: LUX_EASE }}
    >
      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-champagne hover:text-champagne"
      >
        <X size={20} />
      </button>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-champagne hover:text-champagne md:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-champagne hover:text-champagne md:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Main stage */}
      <div className="relative flex flex-1 items-center justify-center p-6 pt-20 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="flex max-h-full max-w-5xl flex-col items-center"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: LUX_EASE }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="max-h-[68vh] w-auto max-w-full object-contain"
            />
            <div className="mt-6 flex items-end justify-between gap-8 self-stretch border-t border-ivory/10 pt-4">
              <div>
                <p className="font-body text-[11px] uppercase tracking-lux text-champagne/80">
                  {item.category}
                </p>
                <p className="mt-1 font-display text-2xl font-light text-ivory">
                  {item.title}
                </p>
              </div>
              <div className="font-body text-xs tracking-lux text-ivory/40">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile nav hint */}
      <div className="flex items-center justify-center gap-6 pb-6 md:hidden">
        <button onClick={prev} aria-label="Previous image" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory">
          <ChevronLeft size={18} />
        </button>
        <span className="font-body text-xs tracking-lux text-ivory/50">{siteConfig.companyName}</span>
        <button onClick={next} aria-label="Next image" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory">
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}