export const initYearCounter = (selector = '[data-years]') => {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = new Date().getFullYear() - 2022 + 1;
  });
};
