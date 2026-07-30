import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'

function CountdownTimer() {
  const target = new Date('August 16, 2026 00:00:00 GMT+0100').getTime()
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false })

  useEffect(() => {
    function tick() {
      const diff = target - Date.now()
      if (diff <= 0) return setTime(t => ({ ...t, expired: true }))
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  if (time.expired) {
    return <div className="text-center py-4 text-red-500 font-semibold">Offer Expired</div>
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      {[
        { label: 'Days', value: time.days },
        { label: 'Hours', value: time.hours },
        { label: 'Mins', value: time.minutes },
        { label: 'Secs', value: time.seconds },
      ].map((unit) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <span className="font-display text-3xl font-semibold text-navy-900 block leading-none min-w-[3ch]">{pad(unit.value)}</span>
          <span className="text-xs tracking-widest uppercase text-gray-400">{unit.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

const OFFERS = [
  {
    title: 'Weekend Getaway',
    subtitle: 'Escape the everyday',
    image: '/images/rooms/standard-room.webp',
    desc: 'Book 2 nights and get the 3rd night free. Includes complimentary breakfast and late checkout until 3pm.',
    price: 'From ₦90,000',
    tag: 'Limited Time',
  },
  {
    title: 'Honeymoon Suite',
    subtitle: 'Celebrate your love',
    image: '/images/rooms/deluxe-suite.webp',
    desc: 'Champagne on arrival, couples massage, candlelit dinner, and turndown service with rose petals.',
    price: 'From ₦250,000',
    tag: 'Romantic',
  },
  {
    title: 'Corporate Long-Stay',
    subtitle: 'Business, elevated',
    image: '/images/rooms/executive-suite.webp',
    desc: 'Stay 7+ nights and receive 20% off, daily breakfast, airport transfers, and executive lounge access.',
    price: 'From ₦36,000/night',
    tag: 'Business',
  },
  {
    title: 'Family Fun Package',
    subtitle: 'Memories for all ages',
    image: '/images/gallery/rooms/gallery-room-1.webp',
    desc: 'Interconnecting rooms, kids-eat-free dining, pool passes, and a guided city tour for the whole family.',
    price: 'From ₦150,000',
    tag: 'Family',
  },
]

export default function Offers() {
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
            Special <em className="italic text-gold-400 not-italic">Offers</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Offers</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Exclusive Packages</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">Save on Your Next <em className="text-gold-500 not-italic">Stay</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">From romantic escapes to corporate retreats, discover packages designed to make your experience even more memorable.</p>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 text-center">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-600 block mb-2">Featured Offer Ends In</span>
              <CountdownTimer />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {OFFERS.map((offer, i) => (
              <ScrollReveal key={offer.title} delay={0.1 * i}>
                <motion.div
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="h-44 overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold tracking-wider uppercase text-gold-500 mb-1 block">{offer.tag}</span>
                    <h3 className="font-display text-xl font-bold text-navy-900 mb-1">{offer.title}</h3>
                    <p className="text-sm italic text-gray-500 mb-3">{offer.subtitle}</p>
                    <p className="text-sm text-gray-600 mb-4">{offer.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold text-navy-900">{offer.price}</span>
                      <Link to="/booking" className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">
                        Book Offer
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
