# FESMEBLE — пам'ятка по проєкту

> Підсумок усіх рішень і поточного стану розробки сайту, щоб за 2 хвилини відновити повний контекст.

---

## 1. Бізнес-контекст

**Бренд:** FESMEBLE  
**Місто:** Вроцлав, Польща  
**Сфера:** студія виготовлення вбудованих меблів на замовлення  
**На ринку з:** 2021 року  
**Основна мета сайту:** отримати телефонний дзвінок або заявку від клієнта для прорахунку проєкту  
**Цільова аудиторія:** приватні клієнти у Вроцлаві та Польщі загалом, плюс українська діаспора  
**Мови сайту:** польська (PL, root `/`) + українська (UA, `/ua/`)  
**Email:** hello@fesmeble.com  
**Telegram/Instagram:** @fesmeble  

---

## 2. Поточна версія коду

**Стек:** FLS Start 4.0 — Vite + PostHTML/Nunjucks + SCSS  
**Статус:** Прототип (`forma-furniture-v28.html`) повністю перенесено у компонентну структуру FLS Start. Сайт працює, сторінки зібрані.

**Кореневі HTML-сторінки** (`src/`):

| Сторінка            | Файл                      | Мова |
| ------------------- | ------------------------- | ---- |
| Головна             | `index.html`              | PL   |
| Проєкти             | `works.html`              | PL   |
| Сервіси             | `services.html`           | PL   |
| Про нас             | `about.html`              | PL   |
| Блог                | `blog.html`               | PL   |
| Контакти            | `contact.html`            | PL   |
| Стільниці (лендінг) | `countertops.html`        | PL   |
| Гардеробні (лендінг)| `wardrobe.html`           | PL   |
| Кухні (лендінг)     | `kitchen-service.html`    | PL   |
| Блог: гардеробні    | `blog-ward.html`          | PL   |
| Блог: фронти        | `blog-fronts.html`        | PL   |
| Блог: ергономіка    | `blog-ergo.html`          | PL   |
| Блог: мийка         | `blog-sink.html`          | PL   |
| Блог: стільниці     | `blog-countertops.html`   | PL   |
| Проєкт (шаблон)     | `projectpage/projectpage.html` | PL |

**UA-версія** (`src/ua/`):

| Сторінка  | Файл         |
| --------- | ------------ |
| Головна   | `index.html` |
| Проєкти   | `works.html` |

---

## 3. Структура сайту — сторінки

### Основні (PL + UA)

| #   | Сторінка  | Компонент                         | Призначення                                                       |
| --- | --------- | --------------------------------- | ----------------------------------------------------------------- |
| 1   | Головна   | `pages/home/home.html` (PL), `home-uk.html` (UA) | Hero, вибрані роботи, партнери, сервіси, CTA |
| 2   | Проєкти   | `pages/works/works.html` (PL), `works-uk.html` (UA) | Портфоліо з табами-категоріями                  |
| 3   | Сервіси   | `pages/services/`                 | 4 напрямки роботи у великих картках                               |
| 4   | Про нас   | `pages/about/`                    | Команда, виробництво, цех, цифри                                  |
| 5   | Блог      | `pages/blog/`                     | Сітка статей                                                      |
| 6   | Контакти  | `pages/contact/`                  | Розширена форма, шоурум, графік                                   |

### Сервісні лендінги (PL)

| Сторінка        | Компонент                    |
| --------------- | ---------------------------- |
| Стільниці       | `pages/countertops/`         |
| Гардеробні      | `pages/wardrobe/`            |
| Кухні           | `pages/kitchen-service/`     |

### Блог — окремі сторінки (PL)

| Стаття           | Компонент                    |
| ---------------- | ---------------------------- |
| Гардеробні       | `pages/blog-ward/`           |
| Фасади/фронти    | `pages/blog-fronts/`         |
| Ергономіка кухні | `pages/blog-ergo/`           |
| Мийка            | `pages/blog-sink/`           |
| Стільниці        | `pages/blog-countertops/`    |

**Категорії проєктів (таби на сторінці Роботи):** Всі / Кухні / Гардеробні / Шафи / Ванні / Комерційні / Офіси

---

## 4. Файлова структура (src/)

```
src/
├── index.html            (PL головна)
├── works.html
├── services.html
├── about.html
├── blog.html
├── contact.html
├── countertops.html      (лендінг)
├── wardrobe.html         (лендінг)
├── kitchen-service.html  (лендінг)
├── blog-*.html           (5 окремих статей блогу)
├── ua/
│   ├── index.html        (UA головна)
│   └── works.html        (UA проєкти)
├── assets/
│   └── img/
│       ├── partners/     (egger, kronospan, blum, Hettich, hafele, corian, swiss-krono — SVG)
│       ├── home/         (1-4.jpeg — hero фото)
│       ├── countertop/   (реальні фото стільниць)
│       ├── wardrobes/    (реальні фото гардеробних)
│       ├── kitchen-service/
│       └── blog-*/       (фото до статей блогу)
├── components/
│   ├── layout/
│   │   ├── header/       (header.html, header.js, header.scss)
│   │   ├── footer/       (footer.html, footer-uk.html, footer.js, footer.scss)
│   │   ├── menu/         (menu.html, menu.js, menu.json, menu.scss)
│   │   └── head/         (head.html, fonts-preload.html)
│   ├── pages/
│   │   ├── home/         (home.html, home-uk.html, home.js, home.scss)
│   │   ├── works/        (works.html, works-uk.html, works.js, works.scss)
│   │   ├── services/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── countertops/
│   │   ├── wardrobe/
│   │   ├── kitchen-service/
│   │   ├── blog-ward/
│   │   ├── blog-fronts/
│   │   ├── blog-ergo/
│   │   ├── blog-sink/
│   │   └── blog-countertops/
│   └── custom/
│       └── cta/          (cta.html, cta.js, cta.scss)
├── js/
│   ├── app.js            (точка входу)
│   ├── common/
│   │   └── functions.js  (FLS-утиліти)
│   ├── data/
│   │   ├── blog-posts.js (масив статей для JS-шаблону)
│   │   └── translations.js (словник UA/PL)
│   └── modules/
│       ├── i18n.js       (перемикач мови)
│       ├── tabs.js
│       ├── reveal.js
│       ├── blog.js
│       ├── form.js
│       ├── menu.js
│       ├── modal.js
│       ├── nav.js
│       ├── router.js
│       └── works.js
├── styles/
│   ├── style.scss        (головний файл)
│   ├── settings.scss     (сітка, брейкпоінти)
│   ├── variables.css     (CSS-змінні)
│   └── includes/
│       ├── index.scss
│       ├── mixins.scss
│       └── extends.scss
└── php/
    ├── sendmail/         (PHPMailer для відправки форм)
    └── telegram/         (Telegram webhook)
```

---

## 5. Дизайн-система — фінальні рішення

### Кольори (variables.css)

```css
--bg: #fafaf8;          /* основний фон */
--bg-2: #f2f1ed;        /* вторинний */
--bg-3: #ececea;        /* третинний */
--ink: #000000;         /* основний текст */
--ink-2: #3a3a3a;       /* вторинний текст */
--ink-3: #8a8a86;       /* підказки, лейбли */
--accent: #c8451f;      /* теракотовий — акцент бренду */
--dark: #111111;        /* дуже темний */
--line: rgba(0, 0, 0, 0.1);
--line-2: rgba(0, 0, 0, 0.18);
```

### Типографіка

- **Шрифт:** Inter (завантажується асинхронно через Google Fonts або `head.html`)
- **CSS-змінні:** `--font-family: 'Inter', sans-serif;`, `--font: 'Inter', Helvetica, Arial, sans-serif;`
- **Body:** `--font-size: clamp(13px, 1vw, 17px);`, weight 400
- **Заголовки:** `clamp(28px, 2.5vw, 52px)`, weight 400, letter-spacing -0.025em
- **Hero-title:** `clamp(44px, 7.5vw, 112px)`, weight 400

> **Примітка:** Lausanne Pan 350 відкладено — шрифт комерційний, потребує ліцензії. Fallback тепер Inter.

### Контейнер (settings.scss)

```scss
$minWidth: 320;
$maxWidth: 1920;
$maxWidthContainer: 1450;
$containerPadding: 60;   // 30px з кожного боку
$containerWidth: $maxWidthContainer + $containerPadding; // = 1510px

// Брейкпоінти
$pc: $containerWidth;     // ≈1510px
$tablet: 992;
$mobile: 768;
$mobileSmall: 480;
```

### Брейкпоінти

- Десктоп: > 992px (повна навігація + кнопка CTA в хедері)
- Таблет/мобільний: ≤ 992px (бургер + фіксована bottom CTA)
- Мобільний: ≤ 768px — паддінги зменшуються
- Дрібний мобільний: ≤ 480px

---

## 6. BEM-конвенція

- Блок: `.block`
- Елемент: `.block__element`
- Модифікатор: `.block--modifier` / `.block__element--modifier` (два дефіси)
- Мікс-класи: декілька класів на одному елементі

**Глобальні утиліти (без BEM, не перейменовувати):**
`.container`, `.section`, `.section-label`, `.section-title`, `.label`, `.accent`, `.dot`, `.badge`, `.hidden`, `.sr-only`, `.fade-in`

---

## 7. Мовна структура

| URL              | Мова | Шаблон                         |
| ---------------- | ---- | ------------------------------ |
| `/`              | PL   | `src/index.html`               |
| `/works.html`    | PL   | `src/works.html`               |
| `/ua/`           | UA   | `src/ua/index.html`            |
| `/ua/works.html` | UA   | `src/ua/works.html`            |

**Механізм перемикання:**
- Хедер отримує `lang` і `altHref` як locals
- `<if condition="String('[[lang]]') === 'uk'">` — виводить UA або PL контент
- Посилання «PL» / «UA» ведуть між `/` ↔ `/ua/`
- `<html lang>` = `uk` або `pl`

**Також є JS-модуль `i18n.js`** з словником `TRANSLATIONS` (ua/pl) — для динамічного перемикання через `[data-i18n]` атрибути в тих компонентах, де потрібно.

---

## 8. Хедер і навігація

**Структура хедера:**

```html
<header data-fls-header class="header">
  <div class="header__container">
    <div class="header__body">
      <a class="header__logo">...</a>
      <!-- menu через include з menu.html -->
      <div class="header__buttons buttons-header">
        <a class="buttons-header__lang">PL / UA</a>
        <a class="buttons-header__cta">omów projekt / обговорити проєкт</a>
        <button class="icon-menu" aria-controls="mobile-menu">...</button>
      </div>
    </div>
  </div>
</header>
<!-- Фіксований мобільний CTA -->
<a class="mobile-cta" id="mobileCta">...</a>
```

- `menu` — єдиний блок для десктопу і мобільного
- На мобільному (≤ брейкпоінт) — повноекранний overlay через модифікатор
- Бургер `icon-menu` через CSS-псевдоелементи

---

## 9. JS-архітектура

**Точка входу:** `src/js/app.js`

```js
import { tabsInit } from '@js/modules/tabs.js';
document.addEventListener('DOMContentLoaded', () => {
  tabsInit();
  // revealInit(); — закоментовано
});
```

**Модулі:**

| Файл                       | Призначення                                           |
| -------------------------- | ----------------------------------------------------- |
| `modules/i18n.js`          | Перемикання мови (ua ↔ pl), data-i18n атрибути        |
| `modules/tabs.js`          | Таби (категорії в Роботах)                            |
| `modules/reveal.js`        | Анімації появи при скролі                             |
| `modules/blog.js`          | Логіка блогу                                          |
| `modules/form.js`          | Відправка форм                                        |
| `modules/menu.js`          | Бургер + мобільне меню                                |
| `modules/modal.js`         | Модальне вікно проєкту                                |
| `modules/nav.js`           | Активний пункт навігації                              |
| `modules/router.js`        | SPA-роутинг (legacy з прототипу)                      |
| `modules/works.js`         | Фільтрація портфоліо                                  |
| `data/translations.js`     | Словник перекладів UA/PL                              |
| `data/blog-posts.js`       | JS-масив статей (legacy, зараз — окремі HTML сторінки)|

---

## 10. Партнери / Матеріали

Секція **«Матеріали, яким ми довіряємо»** на головній.

**7 брендів** з реальними SVG-логотипами (`src/assets/img/partners/`):

| Бренд       | Файл             | Категорія              |
| ----------- | ---------------- | ---------------------- |
| EGGER       | `egger.svg`      | плити ДСП, МДФ         |
| Kronospan   | `kronospan.svg`  | деревні плити          |
| Swiss Krono | `swiss-krono.svg`| деревні плити          |
| Blum        | `blum.svg`       | фурнітура              |
| Hettich     | `Hettich.svg`    | фурнітура              |
| Häfele      | `hafele.svg`     | меблеві системи        |
| Corian®     | `corian.svg`     | акриловий камінь       |

> SVG логотипи вже підключені — це не заглушки.

---

## 11. Блог — архітектура

Блог реалізований як **окремі HTML-сторінки** (не SPA):

| Стаття                          | URL / файл                   |
| ------------------------------- | ---------------------------- |
| Помилки при плануванні гардеробної | `blog-ward.html`          |
| Вибір фасадів (фронтів)         | `blog-fronts.html`           |
| Ергономіка кухні                | `blog-ergo.html`             |
| Вибір мийки                     | `blog-sink.html`             |
| Стільниці (Corian/HPL/кварц)    | `blog-countertops.html`      |

Кожна стаття — окремий компонент у `src/components/pages/blog-*/`.

Є також legacy `data/blog-posts.js` з JS-масивом — залишок SPA-прототипу, зараз не використовується для рендеру сторінок.

---

## 12. Форми та відправка

- **Frontend:** `modules/form.js`
- **Backend:** `src/php/sendmail/` — PHPMailer
- **Telegram-сповіщення:** `src/php/telegram/index.php`

---

## 13. Семантика і доступність (a11y)

- `lang="uk"` / `lang="pl"` на `<html>` через шаблон
- `<nav aria-label>` у хедері
- Бургер: `aria-expanded`, `aria-controls="mobile-menu"`
- Кнопка мови: `aria-label` з назвою цільової мови
- Активний пункт меню: `aria-current="page"` (через `active` locals)
- Форми: `<label for>`, `aria-required`, `autocomplete`
- Декоративні SVG: `aria-hidden="true"`
- Логотип: SVG з `aria-hidden`, текст бренду в `<span>`

---

## 14. Технологічний стек

| Шар         | Рішення                                                   |
| ----------- | --------------------------------------------------------- |
| Збірка      | Vite (FLS Start 4.0)                                      |
| Шаблони     | PostHTML + posthtml-extend + posthtml-expressions          |
| Стилі       | SCSS + PostCSS (autoprefixer, cssnano, sort-media-queries)|
| JS          | ES-модулі (ванільний JS, без фреймворків)                 |
| Зображення  | sharp (WebP/AVIF, ресайз 600/1200, quality 80)            |
| Анімації    | GSAP (підключено, використовується частково)              |
| Хостинг     | Hostinger Business (24 міс., NVMe, CDN, щоденні бекапи)  |
| PHP         | PHPMailer (форми) + Telegram webhook                      |

**Скрипти:**

```bash
npm run dev      # локальна розробка
npm run build    # білд
npm run deploy   # FTP деплой
npm run add      # новий компонент
npm run new      # нова сторінка
```

**Аліаси** (для імпортів):
- `@components` → `src/components`
- `@js` → `src/js`

---

## 15. PENDING — що ще треба зробити

| Пріоритет | Задача                                                                         |
| --------- | ------------------------------------------------------------------------------ |
| Високий   | Реальні фото проєктів від клієнта (зараз Unsplash або місця-тримачі)           |
| Високий   | Ліцензія шрифту Lausanne Pan 350 + заміна Inter на Lausanne                   |
| Високий   | Підключення Sanity CMS (сторінка Роботи + блог через API)                     |
| Високий   | Доробити UA-версію: `about`, `services`, `contact`, `blog`, лендінги           |
| Високий   | SEO: hreflang теги в `<head>`, sitemap.xml, реєстрація в GSC                  |
| Середній  | Реальний телефон (зараз +380 67 123 45 67 — placeholder)                       |
| Середній  | Дописати контент статей блогу (деякі ще заглушки)                              |
| Середній  | Реальні фото авторів статей (зараз Unsplash-портрети)                          |
| Середній  | Блок «Матеріали і техніка» на сторінці Про нас                                 |
| Низький   | Focus trap у модалці й мобільному меню (a11y покращення)                       |
| Низький   | `prefers-reduced-motion` для людей з вестибулярними порушеннями                |
| Відкрите  | Глибина проєкту — модалка vs окремі сторінки (для SEO краще окремі)            |
| Відкрите  | Включати блог одразу чи відкласти до 4-5 готових статей                        |

---

## 16. Що я (Claude) пам'ятаю про твій робочий стиль

- Любиш точкові правки з поясненням ЧОМУ зроблено саме так
- Цінуєш стримане і елегантне, не перевантажене
- Орієнтуєшся на Tubik Studio як референс
- Перед впровадженням питаєш моєї думки — обираєш patterns свідомо
- Спершу обговорюємо архітектурне рішення, потім реалізуємо
- Любиш бачити кілька варіантів коли вибір неочевидний
- Великі рефакторинги робимо **по етапам** — щоб після кожного кроку був робочий сайт
- Пишеш на **FLS Start 4.0** (Vite + PostHTML/Nunjucks + SCSS, без React/Tailwind)
- BEM-конвенція: класичний `block__element--modifier` (два дефіси в модифікаторі)
- Глобальні утиліти лишаємо без BEM-перейменування
