(() => {
  const d = document;

  const setupSaved = () => {
    const list = d.querySelector('[data-saved-list]');
    if (!list) return;

    const collectionList = d.querySelector('[data-collection-list]');
    const selectAll = d.querySelector('[data-saved-select-all]');
    const empty = d.querySelector('[data-saved-empty]');
    const status = d.querySelector('[data-saved-status]');
    const renameButton = d.querySelector('[data-collection-rename]');
    const deleteButton = d.querySelector('[data-collection-delete]');
    const collectionDialog = d.querySelector('[data-collection-dialog]');
    const collectionForm = d.querySelector('[data-collection-form]');
    const collectionTitle = d.querySelector('[data-collection-dialog-title]');
    const transferDialog = d.querySelector('[data-transfer-dialog]');
    const transferForm = d.querySelector('[data-transfer-form]');
    const transferTitle = d.querySelector('[data-transfer-title]');
    let activeCollection = 'all';
    let collectionMode = 'create';
    let transferMode = 'move';

    const items = () => [...d.querySelectorAll('[data-saved-item]')];
    const collectionsFor = item => (item.dataset.collections || '').split(',').map(value => value.trim()).filter(Boolean);
    const setCollections = (item, values) => { item.dataset.collections = [...new Set(values)].join(','); };
    const collectionButtons = () => [...collectionList.querySelectorAll('[data-collection]')];
    const visibleItems = () => items().filter(item => !item.hidden);
    const selectedItems = () => items().filter(item => item.querySelector('[data-saved-checkbox]').checked);

    const updateCounts = () => collectionButtons().forEach(button => {
      const count = button.dataset.collection === 'all'
        ? items().length
        : items().filter(item => collectionsFor(item).includes(button.dataset.collection)).length;
      button.querySelector('[data-collection-count]').textContent = count;
    });

    const updateSelection = () => {
      const visible = visibleItems();
      const selectedVisible = visible.filter(item => item.querySelector('[data-saved-checkbox]').checked);
      selectAll.checked = visible.length > 0 && selectedVisible.length === visible.length;
      selectAll.indeterminate = selectedVisible.length > 0 && selectedVisible.length < visible.length;
      const hasSelection = selectedItems().length > 0;
      d.querySelectorAll('[data-saved-action]').forEach(button => { button.disabled = !hasSelection; });
    };

    const applyFilter = () => {
      items().forEach(item => {
        item.hidden = activeCollection !== 'all' && !collectionsFor(item).includes(activeCollection);
        item.querySelector('[data-saved-checkbox]').checked = false;
      });
      collectionButtons().forEach(button => button.setAttribute('aria-pressed', String(button.dataset.collection === activeCollection)));
      const protectedCollection = activeCollection === 'all';
      renameButton.disabled = protectedCollection;
      deleteButton.disabled = protectedCollection;
      empty.hidden = visibleItems().length > 0;
      updateCounts();
      updateSelection();
    };

    collectionList.addEventListener('click', event => {
      const button = event.target.closest('[data-collection]');
      if (!button) return;
      activeCollection = button.dataset.collection;
      applyFilter();
    });

    list.addEventListener('change', event => {
      if (event.target.matches('[data-saved-checkbox]')) updateSelection();
    });

    selectAll.addEventListener('change', () => {
      visibleItems().forEach(item => { item.querySelector('[data-saved-checkbox]').checked = selectAll.checked; });
      updateSelection();
    });

    const openCollectionDialog = mode => {
      collectionMode = mode;
      collectionTitle.textContent = mode === 'create' ? 'New collection' : 'Rename collection';
      collectionForm.elements['collection-name'].value = mode === 'rename' ? activeCollection : '';
      collectionDialog.showModal();
      collectionForm.elements['collection-name'].focus();
    };

    d.querySelector('[data-collection-create]').addEventListener('click', () => openCollectionDialog('create'));
    renameButton.addEventListener('click', () => openCollectionDialog('rename'));
    deleteButton.addEventListener('click', () => {
      if (activeCollection === 'all') return;
      items().forEach(item => setCollections(item, collectionsFor(item).filter(name => name !== activeCollection)));
      collectionList.querySelector(`[data-collection="${CSS.escape(activeCollection)}"]`)?.remove();
      status.textContent = `${activeCollection} deleted.`;
      activeCollection = 'all';
      applyFilter();
    });

    collectionForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = collectionForm.elements['collection-name'].value.trim();
      if (!name) return;
      const duplicate = collectionButtons().some(button => button.dataset.collection.toLowerCase() === name.toLowerCase() && button.dataset.collection !== activeCollection);
      if (duplicate) {
        collectionForm.elements['collection-name'].setCustomValidity('This collection already exists.');
        collectionForm.reportValidity();
        return;
      }
      collectionForm.elements['collection-name'].setCustomValidity('');

      if (collectionMode === 'create') {
        const button = d.createElement('button');
        button.className = 'collection-button';
        button.type = 'button';
        button.dataset.collection = name;
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML = `<span></span><span data-collection-count>0</span>`;
        button.firstElementChild.textContent = name;
        collectionList.append(button);
        activeCollection = name;
        status.textContent = `${name} created.`;
      } else {
        const oldName = activeCollection;
        items().forEach(item => setCollections(item, collectionsFor(item).map(value => value === oldName ? name : value)));
        const button = collectionList.querySelector(`[data-collection="${CSS.escape(oldName)}"]`);
        button.dataset.collection = name;
        button.firstElementChild.textContent = name;
        activeCollection = name;
        status.textContent = `${oldName} renamed to ${name}.`;
      }
      collectionDialog.close();
      applyFilter();
    });

    const openTransferDialog = mode => {
      transferMode = mode;
      transferDialog.dataset.transferMode = mode;
      transferTitle.textContent = mode === 'move' ? 'Move selected' : 'Copy selected';
      const select = transferForm.elements['target-collection'];
      select.replaceChildren(...collectionButtons().filter(button => button.dataset.collection !== 'all').map(button => {
        const option = d.createElement('option');
        option.value = button.dataset.collection;
        option.textContent = button.dataset.collection;
        return option;
      }));
      transferDialog.showModal();
    };

    d.querySelector('[data-saved-action="unfavorite"]').addEventListener('click', () => {
      const count = selectedItems().length;
      selectedItems().forEach(item => item.remove());
      status.textContent = `${count} item${count === 1 ? '' : 's'} removed from Saved.`;
      applyFilter();
    });
    d.querySelector('[data-saved-action="move"]').addEventListener('click', () => openTransferDialog('move'));
    d.querySelector('[data-saved-action="copy"]').addEventListener('click', () => openTransferDialog('copy'));

    transferForm.addEventListener('submit', event => {
      event.preventDefault();
      const target = transferForm.elements['target-collection'].value;
      const selected = selectedItems();
      selected.forEach(item => {
        const existing = collectionsFor(item);
        setCollections(item, transferMode === 'move' ? [target] : [...existing, target]);
        item.querySelector('[data-saved-checkbox]').checked = false;
      });
      status.textContent = `${selected.length} item${selected.length === 1 ? '' : 's'} ${transferMode === 'move' ? 'moved' : 'copied'} to ${target}.`;
      transferDialog.close();
      applyFilter();
    });

    d.querySelectorAll('[data-dialog-cancel]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
    applyFilter();
  };

  const setupHistory = () => {
    const list = d.querySelector('[data-history-list]');
    if (!list) return;
    const summary = d.querySelector('[data-history-summary]');
    const empty = d.querySelector('[data-history-empty]');
    const status = d.querySelector('[data-history-status]');
    const deleteAll = d.querySelector('[data-history-delete-all]');
    let activeFilter = 'all';

    const items = () => [...d.querySelectorAll('[data-history-item]')];
    const visibleItems = () => items().filter(item => activeFilter === 'all' || item.dataset.historyType === activeFilter);
    const render = () => {
      items().forEach(item => { item.hidden = activeFilter !== 'all' && item.dataset.historyType !== activeFilter; });
      d.querySelectorAll('[data-history-filter]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.historyFilter === activeFilter)));
      const count = visibleItems().length;
      summary.textContent = `${count} record${count === 1 ? '' : 's'}`;
      empty.hidden = count > 0;
      deleteAll.disabled = count === 0;
    };

    d.querySelectorAll('[data-history-filter]').forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.historyFilter;
      render();
    }));
    list.addEventListener('click', event => {
      const button = event.target.closest('[data-history-delete]');
      if (!button) return;
      button.closest('[data-history-item]').remove();
      status.textContent = 'History record deleted.';
      render();
    });
    deleteAll.addEventListener('click', () => {
      const removable = visibleItems();
      removable.forEach(item => item.remove());
      status.textContent = `${removable.length} history record${removable.length === 1 ? '' : 's'} deleted.`;
      render();
    });
    render();
  };

  setupSaved();
  setupHistory();
})();
