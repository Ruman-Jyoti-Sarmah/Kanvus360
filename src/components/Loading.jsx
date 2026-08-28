import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LUX_EASE } from './primitives'
import { siteConfig } from '../config/site'

/**
 * Cinematic loading sequence (~1s).
 * 1. Black screen  → 2. "KANVAS360" small  → 3. line draws across
 * → 4. logo subtly expands  → 5. mask lifts to reveal the site.
 */
export default function Loading({ done }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      done()
      return
    }
    const t = setTimeout(done, 1000)
    return () => clearTimeout(t)
  }, [reduced, done])

  if (reduced) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 z-[4000] flex items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: LUX_EASE } }}
      aria-hidden="true"
    >
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: LUX_EASE }}
      >
        {/* Logo text */}
        <motion.span
          className="font-body text-[13px] uppercase tracking-[0.5em] text-ivory"
          initial={{ opacity: 0, letterSpacing: '0.9em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 0.7, ease: LUX_EASE }}
        >
          {siteConfig.companyName}
        </motion.span>

        {/* thin line draws across */}
        <motion.div
          className="h-px w-40 bg-champagne"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: LUX_EASE }}
          style={{ transformOrigin: 'center' }}
        />

        {/* subtle expanding mark */}
        <motion.span
          className="font-display text-2xl text-champagne/70"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5, ease: LUX_EASE }}
        >
          K<span className="italic">∞</span>
        </motion.span>
      </motion.div>
    </motion.div>
  )
}