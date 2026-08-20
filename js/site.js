const d = document;
const page = d.body.dataset.page || '';
const header = d.querySelector('[data-site-header]');

const videoLinks = [
  'China Currents', 'China Now', 'Global Arena', 'Speak Softly', 'Thinkers Forum',
  'Threshold', 'Overlap', 'TOP PICKS', 'Roughly Chinese', 'China On the Ground', 'The Unfiltered'
];
const premiumLinks = [
  ['Courses', '../Courses/index.html'],
  ['Intelligence', '../Premium/intelligence.html'],
  ['Talks', '../Premium/talks.html']
];
const nav = (label, href, key) => `<a ${page === key ? 'aria-current="page"' : ''} href="${href}">${label}</a>`;
const dropdown = (label, items, className = '') => `<div class="nav-dropdown ${className}">
  <button class="nav-drop-trigger" type="button" aria-expanded="false">${label}<span aria-hidden="true">⌄</span></button>
  <div class="nav-drop-panel">${items.map(item => Array.isArray(item)
    ? `<a href="${item[1]}">${item[0]}</a>`
    : `<a href="../Sections/video.html">${item}</a>`).join('')}</div>
</div>`;

if (header) {
  header.className = 'site-header';
  header.innerHTML = `
    <div class="progress" data-progress></div>
    <div class="utility" data-utility>
      <div class="shell utility-inner">
        <nav class="utility-links">${nav('Support Us', '../About/support.html', 'support')}${nav('About Us', '../About/about.html', 'about')}</nav>
        <div class="utility-actions">
          <form class="header-search" action="../Utility/search.html">
            <label><span class="search-icon" aria-hidden="true">⌕</span><span class="sr-only">Search</span><input name="q" type="search" placeholder="Search" aria-label="Search"></label>
          </form>
          <button class="signin-button" type="button" data-signin>SIGN IN</button>
        </div>
      </div>
    </div>
    <div class="titlebar">
      <div class="shell titlebar-inner">
        <nav class="title-nav title-nav-left">${nav('Home', '../Homepage/index.html', 'home')}${nav('Trending', '../Sections/trending.html', 'trending')}${nav('Thinkers Forum', '../Sections/thinkers-forum.html', 'thinkers')}</nav>
        <a class="brand" href="../Homepage/index.html"><img class="brand-logo" src="https://thechinaacademy.org/wp-content/uploads/2024/11/logo-2.webp" alt=""><span>The China Academy</span></a>
        <nav class="title-nav title-nav-right">${dropdown('Video', videoLinks, 'video-dropdown')}${dropdown('Premium', premiumLinks, 'premium-dropdown')}${nav('HSK', '../Courses/hsk.html', 'courses')}</nav>
        <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span></button>
      </div>
      <div class="mobile-drawer" data-mobile-drawer>
        <nav class="mobile-primary">${nav('Home', '../Homepage/index.html', 'home')}${nav('Trending', '../Sections/trending.html', 'trending')}${nav('Thinkers Forum', '../Sections/thinkers-forum.html', 'thinkers')}${nav('HSK', '../Courses/hsk.html', 'courses')}</nav>
        <div class="mobile-group"><button type="button" data-mobile-submenu aria-expanded="false">Video <span>＋</span></button><div class="mobile-submenu">${videoLinks.map(x => `<a href="../Sections/video.html">${x}</a>`).join('')}</div></div>
        <div class="mobile-group"><button type="button" data-mobile-submenu aria-expanded="false">Premium <span>＋</span></button><div class="mobile-submenu">${premiumLinks.map(x => `<a href="${x[1]}">${x[0]}</a>`).join('')}</div></div>
        <nav class="mobile-utility"><a href="../About/support.html">Support Us</a><a href="../About/about.html">About Us</a><a href="../Utility/search.html">Search</a><button type="button" data-signin>SIGN IN</button></nav>
      </div>
    </div>`;

  const menuButton = header.querySelector('.menu-button');
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  header.querySelectorAll('.nav-drop-trigger').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.nav-dropdown');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));
  header.querySelectorAll('[data-mobile-submenu]').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('.mobile-group');
    const open = group.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('span').textContent = open ? '−' : '＋';
  }));

  let signedIn = false;
  try { signedIn = sessionStorage.getItem('tca-demo-signed-in') === '1'; } catch {}
  const renderSignin = () => header.querySelectorAll('[data-signin]').forEach(button => {
    button.classList.toggle('signed-in', signedIn);
    button.innerHTML = signedIn ? '<span aria-hidden="true">●</span><span class="sr-only">Account</span>' : 'SIGN IN';
    button.setAttribute('aria-label', signedIn ? 'Open account' : 'Sign in');
  });
  header.querySelectorAll('[data-signin]').forEach(button => button.addEventListener('click', () => {
    if (signedIn) { location.href = '../Utility/setting.html'; return; }
    signedIn = true;
    try { sessionStorage.setItem('tca-demo-signed-in', '1'); } catch {}
    renderSignin();
  }));
  renderSignin();

  let utilityHidden = false;
  const updateUtility = () => {
    if (!utilityHidden && scrollY > 120) utilityHidden = true;
    else if (utilityHidden && scrollY < 48) utilityHidden = false;
    header.classList.toggle('utility-hidden', utilityHidden);
  };
  addEventListener('scroll', updateUtility, { passive: true });
  updateUtility();
}

const footer = d.querySelector('[data-site-footer]');
if (footer) {
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="shell"><div class="footer-grid"><div><div class="footer-brand">The China Academy</div><p class="serif muted">A fuller view of China through reporting, ideas, video and learning.</p></div><div><div class="footer-title">Explore</div><div class="footer-links"><a href="../Sections/trending.html">Trending</a><a href="../Sections/video.html">Video</a><a href="../Courses/index.html">Courses</a></div></div><div><div class="footer-title">Organization</div><div class="footer-links"><a href="../About/about.html">About Us</a><a href="../About/contributors.html">Contributors</a><a href="../About/support.html">Support Us</a></div></div></div><div class="copyright">© 2026 The China Academy · Redesign prototype · Images remain hosted by the source website.</div></div>`;
}

if (!d.querySelector('#signup-dialog')) d.body.insertAdjacentHTML('beforeend', `<dialog class="signup-dialog" id="signup-dialog"><div class="signup-panel"><div class="signup-copy"><button class="signup-close" data-close aria-label="Close">×</button><h2>Stay Updated with On-the-Ground Information, Discussions, and Expert Analysis on All Things China and China-Related</h2><p><em>Access exclusive courses, newsletters, webinars, and reports.</em></p><button class="signup-try" type="button">Try Free</button></div></div></dialog>`);
const dialog = d.querySelector('#signup-dialog');
if (dialog) {
  d.querySelectorAll('[data-open-signup]').forEach(x => x.addEventListener('click', () => dialog.showModal()));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  let seen = false;
  try { seen = sessionStorage.getItem('tca-signup-seen') === '1'; } catch {}
  if (!seen) setTimeout(() => {
    if (!dialog.open) dialog.showModal();
    try { sessionStorage.setItem('tca-signup-seen', '1'); } catch {}
  }, 1300);
}

const discovery = [
  ['History · 28 min', 'How Mao Zedong Shattered the U.S. Trade Blockade', 'How production, barter and diplomacy opened routes around containment.', '../Articles/opinion-article.html'],
  ['Technology · 4 min', 'From TikTok to Rednote', 'A platform ban turns into an unexpected digital migration.', '../Articles/technology-article.html'],
  ['Global Arena · 61 min', 'After the Earthquake', 'Why reconstruction is the real challenge for the Global South.', '../Articles/video-article.html'],
  ['Premium Talks · 24 min', 'How China Builds the World’s Tallest Bridge', 'Engineering capacity from geology to institutional coordination.', '../Articles/premium-talk-detail.html'],
  ['Course · 6 lessons', 'Making the World Anew', 'Bandung, de-dependency and China’s development path.', '../Courses/lesson.html'],
  ['Research · 10 min', 'What China’s Platform Shift Reveals', 'Observed migration, market implications and policy inference.', '../Premium/intelligence.html']
];
const main = d.querySelector('main');
if (main && !d.body.classList.contains('master-home')) {
  main.insertAdjacentHTML('beforeend', `<section class="density-feed shell"><header><div class="kicker">Continue exploring</div><h2 class="display">More context, in less space.</h2></header><div class="density-grid">${discovery.map(([meta, title, copy, href]) => `<article class="density-item"><div class="kicker">${meta}</div><h3><a href="${href}">${title}</a></h3><p>${copy}</p><a class="density-arrow" href="${href}" aria-label="Open ${title}">→</a></article>`).join('')}</div></section>`);
}

const requestedTag = new URLSearchParams(location.search).get('tag');
if (requestedTag && location.pathname.endsWith('/search.html')) {
  const heading = d.querySelector('.page-hero h1');
  const input = d.querySelector('.search-box input');
  if (heading) heading.textContent = `Stories tagged “${requestedTag}”`;
  if (input) input.value = requestedTag;
  const results = [...d.querySelectorAll('main > section')].find(section => !section.classList.contains('page-hero') && !section.classList.contains('density-feed'));
  if (results) {
    const key = requestedTag.toLowerCase();
    const leadIndex = /tiktok|rednote|platform|technology/.test(key) ? 1 : /video|global arena/.test(key) ? 2 : /premium|infrastructure|talk/.test(key) ? 3 : /course|development|global south/.test(key) ? 4 : 0;
    const ordered = [discovery[leadIndex], ...discovery.filter((_, index) => index !== leadIndex)].slice(0, 4);
    results.innerHTML = ordered.map(([meta, title, copy, href]) => `<article class="result"><div class="kicker">${requestedTag} · ${meta}</div><div><h2><a href="${href}">${title}</a></h2><p>${copy}</p></div></article>`).join('');
  }
}

d.querySelectorAll('.card .kicker, .feature-copy .kicker, .result .kicker').forEach(tag => {
  if (tag.matches('a')) return;
  const label = tag.textContent.split('·')[0].trim();
  if (!label) return;
  tag.setAttribute('role', 'link');
  tag.setAttribute('tabindex', '0');
  tag.setAttribute('aria-label', `Search tag ${label}`);
  const openTag = event => {
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    location.href = `../Utility/search.html?tag=${encodeURIComponent(label)}`;
  };
  tag.addEventListener('click', openTag);
  tag.addEventListener('keydown', openTag);
});

d.querySelectorAll('[data-words]').forEach(item => {
  const words = Number(item.dataset.words) || 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  const output = item.querySelector('[data-read-time]');
  if (output) output.textContent = `${minutes} min read`;
});

const coverFitQuery = matchMedia('(min-width: 931px)');
const coverFitItems = [...d.querySelectorAll('.recommendation-cover, .home-feature')].map(cover => ({
  heading: cover.querySelector('.cover-heading'),
  media: cover.querySelector('.cover-figure, .home-feature-media'),
  title: cover.querySelector('.cover-heading h1, .cover-heading h2'),
  deck: cover.querySelector('.cover-deck, .home-feature-deck'),
  footer: cover.querySelector('.cover-footer')
})).filter(item => Object.values(item).every(Boolean));

const resetCoverFit = item => {
  item.deck.style.removeProperty('font-size');
  item.deck.style.removeProperty('line-height');
  item.footer.style.removeProperty('margin-top');
};

const fitCover = item => {
  resetCoverFit(item);
  if (!coverFitQuery.matches) return;

  const titleSize = parseFloat(getComputedStyle(item.title).fontSize);
  if (!Number.isFinite(titleSize)) return;
  const minimumSize = titleSize * .5;
  let deckSize = titleSize * .6;
  let gap = 16;
  item.deck.style.fontSize = `${deckSize}px`;
  item.deck.style.lineHeight = '1.42';
  item.footer.style.marginTop = `${gap}px`;

  const targetBottom = () => item.media.getBoundingClientRect().bottom;
  const footerBottom = () => item.footer.getBoundingClientRect().bottom;
  let overflow = footerBottom() - targetBottom();
  while (overflow > .5 && deckSize > minimumSize) {
    deckSize = Math.max(minimumSize, deckSize - .5);
    item.deck.style.fontSize = `${deckSize}px`;
    overflow = footerBottom() - targetBottom();
  }

  if (overflow > .5) {
    gap = Math.max(0, gap - overflow);
    item.footer.style.marginTop = `${gap}px`;
  }

  const remaining = targetBottom() - footerBottom();
  if (remaining > .5) item.footer.style.marginTop = `${gap + remaining}px`;
};

let coverFitFrame = 0;
const fitAllCovers = () => {
  cancelAnimationFrame(coverFitFrame);
  coverFitFrame = requestAnimationFrame(() => coverFitItems.forEach(fitCover));
};
if (coverFitItems.length) {
  addEventListener('resize', fitAllCovers, { passive: true });
  addEventListener('load', fitAllCovers, { once: true });
  coverFitQuery.addEventListener?.('change', fitAllCovers);
  d.fonts?.ready.then(fitAllCovers);
  coverFitItems.forEach(item => item.media.querySelector('img')?.addEventListener('load', fitAllCovers, { once: true }));
  fitAllCovers();
}

const setupGalleryDots = gallery => {
  const items = [...gallery.children].filter(item => item.matches('.recommendation-slide, .gallery-card'));
  if (items.length < 2) return;
  let dots = gallery.nextElementSibling?.classList.contains('gallery-dots') ? gallery.nextElementSibling : null;
  let ticking = false;
  const itemLeft = item => item.offsetLeft - gallery.offsetLeft;
  const updateActive = () => {
    ticking = false;
    if (!dots || dots.hidden) return;
    let active = 0;
    let distance = Infinity;
    items.forEach((item, index) => {
      const next = Math.abs(itemLeft(item) - gallery.scrollLeft);
      if (next < distance) { distance = next; active = index; }
    });
    dots.querySelectorAll('button').forEach((button, index) => {
      const isActive = index === active;
      button.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  };
  const render = () => {
    const overflow = gallery.scrollWidth > gallery.clientWidth + 2;
    if (!overflow) { if (dots) dots.hidden = true; return; }
    if (!dots) {
      dots = d.createElement('div');
      dots.className = 'gallery-dots';
      dots.setAttribute('aria-label', 'Gallery position');
      dots.innerHTML = items.map((_, index) => `<button type="button" aria-label="Go to gallery item ${index + 1}"></button>`).join('');
      gallery.insertAdjacentElement('afterend', dots);
      dots.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => gallery.scrollTo({ left: itemLeft(items[index]), behavior: 'smooth' })));
    }
    dots.hidden = false;
    updateActive();
  };
  gallery.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
  }, { passive: true });
  addEventListener('resize', render, { passive: true });
  requestAnimationFrame(render);
};
d.querySelectorAll('.recommendation-gallery, .story-gallery').forEach(setupGalleryDots);

const progress = d.querySelector('[data-progress]');
const onScroll = () => {
  const h = d.documentElement;
  if (progress) progress.style.width = `${h.scrollHeight > h.clientHeight ? h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 : 0}%`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
