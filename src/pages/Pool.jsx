import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import { POOL_IMAGES } from '../data/poolImages'

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Pool() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (POOL_IMAGES.length < 2) return
    const t = setInterval(() => setSlideIndex(i => (i + 1) % POOL_IMAGES.length), 4500)
    return () => clearInterval(t)
  }, [POOL_IMAGES.length])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % POOL_IMAGES.length)
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + POOL_IMAGES.length) % POOL_IMAGES.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="Swimming Pool at Beechnut Hotel Effurun">
        <div className="absolute inset-0">
          {POOL_IMAGES.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIndex}
                src={POOL_IMAGES[slideIndex]}
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
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/45 to-navy-950/75" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">Pool</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Pool</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Swimming Pool</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
                Dive Into <em className="text-gold-500 not-italic">Relaxation</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">A temperature-controlled infinity pool surrounded by loungers and lush tropical landscaping. Open daily from 6am to 8pm.</p>
            </div>
          </ScrollReveal>

          {POOL_IMAGES.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {POOL_IMAGES.map((img, i) => (
                <ScrollReveal key={img} delay={0.05 * i}>
                  <motion.button
                    onClick={() => setLightbox(i)}
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative overflow-hidden rounded-lg aspect-[16/10] group bg-navy-950 w-full block cursor-zoom-in"
                    aria-label={`Swimming Pool photo ${i + 1} of ${POOL_IMAGES.length} — enlarge`}
                  >
                    <img
                      src={img}
                      alt={`Swimming Pool — photo ${i + 1} of ${POOL_IMAGES.length}`}
                      width="1600"
                      height="1000"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute bottom-3 left-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-[0.65rem] font-medium tracking-wider uppercase text-white/80">
                      Photo {i + 1} of {POOL_IMAGES.length}
                    </span>
                    <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 rounded-full bg-navy-950/60 text-white" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                    </span>
                  </motion.button>
                </ScrollReveal>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 py-12">No pool photos available yet.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && POOL_IMAGES.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Swimming Pool photo ${lightbox + 1} of ${POOL_IMAGES.length}`}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-900 transition-colors" onClick={() => setLightbox(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <button
              className="absolute left-3 lg:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-900 transition-colors"
              onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + POOL_IMAGES.length) % POOL_IMAGES.length) }}
              aria-label="Previous photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <figure className="max-h-[85vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  src={POOL_IMAGES[lightbox]}
                  alt={`Swimming Pool — photo ${lightbox + 1} of ${POOL_IMAGES.length}`}
                  width="1920"
                  height="1080"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                />
              </AnimatePresence>
              <figcaption className="text-center text-sm text-white/70 mt-4">
                Swimming Pool — Photo {lightbox + 1} of {POOL_IMAGES.length}
              </figcaption>
            </figure>
            <button
              className="absolute right-3 lg:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-900 transition-colors"
              onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % POOL_IMAGES.length) }}
              aria-label="Next photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
