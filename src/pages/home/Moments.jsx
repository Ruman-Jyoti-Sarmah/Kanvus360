import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { emotionalMoments } from '../../data/content'
import { Reveal } from '../../components/primitives'

const SPEEDS = [10, 5, 8]

/** SECTION 07 — EMOTIONAL MOMENTS. Photo-driven, engraved captions. */
export default function Moments() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 md:py-44">
      <div className="container-lux">
        <p className="label-lux mb-16">07 — Emotional Moments</p>
      </div>

      <div className="flex flex-col gap-28 md:gap-40">
        {emotionalMoments.map((m, i) => (
          <MomentRow key={i} m={m} i={i} speed={SPEEDS[i % SPEEDS.length]} />
        ))}
      </div>
    </section>
  )
}

function MomentRow({ m, i, speed }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])
  const reduced = useReducedMotion()

  const isEven = i % 2 === 0

  return (
    <div
      ref={ref}
      className={`container-lux grid items-center gap-10 md:grid-cols-2 ${isEven ? '' : 'md:[direction:rtl]'}`}
    >
      {/* photo */}
      <div className="relative overflow-hidden [direction:ltr]">
        <motion.img
          src={m.image}
          alt={m.caption}
          loading="lazy"
          className="h-[52vh] w-full object-cover md:h-[68vh]"
          style={reduced ? undefined : { y }}
        />
      </div>

      {/* caption */}
      <Reveal className="[direction:ltr]">
        <p
          className={`font-display text-3xl font-light leading-tight text-ivory md:text-5xl ${
            m.align === 'right' ? 'md:text-right' : ''
          }`}
        >
          {m.caption}
        </p>
        <div className={`mt-6 h-px w-16 bg-champagne/50 ${m.align === 'right' ? 'md:ml-auto' : ''}`} />
      </Reveal>
    </div>
  )
}