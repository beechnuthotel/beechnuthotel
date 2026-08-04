import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'

const FACILITIES_LIST = [
  {
    name: 'Swimming Pool',
    description: 'A temperature-controlled infinity pool surrounded by loungers and lush tropical landscaping. Open daily from 6am to 8pm.',
    icon: 'pool',
  },
  {
    name: 'Fitness Centre',
    description: 'Fully-equipped gym with cardio machines, free weights, and resistance training equipment. Personal trainers available on request.',
    icon: 'gym',
  },
  {
    name: 'Business Centre',
    description: 'Full-service business centre with printing, scanning, high-speed internet, and private workstations. Open 24 hours.',
    icon: 'business',
  },
  {
    name: 'Spa & Wellness',
    description: 'A serene sanctuary offering traditional Nigerian massage techniques, facials, and wellness therapies. By appointment.',
    icon: 'spa',
  },
  {
    name: 'Conference Facilities',
    description: 'Multiple event spaces accommodating from 6 to 500 guests, with full AV equipment, catering, and event coordination.',
    icon: 'events',
  },
  {
    name: 'Airport Shuttle',
    description: 'Complimentary airport transfer service to and from Osubi Airport. Available 24 hours with advance booking.',
    icon: 'shuttle',
  },
  {
    name: 'Parking',
    description: 'Secure on-site parking with 24-hour security and valet service for hotel guests.',
    icon: 'parking',
  },
  {
    name: 'Laundry & Dry Cleaning',
    description: 'Same-day laundry and dry-cleaning service available six days a week. Simply place your bag in the wardrobe basket.',
    icon: 'laundry',
  },
]

export default function Facilities() {
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
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Our <em className="italic text-gold-400 not-italic">Facilities</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Facilities</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Facilities</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">Everything You Need, <em className="text-gold-500 not-italic">Under One Roof</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">From relaxation to productivity, Beechnut offers world-class facilities designed to make your stay effortless and enjoyable.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FACILITIES_LIST.map((facility, i) => (
              <ScrollReveal key={facility.name} delay={0.05 * i}>
                <motion.div
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 group"
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4 group-hover:bg-gold-200 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-600">
                      {facility.icon === 'pool' && <><path d="M2 20h20M6 4v12M18 4v12" /><path d="M4 16h16" /></>}
                      {facility.icon === 'gym' && <><path d="M6.5 6.5h11M6.5 17.5h11" /><rect x="3" y="10" width="18" height="4" rx="1" /></>}
                      {facility.icon === 'business' && <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>}
                      {facility.icon === 'spa' && <><path d="M12 22c0-4.97-4.03-9-9-9" /><path d="M12 22c0-4.97 4.03-9 9-9" /><circle cx="12" cy="12" r="3" /></>}
                      {facility.icon === 'events' && <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></>}
                      {facility.icon === 'shuttle' && <><rect x="1" y="8" width="22" height="11" rx="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>}
                      {facility.icon === 'parking' && <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>}
                      {facility.icon === 'laundry' && <><path d="M7 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" /><path d="M17 10H7" /></>}
                    </svg>
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{facility.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
