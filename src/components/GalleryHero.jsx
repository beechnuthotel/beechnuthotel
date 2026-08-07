import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY_IMAGES } from '../data/galleryImages'

const BG_SLOT_COUNT = 5
const SWAP_MS = 3500

const BG_POSITIONS = [
  { left: '3%', top: '12%', width: 'w-[17vw]', height: 'h-[22vh]', rotate: -6 },
  { right: '5%', top: '9%', width: 'w-[15vw]', height: 'h-[20vh]', rotate: 5 },
  { left: '6%', bottom: '9%', width: 'w-[16vw]', height: 'h-[21vh]', rotate: 4 },
  { right: '4%', bottom: '7%', width: 'w-[18vw]', height: 'h-[23vh]', rotate: -5 },
  { left: '36%', top: '5%', width: 'w-[11vw]', height: 'h-[15vh]', rotate: 2 },
]

const DRIFT_VARIANTS = [
  { y: [0, 12, 0], rotate: [0, 2.5, 0], transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, -10, 0], rotate: [0, -2, 0], transition: { duration: 19, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, 14, 0], rotate: [0, -3, 0], transition: { duration: 14, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, -12, 0], rotate: [0, 2, 0], transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, 9, 0], rotate: [0, 3.5, 0], transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' } },
]

export default function GalleryHero() {
  const total = GALLERY_IMAGES.length
  const slotCount = Math.min(BG_SLOT_COUNT, Math.max(0, total - 1))

  const [stage, setStage] = useState(() => ({
    cursor: 0,
    bg: Array.from({ length: slotCount }, (_, i) => (total - 1 - i) % total),
  }))

  useEffect(() => {
    if (total < 2) return
    const t = setInterval(() => {
      setStage(s => {
        const cursor = (s.cursor + 1) % total
        return { cursor, bg: [...s.bg.slice(1), s.cursor] }
      })
    }, SWAP_MS)
    return () => clearInterval(t)
  }, [total])

  if (total === 0) {
    return (
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="Gallery at Beechnut Hotel Effurun">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-800 to-navy-950" />
        <div className="relative z-10 px-4">
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">Gallery</h1>
        </div>
      </section>
    )
  }

  const spotlight = GALLERY_IMAGES[stage.cursor]

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-navy-950" aria-label="Gallery at Beechnut Hotel Effurun">
      {stage.bg.map((idx, slot) => {
        const pos = BG_POSITIONS[slot]
        const img = GALLERY_IMAGES[idx]
        return (
          <motion.div
            key={slot}
            animate={DRIFT_VARIANTS[slot % DRIFT_VARIANTS.length]}
            className={`absolute ${pos.width} ${pos.height} hidden sm:block`}
            style={{ left: pos.left, right: pos.right, top: pos.top, bottom: pos.bottom, rotate: pos.rotate, zIndex: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={img.src}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="w-full h-full object-cover rounded-lg border border-white/15 grayscale-[0.35] opacity-40"
                loading="lazy"
              />
            </AnimatePresence>
          </motion.div>
        )
      })}

      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(6,16,35,0.15)_0%,rgba(6,16,35,0.65)_100%)]" />

      <div className="relative z-[3] w-[min(46vw,620px)] max-w-[92vw] aspect-[4/3]">
        <AnimatePresence mode="wait">
          <motion.img
            key={stage.cursor}
            src={spotlight.src}
            alt={spotlight.category.replace('-', ' ')}
            fetchPriority={stage.cursor === 0 ? 'high' : 'auto'}
            initial={{ opacity: 0, scale: 1.08, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -18 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full object-cover rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] border border-white/10"
          />
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-x-0 top-0 z-[4] pt-24 lg:pt-28 px-4 text-center bg-gradient-to-b from-navy-950/85 via-navy-950/40 to-transparent pb-16"
      >
        <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
        <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">Gallery</h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
          <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
          <span className="text-gold-400/60">›</span>
          <span className="text-gold-400 font-medium">Gallery</span>
        </nav>
      </motion.div>
    </section>
  )
}
