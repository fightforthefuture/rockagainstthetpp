(function (doc, win) {
  "use strict";

  win.modals = win.modals || {};

  function detectEscKey(e) {
    if (e.code === 'Escape' || e.which === 27) {
      dismissModal();
      win.removeEventListener('keyup', detectEscKey)
    }
  }

  function dismissModal() {
    /**
     * Removes modal from DOM
     * */

    var
      overlay = doc.getElementsByClassName('overlay')[0],
      modal = doc.getElementsByClassName('modal-content')[0];

    overlay.classList.remove('visible');
    modal.classList.remove('visible');
    doc.querySelector('body').classList.remove('modal-present');

    win.setTimeout(function () {
      while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
      }

      modal.remove();
      overlay.remove();
    }, 420);
  }

  function generateModal(options) {
    /**
     * Triggers a modal
     *
     * @param {node} options.contents - any HTML to be used as modal content
     * (also accepts array of nodes)
     * @param {boolean} options.disableOverlayClick - if false (or absent),
     * function adds event listener to allow dismissal of modal by clicking on
     * overlay.
     * @param {boolean} options.noFrame - if true, adds `no-frame` class to
     * modal content element.
     * */

    var
      i,
      contents = options.contents,
      body     = doc.getElementsByTagName('body')[0],
      overlay  = doc.createElement('div'),
      modal    = doc.createElement('div'),
      closeModal;

    if (typeof contents === 'object') {
      if (contents.length === undefined) {
        contents = [contents];
      }
    } else {
      return false;
    }

    overlay.classList.add('overlay');
    modal.classList.add('modal-content', 'visible');

    if (options.noFrame) {
      modal.classList.add('no-frame');
    }

    if (!options.disableOverlayClick) {
      closeModal = doc.createElement('button');
      closeModal.classList.add('close-modal');
      closeModal.textContent = '\u00D7';
      modal.appendChild(closeModal);
      closeModal.addEventListener('click', dismissModal);
      overlay.addEventListener('click', dismissModal);
    }

    for (i = 0; i < contents.length; i++) {
      modal.appendChild(contents[i]);
    }

    body.appendChild(overlay);
    body.appendChild(modal);
    doc.querySelector('body').classList.add('modal-present');

    win.setTimeout(function () {
      overlay.classList.add('visible');
    }, 50);

    win.addEventListener('keyup', detectEscKey);
  }

  win.modals.dismissModal = dismissModal;
  win.modals.generateModal = generateModal;

}(document, window));
