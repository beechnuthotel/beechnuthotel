import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROOMS } from '../data/rooms'
import ScrollReveal from '../components/ui/ScrollReveal'

const CATEGORIES = ['all', 'standard', 'deluxe', 'suite', 'presidential']

export default function Rooms() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? ROOMS : ROOMS.filter(r => r.type === filter)

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
            Rooms &amp; <em className="italic text-gold-400 not-italic">Suites</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Rooms</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Accommodation</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
                Find Your Perfect <em className="text-gold-500 not-italic">Room</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">Every room is a sanctuary — curated furnishings, premium linens, and thoughtful amenities await you.</p>
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-10" role="group" aria-label="Filter rooms by category">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-md'
                    : 'bg-transparent text-gray-600 border-navy-900/15 hover:border-gold-400 hover:text-gold-500'
                }`}
              >
                {cat === 'all' ? 'All Rooms' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((room, i) => (
                <ScrollReveal key={room.id} delay={0.05 * i}>
                  <motion.article
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy-900/5 flex flex-col group"
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                      {room.badge !== 'Standard' && (
                        <span className={`absolute top-3 left-3 z-10 text-[0.6rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                          room.badge === 'Most Popular' ? 'bg-gold-400 text-navy-900' : room.badge === 'Presidential' ? 'bg-navy-950 text-gold-400' : 'bg-navy-900 text-white'
                        }`}>
                          {room.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-1">{room.type === 'presidential' ? 'Presidential Suite' : room.type.charAt(0).toUpperCase() + room.type.slice(1)}</span>
                      <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">{room.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">{room.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {room.amenities.slice(0, 5).map(a => (
                          <span key={a} className="text-xs bg-surface border border-navy-900/10 rounded-full px-2.5 py-1 text-gray-600 font-medium">
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-navy-900/10 gap-2 flex-wrap">
                        <div>
                          <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 block">From</span>
                          <span className="font-display text-xl font-semibold text-navy-900">&#8358;{room.price.toLocaleString('en-NG')}</span>
                          <span className="text-xs text-gray-400"> / night</span>
                        </div>
                        <div className="flex gap-1.5">
                          <Link to={`/booking?room=${room.id}`} className="px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-navy-900 hover:text-gold-400 transition-all border-2 border-gold-500 hover:border-navy-900">
                            Book
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-navy-950 text-center relative overflow-hidden"
      >
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">Direct Booking Advantage</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
            Book Direct &amp; <em className="text-gold-400 not-italic">Save More</em>
          </h2>
          <p className="text-white/60 mb-6">Book directly through our website and enjoy our best available rates, complimentary early check-in (subject to availability), and exclusive member perks.</p>
          <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-transparent hover:text-gold-400 border-2 border-gold-500 hover:border-gold-400 transition-all">
            Reserve a Room
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </motion.section>
    </>
  )
}
