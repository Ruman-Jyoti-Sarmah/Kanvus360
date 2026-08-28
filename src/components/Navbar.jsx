import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../config/site'
import { LUX_EASE } from './primitives'

const LINKS = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'SERVICES', to: '/services' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'CONTACT', to: '/contact' },
]

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[3000] transition-all duration-500 ${
        scrolled ? 'bg-ink/70 backdrop-blur-xl border-b border-ivory/5' : 'bg-transparent'
      }`}
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: LUX_EASE, delay: 0.15 }}
    >
      <nav className="container-lux flex items-center justify-between py-5" aria-label="Primary">
        <Link to="/" className="flex items-baseline gap-2" aria-label={`${siteConfig.companyName} home`}>
          <span className="font-body text-sm font-semibold uppercase tracking-[0.4em] text-ivory">
            {siteConfig.companyName}
          </span>
          <span className="hidden font-display italic text-champagne/70 sm:inline">Kolkata</span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`link-underline font-body text-[12px] uppercase tracking-wide2 transition-colors duration-300 ${
                  active ? 'text-champagne' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-ivory/25 px-6 py-3 font-body text-[12px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ink"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <span className="relative">Let's Talk</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="relative h-4 w-7">
            <motion.span
              className="absolute left-0 top-0 h-px w-full bg-ivory"
              animate={menuOpen ? { rotate: 45, top: 8 } : { rotate: 0, top: 0 }}
            />
            <motion.span
              className="absolute bottom-0 left-0 h-px w-full bg-ivory"
              animate={menuOpen ? { rotate: -45, bottom: 8 } : { rotate: 0, bottom: 0 }}
            />
          </div>
        </button>
      </nav>

      {/* Fullscreen cinematic mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-0 z-[-1] flex flex-col justify-center bg-ink px-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: LUX_EASE }}
          >
<motion.nav
              className="flex flex-col gap-6"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                hidden: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    show: { opacity: 1, x: 0, transition: { ease: LUX_EASE, duration: 0.6 } },
                  }}
                >
                  <Link
                    to={l.to}
                    className="group flex items-baseline gap-4 font-display text-5xl font-light text-ivory"
                  >
                    <span className="font-body text-xs tracking-lux text-champagne/70">0{i + 1}</span>
                    <span className="transition-colors group-hover:text-champagne">
                      {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="mt-16 flex flex-col gap-2 border-t border-ivory/10 pt-6 font-body text-sm text-ivory/60"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5 } } }}
              initial="hidden"
              animate="show"
            >
              <span>{siteConfig.location}</span>
              <span className="text-champagne/70">{siteConfig.instagramHandle}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}