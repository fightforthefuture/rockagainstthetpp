(function (doc, win) {
  "use strict";

  var
    countryLabel = doc.querySelector('[for="select-country"]'),
    countrySelect = doc.getElementById('select-country'),
    tweetButton = doc.getElementById('tweet-button'),
    shareButton = doc.getElementById('share-button');

  countryLabel.addEventListener('click', function (e) {
    countryLabel.classList.add('hidden');
    countrySelect.classList.remove('hidden');
    countrySelect.setAttribute('name', 'signature[country]');
  });

  tweetButton.addEventListener('click', function (e) {
    e.preventDefault();

    win.open(tweetButton.getAttribute('href'), 'Tweet this', 'width=550,height=420,resizable=1')
  });

  shareButton.addEventListener('click', function (e) {
    e.preventDefault();

    win.open(shareButton.getAttribute('href'), 'Share this', 'width=581,height=614,resizable=1')
  });

})(document, window);
