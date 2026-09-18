(() => {
  const d = document;
  const hero = d.querySelector('.about-hero');
  if (!hero) return;
  const stats = hero.querySelector('.about-stats');
  const title = hero.querySelector('.about-hero-title');
  const values = [...hero.querySelectorAll('.about-stats-value')];
  const mobile = matchMedia('(max-width:820px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fitTitleToStats = () => {
    if (!title || !stats) return;
    const spans = [...title.children];
    if (!spans.length) return;
    const gap = parseFloat(getComputedStyle(title).rowGap) || 0;
    const contentHeight = () => spans.reduce((sum, span) => sum + span.getBoundingClientRect().height, 0) + gap * (spans.length - 1);
    const setSize = size => { title.style.fontSize = `${size}px`; };
    title.style.height = '';
    title.style.transform = '';
    title.style.width = '';
    title.style.whiteSpace = '';
    title.style.lineHeight = '';
    title.style.justifyContent = 'center';
    setSize(1);
    const heroWidth = hero.getBoundingClientRect().width;
    const statsWidth = stats.getBoundingClientRect().width;
    const zone = Math.max(1, heroWidth - statsWidth * 1.5);
    const target = stats.getBoundingClientRect().height;
    if (!target) { title.style.fontSize = ''; title.style.width = ''; title.style.justifyContent = ''; return; }
    title.style.width = `${zone}px`;
    title.style.height = `${target}px`;
    let lo = 1;
    let hi = 16;
    setSize(hi);
    for (let i = 0; i < 14 && contentHeight() < target; i += 1) {
      lo = hi;
      hi *= 2;
      setSize(hi);
    }
    for (let i = 0; i < 20; i += 1) {
      const mid = (lo + hi) / 2;
      setSize(mid);
      if (contentHeight() > target) hi = mid; else lo = mid;
    }
    setSize(lo);
  };

  const setTitleSize = size => {
    if (!title) return;
    title.style.height = '';
    title.style.lineHeight = '';
    title.style.width = '';
    title.style.whiteSpace = '';
    title.style.transform = '';
    title.style.justifyContent = '';
    title.style.fontSize = size ? `${size}px` : '';
  };

  const fitNumbers = () => {
    if (mobile.matches && stats) {
      const target = (stats.clientWidth || hero.clientWidth) * 2 / 3;
      let titleSize = 0;
      values.forEach((value, index) => {
        value.style.fontSize = '100px';
        const width = value.getBoundingClientRect().width;
        const size = width > 0 ? Math.min(360, 100 * target / width) : 0;
        value.style.fontSize = size ? `${size}px` : '';
        if (!index && size) titleSize = size;
      });
      setTitleSize(titleSize * 0.8);
      return;
    }
    values.forEach(value => { value.style.fontSize = ''; });
    fitTitleToStats();
  };

  const countUp = value => {
    const to = Number(value.dataset.countTo || '0');
    const suffix = value.dataset.suffix || '';
    if (reduceMotion) { value.textContent = `${to}${suffix}`; return; }
    const duration = 1200;
    const start = performance.now();
    value.textContent = `0${suffix}`;
    const step = now => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      value.textContent = `${Math.round(to * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const run = () => {
    fitNumbers();
    values.forEach(countUp);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        run();
        obs.disconnect();
      });
    }, { threshold: 0.2 });
    observer.observe(hero);
  } else {
    run();
  }

  let frame = 0;
  const scheduleFit = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; fitNumbers(); });
  };
  addEventListener('resize', scheduleFit);
  mobile.addEventListener?.('change', scheduleFit);
  if (d.fonts?.ready) d.fonts.ready.then(scheduleFit);
})();
