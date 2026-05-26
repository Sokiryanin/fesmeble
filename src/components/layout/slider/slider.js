/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import './slider.scss';
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
  // Список слайдерів
  // Перевіряємо, чи є слайдер на сторінці
  if (document.querySelector('[data-fls-slider]')) {
    // <- Вказуємо склас потрібного слайдера
    // Створюємо слайдер

    new Swiper('[data-fls-slider]', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 300,

      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: '#GalleryPrev',
        nextEl: '#GalleryNext'
      },

      // 769px+ — показываем несколько слайдов
      breakpoints: {
        769: {
          slidesPerView: 'auto'
        }
      },

      on: {}
    });
  }
}
document.querySelector('[data-fls-slider]')
  ? window.addEventListener('load', initSliders)
  : null;
