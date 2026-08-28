import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { MaskedText } from '../components/primitives'
import { siteConfig } from '../config/site'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 pt-24">
      <Seo title="Page Not Found | Kanvas360" description="The page you're looking for could not be found." />
      <p className="label-lux mb-8">404</p>
      <MaskedText
        lines={['THIS MOMENT', "DOESN'T", 'EXIST.']}
        className="text-center font-display text-[13vw] font-light leading-[1.02] text-ivory sm:text-[10vw]"
      />
      <Link
        to="/"
        className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden border border-champagne/50 px-10 py-4 font-body text-[12px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ivory"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        <span className="relative">Return home</span>
        <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
      </Link>
      <p className="mt-16 font-body text-[11px] uppercase tracking-lux text-ivory/35">
        {siteConfig.companyName} — {siteConfig.location}
      </p>
    </section>
  )
}