(() => {
  const d = document;
  const title = d.querySelector('[data-tag-title]');
  const grid = d.querySelector('[data-tag-grid]');
  const empty = d.querySelector('[data-tag-empty]');
  const loadMore = d.querySelector('[data-tag-load-more]');
  if (!title || !grid || !empty || !loadMore) return;

  const topics = [
    'China’s Economy & Business',
    'China’s Politics',
    'U.S.',
    'China’s Technology',
    'China’s Youth Sentiment',
    'China’s Worldview'
  ];
  const content = [
    {theme:topics[0],title:'Beijing Is Finessing Its Real Estate Strategy',date:'2026-08-20',dateLabel:'Aug 20, 2026',lede:'Housing consumption is being restored to a central role in expanding domestic demand.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Housing development in Beijing',href:'https://thechinaacademy.org/beijing-is-finessing-its-real-estate-strategy/',words:1080,popularity:88},
    {theme:topics[0],title:'Zhu Rongji and the Crisis That Remade China’s Economy',date:'2026-08-19',dateLabel:'Aug 19, 2026',lede:'The response to 1998 joined investment-led growth to an effort to preserve development and social stability.',image:'https://thechinaacademy.org/wp-content/uploads/2025/05/图片2.webp',alt:'Chinese leaders discussing economic policy',href:'https://thechinaacademy.org/zhu-rongji-and-the-crisis-that-remade-chinas-economy/',words:1840,popularity:93},
    {theme:topics[0],title:'Why China Doesn’t Have a Wall Street—and Doesn’t Want One',date:'2026-07-24',dateLabel:'Jul 24, 2026',lede:'China organizes the relation between public goods and private assets through a different institutional logic.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Financial district and industrial economy',href:'https://thechinaacademy.org/why-china-doesnt-have-a-wall-street-and-why-it-doesnt-want-one/',words:1620,popularity:84},
    {theme:topics[0],title:'The Industrial Politics of Battery Recycling',date:'2026-07-18',dateLabel:'Jul 18, 2026',lede:'Capacity, standards and coordination shape the race to close the materials loop.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Electric vehicle batteries prepared for recycling',href:'https://thechinaacademy.org/china-has-nearly-50-million-evs-where-will-their-used-batteries-go/',words:1320,popularity:80},
    {theme:topics[0],title:'What Lies Behind China’s Economic Miracle?',date:'2026-06-28',dateLabel:'Jun 28, 2026',lede:'Industrialization, state capacity and the institutions of transformation.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/57ff5cce-a066-45ae-8c72-5a93d3f0f867.webp',alt:'Wen Yi discussing China’s economic development',href:'../Video%20Sections/premium-talks.html',duration:46,popularity:91,video:true,premium:true},

    {theme:topics[1],title:'How Mao Zedong Shattered the U.S. Trade Blockade',date:'2025-05-20',dateLabel:'May 20, 2025',lede:'The institutions and political choices that turned containment into a failed strategy.',image:'https://thechinaacademy.org/wp-content/uploads/2025/05/MAIN201309051603000538109071559_副本.webp',alt:'Historical image of early People’s Republic diplomacy',href:'../Articles/article-featured-image.html',words:2420,popularity:94},
    {theme:topics[1],title:'Are We on the Cusp of Moving from Capitalism to Socialism?',date:'2026-06-11',dateLabel:'Jun 11, 2026',lede:'Economic crisis and political disillusionment reopen a question long treated as settled.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/57ff5cce-a066-45ae-8c72-5a93d3f0f867.webp',alt:'Illustration of political-economic transition',href:'https://thechinaacademy.org/are-we-on-the-cusp-of-moving-from-capitalism-to-socialism/',words:1730,popularity:97},
    {theme:topics[1],title:'Mao’s Computer: Technology as Collective Property',date:'2026-08-06',dateLabel:'Aug 6, 2026',lede:'Socialist China imagined computation as a commons rather than a capitalist prize.',image:'https://thechinaacademy.org/wp-content/uploads/2025/05/MAIN201309051603000538109071559_副本.webp',alt:'Historical technology and political education image',href:'https://thechinaacademy.org/maos-computer-when-technology-was-envisioned-as-a-collective-property/',words:1560,popularity:87},
    {theme:topics[1],title:'How China and the U.S. Govern the Supernatural',date:'2026-07-14',dateLabel:'Jul 14, 2026',lede:'Competing institutions draw different boundaries around belief, authority and public order.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/封面-2.webp',alt:'Illustration of governance and the supernatural',href:'../Articles/article-text.html',words:2120,popularity:79},
    {theme:topics[1],title:'He Came to China Looking for Socialism. What Did He Find?',date:'2026-08-18',dateLabel:'Aug 18, 2026',lede:'A visitor tests inherited ideas about China against the society he encounters.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/57ff5cce-a066-45ae-8c72-5a93d3f0f867.webp',alt:'Guest speaking in Roughly Chinese episode 33',href:'https://thechinaacademy.org/he-came-to-china-looking-for-socialism-what-did-he-find%e3%80%90roughly-chinese-ep33%e3%80%91/',duration:37,popularity:96,video:true},

    {theme:topics[2],title:'“America Is in a Pre-Revolutionary Situation”',date:'2025-01-18',dateLabel:'Jan 18, 2025',lede:'A crisis of legitimacy exposes the political limits of the status quo.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/trump-illusion.webp',alt:'Illustration of political crisis in the United States',href:'https://thechinaacademy.org/america-is-in-a-pre-revolutionary-situation/',words:980,popularity:95},
    {theme:topics[2],title:'America’s Robot Wall Meets America’s Robot Shortage',date:'2026-07-31',dateLabel:'Jul 31, 2026',lede:'Industrial restrictions expose the production bottlenecks they were meant to overcome.',image:'https://thechinaacademy.org/wp-content/uploads/2024/12/959bcb71-d50c-4368-a389-eeb3f8c9c178.webp',alt:'Industrial technology and automation',href:'https://thechinaacademy.org/americas-robot-wall-meets-americas-robot-shortage/',words:1430,popularity:92},
    {theme:topics[2],title:'The American Empire’s 250-Year Lucky Streak Is About to End',date:'2026-07-09',dateLabel:'Jul 9, 2026',lede:'A time capsule prompts a question about whether the current order will survive to see it opened.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/trump-illusion.webp',alt:'Illustration of political crisis in the United States',href:'https://thechinaacademy.org/the-american-empire-was-a-250-year-lucky-streak-and-the-luck-just-ran-out/',words:1690,popularity:89},
    {theme:topics[2],title:'Thomas Friedman’s Reflection on the U.S., Using China as the Benchmark',date:'2025-08-04',dateLabel:'Aug 4, 2025',lede:'An American columnist’s comparison with China becomes an argument about domestic capacity.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/trump-illusion.webp',alt:'Editorial illustration of the United States and China',href:'https://thechinaacademy.org/thomas-friedmans-reflection-on-the-u-s-using-china-as-the-benchmark/',words:1240,popularity:78},
    {theme:topics[2],title:'If I Were in Beijing, the U.S. Would Already Be Kicked Out of Asia',date:'2024-09-18',dateLabel:'Sep 18, 2024',lede:'John Mearsheimer on overstretched commitments and strategy in Asia.',image:'https://thechinaacademy.org/wp-content/uploads/2024/09/英语封面改.jpg',alt:'John Mearsheimer discussing the United States and Asia',href:'https://thechinaacademy.org/john-mearsheimer-if-i-were-in-beijing-us-would-already-be-kicked-out-of-asia/',duration:52,popularity:98,video:true,premium:true},

    {theme:topics[3],title:'DeepSeek Just Drew a Brutal “Kill Line” on This Chart',date:'2026-08-05',dateLabel:'Aug 5, 2026',lede:'Performance and pricing are redrawing the global market for AI developers.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/57ff5cce-a066-45ae-8c72-5a93d3f0f867.webp',alt:'Artificial intelligence and industrial automation',href:'https://thechinaacademy.org/deepseek-just-drew-a-brutal-kill-line-on-this-chart/',words:1320,popularity:99},
    {theme:topics[3],title:'From TikTok to Rednote',date:'2025-01-17',dateLabel:'Jan 17, 2025',lede:'A platform ban unexpectedly became an experiment in mass contact across digital borders.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/52e9cfc3-4a31-408f-b5d9-0000d042091d.png',alt:'Mobile platforms illustrating a digital migration',href:'../Articles/article-text.html',words:1760,popularity:96},
    {theme:topics[3],title:'The Second Life of China’s EV Batteries',date:'2026-08-20',dateLabel:'Aug 20, 2026',lede:'A recycling challenge is becoming a test of industrial coordination.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Electric vehicle batteries prepared for recycling',href:'https://thechinaacademy.org/china-has-nearly-50-million-evs-where-will-their-used-batteries-go/',words:1120,popularity:88},
    {theme:topics[3],title:'A Digital Migration in Real Time',date:'2025-01-20',dateLabel:'Jan 20, 2025',lede:'Platform movement reveals how users on both sides of the Pacific see one another.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/22-1.png',alt:'Digital migration shown on a mobile chart',href:'../Videos/video-article.html',duration:12,popularity:82,video:true},
    {theme:topics[3],title:'How China Builds the World’s Tallest Bridge',date:'2025-09-30',dateLabel:'Sep 30, 2025',lede:'Geology, logistics and public coordination meet in a record-setting span.',image:'https://thechinaacademy.org/wp-content/uploads/2025/09/Screen-Shot-2025-09-30-at-3.32.02-PM.webp',alt:'The world’s tallest bridge in China',href:'../Videos/premium-talk-detail.html',duration:24,popularity:93,video:true,premium:true},

    {theme:topics[4],title:'When a Ban Becomes a Migration',date:'2025-01-17',dateLabel:'Jan 17, 2025',lede:'Users transformed a policy confrontation into an everyday exchange.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/22-1.png',alt:'Xiaohongshu download chart',href:'../Articles/article-text.html',words:738,popularity:97},
    {theme:topics[4],title:'Who Does AI Serve?',date:'2026-07-21',dateLabel:'Jul 21, 2026',lede:'The politics of artificial intelligence begins with who controls its purpose and gains.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/52e9cfc3-4a31-408f-b5d9-0000d042091d.png',alt:'Digital platforms and artificial intelligence',href:'https://thechinaacademy.org/2026waic-the-pressing-question-of-whom-ai-serves/',words:1480,popularity:90},
    {theme:topics[4],title:'China’s Young Consumers Are Rewriting the Market',date:'2026-08-02',dateLabel:'Aug 2, 2026',lede:'New expectations about work, value and identity are changing everyday economic life.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Screen-Shot-2026-08-18-at-12.46.40-PM.webp',alt:'Young consumers in urban China',href:'../Article%20Sections/trending.html',words:1170,popularity:86},
    {theme:topics[4],title:'China 101: Society Beyond the Headlines',date:'2026-06-08',dateLabel:'Jun 8, 2026',lede:'Christopher Kutarna presents the institutions and social transformations shaping contemporary China.',image:'https://thechinaacademy.org/wp-content/uploads/2025/10/万隆会议.jpeg',alt:'Course on contemporary Chinese society',href:'../Videos/lesson.html',duration:48,popularity:79,video:true,premium:true},
    {theme:topics[4],title:'Youth, Education and Social Mobility',date:'2026-05-26',dateLabel:'May 26, 2026',lede:'Educational choices reveal changing expectations about mobility and collective life.',image:'https://thechinaacademy.org/wp-content/uploads/2025/01/22-1.png',alt:'Young people using mobile platforms',href:'../Video%20Sections/video.html',duration:28,popularity:83,video:true},

    {theme:topics[5],title:'After the Earthquake: Why Reconstruction Is the Real Challenge',date:'2026-08-17',dateLabel:'Aug 17, 2026',lede:'Disaster coverage ends early; sanctions, finance and rebuilding determine what follows.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/封面-2.webp',alt:'Reconstruction after an earthquake in the Global South',href:'../Videos/video-article.html',duration:61,popularity:97,video:true},
    {theme:topics[5],title:'Making the World Anew: Bandung Spirit and De-dependency',date:'2025-10-01',dateLabel:'Oct 1, 2025',lede:'Political independence becomes durable only when productive capacity follows.',image:'https://thechinaacademy.org/wp-content/uploads/2025/10/万隆会议.jpeg',alt:'Delegates at the Bandung Conference',href:'../Videos/lesson.html',duration:61,popularity:94,video:true,premium:true},
    {theme:topics[5],title:'How Should Asia Fill the Strategic Vacuum?',date:'2026-08-12',dateLabel:'Aug 12, 2026',lede:'Regional institutions confront a security order no longer organized by uncontested primacy.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Gemini_Generated_Image_df5husdf5husdf5h.png',alt:'Illustration of a changing Asian security order',href:'https://thechinaacademy.org/the-u-s-is-inevitably-withdrawing-how-should-the-asian-security-architecture-fill-the-strategic-vacuum/',words:1540,popularity:92},
    {theme:topics[5],title:'The Growing Danger of the Russian–Japanese Territorial Dispute',date:'2026-08-17',dateLabel:'Aug 17, 2026',lede:'An unresolved dispute is returning to the center of regional strategy.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Gemini_Generated_Image_df5husdf5husdf5h.png',alt:'Map-like illustration of Northeast Asian security',href:'https://thechinaacademy.org/the-growing-danger-of-the-russian-japanese-territorial-dispute/',words:1370,popularity:87},
    {theme:topics[5],title:'Can China and the Global South Revive the Third World Movement?',date:'2026-08-14',dateLabel:'Aug 14, 2026',lede:'The language of sovereignty returns to a debate about production and political power.',image:'https://thechinaacademy.org/wp-content/uploads/2026/08/Farwa-Sial.webp',alt:'Farwa Sial discussing China and the Global South',href:'https://thechinaacademy.org/can-china-and-the-global-south-revive-the-third-world-movement/',duration:16,popularity:89,video:true}
  ];

  const escapeHtml = value => String(value).replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character]));
  const requested = new URLSearchParams(location.search).get('name') || topics[0];
  const activeTopic = topics.find(topic => topic.toLowerCase() === requested.toLowerCase()) || requested;
  const state = {sort:'latest',expanded:false};

  const columns = () => innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : innerWidth <= 1200 ? 3 : 4;
  const matches = () => content.filter(item => item.theme === activeTopic).sort((a, b) => state.sort === 'popular'
    ? b.popularity - a.popularity
    : b.date.localeCompare(a.date));

  const cardMarkup = item => {
    const minutes = item.duration || Math.max(1, Math.ceil(item.words / 220));
    const kind = item.video ? 'watch' : 'read';
    const mediaClass = item.premium ? 'section-card-media premium-cover' : 'section-card-media';
    const premium = item.premium ? '<span class="premium-badge">Premium</span>' : '';
    return `<article class="section-card"${item.video ? ' data-content-type="video"' : ''}>
      <figure class="${mediaClass}">${premium}<img src="${item.image}" alt="${escapeHtml(item.alt)}"></figure>
      <div class="section-card-meta"><time datetime="${item.date}">${item.dateLabel}</time></div>
      <h2><a href="${item.href}">${escapeHtml(item.title)}</a></h2>
      <p class="section-card-lede lede-row"><a class="lede-link" href="${item.href}">${escapeHtml(item.lede)}</a><a class="read-time-pill" href="${item.href}"><span>${minutes} min ${kind}</span></a></p>
    </article>`;
  };

  const render = () => {
    const items = matches();
    const visible = state.expanded ? items.length : Math.min(items.length, columns());
    grid.innerHTML = items.slice(0, visible).map(cardMarkup).join('');
    grid.hidden = items.length === 0;
    empty.hidden = items.length !== 0;
    empty.textContent = items.length ? '' : `No stories are available for “${activeTopic}” in this demo.`;
    loadMore.closest('.section-load-row').hidden = items.length === 0;
    loadMore.hidden = state.expanded || visible >= items.length;
    d.querySelectorAll('.tag-archive-board .read-time-pill').forEach(pill => pill.style.setProperty('--read-time-fill', getComputedStyle(pill).color));
  };

  title.textContent = activeTopic;
  d.title = `${activeTopic} — The China Academy`;
  d.querySelector('[data-tag-board]').setAttribute('aria-label', `${activeTopic} articles and videos`);

  d.querySelectorAll('[data-tag-sort]').forEach(button => button.addEventListener('click', () => {
    state.sort = button.dataset.tagSort;
    state.expanded = false;
    d.querySelectorAll('[data-tag-sort]').forEach(option => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    render();
  }));
  loadMore.addEventListener('click', () => { state.expanded = true; render(); });
  addEventListener('resize', () => { if (!state.expanded) render(); }, {passive:true});
  render();
})();
