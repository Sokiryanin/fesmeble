export const initTimeline = () => {
  const items = document.querySelectorAll('.kitchen-tl-item');
  if (!items.length) return;

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
