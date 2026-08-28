import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/content'
import { LUX_EASE, Magnetic, MaskedText } from '../../components/primitives'
import { siteConfig } from '../../config/site'

/** FINAL CTA — monumental near-black closer. */
export default function FinalCTA() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 20 })
  const sy = useSpring(my, { stiffness: 50, damping: 20 })
  const glowX = useTransform(sx, [0, 1], ['-8%', '8%'])
  const glowY = useTransform(sy, [0, 1], ['-8%', '8%'])

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-ink px-6"
    >
      {/* faint image + cursor-responsive glow */}
      <motion.div
        className="absolute inset-[-15%] opacity-[0.16]"
        style={reduced ? undefined : { x: glowX, y: glowY }}
      >
        <img src={IMAGES.dark} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent_20%,rgba(242,246,251,0.95)_75%)]" />

      <div className="relative z-10 text-center">
        <MaskedText
          lines={["LET'S CREATE", 'SOMETHING', 'UNFORGETTABLE.']}
          className="font-display text-[13vw] font-light leading-[1.03] text-ivory sm:text-[9vw] md:text-[7.5vw]"
          lineClassName="text-ivory"
          stagger={0.12}
        />

        <motion.div
          className="mt-14 flex justify-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: LUX_EASE }}
        >
          <Magnetic>
            <Link
              to="/contact"
              data-cursor="button"
              className="group relative inline-flex items-center gap-4 overflow-hidden border border-champagne/50 px-12 py-5 font-body text-[13px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ivory"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative">Start a Conversation</span>
              <span className="relative transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </Link>
          </Magnetic>
        </motion.div>

        <p className="mt-12 font-body text-[11px] uppercase tracking-lux text-ivory/35">
          {siteConfig.companyName} — {siteConfig.location}
        </p>
      </div>
    </section>
  )
}