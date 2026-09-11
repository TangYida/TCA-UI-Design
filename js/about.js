(() => {
  const d = document;
  const contributors = [
    ['Aleksandr Dugin', 'Philosopher & Politologist'],
    ['Anthony Monteiro', 'Activist, Expert in W.E.B. DuBois,Former Professor of Temple University'],
    ['Brian Wong Yueshun', 'Ph.D. candidate, Oxford University; Columnist of Hong Kong Economic Journal; TI Youth Observer'],
    ['Busani Ngcaweni', 'Prof. Busani Ngcaweni The South African National School of Government'],
    ['Chas Freeman', 'Former U.S. Assistant Secretary of Defense'],
    ['Charles Liu', 'Co-founder of Hao Capital Senior Fellow of Taihe Institute'],
    ['Chen Ping', 'Research Fellow at the China Institute of Fudan University, Professor of Economics and Finance at Peking University'],
    ['Christopher Kutarna', 'Founder, Neue Geographical Society Fellow, Oxford Martin School and Oxford Saïd Business School'],
    ['Di Dongsheng', 'Professor of International Relations, Distinguished Fellow, Institute of International Currency, Renmin University of China'],
    ['Ding Yifan', 'Former Deputy Director of The Development Research  Center of the State Council'],
    ['Eric Li S. M.', 'Chairman & Managing Partner, Chengwei Capital'],
    ['Fan Yongpeng', 'Vice Director of the China Institute of Fudan University, Professor in Political Science'],
    ["Fred M'membe", 'The President of the Socialist Party of Zambia'],
    ['Frans Vandenbosch', 'Belgium engineer and writer'],
    ['Hu Xijin', 'Chinese journalist, Former Editor-in-Chief of Global Times'],
    ['Jan Oberg', 'Peace studies professor. PhD in sociology, peace and future researcher'],
    ['Jeffrey D. Sachs', 'Economics professor, bestselling author, innovative educator, and global leader in sustainable development.'],
    ['Jin Canrong', 'Expert on international issues. Professor at the School of International Relations, Renmin University'],
    ['Jodie Evans', 'Feminist Peace Acitivist, Founder of Codepink'],
    ['John Mearsheimer', 'American political scientist and professor at the University of Chicago'],
    ['John Ross', 'Senior Fellow, Chongyang Institute for Financial Studies, Renmin University of China'],
    ['Justin Yifu Lin', 'Chinese economist, professor at Peking University, and former World Bank Chief Economist.'],
    ['Kaidong Feng', 'Public Policy Department, School of Government, Peking University'],
    ['Kambale Musavuli', 'Analyst with the Center for Research on the Congo-kinshasa (CERECK)'],
    ['Keyu Jin', 'Professor of Economics, London School of Economics and Political Science'],
    ['Kishore Mahbubani', 'Distinguished Fellow at the Asia Research Institute at the National University of Singapore'],
    ['Kyeretwie Opoku', 'The Convener of the Socialist Movement of Ghana'],
    ['Lin Zheyuan', 'Associate professor，director of Institute of Marxism Communication in Asia, ECNU'],
    ['Louis-Vincent Gave', 'Founding Partner & CEO of Gavekal Group'],
    ['M. Nazrul Islam', 'Former Minister and Deputy Chief of the Bangladesh Embassy in Beijing'],
    ['M.K. Bhadrakumar', 'Former Ambassador served in the Indian Embassy in Moscow'],
    ['Michele Geraci', 'Former Undersecretary of State at the Italian Ministry of Economic Development'],
    ['Ning Nanshan', 'Well-known industrial and economic authors and practitioners, Internet KOL'],
    ['Pascal Lottaz', 'Associate Professor at Kyoto University A scholar specializing in neutrality and third-party politics in global conflicts.'],
    ['Paul Wang', 'Professor of International Law and International Relations at the Shi Liang School of Law, Changzhou University '],
    ['Peter Turchin', 'Complexity Scientist, Author of ‘End Times’'],
    ['Philip Dexter', 'South African Politician, Activist'],
    ['Philip Mulder', 'International Business Advisor New Energy at The Hague Business Agency'],
    ['Rania Khalek', 'Host & Producer of Breakthrough News'],
    ['Redhika Desai', 'Professor, Department of Political Studies, University of Manitoba, Canada'],
    ['Richard Wolff', 'Founder of Democracy At Work'],
    ['Roscoe Palm', 'South African Political Writer, Director of the Pan-African Institute for Socialism'],
    ['Shaun Rein', 'The founder of China Market Research Group(CMR)'],
    ['Shen Yi', 'Professor of International Relations at Fudan University'],
    ['Shi Donglai', 'Associate Professor of World Literature and Comparative Cultural Studies at Shanghai Jiao Tong University'],
    ['Siphamandla Zondi', 'Professor at the University of Johannesburg'],
    ['Steve Hanke', 'Professor of Applied Economics, Johns Hopkins University'],
    ['Terrance Arthur Tamminen', 'Former Secretary of the California Environmental Protection Agency Strategist on energy and the environment'],
    ['Vijay Prashad', 'Indian Historian, Editor and Journalist The director of Tricontinental'],
    ['Wang Chuan-pin', 'Executive Director of the Labour Rights Association in Taiwan'],
    ['Wang Xiao', 'Well-known Chinese youth KOL Senior Current Affairs Commentator'],
    ['Wang Xiangsui', ''],
    ['Wang Wen', 'Executive Dean of the Chongyang Institute for Financial Studies at Renmin University of China'],
    ['Wen Yang', 'Researcher with the China Institute, Fudan University, Author of The Logic of Civilization: The Interaction and Evolution of Chinese and Western Civilization.'],
    ['Wen Yi', 'Economic Professor with Shanghai Jiao Tong University'],
    ['Wu Chi-na', 'Associate researcher at the Institute of Modern History, Academia Sinica in Taiwan'],
    ['Wu Rongyuan', 'Chairman of Taiwan Labor Party'],
    ['Yanis Varoufakis', 'Former Finance Minister of Greece'],
    ['Yin Zhiguang', 'Professor, School of International Relations and Public Affairs, Fudan-University'],
    ['Yu Liang', 'Research Fellow and Assistant Director of the China Institute at Fudan University, Deputy Editor-in-Chief of Dongfang Journal'],
    ['Zhang Weiwei', 'The Director of China Institute, Fudan University']
  ].map(([name, position]) => ({ name, position }));

  const portraits = {
    'aleksandr-dugin':          'https://thechinaacademy.org/wp-content/uploads/2024/05/WechatIMG319.jpg',
    'anthony-monteiro':         'https://thechinaacademy.org/wp-content/uploads/2024/06/WechatIMG231-1.jpg',
    'busani-ngcaweni':          'https://thechinaacademy.org/wp-content/uploads/2025/03/Prof-Busani-Ngcaweni.webp',
    'chas-freeman':             'https://thechinaacademy.org/wp-content/uploads/2024/11/Freeman-Chas.webp',
    'charles-liu':              'https://thechinaacademy.org/wp-content/uploads/2024/06/WechatIMG237-e1715319856215.jpg',
    'chen-ping':                'https://thechinaacademy.org/wp-content/uploads/2024/12/71bbebfeb07c4df698b737fce500f865.webp',
    'christopher-kutarna':      'https://thechinaacademy.org/wp-content/uploads/2024/06/WechatIMG224111-e1715407042740.jpg',
    'di-dongsheng':             'https://thechinaacademy.org/wp-content/uploads/2024/03/%E7%BF%9F%E7%85%A7%E7%89%87.webp',
    'eric-li-s-m':              'https://thechinaacademy.org/wp-content/uploads/2024/01/eli-e1695815667524.png',
    'fan-yongpeng':             'https://thechinaacademy.org/wp-content/uploads/2024/03/22.png',
    'fred-m-membe':             'https://thechinaacademy.org/wp-content/uploads/2024/10/5da73e7a-13bd-467b-9783-4d431741d8a1.png',
    'frans-vandenbosch':        'https://thechinaacademy.org/wp-content/uploads/2024/09/4401eb83-926f-4ef1-8b83-8bab4bdf1402.png',
    'hu-xijin':                 'https://thechinaacademy.org/wp-content/uploads/2023/12/211216005722-hu-xijin-file-09262021-restricted-super-tease-e1701425533387.jpg',
    'jan-oberg':                'https://thechinaacademy.org/wp-content/uploads/2024/09/%E7%BD%91%E7%AB%99%E5%B0%81%E9%9D%A2.png',
    'jeffrey-d-sachs':          'https://thechinaacademy.org/wp-content/uploads/2024/06/Jeff-1-scaled.jpg',
    'jin-canrong':              'https://thechinaacademy.org/wp-content/uploads/2024/09/W020210705708406074790-scaled-1.png',
    'jodie-evans':              'https://thechinaacademy.org/wp-content/uploads/2024/10/16fa8355-0abb-4e0a-8043-2feea3b39ed7.png',
    'john-mearsheimer':         'https://thechinaacademy.org/wp-content/uploads/2024/09/111.png',
    'john-ross':                'https://thechinaacademy.org/wp-content/uploads/2024/10/68f6e2ac-2d16-4962-bec7-fefb00eab2ad.png',
    'justin-yifu-lin':          'https://thechinaacademy.org/wp-content/uploads/2024/02/%E6%9E%97%E6%AF%85%E5%A4%AB.jpg',
    'kaidong-feng':             'https://thechinaacademy.org/wp-content/uploads/2024/06/feng.png',
    'kambale-musavuli':         'https://thechinaacademy.org/wp-content/uploads/2024/10/c6916256-7b16-44eb-919a-45262813ef1e.png',
    'keyu-jin':                 'https://thechinaacademy.org/wp-content/uploads/2025/01/111.webp',
    'kishore-mahbubani':        'https://thechinaacademy.org/wp-content/uploads/2024/03/Kishore-Mahbubani-e1628172143593.jpg',
    'kyeretwie-opoku':          'https://thechinaacademy.org/wp-content/uploads/2024/10/9b5e81ae-78cb-4e5b-b526-6e0a18ef67f3.png',
    'lin-zheyuan':              'https://thechinaacademy.org/wp-content/uploads/2024/10/71b574e4-40cd-4d68-9e14-0ba3b720c195.png',
    'louis-vincent-gave':       'https://thechinaacademy.org/wp-content/uploads/2025/03/011.webp',
    'm-nazrul-islam':           'https://thechinaacademy.org/wp-content/uploads/2024/10/8072e261-ed53-4a2c-81d7-6f9d6a6dcd57.png',
    'm-k-bhadrakumar':          'https://thechinaacademy.org/wp-content/uploads/2024/10/ca756299-60aa-45dc-a1e6-ab331043674f.png',
    'michele-geraci':           'https://thechinaacademy.org/wp-content/uploads/2025/04/01.webp',
    'ning-nanshan':             'https://thechinaacademy.org/wp-content/uploads/2024/07/ning.jpeg',
    'pascal-lottaz':            'https://thechinaacademy.org/wp-content/uploads/2025/02/Dr.Pascal-Lottaz%E7%85%A7%E7%89%87.webp',
    'paul-wang':                'https://thechinaacademy.org/wp-content/uploads/2024/10/0a84dde8-c77e-49ff-ae48-55cae3ff8931.png',
    'peter-turchin':            'https://thechinaacademy.org/wp-content/uploads/2025/02/11%E7%9A%84%E5%89%AF%E6%9C%AC.webp',
    'philip-dexter':            'https://thechinaacademy.org/wp-content/uploads/2024/10/70c7c81c-ff32-4246-884a-6c5bb59e0966.png',
    'rania-khalek':             'https://thechinaacademy.org/wp-content/uploads/2024/10/0fbc97c3-2910-425e-b920-3ed62c1434e4.png',
    'redhika-desai':            'https://thechinaacademy.org/wp-content/uploads/2025/01/e579efb0-c4f3-4c67-9b83-d898165a48cf.webp',
    'richard-wolff':            'https://thechinaacademy.org/wp-content/uploads/2024/07/wolff.jpg',
    'roscoe-palm':              'https://thechinaacademy.org/wp-content/uploads/2024/10/19da1b32-4834-4ae8-abb3-a75625a6055f.png',
    'shaun-rein':               'https://thechinaacademy.org/wp-content/uploads/2025/02/5afbf299-472a-4972-a645-c0e155ba5fba.webp',
    'shen-yi':                  'https://thechinaacademy.org/wp-content/uploads/2023/12/5a42f3042b9b4.png',
    'shi-donglai':              'https://thechinaacademy.org/wp-content/uploads/2024/10/568f8f1d-0a1c-478e-87cb-f083b170f35b.png',
    'siphamandla-zondi':        'https://thechinaacademy.org/wp-content/uploads/2025/03/prof-siphamandla-zondi.webp',
    'steve-hanke':              'https://thechinaacademy.org/wp-content/uploads/2024/12/111.webp',
    'terrance-arthur-tamminen': 'https://thechinaacademy.org/wp-content/uploads/2024/10/18769515-fcaf-4165-a44b-44d8e5f25b9c.png',
    'vijay-prashad':            'https://thechinaacademy.org/wp-content/uploads/2023/07/Vijay-scaled-e1692955971106.jpeg',
    'wang-xiao':                'https://thechinaacademy.org/wp-content/uploads/2024/10/cc1acbd2-037d-46fa-8259-0017dc625b36.png',
    'wang-xiangsui':            'https://thechinaacademy.org/wp-content/uploads/2024/09/unnamed-1-1.jpg',
    'wang-wen':                 'https://thechinaacademy.org/wp-content/uploads/2024/09/4b37c266-d69b-4ef7-bc1c-24759818db75.png',
    'wen-yang':                 'https://thechinaacademy.org/wp-content/uploads/2024/06/%E6%96%87%E6%89%AC-e1695799116668.png',
    'wen-yi':                   'https://thechinaacademy.org/wp-content/uploads/2024/06/b64c49f2-ffc1-454a-a23d-4cfc2d29d968.png',
    'wu-chi-na':                'https://thechinaacademy.org/wp-content/uploads/2024/09/6270ba921985e.png',
    'yanis-varoufakis':         'https://thechinaacademy.org/wp-content/uploads/2024/12/2adhnZs_400x400.webp',
    'yin-zhiguang':             'https://thechinaacademy.org/wp-content/uploads/2024/05/01.jpg',
    'yu-liang':                 'https://thechinaacademy.org/wp-content/uploads/2024/07/279f9e26-d6d8-4510-ba9e-9e47c0f5eb37.png',
    'zhang-weiwei':             'https://thechinaacademy.org/wp-content/uploads/2024/12/abe5459f-6c1e-4922-989a-aca1bbb1856a-1-e1733479055114-1.webp'
  };

  const profiles = {
    'zhang-weiwei': {
      name: 'Zhang Weiwei',
      breadcrumb: 'Contributors / Advisory Board',
      profilePosition: 'Distinguished Professor at Fudan University and Director of the China Institute in Shanghai.',
      columnPosition: 'Professor of Political Science; Director the China Institute of Fudan University',
      biography: 'Professor Zhang has written extensively on China’s economic and political reform, the China Model, and comparative politics. He is one of the most influential Chinese political scientists.',
      portrait: portraits['zhang-weiwei'],
      featuredWorks: [
        'Ideology and Economic Reform under Deng Xiaoping (1978-1993), a publication of the Graduate Institute of International Studies, Geneva), Kegan Paul, London and New York, 1996.',
        'Transforming China: Economic Reform and its Political Implications, Macmillan Press, London and New York, 2000.',
        'The China Wave: Rise of a Civilizational State, World Century, NJ, 2012',
        'The China Horizon: Glory and Dream of a Civilizational State, World Century, NJ, 2015'
      ],
      experiences: [
        'In the mid-1980s, Professor Zhang served as an English translator for Deng Xiaoping and other Chinese leaders.',
        'In 2011, he debated Francis Fukuyama on the China Model and accurately predicted the turmoil of the “Arab Spring”.',
        'His 2014 video “Chinese People, You Should be Confident” was viewed hundreds of millions of times online.',
        'His commentary show “China Now” has received acclaim domestically and abroad. In 2022 it won China’s top television award.',
        'He has lectured at institutions including Harvard, Oxford, Cambridge and Yale. He has participated in international conferences like the World Economic Forum in Davos and Boao Forum. Major media outlets including CCTV, BBC and The Economist have interview',
        'In 2016, he spoke at a national conference hosted by President Xi Jinping. In 2019 he represented ideological circles at the PRC’s 70th anniversary parade.',
        'In 2021, he lectured and advised the CPC Political Bureau on strengthening China’s international communications.'
      ]
    }
  };

  const authorWorks = {
    'zhang-weiwei': [
      {
        type: 'article',
        title: 'In Finance, China Gave the U.S. the Blow It Deserved',
        date: 'August 27, 2026',
        datetime: '2026-08-27',
        theme: 'China’s Economy & Business',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/08/028411580115717C48FF06B2FADBB372851B38C8_size78_w1080_h666-1.png',
        href: 'https://thechinaacademy.org/in-finance-china-gave-the-u-s-the-blow-it-deserved/',
        lede: 'The global financial landscape is undergoing a seismic shift. A new, multipolar economic reality is rapidly emerging from the East.',
        words: 1391
      },
      {
        type: 'article',
        title: 'From “Becoming China” to Chinamaxxing, This is Soft Power at Work',
        date: 'August 27, 2026',
        datetime: '2026-08-27',
        theme: 'China’s Youth Sentiment',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/08/微信图片_20260828124642_259_197.webp',
        href: 'https://thechinaacademy.org/from-becoming-china-to-chinamaxxing-this-is-soft-power-at-work/',
        lede: 'In "China Now," Professor Zhang Weiwei analyzed the structural reasons why China Maxxing has become popular among young people worldwide.',
        words: 1318
      },
      {
        type: 'article',
        title: 'How China Dug the World’s Longest Tunnel Through Deadly Mountains',
        date: 'August 21, 2026',
        datetime: '2026-08-21',
        theme: 'China’s Technology',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/08/50f888d8-9473-46e4-b27f-108a1cbac66e.png',
        href: 'https://thechinaacademy.org/how-china-dug-the-worlds-longest-tunnel-through-deadly-mountains/',
        lede: 'China just finished a 22 km expressway tunnel through some of the most dangerous mountain terrain on Earth.',
        words: 1581
      },
      {
        type: 'article',
        title: 'Jiang Zemin’s Legacy: What It Means for China',
        date: 'August 19, 2026',
        datetime: '2026-08-19',
        theme: 'China’s Politics',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/08/JZM.webp',
        href: 'https://thechinaacademy.org/jiang-zemins-legacy-what-it-means-for-china/',
        lede: 'TASS’s exclusive interview with China’s top political scientist Zhang Weiwei on how China’s late leader Jiang Zemin shaped the country’s path during a tumultuous era',
        words: 1211
      },
      {
        type: 'article',
        title: 'Why Isn’t China Helping Iran?',
        date: 'March 10, 2026',
        datetime: '2026-03-10',
        theme: 'China’s Worldview',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/03/Screen-Shot-2026-03-10-at-12.10.27-PM.webp',
        href: 'https://thechinaacademy.org/why-isnt-china-helping-iran/',
        lede: 'China is fully committed to the comprehensive 25‑year cooperation agreement with Iran.',
        words: 561
      },
      {
        type: 'article',
        title: 'How China Will Respond to Japan’s Taiwan Claim, Step by Step',
        date: 'January 22, 2026',
        datetime: '2026-01-22',
        theme: 'China’s Worldview',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/01/China-Japan.webp',
        href: 'https://thechinaacademy.org/how-china-will-respond-to-japans-taiwan-claim-step-by-step/',
        lede: 'Japan’s obsession with Taiwan risks highlighting its own illegitimate Ryukyu occupation and the now-defunct basis for waiving war reparations to China.',
        words: 1374
      },
      {
        type: 'article',
        title: 'When Trump Resuscitates the Monroe Doctrine',
        date: 'January 14, 2026',
        datetime: '2026-01-14',
        theme: 'U.S.',
        image: 'https://thechinaacademy.org/wp-content/uploads/2026/01/de1d8991fe1200cee329163bbfd58612.webp',
        href: 'https://thechinaacademy.org/when-trump-resuscitates-the-monroe-doctrine/',
        lede: 'What has unfolded in Venezuela is a stark manifestation of unilateralism and power politics that demands our collective attention and unequivocal condemnation.',
        words: 707
      },
      {
        type: 'video',
        title: 'How China Builds the World’s Tallest Bridge',
        date: 'September 30, 2025',
        datetime: '2025-09-30',
        theme: 'China’s Technology',
        image: 'https://thechinaacademy.org/wp-content/uploads/2025/09/Screen-Shot-2025-09-30-at-3.32.02-PM.webp',
        href: 'https://thechinaacademy.org/how-china-builds-the-worlds-tallest-bridge/',
        lede: 'China Now, one of China’s most popular current affairs shows, takes a close-up look at the world’s tallest bridge in Guizhou.',
        duration: 39
      },
      {
        type: 'article',
        title: 'Lessons from Asia for Europe, A Chinese Perspective',
        date: 'September 28, 2025',
        datetime: '2025-09-28',
        theme: 'China’s Worldview',
        image: 'https://thechinaacademy.org/wp-content/uploads/2025/09/Screen-Shot-2025-09-29-at-12.00.34-PM.webp',
        href: 'https://thechinaacademy.org/lessons-from-asia-for-europe-a-chinese-perspective/',
        lede: 'China’s renowned scholar Zhang Weiwei compares Asia with Europe, particularly in relation to China and the U.S..',
        words: 3264
      },
      {
        type: 'article',
        title: 'China’s Top Political Show Keeps Getting Global Predictions Right',
        date: 'September 25, 2025',
        datetime: '2025-09-25',
        theme: 'China’s Politics',
        image: 'https://thechinaacademy.org/wp-content/uploads/2025/09/2a4e221f51cb7683d79b29bf5583d917.webp',
        href: 'https://thechinaacademy.org/chinas-top-political-show-keeps-getting-global-predictions-right/',
        lede: 'It predicted U.S. “trade war” failure, Hong Kong law, COVID-19 chaos, and Europe’s crises.',
        words: 2623
      }
    ]
  };

  const slugify = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const initials = name => name.split(/\s+/).map(part => part.replace(/[^A-Za-z]/g, '')).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  const bySlug = new Map(contributors.map(contributor => [slugify(contributor.name), contributor]));
  const requestedSlug = () => new URLSearchParams(location.search).get('name') || d.body.dataset.authorSlug || 'zhang-weiwei';

  const makeAvatar = (name, className = 'author-avatar') => {
    const slug = slugify(name);
    const avatar = d.createElement('span');
    avatar.className = className;
    if (portraits[slug]) {
      const image = d.createElement('img');
      image.src = portraits[slug];
      image.alt = name;
      image.loading = 'lazy';
      image.decoding = 'async';
      avatar.append(image);
    } else {
      const monogram = d.createElement('span');
      monogram.className = 'contributor-monogram';
      monogram.textContent = initials(name);
      avatar.append(monogram);
    }
    return avatar;
  };

  const orbit = d.querySelector('[data-contributor-orbit]');
  if (orbit) {
    contributors.forEach(contributor => {
      const slug = slugify(contributor.name);
      const link = d.createElement('a');
      link.className = 'author-chip contributor-node';
      link.href = `contributor-detail.html?name=${encodeURIComponent(slug)}`;
      link.dataset.name = contributor.name;
      link.dataset.position = contributor.position;
      link.style.setProperty('--node-scale', '.82');
      link.append(makeAvatar(contributor.name));
      const copy = d.createElement('span');
      copy.className = 'contributor-node-copy';
      const name = d.createElement('strong');
      name.textContent = contributor.name;
      copy.append(name);
      link.append(copy);
      orbit.append(link);
    });

    const nodes = [...orbit.querySelectorAll('.contributor-node')];
    const focus = d.querySelector('[data-contributor-focus]');
    const focusName = focus.querySelector('[data-contributor-focus-name]');
    const focusPosition = focus.querySelector('[data-contributor-focus-position]');
    const selectNode = node => {
      nodes.forEach(item => item.classList.toggle('is-active', item === node));
      node.style.setProperty('--node-opacity', '1');
      focus.href = node.href;
      focusName.textContent = node.dataset.name;
      focusPosition.textContent = node.dataset.position;
    };
    const scaleFromPoint = (clientX, clientY) => {
      let nearest = nodes[0];
      let nearestDistance = Infinity;
      nodes.forEach(node => {
        const box = node.getBoundingClientRect();
        const distance = Math.hypot(clientX - (box.left + box.width / 2), clientY - (box.top + box.height / 2));
        const proximity = Math.max(0, 1 - distance / 260);
        node.style.setProperty('--node-scale', String(.82 + proximity * .34));
        node.style.setProperty('--node-opacity', String(.68 + proximity * .32));
        if (distance < nearestDistance) { nearest = node; nearestDistance = distance; }
      });
      selectNode(nearest);
    };
    const resetOrbit = () => {
      const box = orbit.getBoundingClientRect();
      scaleFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    };
    let orbitFrame = 0;
    orbit.addEventListener('pointermove', event => {
      if (matchMedia('(max-width:600px)').matches) return;
      cancelAnimationFrame(orbitFrame);
      orbitFrame = requestAnimationFrame(() => scaleFromPoint(event.clientX, event.clientY));
    }, { passive: true });
    orbit.addEventListener('pointerleave', resetOrbit);
    nodes.forEach(node => {
      node.addEventListener('focus', () => selectNode(node));
      node.addEventListener('pointerenter', () => selectNode(node));
    });
    addEventListener('resize', resetOrbit, { passive: true });
    requestAnimationFrame(resetOrbit);
  }

  const filters = d.querySelector('[data-course-filters]');
  if (filters) {
    const courses = [...d.querySelectorAll('[data-course-category]')];
    filters.addEventListener('click', event => {
      const link = event.target.closest('[data-course-filter]');
      if (!link) return;
      event.preventDefault();
      const category = link.dataset.courseFilter;
      filters.querySelectorAll('[data-course-filter]').forEach(item => item.setAttribute('aria-current', String(item === link)));
      courses.forEach(course => { course.hidden = category !== 'All' && course.dataset.courseCategory !== category; });
    });
  }

  const renderList = (container, items, collapsedFrom = Infinity) => {
    if (!container) return;
    container.replaceChildren();
    items.forEach((text, index) => {
      const entry = d.createElement('p');
      entry.textContent = text;
      if (index >= collapsedFrom) { entry.dataset.recordExtra = ''; entry.hidden = true; }
      container.append(entry);
    });
  };

  const renderPortrait = (container, profile, contributor) => {
    if (!container) return;
    container.replaceChildren();
    const name = profile?.name || contributor?.name || '';
    const source = profile?.portrait || portraits[slugify(name)];
    if (source) {
      const image = d.createElement('img');
      image.src = source;
      image.alt = name;
      container.append(image);
    } else container.append(makeAvatar(name, 'author-avatar contributor-profile-fallback'));
  };

  const profileShell = d.querySelector('[data-profile-shell]');
  if (profileShell) {
    const slug = requestedSlug();
    const profile = profiles[slug];
    const contributor = bySlug.get(slug);
    if (profile || contributor) {
      const name = profile?.name || contributor.name;
      d.title = `${name} — The China Academy`;
      d.querySelector('[data-profile-name]').textContent = name;
      d.querySelector('[data-profile-position]').textContent = profile?.profilePosition || contributor.position;
      const bio = d.querySelector('[data-profile-bio]');
      bio.textContent = profile?.biography || '';
      bio.hidden = !profile?.biography;
      renderPortrait(d.querySelector('[data-profile-portrait]'), profile, contributor);
      const full = d.querySelector('[data-profile-full]');
      full.hidden = !profile;
      const contact = d.querySelector('[data-author-contact]');
      contact.hidden = !profile;
      if (profile) {
        renderList(d.querySelector('[data-featured-works]'), profile.featuredWorks);
        renderList(d.querySelector('[data-experiences]'), profile.experiences, 4);
        contact.addEventListener('click', () => window.tcaAuthorDialog?.open({ name, bio: profile.columnPosition }));
        const more = d.querySelector('[data-experience-toggle]');
        more.addEventListener('click', () => {
          const extras = [...d.querySelectorAll('[data-record-extra]')];
          const expanding = extras.some(item => item.hidden);
          extras.forEach(item => { item.hidden = !expanding; });
          more.textContent = expanding ? 'Show less' : 'Show more';
        });
      }
    }
  }

  const column = d.querySelector('[data-column-profile]');
  if (column) {
    const slug = requestedSlug();
    const profile = profiles[slug];
    const contributor = bySlug.get(slug);
    if (profile || contributor) {
      const name = profile?.name || contributor.name;
      d.title = `${name} — The China Academy`;
      d.querySelector('[data-column-name]').textContent = name;
      d.querySelector('[data-column-position]').textContent = profile?.columnPosition || contributor.position;
      renderPortrait(d.querySelector('[data-column-avatar]'), profile, contributor);
      const contact = d.querySelector('[data-author-contact]');
      contact.hidden = !profile;
      if (profile) contact.addEventListener('click', () => window.tcaAuthorDialog?.open({ name, bio: profile.columnPosition }));
    }
  }

  const makeWorkCard = work => {
    const card = d.createElement('article');
    card.className = 'section-card author-work-card';
    card.dataset.contentType = work.type;
    if (work.words) card.dataset.words = String(work.words);
    if (work.duration) card.dataset.duration = String(work.duration);
    const media = d.createElement('figure');
    media.className = 'section-card-media';
    const image = d.createElement('img');
    image.src = work.image;
    image.alt = work.title;
    media.append(image);
    const meta = d.createElement('div');
    meta.className = 'section-card-meta';
    const theme = d.createElement('a');
    theme.className = 'theme-tag kicker';
    theme.href = `../Utility/tag.html?name=${encodeURIComponent(work.theme)}`;
    const themeLabel = d.createElement('span');
    themeLabel.textContent = work.theme;
    theme.append(themeLabel);
    const time = d.createElement('time');
    time.dateTime = work.datetime;
    time.textContent = work.date;
    meta.append(theme, time);
    const heading = d.createElement('h3');
    const title = d.createElement('a');
    title.href = work.href;
    title.textContent = work.title;
    heading.append(title);
    const lede = d.createElement('p');
    lede.className = 'section-card-lede lede-row';
    const ledeLink = d.createElement('a');
    ledeLink.className = 'lede-link';
    ledeLink.href = work.href;
    ledeLink.textContent = work.lede;
    lede.append(ledeLink);
    if (work.words || work.duration) {
      const readTime = d.createElement('span');
      readTime.className = 'read-time-pill';
      readTime.dataset.readTime = '';
      lede.append(readTime);
    }
    card.append(media, meta, heading, lede);
    return card;
  };

  d.querySelectorAll('[data-author-work-grid]').forEach(grid => {
    const slug = requestedSlug();
    const works = authorWorks[slug] || [];
    const archive = grid.closest('.author-work-section');
    const filterBar = archive.querySelector('[data-author-work-filters]');
    const more = archive.querySelector('[data-author-work-more]');
    let type = 'all';
    let expanded = false;
    const render = () => {
      const filtered = type === 'all' ? works : works.filter(work => work.type === type);
      const visible = expanded ? filtered : filtered.slice(0, 8);
      grid.replaceChildren(...visible.map(makeWorkCard));
      window.tcaHydrateReadTimePills?.(grid);
      more.hidden = visible.length >= filtered.length;
    };
    filterBar.addEventListener('click', event => {
      const link = event.target.closest('[data-author-work-filter]');
      if (!link) return;
      event.preventDefault();
      type = link.dataset.authorWorkFilter;
      expanded = false;
      filterBar.querySelectorAll('[data-author-work-filter]').forEach(item => item.setAttribute('aria-current', String(item === link)));
      render();
    });
    more.addEventListener('click', () => { expanded = true; render(); });
    render();
  });
})();
