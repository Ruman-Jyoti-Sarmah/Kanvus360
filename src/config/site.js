/**
 * ============================================================
 * KANVAS360 — CENTRAL CONFIGURATION
 * ------------------------------------------------------------
 * Edit EVERYTHING client-specific here in one place.
 * This is the single handover point for the client.
 * Replace every placeholder with real details before launch.
 * ============================================================
 */

export const siteConfig = {
  // ---- Identity -------------------------------------------------------
  companyName: 'KANVAS360',
  tagline: 'WE CREATE EXPERIENCES WORTH REMEMBERING.',
  location: 'Kolkata',
  established: 'EST. —',

  // ---- Contact --------------------------------------------------------
  // PLACEHOLDER — replace with the client's real details
  phone: '+91 90000 00000',
  phoneDisplay: '+91 90000 00000',
  email: 'hello@kanvas360.in',

  // ---- WhatsApp (placeholder, from central config only) ---------------
  // Format: digits only, country code first, no '+', no spaces.
  whatsappNumber: '919000000000',
  whatsappMessage: 'Hello Kanvas360, I would like to start a conversation.',
  whatsappLink:
    'https://wa.me/919000000000?text=Hello%20Kanvas360%2C%20I%20would%20like%20to%20start%20a%20conversation.',

  // ---- Social (placeholder URL until client supplies the account) -----
  instagramHandle: '@KANVAS360',
  instagramUrl: 'https://www.instagram.com/',

  // ---- Address --------------------------------------------------------
  address:
    'Kanvas360 Studio, Kolkata, West Bengal, India',

  // ---- Analytics / SEO base ------------------------------------------
  baseUrl: 'https://www.kanvas360.in', // PLACEHOLDER domain
}

/** WhatsApp deep link builder (driven purely by config). */
export function buildWhatsAppLink() {
  const text = encodeURIComponent(siteConfig.whatsappMessage)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}