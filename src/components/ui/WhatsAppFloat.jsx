import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  const phone = '2348055000822'
  const message = encodeURIComponent('Hello, I would like to make a reservation at Beechnut Hotel Warri.')
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2.5 shadow-[0_6px_28px_rgba(37,211,102,0.4)] text-sm font-medium no-underline animate-wa-pulse"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="white" aria-hidden="true">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A14 14 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.5 11.5 0 0 1-5.88-1.6l-.42-.25-4.42 1.04 1.06-4.32-.27-.44A11.5 11.5 0 1 1 16 27.5zm6.32-8.6c-.35-.17-2.06-1.01-2.38-1.13-.32-.12-.56-.17-.8.17s-.92 1.13-1.12 1.36c-.2.23-.42.26-.77.09-2.05-.92-3.4-1.64-4.75-3.73-.36-.61.36-.57 1.03-1.89.11-.24.06-.44-.03-.62-.09-.18-.8-1.93-1.1-2.64-.29-.69-.58-.6-.8-.61h-.68c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.17.23 2.44 3.72 5.92 5.22.83.36 1.47.57 1.97.73.83.26 1.58.22 2.17.13.66-.1 2.06-.84 2.35-1.65.29-.81.29-1.5.2-1.65-.09-.14-.32-.23-.67-.4z" />
      </svg>
      <span className="hidden sm:inline">Chat with Us</span>
    </motion.a>
  )
}
