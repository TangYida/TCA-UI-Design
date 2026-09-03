(() => {
  const d = document;
  const desktop = matchMedia('(min-width:901px)');

  const tabs = d.querySelector('[data-video-tabs]');
  const setMobilePanel = panel => {
    if (!tabs) return;
    tabs.querySelectorAll('[data-video-tab]').forEach(button => {
      const active = button.dataset.videoTab === panel;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    d.querySelectorAll('[data-video-intro-item]').forEach(item => { item.hidden = !desktop.matches && panel !== 'introduction'; });
    const comments = d.querySelector('[data-video-comments]');
    if (comments) comments.hidden = !desktop.matches && panel !== 'comments';
  };
  if (tabs) {
    tabs.addEventListener('click', event => {
      const button = event.target.closest('[data-video-tab]');
      if (button) setMobilePanel(button.dataset.videoTab);
    });
    desktop.addEventListener?.('change', () => setMobilePanel('introduction'));
    setMobilePanel('introduction');
  }

  const lessonProgress = d.querySelector('[data-lesson-progress]');
  if (lessonProgress) {
    const storageKey = `tca-lesson-longest-time:${location.pathname}`;
    const lessonDuration = Number(lessonProgress.dataset.lessonDuration) || 0;
    let longestTime = 0;
    try { longestTime = Number(localStorage.getItem(storageKey)) || 0; } catch {}
    const renderProgress = () => {
      const percent = lessonDuration ? Math.min(100, Math.max(0, longestTime / lessonDuration * 100)) : 0;
      lessonProgress.style.setProperty('--lesson-progress', `${percent}%`);
      lessonProgress.classList.toggle('is-complete', percent >= 100);
      lessonProgress.setAttribute('aria-label', `Lesson progress ${Math.round(percent)}%`);
    };
    const recordProgress = currentTime => {
      const nextTime = Number(currentTime);
      if (!Number.isFinite(nextTime) || nextTime <= longestTime) return;
      longestTime = Math.min(nextTime, lessonDuration || nextTime);
      try { localStorage.setItem(storageKey, String(longestTime)); } catch {}
      renderProgress();
    };
    d.querySelector('.video-stage video')?.addEventListener('timeupdate', event => recordProgress(event.currentTarget.currentTime));
    addEventListener('tca:video-progress', event => recordProgress(event.detail?.currentTime));
    addEventListener('message', event => {
      let message = event.data;
      if (typeof message === 'string') { try { message = JSON.parse(message); } catch { return; } }
      recordProgress(message?.currentTime ?? message?.time);
    });
    renderProgress();
  }

  const bookmark = d.querySelector('[data-video-bookmark]');
  if (bookmark) {
    const key = `tca-video-saved:${location.pathname}`;
    const saved = () => { try { return localStorage.getItem(key) === '1'; } catch { return false; } };
    const renderBookmark = value => {
      bookmark.setAttribute('aria-pressed', String(value));
      bookmark.querySelector('.saved11')?.classList.toggle('active', !value);
      bookmark.querySelector('.saved22')?.classList.toggle('active', value);
    };
    d.body.insertAdjacentHTML('beforeend', `<dialog class="author-dialog collection-dialog" data-video-collection-dialog><form method="dialog" class="author-dialog-card collection-dialog-card"><button class="author-dialog-close" type="button" aria-label="Close">×</button><div class="kicker">Save this video</div><h2>Choose a collection</h2><div class="collection-list"><label class="collection-option"><input type="radio" name="collection" value="Saved videos" checked>Saved videos</label><label class="collection-option"><input type="radio" name="collection" value="Watch later">Watch later</label><label class="collection-option"><input type="radio" name="collection" value="China research">China research</label></div><div class="collection-create"><input type="text" name="newCollection" maxlength="48" placeholder="New collection name" aria-label="New collection name"><button class="button" type="button" data-new-collection>Create</button></div><div class="collection-actions"><button class="button" value="save">Save video</button><button class="button" type="button" data-remove-video>Remove</button></div><p class="collection-status" aria-live="polite"></p></form></dialog>`);
    const dialog = d.querySelector('[data-video-collection-dialog]');
    const status = dialog.querySelector('.collection-status');
    bookmark.addEventListener('click', () => dialog.showModal());
    bookmark.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); dialog.showModal(); } });
    dialog.querySelector('.author-dialog-close').addEventListener('click', () => dialog.close('cancel'));
    dialog.querySelector('[data-new-collection]').addEventListener('click', () => {
      const input = dialog.querySelector('[name="newCollection"]');
      const name = input.value.trim();
      if (!name) { status.textContent = 'Enter a collection name first.'; return; }
      const label = d.createElement('label');
      label.className = 'collection-option';
      const radio = d.createElement('input');
      radio.type = 'radio';
      radio.name = 'collection';
      radio.checked = true;
      label.append(radio, d.createTextNode(name));
      dialog.querySelector('.collection-list').append(label);
      input.value = '';
      status.textContent = `Created “${name}”.`;
    });
    dialog.addEventListener('close', () => {
      if (dialog.returnValue !== 'save') return;
      try { localStorage.setItem(key, '1'); } catch {}
      renderBookmark(true);
    });
    dialog.querySelector('[data-remove-video]').addEventListener('click', () => {
      try { localStorage.removeItem(key); } catch {}
      renderBookmark(false);
      dialog.close('removed');
    });
    renderBookmark(saved());
  }

  const community = d.querySelector('[data-video-comments]');
  if (community) {
    const signin = community.querySelector('[data-comment-signin]');
    const entry = community.querySelector('[data-comment-entry]');
    const list = community.querySelector('.comment-list');
    const isSignedIn = () => { try { return sessionStorage.getItem('tca-demo-signed-in') === '1'; } catch { return false; } };
    const renderEntry = () => { signin.hidden = isSignedIn(); entry.hidden = !isSignedIn(); };
    addEventListener('registrationchange', renderEntry);
    renderEntry();
    entry.addEventListener('submit', event => {
      event.preventDefault();
      const textarea = entry.elements.comment;
      const text = textarea.value.trim();
      if (!text) return;
      const comment = d.createElement('article');
      comment.className = 'comment comment-user';
      comment.innerHTML = `<header><span class="comment-author"><span class="comment-avatar" aria-hidden="true">Y</span><strong>You</strong></span><time>Just now</time></header><p></p><footer><button type="button" data-vote="1">↑ <span>0</span></button><button type="button" data-vote="-1">↓ <span>0</span></button><button type="button" data-reply>Reply</button></footer>`;
      comment.querySelector('p').textContent = text;
      list.prepend(comment);
      textarea.value = '';
    });
    community.addEventListener('click', event => {
      const replyButton = event.target.closest('[data-reply]');
      if (!replyButton) return;
      if (!isSignedIn()) { signin.click(); return; }
      const target = replyButton.closest('.comment');
      const root = target.closest('.comment-replies')?.closest('.comment') || target;
      root.querySelector(':scope > .comment-reply')?.remove();
      const form = d.createElement('form');
      form.className = 'comment-reply';
      form.innerHTML = `<label class="sr-only">Reply</label><textarea rows="3" maxlength="1200" placeholder="Add a reply…" required></textarea><button type="submit">Post reply</button>`;
      root.append(form);
      form.querySelector('textarea').focus();
      form.addEventListener('submit', submitEvent => {
        submitEvent.preventDefault();
        const text = form.querySelector('textarea').value.trim();
        if (!text) return;
        let replies = root.querySelector(':scope > .comment-replies');
        if (!replies) {
          replies = d.createElement('div');
          replies.className = 'comment-replies';
          root.append(replies);
        }
        const repliedTo = target.querySelector('header strong')?.textContent || 'commenter';
        const reply = d.createElement('article');
        reply.className = 'comment comment--reply';
        reply.innerHTML = `<header><span class="comment-author"><span class="comment-avatar" aria-hidden="true">Y</span><strong>You</strong></span><time>Just now</time></header><p><span class="comment-mention"></span> </p><footer><button type="button" data-vote="1">↑ <span>0</span></button><button type="button" data-vote="-1">↓ <span>0</span></button><button type="button" data-reply>Reply</button></footer>`;
        reply.querySelector('.comment-mention').textContent = `@${repliedTo}`;
        reply.querySelector('p').append(d.createTextNode(text));
        replies.append(reply);
        form.remove();
      });
    });
  }
})();
