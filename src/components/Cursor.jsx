import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom luxury cursor (desktop only — CSS hides it under 1024px / hover:none).
 * States (via data-cursor attributes on targets):
 *   "image"  — cursor expands into a soft ring
 *   "view"   — expands with a "VIEW" label
 *   "button" — the dot tightens into a small ring
 */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.6 })

  const [state, setState] = useState('default')
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only enable on fine pointers on larger screens.
    const fine = window.matchMedia('(hover: hover)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    if (!fine || !wide) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor]')
      if (t) return setState(t.dataset.cursor)
      if (e.target.closest?.('a,button,input,textarea,select,label')) {
        return setState('button')
      }
      setState('default')
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  const ring =
    state === 'view'
      ? { width: 84, height: 84 }
      : state === 'image'
        ? { width: 56, height: 56 }
        : { width: 12, height: 12 }

  return (
    <div className="custom-cursor pointer-events-none fixed left-0 top-0 z-[5000]" style={{ opacity: visible ? 1 : 0, transition: 'opacity .3s' }}>
      {/* follower ring / dot — outer element holds the cursor x/y position */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne mix-blend-difference"
          animate={ring}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </motion.div>
      {state === 'view' && (
        <motion.div className="absolute left-0 top-0" style={{ x: springX, y: springY }}>
          <motion.div
            className="absolute flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-ink mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="font-body text-[11px] tracking-wide2 text-ink">VIEW</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}