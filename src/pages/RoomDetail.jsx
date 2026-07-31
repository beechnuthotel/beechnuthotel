import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROOMS } from '../data/rooms'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function RoomDetail() {
  const { id } = useParams()
  const room = ROOMS.find(r => r.id === id)
  const [activeImage, setActiveImage] = useState(0)

  if (!room) {
    return (
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-surface">
        <span className="font-display text-[8rem] lg:text-[12rem] font-bold text-navy-900/10 leading-none">404</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 -mt-6 mb-3">Room Not Found</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">The room you're looking for doesn't exist.</p>
        <Link to="/rooms" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
          View All Rooms
        </Link>
      </section>
    )
  }

  const otherRooms = ROOMS.filter(r => r.id !== room.id)

  return (
    <>
      <section className="relative h-[50vh] min-h-[340px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            {room.name}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <Link to="/rooms" className="text-white/70 hover:text-gold-400 transition-colors">Rooms</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">{room.name}</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-surface">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={room.images[activeImage]}
                    alt={`${room.name} view ${activeImage + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {room.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative shrink-0 w-24 h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === i ? 'border-gold-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 mb-2">
                {room.type === 'presidential' ? 'Presidential Suite' : room.type.charAt(0).toUpperCase() + room.type.slice(1)}
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{room.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{room.longDescription}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface rounded-lg p-4 text-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 block">Max Occupancy</span>
                  <span className="font-display text-lg font-semibold text-navy-900">{room.maxOccupancy} {room.maxOccupancy === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="bg-surface rounded-lg p-4 text-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 block">Bed Type</span>
                  <span className="font-display text-lg font-semibold text-navy-900">{room.bedType}</span>
                </div>
                <div className="bg-surface rounded-lg p-4 text-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 block">Room Size</span>
                  <span className="font-display text-lg font-semibold text-navy-900">{room.size}</span>
                </div>
                <div className="bg-surface rounded-lg p-4 text-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 block">Price</span>
                  <span className="font-display text-lg font-semibold text-navy-900">&#8358;{room.price.toLocaleString('en-NG')}<span className="text-xs text-gray-400 font-normal">/night</span></span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1.5 text-sm bg-navy-900/5 border border-navy-900/10 rounded-full px-3.5 py-1.5 text-navy-700 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold-500 shrink-0">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link to={`/booking?room=${room.id}`} className="flex-1 text-center px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-navy-900 hover:text-gold-400 transition-all border-2 border-gold-500 hover:border-navy-900">
                  Book This Room
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Explore More</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-900">Other Rooms &amp; Suites</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherRooms.map(r => (
              <ScrollReveal key={r.id}>
                <Link to={`/rooms/${r.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-surface shadow-sm">
                    <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">{r.type}</span>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">{r.name}</h3>
                      <span className="font-display text-sm text-white/80">&#8358;{r.price.toLocaleString('en-NG')}<span className="text-xs text-white/50">/night</span></span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
