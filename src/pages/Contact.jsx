import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'

const PHONE = '2348055000822'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (field) => (e) => setFormData(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    if (!name.trim() || !email.trim() || !message.trim()) return
    const timestamp = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos', dateStyle: 'full', timeStyle: 'short' })
    const msg = encodeURIComponent(
      `*New Contact Form Message — Beechnut Hotel Warri*\n_Submitted: ${timestamp}_\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject || 'Not provided'}\n*Message:*\n${message}\n\nSent from beechnuthotel.pages.dev`
    )
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Get in <em className="italic text-gold-400 not-italic">Touch</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Contact</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Contact Us</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">We'd Love to Hear From You</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">Whether you're planning a stay, organising an event, or simply have a question — our team is ready to help.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="space-y-6">
                {[
                  { icon: 'map', label: 'Address', value: 'Esisi Road, Warri, Delta State, Nigeria' },
                  { icon: 'phone', label: 'Phone', value: '+234 805 500 0822', href: 'tel:+2348055000822' },
                  { icon: 'whatsapp', label: 'WhatsApp', value: '+234 805 500 0822', href: 'https://wa.me/2348055000822' },
                  { icon: 'mail', label: 'Email', value: 'info@beechnuthotelwarri.com', href: 'mailto:info@beechnuthotelwarri.com' },
                  { icon: 'clock', label: 'Reception', value: 'Open 24 hours — 7 days a week' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-600">
                        {item.icon === 'map' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
                        {item.icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 .99h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />}
                        {item.icon === 'whatsapp' && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                        {item.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                        {item.icon === 'clock' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-navy-900 mb-0.5">{item.label}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-gray-500 hover:text-gold-500 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-gray-500">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              {!submitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm"
                >
                  <span className="text-xs font-mono tracking-widest uppercase text-gold-500 block mb-4 pb-3 border-b border-gray-100">Send a Message</span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-name">Your Name <span className="text-red-600">*</span></label>
                      <input type="text" id="contact-name" value={formData.name} onChange={handleChange('name')} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="e.g. Emeka Okafor" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-email">Email <span className="text-red-600">*</span></label>
                      <input type="email" id="contact-email" value={formData.email} onChange={handleChange('email')} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-subject">Subject</label>
                    <input type="text" id="contact-subject" value={formData.subject} onChange={handleChange('subject')} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="How can we help you?" />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-message">Message <span className="text-red-600">*</span></label>
                    <textarea id="contact-message" rows={5} value={formData.message} onChange={handleChange('message')} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none resize-y min-h-[120px]" placeholder="Tell us how we can assist you…" required />
                  </div>

                  <button type="submit" className="px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">
                    Send Message
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. Our team will respond within 24 hours.</p>
                </motion.div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="h-[400px] bg-navy-800/20 flex items-center justify-center text-white/20 text-lg uppercase tracking-widest">
        Map Placeholder — Google Maps Integration
      </section>
    </>
  )
}
