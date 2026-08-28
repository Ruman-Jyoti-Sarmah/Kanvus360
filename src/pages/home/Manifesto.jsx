import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'

/** SECTION 01 — MANIFESTO. Black, nearly empty, words animate independently. */
export default function Manifesto() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // subtle scroll velocity drift
  const drift = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink px-6 py-32 md:py-48">
      <div className="container-lux">
        <p className="label-lux mb-10">01 — Manifesto</p>

        <div className="space-y-2">
          <ManifestLine
            word="EVERY"
            size="text-[15vw] md:text-[9vw] lg:text-[7vw]"
            delay={0.1}
            x={-30}
            reduced={reduced}
            invert
          />
          <ManifestLine
            word="EVENT"
            size="text-[15vw] md:text-[9vw] lg:text-[7vw]"
            delay={0.25}
            x={40}
            reduced={reduced}
          />
          <ManifestLine
            word="DESERVES"
            size="text-[15vw] md:text-[9vw] lg:text-[7vw]"
            delay={0.4}
            scale={0.9}
            reduced={reduced}
            invert
          />
          <ManifestLine
            word="A STORY."
            size="text-[15vw] md:text-[9vw] lg:text-[7vw] italic"
            delay={0.55}
            x={-50}
            reduced={reduced}
          />
        </div>

        <motion.p
          className="mt-14 max-w-xl font-body text-sm leading-relaxed text-ivory/50"
          style={reduced ? undefined : { y: drift }}
        >
          An event is not a sequence of arrangements. It is a story your
          audience steps inside — and carries with them long after the lights
          go down.
        </motion.p>
      </div>
    </section>
  )
}

function ManifestLine({ word, size, delay, reduced, invert, x = 0, scale }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  return (
    <span className="line-mask">
      <motion.h2
        ref={ref}
        className={`line-inner font-display font-light leading-[1.02] ${size} ${
          invert ? 'text-ivory' : 'text-ivory/60'
        }`}
        initial={reduced ? false : { y: '120%', opacity: 0.2, x, scale: scale ?? 1 }}
        animate={inView ? { y: 0, opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {word}
      </motion.h2>
    </span>
  )
}