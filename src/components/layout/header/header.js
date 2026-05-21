import './header.scss';

// ── Анімація появи та відновлення compositing ──
const header = document.querySelector('[data-fls-header]');
const mobileCta = document.getElementById('mobileCta');

function revealHeader() {
  header.style.opacity = '1';
  header.style.animation = 'none';
  // Знімаємо FOUC-guard з .mobile-cta разом з хедером
  if (mobileCta) mobileCta.classList.add('is-ready');
}

if (header) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealHeader();
  } else {
    // Після завершення анімації знімаємо її з елемента — header виходить з isolated
    // compositing group, backdrop-filter на .menu__body знову бачить контент сторінки.
    // Inline opacity:1 перекриває FOUC-guard (<style>.header{opacity:0}</style>).
    header.addEventListener('animationend', revealHeader, { once: true });
  }

  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('header--scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

// ── Ховання floating mobile CTA коли футер у в'юпорті ──
const footerEl = document.querySelector('.footer');
if (mobileCta && footerEl) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        mobileCta.classList.toggle('hidden', entry.isIntersecting);
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0 }
  );
  footerObserver.observe(footerEl);
}
