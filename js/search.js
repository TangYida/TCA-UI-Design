(() => {
  const d = document;
  const articleList = d.querySelector('[data-search-article-list]');
  const authorList = d.querySelector('[data-search-author-list]');
  const summary = d.querySelector('[data-search-summary]');
  const input = d.querySelector('[data-search-form] input');
  const loadMore = d.querySelector('[data-search-load-more]');
  const sortControls = d.querySelector('[data-search-sort-controls]');
  const topicResults = d.querySelector('[data-search-topic-results]');
  const pageSize = 4;

  const topics = [
    'China’s Economy & Business', 'China’s Politics', 'U.S.',
    'China’s Technology', 'China’s Youth Sentiment', 'China’s Worldview'
  ];

  const articles = [
    {title:'Beijing Is Finessing Its Real Estate Strategy',theme:'China’s Economy & Business',date:'2026-08-20',dateLabel:'Aug 20, 2026',lede:'Housing consumption is being restored to a central role in expanding domestic demand.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Housing development in Beijing',href:'https://thechinaacademy.org/beijing-is-finessing-its-real-estate-strategy/',words:1080,popularity:88},
    {title:'DeepSeek Just Drew a Brutal “Kill Line” on This Chart',theme:'China’s Technology',date:'2026-08-05',dateLabel:'Aug 5, 2026',lede:'Performance and pricing are redrawing the global market for AI developers.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/57ff5cce-a066-45ae-8c72-5a93d3f0f867.webp',alt:'Artificial intelligence and industrial automation',href:'https://thechinaacademy.org/deepseek-just-drew-a-brutal-kill-line-on-this-chart/',words:1320,popularity:96},
    {title:'From TikTok to Rednote',theme:'China’s Youth Sentiment',date:'2025-01-17',dateLabel:'Jan 17, 2025',lede:'A platform ban unexpectedly became an experiment in mass contact across digital borders.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/52e9cfc3-4a31-408f-b5d9-0000d042091d.png',alt:'Mobile platforms illustrating a digital migration',href:'../Articles/article-text.html',words:1760,popularity:91},
    {title:'How Mao Zedong Shattered the U.S. Trade Blockade',theme:'China’s Politics',date:'2025-05-20',dateLabel:'May 20, 2025',lede:'The institutions and political choices that turned containment into a failed strategy.',image:'https://thechinaacademy.org/wp-content/uploads/2025/05/MAIN201309051603000538109071559_副本.webp',alt:'Historical image of early People’s Republic diplomacy',href:'../Articles/article-featured-image.html',words:2420,popularity:84},
    {title:'How China Builds the World’s Tallest Bridge',theme:'China’s Technology',date:'2025-09-30',dateLabel:'Sep 30, 2025',lede:'Zhang Weiwei examines the geology, logistics and coordination behind a record-breaking bridge.',image:'https://thechinaacademy.org/wp-content/uploads/2025/09/Screen-Shot-2025-09-30-at-3.32.02-PM.webp',alt:'The world’s tallest bridge in China',href:'../Videos/premium-talk-detail.html',duration:39,popularity:99,video:true,premium:true},
    {title:'After the Earthquake, Reconstruction Is the Real Challenge',theme:'China’s Worldview',date:'2026-08-17',dateLabel:'Aug 17, 2026',lede:'The political story of disaster begins after emergency coverage ends.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/封面-2.webp',alt:'Global South reconstruction after an earthquake',href:'../Videos/video-article.html',duration:24,popularity:82,video:true},
    {title:'Bandung and the Work of De-dependency',theme:'China’s Worldview',date:'2025-10-01',dateLabel:'Oct 1, 2025',lede:'Political independence becomes durable only when productive capacity follows.',image:'https://thechinaacademy.org/wp-content/uploads/2025/10/万隆会议.jpeg',alt:'Delegates at the Bandung Conference',href:'../Videos/lesson.html',duration:42,popularity:78,video:true,premium:true}
  ];

  const authors = [
    {name:'Zhang Weiwei',role:'Professor of Political Science; Director the China Institute of Fudan University',image:'https://thechinaacademy.org/wp-content/uploads/2024/12/abe5459f-6c1e-4922-989a-aca1bbb1856a-1-e1733479055114-1.webp',href:'https://thechinaacademy.org/column_zhang-weiwei/'}
  ];

  const state = {tab:'article',sort:'latest',visible:pageSize,query:'ddd'};
  const escapeHtml = value => String(value).replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character]));
  const resultLabel = count => `${count} result${count === 1 ? '' : 's'} found for “${state.query}”`;

  const articleMarkup = item => {
    const minutes = item.duration || Math.max(1, Math.ceil(item.words / 220));
    const kind = item.video ? 'watch' : 'read';
    const premium = item.premium ? '<span class="premium-badge">Premium</span>' : '';
    const videoClass = item.video ? ' video-theme-label' : '';
    const mediaClass = item.premium ? 'section-card-media premium-cover' : 'section-card-media';
    return `<article class="section-card"${item.video ? ' data-content-type="video"' : ''}>
      <figure class="${mediaClass}">${premium}<img src="${item.image}" alt="${escapeHtml(item.alt)}"></figure>
      <div class="section-card-meta"><a class="theme-tag kicker${videoClass}" href="tag.html?name=${encodeURIComponent(item.theme)}"><span>${escapeHtml(item.theme)}</span></a><time datetime="${item.date}">${item.dateLabel}</time></div>
      <h2><a href="${item.href}">${escapeHtml(item.title)}</a></h2>
      <p class="section-card-lede lede-row"><a class="lede-link" href="${item.href}">${escapeHtml(item.lede)}</a><a class="read-time-pill" href="${item.href}" data-read-time><span>${minutes} min ${kind}</span></a></p>
    </article>`;
  };

  const authorMarkup = author => `<article class="search-author-result">
    <figure><img src="${author.image}" alt="${escapeHtml(author.name)}"></figure>
    <div><h2><a href="${author.href}">${escapeHtml(author.name)}</a></h2><p>${escapeHtml(author.role)}</p></div>
  </article>`;

  const orderedArticles = () => [...articles].sort((a, b) => state.sort === 'popular'
    ? b.popularity - a.popularity
    : b.date.localeCompare(a.date));

  const renderTopicResults = () => {
    if (!topicResults) return;
    const normalize = value => value.toLowerCase().replace(/[’'.,&]/g, ' ').replace(/\s+/g, ' ').trim();
    const query = normalize(state.query);
    const queryTerms = query.split(' ').filter(Boolean);
    const matches = query && query !== 'all' ? topics.filter(topic => {
      const normalizedTopic = normalize(topic);
      return queryTerms.every(term => normalizedTopic.includes(term));
    }) : [];
    topicResults.hidden = matches.length === 0;
    topicResults.innerHTML = matches.length ? `<span>Topics</span>${matches.map(topic => `<a href="tag.html?name=${encodeURIComponent(topic)}">${escapeHtml(topic)}</a>`).join('')}` : '';
  };

  const syncPillColors = () => d.querySelectorAll('.search-card-grid .read-time-pill').forEach(pill => {
    pill.style.setProperty('--read-time-fill', getComputedStyle(pill).color);
  });

  const render = () => {
    const articleMode = state.tab === 'article';
    renderTopicResults();
    d.querySelector('[data-search-panel="article"]').hidden = !articleMode;
    d.querySelector('[data-search-panel="author"]').hidden = articleMode;
    sortControls.hidden = !articleMode;
    d.querySelectorAll('[data-search-tab]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.searchTab === state.tab)));

    if (articleMode) {
      const ordered = orderedArticles();
      articleList.innerHTML = ordered.slice(0, state.visible).map(articleMarkup).join('');
      loadMore.hidden = state.visible >= ordered.length;
      summary.textContent = resultLabel(ordered.length);
      requestAnimationFrame(syncPillColors);
    } else {
      authorList.innerHTML = authors.map(authorMarkup).join('');
      summary.textContent = resultLabel(authors.length);
    }
  };

  d.querySelectorAll('[data-search-tab]').forEach(button => button.addEventListener('click', () => {
    state.tab = button.dataset.searchTab;
    state.visible = pageSize;
    render();
  }));

  d.querySelectorAll('[data-search-sort]').forEach(button => button.addEventListener('click', () => {
    state.sort = button.dataset.searchSort;
    state.visible = pageSize;
    d.querySelectorAll('[data-search-sort]').forEach(option => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    render();
  }));

  loadMore.addEventListener('click', () => {
    state.visible = Math.min(articles.length, state.visible + pageSize);
    render();
  });

  d.querySelector('[data-search-form]').addEventListener('submit', event => {
    event.preventDefault();
    state.query = input.value.trim() || 'All';
    state.tab = 'article';
    state.visible = pageSize;
    const url = new URL(location.href);
    url.searchParams.delete('tag');
    url.searchParams.set('s', state.query);
    history.replaceState({}, '', url);
    render();
  });

  const parameters = new URLSearchParams(location.search);
  state.query = parameters.get('s') || parameters.get('tag') || input.value || 'ddd';
  input.value = state.query;
  const syncEditorialRail = () => {
    const header = d.querySelector('.site-header');
    const height = header ? Math.ceil(header.getBoundingClientRect().height) + 16 : 134;
    d.documentElement.style.setProperty('--utility-header-height', `${height}px`);
  };
  const header = d.querySelector('.site-header');
  if ('ResizeObserver' in window && header) new ResizeObserver(syncEditorialRail).observe(header);
  window.addEventListener('resize', syncEditorialRail, {passive:true});
  syncEditorialRail();
  render();
})();
