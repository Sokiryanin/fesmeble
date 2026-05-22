import './kitchen-service.scss';

export const initTimeline = () => {
  const items = document.querySelectorAll('.kitchen-tl-item');
  if (!items.length) return;

  console.log(items);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('--active');
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((item) => obs.observe(item));
};
