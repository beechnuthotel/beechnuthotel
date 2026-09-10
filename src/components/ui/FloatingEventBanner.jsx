import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENT_BANNER } from '../../data/eventBanner'

const DISMISS_KEY = EVENT_BANNER.storageKey

function isExpired() {
  if (!EVENT_BANNER.expiryDate) return false
  return new Date() > new Date(EVENT_BANNER.expiryDate)
}

function isDismissed() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const { at } = JSON.parse(raw)
    const hours = EVENT_BANNER.dismissHours ?? 24
    return Date.now() - at < hours * 3600 * 1000
  } catch {
    return false
  }
}

export default function FloatingEventBanner() {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!EVENT_BANNER.enabled) return
    if (isExpired()) return
    if (isDismissed()) return
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify({ at: Date.now() }))
    } catch {}
    setVisible(false)
  }

  const handleCloseTillExpiry = () => {
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify({ at: Date.now() + 365 * 24 * 3600 * 1000 }))
    } catch {}
    setVisible(false)
  }

  if (!EVENT_BANNER.enabled || isExpired()) return null

  const { event, grill, cta } = EVENT_BANNER

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.25 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          drag
          dragMomentum={false}
          dragElastic={0.14}
          dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="fixed z-[70] bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[400px] select-none"
          aria-label="UNIFYSAP H3 Mega Weekend event banner"
          role="complementary"
          style={{ position: 'fixed' }}
        >
          {/* zigzag wrapper — pauses while dragging */}
          <div className={isDragging ? '' : 'animate-zigzag-strong'} style={{ willChange: 'transform' }}>
            <AnimatePresence mode="wait">
              {collapsed ? (
                <motion.button
                  key="pill"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => setCollapsed(false)}
                  className="ml-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-navy-900 text-white shadow-[0_12px_40px_rgba(5,10,36,0.35)] border border-gold-400/20 hover:bg-navy-800 transition-colors cursor-pointer"
                  aria-label="Expand event banner"
                >
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
                  <span className="text-xs font-bold tracking-widest uppercase">UNIFYSAP Weekend</span>
                  <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-gold-400 text-navy-900">11–13 Sept</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
                </motion.button>
              ) : (
                <motion.div
                  key="card"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(5,10,36,0.24),0_4px_16px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col max-h-[min(86vh,640px)]"
                >
                  {/* top navy header */}
                  <div className="relative bg-navy-900 text-white px-4 pt-3.5 pb-3 flex items-start justify-between gap-3 shrink-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-gold-400 text-navy-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-navy-900 animate-pulse" aria-hidden="true" />
                          {event.badge}
                        </span>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-300 border border-gold-400/30 rounded-full px-2 py-0.5 whitespace-nowrap">
                          {event.dateLabel}
                        </span>
                      </div>
                      <h3 className="font-display text-[13px] sm:text-[14px] font-bold leading-tight tracking-tight text-white">
                        {event.title}
                      </h3>
                      <p className="text-[11px] leading-tight text-white/60 mt-0.5">{event.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setCollapsed(true)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Minimize banner"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                      </button>
                      <button
                        onClick={handleDismiss}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close banner for 24 hours"
                        title="Close for 24 hours"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Scrollable body */}
                  <div className="overflow-y-auto overscroll-contain flex-1 min-h-0">
                    {/* === DISTINCT EVENT IMAGE — BOLD === */}
                    <div className="relative bg-gray-100">
                      <div className="relative h-[210px] sm:h-[220px] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.imageAlt}
                          width="800"
                          height="440"
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          loading="eager"
                          decoding="async"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                        {/* no centre text overlay — image is bold and clean */}
                        {/* top-left badge */}
                        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-navy-900/85 backdrop-blur text-white border border-white/20 shadow">
                          {event.venue}
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold-400 text-navy-900 shadow">
                          11–13 SEPT 2026
                        </span>
                      </div>
                      {/* caption bar directly under image — not over image */}
                      <div className="px-3 py-2 bg-navy-900 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold tracking-widest uppercase text-gold-300">UNIFYSAP H3 MEGA WEEKEND</span>
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 whitespace-nowrap">Beechnut Hotel • Effurun</span>
                      </div>
                    </div>

                    <div className="p-4 pb-3">
                      {/* Highlights */}
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-600 mb-2.5 flex items-center gap-1.5">
                        <span className="w-6 h-px bg-gold-400" aria-hidden="true" />
                        Weekend Highlights
                      </p>
                      <ul className="grid grid-cols-1 gap-1.5 mb-4">
                        {event.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[12.5px] leading-snug text-navy-900/80">
                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
                            <span className="font-medium">{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* === DISTINCT GRILL IMAGE — BOLD SEPARATE CARD === */}
                      <div className="rounded-xl overflow-hidden border-2 border-amber-300 shadow-sm bg-white">
                        <div className="relative h-[170px] sm:h-[180px] overflow-hidden bg-amber-50">
                          <img
                            src={grill.image}
                            alt="Tasty grills — shawarma, catfish barbeque, ise-ewu — live at Beechnut Hotel"
                            width="800"
                            height="360"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                          {/* grill title overlay at bottom — does not obscure centre */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-8 pb-2.5 px-3">
                            <h4 className="font-display text-sm font-bold text-white leading-tight drop-shadow">
                              {grill.title}
                            </h4>
                            <p className="text-[11px] font-semibold tracking-wide text-amber-200">Seat-Out • Live Station</p>
                          </div>
                          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-amber-500 text-white shadow border border-white/20">
                            {grill.badge} 🔥
                          </span>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {grill.items.map((it) => (
                              <span key={it} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-amber-200 text-navy-900 shadow-sm">
                                {it}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] leading-snug text-amber-800/70 font-medium">{grill.note}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-3 pt-2.5 border-t border-gray-100 bg-gray-50/80 flex gap-2 shrink-0">
                    <Link
                      to={cta.link}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg bg-gold-400 text-navy-900 hover:bg-gold-600 transition-colors shadow-sm"
                    >
                      {cta.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <Link
                      to={cta.secondaryLink}
                      className="inline-flex items-center justify-center px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors bg-white"
                    >
                      {cta.secondaryLabel}
                    </Link>
                  </div>

                  {/* footer hint */}
                  <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2 shrink-0">
                    <span className="text-[10px] tracking-wide text-gray-400 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {isDragging ? 'Dragging…' : 'Zigzag floating • Drag to move'}
                    </span>
                    <button
                      onClick={handleCloseTillExpiry}
                      className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 hover:text-navy-700 transition-colors cursor-pointer underline underline-offset-2 decoration-dotted"
                    >
                      Don't show again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
