(function (doc, win) {
  "use strict";

  var
    form = doc.getElementById('petition-form'),
    tweetButton = doc.getElementById('tweet-button'),
    shareButton = doc.getElementById('share-button');
  // ,
  //   endorsements = doc.getElementById('endorsements'),
  //   endorsementToggle = doc.getElementById('toggle-list');

  tweetButton.addEventListener('click', function (e) {
    e.preventDefault();

    // win.open(tweetButton.getAttribute('href'), 'Tweet this', 'width=550,height=420,resizable=1')
  });

  shareButton.addEventListener('click', function (e) {
    e.preventDefault();

    // win.open(shareButton.getAttribute('href'), 'Share this', 'width=581,height=614,resizable=1')
  });

  // endorsementToggle.addEventListener('click', function (e) {
  //   e.preventDefault();
  //
  //   endorsements.classList.toggle('hidden');
  //   endorsementToggle.remove();
  // });

  var util = {

    parseQueryString: function () {
      var
        i,
        pairs,
        queryObject = {},
        queryString = window.location.search;

      if (queryString[0] === '?') {
        queryString = queryString.substr(1);
      }

      pairs = queryString.split('&');
      i = pairs.length;

      while (i--) {
        queryObject[pairs[i].split('=')[0]] = pairs[i].split('=')[1];
      }

      return queryObject;
    }
  };

  var ref = util.parseQueryString();

  if (ref.ref) {
    var tagList = doc.getElementById('action-network-form')['signature[tag_list]'].value;
    if (tagList) {
      tagList = JSON.parse(tagList);
      tagList.push('from-'+ref.ref);
      doc.getElementById('action-network-form')['signature[tag_list]'].value = JSON.stringify(tagList);
    }



  }




})(document, window);
