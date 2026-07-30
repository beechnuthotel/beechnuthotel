import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROOMS } from '../data/rooms'

const PHONE = '2348055000822'

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: 'Your Stay' },
    { num: 2, label: 'Your Details' },
    { num: 3, label: 'Review & Book' },
  ]
  return (
    <div className="flex items-center justify-center mb-12" aria-label="Booking progress">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              s.num === currentStep
                ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 shadow-[0_0_0_4px_rgba(212,162,42,0.2),0_4px_16px_rgba(212,162,42,0.2)] scale-110'
                : s.num < currentStep
                  ? 'bg-gold-400 text-navy-900'
                  : 'bg-gray-200 text-gray-400'
            }`}>
              {s.num < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s.num
              )}
            </div>
            <span className={`text-[0.65rem] font-semibold tracking-wider uppercase mt-1.5 transition-colors duration-300 ${
              s.num <= currentStep ? 'text-gold-500' : 'text-gray-400'
            }`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
              s.num < currentStep ? 'bg-gold-400' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [step1Error, setStep1Error] = useState({ dates: false, room: false })
  const [step2Error, setStep2Error] = useState('')

  const topRef = useRef(null)

  const today = new Date().toISOString().split('T')[0]

  const minCheckout = useMemo(() => {
    if (!checkIn) return today
    const next = new Date(checkIn)
    next.setDate(next.getDate() + 1)
    return next.toISOString().split('T')[0]
  }, [checkIn, today])

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [checkIn, checkOut])

  const total = selectedRoom ? selectedRoom.price * nights : 0

  const goToStep = (s) => {
    setStep(s)
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCheckInChange = (val) => {
    setCheckIn(val)
    if (checkOut && val && new Date(checkOut) <= new Date(val)) {
      setCheckOut('')
    }
  }

  const handleNextStep1 = () => {
    if (!checkIn || !checkOut) {
      setStep1Error({ dates: true, room: false })
      return
    }
    if (!selectedRoom) {
      setStep1Error({ dates: false, room: true })
      return
    }
    setStep1Error({ dates: false, room: false })
    goToStep(2)
  }

  const handleNextStep2 = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStep2Error('Please fill in all required fields.')
      return
    }
    setStep2Error('')
    goToStep(3)
  }

  const buildBookingMessage = () => {
    const timestamp = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos', dateStyle: 'full', timeStyle: 'short' })
    const lines = [
      `*New Booking Request — Beechnut Hotel Warri*`,
      `_Submitted: ${timestamp}_`,
      ``,
      `*Guest Details*`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      ``,
      `*Room Details*`,
      `Room: ${selectedRoom.name}`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Nights: ${nights}`,
      `Guests: ${guests}`,
      `Price/Night: ₦${selectedRoom.price.toLocaleString('en-NG')}`,
      ``,
      `*Pricing*`,
      `Subtotal (${nights} × ₦${selectedRoom.price.toLocaleString('en-NG')}): ₦${total.toLocaleString('en-NG')}`,
      `Total: ₦${total.toLocaleString('en-NG')}`,
      ``,
      `*Special Requests*`,
      specialRequests || 'None',
      ``,
      `Sent from Beechnut Hotel Website — https://beechnuthotel.pages.dev`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  const buildReceiptMessage = () => {
    const lines = [
      `*Payment Receipt — Beechnut Hotel Warri*`,
      `Guest: ${name}`,
      `Room: ${selectedRoom.name}`,
      `Amount Paid: ₦${total.toLocaleString('en-NG')}`,
      ``,
      `Please find attached my payment receipt.`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  const handleConfirm = () => {
    const waUrl = `https://wa.me/${PHONE}?text=${buildBookingMessage()}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setConfirmed(true)
  }

  const canProceedStep1 = checkIn && checkOut && selectedRoom

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
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Book a <em className="italic text-gold-400 not-italic">Room</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Book a Room</span>
          </nav>
        </motion.div>
      </section>

      <section ref={topRef} className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={step} />

          {!confirmed ? (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="text-center mb-10">
                    <span className="eyebrow">Step 01</span>
                    <h2 className="section-title">Your Stay</h2>
                    <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
                    <p className="section-subtitle mx-auto">Select your dates and preferred room.</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm mb-8">
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-4 pb-3 border-b border-gray-100">Dates &amp; Guests</span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end mb-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="checkin">Check-in <span className="text-red-600">*</span></label>
                        <input
                          type="date"
                          id="checkin"
                          value={checkIn}
                          onChange={e => handleCheckInChange(e.target.value)}
                          min={today}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all cursor-pointer"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="checkout">Check-out <span className="text-red-600">*</span></label>
                        <input
                          type="date"
                          id="checkout"
                          value={checkOut}
                          onChange={e => setCheckOut(e.target.value)}
                          min={minCheckout}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all cursor-pointer"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="guests">Guests</label>
                        <select
                          id="guests"
                          value={guests}
                          onChange={e => setGuests(parseInt(e.target.value))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all cursor-pointer appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center h-full pb-1">
                        <div className="w-full bg-gold-50 border border-gold-200 rounded-sm px-3 py-2.5 text-center">
                          <span className="text-xs font-semibold tracking-wider uppercase text-gold-600 block">Nights</span>
                          <span className="font-display text-xl font-semibold text-navy-900 leading-none">
                            {nights > 0 ? nights : '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {step1Error.dates && (
                      <p className="text-red-600 text-sm mt-2" role="alert">Please select both check-in and check-out dates.</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-4">Select a Room <span className="text-red-600">*</span></span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {ROOMS.map(room => {
                        const isSelected = selectedRoom?.id === room.id
                        return (
                          <motion.div
                            key={room.id}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className={`bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col transition-all duration-300 cursor-pointer ${
                              isSelected ? 'ring-2 ring-gold-500 border-gold-500 shadow-[0_8px_32px_rgba(212,162,42,0.15)]' : 'border-gray-200 hover:shadow-lg hover:-translate-y-1'
                            }`}
                            onClick={() => setSelectedRoom(isSelected ? null : room)}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRoom(isSelected ? null : room) } }}
                          >
                            <div className="relative h-44 overflow-hidden bg-navy-800/10">
                              <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
                              <span className="absolute top-3 left-3 z-10 text-[0.6rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-600/90 text-white">Available</span>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <span className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-1">{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</span>
                              <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">{room.name}</h3>
                              <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-2 line-clamp-2">{room.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {room.amenities.slice(0, 3).map(a => (
                                  <span key={a} className="text-[0.6rem] bg-surface border border-navy-900/10 rounded-full px-2 py-0.5 text-gray-600 font-medium">{a}</span>
                                ))}
                                {room.amenities.length > 3 && (
                                  <span className="text-[0.6rem] text-gray-400 font-medium">+{room.amenities.length - 3}</span>
                                )}
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                                <div>
                                  <span className="font-display text-lg font-semibold text-navy-900">&#8358;{room.price.toLocaleString('en-NG')}</span>
                                  <span className="text-xs text-gray-400"> / night</span>
                                </div>
                                <div
                                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-sm border-2 transition-all ${
                                    isSelected
                                      ? 'bg-gold-500 text-navy-900 border-gold-500'
                                      : 'bg-transparent text-navy-900 border-navy-900 hover:bg-navy-900 hover:text-white'
                                  }`}
                                  onClick={e => e.stopPropagation()}
                                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setSelectedRoom(isSelected ? null : room) } }}
                                  role="button"
                                  tabIndex={0}
                                >
                                  {isSelected ? 'Selected' : 'Select'}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                    {step1Error.room && (
                      <p className="text-red-600 text-sm mt-2" role="alert">Please select a room.</p>
                    )}
                  </div>

                  {selectedRoom && nights > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gold-50 border border-gold-200 rounded-lg p-4 sm:p-5 mb-8"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-xs font-semibold tracking-wider uppercase text-gold-600 block mb-0.5">Booking Summary</span>
                          <span className="text-sm text-navy-900/70">{selectedRoom.name} — &#8358;{selectedRoom.price.toLocaleString('en-NG')} / night × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold tracking-wider uppercase text-gold-600 block">Total</span>
                          <span className="font-display text-2xl font-bold text-navy-900">&#8358;{total.toLocaleString('en-NG')}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextStep1}
                      disabled={!canProceedStep1}
                      className={`px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm transition-all ${
                        canProceedStep1
                          ? 'bg-gold-500 text-navy-900 hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="text-center mb-10">
                    <span className="eyebrow">Step 02</span>
                    <h2 className="section-title">Your Details</h2>
                    <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
                    <p className="section-subtitle mx-auto">We need a few details to complete your booking.</p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-4 pb-3 border-b border-gray-100">Guest Information</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="book-name">Full Name <span className="text-red-600">*</span></label>
                          <input type="text" id="book-name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="e.g. Emeka Okafor" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="book-email">Email Address <span className="text-red-600">*</span></label>
                          <input type="email" id="book-email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="you@example.com" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="book-phone">Phone Number <span className="text-red-600">*</span></label>
                        <input type="tel" id="book-phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="+234 800 000 0000" required />
                      </div>

                      <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-xs font-semibold tracking-wider uppercase text-gray-500" htmlFor="special">Special Requests <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                        <textarea id="special" value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all resize-y min-h-[90px]" placeholder="Any special requests? Early check-in, dietary requirements, anniversary arrangements…" />
                      </div>

                      {step2Error && (
                        <p className="text-red-600 text-sm mb-4" role="alert">{step2Error}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <button
                        onClick={() => goToStep(1)}
                        className="inline-flex items-center gap-1 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleNextStep2}
                        className="px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)] transition-all"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="text-center mb-10">
                    <span className="eyebrow">Step 03</span>
                    <h2 className="section-title">Review &amp; Book</h2>
                    <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
                    <p className="section-subtitle mx-auto">Please review your booking details before confirming.</p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-56 h-44 sm:h-auto bg-navy-800/10 overflow-hidden shrink-0">
                          <img src={selectedRoom?.image} alt={selectedRoom?.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="p-5 flex-1">
                          <span className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-1 block">{selectedRoom?.type.charAt(0).toUpperCase() + selectedRoom?.type.slice(1)}</span>
                          <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">{selectedRoom?.name}</h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <div><span className="text-gray-400">Check-in:</span> <span className="font-semibold text-navy-900">{checkIn}</span></div>
                            <div><span className="text-gray-400">Check-out:</span> <span className="font-semibold text-navy-900">{checkOut}</span></div>
                            <div><span className="text-gray-400">Nights:</span> <span className="font-semibold text-navy-900">{nights}</span></div>
                            <div><span className="text-gray-400">Guests:</span> <span className="font-semibold text-navy-900">{guests}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-6">
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3 pb-2 border-b border-gray-100">Pricing</span>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">{selectedRoom?.name} (&#8358;{selectedRoom?.price.toLocaleString('en-NG')} × {nights} {nights === 1 ? 'night' : 'nights'})</span>
                          <span className="font-semibold text-navy-900">&#8358;{total.toLocaleString('en-NG')}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                          <span className="font-bold text-navy-900">Total</span>
                          <span className="font-display text-xl font-bold text-navy-900">&#8358;{total.toLocaleString('en-NG')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-6">
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3 pb-2 border-b border-gray-100">Contact Details</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div><span className="text-gray-400 block text-xs">Name</span><span className="font-semibold text-navy-900">{name}</span></div>
                        <div><span className="text-gray-400 block text-xs">Email</span><span className="font-semibold text-navy-900">{email}</span></div>
                        <div><span className="text-gray-400 block text-xs">Phone</span><span className="font-semibold text-navy-900">{phone}</span></div>
                      </div>
                      {specialRequests && (
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <span className="text-gray-400 block text-xs mb-0.5">Special Requests</span>
                          <span className="text-sm text-navy-900">{specialRequests}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => goToStep(2)}
                        className="inline-flex items-center gap-1 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)] transition-all"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-10 text-center shadow-sm mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-2">Booking Request Received!</h2>
                <p className="text-gray-600 mb-2">
                  Thank you, <strong className="text-navy-900">{name}</strong>! Your booking request for the <strong className="text-navy-900">{selectedRoom?.name}</strong> has been sent to our reservations team.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  We will confirm your reservation within 24 hours. <strong className="text-amber-700">Please await confirmation before making any payment.</strong>
                </p>
                <p className="text-xs text-gray-400">
                  Our reservations team will respond via <strong className="text-navy-900">{email}</strong> within 24 hours.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 sm:p-8 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-200/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600 shrink-0" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">Payment Details</span>
                </div>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between"><span className="text-amber-800/70">Bank:</span><span className="font-semibold text-amber-900">[Bank Name]</span></div>
                  <div className="flex justify-between"><span className="text-amber-800/70">Account Name:</span><span className="font-semibold text-amber-900">[Account Name]</span></div>
                  <div className="flex justify-between"><span className="text-amber-800/70">Account Number:</span><span className="font-semibold text-amber-900">[Account Number]</span></div>
                  <div className="flex justify-between pt-1 border-t border-amber-200/60"><span className="text-amber-800/70 font-medium">Amount Due:</span><span className="font-display text-xl font-bold text-amber-900">&#8358;{total.toLocaleString('en-NG')}</span></div>
                </div>
                <p className="text-[0.65rem] text-amber-600 italic flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Placeholder — update with real bank details when available.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  onClick={() => { const url = `https://wa.me/${PHONE}?text=${buildReceiptMessage()}`; window.open(url, '_blank', 'noopener,noreferrer') }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-[#25D366] text-white hover:bg-[#1DA851] transition-all"
                >
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A14 14 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.5 11.5 0 0 1-5.88-1.6l-.42-.25-4.42 1.04 1.06-4.32-.27-.44A11.5 11.5 0 1 1 16 27.5z" /></svg>
                  Send Payment Receipt
                </button>
                <button
                  onClick={() => { const url = `https://wa.me/${PHONE}?text=${buildBookingMessage()}`; window.open(url, '_blank', 'noopener,noreferrer') }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-gold-500 hover:bg-gold-400 hover:text-navy-900 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Resend Booking
                </button>
              </div>

              <div className="text-center">
                <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold tracking-wider uppercase text-gold-500 hover:text-gold-600 transition-all">
                  ← Back to Homepage
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}