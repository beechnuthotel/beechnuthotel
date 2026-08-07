import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import StaffVideoCard from '../components/ui/StaffVideoCard'
import { TEAM_MEMBERS } from '../data/staff'
import { DINING_IMAGES } from '../data/diningImages'

const EVENT_SPACES = [
  {
    name: 'The Grand Ballroom',
    capacity: 'Up to 500 guests',
    image: DINING_IMAGES['indoor-bar']?.[0] ?? '',
    description: 'Our flagship venue with soaring ceilings, crystal chandeliers, and a fully flexible floor plan. Perfect for weddings, galas, and award ceremonies.',
    features: ['500 banquet / 700 cocktail', 'HD projection & sound', 'Chandelier lighting', 'Dedicated bridal suite'],
  },
  {
    name: 'Executive Boardroom',
    capacity: 'Up to 16 guests',
    image: DINING_IMAGES.lounge?.[0] ?? '',
    description: 'A refined, private space for high-stakes meetings and board sessions. Equipped with video-conferencing, digital whiteboards, and secure Wi-Fi.',
    features: ['Video-conferencing', 'Digital whiteboard', 'Catering available', 'Natural daylight'],
  },
  {
    name: 'Riverside Terrace',
    capacity: 'Up to 120 guests',
    image: DINING_IMAGES['vip-bar']?.[0] ?? '',
    description: 'An intimate outdoor setting for evening cocktail parties and sundowner events, with the Effurun skyline as a breathtaking backdrop.',
    features: ['Outdoor covered terrace', 'Built-in BBQ & bar', 'Skyline views', 'Evening events'],
  },
  {
    name: 'Conference Hall',
    capacity: 'Up to 250 delegates',
    image: DINING_IMAGES['pool-bar']?.[0] ?? '',
    description: 'A versatile conference space divisible into three breakout rooms. Ideal for corporate conferences, product launches, and training sessions.',
    features: ['Breakout rooms (×3)', 'PA system & microphones', 'Live streaming capable', 'Exhibition space'],
  },
]

export default function Events() {
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
            Events &amp; <em className="italic text-gold-400 not-italic">Conferences</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Events</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Event Spaces</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">Extraordinary Moments Begin Here</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">From black-tie galas to intimate board meetings, our event spaces and experienced team transform every occasion into a memory that lasts a lifetime.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {EVENT_SPACES.map((space, i) => (
              <ScrollReveal key={space.name} delay={0.1 * i}>
                <motion.div
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="h-52 overflow-hidden">
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold tracking-wider uppercase text-gold-500 block mb-1">{space.capacity}</span>
                    <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{space.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{space.description}</p>
                    <ul className="space-y-1">
                      {space.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-500 shrink-0"><path d="M5 12l5 5L20 7" /></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-16">
              <StaffVideoCard member={TEAM_MEMBERS.find(m => m.id === 'events-sales')} compact short showQuote={false} />
              <div className="lg:col-span-2">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Your Events Team</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900 mb-3">Let&rsquo;s Plan Something Unforgettable</h3>
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-3">
                  Events &amp; Sales Manager Tunde Adebayo and his team coordinate weddings, conferences, and corporate functions for up to 500 guests — handling every detail so you can focus on the moment.
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
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-navy-950 text-center"
      >
        <div className="max-w-xl mx-auto px-4">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">Start Planning</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">Let's Create Something <em className="text-gold-400 not-italic">Extraordinary</em></h2>
          <p className="text-white/60 mb-6">Our events team is available seven days a week. Whether you have a firm date or are still exploring ideas, we'd love to hear from you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-transparent hover:text-gold-400 border-2 border-gold-500 hover:border-gold-400 transition-all">
            Contact Events Team
          </Link>
        </div>
      </motion.section>
    </>
  )
}
