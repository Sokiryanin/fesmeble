/**
 * 
Тепер можна регулювати трьома способами:
Глобально для всіх — в CSS/SCSS:
.kitchen-tl-item {
  --tl-duration: 1.2s;
}
На конкретний елемент — в HTML через data-атрибут:

<div class="kitchen-tl-item" data-tl-duration="1.5s">...</div>
<div class="kitchen-tl-item" data-tl-duration="0.3s">...</div>
Динамічно з JS — якщо потрібно розраховувати на льоту (наприклад, пропорційно висоті лінії):

item.style.setProperty('--tl-duration', '2s'); 
 * 
 */

const initTimelineItems = (selector, activeClass) => {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((item) => {
    const dur = item.dataset.tlDuration;
    if (dur) item.style.setProperty('--tl-duration', dur);
    obs.observe(item);
  });
};

export const initTimeline = () => {
  initTimelineItems('.kitchen-tl-item', 'kitchen-tl-item--active');
  initTimelineItems('.horeca-tl-item', 'horeca-tl-item--active');
};
