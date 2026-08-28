import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MaskedText, ParallaxImage } from '../../components/primitives'
import { IMAGES } from '../../data/content'
import { siteConfig } from '../../config/site'

/** SECTION 02 — INTRODUCTION. Editorial composition with parallax image. */
export default function Intro() {
  const reduced = useReducedMotion()

  return (
    <section className="relative bg-ink py-28 md:py-44">
      <div className="container-lux grid items-center gap-14 md:grid-cols-12 md:gap-8">
        {/* Big image */}
        <div className="relative md:col-span-7">
          <ParallaxImage
            src={IMAGES.couple}
            alt="A couple at the heart of a Kanvas360 celebration"
            className="h-[420px] w-full md:h-[560px]"
            imgClassName="grayscale-[0.15]"
            speed={6}
          />
          {/* rotating vertical label */}
          <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 md:block">
            <span className="label-lux whitespace-nowrap [writing-mode:vertical-rl]">
              {siteConfig.companyName} / PHILOSOPHY
            </span>
          </div>
        </div>

        {/* Editorial text */}
        <div className="relative md:col-span-5 md:pl-6">
          <MaskedText
            lines={['MORE THAN', 'EVENTS.']}
            className="font-display text-5xl font-light leading-[1.02] text-ivory sm:text-6xl"
            delay={0.05}
          />
          <p className="mt-6 font-display text-2xl font-light italic text-champagne/80 md:text-3xl">
            We design experiences.
          </p>

          <div className="my-8 h-px w-16 bg-champagne/40" />

          <p className="max-w-md font-body text-base leading-relaxed text-ivory/60">
            Kanvas360 is an experiential event studio in Kolkata. We shape
            weddings, exhibitions and corporate moments into layered,
            cinematic worlds — where lighting, typography, taste and timing
            all serve a single idea: the feeling people carry away.
          </p>

          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/40">
            We operate on the belief that hospitality is an art — measured not
            in checklists, but in the quiet moments that make a room hold its
            breath.
          </p>
        </div>
      </div>
    </section>
  )
}