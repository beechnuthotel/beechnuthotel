import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!EVENT_BANNER.enabled) return
    if (isExpired()) return
    if (isDismissed()) return
    // delay entrance slightly so it doesn't compete with hero
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  // Zigzag drift: manual rAF for buttery performance, pauses on hover/drag
  useEffect(() => {
    if (!visible || collapsed || isHovered) return
    let start = performance.now()
    const tick = (now) => {
      const t = (now - start) / 1000
      // zigzag path — horizontal + vertical with different frequencies
      const zx = Math.sin(t * 0.9) * 10 + Math.sin(t * 1.7) * 6
      const zy = Math.cos(t * 0.7) * 8 + Math.sin(t * 1.3) * 5
      x.set(zx)
      y.set(zy)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible, collapsed, isHovered, x, y])

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify({ at: Date.now() }))
    } catch {}
    setVisible(false)
  }

  const handleCloseTillExpiry = () => {
    // dismiss until expiry (by setting far future)
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
          style={{ x, y }}
          drag
          dragMomentum={false}
          dragElastic={0.12}
          dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onDragStart={() => setIsHovered(true)}
          onDragEnd={() => setIsHovered(false)}
          className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[380px] select-none"
          aria-label="UNIFYSAP H3 Mega Weekend event banner"
          role="complementary"
        >
          {/* collapsed pill */}
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
                className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(5,10,36,0.22),0_4px_16px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col max-h-[min(82vh,560px)]"
              >
                {/* subtle gold sheen */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" aria-hidden="true" />
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold-400/10 blur-2xl pointer-events-none" aria-hidden="true" />

                {/* Header */}
                <div className="relative bg-navy-900 text-white px-4 pt-3.5 pb-3 flex items-start justify-between gap-3">
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
                    <h3 className="font-display text-[13px] sm:text-[14px] font-bold leading-tight tracking-tight text-white line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-[11px] leading-tight text-white/65 mt-0.5 line-clamp-1">{event.subtitle}</p>
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
                  {/* Event visual placeholder */}
                  <div className="relative h-28 sm:h-32 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      width="760"
                      height="260"
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                      loading="eager"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    {/* fallback gradient text if image missing */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                      <span className="font-display text-white/90 text-xs font-bold tracking-widest uppercase">Hosted at Beechnut Hotel Effurun</span>
                      <span className="font-display text-gold-300 text-lg font-bold leading-none mt-1">Boat Cruise • Handover • Beer Stop</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-semibold tracking-widest uppercase text-white/80 bg-navy-900/60 backdrop-blur px-2 py-1 rounded-full border border-white/10">
                      {event.venue} • {event.dateLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    {/* Highlights */}
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-600 mb-2 flex items-center gap-1.5">
                      <span className="w-6 h-px bg-gold-400" aria-hidden="true" />
                      Weekend Highlights
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5 mb-4">
                      {event.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[12.5px] leading-snug text-navy-900/80">
                          <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
                          <span className="font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Grill section */}
                    <div className="rounded-xl overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
                      <div className="flex gap-3 p-3">
                        <div className="w-[88px] h-[88px] rounded-lg overflow-hidden bg-navy-900 shrink-0 relative">
                          <img
                            src={grill.image}
                            alt="Tasty grills — shawarma, catfish barbeque, ise-ewu"
                            width="176"
                            height="176"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-orange-600/20">
                            <span className="text-[20px]" aria-hidden="true">🔥</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500 text-white">{grill.badge}</span>
                            <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-700">Seat-Out</span>
                          </div>
                          <h4 className="font-display text-[13px] font-bold text-navy-900 leading-tight">{grill.title}</h4>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {grill.items.map((it) => (
                              <span key={it} className="text-[11px] font-semibold px-2 py-1 rounded-full bg-white border border-amber-200 text-navy-800 shadow-sm">
                                {it}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] leading-snug text-amber-800/70 mt-1.5">{grill.note}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-3 pt-2 border-t border-gray-100 bg-gray-50/70 flex gap-2">
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
                <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] tracking-wide text-gray-400 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Drag to move • Hover to pause zigzag
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
