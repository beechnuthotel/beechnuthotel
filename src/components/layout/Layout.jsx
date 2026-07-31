import { useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from '../ui/WhatsAppFloat'
import BackToTop from '../ui/BackToTop'
import ScrollToTop from '../ui/ScrollToTop'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  )
}
