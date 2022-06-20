/* FadeIn Scroll */
$(document).ready(function () {
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    /* Check the location of each desired element */
    $('article').each(function (i) {
      var bottom_of_object =
        $(this).position().top + $(this).outerHeight() * 0.2;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ opacity: '1' }, 900);
      }
    });
  });
});

// $(this).scroll(function () {
//   const Y = scrollY;
//   $('.background').css('top', 0 + 0.02 * Y + 'vh');
// });
