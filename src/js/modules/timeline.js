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

export const initTimeline = () => {
  const items = document.querySelectorAll('.kitchen-tl-item');
  if (!items.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kitchen-tl-item--active');
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
