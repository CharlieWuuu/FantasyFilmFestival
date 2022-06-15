// (1) menu開合
function dropDown(myObj) {
  const menu = myObj.querySelector('.menu__container');
  if ($(menu).hasClass('active')) {
    $(menu).removeClass('active').slideUp();
  } else {
    $('.navbar__link > li > .menu__container.active')
      .removeClass('active')
      .slideUp();
    $(menu).addClass('active').slideDown();
  }
  return false;
}

// (2) 當滑鼠往下滑，隱藏menu
// 監聽scroll事件
let lastPos = '';
document.addEventListener('scroll', function () {
  let currentPos = window.scrollY;

  if (currentPos > lastPos) {
    $('.menu__container').slideUp();
  } else {
  }
  lastPos = currentPos; //再記住現在位置，跟未來的位置做比較
});

// (3) 渲染加入最愛的資料
// 函式：載入時，顯示已選片單數量
function showFilmAmount() {
  // 變數：取得本機儲存空間
  const localData = JSON.parse(localStorage.getItem('片單'))
    ? JSON.parse(localStorage.getItem('片單'))
    : [];

  if (localData.length == 0) {
    document.getElementById('film_amount').style.opacity = '0';
  } else {
    document.getElementById('film_amount').style.opacity = '1';
    document.getElementById('film_amount').innerText = localData.length;
  }
}

$(document).ready(function () {
  showFilmAmount();

  // (4) 顯示搜尋input
  document.querySelector('.fa-search').addEventListener('click', function () {
    $('.nav__button__searchBar').animate({ width: 'toggle' });
  });
});
