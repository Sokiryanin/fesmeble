import './horeca.scss';

// ── Сегментні таби
const initSegmentTabs = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const btns = container.querySelectorAll('[role="tab"]');
  const panels = container.querySelectorAll('[role="tabpanel"]');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => {
        b.classList.remove(
          'horeca-tabs__btn--active',
          'horeca-mat-tabs__btn--active'
        );
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => {
        p.hidden = true;
      });

      btn.classList.add(
        containerId === 'horecaMatTabs'
          ? 'horeca-mat-tabs__btn--active'
          : 'horeca-tabs__btn--active'
      );
      btn.setAttribute('aria-selected', 'true');

      const target = document.getElementById(btn.getAttribute('aria-controls'));
      if (target) target.hidden = false;
    });
  });
};
