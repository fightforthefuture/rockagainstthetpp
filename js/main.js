(function (doc, win) {
  "use strict";

  var
    i,
    form = doc.getElementById('petition-form'),
    concealedArtists = doc.getElementsByClassName('concealed'),
    artistsToggle = doc.getElementById('see-full-list'),
    endorsements = doc.getElementById('endorsements'),
    endorsementToggle = doc.getElementById('toggle-list'),
    sideShareButtons = doc.getElementById('fixed-side-social-container'),
    navigationMenu = doc.querySelector('nav'),
    menuExpand = doc.getElementById('menu-expand'),
    video = doc.createElement('iframe'),
    vidContainer = doc.createElement('div');


  doc.getElementById('video-play-button').addEventListener('click', function () {

    var
      shareItems = doc.createElement('p'),
      twitterShareLink = doc.createElement('a'),
      facebookShareLink = doc.createElement('a');

    twitterShareLink.classList.add('share-button', 'twitter');
    twitterShareLink.setAttribute('href', doc.getElementById('footer-tweet').getAttribute('href'));
    twitterShareLink.setAttribute('target', '_blank');
    twitterShareLink.textContent = 'Tweet';

    facebookShareLink.classList.add('share-button', 'facebook');
    facebookShareLink.setAttribute('href', doc.getElementById('footer-share').getAttribute('href'));
    facebookShareLink.setAttribute('target', '_blank');
    facebookShareLink.textContent = 'Share';

    shareItems.appendChild(facebookShareLink);
    shareItems.appendChild(twitterShareLink);

    win.modals.generateModal({
      contents: [vidContainer, shareItems],
      noFrame: true
    });

    vidContainer.classList.remove('hidden');
  });

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

  function preloadVideoFrame() {
    video.setAttribute('src', 'https://www.youtube-nocookie.com/embed/jKGRYypHogo?rel=0');
    video.setAttribute('width', 640);
    video.setAttribute('height', 360);
    video.setAttribute('frameborder', 0);
    video.setAttribute('allowfullscreen', true);

    vidContainer.classList.add('video', 'hidden');
    vidContainer.appendChild(video);

    doc.querySelector('body').appendChild(vidContainer)
  }

  win.addEventListener('DOMContentLoaded', preloadVideoFrame)

})(document, window);
