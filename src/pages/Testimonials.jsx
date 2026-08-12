import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import { EXTERIOR_IMAGES } from '../data/exteriorImages'
import { TESTIMONIALS_WITH_IMAGES } from '../data/testimonials'

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const VIDEO_SLOT_COUNT = 3

function Star({ filled }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-4 h-4 ${filled ? 'text-gold-400 fill-current' : 'text-gray-300 fill-current'}`} aria-hidden="true">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.1l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  )
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => <Star key={i} filled={i < rating} />)}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1C3.2 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.2C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.4l4.1-3.1z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4.1 3.1C6.2 6.8 8.9 4.7 12 4.7z" />
    </svg>
  )
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (EXTERIOR_IMAGES.length < 2) return
    const t = setInterval(() => setSlideIndex(i => (i + 1) % EXTERIOR_IMAGES.length), 4500)
    return () => clearInterval(t)
  }, [EXTERIOR_IMAGES.length])

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="Testimonials at Beechnut Hotel Effurun">
        <div className="absolute inset-0">
          {EXTERIOR_IMAGES.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIndex}
                src={EXTERIOR_IMAGES[slideIndex]}
                alt=""
                width="1920"
                height="1080"
                fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
                variants={heroBgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/45 to-navy-950/75" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Testimonials
          </h1>
        </motion.div>
      </section>

      <section className="bg-navy-950 border-t border-navy-800" aria-label="Overall rating summary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="font-display text-5xl font-bold text-gold-400 leading-none">4.8</span>
            <div className="flex flex-col gap-1">
              <Stars rating={5} />
              <p className="text-xs text-white/60">Overall rating based on Google reviews</p>
            </div>
            <div className="w-px h-10 bg-white/15 hidden sm:block" />
            <p className="text-sm text-white/80">
              <span className="font-bold text-white">9 reviews</span> from our guests
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-label="Guest reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Guest Reviews</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
                Stories From Our <em className="text-gold-500 not-italic">Guests</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">Real words from real guests — collected straight from our Google listing.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS_WITH_IMAGES.map((t, i) => (
              <ScrollReveal key={t.slug} delay={0.05 * i}>
                <article className="bg-white rounded-lg border border-navy-900/10 shadow-sm p-6 flex flex-col h-full relative">
                  {t.isNew && (
                    <span className="absolute top-4 right-4 text-[0.6rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold-400 text-navy-900">
                      New
                    </span>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    {t.image ? (
                  <img
                    src={t.image}
                    alt={`${t.name} — guest photo`}
                    width="96"
                    height="96"
                    className="w-12 h-12 rounded-full object-cover border border-navy-900/10"
                    loading="lazy"
                  />
                    ) : (
                      <span className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 font-display font-bold text-base flex items-center justify-center" aria-hidden="true">
                        {initialsOf(t.name)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-900 truncate">{t.name}</h3>
                      <p className="text-xs text-gray-500">{t.date}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Stars rating={t.rating} />
                  </div>
                  {t.text ? (
                    <p className="text-navy-900/70 leading-relaxed mb-4 flex-1">{t.text}</p>
                  ) : (
                    <p className="text-gray-400 italic leading-relaxed mb-4 flex-1">Full review text coming soon.</p>
                  )}
                  {(t.tripType || t.travelGroup || t.highlights?.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {t.tripType && (
                        <span className="text-[0.65rem] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-navy-900/5 text-navy-800 border border-navy-900/10">
                          {t.tripType}
                        </span>
                      )}
                      {t.travelGroup && (
                        <span className="text-[0.65rem] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-navy-900/5 text-navy-800 border border-navy-900/10">
                          {t.travelGroup}
                        </span>
                      )}
                      {t.highlights?.map(h => (
                        <span key={h} className="text-[0.65rem] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-gold-400/10 text-gold-600 border border-gold-400/30">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto pt-3 border-t border-navy-900/5">
                    <GoogleIcon />
                    <span>via {t.source}</span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface" aria-label="Video testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Video Testimonials</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
                Hear From Our <em className="text-gold-500 not-italic">Guests</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">Watch our guests share their Beechnut experience in their own words.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: VIDEO_SLOT_COUNT }, (_, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="relative aspect-video rounded-lg border-2 border-dashed border-navy-900/15 bg-white/60 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="w-14 h-14 rounded-full bg-navy-900/5 border border-navy-900/10 flex items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-navy-900/30 fill-current" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium text-gray-500">Video coming soon</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            We&rsquo;re gathering video stories from our guests — check back soon.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-label="Book your stay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-lg p-8 lg:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gold-400/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">Experience It Yourself</h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                  Words only say so much — come and create your own Beechnut story. Your comfort, our promise.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
                    Book Now
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
