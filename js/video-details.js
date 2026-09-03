(() => {
  const completeButton = document.querySelector('[data-complete-lesson]');
  if (!completeButton) return;

  const storageKey = `tca-lesson-complete:${location.pathname}`;
  const readComplete = () => {
    try { return localStorage.getItem(storageKey) === '1'; } catch { return false; }
  };
  const render = completed => {
    completeButton.classList.toggle('is-complete', completed);
    completeButton.setAttribute('aria-pressed', String(completed));
    completeButton.textContent = completed ? 'Lesson completed' : 'Complete lesson';
  };

  render(readComplete());
  completeButton.addEventListener('click', () => {
    const completed = !completeButton.classList.contains('is-complete');
    try { localStorage.setItem(storageKey, completed ? '1' : '0'); } catch {}
    render(completed);
  });
})();
