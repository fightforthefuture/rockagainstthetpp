(function (doc, win) {

  var
    youtubeLink = encodeURIComponent('https://youtube.com/watch?v=jKGRYypHogo'),
    body = doc.querySelector('body'),
    video = doc.createElement('div'),
    vidContainer = doc.createElement('div'),
    shareItems = doc.createElement('p'),
    twitterShareLink = doc.createElement('a'),
    facebookShareLink = doc.createElement('a');

  twitterShareLink.classList.add('share-button', 'twitter');
  twitterShareLink.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('') + 'url=' + youtubeLink);
  twitterShareLink.setAttribute('target', '_blank');
  twitterShareLink.textContent = 'Tweet';

  facebookShareLink.classList.add('share-button', 'facebook');
  facebookShareLink.setAttribute('href', 'https://facebook.com/sharer.php?u=' + youtubeLink);
  facebookShareLink.setAttribute('target', '_blank');
  facebookShareLink.textContent = 'Share';

  shareItems.appendChild(facebookShareLink);
  shareItems.appendChild(twitterShareLink);

  function playOnLoad(e) {
    e.target.playVideo();
  }

  function launchModalPlayVideo() {
    video.setAttribute('id', 'yt-video');
    vidContainer.appendChild(video);
    vidContainer.classList.add('hidden', 'video');
    body.appendChild(vidContainer);

    win.videoObject = new YT.Player('yt-video', {
      height: '360',
      width: '640',
      videoId: 'jKGRYypHogo',
      rel: 0,
      showinfo: 0,
      events: {
        'onReady': playOnLoad
      }
    });


    win.modals.generateModal({
      contents: [vidContainer, shareItems],
      noFrame: true
    });

    vidContainer.classList.remove('hidden');
  }

  doc.getElementById('video-play-button').addEventListener('click', launchModalPlayVideo);

}(document, window));
