import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Booking from './pages/Booking'
import Dining from './pages/Dining'
import Events from './pages/Events'
import Contact from './pages/Contact'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Facilities from './pages/Facilities'
import Offers from './pages/Offers'

function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="font-display text-[8rem] lg:text-[12rem] font-bold text-navy-900/10 leading-none">404</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 -mt-6 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="booking" element={<Booking />} />
        <Route path="dining" element={<Dining />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="offers" element={<Offers />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
