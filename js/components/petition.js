(function (doc, win) {
  "use strict";

  var
    actionNetworkForm = doc.getElementById('action-network-form') || doc.createElement('div');

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
    loadingCopy.textContent = 'Please wait one moment…';

    loadingContainer.classList.add('loading');
    loadingContainer.appendChild(loadingCopy);
    loadingContainer.appendChild(loadingSpinner);

    win.modals.generateModal({
      contents: loadingContainer,
      disableOverlayClick: true
    });

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
    formData.append('tag', actionNetworkForm.dataset.mothershipTag);
    formData.append('an_tags', JSON.stringify(tags));
    formData.append('an_url', win.location.href);
    formData.append('an_petition', actionNetworkForm.action.replace(/\/signatures\/?/, ''));
    formData.append('member[first_name]', actionNetworkForm['signature[first_name]'].value);
    formData.append('member[email]', actionNetworkForm['signature[email]'].value);
    formData.append('member[postcode]', actionNetworkForm['signature[zip_code]'].value);
    formData.append('member[country]', 'US');

    if (actionNetworkForm['member[phone_number]'] && actionNetworkForm['member[phone_number]'].value !== '') {
      formData.append('member[phone_number]', actionNetworkForm['member[phone_number]'].value);
    }

    return formData;
  }

  function fireThankYouModal() {

    var
      shareContent = doc.createElement('div'),
      shareHeadline = doc.createElement('h3'),
      shareCopy = doc.createElement('h4'),
      shareTicket = doc.createElement('div'),
      shareThis = doc.createElement('div'),
      donateCopy = doc.createElement('p'),
      thankYou = doc.createElement('p'),
      tweetButton = doc.getElementById('tweet-button').cloneNode(),
      shareButton = doc.getElementById('share-button').cloneNode(),
      phoneSignUp = doc.getElementById('phone-number-modal');

    win.modals.dismissModal();

    tweetButton.classList.add('share-icon');
    shareButton.classList.add('share-icon');

    
    if(window.location.href.indexOf("seattle") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2bd8t00" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';

  } else if (window.location.href.indexOf("portland") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2bsGo2B" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';

  } else if (window.location.href.indexOf("san-francisco") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2bnSehk" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';

     } else if (window.location.href.indexOf("boston") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2cBAcpW" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';

     } else if (window.location.href.indexOf("pittsburgh") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2dbbvVn" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';

     } else if (window.location.href.indexOf("washington") > -1) {
    shareHeadline.textContent = "You're all set!";
    shareTicket.innerHTML = '<h4>1. Dont forget to grab your ticket:</h4><a href="http://bit.ly/2ekT3tg" target="_blank"><button class="download-ticket">Download Ticket!</button></a><br><span style="font-size: 1.5rem;">(We also sent a copy to your email.)</span><br>';
    shareCopy.textContent = '2. Can you help spread the word?';  

     } else { 
    shareHeadline.textContent = "You're all set! We sent you an email.";  
    shareCopy.textContent = 'Now can you help spread the word?';
    } 
    

    shareThis.classList.add('share-icons');
    shareThis.appendChild(tweetButton);
    shareThis.appendChild(shareButton);

    donateCopy.innerHTML = '&hellip;or, <a href="https://donate.fightforthefuture.org/campaigns/rock-against-tpp/?amount=5&frequency=just-once">chip in $5</a> to help us spread the message.';

    thankYou.textContent = 'Thanks for signing!';
    thankYou.classList.add('thanks');

    shareContent.appendChild(shareHeadline);
    shareContent.appendChild(shareTicket);
    shareContent.appendChild(shareCopy);
    shareContent.appendChild(shareThis);

    if (phoneSignUp) {
      phoneSignUp.classList.add('visible');
      shareContent.appendChild(phoneSignUp);
    }

    shareContent.appendChild(donateCopy);

    actionNetworkForm.commit.removeAttribute('disabled');

    win.modals.generateModal({contents: shareContent});

    actionNetworkForm.parentNode.insertBefore(thankYou, actionNetworkForm);
  }

  function confirmSMSSubmission() {
    actionNetworkForm.reset();
    doc.getElementById('form-phone_number').setAttribute('value', 'All set!');
    doc.getElementById('form-phone_number').setAttribute('disabled', true);
    doc.getElementById('submit-phone').setAttribute('disabled', true);
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

    if (!actionNetworkForm['member[phone_number]'] || actionNetworkForm['member[phone_number]'].value === '') {
      preSubmit();
    }

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

      actionNetworkForm.commit.removeAttribute('disabled');

      win.modals.generateModal({contents: errorMessageContainer});
    }

    function loadHelperResponse() {
      /**
       * Does the thing after we get a response from the API server
       * */

      if (submission.status >= 200 && submission.status < 400) {
        if (actionNetworkForm['member[phone_number]'] && actionNetworkForm['member[phone_number]'].value !== '') {
          confirmSMSSubmission();
        } else {
          fireThankYouModal();
        }
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
