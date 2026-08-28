import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Seo from '../components/Seo'
import { LUX_EASE } from '../components/primitives'
import { seo, services } from '../data/content'

export default function Services() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [rolling, setRolling] = useState(services[0].index)

  useEffect(() => {
    setRolling(services[active].index)
  }, [active])

  const service = services[active]

  return (
    <>
      <Seo title={seo.services.title} description={seo.services.description} />

      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-24">
        {/* Full-screen service background */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={service.id}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={reduced ? undefined : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: LUX_EASE }}
          >
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="container-lux relative z-10 flex flex-1 flex-col justify-end pb-16">
          <p className="label-lux mb-10">Our Craft</p>

          {/* Service navigation */}
          <nav className="mb-12 flex flex-wrap gap-x-8 gap-y-4" aria-label="Services">
            {services.map((s, i) => {
              const isActive = i === active
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  data-cursor="button"
                  className={`group flex items-baseline gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                  }`}
                >
                  <span className="font-body text-[9px] tracking-lux text-champagne/80">
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
              )
            })}
          </nav>
{/* Active service detail */}
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={reduced ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: LUX_EASE }}
                >
                  <h1 className="font-display text-5xl font-light leading-none text-ivory md:text-7xl">
                    {service.title}
                  </h1>
                  <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ivory/75">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-6 md:flex md:flex-col md:items-end md:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  className="w-full max-w-sm"
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: LUX_EASE, delay: 0.05 }}
                >
                  <p className="label-lux mb-4">Capabilities</p>
                  <ul className="flex flex-col gap-3 border-t border-ivory/10 pt-4">
                    {service.capabilities.map((c, ci) => (
                      <motion.li
                        key={c}
                        className="flex items-baseline gap-4 font-body text-sm text-ivory/65"
                        initial={reduced ? false : { opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: LUX_EASE, delay: 0.1 + ci * 0.07 }}
                      >
                        <span className="font-body text-[10px] tracking-lux text-champagne/70">
                          0{ci + 1}
                        </span>
                        {c}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Rolling number */}
        <div className="pointer-events-none absolute right-6 top-24 z-10 overflow-hidden md:right-14">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={rolling}
              className="font-display text-8xl font-light text-ivory/10 md:text-[11rem]"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: LUX_EASE }}
            >
              {rolling}
            </motion.span>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}