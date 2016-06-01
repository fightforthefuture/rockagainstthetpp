(function (doc, win) {
  "use strict";

  var
    countryLabel = doc.querySelector('[for="select-country"]'),
    countrySelect = doc.getElementById('select-country');

  countryLabel.addEventListener('click', function (e) {
    countryLabel.classList.add('hidden');
    countrySelect.classList.remove('hidden');
    countrySelect.setAttribute('name', 'signature[country]');
  })
})(document, window);
