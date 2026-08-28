import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

/**
 * Smooth (weighted) scrolling powered by Lenis.
 * Respects prefers-reduced-motion by disabling smoothing.
 */
export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let raf
    function rafLoop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(rafLoop)
    }
    raf = requestAnimationFrame(rafLoop)

    // Expose for imperative scroll (scroll-to-top on route change, etc.)
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [reduced])
}

/** Convenience scroll-to helper that plays nicely with Lenis. */
export function scrollToLenis(target, opts = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, opts)
  } else {
    const el =
      typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}

/** Instantly snap to top (used on route change / transition). */
export function scrollTopLenis() {
  window.scrollTo(0, 0)
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
}