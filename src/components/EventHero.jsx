import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENT_IMAGES } from '../data/eventImages'

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function EventHero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const images = EVENT_IMAGES

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % images.length), 4200)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <section className="relative h-[62vh] min-h-[460px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="UNIFYSAP H3 Mega 8-in-1 Weekend at Beechnut Hotel">
      <div className="absolute inset-0">
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={images[slideIndex]}
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
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-800 to-navy-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/45 to-navy-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,162,42,0.08)_0%,_transparent_65%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 px-4 max-w-4xl"
      >
        <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">11 — 13 September 2026 • Beechnut Hotel Effurun</span>
        <h1 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold text-white leading-[0.95] mb-3">
          UNIFYSAP H3 <em className="italic text-gold-400 not-italic">Mega</em> 8-in-1 Weekend
        </h1>
        <p className="text-sm sm:text-base tracking-wide text-white/70 max-w-2xl mx-auto">
          Unity Hash House Harriers × Friday Girls H3 × Sapele H3 — Boat Cruise 5.0, Handovers, Ogogoro Festival & more. Live from Beechnut Hotel Effurun.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-gold-400 text-navy-900">
            <span className="w-2 h-2 rounded-full bg-navy-900 animate-pulse" aria-hidden="true" /> Live Now — Day 1: Boat Cruise 5.0
          </span>
          <span className="inline-flex items-center text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white border border-white/15">
            Tasty Grills Seat-Out • Shawarma • Catfish • Ise-Ewu
          </span>
        </div>
      </motion.div>
    </section>
  )
}
