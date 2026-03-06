(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  /* ── Login Modal ─────────────────────────────── */
  function setupLoginModal() {
    var overlay = qs('#loginModal');
    if (!overlay) return;

    qsa('[data-open-login], [data-open-login-form]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('is-open');
      });
    });

    qsa('[data-close-login]').forEach(function (btn) {
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

  /* ── Mobile Sidebar Nav ──────────────────────── */
  function setupMobileNav() {
    var toggle = qs('.mobile-nav-toggle');
    var sidebar = qs('.sidebar');
    var overlay = qs('.sidebar-overlay');
    if (!toggle || !sidebar) return;

    function open() {
      sidebar.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      sidebar.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      sidebar.classList.contains('is-open') ? close() : open();
    });

    if (overlay) overlay.addEventListener('click', close);

    // Close on nav link click
    qsa('.sidebar-nav a').forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ── Active Nav Highlighting ─────────────────── */
  function setupActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    qsa('.sidebar-nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path) {
        link.classList.add('is-active');
      }
    });
  }

  /* ── Agenda Day Tabs ─────────────────────────── */
  function setupDayTabs() {
    var tabs = qsa('.day-tab');
    var panels = qsa('.day-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var panel = qs('#' + target);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  /* ── Agenda Accordions ───────────────────────── */
  function setupAgendaAccordions() {
    qsa('.session-header').forEach(function (header) {
      header.addEventListener('click', function () {
        var session = header.closest('.session');
        var isOpen = session.classList.contains('is-open');
        // Close all in same panel
        qsa('.session', header.closest('.day-panel')).forEach(function (s) {
          s.classList.remove('is-open');
        });
        if (!isOpen) session.classList.add('is-open');
      });
    });
  }

  /* ── FAQ Accordions ──────────────────────────── */
  function setupFaqAccordions() {
    qsa('.faq-question').forEach(function (question) {
      question.addEventListener('click', function () {
        var item = question.closest('.faq-item');
        var isOpen = item.classList.contains('is-open');
        // Close all
        qsa('.faq-item').forEach(function (i) { i.classList.remove('is-open'); });
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  /* ── Countdown Timer ─────────────────────────── */
  function setupCountdown() {
    var daysEl = qs('#cd-days');
    var hoursEl = qs('#cd-hours');
    var minsEl = qs('#cd-minutes');
    var secsEl = qs('#cd-seconds');
    if (!daysEl) return;

    // Target: placeholder future date
    var target = new Date('2027-01-14T09:00:00-08:00').getTime();

    function update() {
      var now = Date.now();
      var diff = target - now;
      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minsEl.textContent = '0';
        secsEl.textContent = '0';
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      daysEl.textContent = String(d);
      hoursEl.textContent = String(h);
      minsEl.textContent = String(m);
      secsEl.textContent = String(s);
    }

    update();
    setInterval(update, 1000);
  }

  /* ── Scroll Animations ───────────────────────── */
  function setupScrollAnimations() {
    var els = qsa('[data-animate]');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Footer Year ─────────────────────────────── */
  function setYear() {
    var el = qs('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ── Init ────────────────────────────────────── */
  function init() {
    setupLoginModal();
    setupMobileNav();
    setupActiveNav();
    setupDayTabs();
    setupAgendaAccordions();
    setupFaqAccordions();
    setupCountdown();
    setupScrollAnimations();
    setYear();
  }

  document.addEventListener('DOMContentLoaded', init);
}());
