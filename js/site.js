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

const videoLinks = [
  'China Currents', 'China Now', 'Global Arena', 'Speak Softly', 'Thinkers Forum',
  'Threshold', 'Overlap', 'TOP PICKS', 'Roughly Chinese', 'China On the Ground', 'The Unfiltered'
];
const premiumLinks = [
  ['Courses', '../About/premium-courses.html'],
  ['Intelligence', '../Article%20Sections/premium-intelligence.html'],
  ['Talks', '../Video%20Sections/premium-talks.html']
];
const nav = (label, href, key) => `<a ${page === key ? 'aria-current="page"' : ''} href="${href}">${label}</a>`;
const dropdown = (label, items, className = '') => `<div class="nav-dropdown ${className}">
  <button class="nav-drop-trigger" type="button" aria-expanded="false">${label}<span aria-hidden="true">⌄</span></button>
  <div class="nav-drop-panel">${items.map(item => Array.isArray(item)
    ? `<a href="${item[1]}">${item[0]}</a>`
    : `<a href="../Video%20Sections/video.html">${item}</a>`).join('')}</div>
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
        <nav class="title-nav title-nav-right">${dropdown('Video', videoLinks, 'video-dropdown')}${dropdown('Premium', premiumLinks, 'premium-dropdown')}<a href="https://chinanotjusttravel.com/">Not Just Travel</a></nav>
        <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span></button>
      </div>
      <div class="mobile-drawer" data-mobile-drawer role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
        <nav class="mobile-primary">${nav('Home', '../Homepage/index.html', 'home')}${nav('Trending', '../Article%20Sections/trending.html', 'trending')}${nav('Opinion', '../Article%20Sections/thinkers-forum.html', 'thinkers')}<a href="https://chinanotjusttravel.com/">Not Just Travel</a></nav>
        <div class="mobile-group"><button type="button" data-mobile-submenu aria-expanded="false">Video <span>＋</span></button><div class="mobile-submenu">${videoLinks.map(x => `<a href="../Video%20Sections/video.html">${x}</a>`).join('')}</div></div>
        <div class="mobile-group"><button type="button" data-mobile-submenu aria-expanded="false">Premium <span>＋</span></button><div class="mobile-submenu">${premiumLinks.map(x => `<a href="${x[1]}">${x[0]}</a>`).join('')}</div></div>
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
  header.querySelectorAll('.nav-drop-trigger').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    const item = button.closest('.nav-dropdown');
    const open = !item.classList.contains('open');
    closeDesktopDropdowns(item);
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  }));
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
if (main && !d.body.classList.contains('master-home') && !d.body.classList.contains('master-member') && !d.body.classList.contains('master-article') && !d.body.classList.contains('master-section')) {
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

d.querySelectorAll('.master-section .section-card').forEach((card, index) => {
  if (!card.dataset.words) card.dataset.words = String(880 + (index % 6) * 130);
  const lede = card.querySelector('.section-card-lede');
  const href = card.querySelector('h2 a, h3 a')?.getAttribute('href');
  if (!lede || !href || lede.querySelector('[data-read-time]')) return;
  const copy = lede.textContent.trim();
  lede.classList.add('lede-row');
  lede.innerHTML = `<a class="lede-link" href="${href}">${copy}</a><span class="read-time-pill" data-read-time></span>`;
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
d.querySelectorAll('.theme-tag, .article-tags a.article-tag, .article-hero > a.eyebrow').forEach(prepareThemeTag);

d.querySelectorAll('[data-words], [data-duration]').forEach(item => {
  const words = Number(item.dataset.words) || 0;
  const video = item.matches('[data-content-type="video"]') || item.closest('[data-content-type="video"]');
  const minutes = Number(item.dataset.duration) || Math.max(1, Math.ceil(words / 220));
  const output = item.querySelector('[data-read-time]');
  if (output) output.innerHTML = `<span>${minutes} min ${video ? 'watch' : 'read'}</span>`;
});

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
  articleLayout.insertAdjacentHTML('beforeend', `<aside class="article-rail article-recommendations" aria-label="Recommended reading"><section><div class="side-title">Continue exploring</div><a class="side-story" href="https://thechinaacademy.org/the-historical-logic-and-modern-framework-of-chinas-political-system/"><span>Political system</span><strong>The Historical Logic and Modern Framework of China's Political System</strong><small>How institutions emerged from China's historical problems and modern state-building.</small></a><a class="side-story" href="https://thechinaacademy.org/china-has-nearly-50-million-evs-where-will-their-used-batteries-go/"><span>Electric vehicles</span><strong>China Has Nearly 50 Million EVs. Where Will Their Used Batteries Go?</strong><small>A fast-growing materials problem becomes a test of industrial coordination.</small></a></section><section><div class="side-title">Related reading</div><a class="side-story" href="../Articles/article-text.html"><span>Digital culture</span><strong>From TikTok to Rednote</strong><small>A platform ban unexpectedly opens a direct window onto everyday life.</small></a><a class="side-story" href="../Articles/article-news.html"><span>News briefing</span><strong>Chang'e-6 Returns with Lunar Far Side Samples</strong><small>Three developments in science, technology and public affairs.</small></a></section></aside>`);

  if (!articleBody.querySelector('.article-editor')) articleBody.insertAdjacentHTML('beforeend', `<footer class="article-editor">Edited by The China Academy Editorial Desk</footer>`);

  const pageUrl = encodeURIComponent(location.href);
  const pageTitle = encodeURIComponent(d.title.replace(/ — The China Academy$/, ''));
  articleLayout.insertAdjacentHTML('afterend', `<section class="article-community shell" id="comments"><nav class="share-ports" aria-label="Share this article"><span class="sr-only">Share this article</span><a href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on X">X</a><a href="https://www.facebook.com/sharer.php?u=${pageUrl}" target="_blank" rel="noreferrer" aria-label="Share on Facebook">f</a><a href="https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">in</a><a href="https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}" target="_blank" rel="noreferrer" aria-label="Share on Reddit">r</a><a href="mailto:?subject=${pageTitle}&body=${pageUrl}" aria-label="Share by email">@</a></nav><div class="comments-head"><h2>Comments</h2><div class="comment-tabs" role="tablist"><button class="active" type="button" role="tab" aria-selected="true" data-comment-sort="latest">Latest</button><button type="button" role="tab" aria-selected="false" data-comment-sort="popular">Popular</button></div></div><div class="comment-list"><article class="comment" data-score="18" data-time="3"><header><strong>Maya L.</strong><time>3 hours ago</time></header><p>The side-by-side historical context makes the policy choices much easier to understand.</p><footer><button type="button" data-vote="1">↑ <span>18</span></button><button type="button" data-vote="-1">↓ <span>2</span></button><button type="button" data-reply>Reply</button></footer></article><article class="comment" data-score="31" data-time="8"><header><strong>Daniel R.</strong><time>8 hours ago</time></header><p>I would like to see the source documents linked directly beside the relevant paragraphs.</p><footer><button type="button" data-vote="1">↑ <span>31</span></button><button type="button" data-vote="-1">↓ <span>4</span></button><button type="button" data-reply>Reply</button></footer></article><article class="comment" data-score="12" data-time="26"><header><strong>Lin Q.</strong><time>Yesterday</time></header><p>The recommended-reading rail works well as a bridge to the wider argument.</p><footer><button type="button" data-vote="1">↑ <span>12</span></button><button type="button" data-vote="-1">↓ <span>1</span></button><button type="button" data-reply>Reply</button></footer></article></div></section>`);
  const articleCommunity = d.querySelector('.article-community');
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

  d.querySelectorAll('[data-vote]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.voted) return;
    const count = button.querySelector('span');
    count.textContent = String(Number(count.textContent) + 1);
    button.dataset.voted = 'true';
  }));
  d.querySelectorAll('[data-reply]').forEach(button => button.addEventListener('click', () => {
    const comment = button.closest('.comment');
    if (comment.querySelector('.comment-reply')) return;
    comment.insertAdjacentHTML('beforeend', `<label class="comment-reply"><span class="sr-only">Reply</span><textarea rows="3" placeholder="Write a reply"></textarea><button type="button">Post reply</button></label>`);
    comment.querySelector('textarea').focus();
  }));
  d.querySelectorAll('[data-comment-sort]').forEach(button => button.addEventListener('click', () => {
    d.querySelectorAll('[data-comment-sort]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-selected', String(tab === button)); });
    const list = d.querySelector('.comment-list');
    const comments = [...list.children];
    comments.sort((a, b) => button.dataset.commentSort === 'popular' ? Number(b.dataset.score) - Number(a.dataset.score) : Number(a.dataset.time) - Number(b.dataset.time));
    comments.forEach(comment => list.append(comment));
  }));
}

const compactRecommendation = matchMedia('(max-width: 580px)');
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