import './works.scss';

// ============ DETECT LANGUAGE ============
const htmlLang = (document.documentElement.lang || '').toLowerCase();
const isUkrainian =
  htmlLang.startsWith('uk') ||
  htmlLang.startsWith('ua') ||
  window.location.pathname.includes('/ua/');

const lang = isUkrainian ? 'uk' : 'pl';

// ============ DATA SOURCE ============
const DATA_URL = `${isUkrainian ? '../' : ''}data/projects.${lang}.json`;

// ============ DOM REFS ============
const worksGrid = document.getElementById('worksGrid');
const worksTabs = document.getElementById('worksTabs');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalGallery = document.getElementById('modalGallery');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalDots = document.getElementById('modalDots');
const modalCounter = document.getElementById('modalCounter');
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSpecs = document.getElementById('modalSpecs');
const modalChips = document.getElementById('modalChips');

let projects = [];
let currentProject = null;
let currentImgIdx = 0;
let currentFilter = 'all';

// ============ SKELETON (на час завантаження) ============
function renderSkeleton(count = 6) {
  worksGrid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'work-card work-card--skeleton';
    skeleton.innerHTML = `
      <div class="work-card__img">
        <div class="work-card__img-inner work-card__skeleton-img"></div>
      </div>
      <div class="work-card__meta">
        <div>
          <div class="work-card__skeleton-line work-card__skeleton-line--title"></div>
          <div class="work-card__skeleton-line work-card__skeleton-line--tag"></div>
        </div>
      </div>
    `;
    worksGrid.appendChild(skeleton);
  }
}

// ============ RENDER CARDS ============
function renderCards(data) {
  worksGrid.innerHTML = '';

  if (data.length === 0) {
    worksGrid.innerHTML = `
      <p class="works-grid__empty">
        ${
          isUkrainian
            ? 'У цій категорії поки немає проєктів.'
            : 'W tej kategorii nie ma jeszcze projektów.'
        }
      </p>
    `;
    return;
  }

  data.forEach((project, idx) => {
    const article = document.createElement('article');
    article.className = 'work-card';
    article.dataset.cat = project.category;
    article.dataset.projectId = project.id;
    article.setAttribute('role', 'button');
    article.setAttribute('tabindex', '0');
    article.setAttribute(
      'aria-label',
      isUkrainian
        ? `Відкрити проєкт: ${project.title}, ${project.cat}`
        : `Otwórz projekt: ${project.title}, ${project.cat}`
    );

    // Затримка для стаггер-анімації появи
    article.style.setProperty('--card-delay', `${idx * 40}ms`);

    const overlayText = isUkrainian ? 'подивитись проєкт' : 'zobacz projekt';

    article.innerHTML = `
      <div class="work-card__img">
        <div class="work-card__img-inner">
          <img
            src="${project.cover}"
            alt="${project.coverAlt}"
            loading="lazy"
            decoding="async"
            width="900"
            height="675"
          />
        </div>
        <div class="work-card__overlay">
          ${overlayText}
          <svg aria-hidden="true" width="14" height="14">
            <use href="#i-arrow-right" />
          </svg>
        </div>
      </div>
      <div class="work-card__meta">
        <div>
          <h3 class="work-card__title">${project.title}</h3>
          <div class="work-card__tag">${project.tagShort}</div>
        </div>
        <div class="work-card__arrow">
          <svg aria-hidden="true" width="18" height="18">
            <use href="#i-arrow-diag" />
          </svg>
        </div>
      </div>
    `;

    const open = () => openModal(project);
    article.addEventListener('click', open);
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    worksGrid.appendChild(article);
  });

  worksGrid.setAttribute('aria-busy', 'false');
}

// ============ TABS / FILTERS ============
function updateTabCounts() {
  const tabs = worksTabs.querySelectorAll('.works-tabs__tab');
  tabs.forEach((tab) => {
    const cat = tab.dataset.cat;
    const count =
      cat === 'all'
        ? projects.length
        : projects.filter((p) => p.category === cat).length;

    const countEl = tab.querySelector('.works-tabs__count');
    if (countEl) countEl.textContent = count;
  });
}

function applyFilter(filter) {
  currentFilter = filter;
  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  renderCards(filtered);
}

function setupTabs() {
  const tabs = worksTabs.querySelectorAll('.works-tabs__tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('works-tabs__tab--active'));
      tab.classList.add('works-tabs__tab--active');
      applyFilter(tab.dataset.cat);
    });
  });
}

// ============ LOAD DATA ============
async function loadProjects() {
  renderSkeleton(6);

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    projects = await response.json();

    updateTabCounts();
    applyFilter(currentFilter);
    setupTabs();
  } catch (err) {
    console.error('Помилка завантаження проєктів:', err);
    worksGrid.innerHTML = `
      <p class="works-grid__error">
        ${
          isUkrainian
            ? 'Не вдалося завантажити проєкти. Спробуйте оновити сторінку.'
            : 'Nie udało się załadować projektów. Spróbuj odświeżyć stronę.'
        }
      </p>
    `;
    worksGrid.setAttribute('aria-busy', 'false');
  }
}

// ============ MODAL ============
function renderGallery() {
  if (!currentProject) return;
  modalGallery
    .querySelectorAll('.project-modal__gallery-img')
    .forEach((i) => i.remove());

  currentProject.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.className =
      'project-modal__gallery-img' + (i === currentImgIdx ? ' active' : '');
    img.src = src;
    img.alt = isUkrainian
      ? `${currentProject.title} — фото ${i + 1} з ${currentProject.images.length}`
      : `${currentProject.title} — zdjęcie ${i + 1} z ${currentProject.images.length}`;
    img.decoding = 'async';
    img.loading = i === 0 ? 'eager' : 'lazy';
    modalGallery.prepend(img);
  });

  modalDots.innerHTML = '';
  currentProject.images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className =
      'project-modal__dot' + (i === currentImgIdx ? ' active' : '');
    dot.setAttribute(
      'aria-label',
      isUkrainian ? `Перейти до фото ${i + 1}` : `Przejdź do zdjęcia ${i + 1}`
    );
    dot.onclick = () => {
      currentImgIdx = i;
      updateGallery();
    };
    modalDots.appendChild(dot);
  });
  updateGallery();
}

function updateGallery() {
  if (!currentProject) return;
  modalGallery
    .querySelectorAll('.project-modal__gallery-img')
    .forEach((img, i) => {
      const actualIdx = currentProject.images.length - 1 - i;
      img.classList.toggle('active', actualIdx === currentImgIdx);
    });
  modalDots
    .querySelectorAll('.project-modal__dot')
    .forEach((d, i) => d.classList.toggle('active', i === currentImgIdx));
  modalCounter.textContent =
    currentImgIdx + 1 + ' / ' + currentProject.images.length;
}

function openModal(project) {
  currentProject = project;
  currentImgIdx = 0;
  modalCat.textContent = project.cat;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalSpecs.innerHTML = '';
  Object.entries(project.specs).forEach(([k, v]) => {
    const row = document.createElement('div');
    row.className = 'project-modal__spec-row';
    row.innerHTML = `<span>${k}</span><span>${v}</span>`;
    modalSpecs.appendChild(row);
  });

  modalChips.innerHTML = '';
  const specEntries = Object.entries(project.specs).slice(0, 2);
  specEntries.forEach(([k, v]) => {
    const chip = document.createElement('div');
    chip.className = 'project-modal__chip';
    chip.innerHTML = `${k} · <span class="project-modal__chip-value">${v}</span>`;
    modalChips.appendChild(chip);
  });

  renderGallery();
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('project-modal--open');
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('project-modal--open');
}
window.closeModal = closeModal;

// ============ HOME PAGE PREVIEW CARDS (a11y only) ============
document.querySelectorAll('.work-card[onclick]').forEach((card) => {
  if (card.hasAttribute('aria-label')) return;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  const title = card.querySelector('.work-card__title');
  if (title)
    card.setAttribute(
      'aria-label',
      isUkrainian
        ? `Переглянути проєкт: ${title.textContent}`
        : `Zobacz projekt: ${title.textContent}`
    );
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ============ MODAL EVENTS ============
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
modalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!currentProject) return;
  currentImgIdx =
    (currentImgIdx - 1 + currentProject.images.length) %
    currentProject.images.length;
  updateGallery();
});
modalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!currentProject) return;
  currentImgIdx = (currentImgIdx + 1) % currentProject.images.length;
  updateGallery();
});

// keyboard nav
document.addEventListener('keydown', (e) => {
  if (!modalBackdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') modalPrev.click();
  if (e.key === 'ArrowRight') modalNext.click();
});

// Swipe gestures on gallery (mobile)
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;
modalGallery.addEventListener(
  'touchstart',
  (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
  },
  { passive: true }
);
modalGallery.addEventListener(
  'touchmove',
  () => {
    touchMoved = true;
  },
  { passive: true }
);
modalGallery.addEventListener(
  'touchend',
  (e) => {
    if (!touchMoved || !currentProject) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        currentImgIdx = (currentImgIdx + 1) % currentProject.images.length;
      } else {
        currentImgIdx =
          (currentImgIdx - 1 + currentProject.images.length) %
          currentProject.images.length;
      }
      updateGallery();
    }
  },
  { passive: true }
);

// ============ INIT ============
loadProjects();
