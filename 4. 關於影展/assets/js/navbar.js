// 當滑鼠往下滑，menu自動闔上（監聽scroll事件）
let lastPos = 300;
const nav = document.querySelector('.navbar__container');

document.addEventListener('scroll', function () {
  let currentPos = window.scrollY;
  // 當滑鼠往下滑
  if (currentPos > lastPos) {
    $('.menu__container').removeClass('active').slideUp();
  }
});

// 顯示下拉選單
function dropDown(myObj) {
  const menu = myObj.querySelector('.menu__container');
  if ($(menu).hasClass('active')) {
    $(menu).removeClass('active').slideUp();
  } else {
    $('.navbar__link > li > .menu__container.active').slideUp();
    $('.accordion-list > li > .menu__container.active').removeClass('active');
    $(menu).addClass('active').slideDown();
  }
  return false;
}

// 渲染加入最愛的資料
// 變數：取得本機儲存空間
const localData = JSON.parse(localStorage.getItem('片單'))
  ? JSON.parse(localStorage.getItem('片單'))
  : [];

// 函式：載入時，顯示已選片單數量
function showFilmAmount() {
  if (localData.length == 0) {
    document.getElementById('film_amount').style.display = 'none';
  } else {
    document.getElementById('film_amount').innerText = localData.length;
  }
}
showFilmAmount();

// 顯示搜尋input
document.querySelector('.fa-search').addEventListener('click', function () {
  $('.nav__button__searchBar').animate({ width: 'toggle' });
});
