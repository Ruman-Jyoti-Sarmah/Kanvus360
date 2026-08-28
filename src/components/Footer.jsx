import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig, buildWhatsAppLink } from '../config/site'
import { Reveal } from './primitives'

const NAV = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'SERVICES', to: '/services' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'CONTACT', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-ink-950">
      <div className="container-lux py-20 md:py-28">
        {/* Giant statement */}
        <Reveal amount={0.3}>
          <h2 className="max-w-4xl font-display text-4xl font-light leading-tight text-ivory sm:text-5xl md:text-6xl">
            We create experiences
            <br />
            worth{' '}
            <span className="italic text-champagne/80">remembering.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-14 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-body text-sm uppercase tracking-[0.4em] text-ivory">
              {siteConfig.companyName}
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory/50">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav className="md:col-span-1" aria-label="Footer">
            <p className="label-lux mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline font-body text-sm uppercase tracking-wide2 text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-1">
            <p className="label-lux mb-5">Contact</p>
            <ul className="flex flex-col gap-3 font-body text-sm text-ivory/70">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="link-underline inline-flex items-center gap-2 hover:text-ivory">
                  <Mail size={14} className="text-champagne/70" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="link-underline inline-flex items-center gap-2 hover:text-ivory">
                  <Phone size={14} className="text-champagne/70" /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-ivory/50">
                <MapPin size={14} className="mt-1 shrink-0 text-champagne/70" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <p className="label-lux mb-5">Follow</p>
            <ul className="flex flex-col gap-3 font-body text-sm text-ivory/70">
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-2 hover:text-ivory"
                >
                  <Instagram size={14} className="text-champagne/70" /> {siteConfig.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-2 hover:text-ivory"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 font-body text-xs uppercase tracking-lux text-ivory/35 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {siteConfig.companyName} · {siteConfig.location}
          </span>
          <span className="text-champagne/50">EST. —</span>
          <span>{siteConfig.companyName} / {siteConfig.location} / EST. —</span>
        </div>
      </div>
    </footer>
  )
}