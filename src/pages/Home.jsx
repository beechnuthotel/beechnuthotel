import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS, STATS } from '../data/testimonials'
import { ROOMS } from '../data/rooms'
import ScrollReveal from '../components/ui/ScrollReveal'
import StaffVideoCard from '../components/ui/StaffVideoCard'
import { GM_WELCOME } from '../data/staff'

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-gold-400" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const next = useCallback(() => {
    setIndex(i => Math.min(i + 1, TESTIMONIALS.length - 1))
  }, [])

  const prev = useCallback(() => {
    setIndex(i => Math.max(i - 1, 0))
  }, [])

  const resetAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetAuto])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="min-w-full sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.667rem)] shrink-0">
              <motion.div
                className="bg-white rounded-sm p-6 shadow-sm border-l-3 border-gold-400"
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <StarRating count={t.rating} />
                <p className="font-accent italic text-lg text-navy-900 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gold-100 shrink-0 flex items-center justify-center text-gold-600 text-xs font-bold tracking-wider">
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-navy-900 block">{t.name}</span>
                    <span className="text-xs text-gray-500 block">{t.meta}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <motion.button
          onClick={() => { prev(); resetAuto() }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full border border-gold-400 text-gold-400 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </motion.button>
        <motion.button
          onClick={() => { next(); resetAuto() }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full border border-gold-400 text-gold-400 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-colors"
          aria-label="Next testimonial"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </motion.button>
      </div>
    </div>
  )
}

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const heroContentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

const statVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] } }),
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0)
  const heroSlides = ['/images/hero-slide-1.webp', '/images/hero-slide-2.webp']

  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-navy-950" aria-label="Welcome to Beechnut Hotel Effurun">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={heroSlides[slideIndex]}
              alt=""
              fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
              variants={heroBgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/70 via-navy-950/40 to-navy-950/65" />
        </div>
        <motion.div
          variants={heroContentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center max-w-3xl px-4"
        >
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 block mb-3"
          >
            Welcome to Warri's Finest
          </motion.span>
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-normal text-white leading-none tracking-tight mb-4">
            Beechnut<br />Hotel Warri
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-body text-lg text-white/80 font-light tracking-wider mb-8"
          >
            Where Nigerian warmth meets world-class luxury
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)]">
              Reserve a Room
            </Link>
            <a href="#rooms" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all duration-300">
              Explore Rooms
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/55 text-xs tracking-wider uppercase"
        >
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-400/70 animate-scroll-line" />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gold-500 py-10"
        aria-label="Hotel highlights"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="font-display text-4xl font-semibold text-navy-900 leading-none block">{stat.value}</span>
                <span className="text-sm font-medium tracking-widest uppercase text-navy-900/75 mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-16 lg:py-24 bg-surface" aria-labelledby="gm-welcome-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <StaffVideoCard member={GM_WELCOME} autoplayOnView showTranscript className="h-full" />
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3">A Message From Our General Manager</span>
              <h2 id="gm-welcome-heading" className="font-display text-3xl lg:text-4xl font-medium text-navy-900 mb-3">
                Welcome, From {GM_WELCOME.name}
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mb-4" />
              <p className="text-navy-900/70 leading-relaxed mb-4">{GM_WELCOME.caption}</p>
              <p className="text-navy-900/70 mb-6">
                Meet the department heads who bring Warri's legendary warmth into every room, every plate, and every celebration.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/team" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
                  Meet the Team
                </Link>
                <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">
                  Reserve a Room
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface" id="rooms" aria-labelledby="rooms-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="eyebrow">Accommodation</span>
              <h2 id="rooms-heading" className="section-title">Rooms &amp; Suites</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
              <p className="section-subtitle mx-auto">Each space is a carefully composed sanctuary — blending contemporary design with the warmth of Warri's spirit.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ROOMS.map((room, i) => (
              <ScrollReveal key={room.id} delay={0.08 * i}>
                <Link to={`/rooms/${room.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/5] shadow-sm">
                    <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                    <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/10 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 block mb-1">{room.type}</span>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">{room.name}</h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/rooms" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">
              View All Rooms &amp; Suites
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="usp-heading" id="why-us">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-surface p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3">Our Promise</span>
            <h2 id="usp-heading" className="font-display text-3xl font-medium text-navy-900 mb-3">Hospitality Rooted in Warri's Soul</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-navy-900/70 mb-3">From the moment you arrive, every interaction is crafted with intention. Our team brings the city's legendary warmth and community spirit into every room, every plate, every smile.</p>
            <p className="text-navy-900/70 mb-4">We don't just host guests — we welcome family.</p>
            <Link to="/about" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">Our Story</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="min-h-[300px] lg:min-h-full overflow-hidden"
          >
            <img src="/images/dining/gold-restaurant.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden bg-navy-900">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1 bg-navy-900 p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-300 block mb-3">Location</span>
            <h2 className="font-display text-3xl font-medium text-white mb-3">At the Heart of Warri</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-white/70 mb-3">Strategically positioned in the commercial and cultural centre of Warri, Beechnut places you minutes from key business hubs, entertainment districts, and the vibrant energy that defines this city.</p>
            <p className="text-white/70 mb-4">Whether you're here for business or leisure, our location is your advantage.</p>
            <Link to="/contact" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900 transition-all">Get Directions</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2 min-h-[300px] lg:min-h-full overflow-hidden"
          >
            <img src="/images/gallery/facilities/gallery-facility-3.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-surface p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3">Facilities</span>
            <h2 className="font-display text-3xl font-medium text-navy-900 mb-3">World-Class Amenities</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-navy-900/70 mb-3">A fully-equipped fitness centre, temperature-controlled swimming pool, full-service business centre, event spaces for up to 500 guests, and 24-hour room service — all under one roof.</p>
            <p className="text-navy-900/70 mb-4">Excellence is not an amenity here. It is the standard.</p>
            <Link to="/facilities" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">Explore Facilities</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="min-h-[300px] lg:min-h-full overflow-hidden"
          >
            <img src="/images/rooms/deluxe-suite.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative min-h-[580px] flex items-center bg-navy-950 overflow-hidden"
        id="dining"
        aria-labelledby="dining-heading"
      >
        <img src="/images/dining/poolside-grill.webp" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/70 z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-400 block mb-3">Culinary Experiences</span>
            <h2 id="dining-heading" className="font-display text-4xl font-medium text-white mb-3">Flavours That Tell a Story</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <blockquote className="font-accent text-2xl italic text-gold-300 leading-relaxed mb-4 border-l-3 border-gold-400 pl-4">
              &ldquo;Food is memory, culture, and celebration — we serve all three.&rdquo;
            </blockquote>
            <p className="text-white/70 mb-6">One elegant dining area serving authentic Nigerian cuisine with a fine-dining twist — plus three tropical bar sections: the Indoor Bar, Poolside Bar, and Roof Top Bar, each with its own character and Warri's best views.</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/dining" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">Explore Dining</Link>
              <Link to="/dining#reservations" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">Reserve a Table</Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 lg:py-24 bg-surface" aria-labelledby="location-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="eyebrow">Find Us</span>
              <h2 id="location-heading" className="section-title">Our Location</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
              <p className="section-subtitle mx-auto">1 Justice Mosheshe Close, Off Aziza Road, Effurun/Sapele Road, Effurun, Delta, Nigeria</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="w-full h-[420px] rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=JQ9H%2BJM%20Oharhe&t=k&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Beechnut Hotel Location on Google Maps"
                aria-label="Google Maps satellite view showing Beechnut Hotel at 1 Justice Mosheshe Close, Effurun, Delta State"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-alt" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="eyebrow">Guest Stories</span>
              <h2 id="testimonials-heading" className="section-title">What Our Guests Say</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
            </div>
          </ScrollReveal>
          <TestimonialCarousel />
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 lg:py-24 bg-navy-950 text-center relative overflow-hidden"
        id="book"
        aria-labelledby="cta-heading"
      >
        <div className="absolute -top-2/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-gold-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              {[0, 1, 2].map(i => <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="w-2 h-2 bg-gold-400 shrink-0" />)}
            </div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-400 block mb-3"
          >
            Your Stay Awaits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            id="cta-heading"
            className="font-display text-4xl lg:text-5xl font-normal text-white leading-tight mb-3"
          >
            Experience Warri's Finest.<br />Book Your Stay Today.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/65 mb-8 max-w-lg mx-auto"
          >
            Flexible rates, special packages, and personalised service — every reservation is crafted just for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-3 justify-center flex-wrap mb-8"
          >
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">Reserve a Room</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">Speak to Us</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            {[
              { icon: 'shield', label: 'Best Rate Guaranteed' },
              { icon: 'check', label: 'Free Cancellation Available' },
              { icon: 'phone', label: '24 / 7 Reservations' },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs tracking-wider text-white/45">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {icon === 'check' && <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>}
                  {icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 .99h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />}
                </svg>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
