(function (doc, win) {
  "use strict";

  var
    actionNetworkForm = doc.getElementById('action-network-form');

  function preSubmit() {
    /**
     * Fires up the loading modal and disables the form
     * @return {object} - modal with spinner
     * */

    var
      loadingContainer = doc.createElement('div'),
      loadingCopy = doc.createElement('h2'),
      loadingSpinner = doc.createElement('div');

    loadingSpinner.classList.add('circle-spinner', 'large');
    loadingCopy.textContent = 'Hang on a tick, reticulating splines…';

    loadingContainer.classList.add('loading');
    loadingContainer.appendChild(loadingCopy);
    loadingContainer.appendChild(loadingSpinner);

    win.modals.generateModal({
      contents: loadingContainer,
      disableOverlayClick: true
    });

    actionNetworkForm.classList.add('submitted');
    actionNetworkForm.commit.setAttribute('disabled', true);
  }

  function compilePayloadPetition() {
    /**
     * Compiles FormData to send off to mothership queue
     *
     * @return {FormData} formData
     * */

    var
      tags = JSON.parse(actionNetworkForm['signature[tag_list]'].value),
      formData = new FormData();

    formData.append('guard', '');
    formData.append('hp_enabled', true);
    formData.append('org', 'fftf');
    formData.append('tag', 'tpp');
    formData.append('an_tags', JSON.stringify(tags));
    formData.append('an_url', win.location.href);
    formData.append('an_petition', actionNetworkForm.action.replace('/signatures', ''));
    formData.append('member[first_name]', actionNetworkForm['signature[first_name]'].value);
    formData.append('member[email]', actionNetworkForm['signature[email]'].value);
    formData.append('member[postcode]', actionNetworkForm['signature[zip_code]'].value);
    formData.append('member[country]', actionNetworkForm['signature[country]'].value);

    return formData;
  }

  function submitForm(event) {
    /**
     * Submits the form to ActionNetwork or Mothership-Queue
     *
     * @param {event} event - Form submission event
     * */

    event.preventDefault();

    var
      submission = new XMLHttpRequest();

    if (actionNetworkForm['signature[zip_code]'].value === '') {
      // Since iOS Safari doesn’t do its goddamn job.
      return;
    }

    preSubmit();

    function handleHelperError(e) {
      /**
       * Figures out what to say at just the right moment
       * @param {event|XMLHttpRequest} e - Might be an event, might be a response
       * from an XMLHttpRequest
       * */

      win.modals.dismissModal();

      var
        error = e || {},
        errorMessageContainer = doc.createElement('div'),
        errorMessage = doc.createElement('h2'),
        errorMessageInfo = doc.createElement('p');

      errorMessage.textContent = 'Something went wrong';

      if (error.type) {
        errorMessageInfo.textContent = 'There seems to be a problem somewhere in between your computer and our server. Might not be a bad idea to give it another try.';
      } else if (error.status) {
        errorMessageInfo.textContent = '(the nerdy info is that the server returned a status of "' + error.status + '" and said "' + error.statusText + '".)'
      } else {
        errorMessageInfo.textContent = 'this seems to be a weird error. the nerds have been alerted.';
      }

      errorMessageContainer.appendChild(errorMessage);
      errorMessageContainer.appendChild(errorMessageInfo);

      actionNetworkForm.classList.remove('submitted');
      actionNetworkForm.commit.removeAttribute('disabled');

      win.modals.generateModal({contents: errorMessageContainer});
    }

    function loadHelperResponse() {
      /**
       * Does the thing after we get a response from the API server
       * */

      if (submission.status >= 200 && submission.status < 400) {

        var
          shareContent = doc.createElement('div'),
          shareHeadline = doc.createElement('h3'),
          shareCopy = doc.createElement('p'),
          shareThis = doc.createElement('div'),
          donateCopy = doc.createElement('p');

        win.modals.dismissModal();

        shareHeadline.textContent = 'Thanks for signing';
        shareCopy.textContent = 'Now, share this page to spread the word.';

        shareThis.classList.add('share-this-button-links');
        shareThis.appendChild(doc.querySelector('.share-this'));

        donateCopy.innerHTML = '&hellip;or, <a href="https://donate.fightforthefuture.org/campaigns/rock-against-tpp/?amount=5&frequency=just-once">chip in $5</a> to help us spread the message.';

        shareContent.appendChild(shareHeadline);
        shareContent.appendChild(shareCopy);
        shareContent.appendChild(shareThis);
        shareContent.appendChild(donateCopy);

        win.modals.generateModal({contents: shareContent});

      } else {
        handleHelperError(submission);
      }
    }

    submission.open('POST', 'https://queue.fightforthefuture.org/action', true);
    submission.addEventListener('error', handleHelperError);
    submission.addEventListener('load', loadHelperResponse);
    submission.send(compilePayloadPetition());
  }

  actionNetworkForm.addEventListener('submit', submitForm);

})(document, window);
