// (1) 渲染所有片單資料
// 變數：要渲染的片單HTML
const filmHTML = `
<section class="film">
  <p><a href="/FantasyFilmFestival/6. 影片介紹/index.html">{{name}}</a> | {{country}} | {{long}}分 | {{rating}}</p>
  <div id="timelineList">{{timelineList}}</div>
</section>`;

const timelineHTML = `
<div class="timelineList__container">
  <span>{{date}}</span>
  <span>{{startTime}}</span>
  <span class="timelineCinema">{{cinema}}</span>
  <span class="timelineFav" id="{{full_id}}" onclick="chooseFavorite(this.id);"><i class="fa-solid fa-heart"></i></span>
</div>`;

// 迴圈：依序取代資料，放到對應的容器中
for (i = 0; i < filmList.list.length; i++) {
  //產生此部film的場次列表，可以點選
  var fid = filmList.list[i].fid;
  var flist = getFilmTimelineListByFId(fid);

  // 取代各時段的影片資訊
  var currentTimelineList = '';
  for (f = 0; f < flist.length; f++) {
    currentTimelineList += timelineHTML
      .replace('{{date}}', flist[f].date)
      .replace('{{startTime}}', flist[f].startTime)
      .replace('{{cinema}}', flist[f].cinema)
      .replace('{{full_id}}', flist[f].full_id);
  }

  // 取代片單的列表
  var currentFilmHTML = filmHTML
    .replace('{{name}}', filmList.list[i].name)
    .replace('{{country}}', filmList.list[i].countryZH1)
    .replace('{{long}}', filmList.list[i].long)
    .replace('{{rating}}', filmList.list[i].rating)
    .replace('{{fid}}', filmList.list[i].fid)
    .replace('{{timelineList}}', currentTimelineList);

  $('#' + filmList.list[i].tid).append(currentFilmHTML);
}

// (2) 影片清單開合
// 載入時，隱藏除了 id=introduction 以外的區塊
$(function () {
  $('.film__type').attr('style', 'display: none');
});

// 開合功能
let lastThis = '';
// 函式：點擊.type__title後
$('.type__title').click(function () {
  // 記錄案到的.type__title的href (影片類型id)
  const showFilmHref = $(this).attr('href');
  // 判斷：如果這個已經active，就收起來
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('#' + showFilmHref).slideUp();
  } else if ($(this).hasClass('active') == false) {
    // 判斷：如果這個有active，且只有它有active，直接收起
    if ($('.type__title').hasClass('active') == false) {
      $(this).addClass('active');
      $('#' + showFilmHref).slideDown();
      // 判斷：如果這個有active，且別人有active，等0.8秒再收起 (讓動畫流暢一點)
    } else {
      const shownFilmHref = $('.type__title.active').attr('href');
      $('.type__title.active').removeClass('active');
      $('#' + shownFilmHref).slideUp();
      $(this).addClass('active');
      $('#' + showFilmHref)
        .delay(800)
        .slideDown();
    }
  }
});

// (3) 載入時，已選片單變紅色
// 變數：載入時，預選的id；預設為空值
const localData = JSON.parse(localStorage.getItem('片單'))
  ? JSON.parse(localStorage.getItem('片單'))
  : [];

function showClicked() {
  let chosenId = localStorage.getItem('片單').full_id;
  // 檢查：瀏覽器暫存片單(obj)所有資料
  for (i = 0; i < localData.length; i++) {
    chosenId = localData[i].full_id;
    // 判斷：是否有預選id，有的話欲渲染片單的HTML變色
    const clickedHTML = document.querySelector('#' + chosenId);
    if (clickedHTML !== null) {
      $(clickedHTML).addClass('active');
    }
  }
}
showClicked();

// (4) 當點擊愛心時，影片加入我的片單
function chooseFavorite(clickedId) {
  // 變數：設定(1)檢查片單存在與否的i、(2)片單存在狀態、(3)欲渲染片單的HTML
  let current_i = -1;
  let check = '還沒有這部片';
  const clickedHTML = document.querySelector('#' + clickedId);

  // 檢查：瀏覽器暫存片單(obj)所有資料
  for (i = 0; i < localData.length; i++) {
    // 判斷：是否有已點擊的id這部
    if (clickedId == localData[i].full_id) {
      current_i = i;
      check = '已經有這部片';
      break;
    }
  }

  // 判斷：瀏覽器暫存片單(obj)中是否有這部，決定push或刪除一筆瀏覽器暫存片單(obj)的資料
  if (check == '已經有這部片') {
    localData.splice(current_i, 1);
    localStorage.setItem('片單', JSON.stringify(localData));
    // 渲染：已選片單變回灰色
    const clickedHTML = document.querySelector('#' + clickedId);
    $(clickedHTML).removeClass('active');
  } else if (check == '還沒有這部片') {
    localData.push({ full_id: clickedId });
    localStorage.setItem('片單', JSON.stringify(localData));
    // 渲染：已選片單變紅色
    showClicked();
  }

  // 渲染：顯示已選片單數量
  if (localData.length == 0) {
    document.getElementById('film_amount').style.opacity = '0';
  } else {
    document.getElementById('film_amount').style.opacity = '1';
    document.getElementById('film_amount').innerText = localData.length;
  }

  if (localData.length == 0) {
    document.getElementById('film_amount_mobile').style.opacity = '0';
  } else {
    document.getElementById('film_amount_mobile').style.opacity = '1';
    document.getElementById('film_amount_mobile').innerText = localData.length;
  }
}
