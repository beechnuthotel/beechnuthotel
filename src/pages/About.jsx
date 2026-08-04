import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'

const CORE_VALUES = [
  'Excellence', 'Integrity', 'Hospitality', 'Professionalism',
  'Respect', 'Teamwork', 'Innovation', 'Customer Satisfaction',
  'Accountability', 'Community Partnership',
]

const SERVICES = [
  'Luxury and standard guest accommodation',
  'Restaurant and bar services',
  'Conference and meeting facilities',
  'Banquet and event hosting',
  'Swimming pool and recreation',
  'Laundry services',
  'Complimentary Wi-Fi',
  'Secure parking',
  '24-hour front desk and security',
  'Airport transfer arrangements (upon request)',
]

const CHARTER_ITEMS = [
  'Welcoming every guest with warmth and courtesy.',
  'Providing clean, comfortable, and secure accommodation.',
  'Responding promptly to guest requests and complaints.',
  'Maintaining the highest standards of hygiene and safety.',
  'Respecting the privacy and dignity of every guest.',
  'Continuously improving our services through customer feedback.',
]

const CONDUCT_ITEMS = [
  'Demonstrate honesty and integrity at all times.',
  'Treat guests and colleagues with courtesy and respect.',
  'Maintain a neat and professional appearance.',
  "Protect the hotel's assets and reputation.",
  'Deliver prompt and efficient service.',
  'Uphold confidentiality regarding guest information.',
  'Comply with all hotel policies and safety procedures.',
  'Work collaboratively to achieve organizational goals.',
]

export default function About() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,162,42,0.06)_0%,_transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="font-body text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Corporate <em className="italic text-gold-400 not-italic">Profile</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">About</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Hotel Overview</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-6">A Modern Hospitality <em className="text-gold-500 not-italic">Destination</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-6" />
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Beechnut Hotels is a modern hospitality destination strategically located in Delta State, Nigeria, offering exceptional accommodation, quality dining, conference facilities, and recreational services for business and leisure travelers. Our commitment is to provide every guest with comfort, security, and outstanding service in a warm and welcoming environment.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We combine contemporary hospitality standards with the rich culture and warmth of the Niger Delta to create memorable experiences for our guests. Whether visiting for business, family vacations, conferences, or special events, we strive to exceed expectations through professionalism, innovation, and attention to detail.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16 bg-navy-950 rounded-lg overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-video lg:aspect-auto lg:h-full overflow-hidden"
              >
                <video
                  src="/videos/gm-welcome.mp4"
                  poster="/images/gallery/facilities/gallery-facility-3.webp"
                  controls
                  preload="metadata"
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 lg:p-12 flex flex-col justify-center"
              >
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">A Message From Our General Manager</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">Welcome to Beechnut Hotel Effurun</h3>
                <div className="w-12 h-0.5 bg-gold-400 mb-4" />
                <p className="text-white/70 leading-relaxed mb-4">
                  "On behalf of our entire team, I warmly welcome you to Beechnut Hotel Effurun. Whether you are visiting for business, leisure, or a special celebration, we are committed to making your stay truly memorable."
                </p>
                <p className="text-white/70 leading-relaxed mb-6">
                  From our elegant rooms and suites to our dining area, tropical bars, conference facilities, and recreation — every corner of Beechnut is designed to offer you comfort, security, and genuine Nigerian hospitality.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold-400/15 border border-gold-400/40 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-400" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-white leading-tight">General Manager</p>
                    <p className="text-xs tracking-[0.18em] uppercase text-gold-400">Beechnut Hotel Effurun</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ScrollReveal direction="left">
              <motion.div
                className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 h-full premium-card"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-600" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">Vision Statement</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 leading-relaxed">To be the preferred hospitality destination in Delta State, delivering exceptional service, comfort, and unforgettable guest experiences.</p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div
                className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 h-full premium-card"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-600" aria-hidden="true">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">Mission Statement</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 leading-relaxed">To provide quality accommodation, excellent customer service, and a welcoming atmosphere while creating value for our guests, employees, and the communities we serve.</p>
              </motion.div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-lg p-8 lg:p-10 mb-16 relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold-400/5 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">Our Brand Promises</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-6">What We Promise Every Guest</h3>
                <div className="w-12 h-0.5 bg-gold-400 mb-6" />
                <p className="text-white/80 text-lg leading-relaxed">We promise every guest a memorable stay characterized by comfort, cleanliness, safety, professionalism, and genuine Nigerian hospitality.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
              <motion.div className="h-[400px] overflow-hidden rounded-lg">
                <img src="/images/gallery/facilities/gallery-facility-1.webp" alt="Beechnut Hotel Lounge" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div>
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Service Philosophy</span>
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">Our Approach to Hospitality</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 leading-relaxed">At the heart of our operations is the belief that every guest deserves respect, prompt attention, and personalized service. We are committed to creating experiences that inspire our guests to return and confidently recommend our hotel to others.</p>
              </motion.div>
            </div>
          </ScrollReveal>

          <div className="bg-surface rounded-lg p-8 lg:p-10 mb-16 border border-gray-100">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Quality Policy</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900">Our Standard of Excellence</h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto my-4" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">We are committed to consistently delivering high-quality hospitality services through continuous staff development, effective management systems, regular facility maintenance, and continual improvement that meets and exceeds customer expectations.</p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Our Values</span>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900">Core <em className="text-gold-500 not-italic">Values</em></h3>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-4" />
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {CORE_VALUES.map((value, i) => (
              <ScrollReveal key={value} delay={0.04 * i}>
                <motion.span
                  className="inline-block px-5 py-2.5 text-sm font-semibold tracking-wider uppercase rounded-full border border-gold-400/30 bg-white text-navy-900 shadow-sm"
                  whileHover={{ y: -2, borderColor: '#d4a22a', boxShadow: '0 8px 24px rgba(212,162,42,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {value}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Customer Service Charter</span>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-4">Our Commitment to You</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <ul className="space-y-3">
                  {CHARTER_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-500 shrink-0 mt-0.5" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-950 rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gold-400/5 pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">Employee Code of Conduct</span>
                  <h3 className="font-display text-xl font-bold text-white mb-4">Our Standards</h3>
                  <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                  <ul className="space-y-3">
                    {CONDUCT_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400 shrink-0 mt-0.5" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <div className="text-center mb-10">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Our Services</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900">Everything We <em className="text-gold-500 not-italic">Offer</em></h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto my-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES.map((service, i) => (
                  <ScrollReveal key={service} delay={0.05 * i}>
                    <motion.div
                      className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 shadow-sm border border-gray-100 premium-card"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-600" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-navy-900 font-medium">{service}</span>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg p-8 lg:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900 mb-4">Our Commitment</h3>
                <div className="w-12 h-0.5 bg-navy-900/30 mx-auto mb-4" />
                <p className="text-navy-900/80 text-lg leading-relaxed max-w-4xl mx-auto">
                  We are committed to creating lasting memories through exceptional hospitality, building long-term relationships with our guests, empowering our employees, and contributing positively to the economic and social development of Delta State and the Niger Delta region.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}