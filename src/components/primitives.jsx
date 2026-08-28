import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { useRef, useCallback } from 'react'

/* ---------------------------------------------------------------
 * Shared easing. A calm, expensive-feeling cubic-bezier.
 * ------------------------------------------------------------- */
export const LUX_EASE = [0.16, 1, 0.3, 1]

/**
 * MaskedText — cinematic line reveal.
 * Each line is clipped and slides up into view when scrolled to.
 * Splits a string on "\n" or takes an explicit array of lines.
 */
export function MaskedText({
  lines,
  className = '',
  lineClassName = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.09,
  once = true,
  amount = 0.4,
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })

  const split = Array.isArray(lines) ? lines : String(lines).split('\n')

  return (
    <Tag ref={ref} className={className} aria-label={split.join(' ')}>
      {split.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className={`line-inner ${lineClassName}`}
            initial={reduced ? false : { y: '115%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease: LUX_EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * WordByWord — used for the giant testimonial quote.
 * Every word fades/moves in individually.
 */
export function WordByWord({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.05,
  once = true,
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.4 })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.7,
            ease: LUX_EASE,
            delay: delay + i * stagger,
          }}
        >
          {w}{' '}
        </motion.span>
      ))}
    </Tag>
  )
}

/**
 * Reveal — a general masked/y-clip entrance wrapper.
 *   variant: 'slide-up' | 'fade' | 'clip'
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  amount = 0.3,
  duration = 1.1,
  ...rest
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: LUX_EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Magnetic — element gently follows the cursor while hovered.
 */
export function Magnetic({
  children,
  className = '',
  strength = 0.35,
  radius = 140,
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      const relX = e.clientX - (r.left + r.width / 2)
      const relY = e.clientY - (r.top + r.height / 2)
      ref.current.style.translate = `${relX * strength}px ${relY * strength}px`
    },
    [reduced, strength]
  )

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.translate = '0px 0px'
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ willChange: 'transform' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxImage — an image that gently translates against the scroll.
 * The wrapper gives the masked container; the image scales slightly inside.
 */
export function ParallaxImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  speed = 8,
  scale = 1.15,
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed}%`, `${speed}%`]
  )

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-[120%] w-full object-cover ${imgClassName}`}
        style={reduced ? undefined : { y, scale }}
      />
    </div>
  )
}