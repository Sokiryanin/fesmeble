export function tabsInit() {
  const worksTabs = document.getElementById('worksTabs');
  const worksGrid = document.getElementById('worksGrid');

  if (!worksTabs || !worksGrid) return;

  const buttons = worksTabs.querySelectorAll('.works-tabs__tab');
  const cards = worksGrid.querySelectorAll('.work-card');

  // =========================
  // 📊 Подсчёт карточек
  // =========================
  const counts = {};

  cards.forEach((card) => {
    const cat = card.dataset.cat;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  buttons.forEach((btn) => {
    const cat = btn.dataset.cat;
    const countEl = btn.querySelector('.works-tabs__count');

    if (!countEl) return;

    if (cat === 'all') {
      countEl.textContent = `· ${cards.length}`;
    } else {
      countEl.textContent = `· ${counts[cat] || 0}`;
    }
  });

  // =========================
  // 🎬 Фильтрация + анимация
  // =========================
  function filterCards(cat) {
    const visible = [];

    cards.forEach((card) => {
      const match = cat === 'all' || card.dataset.cat === cat;

      if (match) {
        card.classList.remove('hidden');
        visible.push(card);
      } else {
        card.classList.add('hidden');
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
      }
    });

    // stagger animation (Awwwards style)
    visible.forEach((card, i) => {
      card.style.willChange = 'transform, opacity';
      card.style.transition =
        'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transitionDelay = `${i * 40}ms`;

      requestAnimationFrame(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // =========================
  // 🖱️ Событие
  // =========================
  worksTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.works-tabs__tab');
    if (!btn) return;

    const cat = btn.dataset.cat;

    buttons.forEach((b) => b.classList.remove('works-tabs__tab--active'));
    btn.classList.add('works-tabs__tab--active');

    filterCards(cat);
  });

  // =========================
  // 🚀 init
  // =========================
  filterCards('all');
}
