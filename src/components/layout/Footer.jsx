import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PHONE = '2348055000822'

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/beechnuthotelwarri',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/beechnuthotelwarri',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z',
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/beechnutwarri',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z',
  },
]

const QUICK_LINKS = [
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Events & Conferences', to: '/events' },
  { label: 'Photo Gallery', to: '/gallery' },
  { label: 'Video Testimonials', to: '/testimonials' },
  { label: 'About Beechnut', to: '/about' },
  { label: 'Special Offers', to: '/offers' },
]

const GUEST_LINKS = [
  { label: 'Make a Reservation', to: '/booking' },
  { label: 'Restaurant Reservations', to: '/dining#reservations' },
  { label: 'Corporate Packages', to: '/events#corporate' },
  { label: 'Contact & Directions', to: '/contact' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    const msg = encodeURIComponent(`Newsletter signup — Beechnut Hotel Effurun\n\nEmail: ${newsletterEmail}\n\nSent from beechnuthotel.pages.dev`)
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setNewsletterEmail('')
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-navy-950 text-white/70 pt-24"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10"
        >
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Beechnut Hotel Effurun logo" width="180" height="112" className="h-12 w-auto rounded-md bg-white p-1.5" />
              <span>
                <span className="font-display text-2xl font-medium text-white block">Beechnut</span>
                <span className="text-xs tracking-[0.18em] uppercase text-gold-400 block">Hotel Warri</span>
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              Warri's premier luxury destination — where Nigerian warmth, world-class hospitality, and architectural elegance converge to create memories that last a lifetime.
            </p>
            <div className="flex gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, path }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: '#d4a22a', color: '#d4a22a' }}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400 hover:bg-gold-400/10"
                  aria-label={`Beechnut Hotel on ${label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-gold-400 mb-4">Explore</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/55 hover:text-gold-400 transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-gold-400 mb-4">Guest Services</h3>
            <ul className="flex flex-col gap-2">
              {GUEST_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/55 hover:text-gold-400 transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-gold-400 mb-4">Find Us</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2 text-sm text-white/55">
                <svg className="mt-0.5 shrink-0 text-gold-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>1 Justice Mosheshe Close, Off Aziza Road, Effurun/Sapele Road, Effurun, Delta, Nigeria</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-white/55">
                <svg className="mt-0.5 shrink-0 text-gold-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 .99h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+2348055000822" className="hover:text-gold-400 transition-colors">+234 805 500 0822</a>
              </div>
              <div className="flex items-start gap-2 text-sm text-white/55">
                <svg className="mt-0.5 shrink-0 text-gold-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@beechnuthotelwarri.com" className="hover:text-gold-400 transition-colors">info@beechnuthotelwarri.com</a>
              </div>
            </address>

            <div className="mt-5">
              <h4 className="font-body text-xs font-bold tracking-[0.15em] uppercase text-gold-400 mb-2">Newsletter</h4>
              <p className="text-sm text-white/55 mb-3">Special offers, seasonal packages, and stories from Warri's finest.</p>
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit} aria-label="Newsletter signup">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2.5 text-sm bg-white/10 border border-white/15 rounded-sm text-white placeholder-white/30 outline-none focus:border-gold-400 transition-colors"
                  required
                />
                <button type="submit" className="px-3 py-2.5 bg-gold-400 text-navy-900 rounded-sm hover:bg-gold-600 transition-colors" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between py-4 text-xs text-white/35 gap-2">
          <span>&copy; {year} Beechnut Hotel Effurun. All rights reserved.</span>
          <span>Site designed by <a href="https://webdev.talent-loop.org" target="_blank" rel="noopener noreferrer" className="text-gold-400/80 hover:text-gold-400 underline underline-offset-2 transition-colors">Talent Loop Web Service</a></span>
          <span className="flex gap-3">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Sitemap</span>
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
