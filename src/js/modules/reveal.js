// ============================================================
// reveal.js
//
// Анімація появи елементів при скролі. Підключає IntersectionObserver
// до елементів зі списку SELECTOR і додає клас .visible коли вони
// потрапляють у в'юпорт. Один раз на елемент.
//
// Підключити в app.js:
//   import { revealInit } from "@js/modules/reveal.js";
//   document.addEventListener("DOMContentLoaded", revealInit);
// ============================================================

const SELECTOR =
  '.hero-home__middle, .works-grid, .section-title, .work-card, .services-preview__list, .process__step, .facility-card, .team-card, .blog-card, .services__big, .services__big-item';

export function revealInit() {
  const revealEls = document.querySelectorAll(SELECTOR);
  if (!revealEls.length) return;

  revealEls.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
}
