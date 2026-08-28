import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { scrollTopLenis } from '../hooks/useLenis'
import { LUX_EASE } from './primitives'

/**
 * Cinematic page transition.
 * On route change: a dark layer sweeps up and covers, the viewport
 * resets, then the layer lifts away to reveal the new page.
 */
export default function PageTransition() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const [cover, setCover] = useState(false)
  const prev = useRef(location.pathname)

  useEffect(() => {
    if (prev.current === location.pathname) return
    prev.current = location.pathname

    if (reduced) {
      scrollTopLenis()
      return
    }

    // Cover
    scrollTopLenis()
    setCover(true)
    // Lift the cover away to reveal the new page
    const t = setTimeout(() => setCover(false), 620)
    return () => clearTimeout(t)
  }, [location.pathname, reduced])

  return (
    <AnimatePresence>
      {cover && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[3950] flex items-center justify-center bg-ink-950"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: LUX_EASE }}
          aria-hidden="true"
        >
          {/* small brand line inside the transition */}
          <motion.span
            className="font-body text-[11px] uppercase tracking-lux text-ivory/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.3, 0.7, 1] }}
          >
            Kanvas360
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}