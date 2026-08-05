import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import StaffVideoCard from '../components/ui/StaffVideoCard'
import { TEAM_MEMBERS, GM_WELCOME } from '../data/staff'

export default function Team() {
  const departmentHeads = TEAM_MEMBERS.filter(m => m.id !== GM_WELCOME.id)

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
            Meet the <em className="italic text-gold-400 not-italic">Team</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Team</span>
          </nav>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">The People Behind the Welcome</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy-900 leading-tight mb-3">
                Leaders Who Make Every Stay <em className="text-gold-500 not-italic">Memorable</em>
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">Behind every room, every plate, and every event is a team devoted to genuine Nigerian hospitality. Meet the department heads who lead the Beechnut experience.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
              <StaffVideoCard member={GM_WELCOME} showTranscript className="h-full" />
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-navy-950 rounded-lg p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold-400/5 pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-400 block mb-2">A Word From the Top</span>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">{GM_WELCOME.name}</h3>
                  <div className="w-12 h-0.5 bg-gold-400 mb-4" />
                  <p className="text-white/70 leading-relaxed mb-4">{GM_WELCOME.caption}</p>
                  <blockquote className="font-accent italic text-lg text-gold-300 leading-relaxed mb-6 border-l-3 border-gold-400 pl-4">
                    &ldquo;{GM_WELCOME.quote}&rdquo;
                  </blockquote>
                  <div className="flex gap-3 flex-wrap">
                    <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-400 text-navy-900 hover:bg-gold-600 transition-all">
                      Reserve a Room
                    </Link>
                    <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">
                      Our Story
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentHeads.map((member, i) => (
              <ScrollReveal key={member.id} delay={0.08 * i}>
                <StaffVideoCard member={member} showTranscript className="h-full" />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg p-8 lg:p-10 text-center relative overflow-hidden mt-16"
            >
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy-900 mb-4">Come Meet Us in Person</h3>
                <div className="w-12 h-0.5 bg-navy-900/30 mx-auto mb-4" />
                <p className="text-navy-900/80 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                  Our doors are open 24 hours a day, and our team is always glad to welcome you — for a stay, a meal, or a conversation about your next event.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-navy-900 text-gold-400 hover:bg-navy-950 transition-all">
                    Book Your Stay
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">
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
