import { motion, useReducedMotion } from 'framer-motion'
import { MaskedText } from './primitives'

/**
 * Cinematic header for inner pages.
 * Shows a kicker, a huge masked display line set, and optional image.
 */
export default function PageHeader({ kicker, lines, image, imageAlt, eyebrow }) {
  const reduced = useReducedMotion()
  return (
    <header className="relative flex min-h-[64svh] items-end overflow-hidden pt-24">
      {image && (
        <>
          <div className="absolute inset-0">
            <motion.img
              src={image}
              alt={imageAlt || ''}
              className="h-full w-full object-cover opacity-60"
              initial={reduced ? false : { scale: 1.12, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        </>
      )}
      <div className="container-lux relative z-10 pb-14 md:pb-20">
        <motion.p
          className="mb-6 flex items-center gap-4 font-body text-[11px] uppercase tracking-lux text-champagne/90"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-10 bg-champagne/70" />
          {kicker}
        </motion.p>
        {eyebrow && (
          <p className="mb-4 font-display text-2xl font-light italic text-ivory/70">{eyebrow}</p>
        )}
        <MaskedText
          lines={lines}
          className="font-display text-[14vw] font-light leading-[0.98] text-ivory sm:text-[10vw] lg:text-[8vw]"
          delay={0.05}
          stagger={0.1}
        />
      </div>
    </header>
  )
}