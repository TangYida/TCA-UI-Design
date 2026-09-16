(() => {
  const d = document;
  const MEMBER_URL = '../Homepage/premium-member.html';
  const VIDEO_LIMIT = 60;
  const SDK_URL = 'https://embed.cloudflarestream.com/embed/sdk.latest.js';
  const isMember = () => { try { return sessionStorage.getItem('tca-demo-signed-in') === '1'; } catch { return false; } };

  const buildGate = (message, modifier) => {
    const gate = d.createElement('div');
    gate.className = `premium-gate ${modifier}`;
    const panel = d.createElement('div');
    panel.className = 'premium-gate-panel';
    const text = d.createElement('p');
    text.className = 'premium-gate-message';
    text.textContent = message;
    const cta = d.createElement('a');
    cta.className = 'member-cta premium-gate-cta';
    cta.href = MEMBER_URL;
    cta.textContent = 'Become a member';
    panel.append(text, cta);
    gate.append(panel);
    gate.hidden = true;
    return gate;
  };

  const loadStreamSdk = () => new Promise((resolve, reject) => {
    if (window.Stream) { resolve(window.Stream); return; }
    const ready = script => {
      script.addEventListener('load', () => { window.Stream ? resolve(window.Stream) : reject(); });
      script.addEventListener('error', reject);
    };
    const existing = d.querySelector('script[data-stream-sdk]');
    if (existing) { ready(existing); return; }
    const script = d.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.dataset.streamSdk = '';
    ready(script);
    d.head.append(script);
  });

  const stage = d.querySelector('[data-premium-video]');
  if (stage) {
    const iframe = stage.querySelector('iframe');
    const progressItem = d.querySelector('[data-lesson-progress]');
    const gate = buildGate('To watch full video', 'premium-gate--video');
    stage.append(gate);
    let player = null;
    let duration = Number(progressItem?.dataset.lessonDuration) || 0;
    let maxWatched = 0;
    let gated = false;

    const renderProgress = time => {
      if (!progressItem) return;
      maxWatched = Math.max(maxWatched, time);
      const total = duration || Number(progressItem.dataset.lessonDuration) || 0;
      if (!total) return;
      const fraction = Math.min(1, maxWatched / total);
      const percent = fraction * 100;
      progressItem.style.setProperty('--lesson-progress', `${percent}%`);
      progressItem.classList.toggle('is-complete', fraction >= 0.99);
      progressItem.setAttribute('aria-label', `Lesson progress ${Math.round(percent)}%`);
    };

    const onTime = time => {
      renderProgress(time);
      if (!isMember() && time >= VIDEO_LIMIT && !gated) {
        gated = true;
        try { player?.pause(); } catch {}
        gate.hidden = false;
      }
    };

    const startFallback = () => {
      let timer = 0;
      const arm = () => {
        if (timer || isMember()) return;
        timer = setTimeout(() => { if (!isMember()) { gated = true; gate.hidden = false; } }, VIDEO_LIMIT * 1000);
      };
      stage.addEventListener('pointerdown', arm, { once: true });
      stage.addEventListener('keydown', arm, { once: true });
    };

    loadStreamSdk().then(Stream => {
      if (!iframe) return;
      player = Stream(iframe);
      player.addEventListener('loadedmetadata', event => {
        const value = Number(event?.detail?.duration ?? player?.duration);
        if (value) duration = value;
      });
      player.addEventListener('timeupdate', event => {
        const direct = Number(event?.detail?.currentTime);
        onTime(Number.isFinite(direct) ? direct : Number(player?.currentTime) || 0);
      });
    }).catch(startFallback);

    addEventListener('registrationchange', () => {
      if (isMember()) { gated = false; gate.hidden = true; }
      else { gate.hidden = !gated; }
    });
  }

  d.querySelectorAll('[data-premium-article]').forEach(body => {
    const gate = buildGate('To get full access', 'premium-gate--article');
    body.append(gate);
    const apply = () => {
      body.style.removeProperty('max-height');
      body.style.removeProperty('overflow');
      if (isMember()) { gate.hidden = true; return; }
      const paragraphs = body.querySelectorAll(':scope > p');
      const anchor = paragraphs[1] || paragraphs[0];
      const cut = anchor ? anchor.offsetTop + anchor.offsetHeight : body.scrollHeight;
      body.style.maxHeight = `${Math.round(cut)}px`;
      body.style.overflow = 'hidden';
      gate.hidden = false;
    };
    apply();
    addEventListener('resize', apply);
    addEventListener('registrationchange', apply);
    body.querySelectorAll('img').forEach(img => { if (!img.complete) img.addEventListener('load', apply, { once: true }); });
  });
})();
