import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Seo from '../components/Seo'
import { LUX_EASE, Magnetic, MaskedText } from '../components/primitives'
import { seo } from '../data/content'
import { siteConfig, buildWhatsAppLink } from '../config/site'

const EVENT_TYPES = ['Wedding', 'Exhibition', 'Corporate Event', 'Event Design', 'Private Celebration', 'Other']

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  venue: '',
  guests: '',
  message: '',
}

export default function Contact() {
  const reduced = useReducedMotion()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'A valid email is required.'
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'A valid phone number is required.'
    if (!form.eventType) e.eventType = 'Choose the kind of event.'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setSent(true) // elegant success (no backend wired — placeholder)
  }

  return (
    <>
      <Seo title={seo.contact.title} description={seo.contact.description} />

      <section className="relative overflow-hidden bg-ink px-6 pt-32 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-4xl">
            <p className="label-lux mb-6">Contact</p>
            <MaskedText
              lines={['HAVE AN IDEA?', 'LET\u2019S BRING', 'IT TO LIFE.']}
              className="font-display text-[15vw] font-light leading-[0.96] text-ivory sm:text-[11vw] md:text-[9vw]"
            />
            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-ivory/55">
              Every great event begins as a conversation. Tell us what you are
              imagining — we will take it from there.
            </p>
          </div>

          <div className="mt-16 grid gap-16 border-t border-ivory/10 pt-16 md:grid-cols-12 md:pb-28">
            {/* Left — details */}
            <div className="md:col-span-4">
              <p className="label-lux mb-6">Direct</p>
              <ul className="flex flex-col gap-6 font-body text-sm text-ivory/70">
                <li>
                  <p className="label-lux mb-2">Call</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="link-underline text-ivory">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <p className="label-lux mb-2">Write</p>
                  <a href={`mailto:${siteConfig.email}`} className="link-underline text-ivory">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <p className="label-lux mb-2">Chat</p>
                  <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="link-underline text-ivory">
                    WhatsApp us
                  </a>
                </li>
                <li>
                  <p className="label-lux mb-2">Studio</p>
                  <span className="text-ivory/60">{siteConfig.address}</span>
                </li>
              </ul>

              <div className="mt-12">
                <p className="label-lux mb-4">Follow</p>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="link-underline font-body text-sm uppercase tracking-wide2 text-champagne">
                  {siteConfig.instagramHandle}
                </a>
              </div>
            </div>
{/* Right — form */}
            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    className="flex min-h-[420px] flex-col items-start justify-center"
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: LUX_EASE }}
                  >
                    <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/50 text-champagne">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h2 className="font-display text-5xl font-light text-ivory">
                      Thank you,
                      <br />
                      we&rsquo;ll be in touch.
                    </h2>
                    <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ivory/55">
                      Your enquiry has been received. A member of the Kanvas360
                      team will reach out shortly to begin the conversation.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm(INITIAL); }}
                      className="mt-10 link-underline font-body text-[11px] uppercase tracking-lux text-champagne"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-8 sm:grid-cols-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Field label="Full Name" value={form.name} onChange={(v) => set('name', v)} error={errors.name} required />
                    <Field label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} error={errors.email} required />
                    <Field label="Phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} required />
                    <SelectField label="Event Type" value={form.eventType} onChange={(v) => set('eventType', v)} error={errors.eventType} options={EVENT_TYPES} />
                    <Field label="Event Date" type="date" value={form.eventDate} onChange={(v) => set('eventDate', v)} />
                    <Field label="Venue / Location" value={form.venue} onChange={(v) => set('venue', v)} />
                    <Field label="Guest Count" value={form.guests} onChange={(v) => set('guests', v)} />
                    <div className="sm:col-span-2">
                      <Field label="Message" textarea value={form.message} onChange={(v) => set('message', v)} />
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:col-span-2">
                      <p className="max-w-xs font-body text-xs leading-relaxed text-ivory/35">
                        * Placeholder form — connect to your CMS / email service.
                      </p>
                      <Magnetic>
                        <button
                          type="submit"
                          data-cursor="button"
                          className="group relative inline-flex items-center gap-3 overflow-hidden border border-champagne/50 px-10 py-4 font-body text-[12px] uppercase tracking-wide2 text-ivory transition-colors duration-500 hover:text-ivory"
                        >
                          <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                          <span className="relative">Send Enquiry</span>
                          <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
function FieldShell({ label, error, children, htmlFor }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="label-lux mb-2">{label}</label>
      {children}
      {error && (
        <motion.p
          className="mt-2 font-body text-[11px] uppercase tracking-wide2 text-[#d98a8a]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

function Field({ label, value, onChange, error, type = 'text', textarea = false }) {
  const id = label.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase()
  const base = 'border-b border-ivory/20 bg-transparent pb-3 font-body text-base text-ivory placeholder:text-ivory/30 transition-colors duration-300 focus:border-champagne focus:outline-none'
  return (
    <FieldShell label={label} error={error} htmlFor={id}>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Your ${label.toLowerCase()}...`}
          aria-invalid={!!error}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={type === 'date' ? '' : `Your ${label.toLowerCase()}...`}
          aria-invalid={!!error}
          className={base}
        />
      )}
    </FieldShell>
  )
}

function SelectField({ label, value, onChange, error, options }) {
  const id = 'event-type'
  return (
    <FieldShell label={label} error={error} htmlFor={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-ivory/20 bg-transparent pb-3 font-body text-base text-ivory transition-colors duration-300 focus:border-champagne focus:outline-none [&>option]:bg-ink-900"
        aria-invalid={!!error}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  )
}