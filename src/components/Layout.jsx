import { useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from './Cursor'
import Grain from './Grain'
import WhatsAppButton from './WhatsAppButton'
import PageTransition from './PageTransition'
import { useLenis } from '../hooks/useLenis'
import { LUX_EASE } from './primitives'

/**
 * Layout mounts the global chrome (nav, cursor, grain, whatsapp, footer)
 * plus the routed page. Changing route animates the page entrance and
 * the cinematic PageTransition overlay.
 */
export default function Layout({ onReady }) {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useLenis()

  useEffect(() => {
    // Unlock scrolling once the loading shield has lifted.
    setReady(true)
    onReady?.()
  }, [onReady])

  // Entrance animation keyed by route so a fresh page mounts per path.
  const page = (
    <motion.main
      key={location.pathname}
      className="relative"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: LUX_EASE, delay: 0.05 }}
    >
      {outlet}
    </motion.main>
  )

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <Grain />
      <Cursor />
      {ready && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      {page}
      <PageTransition />
      {ready && <Footer />}
      {ready && <WhatsAppButton />}
    </div>
  )
}