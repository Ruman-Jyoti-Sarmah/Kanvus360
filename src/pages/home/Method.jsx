import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { methodStages } from '../../data/content'
import { Reveal } from '../../components/primitives'

/** SECTION 06 — THE KANVAS METHOD. Horizontal cinematic storytelling. */
export default function Method() {
  return (
    <section className="bg-ink">
      {/* Mobile / tablet: vertical sequence */}
      <div className="lg:hidden">
        <div className="container-lux pt-24">
          <p className="label-lux">06 — The Kanvas Method</p>
          <h2 className="mt-4 font-display text-5xl font-light text-ivory">
            How we <span className="italic text-champagne/80">create.</span>
          </h2>
        </div>
        <div className="mt-10 flex flex-col">
          {methodStages.map((stage, i) => (
            <MobileStage key={stage.name} stage={stage} i={i} />
          ))}
        </div>
      </div>

      {/* Desktop: sticky horizontal gallery */}
      <div className="hidden lg:block">
        <HorizontalMethod />
      </div>
    </section>
  )
}

function MobileStage({ stage, i }) {
  return (
    <div className="grid gap-5 border-t border-ivory/10 px-6 py-12 md:grid-cols-2 md:items-center md:px-14">
      <p className="order-1 font-display text-6xl font-light text-ivory/15">{stage.index}</p>
      <div className="order-3 md:order-2">
        <h3 className="font-display text-3xl font-light text-ivory">{stage.name}</h3>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ivory/50">
          {stage.text}
        </p>
      </div>
      <div className="order-2 h-48 overflow-hidden md:order-3 md:h-64">
        <img src={stage.image} alt={stage.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

function HorizontalMethod() {
  const reduced = useReducedMotion()
  const holder = useRef(null)
  const { scrollYProgress } = useScroll({ target: holder })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-74%'])

  return (
    <div ref={holder} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* header pinned top-left */}
        <div className="absolute left-14 top-10 z-10">
          <p className="label-lux">06 — The Kanvas Method</p>
          <h2 className="mt-2 font-display text-3xl font-light text-ivory">
            How we <span className="italic text-champagne/80">create.</span>
          </h2>
        </div>

        <motion.div
          className="flex items-center gap-16 pl-14 will-change-transform"
          style={reduced ? undefined : { x }}
        >
          {methodStages.map((stage) => (
            <div key={stage.name} className="relative flex w-[42vw] shrink-0 items-center gap-10">
              {/* number */}
              <span className="font-display text-8xl font-light text-ivory/15">{stage.index}</span>
              <div>
                <h3 className="font-display text-6xl font-light text-ivory">{stage.name}</h3>
                <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-ivory/55">
                  {stage.text}
                </p>
                <div className="mt-8 h-64 w-full overflow-hidden">
                  <img
                    src={stage.image}
                    alt={stage.name}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* end marker */}
          <div className="flex shrink-0 flex-col items-center gap-4 pl-10 pr-20">
            <span className="font-display text-5xl font-light italic text-champagne/70">K∞</span>
            <span className="font-body text-[10px] uppercase tracking-lux text-ivory/40">The method</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}