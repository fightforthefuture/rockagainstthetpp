(function (doc, win) {
  "use strict";

  var
    form = doc.getElementById('petition-form'),
    tweetButton = doc.getElementById('tweet-button'),
    shareButton = doc.getElementById('share-button'),
    endorsements = doc.getElementById('endorsements'),
    endorsementToggle = doc.getElementById('toggle-list');

  tweetButton.addEventListener('click', function (e) {
    e.preventDefault();

    // win.open(tweetButton.getAttribute('href'), 'Tweet this', 'width=550,height=420,resizable=1')
  });

  shareButton.addEventListener('click', function (e) {
    e.preventDefault();

    // win.open(shareButton.getAttribute('href'), 'Share this', 'width=581,height=614,resizable=1')
  });

  endorsementToggle.addEventListener('click', function (e) {
    e.preventDefault();

    endorsements.classList.toggle('hidden');
    endorsementToggle.remove();
  });

})(document, window);
