import './home.scss';

const el = document.querySelector('[data-years]');
if (el) {
  el.textContent = new Date().getFullYear() - 2022 + 1;
}
