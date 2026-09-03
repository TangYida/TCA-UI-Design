const d = document;
const page = d.body.dataset.page || '';
const header = d.querySelector('[data-site-header]');
const viewportMeta = d.querySelector('meta[name="viewport"]');
if (viewportMeta && !viewportMeta.content.includes('viewport-fit=cover')) viewportMeta.content += ',viewport-fit=cover';
let themeColorMeta = d.querySelector('meta[name="theme-color"]');
if (!themeColorMeta) {
  themeColorMeta = d.createElement('meta');
  themeColorMeta.name = 'theme-color';
  d.head.append(themeColorMeta);
}
const setBrowserChrome = dark => {
  themeColorMeta.content = dark ? '#13243e' : '#ffffff';
  d.documentElement.classList.toggle('safe-area-dark', dark);
};
setBrowserChrome(false);
const betaMode = new URLSearchParams(location.search).get('demo') === 'beta-4x3';
if (betaMode) d.body.classList.add('beta-home');

const videoChannels = [
  'China Currents', 'China Now', 'Global Arena', 'Speak Softly', 'Thinkers Forum',
  'Threshold', 'Overlap', 'TOP PICKS', 'Roughly Chinese', 'China On the Ground', 'The Unfiltered'
];
const videoLinks = videoChannels.map(channel => [channel, `../Video%20Sections/video.html?channel=${encodeURIComponent(channel)}`]);
const premiumLinks = [
  ['Courses', '../About/premium-courses.html'],
  ['Intelligence', '../Article%20Sections/premium-intelligence.html'],
  ['Talks', '../Video%20Sections/premium-talks.html']
];
const nav = (label, href, key) => `<a ${page === key ? 'aria-current="page"' : ''} href="${href}">${label}</a>`;
const dropdown = (label, items, className = '', href = '', key = '') => `<div class="nav-dropdown ${className}">
  <a class="nav-drop-trigger" ${page === key ? 'aria-current="page"' : ''} href="${href}" aria-haspopup="true">${label}<span aria-hidden="true">⌄</span></a>
  <div class="nav-drop-panel">${items.map(item => `<a href="${item[1]}">${item[0]}</a>`).join('')}</div>
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
        <nav class="title-nav title-nav-left">${nav('Home', '../Homepage/index.html', 'home')}${nav('Trending', '../Article%20Sections/trending.html', 'trending')}${nav('Opinion', '../Article%20Sections/thinkers-forum.html', 'thinkers')}</nav>
        <a class="brand" href="../Homepage/index.html"><img class="brand-logo" src="https://thechinaacademy.org/wp-content/uploads/2024/11/logo-2.webp" alt=""><span class="brand-name">The China Academy</span></a>
        <nav class="title-nav title-nav-right">${dropdown('Video', videoLinks, 'video-dropdown', '../Video%20Sections/video.html', 'video')}${dropdown('Premium', premiumLinks, 'premium-dropdown', '../Homepage/premium-member.html', 'premium')}<a href="https://chinanotjusttravel.com/">Not Just Travel</a></nav>
        <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span></button>
      </div>
      <div class="mobile-drawer" data-mobile-drawer role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <nav class="mobile-primary">${nav('Home', '../Homepage/index.html', 'home')}${nav('Trending', '../Article%20Sections/trending.html', 'trending')}${nav('Opinion', '../Article%20Sections/thinkers-forum.html', 'thinkers')}<a href="https://chinanotjusttravel.com/">Not Just Travel</a></nav>
        <div class="mobile-group"><div class="mobile-group-head"><a href="../Video%20Sections/video.html">Video</a><button type="button" data-mobile-submenu aria-expanded="false" aria-label="Show Video channels"><span>＋</span></button></div><div class="mobile-submenu">${videoLinks.map(x => `<a href="${x[1]}">${x[0]}</a>`).join('')}</div></div>
        <div class="mobile-group"><div class="mobile-group-head"><a href="../Homepage/premium-member.html">Premium</a><button type="button" data-mobile-submenu aria-expanded="false" aria-label="Show Premium pages"><span>＋</span></button></div><div class="mobile-submenu">${premiumLinks.map(x => `<a href="${x[1]}">${x[0]}</a>`).join('')}</div></div>
        <nav class="mobile-utility"><a href="../About/support.html">Support Us</a><a href="../About/about.html">About Us</a><a href="../Utility/search.html">Search</a><button type="button" data-signin>SIGN IN</button></nav>
      </div>
    </div>`;

  const menuButton = header.querySelector('.menu-button');
  const mobileDrawer = header.querySelector('[data-mobile-drawer]');
  d.body.append(mobileDrawer);
  const setMobileMenu = open => {
    header.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileDrawer.setAttribute('aria-hidden', String(!open));
    d.documentElement.classList.toggle('mobile-menu-open', open);
    setBrowserChrome(open);
    if (!open) mobileDrawer.querySelectorAll('.mobile-group.open').forEach(group => {
      group.classList.remove('open');
      const button = group.querySelector('[data-mobile-submenu]');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('span').textContent = '＋';
    });
  };
  menuButton.addEventListener('click', () => setMobileMenu(!header.classList.contains('open')));
  mobileDrawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
  const mobileNavigation = matchMedia('(max-width: 900px)');
  mobileNavigation.addEventListener?.('change', event => { if (!event.matches) setMobileMenu(false); });
  d.addEventListener('keydown', event => {
    if (!header.classList.contains('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMobileMenu(false);
      menuButton.focus();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [menuButton, ...mobileDrawer.querySelectorAll('a,button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && d.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && d.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  const desktopDropdowns = [...header.querySelectorAll('.nav-dropdown')];
  const closeDesktopDropdowns = except => desktopDropdowns.forEach(item => {
    if (item === except) return;
    item.classList.remove('open');
    item.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
  });
  header.querySelectorAll('.nav-drop-trigger').forEach(trigger => trigger.addEventListener('click', () => closeDesktopDropdowns()));
  d.addEventListener('pointerdown', event => {
    if (!event.target.closest('.nav-dropdown')) closeDesktopDropdowns();
  });
  mobileDrawer.querySelectorAll('[data-mobile-submenu]').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('.mobile-group');
    const open = group.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('span').textContent = open ? '−' : '＋';
  }));

  let signedIn = false;
  try { signedIn = sessionStorage.getItem('tca-demo-signed-in') === '1'; } catch {}
  const signinButtons = [...header.querySelectorAll('[data-signin]'), ...mobileDrawer.querySelectorAll('[data-signin]')];
  const renderSignin = () => signinButtons.forEach(button => {
    button.classList.toggle('signed-in', signedIn);
    button.innerHTML = signedIn ? '<span aria-hidden="true">●</span><span class="sr-only">Account</span>' : 'SIGN IN';
    button.setAttribute('aria-label', signedIn ? 'Open account' : 'Sign in');
  });
  signinButtons.forEach(button => button.addEventListener('click', () => {
    if (signedIn) { location.href = '../Utility/setting.html'; return; }
    signedIn = true;
    try {
      sessionStorage.setItem('tca-demo-signed-in', '1');
      sessionStorage.setItem('tca-registration-active', '1');
    } catch {}
    renderSignin();
    dispatchEvent(new CustomEvent('registrationchange', { detail: { active: true } }));
  }));
  renderSignin();

  let utilityHidden = scrollY > 128;
  let previousY = Math.max(0, scrollY);
  let direction = 0;
  let directionalTravel = 0;
  let headerLockedUntil = 0;
  let headerFrame = 0;
  const renderHeaderState = () => {
    header.classList.toggle('utility-hidden', utilityHidden);
    header.classList.toggle('header-compact', utilityHidden);
  };
  const updateUtility = () => {
    headerFrame = 0;
    const y = Math.max(0, scrollY);
    const delta = y - previousY;
    previousY = y;
    if (header.classList.contains('open')) return;
    if (y <= 64) {
      utilityHidden = false;
      direction = 0;
      directionalTravel = 0;
      renderHeaderState();
      return;
    }
    if (Math.abs(delta) < 3) return;
    const nextDirection = delta > 0 ? 1 : -1;
    if (nextDirection !== direction) {
      direction = nextDirection;
      directionalTravel = 0;
    }
    directionalTravel += Math.abs(delta);
    if (performance.now() < headerLockedUntil) return;
    const shouldHide = direction > 0 && y >= 128 && directionalTravel >= 30;
    const shouldShow = direction < 0 && directionalTravel >= 36;
    if (!shouldHide && !shouldShow) return;
    const nextHidden = shouldHide;
    if (nextHidden === utilityHidden) {
      directionalTravel = 0;
      return;
    }
    utilityHidden = nextHidden;
    directionalTravel = 0;
    headerLockedUntil = performance.now() + 560;
    renderHeaderState();
  };
  addEventListener('scroll', () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateUtility);
  }, { passive: true });
  renderHeaderState();
}

const footer = d.querySelector('[data-site-footer]');
if (footer) {
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="shell"><div class="footer-mast"><a class="footer-brand" href="../Homepage/index.html"><img class="footer-logo" src="https://thechinaacademy.org/wp-content/uploads/2024/11/logo-2.webp" alt=""><span class="brand-name">The China Academy</span></a></div><div class="footer-grid"><section class="footer-column"><div class="footer-title">About</div><div class="footer-links"><a href="https://thechinaacademy.org/about-us/">About Us</a><a href="mailto:hello@thechinaacademy.org">Contact Us</a><a href="https://thechinaacademy.org/contributors-2/">Contributors</a><a href="https://thechinaacademy.org/support-us/">Cooperation</a><details class="footer-partners"><summary>Partners</summary><div class="footer-partner-reveal"><div><a href="https://thechinaacademy.org/hsk-certified-courses/">HSK</a></div></div></details></div></section><section class="footer-column footer-follow"><div class="footer-title">Follow Us</div><div class="footer-socials"><div class="footer-social-group"><div class="footer-platform">YouTube</div><div class="footer-social-links"><a href="https://www.youtube.com/@guanvideo" target="_blank" rel="noreferrer">观视频工作室 Guan Video</a><a href="https://www.youtube.com/@wavemedia4433" target="_blank" rel="noreferrer">WaveMedia</a><a href="https://www.youtube.com/@thinkersforum4149" target="_blank" rel="noreferrer">ThinkersForum</a><a href="https://www.youtube.com/@TechSignal2023" target="_blank" rel="noreferrer">TechSignal</a></div></div><div class="footer-social-group"><div class="footer-platform">Twitter</div><div class="footer-social-links"><a href="https://x.com/ChinaAcademyORG" target="_blank" rel="noreferrer">The China Academy</a></div></div><div class="footer-social-group"><div class="footer-platform">TikTok</div><div class="footer-social-links"><a href="https://www.tiktok.com/@chinacontentcenter" target="_blank" rel="noreferrer">ChinaContentCenter</a><a href="https://www.tiktok.com/@wavemedia2022" target="_blank" rel="noreferrer">WaveMedia</a><a href="https://www.tiktok.com/@thinkersforumcn" target="_blank" rel="noreferrer">ThinkersForum</a></div></div></div></section><nav class="footer-column footer-legal" aria-label="More"><div class="footer-title">More</div><div class="footer-links"><a href="https://thechinaacademy.org/terms-of-use/">Terms of Use</a><a href="https://thechinaacademy.org/privacy-policy-2/">Privacy Policy</a><a href="https://thechinaacademy.org/cookies-policy/">Cookie Policy</a></div></nav></div><div class="copyright">© 2026 <span class="brand-name">The China Academy</span> · Redesign prototype · Images remain hosted by the source website.</div></div>`;

  // Add hover effect and auto-open to footer partners
  const footerPartners = d.querySelector('.footer-partners');
  if (footerPartners) {
    const summary = footerPartners.querySelector('summary');
    if (summary) {
      footerPartners.addEventListener('mouseenter', () => {
        summary.style.textDecoration = 'underline';
        summary.style.color = 'var(--gold)';
        footerPartners.open = true;
      });
      footerPartners.addEventListener('mouseleave', () => {
        summary.style.textDecoration = 'none';
        summary.style.color = '';
        footerPartners.open = false;
      });
    }
  }
}

if (!d.querySelector('#signup-dialog')) d.body.insertAdjacentHTML('beforeend', `<aside class="signup-dialog" id="signup-dialog" role="dialog" aria-modal="false" aria-label="Follow The China Academy" hidden><div class="signup-panel"><div class="signup-copy"><p class="signup-sheet-message">Follow along with <span class="brand-name">The China Academy</span></p><a class="signup-choice" href="../Homepage/premium-member.html"><strong>Premium Member</strong><em>Gain access to exclusive courses, interviews, and reports on the pivotal driving forces behind China's evolution.</em></a><a class="signup-choice" href="../Utility/setting.html?mode=register"><strong>Free Registration</strong><em>Stay Updated with On-the-Ground Information, Discussions, and Expert Analysis on All Things China and China-Related.</em></a><button class="signup-close" data-close type="button" aria-label="Close">×</button></div></div></aside><aside class="signup-banner" data-signup-banner hidden><span>Follow along with <span class="brand-name">The China Academy</span></span><button type="button" data-expand-signup>Become a Member</button></aside>`);
const dialog = d.querySelector('#signup-dialog');
if (dialog) {
  const banner = d.querySelector('[data-signup-banner]');
  const registrationActive = () => {
    try { return sessionStorage.getItem('tca-registration-active') === '1'; } catch { return false; }
  };
  const panel = dialog.querySelector('.signup-panel');
  const morphDuration = 520;
  let closeTimer = 0;
  let bannerFrame = 0;
  const sheetOpen = () => dialog.classList.contains('is-open');
  const cancelBannerReveal = () => {
    cancelAnimationFrame(bannerFrame);
    bannerFrame = 0;
  };
  const showBanner = () => {
    if (!banner || registrationActive()) return;
    cancelBannerReveal();
    banner.classList.remove('is-visible', 'is-morphing');
    banner.hidden = false;
    banner.getBoundingClientRect();
    bannerFrame = requestAnimationFrame(() => {
      if (!banner.hidden && !registrationActive()) banner.classList.add('is-visible');
      bannerFrame = 0;
    });
  };
  const syncExpandedHeight = () => {
    const safeArea = parseFloat(getComputedStyle(dialog).paddingBottom) || 0;
    dialog.style.setProperty('--signup-expanded-height', `${Math.ceil(panel.scrollHeight + safeArea)}px`);
  };
  const openSheet = () => {
    clearTimeout(closeTimer);
    cancelBannerReveal();
    const bannerWasVisible = Boolean(banner && !banner.hidden);
    dialog.hidden = false;
    syncExpandedHeight();
    dialog.classList.remove('is-open');
    dialog.classList.add('is-morphing');
    dialog.getBoundingClientRect();
    requestAnimationFrame(() => {
      dialog.classList.add('is-open');
      dialog.classList.remove('is-morphing');
      if (bannerWasVisible) {
        banner.classList.add('is-morphing');
        banner.classList.remove('is-visible');
      }
    });
    closeTimer = setTimeout(() => {
      if (bannerWasVisible) {
        banner.hidden = true;
        banner.classList.remove('is-morphing');
      }
    }, morphDuration);
  };
  const closeSheet = (restoreBanner = true) => {
    if (dialog.hidden) { if (restoreBanner) showBanner(); return; }
    clearTimeout(closeTimer);
    syncExpandedHeight();
    if (restoreBanner && banner && !registrationActive()) {
      cancelBannerReveal();
      banner.hidden = false;
      banner.classList.remove('is-visible', 'is-morphing');
      banner.getBoundingClientRect();
      bannerFrame = requestAnimationFrame(() => {
        banner.classList.add('is-visible');
        bannerFrame = 0;
      });
    }
    dialog.classList.add('is-morphing');
    dialog.classList.remove('is-open');
    closeTimer = setTimeout(() => {
      dialog.hidden = true;
      dialog.classList.remove('is-morphing');
    }, morphDuration);
    // 记录用户已关闭dialog
    try { localStorage.setItem('tca-dialog-dismissed', '1'); } catch {}
  };
  const hideSignup = () => {
    closeSheet(false);
    if (banner) {
      cancelBannerReveal();
      banner.classList.remove('is-visible');
      banner.hidden = true;
    }
  };
  d.querySelectorAll('[data-open-signup]').forEach(x => x.addEventListener('click', openSheet));
  banner?.querySelector('[data-expand-signup]')?.addEventListener('click', openSheet);
  dialog.querySelector('[data-close]').addEventListener('click', () => closeSheet());
  d.addEventListener('keydown', event => { if (event.key === 'Escape' && sheetOpen()) closeSheet(); });
  if (banner && footer) {
    const setFooterAway = away => {
      dialog.classList.toggle('footer-away', away);
      banner.classList.toggle('footer-away', away);
    };
    const footerObserver = new IntersectionObserver(entries => setFooterAway(entries.some(entry => entry.isIntersecting)), { threshold: 0, rootMargin: '0px 0px 1px' });
    footerObserver.observe(footer);
  }
  addEventListener('registrationchange', hideSignup);
  addEventListener('resize', () => { if (!dialog.hidden) syncExpandedHeight(); }, { passive: true });
  const isDialogDismissed = () => {
    try { return localStorage.getItem('tca-dialog-dismissed') === '1'; } catch { return false; }
  };
  if (!registrationActive()) {
    if (isDialogDismissed()) {
      showBanner();
    } else if (d.body.classList.contains('master-home')) {
      requestAnimationFrame(openSheet);
    } else {
      showBanner();
    }
  }
}

const discovery = [
  ['History · 28 min', 'How Mao Zedong Shattered the U.S. Trade Blockade', 'How production, barter and diplomacy opened routes around containment.', '../Articles/article-featured-image.html'],
  ['Technology · 4 min', 'From TikTok to Rednote', 'A platform ban turns into an unexpected digital migration.', '../Articles/article-text.html'],
  ['Global Arena · 61 min', 'After the Earthquake', 'Why reconstruction is the real challenge for the Global South.', '../Videos/video-article.html'],
  ['Premium Talks · 24 min', 'How China Builds the World\'s Tallest Bridge', 'Engineering capacity from geology to institutional coordination.', '../Videos/premium-talk-detail.html'],
  ['Course · 6 lessons', 'Making the World Anew', 'Bandung, de-dependency and China\'s development path.', '../Videos/lesson.html'],
  ['Research · 10 min', 'What China\'s Platform Shift Reveals', 'Observed migration, market implications and policy inference.', '../Article%20Sections/premium-intelligence.html']
];
const main = d.querySelector('main');
if (main && !d.body.classList.contains('master-home') && !d.body.classList.contains('master-member') && !d.body.classList.contains('master-article') && !d.body.classList.contains('master-section') && !d.body.classList.contains('master-premium-talks')) {
  main.insertAdjacentHTML('beforeend', `<section class="density-feed shell"><header><div class="kicker">Continue exploring</div><h2 class="display">More context, in less space.</h2></header><div class="density-grid">${discovery.map(([meta, title, copy, href]) => `<article class="density-item"><div class="kicker">${meta}</div><h3><a href="${href}">${title}</a></h3><p>${copy}</p><a class="density-arrow" href="${href}" aria-label="Open ${title}">→</a></article>`).join('')}</div></section>`);
}

const requestedTag = new URLSearchParams(location.search).get('tag');
if (requestedTag && location.pathname.endsWith('/search.html')) {
  const heading = d.querySelector('.page-hero h1');
  const input = d.querySelector('.search-box input');
  if (heading) heading.textContent = `Stories tagged "${requestedTag}"`;
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

const markVideoLabels = scope => scope.querySelectorAll('.theme-tag, .feature-copy .kicker, .card .kicker, .article-hero > a.eyebrow').forEach(label => label.classList.add('video-theme-label'));
d.querySelectorAll('[data-content-type="video"], .video-section').forEach(markVideoLabels);
if (page === 'video' || location.pathname.includes('premium-talk')) markVideoLabels(d.querySelector('main') || d.body);
d.querySelectorAll('.member-section').forEach(section => {
  if (section.querySelector('.member-section-title')?.textContent.trim() === 'Talks') markVideoLabels(section);
});

const premiumMediaSelector = [
  '.home-feature-media', '.member-card-image', '.section-card-media',
  '.gallery-image', '.feature-image', '.card-media', '.hero-media', '.course-media'
].join(',');
const labelPremiumMedia = scope => {
  scope.querySelectorAll(premiumMediaSelector).forEach(media => {
    if (!media.querySelector('img')) return;
    media.classList.add('premium-cover');
    let badge = media.querySelector(':scope > .premium-badge, :scope > .lock');
    if (!badge) {
      badge = d.createElement('span');
      media.append(badge);
    }
    badge.classList.add('premium-badge');
    badge.textContent = 'Premium';
  });
};
if (page === 'premium' || location.pathname.includes('premium-')) labelPremiumMedia(d);
d.querySelectorAll('.master-home .home-section').forEach(section => {
  if (section.querySelector('.home-section-title')?.textContent.trim() === 'Premium') labelPremiumMedia(section);
});

d.querySelectorAll('.master-section .section-card, .master-section .editor-pick, .master-premium-talks .talk-card').forEach((card, index) => {
  if (!card.dataset.words) card.dataset.words = String(880 + (index % 6) * 130);
  const lede = card.querySelector('.section-card-lede');
  const href = card.querySelector('h2 a, h3 a')?.getAttribute('href');
  if (!lede || !href || lede.querySelector('[data-read-time]')) return;
  const copy = lede.innerHTML.trim();
  lede.classList.add('lede-row');
  lede.innerHTML = `<a class="lede-link" href="${href}">${copy}</a><span class="read-time-pill" data-read-time></span>`;
});
d.querySelectorAll('.master-section .editor-pick').forEach(pick => {
  const time = pick.querySelector('time');
  if (!time || pick.querySelector('.theme-tag')) return;
  const meta = d.createElement('div');
  meta.className = 'editor-pick-meta';
  const theme = d.createElement('a');
  theme.className = 'theme-tag kicker';
  theme.setAttribute('data-auto-theme', '');
  theme.href = '#';
  theme.append(d.createElement('span'));
  time.before(meta);
  meta.append(theme, time);
});

const themeTaxonomy = Object.freeze([
  'China’s Economy & Business',
  'China’s Politics',
  'U.S.',
  'China’s Technology',
  'China’s Youth Sentiment',
  'China’s Worldview'
]);
const inferTheme = tag => {
  const label = tag.textContent.replace(/MORE\s*>>/gi, '').trim();
  const story = tag.closest('article, .article-hero, .member-section, .section-card');
  const context = `${label} ${story?.textContent || ''}`.toLowerCase();
  const exact = themeTaxonomy.find(theme => theme.toLowerCase() === label.toLowerCase());
  if (exact) return exact;
  if (tag.hasAttribute('data-auto-theme')) {
    if (/united states|\bu\.?s\.?\b|america|nato|trade blockade/.test(context)) return 'U.S.';
    if (/technology|tech|\bai\b|platform|digital|electric|\bev\b|infrastructure|engineering|energy|science/.test(context)) return 'China’s Technology';
    if (/youth|society|culture|education|mobility|consumer|generation|demograph|identity|china 101|christopher kutarna/.test(context)) return 'China’s Youth Sentiment';
    if (/world|global|diploma|international|brics|bandung|multipolar|geopolit|foreign policy|china.?japan|europe|india|security/.test(context)) return 'China’s Worldview';
    if (/politic|state|history|mao|governance|opinion|civilizational/.test(context)) return 'China’s Politics';
    if (/econom|finance|market|industry|industrial|business|trade|development|reconstruction|factory|factories/.test(context)) return 'China’s Economy & Business';
    return 'China’s Politics';
  }
  if (/united states|\bu\.?s\.?\b|america|nato|trade blockade/.test(label.toLowerCase())) return 'U.S.';
  if (/technology|tech|\bai\b|platform|digital|electric|\bev\b|infrastructure|engineering|energy|science/.test(label.toLowerCase())) return 'China’s Technology';
  if (/econom|finance|market|industry|industrial|business|trade|development|reconstruction/.test(label.toLowerCase())) return 'China’s Economy & Business';
  if (/youth|society|culture|education|mobility|consumer|generation/.test(label.toLowerCase())) return 'China’s Youth Sentiment';
  if (/world|global|diploma|international|brics|bandung|multipolar|geopolit|foreign policy|china.?japan|europe|india|security/.test(label.toLowerCase())) return 'China’s Worldview';
  if (/politic|state|history|mao|governance|opinion/.test(label.toLowerCase())) return 'China’s Politics';
  if (/united states|\bu\.?s\.?\b|america|nato/.test(context)) return 'U.S.';
  if (/technology|tech|\bai\b|platform|digital|electric|\bev\b|infrastructure|engineering|energy|science/.test(context)) return 'China’s Technology';
  if (/econom|finance|market|industry|industrial|business|trade|development|reconstruction/.test(context)) return 'China’s Economy & Business';
  if (/youth|society|culture|education|mobility|consumer|generation/.test(context)) return 'China’s Youth Sentiment';
  if (/world|global|diploma|international|brics|bandung|multipolar|geopolit|foreign policy|security/.test(context)) return 'China’s Worldview';
  return 'China’s Politics';
};

d.querySelectorAll('.section-topics:not([data-video-topics])').forEach(topics => {
  const allStories = topics.closest('.master-section')?.querySelector('.section-board');
  if (allStories && !allStories.id) allStories.id = 'all';
  topics.innerHTML = `<a href="#all" data-section-theme="All">All</a>${themeTaxonomy.map(theme => `<a href="#theme=${encodeURIComponent(theme)}" data-section-theme="${theme}">${theme}</a>`).join('')}`;
  if (!topics.nextElementSibling?.classList.contains('section-sort')) {
    topics.insertAdjacentHTML('afterend', `<div class="section-sort" role="group" aria-label="Sort articles"><span>Sort by</span><button class="active" type="button" data-section-sort="latest" aria-pressed="true">Latest</button><button type="button" data-section-sort="popular" aria-pressed="false">Popular</button></div>`);
  }
});

const canonicalThemeTags = d.querySelectorAll('.theme-tag, .article-tags a.article-tag, .article-hero > a.eyebrow');
canonicalThemeTags.forEach(tag => {
  const theme = inferTheme(tag);
  tag.textContent = theme;
  const articleSection = tag.closest('.master-section:not(.master-video-section)');
  if (tag.matches('a')) tag.href = articleSection ? `#theme=${encodeURIComponent(theme)}` : `../Utility/search.html?tag=${encodeURIComponent(theme)}`;
  tag.dataset.theme = theme;
  if (articleSection) tag.dataset.sectionTheme = theme;
});

const prepareThemeTag = tag => {
  if (!tag.classList.contains('theme-tag')) tag.classList.add('theme-tag');
  if (!tag.querySelector(':scope > span')) {
    const label = tag.textContent.trim();
    tag.textContent = '';
    const span = d.createElement('span');
    span.textContent = label;
    tag.append(span);
  }
};
canonicalThemeTags.forEach(prepareThemeTag);

d.querySelectorAll('.master-section:not(.master-video-section)').forEach(pageRoot => {
  const board = pageRoot.querySelector('.section-board');
  const topics = pageRoot.querySelector('.section-topics');
  if (!board || !topics) return;
  const cards = [...board.querySelectorAll('.section-card')];
  const picks = [...board.querySelectorAll('.editor-pick')];
  const grids = [...board.querySelectorAll('.section-card-grid')];
  const editorPicks = board.querySelector('.editor-picks');
  const loadRow = board.querySelector('.section-load-row');
  const loadButton = board.querySelector('[data-section-load-more]');
  const sortButtons = [...pageRoot.querySelectorAll('[data-section-sort]')];
  const initiallyHidden = new WeakMap(cards.map(card => [card, card.hidden]));
  let allExpanded = Boolean(loadButton?.hidden);
  let activeTheme = 'All';
  let activeSort = 'latest';
  let activeIndex = 0;
  let transitionToken = 0;
  cards.forEach((card, index) => {
    card.dataset.theme = card.querySelector('.theme-tag')?.dataset.theme || 'China’s Politics';
    card.dataset.published = card.querySelector('time')?.getAttribute('datetime') || '';
    if (!card.dataset.popularity) {
      const title = card.querySelector('h2, h3')?.textContent.trim() || String(index);
      card.dataset.popularity = String([...title].reduce((score, character, characterIndex) => score + character.charCodeAt(0) * (characterIndex + 1), 0));
    }
  });
  picks.forEach(pick => { pick.dataset.theme = pick.querySelector('.theme-tag')?.dataset.theme || 'China’s Politics'; });
  const empty = d.createElement('p');
  empty.className = 'section-empty';
  empty.hidden = true;
  board.insertBefore(empty, loadRow || null);
  const topicLinks = [...topics.querySelectorAll('[data-section-theme]')];
  const allLeadGrid = grids[0];
  const allTailGrid = grids[1];
  const baseAllCount = cards.filter(card => !initiallyHidden.get(card)).length;
  const allColumns = () => innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : innerWidth <= 1200 ? 3 : 4;
  const orderedCards = () => [...cards].sort((a, b) => activeSort === 'popular'
    ? Number(b.dataset.popularity) - Number(a.dataset.popularity)
    : String(b.dataset.published).localeCompare(String(a.dataset.published)));
  const allVisibleCount = () => allExpanded
    ? cards.length
    : Math.min(cards.length, Math.ceil(baseAllCount / allColumns()) * allColumns());
  const fillAllRows = () => {
    const visibleCount = allVisibleCount();
    orderedCards().forEach((card, index) => { card.hidden = index >= visibleCount; });
    if (loadButton) loadButton.hidden = allExpanded || visibleCount >= cards.length;
  };
  const arrangeAllCards = () => {
    if (!allLeadGrid) return;
    if (!editorPicks || !allTailGrid) {
      orderedCards().forEach(card => allLeadGrid.append(card));
      return;
    }
    const leadCount = allColumns();
    orderedCards().forEach((card, index) => (index < leadCount ? allLeadGrid : allTailGrid).append(card));
  };
  const arrangeThemeCards = () => {
    if (!allLeadGrid) return;
    orderedCards().forEach(card => allLeadGrid.append(card));
  };
  const applyTheme = (theme, requestedIndex = topicLinks.findIndex(link => link.dataset.sectionTheme === theme)) => {
    const nextIndex = requestedIndex < 0 ? 0 : requestedIndex;
    const direction = nextIndex >= activeIndex ? 1 : -1;
    activeIndex = nextIndex;
    const token = ++transitionToken;
    board.style.setProperty('--section-slide-out', direction > 0 ? '-32px' : '32px');
    board.style.setProperty('--section-slide-in', direction > 0 ? '32px' : '-32px');
    board.classList.add('is-sliding-out');
    setTimeout(() => {
      if (token !== transitionToken) return;
      const all = theme === 'All';
      activeTheme = theme;
      if (all) arrangeAllCards();
      else arrangeThemeCards();
      if (all) fillAllRows();
      else cards.forEach(card => { card.hidden = card.dataset.theme !== theme; });
      grids.forEach(grid => { grid.hidden = !grid.querySelector('.section-card:not([hidden])'); });
      if (editorPicks) editorPicks.hidden = !all;
      if (loadRow) loadRow.hidden = !all;
      const visibleCount = cards.filter(card => !card.hidden).length;
      empty.hidden = all || visibleCount > 0;
      empty.textContent = visibleCount ? '' : `No ${theme} stories are available in this demo yet.`;
      topicLinks.forEach(link => link.setAttribute('aria-current', String(link.dataset.sectionTheme === theme)));
      board.classList.remove('is-sliding-out');
      board.classList.add('is-sliding-in');
      requestAnimationFrame(() => requestAnimationFrame(() => board.classList.remove('is-sliding-in')));
      history.replaceState(null, '', all ? '#all' : `#theme=${encodeURIComponent(theme)}`);
    }, 190);
  };
  topicLinks.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault();
    applyTheme(link.dataset.sectionTheme, index);
  }));
  board.querySelectorAll('.theme-tag[data-section-theme]').forEach(tag => tag.addEventListener('click', event => {
    event.preventDefault();
    applyTheme(tag.dataset.sectionTheme);
  }));
  sortButtons.forEach(button => button.addEventListener('click', () => {
    const nextSort = button.dataset.sectionSort;
    if (nextSort === activeSort) return;
    activeSort = nextSort;
    sortButtons.forEach(control => {
      const selected = control.dataset.sectionSort === activeSort;
      control.classList.toggle('active', selected);
      control.setAttribute('aria-pressed', String(selected));
    });
    if (activeTheme === 'All') {
      arrangeAllCards();
      fillAllRows();
    } else {
      arrangeThemeCards();
      cards.forEach(card => { card.hidden = card.dataset.theme !== activeTheme; });
    }
    grids.forEach(grid => { grid.hidden = !grid.querySelector('.section-card:not([hidden])'); });
  }));
  loadButton?.addEventListener('click', () => { allExpanded = true; fillAllRows(); });
  let sectionLayoutFrame = 0;
  addEventListener('resize', () => {
    cancelAnimationFrame(sectionLayoutFrame);
    sectionLayoutFrame = requestAnimationFrame(() => {
      if (activeTheme !== 'All') return;
      arrangeAllCards();
      fillAllRows();
      grids.forEach(grid => { grid.hidden = !grid.querySelector('.section-card:not([hidden])'); });
    });
  }, { passive: true });
  arrangeAllCards();
  fillAllRows();
  const requestedTheme = decodeURIComponent(location.hash.replace(/^#theme=/, ''));
  if (location.hash.startsWith('#theme=') && themeTaxonomy.includes(requestedTheme)) applyTheme(requestedTheme);
  else topicLinks[0]?.setAttribute('aria-current', 'true');
});

d.querySelectorAll('.master-video-section').forEach(pageRoot => {
  const board = pageRoot.querySelector('[data-video-board]');
  const grid = board?.querySelector('[data-video-grid]');
  const topicLinks = [...pageRoot.querySelectorAll('[data-video-channel]')];
  const sortButtons = [...pageRoot.querySelectorAll('[data-video-sort]')];
  const cards = [...pageRoot.querySelectorAll('[data-video-card]')];
  const loadButton = pageRoot.querySelector('[data-video-load-more]');
  if (!board || !grid || !cards.length) return;
  const requestedChannel = new URLSearchParams(location.search).get('channel');
  let activeChannel = videoChannels.includes(requestedChannel) ? requestedChannel : 'All';
  let activeSort = 'latest';
  let expanded = false;
  const columns = () => innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : innerWidth <= 1200 ? 3 : 4;
  const matchingCards = () => cards.filter(card => activeChannel === 'All' || (card.dataset.videoChannel || '').split('|').includes(activeChannel));
  const renderVideoBoard = ({ updateUrl = true } = {}) => {
    const ordered = matchingCards().sort((a, b) => activeSort === 'popular'
      ? Number(b.dataset.popularity) - Number(a.dataset.popularity)
      : String(b.dataset.published).localeCompare(String(a.dataset.published)));
    const baseCount = Math.min(ordered.length, columns() * 2);
    const visibleCount = expanded || activeChannel !== 'All' ? ordered.length : baseCount;
    cards.forEach(card => { card.hidden = true; });
    ordered.forEach((card, index) => {
      grid.append(card);
      card.hidden = index >= visibleCount;
    });
    topicLinks.forEach(link => link.setAttribute('aria-current', String(link.dataset.videoChannel === activeChannel)));
    sortButtons.forEach(button => {
      const selected = button.dataset.videoSort === activeSort;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (loadButton) loadButton.hidden = activeChannel !== 'All' || expanded || visibleCount >= ordered.length;
    if (updateUrl) {
      const next = new URL(location.href);
      if (activeChannel === 'All') next.searchParams.delete('channel');
      else next.searchParams.set('channel', activeChannel);
      history.replaceState(null, '', `${next.pathname}${next.search}${next.hash}`);
    }
  };
  const animateVideoBoard = callback => {
    board.classList.add('is-sliding-out');
    setTimeout(() => {
      callback();
      board.classList.remove('is-sliding-out');
      board.classList.add('is-sliding-in');
      requestAnimationFrame(() => requestAnimationFrame(() => board.classList.remove('is-sliding-in')));
    }, 190);
  };
  topicLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const nextChannel = link.dataset.videoChannel;
    if (nextChannel === activeChannel) return;
    animateVideoBoard(() => {
      activeChannel = nextChannel;
      expanded = false;
      renderVideoBoard();
    });
  }));
  sortButtons.forEach(button => button.addEventListener('click', () => {
    const nextSort = button.dataset.videoSort;
    if (nextSort === activeSort) return;
    animateVideoBoard(() => {
      activeSort = nextSort;
      renderVideoBoard({ updateUrl: false });
    });
  }));
  loadButton?.addEventListener('click', () => { expanded = true; renderVideoBoard({ updateUrl: false }); });
  let videoLayoutFrame = 0;
  addEventListener('resize', () => {
    cancelAnimationFrame(videoLayoutFrame);
    videoLayoutFrame = requestAnimationFrame(() => renderVideoBoard({ updateUrl: false }));
  }, { passive: true });
  renderVideoBoard({ updateUrl: false });
});

d.querySelectorAll('[data-words], [data-duration]').forEach(item => {
  const words = Number(item.dataset.words) || 0;
  const video = item.matches('[data-content-type="video"]') || item.closest('[data-content-type="video"]');
  const minutes = Number(item.dataset.duration) || Math.max(1, Math.ceil(words / 220));
  const output = item.querySelector('[data-read-time]');
  if (output) output.innerHTML = `<span>${minutes} min ${video ? 'watch' : 'read'}</span>`;
});

d.querySelectorAll('.lede-row .read-time-pill').forEach(pill => {
  const lede = pill.closest('.lede-row');
  const destination = lede?.querySelector('.lede-link')?.getAttribute('href') || lede?.closest('article')?.querySelector('h1 a, h2 a, h3 a')?.getAttribute('href');
  if (!destination) return;
  if (pill.matches('a')) {
    if (!pill.getAttribute('href')) pill.setAttribute('href', destination);
    return;
  }
  const link = d.createElement('a');
  [...pill.attributes].forEach(attribute => link.setAttribute(attribute.name, attribute.value));
  link.setAttribute('href', destination);
  link.innerHTML = pill.innerHTML;
  pill.replaceWith(link);
});

const syncReadTimePillColors = () => d.querySelectorAll('.lede-row .read-time-pill').forEach(pill => {
  pill.style.setProperty('--read-time-fill', getComputedStyle(pill).color);
});
syncReadTimePillColors();
addEventListener('resize', syncReadTimePillColors, { passive: true });

const desktopCovers = matchMedia('(min-width: 931px)');
const fitCoverTypography = () => {
  const mainHeading = d.querySelector('.main-cover-heading');
  const mainTitle = mainHeading?.querySelector('h1');
  if (mainTitle) mainTitle.style.removeProperty('font-size');
  d.querySelectorAll('.home-feature .cover-heading').forEach(heading => {
    heading.querySelector('h2')?.style.removeProperty('font-size');
    heading.querySelector('.lede-row')?.style.removeProperty('font-size');
  });
  if (!desktopCovers.matches) return;

  if (mainHeading && mainTitle) {
    let size = 80;
    mainTitle.style.fontSize = `${size}px`;
    while (mainHeading.scrollHeight > mainHeading.clientHeight + 1 && size > 34) {
      size -= 1;
      mainTitle.style.fontSize = `${size}px`;
    }
  }

  d.querySelectorAll('.home-feature .cover-heading').forEach(heading => {
    const title = heading.querySelector('h2');
    const lede = heading.querySelector('.lede-row');
    if (!title || !lede) return;
    let titleSize = parseFloat(getComputedStyle(title).fontSize);
    let ledeSize = 20;
    lede.style.fontSize = '20px';
    while (heading.scrollHeight > heading.clientHeight + 1 && (ledeSize > 12 || titleSize > 22)) {
      if (ledeSize > 12) ledeSize -= .5;
      else titleSize -= .5;
      title.style.fontSize = `${titleSize}px`;
      lede.style.fontSize = `${ledeSize}px`;
    }
  });
};

let coverFitFrame = 0;
const requestCoverFit = () => {
  cancelAnimationFrame(coverFitFrame);
  coverFitFrame = requestAnimationFrame(fitCoverTypography);
};
if (d.querySelector('.recommendation-cover, .home-feature')) {
  addEventListener('resize', requestCoverFit, { passive: true });
  addEventListener('load', requestCoverFit, { once: true });
  desktopCovers.addEventListener?.('change', requestCoverFit);
  d.fonts?.ready.then(requestCoverFit);
  requestCoverFit();
}

const collectionBookmarkPath = 'M45.69,23.5h346A21.22,21.22,0,0,1,412.9,44.73V473.58c0,15.19-18.16,23-29.21,12.59L218.2,329.93,53,486.9c-11,10.49-29.28,2.64-29.25-12.59l.71-429.62A21.23,21.23,0,0,1,45.69,23.5Z';
const createCollectionBookmark = ({ id = '', saved = false, label = 'Save this article' } = {}) => {
  const control = d.createElement('div');
  control.className = 'collection-bookmark right';
  if (id) control.id = id;
  control.setAttribute('role', 'button');
  control.setAttribute('tabindex', '0');
  control.setAttribute('aria-label', label);
  control.setAttribute('aria-pressed', String(saved));
  control.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bookmark saved11${saved ? '' : ' active'}" viewBox="0 0 431.15 510.2" aria-hidden="true"><path class="saved1" d="${collectionBookmarkPath}" transform="translate(-2.75 -2.5)"></path></svg><svg xmlns="http://www.w3.org/2000/svg" class="bookmark saved22${saved ? ' active' : ''}" viewBox="0 0 431.15 510.2" aria-hidden="true"><path class="saved2" d="${collectionBookmarkPath}" transform="translate(-2.75 -2.5)"></path></svg>`;
  return control;
};

const articleLayout = d.querySelector('.master-article .article-layout');
if (articleLayout) {
  const articleBody = articleLayout.querySelector('.article-body');
  let leftRail = articleLayout.querySelector(':scope > .article-rail');
  const articleHero = d.querySelector('.master-article .article-hero');
  const articleTitle = articleHero?.querySelector('h1')?.textContent.trim() || d.title.replace(/ — The China Academy$/, '');
  if (articleHero) articleHero.id = 'article-top';
  const railTitle = leftRail?.querySelector('.side-title');
  if (railTitle) railTitle.innerHTML = `<a class="article-title-return" href="#article-top">${articleTitle}</a>`;
  const headings = [...articleBody.querySelectorAll('h2[id], h3[id], .news-item[id]')];
  if (leftRail && !leftRail.classList.contains('news-rail') && headings.length) {
    leftRail.classList.add('article-toc');
    if (!leftRail.querySelector('a')) {
      leftRail.insertAdjacentHTML('beforeend', headings.map(heading => `<a href="#${heading.id}">${heading.querySelector('h2')?.textContent || heading.textContent}</a>`).join(''));
    }
  }

  const oldRightRail = [...articleLayout.querySelectorAll(':scope > .article-rail')][1];
  oldRightRail?.remove();
  const articleTheme = articleHero?.querySelector('[data-theme]')?.dataset.theme || (/chang|lunar|technology|platform|digital/i.test(articleTitle) ? 'China’s Technology' : 'China’s Politics');
  const continueCourses = [
    { theme: 'China’s Worldview', title: 'Making the world Anew: Bandung Spirit and the De-dependency Development of China', lede: 'Presented by Yin Zhiguang.', href: 'https://thechinaacademy.org/lesson/making-the-world-anew-bandung-spirit-and-the-de-dependency-development-of-china/' },
    { theme: 'China’s Politics', title: "The Historical Logic and Modern Framework of China's Political System", lede: 'Presented by Fan Yongpeng.', href: 'https://thechinaacademy.org/lesson/the-historical-logic-and-modern-framework-of-chinas-political-system/' }
  ];
  const relatedStories = [
    { theme: 'U.S.', title: '“America Is in a Pre-Revolutionary Situation”', lede: 'A crisis of legitimacy and the political limits of the status quo.', href: 'https://thechinaacademy.org/america-is-in-a-pre-revolutionary-situation/' },
    { theme: 'U.S.', title: 'From TikTok to Rednote', lede: 'A platform ban unexpectedly opens a direct window onto everyday life.', href: '../Articles/article-text.html' },
    { theme: 'U.S.', title: 'How Mao Zedong Shattered the U.S. Trade Blockade', lede: 'Production, trade and political will outlasted a comprehensive embargo.', href: '../Articles/article-featured-image.html' },
    { theme: 'China’s Technology', title: "Chang'e-6 Returns with Lunar Far Side Samples", lede: 'Three developments in science, technology and public affairs.', href: '../Articles/article-news.html' },
    { theme: 'China’s Technology', title: 'China Has Nearly 50 Million EVs. Where Will Their Used Batteries Go?', lede: 'A fast-growing materials problem becomes a test of industrial coordination.', href: 'https://thechinaacademy.org/china-has-nearly-50-million-evs-where-will-their-used-batteries-go/' },
    { theme: 'China’s Technology', title: 'What China’s Platform Shift Reveals', lede: 'Evidence, market implications and policy inference in one concise brief.', href: '../Article%20Sections/premium-intelligence.html' },
    { theme: 'China’s Politics', title: "The Historical Logic and Modern Framework of China's Political System", lede: 'Institutions emerged from specific historical problems and modern state-building.', href: 'https://thechinaacademy.org/lesson/the-historical-logic-and-modern-framework-of-chinas-political-system/' },
    { theme: 'China’s Politics', title: 'The Rise of the Civilizational State', lede: 'A different account of governance and political modernity.', href: 'https://thechinaacademy.org/lesson/the-rise-of-the-civilizational-statepart-1/' }
  ];
  const currentPath = location.pathname;
  const isCurrentStory = story => {
    try { return new URL(story.href, location.href).pathname === currentPath; } catch { return false; }
  };
  const relatedForTheme = relatedStories.filter(story => story.theme === articleTheme && !isCurrentStory(story)).slice(0, 2);
  const sideStoryMarkup = story => `<article class="side-story" data-theme="${story.theme}"><span>${story.theme}</span><strong><a href="${story.href}">${story.title}</a></strong><small class="side-story-lede"><a class="lede-link" href="${story.href}">${story.lede}</a></small></article>`;
  articleLayout.insertAdjacentHTML('beforeend', `<aside class="article-rail article-recommendations" aria-label="Recommended reading"><section><div class="side-title">Continue exploring</div>${continueCourses.map(sideStoryMarkup).join('')}</section><section><div class="side-title">Related reading</div>${relatedForTheme.map(sideStoryMarkup).join('')}</section></aside>`);

  const articleKey = `${location.pathname}${location.search}`;
  const storageRead = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
  };
  const storageWrite = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };
  let collections = storageRead('tca-collections', ['Saved Articles', 'China Research', 'Read Later']);
  let savedArticles = storageRead('tca-saved-articles', []);
  const saveControl = createCollectionBookmark({ id: 'custom_collection_single' });
  const articleDeck = articleHero?.querySelector('.article-deck');
  articleDeck?.querySelector('.read-time-pill')?.remove();
  const saveRow = d.createElement('div');
  saveRow.className = `article-save-row${articleDeck ? '' : ' article-save-row--default'}`;
  saveRow.append(saveControl);
  if (articleDeck) {
    articleDeck.insertAdjacentElement('afterend', saveRow);
    const syncSaveSize = () => { saveRow.style.fontSize = getComputedStyle(articleDeck).fontSize; };
    addEventListener('resize', syncSaveSize, { passive: true });
    d.fonts?.ready.then(syncSaveSize);
    syncSaveSize();
  } else articleHero?.querySelector('h1')?.insertAdjacentElement('afterend', saveRow);
  if (saveControl.isConnected) {
    d.body.insertAdjacentHTML('beforeend', `<dialog class="author-dialog collection-dialog" id="collection-dialog"><form class="author-dialog-card collection-dialog-card"><button class="author-dialog-close" type="button" aria-label="Close">×</button><div class="kicker">Save this article</div><h2>Choose a collection</h2><div class="collection-list" data-collection-list></div><div class="collection-create"><input type="text" name="newCollection" maxlength="48" placeholder="New collection name" aria-label="New collection name"><button class="button" type="button" data-create-collection>Create</button></div><div class="collection-actions"><button class="button" type="submit">Save article</button><button class="button collection-remove" type="button" data-remove-saved hidden>Remove</button></div><p class="collection-status" aria-live="polite"></p></form></dialog>`);
    const collectionDialog = d.querySelector('#collection-dialog');
    const collectionForm = collectionDialog.querySelector('form');
    const collectionList = collectionDialog.querySelector('[data-collection-list]');
    const removeSaved = collectionDialog.querySelector('[data-remove-saved]');
    const collectionStatus = collectionDialog.querySelector('.collection-status');
    const currentSave = () => savedArticles.find(item => item.key === articleKey);
    const updateSaveButton = () => {
      const saved = currentSave();
      saveControl.dataset.saved = String(Boolean(saved));
      saveControl.setAttribute('aria-pressed', String(Boolean(saved)));
      saveControl.setAttribute('aria-label', saved ? `Saved in ${saved.collection}` : 'Save this article');
      saveControl.querySelector('.saved11').classList.toggle('active', !saved);
      saveControl.querySelector('.saved22').classList.toggle('active', Boolean(saved));
      removeSaved.hidden = !saved;
    };
    const renderCollections = selected => {
      collectionList.replaceChildren();
      collections.forEach((collection, index) => {
        const label = d.createElement('label');
        label.className = 'collection-option';
        const radio = d.createElement('input');
        radio.type = 'radio';
        radio.name = 'collection';
        radio.value = collection;
        radio.checked = collection === selected || (!selected && index === 0);
        label.append(radio, d.createTextNode(collection));
        collectionList.append(label);
      });
    };
    const openCollections = () => {
      collectionStatus.textContent = '';
      collectionForm.elements.newCollection.value = '';
      renderCollections(currentSave()?.collection);
      updateSaveButton();
      collectionDialog.showModal();
    };
    saveControl.addEventListener('click', openCollections);
    saveControl.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); openCollections(); } });
    collectionDialog.querySelector('.author-dialog-close').addEventListener('click', () => collectionDialog.close('cancel'));
    collectionDialog.addEventListener('click', event => { if (event.target === collectionDialog) collectionDialog.close('cancel'); });
    collectionDialog.querySelector('[data-create-collection]').addEventListener('click', () => {
      const name = collectionForm.elements.newCollection.value.trim();
      if (!name) { collectionStatus.textContent = 'Enter a collection name first.'; return; }
      if (!collections.includes(name)) collections.push(name);
      storageWrite('tca-collections', collections);
      renderCollections(name);
      collectionForm.elements.newCollection.value = '';
      collectionStatus.textContent = `Created “${name}”.`;
    });
    collectionForm.addEventListener('submit', event => {
      event.preventDefault();
      const collection = new FormData(collectionForm).get('collection');
      if (!collection) { collectionStatus.textContent = 'Choose or create a collection.'; return; }
      savedArticles = savedArticles.filter(item => item.key !== articleKey);
      savedArticles.push({ key: articleKey, title: articleTitle, collection });
      storageWrite('tca-saved-articles', savedArticles);
      updateSaveButton();
      collectionDialog.close('saved');
    });
    removeSaved.addEventListener('click', () => {
      savedArticles = savedArticles.filter(item => item.key !== articleKey);
      storageWrite('tca-saved-articles', savedArticles);
      updateSaveButton();
      collectionDialog.close('removed');
    });
    updateSaveButton();
  }

  if (!articleBody.querySelector('.article-editor')) articleBody.insertAdjacentHTML('beforeend', `<footer class="article-editor">Edited by The China Academy Editorial Desk</footer>`);

  const pageUrl = encodeURIComponent(location.href);
  const pageTitle = encodeURIComponent(d.title.replace(/ — The China Academy$/, ''));
  articleLayout.insertAdjacentHTML('afterend', `<section class="article-community shell" id="comments"><nav class="share-ports" aria-label="Share this article"><span class="sr-only">Share this article</span><a href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on X">X</a><a href="https://www.facebook.com/sharer.php?u=${pageUrl}" target="_blank" rel="noreferrer" aria-label="Share on Facebook">f</a><a href="https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">in</a><a href="https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on Reddit">r</a><a href="mailto:?subject=${pageTitle}&body=${pageUrl}" aria-label="Share by email">@</a></nav><div class="comments-head"><h2>Comments</h2><div class="comment-tabs" role="tablist"><button class="active" type="button" role="tab" aria-selected="true" data-comment-sort="latest">Latest</button><button type="button" role="tab" aria-selected="false" data-comment-sort="popular">Popular</button></div></div><div class="comment-composer" data-comment-composer><button class="comment-signin" type="button" data-comment-signin>Sign in to add a comment</button><form class="comment-entry" data-comment-entry hidden><span class="comment-avatar" aria-hidden="true"></span><div class="comment-entry-fields"><label class="sr-only" for="article-comment-input">Add a comment</label><textarea id="article-comment-input" name="comment" rows="3" maxlength="1200" placeholder="Add a comment…" required></textarea><div class="comment-entry-actions"><span class="comment-entry-status" aria-live="polite"></span><button type="submit">Post comment</button></div></div></form></div><div class="comment-list"><article class="comment" data-score="18" data-time="3"><header><strong>Maya L.</strong><time>3 hours ago</time></header><p>The side-by-side historical context makes the policy choices much easier to understand.</p><footer><button type="button" data-vote="1">↑ <span>18</span></button><button type="button" data-vote="-1">↓ <span>2</span></button><button type="button" data-reply>Reply</button></footer></article><article class="comment" data-score="31" data-time="8"><header><strong>Daniel R.</strong><time>8 hours ago</time></header><p>I would like to see the source documents linked directly beside the relevant paragraphs.</p><footer><button type="button" data-vote="1">↑ <span>31</span></button><button type="button" data-vote="-1">↓ <span>4</span></button><button type="button" data-reply>Reply</button></footer></article><article class="comment" data-score="12" data-time="26"><header><strong>Lin Q.</strong><time>Yesterday</time></header><p>The recommended-reading rail works well as a bridge to the wider argument.</p><footer><button type="button" data-vote="1">↑ <span>12</span></button><button type="button" data-vote="-1">↓ <span>1</span></button><button type="button" data-reply>Reply</button></footer></article></div></section>`);
  const articleCommunity = d.querySelector('.article-community');
  const commentSignin = articleCommunity.querySelector('[data-comment-signin]');
  const commentEntry = articleCommunity.querySelector('[data-comment-entry]');
  const commentList = articleCommunity.querySelector('.comment-list');
  const commentStorageKey = `tca-article-comments:${articleKey}`;
  const readStoredComments = () => {
    const items = storageRead(commentStorageKey, []);
    return Array.isArray(items) ? items : [];
  };
  const isCommentSignedIn = () => {
    try { return sessionStorage.getItem('tca-demo-signed-in') === '1'; } catch { return false; }
  };
  const renderCommentEntry = () => {
    const signedIn = isCommentSignedIn();
    commentSignin.hidden = signedIn;
    commentEntry.hidden = !signedIn;
  };
  const commentInitial = name => (name || 'Guest').trim().charAt(0).toUpperCase();
  const decorateComment = comment => {
    const header = comment.querySelector(':scope > header');
    const name = header?.querySelector(':scope > strong');
    if (!header || !name || header.querySelector('.comment-author')) return;
    const author = d.createElement('span');
    author.className = 'comment-author';
    const avatar = d.createElement('span');
    avatar.className = 'comment-avatar comment-avatar--initial';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = commentInitial(name.textContent);
    header.insertBefore(author, name);
    author.append(avatar, name);
  };
  const createUserComment = text => {
    const comment = d.createElement('article');
    comment.className = 'comment comment-user comment-root';
    comment.dataset.score = '0';
    comment.dataset.time = '0';
    comment.innerHTML = '<header><strong>You</strong><time>Just now</time></header><p></p><footer><button type="button" data-vote="1">↑ <span>0</span></button><button type="button" data-vote="-1">↓ <span>0</span></button><button type="button" data-reply>Reply</button></footer>';
    comment.querySelector('p').textContent = text;
    decorateComment(comment);
    return comment;
  };
  const createReplyComment = (text, targetName) => {
    const reply = d.createElement('article');
    reply.className = 'comment comment-user comment--reply';
    reply.innerHTML = '<header><strong>You</strong><time>Just now</time></header><p><span class="comment-mention"></span><span class="comment-reply-copy"></span></p><footer><button type="button" data-vote="1">↑ <span>0</span></button><button type="button" data-vote="-1">↓ <span>0</span></button><button type="button" data-reply>Reply</button></footer>';
    reply.querySelector('.comment-mention').textContent = `@${targetName}`;
    reply.querySelector('.comment-reply-copy').textContent = ` ${text}`;
    decorateComment(reply);
    return reply;
  };
  commentEntry.querySelector('.comment-avatar').textContent = 'Y';
  [...commentList.children].forEach(comment => {
    comment.classList.add('comment-root');
    decorateComment(comment);
  });
  readStoredComments().forEach(item => {
    if (typeof item?.text === 'string' && item.text.trim()) commentList.prepend(createUserComment(item.text.trim()));
  });
  commentSignin.addEventListener('click', () => {
    const signin = d.querySelector('[data-site-header] [data-signin]');
    if (signin) signin.click();
    else location.href = '../Utility/setting.html?mode=signin';
  });
  addEventListener('registrationchange', renderCommentEntry);
  renderCommentEntry();
  commentEntry.addEventListener('submit', event => {
    event.preventDefault();
    const textarea = commentEntry.elements.comment;
    const text = textarea.value.trim();
    if (!text) return;
    commentList.prepend(createUserComment(text));
    const saved = readStoredComments();
    saved.push({ text, createdAt: Date.now() });
    storageWrite(commentStorageKey, saved);
    textarea.value = '';
    commentEntry.querySelector('.comment-entry-status').textContent = 'Comment added.';
  });
  const recommendations = articleLayout.querySelector('.article-recommendations');
  const recommendationsMarker = d.createComment('desktop-recommendations-position');
  articleLayout.insertBefore(recommendationsMarker, recommendations);
  const articleMobile = matchMedia('(max-width: 900px)');
  const placeRecommendations = () => {
    if (articleMobile.matches) articleCommunity.insertAdjacentElement('afterend', recommendations);
    else articleLayout.insertBefore(recommendations, recommendationsMarker.nextSibling);
  };
  placeRecommendations();
  articleMobile.addEventListener?.('change', placeRecommendations);

  d.querySelectorAll('.master-article .article-related').forEach(section => section.remove());

  const featuredShell = d.querySelector('.article-featured-image-shell');
  const featuredImage = featuredShell?.querySelector('.article-hero-art img');
  const featuredOverlay = featuredShell?.querySelector('.article-hero-overlay');
  const featuredTitle = featuredOverlay?.querySelector('h1');
  const featuredMeta = featuredOverlay?.querySelector('.article-meta-line');
  const featuredAuthors = featuredOverlay?.querySelector('.author-deck');
  const sizeFeaturedHero = () => {
    if (!featuredShell || !featuredImage) return;
    featuredShell.style.removeProperty('width');
    if (!featuredOverlay || !featuredTitle || !featuredMeta || !featuredAuthors) return;
    let titleSize = 80;
    const overlayStyle = getComputedStyle(featuredOverlay);
    const availableHeight = featuredOverlay.clientHeight - parseFloat(overlayStyle.paddingTop) - parseFloat(overlayStyle.paddingBottom);
    while (titleSize >= 12) {
      featuredTitle.style.fontSize = `${titleSize}px`;
      const titleLineHeight = parseFloat(getComputedStyle(featuredTitle).lineHeight);
      featuredOverlay.style.setProperty('--featured-title-gap', `${titleLineHeight}px`);
      const contentHeight = featuredMeta.offsetHeight + featuredTitle.offsetHeight + featuredAuthors.offsetHeight + (titleLineHeight * 2);
      if (contentHeight <= availableHeight + 1) break;
      titleSize -= 1;
    }
  };
  featuredImage?.addEventListener('load', sizeFeaturedHero, { once: true });
  addEventListener('resize', sizeFeaturedHero, { passive: true });
  d.fonts?.ready.then(sizeFeaturedHero);
  requestAnimationFrame(sizeFeaturedHero);

  const railLinks = [...(leftRail?.querySelectorAll('a[href^="#"]') || [])];
  if (headings.length && railLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      railLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-18% 0px -68% 0px' });
    headings.forEach(heading => observer.observe(heading));
  }

  d.querySelectorAll('.author-chip').forEach(chip => {
    const image = chip.querySelector(':scope > img');
    if (image) {
      const avatar = d.createElement('span');
      avatar.className = 'author-avatar';
      image.before(avatar);
      avatar.append(image);
    }
    chip.setAttribute('role', 'button');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('aria-label', `Contact ${chip.querySelector('strong')?.textContent || 'the author'}`);
  });
  d.body.insertAdjacentHTML('beforeend', `<dialog class="author-dialog" id="author-dialog"><form method="dialog" class="author-dialog-card"><button class="author-dialog-close" type="button" aria-label="Close">×</button><div class="kicker">Contact the author</div><h2 data-author-name></h2><p data-author-bio></p><label>Email<input type="email" name="email" required placeholder="you@example.com"></label><label>Message<textarea name="message" required rows="5" placeholder="Write your message"></textarea></label><button class="button" value="send">Send message</button><p class="form-status" aria-live="polite"></p></form></dialog>`);
  const authorDialog = d.querySelector('#author-dialog');
  const authorForm = authorDialog.querySelector('form');
  const readCookie = name => d.cookie.split('; ').find(part => part.startsWith(`${name}=`))?.slice(name.length + 1);
  const draftFields = { email: authorForm.elements.email, message: authorForm.elements.message };
  Object.entries(draftFields).forEach(([name, field]) => {
    const cookieName = `tca-author-${name}`;
    let saved = readCookie(cookieName);
    try { saved ||= localStorage.getItem(cookieName); } catch {}
    if (saved) {
      try { field.value = decodeURIComponent(saved); } catch { field.value = saved; }
    }
    field.addEventListener('input', () => {
      const value = encodeURIComponent(field.value);
      d.cookie = `${cookieName}=${value}; Max-Age=2592000; Path=/; SameSite=Lax`;
      try { localStorage.setItem(cookieName, value); } catch {}
    });
  });
  authorDialog.querySelector('.author-dialog-close').addEventListener('click', () => authorDialog.close('cancel'));
  authorDialog.addEventListener('click', event => { if (event.target === authorDialog) authorDialog.close('cancel'); });
  const openAuthor = chip => {
    authorDialog.querySelector('[data-author-name]').textContent = chip.querySelector('strong')?.textContent || 'The author';
    const bio = authorDialog.querySelector('[data-author-bio]');
    bio.textContent = `${chip.querySelector('.author-chip span:not(.author-avatar)')?.textContent || ''} `;
    const learnMore = d.createElement('a');
    learnMore.href = '../About/contributors.html';
    learnMore.textContent = 'Learn more.';
    bio.append(learnMore);
    authorDialog.showModal();
  };
  d.querySelectorAll('.author-chip').forEach(chip => {
    chip.addEventListener('click', () => openAuthor(chip));
    chip.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); openAuthor(chip); } });
  });
  authorDialog.addEventListener('close', () => {
    if (authorDialog.returnValue === 'send') authorDialog.querySelector('.form-status').textContent = 'Demo message prepared. WordPress will handle delivery.';
  });

  articleCommunity.addEventListener('click', event => {
    const vote = event.target.closest('[data-vote]');
    if (vote && articleCommunity.contains(vote)) {
      if (vote.dataset.voted) return;
      const count = vote.querySelector('span');
      count.textContent = String(Number(count.textContent) + 1);
      vote.dataset.voted = 'true';
      return;
    }
    const reply = event.target.closest('[data-reply]');
    if (!reply || !articleCommunity.contains(reply)) return;
    const comment = reply.closest('.comment');
    const currentForm = comment.querySelector(':scope > .comment-reply');
    if (currentForm) { currentForm.querySelector('textarea').focus(); return; }
    const targetName = comment.querySelector(':scope > header strong')?.textContent?.trim() || 'Reader';
    const safeTargetName = targetName.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    comment.insertAdjacentHTML('beforeend', `<form class="comment-reply" data-comment-reply-form data-reply-to="${safeTargetName}"><label><span class="sr-only">Reply to ${safeTargetName}</span><textarea name="reply" rows="3" maxlength="1200" placeholder="Write a reply…" required></textarea></label><button type="submit">Post reply</button></form>`);
    comment.querySelector(':scope > .comment-reply textarea').focus();
  });
  articleCommunity.addEventListener('submit', event => {
    const replyForm = event.target.closest('[data-comment-reply-form]');
    if (!replyForm || !articleCommunity.contains(replyForm)) return;
    event.preventDefault();
    const text = replyForm.elements.reply.value.trim();
    if (!text) return;
    const comment = replyForm.closest('.comment');
    const rootComment = comment.classList.contains('comment-root') ? comment : comment.closest('.comment-root');
    if (!rootComment) return;
    let replies = [...rootComment.children].find(child => child.classList.contains('comment-replies'));
    if (!replies) {
      replies = d.createElement('div');
      replies.className = 'comment-replies';
      replies.setAttribute('aria-label', 'Replies');
      rootComment.append(replies);
    }
    replies.append(createReplyComment(text, replyForm.dataset.replyTo || 'Reader'));
    replyForm.remove();
  });
  d.querySelectorAll('[data-comment-sort]').forEach(button => button.addEventListener('click', () => {
    d.querySelectorAll('[data-comment-sort]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-selected', String(tab === button)); });
    const list = d.querySelector('.comment-list');
    const comments = [...list.children];
    comments.sort((a, b) => button.dataset.commentSort === 'popular' ? Number(b.dataset.score) - Number(a.dataset.score) : Number(a.dataset.time) - Number(b.dataset.time));
    comments.forEach(comment => list.append(comment));
  }));
}

const compactRecommendation = matchMedia('(max-width: 820px)');
const courseBoard = d.querySelector('.course-board-articles');
let courseBoardWidth = 0;
const syncCourseBoardCovers = () => {
  if (!courseBoard) return;
  if (!compactRecommendation.matches) {
    courseBoardWidth = 0;
    courseBoard.style.removeProperty('--course-card-width');
    courseBoard.style.removeProperty('--course-card-height');
    return;
  }
  const gap = parseFloat(getComputedStyle(courseBoard).columnGap) || 16;
  const nextWidth = Math.floor((courseBoard.clientWidth - gap) / 2);
  if (nextWidth <= 0 || nextWidth === courseBoardWidth) return;
  courseBoardWidth = nextWidth;
  courseBoard.style.setProperty('--course-card-width', `${nextWidth}px`);
  courseBoard.style.setProperty('--course-card-height', `${Math.round(nextWidth * 9 / 16)}px`);
};
syncCourseBoardCovers();
if (courseBoard && 'ResizeObserver' in window) new ResizeObserver(syncCourseBoardCovers).observe(courseBoard);
else addEventListener('resize', syncCourseBoardCovers, { passive: true });
const recommendationBoard = d.querySelector('.recommendation-board');
const mostRead = recommendationBoard?.querySelector('.most-read-column');
const mostReadMarker = mostRead ? d.createComment('most-read-desktop-position') : null;
const mostReadSlide = mostRead ? d.createElement('section') : null;
if (mostRead && mostReadMarker && mostReadSlide) {
  recommendationBoard.insertBefore(mostReadMarker, mostRead);
  mostReadSlide.className = 'recommendation-slide recommendation-most-read';
  mostReadSlide.setAttribute('aria-label', 'Most-read of the Month');
}
const updateRecommendationStructure = () => {
  if (!recommendationBoard || !mostRead || !mostReadMarker || !mostReadSlide) return;
  if (compactRecommendation.matches) {
    if (!mostReadSlide.isConnected) recommendationBoard.insertAdjacentElement('afterend', mostReadSlide);
    if (mostRead.parentElement !== mostReadSlide) mostReadSlide.append(mostRead);
  } else {
    if (mostRead.parentElement !== recommendationBoard) recommendationBoard.insertBefore(mostRead, mostReadMarker.nextSibling);
    mostReadSlide.remove();
  }
  dispatchEvent(new CustomEvent('gallerystructurechange'));
};
updateRecommendationStructure();
compactRecommendation.addEventListener?.('change', updateRecommendationStructure);
compactRecommendation.addEventListener?.('change', syncCourseBoardCovers);

const setupGalleryDots = gallery => {
  let dots = gallery.nextElementSibling?.classList.contains('gallery-dots') ? gallery.nextElementSibling : null;
  let ticking = false;
  let items = [];
  let activeIndex = 0;
  let autoFrame = 0;
  let autoStart = performance.now();
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoEnabled = gallery.classList.contains('recommendation-gallery');
  const itemLeft = item => item.offsetLeft - gallery.offsetLeft;
  const updateActive = () => {
    ticking = false;
    if (!dots || dots.hidden || !items.length) return;
    let active = 0;
    let distance = Infinity;
    items.forEach((item, index) => {
      const next = Math.abs(itemLeft(item) - gallery.scrollLeft);
      if (next < distance) { distance = next; active = index; }
    });
    if (active !== activeIndex) { activeIndex = active; autoStart = performance.now(); }
    dots.querySelectorAll('.gallery-dot').forEach((button, index) => {
      const isActive = index === active;
      button.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
      if (!isActive) button.style.setProperty('--progress', '0turn');
    });
  };
  const runAutoplay = now => {
    cancelAnimationFrame(autoFrame);
    if (!autoEnabled || !dots || dots.hidden || paused || items.length < 2) return;
    const elapsed = Math.min(1, (now - autoStart) / 10000);
    dots.querySelectorAll('.gallery-dot')[activeIndex]?.style.setProperty('--progress', `${elapsed}turn`);
    if (elapsed >= 1) {
      activeIndex = (activeIndex + 1) % items.length;
      autoStart = now;
      gallery.scrollTo({ left: itemLeft(items[activeIndex]), behavior: 'smooth' });
    }
    autoFrame = requestAnimationFrame(runAutoplay);
  };
  const syncRecommendationHeight = () => {
    if (!gallery.classList.contains('recommendation-gallery')) return;
    const zone = gallery.closest('.featured-zone');
    const cover = gallery.querySelector('.recommendation-cover');
    if (!cover) return;
    const coverHeight = Math.ceil(cover.getBoundingClientRect().height);
    if (!compactRecommendation.matches) {
      gallery.style.height = `${coverHeight}px`;
      zone?.style.removeProperty('height');
      return;
    }
    if (!dots || dots.hidden) return;
    const dotsHeight = Math.ceil(dots.getBoundingClientRect().height);
    const lede = cover.querySelector('.cover-lede');
    const gap = Math.ceil(parseFloat(lede ? getComputedStyle(lede).lineHeight : '24'));
    gallery.style.height = `${coverHeight}px`;
    dots.style.top = `${coverHeight + gap}px`;
    if (zone) zone.style.height = `${coverHeight + gap + dotsHeight}px`;
  };
  const render = () => {
    const rawItems = [...gallery.children].filter(item => item.matches('.recommendation-slide, .gallery-card'));
    const columns = new Map();
    rawItems.forEach(item => { const key = Math.round(itemLeft(item)); if (!columns.has(key)) columns.set(key, item); });
    items = [...columns.values()];
    if (items.length < 2) { if (dots) dots.hidden = true; return; }
    if (dots && dots.querySelectorAll('.gallery-dot').length !== items.length) { dots.remove(); dots = null; }
    const overflow = gallery.scrollWidth > gallery.clientWidth + 2;
    if (!overflow) { if (dots) dots.hidden = true; return; }
    if (!dots) {
      dots = d.createElement('div');
      dots.className = 'gallery-dots';
      dots.setAttribute('aria-label', 'Gallery position');
      dots.innerHTML = `${autoEnabled ? `<button class="gallery-toggle" type="button" aria-label="${paused ? 'Play' : 'Pause'} gallery" aria-pressed="${paused}"></button>` : ''}${items.map((_, index) => `<button class="gallery-dot" type="button" aria-label="Go to gallery item ${index + 1}"></button>`).join('')}`;
      gallery.insertAdjacentElement('afterend', dots);
      dots.querySelectorAll('.gallery-dot').forEach((button, index) => button.addEventListener('click', () => {
        activeIndex = index;
        autoStart = performance.now();
        gallery.scrollTo({ left: itemLeft(items[index]), behavior: 'smooth' });
      }));
      dots.querySelector('.gallery-toggle')?.addEventListener('click', event => {
        paused = !paused;
        event.currentTarget.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} gallery`);
        event.currentTarget.setAttribute('aria-pressed', String(paused));
        autoStart = performance.now();
        if (!paused) autoFrame = requestAnimationFrame(runAutoplay);
      });
    }
    dots.hidden = false;
    updateActive();
    syncRecommendationHeight();
    if (autoEnabled && !paused) autoFrame = requestAnimationFrame(runAutoplay);
  };
  gallery.addEventListener('pointerdown', () => { autoStart = performance.now(); }, { passive: true });
  gallery.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
  }, { passive: true });
  addEventListener('resize', render, { passive: true });
  addEventListener('load', render, { once: true });
  addEventListener('gallerystructurechange', render);
  d.fonts?.ready.then(render);
  requestAnimationFrame(render);
};
d.querySelectorAll('.recommendation-gallery, .story-gallery').forEach(setupGalleryDots);

d.querySelectorAll('[data-section-load-more]').forEach(button => {
  button.addEventListener('click', () => {
    const page = button.closest('.section-page');
    page?.querySelectorAll('[data-section-extra][hidden]').forEach(card => { card.hidden = false; });
    button.hidden = true;
  });
});

const progress = d.querySelector('[data-progress]');
const onScroll = () => {
  const h = d.documentElement;
  if (progress) progress.style.width = `${h.scrollHeight > h.clientHeight ? h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 : 0}%`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
