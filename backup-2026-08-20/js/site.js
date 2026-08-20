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

  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (Math.abs(y - lastY) < 4) return;
    const down = y > lastY;
    header.classList.toggle('utility-hidden', down && y > 56);
    lastY = y;
  }, { passive: true });
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
  main.insertAdjacentHTML('beforeend', `<section class="density-feed shell"><header><div class="kicker">Continue exploring</div><h2 class="display">More context, in less space.</h2></header><div class="density-grid">${discovery.map(([meta, title, copy, href]) => `<article class="density-item"><div class="kicker">${meta}</div><h3><a href="${href}">${title}</a></h3><p>${copy}</p><a class="density-arrow" href="${href}" aria-label="Open ${title}">↗</a></article>`).join('')}</div></section>`);
}

d.querySelectorAll('[data-words]').forEach(item => {
  const words = Number(item.dataset.words) || 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  const output = item.querySelector('[data-read-time]');
  if (output) output.textContent = `${minutes} min read`;
});

const progress = d.querySelector('[data-progress]');
const onScroll = () => {
  const h = d.documentElement;
  if (progress) progress.style.width = `${h.scrollHeight > h.clientHeight ? h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 : 0}%`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Tag-based search: reflect ?tag= / ?q= on the search results page.
if (d.querySelector('.search-box')) {
  const params = new URLSearchParams(location.search);
  const term = params.get('tag') || params.get('q');
  if (term) {
    const h1 = d.querySelector('.page-hero h1');
    if (h1) h1.textContent = `Results for “${term}”`;
    const input = d.querySelector('.search-box input');
    if (input) input.value = term;
  }
}

// Hero gallery: slide between the cover story and the featured board.
const heroTrack = d.querySelector('[data-hero-gallery]');
if (heroTrack) {
  const next = d.querySelector('[data-hero-next]');
  const prev = d.querySelector('[data-hero-prev]');
  const scrollTo = dir => {
    const w = heroTrack.clientWidth;
    heroTrack.scrollTo({ left: heroTrack.scrollLeft + dir * w, behavior: 'smooth' });
  };
  if (next) next.addEventListener('click', () => scrollTo(1));
  if (prev) prev.addEventListener('click', () => scrollTo(-1));
}
