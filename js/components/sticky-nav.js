(function (doc, win) {
  var
    nav = doc.getElementById('nav-items'),
    prevTop = 0;

  win.addEventListener('scroll', function () {
    var
      currentTop = win.scrollY;

    if (currentTop < prevTop) {
      if (currentTop > 0 && nav.classList.contains('scrolled')) {
        nav.classList.add('stuck');
      } else {
        nav.classList.remove('stuck', 'scrolled');
      }
    } else {

      nav.classList.remove('stuck');

      if (currentTop > nav.clientHeight) {
        nav.classList.add('scrolled')
      }
    }

    prevTop = currentTop;
  });
}(document, window));
