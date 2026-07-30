import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/rooms', label: 'Rooms & Suites' },
  { to: '/dining', label: 'Dining' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const menuVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 200, damping: 28, staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { x: '100%', transition: { type: 'spring', stiffness: 200, damping: 28 } },
}

const menuItemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
      isActive ? 'text-gold-400' : 'text-white/80 hover:text-gold-300'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `text-3xl font-display font-normal text-white transition-colors duration-300 ${
      isActive ? 'text-gold-400' : 'hover:text-gold-400'
    }`

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
          scrolled ? 'bg-navy-950/97 backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.2)]' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none" aria-label="Beechnut Hotel Warri — Home">
            <span className="font-display text-2xl font-semibold text-white tracking-wide">Beechnut</span>
            <span className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-gold-400 mt-0.5">Hotel Warri</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClass} end={to === '/'}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/booking"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)]"
          >
            Book Now
          </Link>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 z-50 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-7 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-7 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-7 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-navy-950 flex flex-col items-center justify-center gap-6"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <motion.div key={to} variants={menuItemVariants}>
                <NavLink to={to} className={mobileNavLinkClass} end={to === '/'} onClick={() => setMobileOpen(false)}>
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div variants={menuItemVariants}>
              <Link
                to="/booking"
                className="mt-4 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
