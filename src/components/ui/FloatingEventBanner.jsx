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

  if (!EVENT_BANNER.enabled || isExpired()) return null

  const { event, cta } = EVENT_BANNER

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
          className="fixed z-[70] bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[380px] select-none"
          aria-label="UNIFYSAP H3 Mega Weekend event banner"
          role="complementary"
          style={{ position: 'fixed' }}
        >
          <div className={isDragging ? '' : 'animate-zigzag-slow'} style={{ willChange: 'transform' }}>
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
                </motion.button>
              ) : (
                <motion.div
                  key="card"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(5,10,36,0.26),0_4px_16px_rgba(0,0,0,0.12)] border border-white/20 bg-black"
                >
                  {/* Close / Minimize — minimal chrome, no writup */}
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                    <button
                      onClick={() => setCollapsed(true)}
                      className="w-8 h-8 rounded-full bg-black/55 backdrop-blur hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
                      aria-label="Minimize banner"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="w-8 h-8 rounded-full bg-black/55 backdrop-blur hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
                      aria-label="Close banner"
                      title="Close for 24 hours"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>

                  {/* Image alone — bold, no text overlay */}
                  <Link to={cta.link} aria-label="View event details">
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      width="800"
                      height="1000"
                      className="w-full h-auto max-h-[min(78vh,520px)] object-contain block bg-white"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
