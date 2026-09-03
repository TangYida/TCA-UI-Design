const demoCommentForm = document.querySelector('[data-demo-comment-form]');
demoCommentForm?.addEventListener('submit', event => {
  event.preventDefault();
  const status = demoCommentForm.querySelector('.discussion-composer-status');
  if (status) status.textContent = 'Demo only — your comment has not been published.';
});

const demoComments = document.querySelector('[aria-label="Comments on The China Academy"]');
const safeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

demoComments?.addEventListener('click', event => {
  const button = event.target.closest('[data-demo-reply]');
  if (!button || !demoComments.contains(button)) return;
  const comment = button.closest('.conversation-row');
  const currentForm = comment.querySelector(':scope > [data-demo-reply-form]');
  if (currentForm) { currentForm.querySelector('textarea').focus(); return; }
  const targetName = comment.querySelector(':scope > .conversation-row-head .conversation-identity')?.textContent?.trim() || 'Reader';
  const safeName = safeAttribute(targetName);
  comment.insertAdjacentHTML('beforeend', `<form class="discussion-reply-form" data-demo-reply-form data-reply-to="${safeName}"><label><span class="sr-only">Reply to ${safeName}</span><textarea name="reply" maxlength="1200" placeholder="Write a reply…" required></textarea></label><button type="submit">Post reply</button></form>`);
  comment.querySelector(':scope > [data-demo-reply-form] textarea').focus();
});

demoComments?.addEventListener('submit', event => {
  const form = event.target.closest('[data-demo-reply-form]');
  if (!form || !demoComments.contains(form)) return;
  event.preventDefault();
  const text = form.elements.reply.value.trim();
  if (!text) return;
  const comment = form.closest('.conversation-row');
  const root = comment.classList.contains('conversation-row--root') ? comment : comment.closest('.conversation-row--root');
  if (!root) return;
  let replies = [...root.children].find(child => child.classList.contains('conversation-replies'));
  if (!replies) {
    replies = document.createElement('ol');
    replies.className = 'conversation-replies';
    replies.setAttribute('aria-label', 'Replies');
    root.append(replies);
  }
  const reply = document.createElement('li');
  reply.className = 'conversation-row conversation-row--reply';
  reply.innerHTML = '<div class="conversation-row-head"><span class="conversation-avatar" aria-hidden="true">Y</span><strong class="conversation-identity">You</strong><time class="conversation-meta">Just now</time></div><div class="conversation-copy"><p><span class="conversation-mention"></span><span class="conversation-reply-copy"></span></p></div><div class="conversation-actions"><button type="button" data-demo-reply>Reply</button></div>';
  reply.querySelector('.conversation-mention').textContent = `@${form.dataset.replyTo || 'Reader'}`;
  reply.querySelector('.conversation-reply-copy').textContent = ` ${text}`;
  replies.append(reply);
  form.remove();
});
