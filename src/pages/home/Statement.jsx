import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { IMAGES } from '../../data/content'

/** SECTION 05 — CINEMATIC STATEMENT. Immersive slow full-screen visual. */
export default function Statement() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // slow-moving background + typography at a different depth
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const wordY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={ref} className="relative flex h-[120svh] items-center justify-center overflow-hidden bg-ink">
      {/* slow-moving background */}
      <motion.div className="absolute inset-[-20%]" style={reduced ? undefined : { y }}>
        <img src={IMAGES.sparkler} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-ink/50" />
      </motion.div>

      {/* huge statement */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={reduced ? undefined : { y: wordY }}
      >
        <p className="font-body text-[11px] uppercase tracking-lux text-champagne/80">
          From the first idea
        </p>
        <h2 className="mt-4 font-display text-[12vw] font-light leading-[1.02] text-ivory md:text-[8vw]">
          to the final
          <br />
          <span className="italic text-ivory/85">moment.</span>
        </h2>
      </motion.div>
    </section>
  )
}