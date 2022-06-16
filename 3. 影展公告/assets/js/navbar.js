// 隱藏navbar
let lastPos = 300;
const nav = document.querySelector('.navbar__container');

// 監聽scroll事件
document.addEventListener('scroll', function () {
  let currentPos = window.scrollY;
  // 當滑鼠往下滑
  if (currentPos > lastPos) {
    nav.style.top = '-100px'; //讓nav bar消失
    $('.menu__container').slideUp();
  } else {
    nav.style.top = '0px'; //讓nav bar出現
  }
  lastPos = currentPos; //再記住現在位置，跟未來的位置做比較
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
