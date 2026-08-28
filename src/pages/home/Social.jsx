import { siteConfig } from '../../config/site'
import { socialImages } from '../../data/content'
import { Reveal, ParallaxImage } from '../../components/primitives'

/** SECTION 10 — INSTAGRAM / SOCIAL. Editorial image grid. */
export default function Social() {
  return (
    <section className="bg-ink-950 px-6 py-28 md:py-40">
      <div className="container-lux">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-5xl font-light text-ivory md:text-6xl">
            Follow the <span className="italic text-champagne/80">journey</span>
          </h2>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 font-body text-sm uppercase tracking-wide2 text-ivory"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne transition-transform group-hover:scale-150" />
            {siteConfig.instagramHandle}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* asymmetric grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {socialImages.map((src, i) => {
            const spans = ['md:col-span-2 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3']
            return (
              <div key={i} className={`${spans[i % spans.length]} overflow-hidden`}>
                <ParallaxImage
                  src={src}
                  alt={`${siteConfig.instagramHandle} — moment ${i + 1}`}
                  className="h-full min-h-[180px] w-full"
                  imgClassName="h-[120%] hover:scale-105"
                  speed={5}
                />
              </div>
            )
          })}
        </div>

        <Reveal className="mt-10">
          <p className="font-body text-xs uppercase tracking-lux text-ivory/40">
            * Instagram placeholder link — update {siteConfig.instagramHandle} in{' '}
            <code className="text-champagne/70">src/config/site.js</code> when the account is ready.
          </p>
        </Reveal>
      </div>
    </section>
  )
}