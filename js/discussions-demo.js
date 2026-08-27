const demoCommentForm = document.querySelector('[data-demo-comment-form]');
demoCommentForm?.addEventListener('submit', event => {
  event.preventDefault();
  const status = demoCommentForm.querySelector('.discussion-composer-status');
  if (status) status.textContent = 'Demo only — your comment has not been published.';
});
