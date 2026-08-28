import { useMemo, useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import Seo from '../components/Seo'
import Lightbox from '../components/Lightbox'
import { LUX_EASE } from '../components/primitives'
import { seo, galleryItems } from '../data/content'

const FILTERS = ['ALL', 'WEDDINGS', 'EXHIBITIONS', 'CORPORATE', 'DECOR']

// Different entrance animations per index — clip, rise, clip-down, slide
const ANIM = [
  { clipPath: 'inset(0 0 100% 0)' }, // clip up reveal
  { y: 60, scale: 0.94, opacity: 0 }, // scale + rise
  { clipPath: 'inset(100% 0 0 0)' }, // clip from top
  { x: 40, opacity: 0 }, // slide in
]

export default function Gallery() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState('ALL')
  const [lightbox, setLightbox] = useState(null) // index in filtered

  const items = useMemo(
    () => (filter === 'ALL' ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter]
  )

  const openIndex = (i) => setLightbox(i)
  const nav = (i) => setLightbox(i)

  return (
    <>
      <Seo title={seo.gallery.title} description={seo.gallery.description} />

      <section className="bg-ink px-6 pt-28 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="label-lux mb-4">The Gallery</p>
              <h1 className="font-display text-6xl font-light text-ivory md:text-8xl">
                Moments,
                <br />
                <span className="italic text-champagne/80">framed.</span>
              </h1>
            </div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-ivory/40">
              Weddings, exhibitions, corporate events and design. Select a world
              to filter the work.
            </p>
          </div>

          {/* Filters */}
          <div
            className="mt-12 flex flex-wrap gap-3 border-y border-ivory/10 py-6"
            role="tablist"
            aria-label="Filter gallery"
          >
            {FILTERS.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  data-cursor="button"
                  className={`relative px-5 py-2 font-body text-[12px] uppercase tracking-wide2 transition-colors duration-300 ${
                    active ? 'text-ivory' : 'text-ivory/60 hover:text-ivory'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-champagne"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="bg-ink px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="mx-auto max-w-[1440px] columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <GalleryItem
                key={g.id}
                g={g}
                i={i}
                anim={ANIM[i % ANIM.length]}
                openIndex={openIndex}
                reduced={reduced}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={items}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNav={nav}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function GalleryItem({ g, i, anim, openIndex, reduced }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.button
      ref={ref}
      onClick={() => openIndex(i)}
      data-cursor="view"
      initial={reduced ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: LUX_EASE, delay: i * 0.05 }}
      className="group relative mb-5 block w-full overflow-hidden break-inside-avoid text-left"
      aria-label={`View ${g.title}`}
    >
      {/* mask / clip / transform reveal inside */}
      <motion.div
        className="relative"
        initial={reduced ? false : anim}
        animate={inView ? { y: 0, x: 0, scale: 1, opacity: 1, clipPath: 'inset(0 0 0% 0)' } : anim}
        transition={{ duration: 1.1, ease: LUX_EASE, delay: i * 0.05 }}
      >
        <img
          src={g.src}
          alt={g.title}
          loading="lazy"
          className={`w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:brightness-110 ${
            g.ratio === 'portrait' ? 'aspect-[3/4]' : g.ratio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
          }`}
        />
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div>
            <p className="font-body text-[10px] uppercase tracking-lux text-champagne/80">
              {g.category}
            </p>
            <p className="mt-1 font-display text-2xl font-light text-ivory">{g.title}</p>
          </div>
          <span className="font-body text-[10px] uppercase tracking-lux text-ivory/70">View</span>
        </div>
      </motion.div>
    </motion.button>
  )
}