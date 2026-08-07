import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import { DINING_IMAGES } from '../data/diningImages'
import { ROOM_IMAGES } from '../data/roomImages'

const CATEGORIES = ['all', 'rooms', 'dining', 'facilities', 'team']

const GALLERY_ITEMS = [
  { id: 1, category: 'rooms', image: ROOM_IMAGES.executive?.[0] ?? '', caption: 'Executive Suite Living Area' },
  { id: 2, category: 'rooms', image: ROOM_IMAGES.deluxe?.[0] ?? '', caption: 'Premium Guest Room' },
  { id: 3, category: 'dining', image: DINING_IMAGES['indoor-bar']?.[0] ?? '', caption: 'Bar & Lounge Area' },
  { id: 4, category: 'dining', image: DINING_IMAGES.lounge?.[0] ?? '', caption: 'Dining Experience' },
  { id: 5, category: 'dining', image: DINING_IMAGES['vip-bar']?.[0] ?? '', caption: 'Outdoor Patio Dining' },
  { id: 6, category: 'facilities', image: DINING_IMAGES.lounge?.[0] ?? '', caption: 'Guest Lounge' },
  { id: 7, category: 'facilities', image: DINING_IMAGES['pool-bar']?.[0] ?? '', caption: 'Relaxation Area' },
  { id: 8, category: 'facilities', image: DINING_IMAGES['indoor-bar']?.[0] ?? '', caption: 'Reception & Lobby' },
  { id: 9, category: 'team', image: '/staff/kitchen/kitchen-candid-1.svg', caption: 'The Kitchen Crew at Work' },
  { id: 10, category: 'team', image: '/staff/front-office/front-desk-candid-1.svg', caption: 'Front Desk Team' },
  { id: 11, category: 'team', image: '/staff/events/events-candid-1.svg', caption: 'Event Planning in Action' },
  { id: 12, category: 'team', image: '/staff/guest-services/guest-services-candid-1.svg', caption: 'Guest Services Team' },
  { id: 13, category: 'team', image: '/staff/housekeeping/housekeeping-candid-1.svg', caption: 'Housekeeping Excellence' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (lightbox) {
      const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
      }
    }
  }, [lightbox])

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === filter)

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
            Photo <em className="italic text-gold-400 not-italic">Gallery</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Gallery</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Moments Captured</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">A Visual Journey Through <em className="text-gold-500 not-italic">Beechnut</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8" role="group" aria-label="Filter gallery by category">
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
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative aspect-square bg-navy-800/10 overflow-hidden cursor-zoom-in rounded-sm"
                  whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
                  onClick={() => setLightbox(item)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightbox(item) } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.caption}`}
                >
                  <img src={item.image} alt={item.caption} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" aria-hidden="true">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
                onClick={() => setLightbox(null)}
                onKeyDown={e => { if (e.key === 'Escape') setLightbox(null) }}
                role="dialog"
                aria-modal="true"
                aria-label="Image lightbox"
                tabIndex={-1}
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
                <motion.img
                  key={lightbox.id}
                  src={lightbox.image}
                  alt={lightbox.caption}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                  onClick={e => e.stopPropagation()}
                />
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm"
                >
                  {lightbox.caption}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
