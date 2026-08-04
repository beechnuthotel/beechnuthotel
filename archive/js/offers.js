/**
 * offers.js — Beechnut Hotel Effurun
 * Handles the special-offers page:
 *   • Countdown timer targeting August 16, 2026
 *   • Displays days / hours / minutes / seconds
 *   • Stops at zero and shows "Offer Expired" message
 *
 * Linked from: offers.html
 * Depends on:  DOM IDs — timer-days, timer-hours, timer-mins,
 *              timer-secs, offerTimer, timerExpired
 */

(function () {
  'use strict';

  /* ─── CONFIGURATION ──────────────────────────────────────────────
   * TARGET_DATE: the deadline for the featured offer.
   * Set to midnight (00:00:00) on August 16, 2026 — West Africa Time
   * (UTC+1 / Africa/Lagos).  JavaScript's Date uses the local browser
   * timezone, so we use an ISO-8601 string without a Z suffix so that
   * interpretation follows the visitor's clock.  If you want to pin
   * it to WAT regardless of the visitor's timezone, change the string
   * to 'August 16, 2026 00:00:00 GMT+0100'.
   * ────────────────────────────────────────────────────────────── */
  var TARGET_DATE = new Date('August 16, 2026 00:00:00 GMT+0100');

  /* ─── ELEMENT REFERENCES ─────────────────────────────────────── */
  var elDays    = document.getElementById('timer-days');
  var elHours   = document.getElementById('timer-hours');
  var elMins    = document.getElementById('timer-mins');
  var elSecs    = document.getElementById('timer-secs');
  var elTimer   = document.getElementById('offerTimer');
  var elExpired = document.getElementById('timerExpired');

  /* ─── HELPERS ────────────────────────────────────────────────── */

  /**
   * Zero-pad a number to at least two digits.
   * @param  {number} n
   * @return {string}
   */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /**
   * Calculate the remaining time from now to the target.
   * @return {{ days:number, hours:number, minutes:number, seconds:number, expired:boolean }}
   */
  function calcRemaining() {
    var now  = Date.now();
    var diff = TARGET_DATE.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    var totalSeconds = Math.floor(diff / 1000);
    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);
    var minutes = totalMinutes % 60;
    var totalHours = Math.floor(totalMinutes / 60);
    var hours = totalHours % 24;
    var days  = Math.floor(totalHours / 24);

    return { days: days, hours: hours, minutes: minutes, seconds: seconds, expired: false };
  }

  /* ─── RENDER ─────────────────────────────────────────────────── */

  /**
   * Write the current countdown values to the DOM.
   */
  function renderTimer() {
    var t = calcRemaining();

    if (t.expired) {
      stopTimer();
      showExpiredState();
      return;
    }

    if (elDays)  elDays.textContent  = pad(t.days);
    if (elHours) elHours.textContent = pad(t.hours);
    if (elMins)  elMins.textContent  = pad(t.minutes);
    if (elSecs)  elSecs.textContent  = pad(t.seconds);

    /* Optional: update the page title with remaining days for tab visibility */
    document.title = t.days + 'd ' + pad(t.hours) + 'h left | Special Offers | Beechnut Hotel Effurun';
  }

  /**
   * Hide the live timer and show the "Offer Expired" message.
   */
  function showExpiredState() {
    if (elTimer)   elTimer.style.display   = 'none';
    if (elExpired) elExpired.style.display = 'block';

    /* Reset tab title */
    document.title = 'Special Offers | Beechnut Hotel Effurun';

    /* Optionally disable the "Book This Offer" button for the featured card */
    var featuredBtn = document.querySelector('.countdown-featured__body .btn-gold');
    if (featuredBtn) {
      featuredBtn.textContent = 'Offer Expired';
      featuredBtn.style.pointerEvents = 'none';
      featuredBtn.style.opacity = '0.45';
      featuredBtn.removeAttribute('href');
    }
  }

  /* ─── TIMER CONTROL ──────────────────────────────────────────── */
  var intervalId = null;

  /** Start the countdown — fires immediately, then every second. */
  function startTimer() {
    /* Guard: do nothing if the required DOM elements are absent */
    if (!elDays || !elHours || !elMins || !elSecs) {
      console.warn('[offers.js] Countdown elements not found in DOM. Timer not started.');
      return;
    }

    /* If already expired on page load, show expired state right away */
    if (calcRemaining().expired) {
      showExpiredState();
      return;
    }

    renderTimer();                           /* paint immediately */
    intervalId = setInterval(renderTimer, 1000);
  }

  /** Clear the interval. */
  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  /* ─── OFFER CARDS: ANIMATE IN ON SCROLL ─────────────────────── */

  /**
   * Lightweight IntersectionObserver to fade in offer cards when
   * they enter the viewport.  Degrades gracefully when the API
   * is unavailable.
   */
  function initCardAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var cards = document.querySelectorAll('.offer-card');
    if (!cards.length) return;

    /* Set initial hidden state via inline style */
    cards.forEach(function (card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function (card) { observer.observe(card); });
  }

  /* ─── FEATURED CARD HOVER PARALLAX (light effect) ───────────── */

  function initFeaturedHover() {
    var card = document.querySelector('.countdown-featured');
    if (!card) return;

    card.addEventListener('mousemove', function (e) {
      var rect  = card.getBoundingClientRect();
      var cx    = rect.left + rect.width  / 2;
      var cy    = rect.top  + rect.height / 2;
      var dx    = (e.clientX - cx) / (rect.width  / 2);
      var dy    = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = 'perspective(900px) rotateY(' + (dx * 1.5) + 'deg) rotateX(' + (-dy * 1.2) + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'transform 0.4s ease';
    });
  }

  /* ─── INIT ───────────────────────────────────────────────────── */

  function init() {
    startTimer();
    initCardAnimations();
    initFeaturedHover();
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ─── PUBLIC API (optional — exposed for testing / debugging) ── */
  window.BeechnutOffers = {
    /** Returns current remaining time object. */
    getRemaining : calcRemaining,
    /** Manually stop the countdown (e.g. for unit tests). */
    stopTimer    : stopTimer,
    /** Target date the timer counts down to. */
    targetDate   : TARGET_DATE
  };

})();
