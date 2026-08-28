/**
 * ============================================================
 * KANVAS360 — CONTENT / DATA LAYER
 * ------------------------------------------------------------
 * Every piece of editable content lives here.
 * Development placeholder imagery is served from Unsplash.
 *
 * >>> CMS REPLACEMENT GUIDE <<<
 * This file is intentionally shaped like the response of a
 * WordPress REST / GraphQL query. To wire up WordPress:
 *   - Replace `images` with URLs from the WordPress Media Library.
 *   - Replace the arrays below with responses from your CPTs /
 *     ACF fields (gallery, services, projects, testimonials).
 * The components render purely from data, so no UI code changes.
 * ============================================================
 */

/** Unsplash placeholder image builder. */
function img(id, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`
}

/** A curated set of development placeholder images (Unsplash). */
export const IMAGES = {
  hero: img('1519741497674-611481863552', 2200),
  weddingWide: img('1465495976277-4387d4b0b4c6'),
  weddingPortrait: img('1583939003579-730e3918a45a'),
  couple: img('1529636798458-92182e662485'),
  dinner: img('1519671482749-fd09be7ccebf'),
  sparkler: img('1519671482749-fd09be7ccebf'),
  corporate: img('1540575467063-178a50c2df87'),
  stage: img('1511578314322-379afb476865'),
  decor: img('1505236858219-8359eb29e329'),
  table: img('1523592121529-f6dde35f079e'),
  exhibition: img('1531058020387-3be344556be6'),
  gallery: img('1515187029135-18ee286d815b'),
  venue: img('1530103862676-de8c9debad1d'),
  dark: img('1470071459604-3b5ec3a7fe05'),
  bride: img('1583939745310-245dc5ac08f4'),
  ceremony: img('1606800052052-a08af7148866'),
  lace: img('1519742762168-a420474aed6a'),
  reception: img('1519225421980-715cb0215aed'),
}

/** Services used across Home, Services & Mobile Menu previews. */
export const services = [
  {
    id: 'weddings',
    index: '01',
    title: 'WEDDINGS',
    short: 'WEDDINGS',
    tagline:
      'From the first sketch to the final celebration, every detail has a purpose.',
    description:
      'Cinematic weddings composed with obsessive care — from intimate ceremonies to grand celebrations that unfold over days. We design every moment so that when you look back, it does not feel like an event. It feels like a film you lived.',
    image: IMAGES.weddingWide,
    capabilities: [
      'Full wedding design & production',
      'Ceremony & venue styling',
      'Guest experience design',
      'Catering & hospitality direction',
    ],
  },
  {
    id: 'exhibitions',
    index: '02',
    title: 'EXHIBITIONS',
    short: 'EXHIBITIONS',
    tagline: 'Spaces that make people stop, look, and stay.',
    description:
      'Immersive exhibition environments and installations built to hold attention. We choreograph light, sound, scale and movement so your brand or collection becomes something people physically enter.',
    image: IMAGES.exhibition,
    capabilities: [
      'Exhibition & trade-show design',
      'Spatial installation',
      'Lighting & projection design',
      'Visitor journey planning',
    ],
  },
  {
    id: 'corporate',
    index: '03',
    title: 'CORPORATE EVENTS',
    short: 'CORPORATE',
    tagline:
      'Precision for the occasion. Emotion for the people in the room.',
    description:
      'Product launches, conclaves, conferences and celebrations produced with flawless execution. We bring the same cinematic language to corporate audiences — organised, refined and impossible to forget.',
    image: IMAGES.corporate,
    capabilities: [
      'Conferences & summits',
      'Product launches',
      'Annual & gala events',
      'Brand activations',
    ],
  },
  {
    id: 'design',
    index: '04',
    title: 'EVENT DESIGN',
    short: 'DESIGN',
    tagline: 'The invisible craft behind every unforgettable evening.',
    description:
      'Concept, decor, staging and art direction. We design the world an event takes place in — surfaces, silhouettes, scent, sound and light — until every corner of the space belongs to the story.',
    image: IMAGES.decor,
    capabilities: [
      'Concept & art direction',
      'Stage & set design',
      'Floral & decor styling',
      'Lighting design',
    ],
  },
]
/** The Kanvas Method — animated horizontal storytelling stages. */
export const methodStages = [
  {
    index: '01',
    name: 'DISCOVER',
    image: IMAGES.dinner,
    text:
      'We listen before we design. Your story, your people, your reasons — these become the raw material of everything that follows.',
  },
  {
    index: '02',
    name: 'IMAGINE',
    image: IMAGES.stage,
    text:
      'We dream without limits, sketching worlds that could hold the event you imagine — and the one you haven\u2019t yet.',
  },
  {
    index: '03',
    name: 'DESIGN',
    image: IMAGES.decor,
    text:
      'Concepts become craft. Every surface, destination, sound and silhouette is designed with obsessive precision.',
  },
  {
    index: '04',
    name: 'CREATE',
    image: IMAGES.ceremony,
    text:
      'The build begins. Our teams, artisans and technicians bring the world we designed into being — quietly, perfectly, on time.',
  },
  {
    index: '05',
    name: 'DELIVER',
    image: IMAGES.sparkler,
    text:
      'The moment arrives. Everything we designed meets every person we imagined — and becomes a memory that remains.',
  },
]

/** Selected Stories — asymmetric editorial gallery (Home). */
export const selectedStories = [
  {
    id: 'sh-01',
    title: 'The Purbasha Wedding',
    category: 'WEDDINGS',
    image: IMAGES.weddingPortrait,
    ratio: 'portrait',
    size: 'tall',
  },
  {
    id: 'sh-02',
    title: 'Light Forms — Exhibition',
    category: 'EXHIBITIONS',
    image: IMAGES.exhibition,
    ratio: 'landscape',
    size: 'wide',
  },
  {
    id: 'sh-03',
    title: 'Meridian Gala',
    category: 'CORPORATE',
    image: IMAGES.corporate,
    ratio: 'landscape',
    size: 'medium',
  },
  {
    id: 'sh-04',
    title: 'Vermilion — Event Design',
    category: 'DESIGN',
    image: IMAGES.decor,
    ratio: 'portrait',
    size: 'medium',
  },
]

/** Emotional moments — photo-driven section. */
export const emotionalMoments = [
  {
    image: IMAGES.bride,
    caption: 'THE MOMENT BEFORE THE MUSIC BEGINS.',
    align: 'right',
  },
  {
    image: IMAGES.ceremony,
    caption: 'THE ROOM FALLS SILENT.',
    align: 'left',
  },
  {
    image: IMAGES.sparkler,
    caption: 'AND THEN — EVERYTHING COMES ALIVE.',
    align: 'right',
  },
]

/** Numbers / principles section (principles, NOT invented statistics). */
export const principles = [
  { index: '01', word: 'VISION', text: 'We begin with the feeling, not the logistics.' },
  { index: '02', word: 'PRECISION', text: 'Every detail is designed, measured, rehearsed.' },
  { index: '03', word: 'EXPERIENCE', text: 'We do not plan events. We craft memories.' },
]

/** Testimonial (PLACEHOLDER — replace client name & event type). */
export const testimonial = {
  quote:
    'They understood what we wanted before we could fully say it. The night did not feel planned — it felt felt. Months later, people still speak about it as if it happened yesterday.',
  name: '[CLIENT NAME]',
  eventType: '[Event Type · Placeholder]',
}

/** Social / Instagram image grid. */
export const socialImages = [
  IMAGES.weddingWide,
  IMAGES.dinner,
  IMAGES.ceremony,
  IMAGES.exhibition,
  IMAGES.decor,
  IMAGES.sparkler,
]
/** Gallery (full page, filterable). */
export const galleryItems = [
  { id: 'g1', src: IMAGES.weddingWide, category: 'WEDDINGS', title: 'The First Dance', ratio: 'landscape' },
  { id: 'g2', src: IMAGES.couple, category: 'WEDDINGS', title: 'Forever, Framed', ratio: 'portrait' },
  { id: 'g3', src: IMAGES.ceremony, category: 'WEDDINGS', title: 'Under the Canopy', ratio: 'square' },
  { id: 'g4', src: IMAGES.exhibition, category: 'EXHIBITIONS', title: 'Light Forms', ratio: 'landscape' },
  { id: 'g5', src: IMAGES.gallery, category: 'EXHIBITIONS', title: 'The Gallery Wall', ratio: 'portrait' },
  { id: 'g6', src: IMAGES.venue, category: 'EXHIBITIONS', title: 'Into the Space', ratio: 'landscape' },
  { id: 'g7', src: IMAGES.corporate, category: 'CORPORATE', title: 'The Summit', ratio: 'landscape' },
  { id: 'g8', src: IMAGES.stage, category: 'CORPORATE', title: 'Raised Voices', ratio: 'portrait' },
  { id: 'g9', src: IMAGES.dinner, category: 'CORPORATE', title: 'Evening in Motion', ratio: 'square' },
  { id: 'g10', src: IMAGES.decor, category: 'DECOR', title: 'Vermilion', ratio: 'portrait' },
  { id: 'g11', src: IMAGES.table, category: 'DECOR', title: 'The Table', ratio: 'landscape' },
  { id: 'g12', src: IMAGES.lace, category: 'DECOR', title: 'White on White', ratio: 'square' },
]

/** About / process timeline. */
export const aboutProcess = [
  { index: '01', name: 'DISCOVER', text: 'We listen first. Story, people, reasons.' },
  { index: '02', name: 'DEFINE', text: 'We shape the concept and the feeling.' },
  { index: '03', name: 'DESIGN', text: 'Every detail is crafted with precision.' },
  { index: '04', name: 'DELIVER', text: 'The world we designed becomes real.' },
  { index: '05', name: 'CELEBRATE', text: 'The memory begins — and it remains.' },
]

/** SEO metadata for all pages. */
export const seo = {
  home: {
    title: 'Kanvas360 | Premium Event Management Company in Kolkata',
    description:
      'We turn ideas into experiences people remember. Weddings, exhibitions, corporate events and experiential event production in Kolkata.',
  },
  about: {
    title: 'About Kanvas360 | Event Management Kolkata',
    description:
      'The story, belief and craft behind Kanvas360 — a premium event design studio in Kolkata creating experiences worth remembering.',
  },
  services: {
    title: 'Event Management Services | Kanvas360',
    description:
      'Weddings, exhibitions, corporate events and event design — immersive experiences produced with cinematic precision by Kanvas360, Kolkata.',
  },
  gallery: {
    title: 'Kanvas360 | Wedding & Event Gallery',
    description:
      'A curated gallery of weddings, exhibitions, corporate events and event design from Kanvas360, Kolkata.',
  },
  contact: {
    title: 'Contact Kanvas360 | Kolkata Event Management',
    description:
      'Have an idea? Let\u2019s bring it to life. Begin a conversation with the Kanvas360 team in Kolkata.',
  },
}