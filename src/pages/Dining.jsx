import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import StaffVideoCard from '../components/ui/StaffVideoCard'
import { TEAM_MEMBERS } from '../data/staff'

const DINING_VENUES = [
  {
    name: 'The Gold Restaurant',
    tagline: 'Our Dining Area',
    description: 'Elegant à la carte dining celebrating Nigeria\'s most iconic flavours with a contemporary fine-dining twist. Our signature banga bisque, pepper-rubbed grilled lobster, and plantain crème brûlée are guest favourites.',
    image: '/images/dining/gold-restaurant.webp',
    highlights: ['À la carte menu', 'Private dining room', 'Wine cellar', 'Open daily 6:30am–10pm'],
  },
]

const BAR_SECTIONS = [
  {
    name: 'Indoor Bar',
    tagline: 'The Heart of the Lounge',
    description: 'A sophisticated tropical bar at the heart of the hotel, serving signature cocktails, premium spirits, and ice-cold refreshments in an air-conditioned lounge setting.',
    image: '/images/gallery/dining/gallery-dining-1.webp',
    highlights: ['Signature cocktails', 'Premium spirits', 'Air-conditioned lounge', 'Open daily'],
  },
  {
    name: 'Poolside Bar',
    tagline: 'Relax by the Water',
    description: 'Relaxed bar service right by the pool — the perfect spot to sip a handcrafted cocktail or chilled beer between swims on a lazy afternoon.',
    image: '/images/dining/poolside-grill.webp',
    highlights: ['Cocktail bar', 'Poolside seating', 'Light bites', 'Open 11am–11pm'],
  },
  {
    name: 'Roof Top Bar',
    tagline: 'Warri\'s Best Views',
    description: 'Perched on the top floor, our tropical rooftop bar offers panoramic views of the Warri skyline. Sip on signature cocktails and premium spirits as the sun sets over the Niger Delta.',
    image: '/images/dining/skyview-rooftop.webp',
    highlights: ['Panoramic views', 'Signature cocktails', 'Live music Fri–Sat', 'Open 4pm–late'],
  },
]

export default function Dining() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Dining &amp; <em className="italic text-gold-400 not-italic">Bar</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Dining</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Culinary Experiences</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">One Dining Area, Three Tropical Bars</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">Every dish at Beechnut is a celebration of Nigeria's extraordinary culinary heritage, reimagined with precision and presented with pride.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {DINING_VENUES.map((venue, i) => (
              <ScrollReveal key={venue.name} delay={0.1 * i}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] overflow-hidden rounded-lg shadow-sm`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`min-h-[300px] lg:min-h-full overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? 'bg-navy-950 lg:order-1' : 'bg-white'}`}
                  >
                    <span className={`text-xs font-semibold tracking-[0.18em] uppercase block mb-2 ${i % 2 === 1 ? 'text-gold-400' : 'text-gold-500'}`}>
                      {venue.tagline}
                    </span>
                    <h3 className={`font-display text-2xl lg:text-3xl font-bold mb-3 ${i % 2 === 1 ? 'text-white' : 'text-navy-900'}`}>
                      {venue.name}
                    </h3>
                    <div className={`w-12 h-0.5 mb-4 ${i % 2 === 1 ? 'bg-gold-400' : 'bg-gold-500'}`} />
                    <p className={`mb-4 ${i % 2 === 1 ? 'text-white/70' : 'text-gray-600'}`}>{venue.description}</p>
                    <ul className="space-y-1.5">
                      {venue.highlights.map(h => (
                        <li key={h} className={`flex items-center gap-2 text-sm ${i % 2 === 1 ? 'text-white/60' : 'text-gray-500'}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400 shrink-0"><path d="M5 12l5 5L20 7" /></svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-14">
              <StaffVideoCard member={TEAM_MEMBERS.find(m => m.id === 'head-chef')} compact short showQuote={false} />
              <div className="lg:col-span-2">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">From Our Kitchen</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900 mb-3">A Chef&rsquo;s Welcome</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-3">
                  Head Chef Amara Edeh leads The Gold Restaurant and our three tropical bars — crafting authentic Nigerian cuisine with a fine-dining twist, from banga bisque to pepper-rubbed grilled lobster.
                </p>
                <Link to="/team" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gold-500 hover:text-gold-600 transition-colors">
                  Meet the Full Team
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center my-14">
            <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Tropical Bars</span>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900">Three Bars, Three Vibes</h3>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BAR_SECTIONS.map((bar, i) => (
              <ScrollReveal key={bar.name} delay={0.1 * i}>
                <motion.article
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-900/5 flex flex-col h-full group"
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={bar.image} alt={bar.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-1">{bar.tagline}</span>
                    <h4 className="font-display text-xl font-semibold text-navy-900 mb-2">{bar.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{bar.description}</p>
                    <ul className="space-y-1.5">
                      {bar.highlights.map(h => (
                        <li key={h} className="flex items-center gap-2 text-sm text-gray-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400 shrink-0"><path d="M5 12l5 5L20 7" /></svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div id="reservations" />
    </>
  )
}
