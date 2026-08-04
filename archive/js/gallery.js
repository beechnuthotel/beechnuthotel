'use strict';

/* ============================================================
   BEECHNUT HOTEL EFFURUN — Gallery JS
   gallery.js | Vanilla JS, no dependencies
   Features: Category filter + full-screen lightbox
   ============================================================ */

(function () {

  /* ── FILTER ─────────────────────────────────────────────── */
  function initFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items   = document.querySelectorAll('.gallery-item');

    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.dataset.filter;

        /* Active state */
        buttons.forEach(function (b) { b.classList.remove('filter-btn--active'); });
        btn.classList.add('filter-btn--active');

        /* Show / hide items */
        items.forEach(function (item) {
          const itemCat = item.querySelector('img') && item.querySelector('img').dataset.category;
          if (cat === 'all' || itemCat === cat) {
            item.classList.remove('gallery-item--hidden');
          } else {
            item.classList.add('gallery-item--hidden');
          }
        });
      });
    });
  }

  /* ── LIGHTBOX ───────────────────────────────────────────── */
  var lightboxImages = [];   /* [{src, caption, category}] */
  var currentIndex   = 0;
  var lightboxOpen   = false;

  function buildImageList() {
    lightboxImages = [];
    document.querySelectorAll('.gallery-item:not(.gallery-item--hidden) img').forEach(function (img) {
      lightboxImages.push({
        src:      img.src,
        caption:  img.dataset.caption  || '',
        category: img.dataset.category || '',
      });
    });
  }

  function openLightbox(img) {
    buildImageList();
    var src = img.src;
    currentIndex = lightboxImages.findIndex(function (i) { return i.src === src; });
    if (currentIndex < 0) currentIndex = 0;

    renderLightbox();
    var lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
      lightboxOpen = true;
      lb.focus();
    }
  }

  function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.remove('lightbox--open');
      document.body.style.overflow = '';
      lightboxOpen = false;
    }
  }

  function navigate(dir) {
    if (!lightboxImages.length) return;
    currentIndex = (currentIndex + dir + lightboxImages.length) % lightboxImages.length;
    renderLightbox();
  }

  function renderLightbox() {
    var item = lightboxImages[currentIndex];
    if (!item) return;

    var imgEl     = document.getElementById('lightbox-img');
    var captionEl = document.getElementById('lightbox-caption');
    var counterEl = document.getElementById('lightbox-counter');

    if (imgEl) {
      imgEl.classList.add('lightbox__img--loading');
      imgEl.onload = function () { imgEl.classList.remove('lightbox__img--loading'); };
      imgEl.src = item.src;
      imgEl.alt = item.caption;
    }
    if (captionEl) captionEl.textContent = item.caption;
    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + lightboxImages.length;
  }

  function initLightbox() {
    /* Inject lightbox HTML */
    var lb = document.createElement('div');
    lb.id            = 'lightbox';
    lb.className     = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image lightbox');
    lb.setAttribute('tabindex', '-1');
    lb.innerHTML = [
      '<div class="lightbox__overlay" id="lightbox-overlay"></div>',
      '<div class="lightbox__stage">',
      '  <button class="lightbox__btn lightbox__btn--close" id="lightbox-close" aria-label="Close lightbox">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">',
      '      <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>',
      '    </svg>',
      '  </button>',
      '  <button class="lightbox__btn lightbox__btn--prev" id="lightbox-prev" aria-label="Previous image">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">',
      '      <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lightbox__frame">',
      '    <img id="lightbox-img" class="lightbox__img" src="" alt="" />',
      '  </div>',
      '  <button class="lightbox__btn lightbox__btn--next" id="lightbox-next" aria-label="Next image">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">',
      '      <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lightbox__footer">',
      '    <span class="lightbox__caption" id="lightbox-caption"></span>',
      '    <span class="lightbox__counter" id="lightbox-counter"></span>',
      '  </div>',
      '</div>',
    ].join('\n');
    document.body.appendChild(lb);

    /* Button bindings */
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { navigate(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { navigate(1); });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    /* Touch swipe */
    var touchStartX = 0;
    lb.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function attachItemClicks() {
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { openLightbox(img); });
    });
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('gallery-item--visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.gallery-item').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initFilter();
    initLightbox();
    attachItemClicks();
    initScrollReveal();
  });

})();
