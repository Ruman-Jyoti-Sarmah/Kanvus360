import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { MaskedText, ParallaxImage, Reveal, LUX_EASE } from '../components/primitives'
import { seo, IMAGES, aboutProcess } from '../data/content'

export default function About() {
  return (
    <>
      <Seo title={seo.about.title} description={seo.about.description} />

      {/* HERO */}
      <PageHeader
        kicker="About — Kanvas360"
        lines={['WE BELIEVE', 'THE BEST EVENTS', 'ARE FELT.']}
        image={IMAGES.venue}
        imageAlt="A venue transformed by Kanvas360 lighting"
      />

      {/* WHO WE ARE */}
      <StorySection
        number="01"
        label="Who We Are"
        lines={['WE ARE THE', 'STORYTELLERS', 'OF SPACE.']}
        paragraph="Kanvas360 is a premium event design studio in Kolkata. We compose weddings, exhibitions and corporate moments as layered, cinematic worlds — every light, texture and pause chosen with a single intention: to make people feel something."
        image={IMAGES.exhibition}
        imageAlt="An exhibition environment designed by Kanvas360"
        flip
      />

      <Divider verse="Events are not arrangements. They are emotional architecture." />

      {/* WHAT WE BELIEVE */}
      <StorySection
        number="02"
        label="What We Believe"
        lines={['HOSPITALITY', 'IS AN', 'ART.']}
        paragraph="We measure our work not by checklists but by the quiet pause when a room holds its breath. Luxury, for us, is what remains after the surface dissolves — memory, feeling, meaning."
        image={IMAGES.decor}
        imageAlt="A Kanvas360 decor detail"
      />
<Divider verse="We begin with the feeling, and design backward from it." />

      {/* HOW WE THINK */}
      <section className="bg-ink px-6 py-24 md:py-32">
        <div className="container-lux grid gap-12 md:grid-cols-2">
          <div>
            <p className="label-lux mb-8">{'03 — How We Think'}</p>
            <MaskedText
              lines={['DETAIL', 'IS', 'EMOTION.']}
              className="font-display text-5xl font-light leading-[1.02] text-ivory md:text-6xl"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="max-w-md font-body text-base leading-relaxed text-ivory/60">
              Every decision — where the light falls, how far a table sits from
              the window, the moment the music changes — shapes how a room
              feels. We treat these decisions with the calm of craft, not the
              noise of logistics.
            </p>
            <p className="max-w-md font-body text-sm leading-relaxed text-ivory/40">
              We design backwards from the final moment, then fill every inch
              between with intention.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS — vertical timeline */}
      <section className="bg-ink-950 px-6 py-24 md:py-32">
        <div className="container-lux">
          <p className="label-lux mb-4">The Process</p>
          <Reveal>
            <h2 className="font-display text-5xl font-light text-ivory md:text-6xl">
              From idea to celebration.
            </h2>
          </Reveal>
          <div className="mt-16">
            {aboutProcess.map((step, i) => (
              <ProcessStep key={step.name} step={step} i={i} last={i === aboutProcess.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE CREATE — CTA tail */}
      <section className="bg-ink px-6 py-24 text-center md:py-32">
        <div className="container-lux">
          <MaskedText
            lines={['The craft lives', 'in the doing.']}
            className="font-display text-4xl font-light leading-tight text-ivory md:text-6xl"
          />
          <Reveal className="mt-10" delay={0.2}>
            <a
              href="/gallery"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-champagne/50 px-10 py-4 font-body text-[12px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ivory"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative">View our work</span>
              <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
function StorySection({ number, label, lines, paragraph, image, imageAlt, flip }) {
  return (
    <section className="bg-ink px-6 py-24 md:py-32">
      <div className="container-lux">
        <p className="label-lux mb-10">{number} — {label}</p>
        <div className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${flip ? 'md:[direction:rtl]' : ''}`}>
          <div className="[direction:ltr]">
            <MaskedText
              lines={lines}
              className="font-display text-[11vw] font-light leading-[1.02] text-ivory sm:text-6xl md:text-7xl"
            />
          </div>
          <div className="[direction:ltr]">
            <ParallaxImage
              src={image}
              alt={imageAlt || label}
              className="h-[46vh] w-full md:h-[60vh]"
              speed={6}
            />
          </div>
        </div>
        {paragraph && (
          <Reveal className="mt-14 max-w-2xl">
            <p className="font-body text-base leading-relaxed text-ivory/60">{paragraph}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Divider({ verse }) {
  return (
    <div className="flex items-center justify-center bg-ink py-16 md:py-20">
      <p className="max-w-xl text-center font-display text-2xl font-light italic text-champagne/70 md:text-3xl">
        {verse}
      </p>
    </div>
  )
}

function ProcessStep({ step, i, last }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className="relative grid gap-4 py-10 md:grid-cols-12 md:gap-8">
      {!last && (
        <span className="absolute left-[13px] top-16 h-[calc(100%-2rem)] w-px bg-ivory/10 md:left-6" />
      )}
      <motion.div
        className="md:col-span-2"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: LUX_EASE, delay: i * 0.05 }}
      >
        <span className="flex h-12 w-12 items-center justify-center border border-champagne/40 font-display text-lg text-champagne">
          {step.index}
        </span>
      </motion.div>
      <motion.h3
        className="font-display text-4xl font-light text-ivory md:col-span-4"
        initial={reduced ? false : { opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: LUX_EASE, delay: i * 0.05 }}
      >
        {step.name}
      </motion.h3>
      <motion.p
        className="max-w-sm font-body text-sm leading-relaxed text-ivory/55 md:col-span-6"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: LUX_EASE, delay: i * 0.05 + 0.1 }}
      >
        {step.text}
      </motion.p>
    </div>
  )
}