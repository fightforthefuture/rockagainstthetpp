(function (doc, win) {
  "use strict";

  var
    i,
    form = doc.getElementById('petition-form'),
    concealedArtists = doc.getElementsByClassName('concealed'),
    artistsToggle = doc.getElementById('see-full-list'),
    endorsements = doc.getElementById('endorsements'),
    endorsementToggle = doc.getElementById('toggle-list'),
    sideShareButtons = doc.getElementById('fixed-side-social-container');

  function toggleSideShareButtons(e) {
    if (win.scrollY > doc.querySelector('header > p').offsetTop) {
      sideShareButtons.classList.add('fade-in');
    } else {
      sideShareButtons.classList.remove('fade-in')
    }
  }

  win.addEventListener('scroll', toggleSideShareButtons);

  artistsToggle.addEventListener('click', function (e) {
    e.preventDefault();

    i = concealedArtists.length;

    while (i--) {
      concealedArtists[i].classList.remove('concealed');
    }

    artistsToggle.remove();
  });

  endorsementToggle.addEventListener('click', function (e) {
    e.preventDefault();

    endorsements.classList.toggle('hidden');
    endorsementToggle.remove();
  });

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

  var twitterConnectButtons = document.querySelectorAll('a[href="#twitter"]');
  for (i = 0; i < twitterConnectButtons.length; i++) {
    twitterConnectButtons[i].addEventListener('click', function(e) {
      e.preventDefault();
      var url = 'https://mothership-js.fightforthefuture.org/connect/twitter?tag=tpp';
      var properties = 'width=600,height=500,toolbar=no,status=no,menubar=no';

      window.open(url, 'idl_connect', properties);
    });
  }

})(document, window);
