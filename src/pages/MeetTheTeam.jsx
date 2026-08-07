import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import { TEAM_IMAGES, DEPARTMENTS } from '../data/teamImages'
import { GM, departmentLabel } from '../data/team'

const heroBgVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const HERO_SLIDES = [
  ...(TEAM_IMAGES['all-staff'] ?? []),
  ...(TEAM_IMAGES['front-desk'] ?? []),
  ...(TEAM_IMAGES['dining'] ?? []).filter(img => /chef|bartenders/.test(img)),
].filter(Boolean)

export default function MeetTheTeam() {
  const [slideIndex, setSlideIndex] = useState(0)

  const heroSlides = HERO_SLIDES.length > 0
    ? HERO_SLIDES
    : Object.values(TEAM_IMAGES).flat()

  useEffect(() => {
    if (heroSlides.length < 2) return
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 4500)
    return () => clearInterval(t)
  }, [heroSlides.length])

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950" aria-label="Meet the team at Beechnut Hotel Effurun">
        <div className="absolute inset-0">
          {heroSlides.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIndex}
                src={heroSlides[slideIndex]}
                alt=""
                fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
                variants={heroBgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/45 to-navy-950/75" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4"
        >
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Effurun</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Meet Our <em className="italic text-gold-400 not-italic">Team</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Meet Our Team</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-label="General Manager spotlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-gold-400/20 to-transparent pointer-events-none" />
                {GM.image ? (
                  <img
                    src={GM.image}
                    alt={`${GM.name}, ${GM.title}`}
                    className="relative w-full aspect-[4/5] object-cover rounded-xl border border-navy-900/10 shadow-[0_30px_80px_rgba(6,16,35,0.2)]"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full aspect-[4/5] rounded-xl bg-gradient-to-br from-navy-950 to-navy-800 border border-navy-900/10 flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-gold-400">{GM.name.charAt(0)}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-3">A Word From the Top</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-2">{GM.name}</h2>
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-gray-500 mb-4">{GM.title}</p>
              <div className="w-12 h-0.5 bg-gold-400 mb-6" />
              <p className="text-navy-900/70 leading-relaxed text-lg mb-6">{GM.welcome}</p>
              <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)]">
                Reserve a Room
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {TEAM_IMAGES['all-staff']?.length > 0 && (
        <section className="py-16 lg:py-24 bg-surface" aria-label="The whole team at Beechnut Hotel">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">The Whole Team</span>
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight">One Team, One <em className="text-gold-500 not-italic">Welcome</em></h2>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <img
                src={TEAM_IMAGES['all-staff'][0]}
                alt="The full Beechnut Hotel team"
                className="w-full max-w-6xl mx-auto aspect-[16/9] object-cover rounded-xl border border-navy-900/10 shadow-sm"
                loading="lazy"
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {DEPARTMENTS.map((folder, i) => {
        const images = TEAM_IMAGES[folder] ?? []
        if (images.length === 0) return null
        const label = departmentLabel(folder)
        return (
          <section key={folder} className={`py-16 lg:py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`} aria-label={`${label} team`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">{label}</span>
                  <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight">{label} <em className="text-gold-500 not-italic">Team</em></h2>
                  <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
                </div>
              </ScrollReveal>
              {images.length === 1 ? (
                <ScrollReveal>
                  <img
                    src={images[0]}
                    alt={`${label} team at Beechnut Hotel`}
                    className="w-full max-w-5xl mx-auto aspect-[16/10] object-cover rounded-xl border border-navy-900/10 shadow-sm"
                    loading="lazy"
                  />
                </ScrollReveal>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {images.map((img, j) => (
                    <ScrollReveal key={img} delay={0.08 * j}>
                      <img
                        src={img}
                        alt={`${label} team at Beechnut Hotel`}
                        className="w-full aspect-[16/10] object-cover rounded-xl border border-navy-900/10 shadow-sm"
                        loading="lazy"
                      />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}

      <section className="py-16 lg:py-24 bg-white" aria-label="Book your stay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-lg p-8 lg:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gold-400/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">Ready to experience Beechnut hospitality firsthand?</h3>
                <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                  From the front desk to the kitchen, every member of our team is ready to welcome you.
                </p>
                <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
                  Book Now
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
