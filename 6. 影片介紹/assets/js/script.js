// (1) 載入時，已選片單變紅色
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

// (2) 當點擊愛心時，影片加入我的片單
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
