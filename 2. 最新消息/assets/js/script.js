//背景scroll動畫
$(this).scroll(function () {
  const Y = scrollY;
  $('.background__tail > img').css('bottom', -20 + 0.02 * Y + 'vh');
});

// Accordion list 顯示
$(document).ready(function () {
  $('.ticketInfo__container > li > .ticketInfo__content').hide();

  $('.ticketInfo__container > li').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').find('.ticketInfo__content').slideUp();
    } else {
      // $('.ticketInfo__container > li.active .ticketInfo__content').slideUp();
      // $('.ticketInfo__container > li.active').removeClass('active');
      $(this).addClass('active').find('.ticketInfo__content').slideDown();
    }
    return false;
  });
});
