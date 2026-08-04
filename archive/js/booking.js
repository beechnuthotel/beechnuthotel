/* ============================================================
   BEECHNUT HOTEL EFFURUN — Booking System
   booking.js | Vanilla JS, no dependencies
   Multi-step: Dates → Room → Guest Details → Confirmation
   ============================================================ */

'use strict';

/* ─── HOTEL CONFIGURATION ───────────────────────────────────── */
const HOTEL_CONFIG = {
  name:        'Beechnut Hotel Effurun',
  whatsapp:    '[HOTEL_WHATSAPP_NUMBER]',   /* TODO: Replace */
  email:       '[HOTEL_EMAIL]',             /* TODO: Replace */
  currency:    '₦',
  currencyFmt: (n) => '₦' + Number(n).toLocaleString('en-NG'),
};

/* ─── ROOM DATA ─────────────────────────────────────────────── */
const ROOMS = [
  {
    id:          'standard-room',
    name:        'Standard Room',
    type:        'standard',
    image:       '/images/rooms/standard-room.jpg',
    description: 'A well-appointed room with modern furnishings, offering comfort and convenience for the business or leisure traveller.',
    maxOccupancy: 2,
    bedType:     'King Bed',
    sizeSqm:     28,
    pricePerNight: 45000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'En-suite Bathroom', 'Work Desk', 'Daily Housekeeping'],
  },
  {
    id:          'deluxe-room',
    name:        'Deluxe Room',
    type:        'deluxe',
    image:       '/images/rooms/deluxe-room.jpg',
    description: 'Elevated comfort with premium furnishings, city views and enhanced bathroom amenities for a superior stay.',
    maxOccupancy: 2,
    bedType:     'King Bed',
    sizeSqm:     36,
    pricePerNight: 65000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Bathtub & Shower', 'Minibar', 'Work Desk', 'City View', 'Daily Housekeeping'],
  },
  {
    id:          'twin-room',
    name:        'Twin Room',
    type:        'standard',
    image:       '/images/rooms/twin-room.jpg',
    description: 'Ideal for two guests travelling together, featuring twin beds and all the comforts of home.',
    maxOccupancy: 2,
    bedType:     'Twin Beds',
    sizeSqm:     30,
    pricePerNight: 48000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'En-suite Bathroom', 'Work Desk', 'Daily Housekeeping'],
  },
  {
    id:          'executive-suite',
    name:        'Executive Suite',
    type:        'suite',
    image:       '/images/rooms/executive-suite.jpg',
    description: 'A spacious suite with a separate living area, ideal for extended stays and business travellers who demand more space.',
    maxOccupancy: 3,
    bedType:     'King Bed',
    sizeSqm:     60,
    pricePerNight: 110000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Smart TV × 2', 'Separate Living Room', 'Kitchenette', 'Bathtub & Rain Shower', 'Minibar', 'Lounge Access', 'Daily Housekeeping'],
  },
  {
    id:          'junior-suite',
    name:        'Junior Suite',
    type:        'suite',
    image:       '/images/rooms/junior-suite.jpg',
    description: 'A beautifully designed suite blending comfort and elegance, with a defined seating area and premium finishes throughout.',
    maxOccupancy: 2,
    bedType:     'Super King Bed',
    sizeSqm:     48,
    pricePerNight: 85000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Seating Area', 'Minibar', 'Walk-in Shower', 'Bathrobe & Slippers', 'Daily Housekeeping'],
  },
  {
    id:          'presidential-suite',
    name:        'Presidential Suite',
    type:        'presidential',
    image:       '/images/rooms/presidential-suite.jpg',
    description: 'The pinnacle of luxury at Beechnut Hotel Effurun — a full apartment-style suite with panoramic views, butler service and unparalleled amenities.',
    maxOccupancy: 4,
    bedType:     'Super King Bed',
    sizeSqm:     120,
    pricePerNight: 250000,
    amenities:   ['Free WiFi', 'Air Conditioning', 'Smart TV × 3', 'Panoramic Views', 'Private Dining Area', 'Full Kitchen', 'Jacuzzi & Rain Shower', 'Butler Service', 'Chauffeur (on request)', 'Daily Housekeeping'],
  },
];

/* ─── BOOKING STATE ─────────────────────────────────────────── */
const bookingState = {
  step:         1,
  checkIn:      null,
  checkOut:     null,
  adults:       1,
  children:     0,
  nights:       0,
  selectedRoom: null,
  guest: {
    firstName:    '',
    lastName:     '',
    email:        '',
    phone:        '',
    nationality:  '',
    arrivalTime:  '',
    requests:     '',
  },
  reference: '',
};

/* ─── HELPERS ───────────────────────────────────────────────── */
function generateRef() {
  return 'BNH-' + Math.floor(100000 + Math.random() * 900000);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function fmt(n) { return HOTEL_CONFIG.currencyFmt(n); }

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function minCheckOutStr(checkInVal) {
  if (!checkInVal) return todayStr();
  const d = new Date(checkInVal);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

/* ─── RENDER HELPERS ────────────────────────────────────────── */
function renderStars(n = 5) {
  return Array(n).fill('<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('');
}

function roomAmenitiesHTML(room) {
  const icons = {
    'Free WiFi': '📶', 'Air Conditioning': '❄️', 'Flat-screen TV': '📺',
    'Smart TV': '📺', 'En-suite Bathroom': '🚿', 'Bathtub & Shower': '🛁',
    'Bathtub & Rain Shower': '🛁', 'Walk-in Shower': '🚿', 'Rain Shower': '🚿',
    'Minibar': '🥂', 'Work Desk': '💼', 'City View': '🏙️', 'Panoramic Views': '🌅',
    'Lounge Access': '🛋️', 'Butler Service': '🤵', 'Jacuzzi & Rain Shower': '🛁',
    'Kitchenette': '☕', 'Full Kitchen': '🍳', 'Daily Housekeeping': '🧹',
    'Bathrobe & Slippers': '👘', 'Chauffeur (on request)': '🚗',
    'Separate Living Room': '🛋️', 'Seating Area': '🛋️',
    'Private Dining Area': '🍽️', 'Smart TV × 2': '📺', 'Smart TV × 3': '📺',
  };
  return room.amenities.slice(0, 5).map(a =>
    `<span class="amenity-tag">${icons[a] || '✓'} ${a}</span>`
  ).join('');
}

/* ─── STEP RENDERER ─────────────────────────────────────────── */
function updateProgress() {
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    const step = i + 1;
    el.classList.remove('active', 'completed');
    if (step === bookingState.step)  el.classList.add('active');
    if (step < bookingState.step)    el.classList.add('completed');
  });
}

function showStep(n) {
  document.querySelectorAll('.booking-step').forEach(el => {
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
  });
  const target = document.getElementById(`step-${n}`);
  if (target) {
    target.style.display = 'block';
    target.setAttribute('aria-hidden', 'false');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  bookingState.step = n;
  updateProgress();
}

/* ─── STEP 1 — DATE SELECTION ───────────────────────────────── */
function initStep1() {
  const checkInEl  = document.getElementById('check-in');
  const checkOutEl = document.getElementById('check-out');

  if (checkInEl)  checkInEl.min = todayStr();
  if (checkOutEl) checkOutEl.min = minCheckOutStr(todayStr());

  if (checkInEl) {
    checkInEl.addEventListener('change', () => {
      bookingState.checkIn = checkInEl.value;
      if (checkOutEl) {
        checkOutEl.min = minCheckOutStr(checkInEl.value);
        if (checkOutEl.value && checkOutEl.value <= checkInEl.value) {
          checkOutEl.value = '';
          bookingState.checkOut = null;
        }
      }
    });
  }

  if (checkOutEl) {
    checkOutEl.addEventListener('change', () => {
      bookingState.checkOut = checkOutEl.value;
    });
  }

  const searchBtn = document.getElementById('btn-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const ci = document.getElementById('check-in')?.value;
      const co = document.getElementById('check-out')?.value;
      const adults   = parseInt(document.getElementById('adults')?.value   || 1);
      const children = parseInt(document.getElementById('children')?.value || 0);

      if (!ci || !co) {
        showBookingError('Please select both check-in and check-out dates.');
        return;
      }

      bookingState.checkIn   = ci;
      bookingState.checkOut  = co;
      bookingState.adults    = adults;
      bookingState.children  = children;
      bookingState.nights    = calcNights(ci, co);

      if (bookingState.nights < 1) {
        showBookingError('Check-out must be at least one night after check-in.');
        return;
      }

      renderRooms();
      showStep(2);
    });
  }
}

/* ─── STEP 2 — ROOM SELECTION ───────────────────────────────── */
function renderRooms() {
  const grid = document.getElementById('rooms-grid');
  if (!grid) return;

  const totalGuests = bookingState.adults + bookingState.children;

  grid.innerHTML = ROOMS.map(room => {
    const total      = room.pricePerNight * bookingState.nights;
    const available  = room.maxOccupancy >= (bookingState.adults);
    const statusHTML = available
      ? '<span class="room-status room-status--available">✓ Available</span>'
      : '<span class="room-status room-status--unavailable">✗ Not available for selected guests</span>';

    return `
      <div class="room-card ${!available ? 'room-card--unavailable' : ''}" data-room-id="${room.id}">
        <div class="room-card__image-wrap">
          <img src="${room.image}" alt="${room.name}" class="room-card__image" loading="lazy"
               onerror="this.src='/images/placeholder-room.jpg'">
          <span class="room-card__type-badge">${room.type}</span>
        </div>
        <div class="room-card__body">
          <div class="room-card__header">
            <h3 class="room-card__name">${room.name}</h3>
            ${statusHTML}
          </div>
          <div class="room-card__meta">
            <span>🛏 ${room.bedType}</span>
            <span>👤 Max ${room.maxOccupancy} guests</span>
            <span>📐 ${room.sizeSqm} m²</span>
          </div>
          <p class="room-card__desc">${room.description}</p>
          <div class="room-card__amenities">${roomAmenitiesHTML(room)}</div>
          <div class="room-card__pricing">
            <div class="room-card__price-block">
              <span class="room-card__rate">${fmt(room.pricePerNight)}</span>
              <span class="room-card__per">/night</span>
            </div>
            <div class="room-card__total">
              Total: <strong>${fmt(total)}</strong>
              <small>(${bookingState.nights} night${bookingState.nights > 1 ? 's' : ''})</small>
            </div>
          </div>
          <div class="room-card__actions">
            <button class="btn btn--outline-dark btn--sm" onclick="openRoomModal('${room.id}')">View Details</button>
            ${available
              ? `<button class="btn btn--primary btn--sm" onclick="selectRoom('${room.id}')">Select Room →</button>`
              : `<button class="btn btn--sm" disabled style="opacity:0.4;cursor:not-allowed">Not Available</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');

  /* Night summary banner */
  const summary = document.getElementById('search-summary');
  if (summary) {
    summary.innerHTML = `
      <div class="search-summary">
        <span>📅 <strong>${formatDate(bookingState.checkIn)}</strong> → <strong>${formatDate(bookingState.checkOut)}</strong></span>
        <span>🌙 ${bookingState.nights} night${bookingState.nights > 1 ? 's' : ''}</span>
        <span>👤 ${bookingState.adults} adult${bookingState.adults > 1 ? 's' : ''}${bookingState.children > 0 ? ` · ${bookingState.children} child${bookingState.children > 1 ? 'ren' : ''}` : ''}</span>
        <button class="btn btn--ghost btn--sm" onclick="showStep(1)">← Modify search</button>
      </div>
    `;
  }
}

function selectRoom(roomId) {
  bookingState.selectedRoom = ROOMS.find(r => r.id === roomId);
  if (!bookingState.selectedRoom) return;
  renderGuestForm();
  showStep(3);
}

/* Room detail modal */
function openRoomModal(roomId) {
  const room  = ROOMS.find(r => r.id === roomId);
  if (!room) return;
  const total = room.pricePerNight * bookingState.nights;
  const modal = document.getElementById('room-modal');
  const body  = document.getElementById('room-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <img src="${room.image}" alt="${room.name}" class="modal-room-img"
         onerror="this.src='/images/placeholder-room.jpg'">
    <div class="modal-room-content">
      <h2 class="modal-room-name">${room.name}</h2>
      <div class="room-card__meta">
        <span>🛏 ${room.bedType}</span>
        <span>👤 Max ${room.maxOccupancy} guests</span>
        <span>📐 ${room.sizeSqm} m²</span>
      </div>
      <p style="margin: 1rem 0; color: var(--text-muted)">${room.description}</p>
      <h4 style="margin-bottom: 0.75rem; font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent)">Room Amenities</h4>
      <ul class="modal-amenities">
        ${room.amenities.map(a => `<li>✓ ${a}</li>`).join('')}
      </ul>
      <div class="modal-pricing">
        <span>${fmt(room.pricePerNight)}/night &nbsp;·&nbsp; ${bookingState.nights} nights</span>
        <strong>${fmt(total)} total</strong>
      </div>
      <button class="btn btn--primary" onclick="selectRoom('${room.id}'); closeRoomModal()">
        Book This Room →
      </button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRoomModal() {
  const modal = document.getElementById('room-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── STEP 3 — GUEST DETAILS ────────────────────────────────── */
function renderGuestForm() {
  updateBookingSidebar();
}

function updateBookingSidebar() {
  const sidebar = document.getElementById('booking-sidebar');
  if (!sidebar || !bookingState.selectedRoom) return;
  const room  = bookingState.selectedRoom;
  const total = room.pricePerNight * bookingState.nights;
  const tax   = Math.round(total * 0.075);

  sidebar.innerHTML = `
    <div class="booking-sidebar">
      <img src="${room.image}" alt="${room.name}" class="sidebar-room-img"
           onerror="this.src='/images/placeholder-room.jpg'">
      <div class="sidebar-body">
        <h4 class="sidebar-room-name">${room.name}</h4>
        <div class="sidebar-dates">
          <div><span>Check-in</span><strong>${formatDate(bookingState.checkIn)}</strong></div>
          <div><span>Check-out</span><strong>${formatDate(bookingState.checkOut)}</strong></div>
          <div><span>Duration</span><strong>${bookingState.nights} night${bookingState.nights > 1 ? 's' : ''}</strong></div>
          <div><span>Guests</span><strong>${bookingState.adults} adult${bookingState.adults > 1 ? 's' : ''}${bookingState.children ? ` · ${bookingState.children} child(ren)` : ''}</strong></div>
        </div>
        <div class="sidebar-price-breakdown">
          <div class="price-row"><span>${fmt(room.pricePerNight)} × ${bookingState.nights} nights</span><span>${fmt(total)}</span></div>
          <div class="price-row"><span>Service charge (7.5% VAT)</span><span>${fmt(tax)}</span></div>
          <div class="price-row price-row--total"><span>Total</span><span>${fmt(total + tax)}</span></div>
        </div>
        <button class="btn btn--ghost btn--sm" onclick="showStep(2)">← Change room</button>
      </div>
    </div>
  `;
}

function collectGuestData() {
  const fields = ['firstName', 'lastName', 'email', 'phone', 'nationality', 'arrivalTime', 'requests'];
  const data   = {};
  let   valid  = true;

  fields.forEach(field => {
    const el = document.getElementById(`guest-${field}`);
    if (el) {
      data[field] = el.value.trim();
      if (['firstName', 'lastName', 'email', 'phone'].includes(field) && !data[field]) {
        el.style.borderColor = '#DC2626';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    }
  });

  /* Basic email validation */
  if (data.email && !data.email.includes('@')) {
    const emailEl = document.getElementById('guest-email');
    if (emailEl) emailEl.style.borderColor = '#DC2626';
    valid = false;
  }

  return valid ? data : null;
}

/* ─── STEP 4 — CONFIRMATION ─────────────────────────────────── */
function renderConfirmation() {
  const room  = bookingState.selectedRoom;
  const guest = bookingState.guest;
  const total = room.pricePerNight * bookingState.nights;
  const tax   = Math.round(total * 0.075);
  const grand = total + tax;

  const confirmEl = document.getElementById('confirmation-summary');
  if (!confirmEl) return;

  confirmEl.innerHTML = `
    <div class="confirm-card">
      <div class="confirm-header">
        <div class="confirm-ref">Booking Reference</div>
        <div class="confirm-ref-value">${bookingState.reference}</div>
      </div>
      <div class="confirm-body">
        <div class="confirm-section">
          <h4>Guest Details</h4>
          <p>${guest.firstName} ${guest.lastName}</p>
          <p>${guest.email}</p>
          <p>${guest.phone}</p>
          ${guest.nationality ? `<p>${guest.nationality}</p>` : ''}
          ${guest.arrivalTime ? `<p>Expected arrival: ${guest.arrivalTime}</p>` : ''}
          ${guest.requests ? `<p>Requests: ${guest.requests}</p>` : ''}
        </div>
        <div class="confirm-section">
          <h4>Room</h4>
          <p>${room.name}</p>
          <p>${room.bedType} · ${room.sizeSqm} m²</p>
        </div>
        <div class="confirm-section">
          <h4>Stay Details</h4>
          <p>Check-in: <strong>${formatDate(bookingState.checkIn)}</strong></p>
          <p>Check-out: <strong>${formatDate(bookingState.checkOut)}</strong></p>
          <p>${bookingState.nights} night${bookingState.nights > 1 ? 's' : ''} · ${bookingState.adults} guest${bookingState.adults > 1 ? 's' : ''}</p>
        </div>
        <div class="confirm-section confirm-section--pricing">
          <h4>Pricing</h4>
          <div class="price-row"><span>Room rate (${bookingState.nights} nights)</span><span>${fmt(total)}</span></div>
          <div class="price-row"><span>VAT (7.5%)</span><span>${fmt(tax)}</span></div>
          <div class="price-row price-row--total"><span>Total Amount</span><span>${fmt(grand)}</span></div>
        </div>
      </div>
      <p class="confirm-note">
        ℹ️ This is a booking request. Your reservation will be confirmed by the hotel team within 2 hours via WhatsApp or email.
      </p>
    </div>
  `;
}

/* ─── SUBMISSION ─────────────────────────────────────────────── */
function submitBooking() {
  const ref   = bookingState.reference;
  const room  = bookingState.selectedRoom;
  const guest = bookingState.guest;

  /* Build WhatsApp message */
  const waMsg = encodeURIComponent(
    `🏨 NEW BOOKING — ${HOTEL_CONFIG.name}\n\n` +
    `Reference: ${ref}\n` +
    `Guest: ${guest.firstName} ${guest.lastName}\n` +
    `Email: ${guest.email}\n` +
    `Phone: ${guest.phone}\n` +
    `Room: ${room.name}\n` +
    `Check-in: ${formatDate(bookingState.checkIn)}\n` +
    `Check-out: ${formatDate(bookingState.checkOut)}\n` +
    `Nights: ${bookingState.nights}\n` +
    `Adults: ${bookingState.adults} | Children: ${bookingState.children}\n` +
    `Total: ${fmt(room.pricePerNight * bookingState.nights)}\n` +
    `Requests: ${guest.requests || 'None'}`
  );

  const waLink = `https://wa.me/${HOTEL_CONFIG.whatsapp}?text=${waMsg}`;

  /* Build mailto confirmation for guest */
  const mailSubject = encodeURIComponent(`Booking Confirmation — ${ref} | ${HOTEL_CONFIG.name}`);
  const mailBody    = encodeURIComponent(
    `Dear ${guest.firstName},\n\n` +
    `Thank you for choosing ${HOTEL_CONFIG.name}.\n\n` +
    `Your booking reference is: ${ref}\n\n` +
    `Room: ${room.name}\n` +
    `Check-in: ${formatDate(bookingState.checkIn)}\n` +
    `Check-out: ${formatDate(bookingState.checkOut)}\n` +
    `Duration: ${bookingState.nights} night(s)\n\n` +
    `A member of our team will confirm your reservation within 2 hours.\n\n` +
    `For immediate assistance, WhatsApp us: +${HOTEL_CONFIG.whatsapp}\n\n` +
    `Warm regards,\nReservations Team\n${HOTEL_CONFIG.name}`
  );

  /* Show success screen */
  showSuccessScreen(ref, waLink);

  /* Open WhatsApp notification (slight delay for UX) */
  setTimeout(() => {
    window.open(waLink, '_blank');
  }, 1500);

  /* Open guest confirmation email */
  setTimeout(() => {
    window.location.href = `mailto:${guest.email}?subject=${mailSubject}&body=${mailBody}`;
  }, 2500);
}

function showSuccessScreen(ref, waLink) {
  const wrap = document.getElementById('booking-wrap');
  const prog = document.getElementById('booking-progress-bar');
  if (prog) prog.style.display = 'none';

  if (wrap) {
    wrap.innerHTML = `
      <div class="booking-success">
        <div class="booking-success__icon">✓</div>
        <h2 class="booking-success__title">Booking Submitted!</h2>
        <p class="booking-success__ref">Your reference: <strong>${ref}</strong></p>
        <p class="booking-success__msg">
          Thank you, <strong>${bookingState.guest.firstName}</strong>! We've received your reservation request for the
          <strong>${bookingState.selectedRoom.name}</strong>.
          Our team will confirm your booking within <strong>2 hours</strong> via WhatsApp or email.
        </p>
        <div class="booking-success__actions">
          <a href="${waLink}" target="_blank" class="btn btn--primary">
            💬 Chat with Us on WhatsApp
          </a>
          <a href="/index.html" class="btn btn--outline-dark">← Back to Home</a>
        </div>
        <p class="booking-success__note">
          A confirmation email has been prepared for <strong>${bookingState.guest.email}</strong>.
          If it didn't open automatically, please contact us directly.
        </p>
      </div>
    `;
  }
}

/* ─── NAVIGATION BETWEEN STEPS ──────────────────────────────── */
function initStepNavigation() {
  /* Step 2 → Step 3 handled by selectRoom() */

  /* Step 3 → Step 4 */
  const guestNextBtn = document.getElementById('btn-guest-next');
  if (guestNextBtn) {
    guestNextBtn.addEventListener('click', () => {
      const data = collectGuestData();
      if (!data) {
        showBookingError('Please fill in all required fields correctly.');
        return;
      }
      bookingState.guest     = data;
      bookingState.reference = generateRef();
      renderConfirmation();
      showStep(4);
    });
  }

  /* Step 4 → Submit */
  const confirmBtn = document.getElementById('btn-confirm');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      confirmBtn.disabled     = true;
      confirmBtn.textContent  = 'Confirming...';
      submitBooking();
    });
  }
}

/* ─── MODAL & ERROR HELPERS ─────────────────────────────────── */
function showBookingError(msg) {
  const el = document.getElementById('booking-error');
  if (el) {
    el.textContent  = msg;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { el.style.display = 'none'; }, 5000);
  }
}

function initModal() {
  const modal   = document.getElementById('room-modal');
  const overlay = document.getElementById('room-modal-overlay');

  if (overlay) overlay.addEventListener('click', closeRoomModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeRoomModal();
    }
  });

  const closeBtn = document.getElementById('room-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeRoomModal);
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initStep1();
  initStepNavigation();
  initModal();
  showStep(1);

  /* Handle ?room= URL param (coming from rooms page) */
  const params = new URLSearchParams(window.location.search);
  const roomParam = params.get('room');
  if (roomParam) {
    const preselect = ROOMS.find(r => r.id === roomParam);
    if (preselect) {
      const banner = document.getElementById('preselect-banner');
      if (banner) {
        banner.innerHTML = `<div class="preselect-notice">You've pre-selected: <strong>${preselect.name}</strong>. Choose your dates to continue.</div>`;
      }
    }
  }
});

/* ─── GLOBAL EXPORTS (for inline onclick attributes) ─────────── */
window.selectRoom     = selectRoom;
window.openRoomModal  = openRoomModal;
window.closeRoomModal = closeRoomModal;
window.showStep       = showStep;
