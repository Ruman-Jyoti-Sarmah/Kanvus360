import { WordByWord } from '../../components/primitives'
import { testimonial } from '../../data/content'

/** SECTION 09 — TESTIMONIAL. One giant quote, word-by-word. */
export default function Testimonial() {
  return (
    <section className="bg-ink px-6 py-32 md:py-48">
      <div className="container-lux mx-auto max-w-5xl text-center">
        <span className="font-display text-8xl italic leading-none text-champagne/40">&ldquo;</span>
        <WordByWord
          text={testimonial.quote}
          className="font-display text-3xl font-light leading-snug text-ivory sm:text-4xl md:text-5xl"
        />
        <div className="mt-12 border-t border-ivory/10 pt-8">
          <p className="font-body text-sm uppercase tracking-wide2 text-ivory">
            {testimonial.name}
          </p>
          <p className="mt-1 font-body text-xs uppercase tracking-lux text-champagne/70">
            {testimonial.eventType}
          </p>
        </div>
        <p className="mt-4 font-body text-[10px] uppercase tracking-lux text-ivory/30">
          * Placeholder testimonial — to be replaced by the client.
        </p>
      </div>
    </section>
  )
}