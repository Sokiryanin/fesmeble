// ============ BLOG POSTS ============
// Масив статей. Поки що повне тіло — тільки в "wardrobe-mistakes",
// інші — заглушки. При підключенні Sanity цей масив замінюється на запит до API.
const BLOG_POSTS = [
  {
    slug: 'wardrobe-mistakes',
    title: '5 помилок при плануванні гардеробної, які видно лише через рік',
    cat: 'гардеробні',
    author: 'Мирослав Д.',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    date: '12 березня 2026',
    readTime: '6 хв',
    cover:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80',
    body: `
        <p>Гардеробна — найризикованіший простір у домі. Помилки в кухні видно одразу: не закривається фасад, шухляда впирається в холодильник, варильна поверхня далеко від мийки. У гардеробній нічого не «впирається» в перші тижні. Все красиво, все нове, все на своєму місці. А потім минає рік — і ти починаєш жити з тими рішеннями, які не помітив на етапі планування.</p>

        <p>За шість років роботи ми спроєктували понад сімдесят гардеробних. Ось п'ять помилок, які трапляються найчастіше — і які майже неможливо виправити після монтажу без часткового демонтажу.</p>

        <h2>1. Висота штанг розрахована «під одяг», а не під людину</h2>

        <p>Стандартна порада в інтернеті — «штанга для довгого одягу — 160 см, для короткого — 100 см». Це усереднене значення для людини зростом 170 см. Якщо ти вищий або нижчий — стандарт стає твоєю проблемою.</p>

        <p><strong>Що роблять правильно:</strong> штанга вішається на висоті, до якої власник дістає рукою з зігнутим ліктем. Перевіряється не рулеткою, а власним зростом — людина стає поруч і піднімає руку. Все, що вище — мертва зона, до якої не доходять руки і не доходить погляд.</p>

        <blockquote>Гардеробна не повинна змушувати тебе підстрибувати, щоб дістати светр.</blockquote>

        <h2>2. Полиці одного розміру по всій висоті</h2>

        <p>Виглядає симетрично і красиво на рендерах. У реальному житті — половина полиць порожніє, інша пухне.</p>

        <p>Правильно — три зони висоти:</p>

        <ul>
          <li>Низькі полиці (18–22 см) — для футболок, домашнього одягу, складеного в стопки</li>
          <li>Середні (28–32 см) — для светрів, спортивних кофт, об'ємного трикотажу</li>
          <li>Високі (40+ см) — для сумок, коробок з взуттям, валіз під сезонне зберігання</li>
        </ul>

        <p>Кожна зона займає приблизно третину висоти. Цифри відрізняються залежно від того, як саме людина зберігає одяг — хтось скручує, хтось складає в стопки, хтось вішає максимум.</p>

        <h2>3. Освітлення — окремою задачею «на потім»</h2>

        <p>Це найдорожча помилка з усіх. Електрику в гардеробній прокладають на етапі ремонту, до встановлення меблів. Якщо ти спроєктував модулі і виявив, що в потрібному місці немає виводу під LED — все.</p>

        <p>Що треба передбачити заздалегідь:</p>

        <ol>
          <li>Підсвітку штанг — LED-стрічка зверху над одягом</li>
          <li>Підсвітку відкритих полиць — точкові світильники або профільна LED</li>
          <li>Датчик руху на вхід — щоб світло вмикалося, коли ти відчиняєш двері</li>
          <li>Окреме освітлення дзеркала — теплий тон, з боків, не зверху</li>
        </ol>

        <figure>
          <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1400&q=80" alt="Гардеробна з підсвіткою">
          <figcaption>Підсвітка штанг плюс датчик руху на дверях. Виглядає як деталь, працює як головна зручність.</figcaption>
        </figure>

        <h2>4. Дзеркало повертається не в той бік</h2>

        <p>Класичне розташування — дзеркало в торці гардеробної, навпроти входу. Раціонально на плані, незручно в житті.</p>

        <p>Коли ти одягаєшся, тобі потрібне світло на собі — а не за собою. Якщо вікно або основне джерело світла за твоєю спиною, у дзеркалі ти бачиш силует, а не одяг. Правильно — дзеркало розмістити так, щоб світло падало на тебе, коли ти перед ним стоїш. Часто це означає бічну стіну, а не торцеву.</p>

        <h2>5. Немає місця для «не там, де треба»</h2>

        <p>Будь-яка гардеробна на третьому місяці використання отримує речі, для яких не передбачено місця: сумка з басейну, прасована сорочка, яку ще не вдягали, светр для пробіжки, новий шарф, який ще не повісили в основну зону.</p>

        <p>Якщо в проєкті немає буферної полиці чи штанги «для зараз» — ці речі осідають на стільці, на підлозі, на дверній ручці. Гардеробна виглядає як сходи, з яких усе скочується.</p>

        <p>Рішення: одна штанга на 40–50 см, бажано біля входу, спеціально для тимчасових речей. На плані виглядає як зайве. У реальності використовується щодня.</p>

        <h2>Що зрештою</h2>

        <p>Усі ці помилки об'єднує одне: вони видно тільки в реальному житті, не на 3D-візуалізації. Тому при плануванні гардеробної не питай себе «як це виглядатиме», питай «як я цим користуватимуся через місяць, через рік, з трьома сезонами одягу водночас».</p>

        <p>Якщо є сумніви — заходь до нашої студії. У нас два повнорозмірних демонстраційних модулі, на яких можна примірити ідеї до того, як їх замовляти.</p>
      `
  },
  {
    slug: 'mdf-vs-chipboard',
    title: 'МДФ, ДСП, масив: чесне порівняння без маркетингу',
    cat: 'матеріали',
    author: 'Олекса Р.',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    date: '5 березня 2026',
    readTime: '8 хв',
    cover:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    body: `<p>Текст статті готується. Якщо хочете обговорити вибір матеріалу для свого проєкту — напишіть нам, і ми проведемо детальну консультацію.</p>`
  },
  {
    slug: 'ergonomic-desk',
    title: 'Як ми проєктували робочий стіл, за яким не болить спина',
    cat: 'кабінети',
    author: 'Андрій С.',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    date: '26 лютого 2026',
    readTime: '5 хв',
    cover:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    body: `<p>Текст статті готується.</p>`
  },
  {
    slug: '14-days-kitchen',
    title: 'Чому ми не робимо «кухні за 14 днів» і що це говорить про нас',
    cat: 'історія',
    author: 'Олекса Р.',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    date: '18 лютого 2026',
    readTime: '4 хв',
    cover:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    body: `<p>Текст статті готується.</p>`
  },
  {
    slug: 'blum-hardware',
    title: 'Фурнітура Blum: за що ми платимо й коли переплачуємо',
    cat: 'техніка',
    author: 'Мирослав Д.',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    date: '8 лютого 2026',
    readTime: '7 хв',
    cover:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    body: `<p>Текст статті готується.</p>`
  },
  {
    slug: 'teren-cafe',
    title: 'Кавʼярня «Терен»: меблі для 200 гостей щодня',
    cat: 'кейс',
    author: 'Ірина В.',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    date: '30 січня 2026',
    readTime: '9 хв',
    cover:
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1600&q=80',
    thumb:
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&q=80',
    body: `<p>Текст статті готується.</p>`
  }
];

function openBlogPost(slug) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return;

  document.getElementById('postCat').textContent = post.cat;
  document.getElementById('postReadTime').textContent = post.readTime;
  document.getElementById('postTitle').textContent = post.title;
  document.getElementById('postAuthor').textContent = post.author;
  document.getElementById('postDate').textContent = post.date;
  const avatarImg = document.getElementById('postAuthorAvatar');
  avatarImg.src = post.authorAvatar;
  avatarImg.alt = post.author;
  const cover = document.getElementById('postCover');
  cover.src = post.cover;
  cover.alt = post.title;
  document.getElementById('postBody').innerHTML = post.body;
  document.title = post.title + ' — FESMEBLE';

  // Related: 3 інших, не поточна
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const grid = document.getElementById('postRelatedGrid');
  grid.innerHTML = related
    .map(
      (p) => `
      <div class="blog-card" data-slug="${p.slug}" role="button" tabindex="0" aria-label="Читати: ${p.title}">
        <div class="blog-card__img"><img src="${p.thumb}" alt="Ілюстрація до статті: ${p.title}" loading="lazy" decoding="async" width="600" height="450"></div>
        <div class="blog-card__cat">${p.cat}</div>
        <div class="blog-card__title">${p.title}</div>
        <div class="blog-card__meta">${p.author} · ${p.readTime}</div>
      </div>
    `
    )
    .join('');
  grid.querySelectorAll('.blog-card').forEach((card) => {
    const s = card.dataset.slug;
    card.addEventListener('click', () => openBlogPost(s));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBlogPost(s);
      }
    });
  });

  go('blog-post');
}
window.openBlogPost = openBlogPost;

// Make blog cards on /blog page clickable + a11y
document.querySelectorAll('#page-blog .blog-card').forEach((card) => {
  const slug = card.dataset.slug;
  if (!slug) return;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  const title = card.querySelector('.blog-card__title');
  if (title) card.setAttribute('aria-label', `Читати: ${title.textContent}`);
  card.addEventListener('click', () => openBlogPost(slug));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openBlogPost(slug);
    }
  });
});
