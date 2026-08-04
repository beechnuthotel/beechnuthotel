/**
 * ============================================================
 * BEECHNUT HOTEL EFFURUN — Global JavaScript
 * main.js | Version 1.0
 * Pure vanilla JS — no external dependencies
 * ============================================================
 */

(function () {
  'use strict';

  /* ─── CONSTANTS ─────────────────────────────────────────── */
  const WHATSAPP_NUMBER = '[HOTEL_WHATSAPP_NUMBER]'; // e.g. "2348012345678"
  const WHATSAPP_MESSAGE = encodeURIComponent('Hello, I would like to make a reservation at Beechnut Hotel Effurun.');
  const SCROLL_THRESHOLD = 60; // px before navbar becomes solid

  /* ─── DOM READY HELPER ──────────────────────────────────── */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* ============================================================
     1. STICKY NAVBAR
        - Transparent over hero
        - Solid navy (.scrolled) once user scrolls past threshold
     ============================================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Run once on load to handle refreshes mid-page
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ============================================================
     2. MOBILE HAMBURGER MENU
        - Toggles .mobile-nav.open
        - Animates hamburger bars into an X
        - Locks body scroll while open
        - Closes on nav link click or Escape key
     ============================================================ */
  function initMobileMenu() {
    const hamburger  = document.querySelector('.navbar__hamburger');
    const mobileNav  = document.querySelector('.mobile-nav');
    const closeBtn   = document.querySelector('.mobile-nav__close');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (!hamburger || !mobileNav) return;

    function openMenu() {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
      animateHamburger(true);
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      animateHamburger(false);
    }

    function animateHamburger(isOpen) {
      const bars = hamburger.querySelectorAll('span');
      if (bars.length < 3) return;
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    }

    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on backdrop click (outside .mobile-nav__inner if it exists)
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) closeMenu();
    });
  }

  /* ============================================================
     3. ACTIVE NAV LINK DETECTION
        - Compares current page URL path with each link's href
        - Adds .active class to the matching link (desktop + mobile)
     ============================================================ */
  function initActiveNavLinks() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

    const allNavLinks = document.querySelectorAll(
      '.navbar__link, .mobile-nav__link'
    );

    allNavLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalise: strip trailing slash, handle root
      const linkPath = href.split('?')[0].replace(/\/$/, '') || '/';

      // Exact match, or the current path starts with the link path
      // (handles section sub-pages) — root ('/') only matches exactly
      const isActive =
        linkPath === currentPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath));

      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     4. SCROLL REVEAL ANIMATION
        - Observes elements with .reveal class
        - Adds .visible once element enters viewport
        - Unobserves after first reveal (fire-once)
     ============================================================ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything immediately
      revealEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     5. WHATSAPP FLOATING BUTTON
        - Injected programmatically so it's available on every page
          without repeating markup in every HTML file
        - Links to the hotel WhatsApp with a pre-filled message
     ============================================================ */
  function initWhatsAppButton() {
    // Avoid duplicate injection
    if (document.querySelector('.whatsapp-btn')) return;

    const whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + WHATSAPP_MESSAGE;

    const btn = document.createElement('a');
    btn.href             = whatsappURL;
    btn.target           = '_blank';
    btn.rel              = 'noopener noreferrer';
    btn.className        = 'whatsapp-btn';
    btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
    btn.setAttribute('title',      'Chat with us on WhatsApp');

    // WhatsApp SVG icon
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span class="whatsapp-btn__tooltip">Chat with us</span>
    `;

    document.body.appendChild(btn);

    // Subtle entrance animation
    btn.style.opacity   = '0';
    btn.style.transform = 'scale(0.6)';
    btn.style.transition = 'opacity 0.4s ease 1.2s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        btn.style.opacity   = '1';
        btn.style.transform = 'scale(1)';
      });
    });
  }

  /* ============================================================
     6. SMOOTH SCROLLING
        - Intercepts clicks on anchor links (#section)
        - Offsets scroll by navbar height
     ============================================================ */
  function initSmoothScroll() {
    const NAV_HEIGHT = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
      10
    );

    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({ top: top, behavior: 'smooth' });

      // Update URL hash without jumping
      history.pushState(null, '', targetId);
    });
  }

  /* ============================================================
     7. INLINE ONCLICK HELPERS
        Exposed on window so HTML onclick="" attributes can reach them.
     ============================================================ */

  /**
   * Scroll to a CSS selector with optional offset override.
   * Usage: onclick="scrollTo('#rooms')"
   */
  window.scrollToSection = function (selector, extraOffset) {
    const target = document.querySelector(selector);
    if (!target) return;
    const NAV_HEIGHT = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
      10
    );
    const offset = NAV_HEIGHT + (extraOffset || 0);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  };

  /**
   * Open a named modal by id.
   * Usage: onclick="openModal('booking-modal')"
   */
  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');

    // Close on backdrop click
    modal.addEventListener('click', function handler(e) {
      if (e.target === modal) {
        window.closeModal(id);
        modal.removeEventListener('click', handler);
      }
    });
  };

  /**
   * Close a named modal by id.
   * Usage: onclick="closeModal('booking-modal')"
   */
  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
  };

  /**
   * Toggle a CSS class on any element.
   * Usage: onclick="toggleClass('#sidebar', 'open')"
   */
  window.toggleClass = function (selector, className) {
    const el = document.querySelector(selector);
    if (el) el.classList.toggle(className);
  };

  /**
   * Copy text to the clipboard (e.g. hotel address, email).
   * Usage: onclick="copyToClipboard('hello@beechnuthotel.com', this)"
   */
  window.copyToClipboard = function (text, triggerEl) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      if (!triggerEl) return;
      const original = triggerEl.textContent;
      triggerEl.textContent = 'Copied!';
      setTimeout(function () { triggerEl.textContent = original; }, 1800);
    });
  };

  /* ============================================================
     8. FILTER TABS
        - Generic handler for .filter-bar > .filter-btn
        - data-filter attribute on button, data-category on cards
     ============================================================ */
  function initFilterBars() {
    const filterBars = document.querySelectorAll('.filter-bar');

    filterBars.forEach(function (bar) {
      const btns = bar.querySelectorAll('.filter-btn');

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Update active state
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          const filter  = btn.dataset.filter || 'all';
          const scope   = bar.dataset.scope;
          const parent  = scope ? document.querySelector(scope) : bar.closest('section') || document;
          const items   = parent ? parent.querySelectorAll('[data-category]') : [];

          items.forEach(function (item) {
            const cat = item.dataset.category || '';
            const show = filter === 'all' || cat.split(' ').includes(filter);
            item.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  /* ============================================================
     9. CAROUSEL
        - Handles .carousel > .carousel__track > items
        - Controlled by .carousel__btn[data-dir="prev|next"]
     ============================================================ */
  function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(function (carousel) {
      const track   = carousel.querySelector('.carousel__track');
      const prevBtn = carousel.querySelector('.carousel__btn[data-dir="prev"]');
      const nextBtn = carousel.querySelector('.carousel__btn[data-dir="next"]');
      if (!track) return;

      let index = 0;

      function getItemWidth() {
        const item = track.children[0];
        if (!item) return 0;
        const style = getComputedStyle(track);
        const gap   = parseFloat(style.gap) || 0;
        return item.offsetWidth + gap;
      }

      function move(dir) {
        const total    = track.children.length;
        const visible  = Math.round(carousel.offsetWidth / getItemWidth()) || 1;
        const maxIndex = Math.max(0, total - visible);

        index = Math.min(Math.max(index + dir, 0), maxIndex);
        track.style.transform = 'translateX(-' + (index * getItemWidth()) + 'px)';
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { move(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { move(1); });

      // Touch / swipe support
      let touchStartX = 0;
      track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', function (e) {
        const dx = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) move(dx > 0 ? 1 : -1);
      }, { passive: true });
    });
  }

  /* ============================================================
     10. LIGHTBOX
         - Opens on click of [data-lightbox] images
         - Supports prev/next within a named group
         - Keyboard: ← → arrows, Escape
     ============================================================ */
  function initLightbox() {
    const lightbox   = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lbImg      = lightbox.querySelector('.lightbox__img');
    const lbCaption  = lightbox.querySelector('.lightbox__caption');
    const lbClose    = lightbox.querySelector('.lightbox__close');
    const lbPrev     = lightbox.querySelector('.lightbox__prev');
    const lbNext     = lightbox.querySelector('.lightbox__next');

    let currentGroup = [];
    let currentIndex = 0;

    function openLightbox(items, idx) {
      currentGroup = items;
      currentIndex = idx;
      showImage();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showImage() {
      const item = currentGroup[currentIndex];
      if (!item || !lbImg) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt || '';
      if (lbCaption) lbCaption.textContent = item.caption || item.alt || '';
      if (lbPrev) lbPrev.style.display = currentIndex > 0 ? '' : 'none';
      if (lbNext) lbNext.style.display = currentIndex < currentGroup.length - 1 ? '' : 'none';
    }

    function prev() { if (currentIndex > 0) { currentIndex--; showImage(); } }
    function next() { if (currentIndex < currentGroup.length - 1) { currentIndex++; showImage(); } }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click', prev);
    if (lbNext)  lbNext.addEventListener('click', next);

    // Backdrop click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    });

    // Delegate click to [data-lightbox] triggers
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-lightbox]');
      if (!trigger) return;

      const groupName = trigger.dataset.lightbox;
      const groupEls  = groupName
        ? document.querySelectorAll('[data-lightbox="' + groupName + '"]')
        : [trigger];

      const items = Array.from(groupEls).map(function (el) {
        const img = el.tagName === 'IMG' ? el : el.querySelector('img');
        return {
          src:     el.dataset.lightboxSrc || (img ? img.src : ''),
          alt:     el.dataset.lightboxAlt || (img ? img.alt : ''),
          caption: el.dataset.lightboxCaption || '',
        };
      });

      const idx = Array.from(groupEls).indexOf(trigger);
      openLightbox(items, Math.max(idx, 0));
    });
  }

  /* ============================================================
     11. COUNTDOWN TIMER
         - Targets elements with id="countdown" and data-target="ISO date"
     ============================================================ */
  function initCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');

    countdowns.forEach(function (el) {
      const targetDate = new Date(el.dataset.countdown).getTime();
      if (isNaN(targetDate)) return;

      const daysEl  = el.querySelector('[data-unit="days"]');
      const hoursEl = el.querySelector('[data-unit="hours"]');
      const minsEl  = el.querySelector('[data-unit="minutes"]');
      const secsEl  = el.querySelector('[data-unit="seconds"]');

      function pad(n) { return String(n).padStart(2, '0'); }

      function tick() {
        const diff = targetDate - Date.now();
        if (diff <= 0) { clearInterval(timer); return; }

        const days  = Math.floor(diff / 864e5);
        const hours = Math.floor((diff % 864e5) / 36e5);
        const mins  = Math.floor((diff % 36e5) / 6e4);
        const secs  = Math.floor((diff % 6e4) / 1e3);

        if (daysEl)  daysEl.textContent  = pad(days);
        if (hoursEl) hoursEl.textContent = pad(hours);
        if (minsEl)  minsEl.textContent  = pad(mins);
        if (secsEl)  secsEl.textContent  = pad(secs);
      }

      tick();
      const timer = setInterval(tick, 1000);
    });
  }

  /* ============================================================
     12. FORM HELPERS
         - Newsletter subscribe (visual feedback only)
         - Generic form validation guard
     ============================================================ */
  function initForms() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.footer__newsletter-form, [data-newsletter-form]');

    newsletterForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input   = form.querySelector('input[type="email"], .footer__newsletter-input');
        const success = form.parentElement.querySelector('.form-success');

        if (!input || !input.value.trim()) return;

        // Replace form with success message
        form.style.display = 'none';
        if (success) {
          success.classList.add('visible');
          success.textContent = 'Thank you! You\'re on the list.';
        }
      });
    });

    // Generic required-field guard for contact / booking forms
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        let valid = true;

        form.querySelectorAll('[required]').forEach(function (field) {
          field.classList.remove('field--error');
          if (!field.value.trim()) {
            field.classList.add('field--error');
            field.style.borderColor = '#DC2626';
            valid = false;
          } else {
            field.style.borderColor = '';
          }
        });

        if (!valid) {
          e.preventDefault();
          const first = form.querySelector('.field--error');
          if (first) first.focus();
        }
      });
    });
  }

  /* ============================================================
     13. BOOKING PROGRESS BAR
         Expose helper so booking pages can drive progress steps.
     ============================================================ */
  window.setBookingStep = function (stepNumber) {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach(function (step, i) {
      step.classList.remove('active', 'completed');
      const n = i + 1;
      if (n < stepNumber)  step.classList.add('completed');
      if (n === stepNumber) step.classList.add('active');
    });
  };

  /* ============================================================
     14. BACK TO TOP
         Inject a back-to-top button that appears after scroll.
     ============================================================ */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className   = 'back-to-top';
    btn.innerHTML   = '&#8593;';
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = [
      'position:fixed',
      'bottom:96px',            // sits above WhatsApp button
      'right:var(--sp-4,2rem)',
      'width:44px',
      'height:44px',
      'border-radius:50%',
      'border:1.5px solid var(--accent)',
      'background:var(--primary)',
      'color:var(--accent)',
      'font-size:1.25rem',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'cursor:pointer',
      'opacity:0',
      'pointer-events:none',
      'transition:opacity 0.3s ease,transform 0.3s ease',
      'z-index:899',
      'line-height:1',
    ].join(';');

    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      const show = window.scrollY > 500;
      btn.style.opacity        = show ? '1' : '0';
      btn.style.pointerEvents  = show ? 'auto' : 'none';
      btn.style.transform      = show ? 'translateY(0)' : 'translateY(12px)';
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     15. LAZY IMAGES
         Defers off-screen images using IntersectionObserver.
         Usage: <img data-src="image.jpg" class="lazy">
     ============================================================ */
  function initLazyImages() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if (!lazyImgs.length) return;

    if (!('IntersectionObserver' in window)) {
      lazyImgs.forEach(function (img) {
        img.src = img.dataset.src;
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImgs.forEach(function (img) { observer.observe(img); });
  }

  /* ============================================================
     INIT — Run everything when the DOM is ready
     ============================================================ */
  ready(function () {
    initNavbar();
    initMobileMenu();
    initActiveNavLinks();
    initScrollReveal();
    initWhatsAppButton();
    initSmoothScroll();
    initFilterBars();
    initCarousels();
    initLightbox();
    initCountdowns();
    initForms();
    initBackToTop();
    initLazyImages();
  });

})();