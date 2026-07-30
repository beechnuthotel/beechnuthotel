import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.1, borderColor: '#d4a22a', boxShadow: '0 0 24px rgba(212,162,42,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[96px] right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-gold-400/70 bg-navy-950/90 backdrop-blur-md text-gold-400 text-xl leading-none cursor-pointer shadow-lg"
        >
          <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M18 15l-6-6-6 6" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
