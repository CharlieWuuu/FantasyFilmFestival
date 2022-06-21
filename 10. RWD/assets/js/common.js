$(document).ready(function () {
  // 載入header
  $.ajax({
    dataType: 'html',
    url: '../10. RWD/assets/html/nav.html',
    jsonp: '$callback',
    success: showMobileHeaderData,
  });

  function showMobileHeaderData(data) {
    // Use the template
    $('#navbar__mobile').append(data);

    showMobileFilmAmount();
    // (4) 顯示搜尋input
    document
      .querySelector('#searchIcon')
      .addEventListener('click', function () {
        $('.nav__button__searchBar__mobile').animate({ width: 'toggle' });
      });

    // 隱藏menu
    $('.navbar__menu').hide();
    // 漢堡控制menu的開合
    $('#burger').click(function () {
      if ($('.fa-bars').css('opacity') == 0) {
        $('.fa-bars').css('opacity', 1);
        $('.fa-xmark').css('opacity', 0);
        $('.navbar__menu').slideUp();
        $('.navbar__container').css(
          'filter',
          'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
        );
        $('.navbar__menu__slide__container').hide();
      } else {
        $('.fa-bars').css('opacity', 0);
        $('.fa-xmark').css('opacity', 1);
        $('.navbar__menu').slideDown();
        $('.navbar__container').css('filter', 'none');
      }
    });

    // menu開合
    $('.navbar__menu__slide__container').hide();
    $('.navbar__menu__button').click(function () {
      const clickedMenu = $(this).children('.navbar__menu__slide__container');
      if (clickedMenu.hasClass('active')) {
        clickedMenu.slideUp().removeClass('active');
      } else {
        $('.navbar__menu__slide__container.active')
          .slideUp()
          .removeClass('active');
        clickedMenu.slideDown().addClass('active');
      }
    });
  }
  $.ajax({
    dataType: 'html',
    url: '../10. RWD/assets/html/footer.html',
    jsonp: '$callback',
    success: showMobileFooterData,
  });

  function showMobileFooterData(data) {
    // Use the template
    $('#footer__mobile').append(data);

    // 隱藏menu
    $('.footer__button__menu').hide();
    // 點擊按鈕控制menu的開合
    $('.footer__button').click(function () {
      const clickedMenu = $(this).children('.footer__button__menu');
      if (clickedMenu.hasClass('active')) {
        clickedMenu.animate({ width: 'toggle' }).removeClass('active');
      } else {
        $('.footer__button__menu.active')
          .animate({ width: 'toggle' })
          .removeClass('active');
        clickedMenu.animate({ width: 'toggle' }).addClass('active');
      }
    });
  }
});

// (3) 渲染加入最愛的資料
// 函式：載入時，顯示已選片單數量
function showMobileFilmAmount() {
  // 變數：取得本機儲存空間
  const localData = JSON.parse(localStorage.getItem('片單'))
    ? JSON.parse(localStorage.getItem('片單'))
    : [];

  if (localData.length == 0) {
    document.getElementById('film_amount_mobile').style.opacity = '0';
  } else {
    document.getElementById('film_amount_mobile').style.opacity = '1';
    document.getElementById('film_amount_mobile').innerText = localData.length;
  }
}
