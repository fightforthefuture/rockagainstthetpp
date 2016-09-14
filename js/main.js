(function (doc, win) {
  "use strict";

  var
    i,
    form = doc.getElementById('petition-form'),
    concealedArtists = doc.getElementsByClassName('concealed'),
    artistsToggle = doc.getElementById('see-full-list') || doc.createElement('button'),
    endorsements = doc.getElementById('endorsements'),
    endorsementToggle = doc.getElementById('toggle-list') || doc.createElement('button'),
    sideShareButtons = doc.getElementById('fixed-side-social-container'),
    navigationMenu = doc.querySelector('nav'),
    menuExpand = doc.getElementById('menu-expand');

  win.addEventListener('scroll', function () {
    if (win.scrollY > doc.querySelector('header > p').offsetTop) {
      sideShareButtons.classList.add('fade-in');
    } else {
      sideShareButtons.classList.remove('fade-in')
    }
  });

  win.addEventListener('resize', function () {
    if (win.innerWidth >= 640) {
      navigationMenu.classList.remove('menu-open');
    }
  });

  menuExpand.addEventListener('click', function () {
    navigationMenu.classList.toggle('menu-open');
  });

  doc.getElementById('nav-items').addEventListener('click', function () {
    navigationMenu.classList.remove('menu-open');
  });

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