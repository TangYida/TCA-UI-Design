(() => {
  const d = document;
  const switcher = d.querySelector('.hsk-switch');
  if (!switcher) return;
  const buttons = [...switcher.querySelectorAll('[data-hsk-switch]')];
  const panels = [...d.querySelectorAll('[data-hsk-panel]')];
  const activate = key => {
    buttons.forEach(button => {
      const active = button.dataset.hskSwitch === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.hskPanel !== key; });
  };
  buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.hskSwitch)));
  switcher.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const index = buttons.indexOf(d.activeElement);
    if (index < 0) return;
    const next = (index + (event.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
    buttons[next].focus();
    activate(buttons[next].dataset.hskSwitch);
  });
})();
