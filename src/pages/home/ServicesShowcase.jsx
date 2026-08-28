import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { services } from '../../data/content'
import { LUX_EASE } from '../../components/primitives'

/** SECTION 03 — SERVICES. Full-screen interactive service experience. */
export default function ServicesShowcase() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [rolling, setRolling] = useState(services[0].index)
  const ref = useRef(null)

  useEffect(() => {
    setRolling(services[active].index)
  }, [active])

  const service = services[active]

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink">
      {/* Full-screen background that changes per service */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={service.id}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={reduced ? undefined : { opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: LUX_EASE }}
        >
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container-lux relative z-10 flex h-full flex-col justify-end py-24 md:flex-row md:items-end md:justify-between md:py-20">
        {/* Nav list — left */}
        <div className="order-2 md:order-1 md:self-end">
          <p className="label-lux mb-5">03 — We Create</p>
          <ul className="flex flex-col gap-1">
            {services.map((s, i) => {
              const isActive = i === active
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex items-baseline gap-4 py-2 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'translate-x-2' : 'opacity-40 hover:opacity-80'
                    }`}
                    aria-pressed={isActive}
                    data-cursor="button"
                  >
                    <span className="font-body text-[10px] tracking-lux text-champagne/80">
                      {s.index}
                    </span>
                    <span
                      className={`font-display font-light leading-none text-ivory transition-all duration-700 ${
                        isActive ? 'text-3xl md:text-5xl' : 'text-xl md:text-3xl'
                      }`}
                    >
                      {s.short}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Detail — right */}
        <div className="order-1 md:order-2 md:max-w-md md:self-end md:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              className="flex flex-col gap-4 md:items-end"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: LUX_EASE }}
            >
              <p className="font-body text-[11px] uppercase tracking-lux text-champagne/90">
                {service.tagline}
              </p>
              <p className="max-w-sm font-body text-base leading-relaxed text-ivory/75 md:ml-auto">
                {service.description}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                {service.capabilities.map((c) => (
                  <li key={c} className="font-body text-[11px] uppercase tracking-wide2 text-ivory/50">
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Rolling number */}
          <div className="mt-8 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={rolling}
                className="font-display text-7xl font-light text-ivory/15 md:text-8xl"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.6, ease: LUX_EASE }}
              >
                {rolling}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}