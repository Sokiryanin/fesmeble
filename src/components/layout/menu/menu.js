// Підключення функціоналу "Чортоги Фрілансера"
import { bodyLockStatus, bodyLockToggle } from '@js/common/functions.js';

import './menu.scss';

export function menuInit() {
  const mobileCta = document.getElementById('mobileCta');

  function isFooterVisible() {
    const footer = document.querySelector('.footer');
    if (!footer) return false;
    return footer.getBoundingClientRect().top < window.innerHeight - 40;
  }

  function ctaHide() {
    if (mobileCta) mobileCta.classList.add('hidden');
  }

  function ctaShow() {
    if (mobileCta && !isFooterVisible()) mobileCta.classList.remove('hidden');
  }

  // Toggle меню по бургеру
  document.addEventListener('click', function (e) {
    if (bodyLockStatus && e.target.closest('[data-fls-menu]')) {
      bodyLockToggle();
      document.documentElement.toggleAttribute('data-fls-menu-open');

      // ── ДОДАТИ: оновлюємо aria-expanded на бургері ──
      const burger = e.target.closest('[data-fls-menu]');
      const isOpen =
        document.documentElement.hasAttribute('data-fls-menu-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // ваша попередня логіка ctaHide/ctaShow
      isOpen ? ctaHide() : ctaShow();
    }
  });

  // Авто-закриття при кліку на пункт меню (коли воно відкрите)
  document.addEventListener('click', function (e) {
    const link = e.target.closest('.menu__link, .menu__cta');
    if (!link) return;
    if (!document.documentElement.hasAttribute('data-fls-menu-open')) return;

    bodyLockToggle();
    document.documentElement.removeAttribute('data-fls-menu-open');

    // ── ДОДАТИ: ──
    const burger = document.querySelector('[data-fls-menu]');
    if (burger) burger.setAttribute('aria-expanded', 'false');

    ctaShow();
  });

  // Авто-закриття при resize вище брейкпоінта tablet
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (
        window.innerWidth > 1024 &&
        document.documentElement.hasAttribute('data-fls-menu-open')
      ) {
        bodyLockToggle();
        document.documentElement.removeAttribute('data-fls-menu-open');
        ctaShow();
      }
    }, 100);
  });
}

document.querySelector('[data-fls-menu]')
  ? window.addEventListener('load', menuInit)
  : null;
