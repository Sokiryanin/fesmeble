/**
 * @param {object} opts
 * @param {HTMLElement|string} opts.track  - track element or its ID
 * @param {HTMLElement|string} [opts.prev] - prev button element or its ID
 * @param {HTMLElement|string} [opts.next] - next button element or its ID
 * @param {string} opts.itemSelector       - CSS selector for slide items
 * @param {number} [opts.gap=16]           - gap between items in px
 */
export const createSlider = ({ track, prev, next, itemSelector, gap = 16 }) => {
  const el = (ref) =>
    typeof ref === 'string' ? document.getElementById(ref) : ref;

  const trackEl = el(track);
  if (!trackEl) return;

  const prevBtn = el(prev);
  const nextBtn = el(next);
  const items = trackEl.querySelectorAll(itemSelector);
  if (!items.length) return;

  let current = 0;
  let startX = 0;
  let startPos = 0;
  let dragging = false;

  const itemW = () => items[0].offsetWidth + gap;
  const max = () => items.length - 1;

  const goTo = (idx) => {
    current = Math.min(Math.max(idx, 0), max());
    trackEl.style.transform = `translateX(-${current * itemW()}px)`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === max();
  };

  goTo(0);

  nextBtn?.addEventListener('click', () => goTo(current + 1));
  prevBtn?.addEventListener('click', () => goTo(current - 1));

  trackEl.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startPos = current * itemW();
    dragging = true;
    trackEl.setPointerCapture(e.pointerId);
    trackEl.style.transition = 'none';
  });

  trackEl.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    trackEl.style.transform = `translateX(${-startPos + (e.clientX - startX)}px)`;
  });

  trackEl.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    trackEl.style.transition = '';
    const diff = e.clientX - startX;
    goTo(
      Math.abs(diff) > 60 ? (diff < 0 ? current + 1 : current - 1) : current
    );
  });

  trackEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  window.addEventListener('resize', () => goTo(current));
};
