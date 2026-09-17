(() => {
  const d = document;
  const hero = d.querySelector('.about-hero');
  if (!hero) return;
  const stats = hero.querySelector('.about-stats');
  const values = [...hero.querySelectorAll('.about-stats-value')];
  const mobile = matchMedia('(max-width:820px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fitNumbers = () => {
    if (!values.length) return;
    if (!mobile.matches || !stats) {
      values.forEach(value => { value.style.fontSize = ''; });
      return;
    }
    const target = (stats.clientWidth || hero.clientWidth) * 2 / 3;
    values.forEach(value => {
      value.style.fontSize = '100px';
      const width = value.getBoundingClientRect().width;
      value.style.fontSize = width > 0 ? `${Math.min(360, 100 * target / width)}px` : '';
    });
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

  addEventListener('resize', fitNumbers);
  mobile.addEventListener?.('change', fitNumbers);
  if (d.fonts?.ready) d.fonts.ready.then(fitNumbers);
})();
