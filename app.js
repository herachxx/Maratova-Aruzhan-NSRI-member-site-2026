'use strict';

/* ─── Helpers ─── */
const $  = id  => document.getElementById(id);
const qs = sel => document.querySelector(sel);
const qa = sel => [...document.querySelectorAll(sel)];


/* ─────────────────────────────────────────────
   SIDE NAV
   Opens automatically. Toggle on button click.
   Desktop: shifts .site-wrap right.
   Mobile:  slides over content.
───────────────────────────────────────────── */
function initNav() {
  const trigger  = $('nav-trigger');
  const nav      = $('side-nav');
  const wrap     = $('site-wrap');

  if (!trigger || !nav) return;

  // Helper: are we on desktop?
  const isDesktop = () => window.innerWidth > 900;

  // Apply open state to all relevant elements
  function applyOpen() {
    trigger.classList.add('open');
    nav.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    if (isDesktop()) wrap?.classList.add('open');
  }

  function applyClose() {
    trigger.classList.remove('open');
    nav.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    wrap?.classList.remove('open');
  }

  // Open on load (body has class nav-is-open from HTML — just sync JS state)
  let isOpen = true;
  applyOpen();

  // Toggle on button click
  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    isOpen ? applyOpen() : applyClose();
  });

  // Close when clicking a nav link
  qa('.side-nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      // On mobile, close after navigating
      if (!isDesktop()) {
        isOpen = false;
        applyClose();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      applyClose();
    }
  });

  // On resize: if shrinking to mobile, remove push; if expanding to desktop, restore
  window.addEventListener('resize', () => {
    if (isOpen) {
      if (isDesktop()) wrap?.classList.add('open');
      else             wrap?.classList.remove('open');
    }
  }, { passive: true });
}


/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('progress-bar');
  if (!bar) return;

  function update() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ─────────────────────────────────────────────
   ACTIVE NAV LINK
───────────────────────────────────────────── */
function initActiveLink() {
  const sections = qa('section[id]');
  const links    = qa('.side-nav-links a');
  if (!links.length) return;

  function update() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 180) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ─────────────────────────────────────────────
   SCROLL REVEAL
   Elements with class="reveal" fade up as they
   enter the viewport.
───────────────────────────────────────────── */
function initReveal() {
  const els = qa('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -44px 0px' }
  );

  els.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   STAGGER — add delay to card groups
───────────────────────────────────────────── */
function initStagger() {
  const groups = [
    '.about-right .card',
    '.top-skills .skill-card',
    '.nsri-stats .nsri-stat',
    '.goals-grid .goal-card',
    '.contacts-grid .contact-card',
    '.join-grid .join-card',
    '.pathways-grid .pathway-card',
    '.timeline .timeline-item',
  ];

  groups.forEach(selector => {
    qa(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}


/* ─────────────────────────────────────────────
   SMOOTH SCROLL
───────────────────────────────────────────── */
function initSmoothScroll() {
  qa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 28;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}


/* ─────────────────────────────────────────────
   STAT COUNTERS
   Counts up numbers when they scroll into view.
───────────────────────────────────────────── */
function parseValue(text) {
  const s = text.replace(/[$,+]/g, '').trim();
  if (s.endsWith('K')) return parseFloat(s) * 1000;
  return parseFloat(s) || null;
}

function formatValue(original, value) {
  const rounded = Math.round(value);
  let out = '';
  if (original.includes('$')) out += '$';
  if (original.includes('K') && value >= 1000) {
    out += (value / 1000).toFixed(0) + 'K';
  } else if (original.includes(',')) {
    out += rounded.toLocaleString();
  } else {
    out += rounded.toString();
  }
  if (original.includes('+')) out += '+';
  return out;
}

function animateCounter(el) {
  const original = el.textContent.trim();
  const target   = parseValue(original);
  if (!target) return;

  const duration = 1400;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = formatValue(original, eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = original; // restore exact string
    }
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const els = qa('.stat-n, .nsri-n');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.6 }
  );

  els.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   PHOTO PARALLAX (desktop only)
───────────────────────────────────────────── */
function initParallax() {
  const photo = qs('.photo-wrap');
  if (!photo || window.matchMedia('(max-width: 900px)').matches) return;

  let rafPending = false;

  document.addEventListener('mousemove', e => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const rx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ry = (e.clientY / window.innerHeight - 0.5) * 2;
      photo.style.transform = `perspective(800px) rotateY(${rx * 3}deg) rotateX(${-ry * 2.2}deg)`;
      rafPending = false;
    });
  });

  document.addEventListener('mouseleave', () => {
    photo.style.transition = 'transform 0.55s ease';
    photo.style.transform  = '';
    setTimeout(() => { photo.style.transition = ''; }, 600);
  });
}


/* ─────────────────────────────────────────────
   INIT — run on DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollProgress();
  initActiveLink();
  initReveal();
  initStagger();
  initSmoothScroll();
  initCounters();
  initParallax();
});
