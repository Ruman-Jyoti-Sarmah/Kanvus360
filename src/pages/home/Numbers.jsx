import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { principles } from '../../data/content'

/** SECTION 08 — NUMBERS / PRINCIPLES. Minimal, huge animated numerals. */
export default function Numbers() {
  return (
    <section className="border-t border-ivory/10 bg-ink-950 px-6 py-28 md:py-40">
      <div className="container-lux">
        <p className="label-lux mb-14">08 — Principles</p>
        <div className="grid gap-16 md:grid-cols-3 md:gap-10">
          {principles.map((p, i) => (
            <NumberLine key={p.index} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NumberLine({ p, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
      className="flex flex-col gap-4 border-l border-ivory/10 pl-6"
    >
      <motion.span
        className="font-display text-7xl font-light text-champagne/60"
        initial={reduced ? false : { scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
      >
        {p.index}
      </motion.span>
      <h3 className="font-body text-sm uppercase tracking-wide2 text-ivory">{p.word}</h3>
      <p className="max-w-xs font-body text-sm leading-relaxed text-ivory/50">{p.text}</p>
    </motion.div>
  )
}