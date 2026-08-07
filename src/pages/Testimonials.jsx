import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import StaffVideoCard from '../components/ui/StaffVideoCard'
import { DINING_IMAGES } from '../data/diningImages'
import { ROOM_IMAGES } from '../data/roomImages'

const CATEGORIES = [
  { key: 'all', label: 'All Videos' },
  { key: 'guest', label: 'Guests' },
  { key: 'staff', label: 'Staff' },
]

const TESTIMONIAL_VIDEOS = [
  {
    id: 1,
    name: 'Chukwuemeka O.',
    role: 'Business Traveller',
    category: 'guest',
    department: 'Guest',
    poster: ROOM_IMAGES.executive?.[0] ?? '',
    photo: ROOM_IMAGES.executive?.[0] ?? '',
    quote: 'The room was immaculate, the staff remembered my name every single day, and the breakfast spread was extraordinary.',
  },
  {
    id: 2,
    name: 'Adaeze M.',
    role: 'Corporate Client',
    category: 'guest',
    department: 'Guest',
    poster: DINING_IMAGES['pool-bar']?.[0] ?? '',
    photo: DINING_IMAGES['pool-bar']?.[0] ?? '',
    quote: 'We hosted our company\u2019s annual conference here and the event team was flawless from start to finish.',
  },
  {
    id: 3,
    name: 'Emeka & Ngozi A.',
    role: 'Leisure Guests',
    category: 'guest',
    department: 'Guest',
    poster: DINING_IMAGES.dining?.[0] ?? '',
    photo: DINING_IMAGES.dining?.[0] ?? '',
    quote: 'The Presidential Suite on our anniversary was beyond anything we imagined \u2014 Beechnut made our celebration unforgettable.',
  },
  {
    id: 4,
    name: 'Kitchen Team',
    role: 'Staff Reaction',
    category: 'staff',
    department: 'Kitchen',
    poster: '/staff/kitchen/chef-poster.svg',
    photo: '/staff/kitchen/chef-headshot.svg',
    quote: 'We take pride in every plate that leaves our kitchen \u2014 cooking for our guests feels like cooking for family.',
  },
  {
    id: 5,
    name: 'Front Desk Team',
    role: 'Staff Reaction',
    category: 'staff',
    department: 'Front Office',
    poster: '/staff/front-office/fom-poster.svg',
    photo: '/staff/front-office/fom-headshot.svg',
    quote: 'Nothing makes our day like a guest who arrives as a stranger and leaves as a friend.',
  },
  {
    id: 6,
    name: 'Events Team',
    role: 'Staff Reaction',
    category: 'staff',
    department: 'Events',
    poster: '/staff/events/events-poster.svg',
    photo: '/staff/events/events-headshot.svg',
    quote: 'Seeing a celebration come together \u2014 that is why we love what we do every single day.',
  },
]

export default function Testimonials() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? TESTIMONIAL_VIDEOS : TESTIMONIAL_VIDEOS.filter(v => v.category === filter)

  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Video <em className="italic text-gold-400 not-italic">Testimonials</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Testimonials</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Stories &amp; Voices</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">
                Hear From Our <em className="text-gold-500 not-italic">Guests &amp; Team</em>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">Real voices, real experiences — watch what our guests and staff say about staying and working at Beechnut Hotel Effurun.</p>
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-10" role="group" aria-label="Filter testimonials by category">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-300 ${
                  filter === cat.key
                    ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-md'
                    : 'bg-transparent text-gray-600 border-navy-900/15 hover:border-gold-400 hover:text-gold-500'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((video, i) => (
                <ScrollReveal key={video.id} delay={0.05 * i}>
                  <StaffVideoCard
                    member={{
                      name: video.name,
                      role: video.role,
                      department: video.department,
                      photo: video.photo,
                      poster: video.poster,
                      quote: video.quote,
                    }}
                    showTranscript={false}
                    className="h-full"
                  />
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-lg p-8 lg:p-10 text-center relative overflow-hidden mt-16"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gold-400/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">Experience It Yourself</h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                  Words only say so much — come and create your own Beechnut story. Your comfort, our promise.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
                    Book Your Stay
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
