import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import EventHero from '../components/EventHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import { EVENT_IMAGES, EVENT_BY_DAY, EVENT_GALLERY_ITEMS } from '../data/eventImages'
import { EVENT_BANNER } from '../data/eventBanner'

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

function MotionEventGallery() {
  const [stage, setStage] = useState(() => ({
    cursor: 0,
    bg: Array.from({ length: Math.min(BG_SLOT_COUNT, Math.max(0, EVENT_IMAGES.length - 1)) }, (_, i) => (EVENT_IMAGES.length - 1 - i) % EVENT_IMAGES.length),
  }))

  // simple interval without effect dependency on EVENT_IMAGES length change after initial
  // we use a manual interval that updates stage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useState(() => {
    if (EVENT_IMAGES.length < 2) return
    const t = setInterval(() => {
      setStage((s) => {
        const cursor = (s.cursor + 1) % EVENT_IMAGES.length
        return { cursor, bg: [...s.bg.slice(1), s.cursor] }
      })
    }, SWAP_MS)
    return () => clearInterval(t)
  })

  if (EVENT_IMAGES.length === 0) {
    return (
      <section className="py-20 bg-white border-t border-navy-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No event photos yet — Day 1 Boat Cruise photos will appear here once uploaded.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 lg:py-12 bg-white border-y border-navy-900/10" aria-label="Event motion gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[62vh] min-h-[460px] overflow-hidden rounded-2xl bg-navy-50 border border-navy-900/10">
          {stage.bg.map((idx, slot) => {
            const pos = BG_POSITIONS[slot]
            if (pos == null) return null
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
                    src={EVENT_IMAGES[idx]}
                    alt=""
                    width="640"
                    height="480"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="w-full h-full object-cover rounded-lg border border-navy-900/20 grayscale-[0.25] opacity-45"
                    loading="lazy"
                  />
                </AnimatePresence>
              </motion.div>
            )
          })}

          <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(6,16,35,0.04)_0%,rgba(6,16,35,0.16)_100%)]" />

          <div className="absolute inset-0 z-[3] flex items-center justify-center p-4">
            <div className="w-full aspect-[4/3] sm:w-[min(46vw,620px)] sm:max-w-[90%]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={stage.cursor}
                  src={EVENT_IMAGES[stage.cursor]}
                  alt="UNIFYSAP Mega Weekend — Beechnut Hotel"
                  width="1200"
                  height="900"
                  initial={{ opacity: 0, scale: 1.08, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -18 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full h-full object-cover rounded-xl shadow-[0_30px_80px_rgba(6,16,35,0.35)] border border-navy-900/10"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="text-center text-xs tracking-widest uppercase text-gray-400 mt-3">Motion showcase — tap any image below for full view</p>
      </div>
    </section>
  )
}

function Lightbox({ src, onClose }) {
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center border border-white/15 transition-colors"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <motion.img
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        src={src}
        alt="Event photo enlarged"
        width="1600"
        height="1200"
        className="max-w-[min(92vw,1100px)] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )
}

export default function Event() {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const hasAssets = EVENT_GALLERY_ITEMS.length > 0
  const day1Count = EVENT_BY_DAY[0]?.images.length ?? 0

  return (
    <>
      <EventHero />

      {/* quick nav / breadcrumb */}
      <div className="bg-navy-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-gold-400 font-semibold tracking-wider uppercase">UNIFYSAP Weekend</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a href="#welcome" className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors border border-white/10">Welcome</a>
            <a href="#circle" className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors border border-white/10">Circle</a>
            <a href="#cultural" className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors border border-white/10">Cultural</a>
            <a href="#boat-cruise" className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors border border-white/10">Boat Cruise</a>
            <Link to="/booking" className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-gold-400 text-navy-900 hover:bg-gold-600 transition-colors">Reserve Room</Link>
          </div>
        </div>
      </div>

      {/* Motion gallery hero */}
      <MotionEventGallery />

      {/* Story / Highlights — same format as Facilities/About */}
      <section id="highlights" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Live at Beechnut • 11 — 13 Sept 2026</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">A Weekend <em className="text-gold-500 not-italic">8-in-1</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">
                From today&apos;s Boat Cruise 5.0 on the water to handovers, anniversaries and the Ogogoro Festival — everything happens under one roof at Beechnut Hotel Effurun. This page updates live as photos arrive.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {[
              { k: 'Boat Cruise 5.0', d: 'Day 1 — Today', desc: 'Unity H3 on the water. More Beer Stop included.' },
              { k: 'Handover & Anniversary', d: 'Day 1-2', desc: 'Unity H3 5th Anniversary & Handover ceremonies.' },
              { k: 'Collabo Night Galore', d: 'Night', desc: 'Hash family collabo — Friday Girls & Sapele H3.' },
              { k: 'More Beer Stop', d: 'All Days', desc: 'Hydration stations throughout the weekend.' },
              { k: 'Friday Girls Handover', d: 'Weekend', desc: 'Friday Girls Hash House Harriers handover.' },
              { k: 'Ogogoro 3.0 Festival', d: 'Day 3', desc: 'The spirit festival — taste, culture, celebration.' },
              { k: 'Sapele H3 Handover', d: 'Day 3', desc: 'Sapele Hash House Harriers handover closing.' },
              { k: 'Tasty Grills Seat-Out', d: 'All Days', desc: 'Shawarma • Catfish Barbeque • Ise-Ewu — poolside & lounge.' },
            ].map((h, i) => (
              <ScrollReveal key={h.k} delay={0.04 * i}>
                <div className="bg-surface border border-gray-100 rounded-lg p-5 h-full">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gold-500">{h.d}</span>
                  <h3 className="font-display text-base font-bold text-navy-900 mt-1 mb-1">{h.k}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-lg p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Follow the weekend live</h3>
                <p className="text-sm text-white/60 mt-1">New photos added after each cruise / ceremony. Refresh for Day 1 Boat Cruise drop.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href="#boat-cruise" className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-colors">View Day 1 Photos</a>
                <Link to="/gallery" className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-sm border border-white/20 text-white hover:bg-white hover:text-navy-900 transition-colors">All Galleries</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Welcoming Ceremony — FIRST SET */}
      <section id="welcome" className="py-16 lg:py-20 bg-surface border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Day 1 • 11 Sept 2026 — First Set</span>
                <h2 className="font-display text-3xl font-bold text-navy-900">Welcoming Ceremony</h2>
                <div className="w-12 h-0.5 bg-gold-400 mt-3" />
              </div>
              <p className="text-sm text-gray-500 max-w-lg lg:text-right">
                {EVENT_BY_DAY.find(s => s.id === 'welcome')?.images.length
                  ? `${EVENT_BY_DAY.find(s => s.id === 'welcome')?.images.length} photos — arrivals & opening at Beechnut. Tap to enlarge.`
                  : 'Upload to src/assets/event/unifysap/welcome/ — will appear here + in hero.'}
              </p>
            </div>
          </ScrollReveal>
          {(() => {
            const sec = EVENT_BY_DAY.find(s => s.id === 'welcome')
            const imgs = sec?.images ?? []
            if (imgs.length === 0) {
              return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                  <p className="text-sm text-gray-500">Welcoming Ceremony photos ready — drop webp/jpg into <code className="px-1.5 py-0.5 rounded bg-gray-100 text-navy-900 text-xs">src/assets/event/unifysap/welcome/</code> (e.g. <code className="text-xs">welcome-01.webp</code>). They auto-show here.</p>
                  <div className="mt-4 max-w-xs mx-auto rounded-xl overflow-hidden border border-gray-200"><img src={EVENT_BANNER.event.image} alt="" className="w-full h-auto block" loading="lazy" /></div>
                </div>
              )
            }
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {imgs.map((src, i) => (
                  <ScrollReveal key={`${src}-${i}`} delay={(i % 8) * 0.04}>
                    <motion.button onClick={() => setLightboxSrc(src)} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 w-full text-left" whileHover={{ y: -2 }} aria-label="Enlarge photo">
                      <img src={src} alt="" width="800" height="600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* Circle — FIRST SET */}
      <section id="circle" className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Day 1 • Circle</span>
                <h2 className="font-display text-3xl font-bold text-navy-900">Circle</h2>
                <div className="w-12 h-0.5 bg-gold-400 mt-3" />
              </div>
              <p className="text-sm text-gray-500 max-w-lg lg:text-right">
                {EVENT_BY_DAY.find(s => s.id === 'circle')?.images.length
                  ? `${EVENT_BY_DAY.find(s => s.id === 'circle')?.images.length} photos — the Hash circle. Tap to enlarge.`
                  : 'Upload to src/assets/event/unifysap/circle/ — will appear here + in hero.'}
              </p>
            </div>
          </ScrollReveal>
          {(() => {
            const sec = EVENT_BY_DAY.find(s => s.id === 'circle')
            const imgs = sec?.images ?? []
            if (imgs.length === 0) {
              return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-surface p-8 text-center">
                  <p className="text-sm text-gray-500">Circle photos ready — drop webp/jpg into <code className="px-1.5 py-0.5 rounded bg-gray-100 text-navy-900 text-xs">src/assets/event/unifysap/circle/</code></p>
                </div>
              )
            }
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {imgs.map((src, i) => (
                  <ScrollReveal key={`${src}-${i}`} delay={(i % 8) * 0.04}>
                    <motion.button onClick={() => setLightboxSrc(src)} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 w-full text-left" whileHover={{ y: -2 }} aria-label="Enlarge photo">
                      <img src={src} alt="" width="800" height="600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* Cultural Display — SECOND SET (to be uploaded) */}
      <section id="cultural" className="py-16 lg:py-20 bg-surface border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Up Next • Cultural Display</span>
                <h2 className="font-display text-3xl font-bold text-navy-900">Cultural Display</h2>
                <div className="w-12 h-0.5 bg-gold-400 mt-3" />
              </div>
              <p className="text-sm text-gray-500 max-w-lg lg:text-right">
                {EVENT_BY_DAY.find(s => s.id === 'cultural')?.images.length
                  ? `${EVENT_BY_DAY.find(s => s.id === 'cultural')?.images.length} photos — heritage dancers. Tap to enlarge.`
                  : 'Second batch — upload to src/assets/event/unifysap/cultural/ when ready. Placeholder shown until then.'}
              </p>
            </div>
          </ScrollReveal>
          {(() => {
            const sec = EVENT_BY_DAY.find(s => s.id === 'cultural')
            const imgs = sec?.images ?? []
            if (imgs.length === 0) {
              return (
                <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
                  </div>
                  <h3 className="font-display text-base font-bold text-navy-900">Cultural Display — awaiting upload</h3>
                  <p className="text-sm text-amber-800/70 mt-1">Drop webp/jpg into <code className="px-1.5 py-0.5 rounded bg-white border border-amber-200 text-navy-900 text-xs">src/assets/event/unifysap/cultural/</code> (e.g. <code className="text-xs">cultural-01.webp</code>). Section auto-fills and appears in hero.</p>
                </div>
              )
            }
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {imgs.map((src, i) => (
                  <ScrollReveal key={`${src}-${i}`} delay={(i % 8) * 0.04}>
                    <motion.button onClick={() => setLightboxSrc(src)} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 w-full text-left" whileHover={{ y: -2 }} aria-label="Enlarge photo">
                      <img src={src} alt="" width="800" height="600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* Day 1 — Boat Cruise */}
      <section id="boat-cruise" className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Day 1 — Today • 11 Sept 2026</span>
                <h2 className="font-display text-3xl font-bold text-navy-900">Unity H3 Boat Cruise 5.0</h2>
                <div className="w-12 h-0.5 bg-gold-400 mt-3" />
              </div>
              <p className="text-sm text-gray-500 max-w-lg lg:text-right">
                {day1Count > 0
                  ? `${day1Count} photos from the cruise — tap to enlarge. More uploads incoming throughout today.`
                  : 'Boat Cruise photos are being uploaded now — this grid will fill as soon as Day 1 images land in src/assets/event/unifysap/day1/ .'}
              </p>
            </div>
          </ScrollReveal>

          {hasAssets ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {EVENT_GALLERY_ITEMS.map((item, i) => (
                <ScrollReveal key={`${item.src}-${i}`} delay={(i % 8) * 0.04}>
                  <motion.button
                    onClick={() => setLightboxSrc(item.src)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 w-full text-left"
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    aria-label="Enlarge event photo"
                  >
                    <img src={item.src} alt="" width="800" height="600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur text-navy-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                    </span>
                  </motion.button>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy-900">Day 1 photos incoming</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-lg mx-auto">
                Drop Boat Cruise images into <code className="px-1.5 py-0.5 rounded bg-gray-100 text-navy-900 text-xs">src/assets/event/unifysap/day1/</code> (webp/jpg) — they&apos;ll auto-appear here and in the hero motion gallery. Or add public paths to <code className="px-1 py-0.5 rounded bg-gray-100 text-navy-900 text-xs">src/data/eventImages.js:11</code> <code>EVENT_PUBLIC_IMAGES</code>.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-navy-900 text-white font-semibold tracking-wider uppercase">11–13 Sept 2026</span>
                <span className="text-xs px-3 py-1.5 rounded-full border border-gold-400 text-gold-600 font-semibold tracking-wider uppercase">Live at Beechnut</span>
              </div>
              {/* show poster as preview until real boat photos arrive */}
              <div className="mt-6 max-w-sm mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={EVENT_BANNER.event.image} alt={EVENT_BANNER.event.imageAlt} width="800" height="600" className="w-full h-auto block" loading="lazy" />
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-colors">
              Book for the Weekend
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors">
              Enquire
            </Link>
          </div>
        </div>
      </section>

      {/* Full venue / Grills tie-in */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border border-gray-100 bg-surface">
              <div className="p-6">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-500">Venue</span>
                <h3 className="font-display text-xl font-bold text-navy-900 mt-1">Beechnut Hotel Effurun</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">All 8 events hosted on-site — rooms, boat departure coordination, bars, and the Tasty Grills Seat-Out are steps apart.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {EVENT_BANNER.event.highlights.slice(0, 4).map((h) => (
                    <span key={h} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-navy-900">{h}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="p-6">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700">All Weekend</span>
                <h3 className="font-display text-xl font-bold text-navy-900 mt-1">{EVENT_BANNER.grill.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {EVENT_BANNER.grill.items.map((it) => (
                    <span key={it} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-amber-200 text-navy-900 shadow-sm">{it}</span>
                  ))}
                </div>
                <p className="text-sm text-amber-800/70 mt-3">{EVENT_BANNER.grill.note}</p>
                <Link to="/dining" className="inline-flex mt-4 text-xs font-bold tracking-wider uppercase text-amber-700 hover:text-amber-800 underline underline-offset-4">View Dining →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>{lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}</AnimatePresence>
    </>
  )
}
