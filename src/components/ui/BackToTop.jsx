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
          whileHover={{ scale: 1.1, borderColor: '#d4a22a' }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[96px] right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-gold-400 bg-navy-950 text-gold-400 text-xl leading-none cursor-pointer"
        >
          &uarr;
        </motion.button>
      )}
    </AnimatePresence>
  )
}
