import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StaffVideoCard({
  member,
  compact = false,
  short = false,
  autoplayOnView = false,
  showQuote = true,
  showTranscript = false,
  className = '',
}) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const { name, role, department, photo, poster, video, shortVideo, duration, quote, transcript } = member
  const src = short && shortVideo ? shortVideo : video

  useEffect(() => {
    if (!autoplayOnView || !videoRef.current) return
    const el = videoRef.current
    const start = () => {
      const attempt = el.play()
      if (attempt !== undefined) {
        attempt.catch(() => {
          el.muted = true
          el.play().catch(() => {})
        })
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else if (!el.paused) el.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [autoplayOnView, src])

  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white rounded-lg overflow-hidden shadow-sm border border-navy-900/5 ${compact ? '' : 'flex flex-col h-full'} ${className}`}
    >
      <div className="relative aspect-video bg-navy-950 overflow-hidden">
        {src ? (
          autoplayOnView || playing ? (
            <video
              ref={autoplayOnView ? videoRef : undefined}
              src={src}
              poster={poster || photo}
              controls
              autoPlay={playing}
              loop={autoplayOnView}
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <track kind="captions" label="English" srcLang="en" />
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label={`Play video: ${name}, ${role}`}
            >
              <img
                src={poster || photo}
                alt={`${name} — ${role} — video preview`}
                width="1600"
                height="1000"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/45 transition-colors duration-300" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              {duration && (
                <span className="absolute bottom-3 right-3 text-[0.65rem] font-semibold tracking-wider uppercase bg-navy-950/80 text-white/90 px-2 py-1 rounded-sm">
                  {duration}
                </span>
              )}
            </button>
          )
        ) : (
          <img
            src={poster || photo}
            alt={`${name} — ${role}`}
            width="1600"
            height="1000"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {compact ? (
        <div className="p-4 flex items-center gap-3">
          <img src={photo} alt={`${name} — ${role}`} width="96" height="96" loading="lazy" className="w-11 h-11 rounded-full object-cover border border-gold-400/40 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy-900 truncate">{name}</p>
            <p className="text-[0.65rem] tracking-widest uppercase text-gold-500 truncate">{role}</p>
          </div>
        </div>
      ) : (
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={photo} alt={`${name} — ${role}`} width="96" height="96" loading="lazy" className="w-12 h-12 rounded-full object-cover border border-gold-400/40 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-navy-900 truncate">{name}</h3>
                <p className="text-xs font-medium text-gray-500 truncate">{role}</p>
              </div>
            </div>
            <span className="text-[0.6rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-navy-900 text-gold-400 shrink-0">
              {department}
            </span>
          </div>
          {showQuote && quote && (
            <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-2">&ldquo;{quote}&rdquo;</p>
          )}
          {showTranscript && transcript && (
            <details className="mt-auto">
              <summary className="text-xs font-semibold tracking-wider uppercase text-gold-500 cursor-pointer select-none hover:text-gold-600 transition-colors">
                Read transcript
              </summary>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">{transcript}</p>
            </details>
          )}
        </div>
      )}
    </motion.article>
  )
}
