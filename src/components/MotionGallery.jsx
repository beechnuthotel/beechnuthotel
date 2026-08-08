import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'
import { GALLERY_IMAGES } from '../data/galleryImages'

const BG_SLOT_COUNT = 5
const SWAP_MS = 3500

const BG_POSITIONS = [
  { left: '3%', top: '10%', width: 'w-[17vw]', height: 'h-[20vh]', rotate: -6 },
  { right: '5%', top: '8%', width: 'w-[15vw]', height: 'h-[19vh]', rotate: 5 },
  { left: '6%', bottom: '8%', width: 'w-[16vw]', height: 'h-[19vh]', rotate: 4 },
  { right: '4%', bottom: '6%', width: 'w-[18vw]', height: 'h-[21vh]', rotate: -5 },
  { left: '36%', top: '4%', width: 'w-[11vw]', height: 'h-[14vh]', rotate: 2 },
]

const DRIFT_VARIANTS = [
  { y: [0, 12, 0], rotate: [0, 2.5, 0], transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, -10, 0], rotate: [0, -2, 0], transition: { duration: 19, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, 14, 0], rotate: [0, -3, 0], transition: { duration: 14, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, -12, 0], rotate: [0, 2, 0], transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' } },
  { y: [0, 9, 0], rotate: [0, 3.5, 0], transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' } },
]

export default function MotionGallery() {
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

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-navy-900/10" aria-label="Beechnut Hotel gallery showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">The Collection</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
              Explore <em className="text-gold-500 not-italic">Beechnut</em>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">A moving showcase of our rooms, dining, and spaces — one moment at a time.</p>
          </div>
        </ScrollReveal>

        <div className="relative h-[65vh] min-h-[440px] overflow-hidden rounded-2xl bg-navy-50 border border-navy-900/10">
          {total === 0 ? (
            <p className="absolute inset-0 flex items-center justify-center text-gray-500">No gallery photos available yet.</p>
          ) : (
            <>
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
                        width="640"
                        height="480"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="w-full h-full object-cover rounded-lg border border-navy-900/20 grayscale-[0.35] opacity-40"
                        loading="lazy"
                      />
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(6,16,35,0.05)_0%,rgba(6,16,35,0.18)_100%)]" />

              <div className="absolute inset-0 z-[3] flex items-center justify-center">
                <div className="w-full aspect-[4/3] sm:w-[min(46vw,620px)] sm:max-w-[90%]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={stage.cursor}
                      src={GALLERY_IMAGES[stage.cursor].src}
                      alt={GALLERY_IMAGES[stage.cursor].category.replace('-', ' ')}
                      width="1200"
                      height="900"
                      fetchPriority={stage.cursor === 0 ? 'high' : 'auto'}
                      initial={{ opacity: 0, scale: 1.08, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -18 }}
                      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full h-full object-cover rounded-xl shadow-[0_30px_80px_rgba(6,16,35,0.35)] border border-navy-900/10"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
