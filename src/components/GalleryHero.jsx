import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY_FOLDER_IMAGES } from '../data/galleryImages'

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function GalleryHero() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (GALLERY_FOLDER_IMAGES.length < 2) return
    const t = setInterval(() => setSlideIndex(i => (i + 1) % GALLERY_FOLDER_IMAGES.length), 4500)
    return () => clearInterval(t)
  }, [GALLERY_FOLDER_IMAGES.length])

  return (
    <section className="relative h-[60vh] min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="Gallery at Beechnut Hotel Effurun">
      <div className="absolute inset-0">
        {GALLERY_FOLDER_IMAGES.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={slideIndex}
              src={GALLERY_FOLDER_IMAGES[slideIndex]}
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
        <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">Gallery</h1>
      </motion.div>
    </section>
  )
}
