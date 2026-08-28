import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/content'
import { LUX_EASE } from '../../components/primitives'
import { siteConfig } from '../../config/site'

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Background drift + fade as you scroll away
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse parallax — subtle 3D depth
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 25 })
  const sy = useSpring(my, { stiffness: 60, damping: 25 })
  const bgShiftX = useTransform(sx, [0, 1], ['0%', '2.5%'])
  const bgShiftY = useTransform(sy, [0, 1], ['0%', '1.8%'])
  const textShiftX = useTransform(sx, [0, 1], ['0%', '-0.8%'])
  const textShiftY = useTransform(sy, [0, 1], ['0%', '-0.6%'])

  const onMouseMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = (e.clientX - r.left) / r.width
    const dy = (e.clientY - r.top) / r.height
    mx.set(dx)
    my.set(dy)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className="relative h-[100svh] min-h-[540px] overflow-hidden"
    >
      {/* Background image */}
      <motion.div
        className="absolute -inset-8"
        style={reduced ? undefined : { x: bgShiftX, y: bgShiftY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: LUX_EASE, delay: 0.4 }}
      >
        <motion.img
          src={IMAGES.hero}
          alt="A cinematic luxury event in full celebration"
          className="h-full w-full object-cover"
          style={reduced ? undefined : { y: bgY, scale: bgScale }}
          initial={{ scale: 1.08, opacity: 0.4 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 2.4, ease: LUX_EASE, delay: 0.3 }}
        />
      </motion.div>

      {/* dark gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />

      {/* Typography layer */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-start justify-end pb-24 pt-28 md:justify-center md:pb-28"
        style={reduced ? undefined : { x: textShiftX, y: textShiftY, opacity: fade }}
      >
        <div className="container-lux">
          <motion.p
            className="mb-6 flex items-center gap-4 font-body text-[11px] uppercase tracking-lux text-champagne/90"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: LUX_EASE }}
          >
            <span className="h-px w-10 bg-champagne/70" />
            {siteConfig.companyName} — {siteConfig.location}
          </motion.p>

          <h1 className="font-display font-light leading-[0.95] text-ivory">
            {[
              { t: 'WE CREATE', cls: 'text-[14vw] sm:text-[10vw] lg:text-[8.2vw]' },
              { t: 'MOMENTS', cls: 'text-[14vw] sm:text-[10vw] lg:text-[8.2vw]' },
              { t: 'THAT MATTER.', cls: 'text-[14vw] sm:text-[10vw] lg:text-[8.2vw]', italic: true },
            ].map((line, i) => (
              <span key={i} className="line-mask">
                <motion.span
                  className={`line-inner ${line.cls} ${line.italic ? 'italic text-ivory' : ''}`}
                  initial={reduced ? false : { y: '118%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.55 + i * 0.14, duration: 1.05, ease: LUX_EASE }}
                >
                  {line.t}
                </motion.span>
              </span>
            ))}
          </h1>
{/* supporting copy */}
          <motion.p
            className="mt-8 font-body text-sm uppercase tracking-wide2 text-ivory/60 sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: LUX_EASE }}
          >
            Weddings. Exhibitions. Experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: LUX_EASE }}
          >
            <Link
              to="/services"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-ivory/40 px-10 py-4 font-body text-[12px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ink"
              data-cursor="button"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <span className="relative">Explore Our World</span>
              <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-2 py-3 font-body text-[12px] uppercase tracking-wide2 text-ivory/80 link-underline transition-colors hover:text-ivory"
              data-cursor="button"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom left */}
      <ScrollIndicator progress={scrollYProgress} reduced={reduced} />
    </section>
  )
}

/** Bottom-left "SCROLL TO DISCOVER" with animated line that fills. */
function ScrollIndicator({ progress, reduced }) {
  const h = useTransform(progress, [0, 0.15], [0, 64])
  return (
    <motion.div
      className="absolute bottom-8 left-6 z-10 flex items-end gap-4 md:bottom-10 md:left-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-body text-[10px] uppercase tracking-lux text-ivory/60 [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb]">
          Scroll to discover
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-ivory/15">
          {!reduced && (
            <motion.div
              className="absolute left-0 top-0 w-full bg-champagne"
              style={{ height: h }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}