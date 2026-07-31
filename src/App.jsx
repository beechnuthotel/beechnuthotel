import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

const Rooms = lazy(() => import('./pages/Rooms'))
const RoomDetail = lazy(() => import('./pages/RoomDetail'))
const Booking = lazy(() => import('./pages/Booking'))
const Dining = lazy(() => import('./pages/Dining'))
const Events = lazy(() => import('./pages/Events'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Offers = lazy(() => import('./pages/Offers'))

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
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  )
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" aria-label="Loading" role="status" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<RoomDetail />} />
          <Route path="booking" element={<Booking />} />
          <Route path="dining" element={<Dining />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="offers" element={<Offers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
