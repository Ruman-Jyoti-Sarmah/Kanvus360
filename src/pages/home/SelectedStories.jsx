import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { selectedStories } from '../../data/content'
import { LUX_EASE } from '../../components/primitives'

/** SECTION 04 — SELECTED STORIES. Asymmetric editorial gallery. */
export default function SelectedStories() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-ink px-6 py-28 md:py-40">
      <div className="container-lux">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-5xl font-light text-ivory md:text-7xl">
            Selected
            <br />
            <span className="italic text-champagne/80">Stories</span>
          </h2>
          <p className="hidden max-w-xs font-body text-sm leading-relaxed text-ivory/40 md:block">
            A few of the worlds we have built. Each one began as an idea and
            ended as a shared memory.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 md:[grid-auto-rows:200px] lg:[grid-auto-rows:240px]">
          {selectedStories.map((s, i) => (
            <StoryCard key={s.id} s={s} i={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryCard({ s, i, reduced }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  // Asymmetric placement via a size map
  const span =
    i === 0
      ? 'md:col-span-3 md:row-span-2'
      : i === 1
        ? 'md:col-span-3 md:row-span-2 lg:col-span-2'
        : i === 2
          ? 'md:col-span-2 lg:row-span-1'
          : 'md:col-span-3 lg:col-span-4 lg:row-span-2'

  return (
    <Link
      to="/gallery"
      ref={ref}
      data-cursor="view"
      className={`group relative block overflow-hidden ${span}`}
      aria-label={`View ${s.title}`}
    >
      {/* clip reveal */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
        transition={{ duration: 1.1, ease: LUX_EASE, delay: i * 0.1 }}
      >
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
      </motion.div>

      {/* Floating title */}
      <div className="absolute bottom-0 left-0 z-10 p-5 md:p-6">
        <p className="font-body text-[10px] uppercase tracking-lux text-champagne/80">
          {s.category}
        </p>
        <h3 className="mt-2 font-display text-2xl font-light text-ivory transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
          {s.title}
        </h3>
      </div>
    </Link>
  )
}