/* Sunbird — the only script on the site.
 *
 * Three jobs, none of which the page depends on to be readable: frost
 * the nav once it leaves the top, open the small-screen menu, and fade
 * sections in as they arrive. Everything degrades to plain HTML — the
 * `no-js` class on <html> is what keeps the reveal animation from
 * hiding content when this file fails to load.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- nav: frost on scroll ------------------------------------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var stick = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 12);
    };
    stick();
    window.addEventListener('scroll', stick, { passive: true });
  }

  /* --- nav: the small-screen menu -------------------------------------- */
  var burger = document.querySelector('.burger');
  var links = document.getElementById('nav-links');
  if (burger && links) {
    var close = function () {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) close();
    });
  }

  /* --- reveal on arrival ------------------------------------------------ */
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
    return;
  }

  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      seen.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach(function (el) { seen.observe(el); });
})();
