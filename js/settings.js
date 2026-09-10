(() => {
  const d = document;
  const tabs = [...d.querySelectorAll('[data-settings-tab]')];
  const panels = [...d.querySelectorAll('[data-settings-panel]')];

  const showPanel = name => {
    tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.settingsTab === name)));
    panels.forEach(panel => { panel.hidden = panel.dataset.settingsPanel !== name; });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => showPanel(tab.dataset.settingsTab)));

  d.querySelectorAll('[data-editable-field]').forEach(field => {
    const control = field.querySelector('input, select');
    const edit = field.querySelector('[data-field-edit]');
    const save = field.querySelector('[data-field-save]');
    const cancel = field.querySelector('[data-field-cancel]');
    const status = field.querySelector('[data-field-status]');
    let original = control.value;

    const setEditing = editing => {
      control.disabled = !editing;
      edit.hidden = editing;
      save.hidden = !editing;
      cancel.hidden = !editing;
      if (editing) control.focus();
    };

    edit.addEventListener('click', () => {
      original = control.value;
      status.textContent = '';
      setEditing(true);
    });
    save.addEventListener('click', () => {
      if (control.name === 'username' && !control.value.trim()) {
        status.textContent = 'Username is required.';
        control.focus();
        return;
      }
      original = control.value;
      status.textContent = 'Saved for this demo.';
      setEditing(false);
    });
    cancel.addEventListener('click', () => {
      control.value = original;
      status.textContent = '';
      setEditing(false);
    });
  });

  const upload = d.querySelector('[data-profile-upload]');
  const preview = d.querySelector('[data-profile-preview]');
  upload?.addEventListener('change', () => {
    const file = upload.files?.[0];
    if (!file) return;
    const image = d.createElement('img');
    image.src = URL.createObjectURL(file);
    image.alt = '';
    preview.replaceChildren(image);
  });

  const securityForm = d.querySelector('[data-security-form]');
  const securityEdit = d.querySelector('[data-security-edit]');
  const securityActions = d.querySelector('[data-security-actions]');
  const securityStatus = d.querySelector('[data-security-status]');
  const securityInputs = [...securityForm.querySelectorAll('input')];
  const passwordToggles = [...securityForm.querySelectorAll('[data-toggle-password]')];
  const syncPasswordToggles = () => passwordToggles.forEach(button => {
    const input = button.previousElementSibling;
    button.disabled = input.disabled || !input.value;
  });
  const setSecurityEditing = editing => {
    securityInputs.forEach(input => { input.disabled = !editing; });
    securityEdit.hidden = editing;
    securityActions.hidden = !editing;
    syncPasswordToggles();
    if (editing) securityInputs[0]?.focus();
  };

  securityEdit?.addEventListener('click', () => {
    securityStatus.textContent = '';
    setSecurityEditing(true);
  });
  d.querySelector('[data-security-cancel]')?.addEventListener('click', () => {
    securityForm.reset();
    securityStatus.textContent = '';
    setSecurityEditing(false);
  });
  securityForm?.addEventListener('submit', event => {
    event.preventDefault();
    const next = d.querySelector('#new-password').value;
    const confirmation = d.querySelector('#confirm-password').value;
    if (!next || next !== confirmation) {
      securityStatus.textContent = 'New passwords must match.';
      return;
    }
    securityStatus.textContent = 'Password saved for this demo.';
    setSecurityEditing(false);
  });

  securityInputs.forEach(input => input.addEventListener('input', syncPasswordToggles));
  passwordToggles.forEach(button => button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    button.textContent = showing ? 'Show' : 'Hide';
    button.setAttribute('aria-label', `${showing ? 'Show' : 'Hide'} ${input.name.replaceAll('-', ' ')}`);
  }));
  syncPasswordToggles();

  d.querySelector('[data-sign-out]')?.addEventListener('click', () => {
    try { sessionStorage.removeItem('tca-demo-signed-in'); } catch {}
    d.querySelector('[data-sign-out-status]').textContent = 'Signed out of this demo session.';
    dispatchEvent(new CustomEvent('registrationchange', { detail: { active: false } }));
  });
})();
