/* ===================================================================
   SKO FY27 — Option 02 "Clean Editorial"
   ES5 IIFE — all interactive features
   =================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------
     Utility: safe querySelector helpers
     ----------------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* =================================================================
     1. Mobile Navigation (drawer)
     ================================================================= */
  function initMobileNav() {
    var toggle = $('.mobile-nav-toggle');
    var overlay = $('.mobile-nav-overlay');
    var drawer = $('.mobile-nav-drawer');
    if (!toggle || !drawer) return;

    function open() {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('is-open');
      isOpen ? close() : open();
    });

    if (overlay) overlay.addEventListener('click', close);

    // Close on link click
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', close);
    });
  }

  /* =================================================================
     2. Active Nav Link
     ================================================================= */
  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page) a.classList.add('is-active');
    });
    // Also for mobile drawer
    $$('.mobile-nav-drawer a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page) a.classList.add('is-active');
    });
  }

  /* =================================================================
     3. Agenda Day Tabs
     ================================================================= */
  function initDayTabs() {
    var tabs = $$('.day-tab');
    var panels = $$('.day-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');

        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });

        tab.classList.add('is-active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  /* =================================================================
     4. Session Card Expand (Agenda)
     ================================================================= */
  function initSessionExpand() {
    $$('.session-card').forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('is-expanded');
      });
    });
  }

  /* =================================================================
     5. FAQ Accordion
     ================================================================= */
  function initFaqAccordion() {
    $$('.faq-question').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.parentElement;
        var wasOpen = item.classList.contains('is-open');

        // Close all
        $$('.faq-item').forEach(function (fi) { fi.classList.remove('is-open'); });

        // Toggle clicked
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  /* =================================================================
     6. TOC Scroll-Spy
     ================================================================= */
  function initTocScrollSpy() {
    var tocLinks = $$('.toc-sidebar a');
    if (!tocLinks.length) return;

    var sections = [];
    tocLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        var sec = document.getElementById(href.substring(1));
        if (sec) sections.push({ el: sec, link: link });
      }
    });

    if (!sections.length) return;

    var navHeight = 64; // var(--nav-height)

    function onScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var active = null;

      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= navHeight + 40) {
          active = sections[i];
        }
      }

      tocLinks.forEach(function (l) { l.classList.remove('is-active'); });
      if (active) active.link.classList.add('is-active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* =================================================================
     7. Countdown Timer
     ================================================================= */
  function initCountdown() {
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minutesEl = document.getElementById('cd-minutes');
    var secondsEl = document.getElementById('cd-seconds');
    if (!daysEl) return;

    // Target date: adjust as needed
    var target = new Date('2027-02-14T08:00:00-08:00').getTime();

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function tick() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);

      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minutesEl.textContent = pad(m);
      secondsEl.textContent = pad(s);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* =================================================================
     8. Scroll Animations (IntersectionObserver)
     ================================================================= */
  function initScrollAnimations() {
    var elements = $$('[data-animate]');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(function (el) { observer.observe(el); });
    } else {
      // Fallback: show all
      elements.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* =================================================================
     9. Footer Year
     ================================================================= */
  function initFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* =================================================================
     10. Login Modal
     ================================================================= */
  function initLoginModal() {
    var overlay = $('#loginModal');
    if (!overlay) return;

    $$('[data-open-login], [data-open-login-form]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('is-open');
      });
    });

    $$('[data-close-login]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        overlay.classList.remove('is-open');
      });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        overlay.classList.remove('is-open');
      }
    });
  }

  /* =================================================================
     Boot
     ================================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initActiveNav();
    initDayTabs();
    initSessionExpand();
    initFaqAccordion();
    initTocScrollSpy();
    initCountdown();
    initScrollAnimations();
    initFooterYear();
    initLoginModal();
  });

})();
