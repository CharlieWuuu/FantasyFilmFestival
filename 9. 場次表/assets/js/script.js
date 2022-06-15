// (1) 渲染所有片單

const localData = JSON.parse(localStorage.getItem('片單'))
  ? JSON.parse(localStorage.getItem('片單'))
  : [];

var timeHeading_html = `
<div class="tableDaily__container" id="{{filmData.list.did}}" >
  <div class="tableHeading__container" id= {{filmData.list.did}}>
    <table class="tableHeading">
    <tr>
      <td id="date01"><p>{{filmData.list.date}}</p></td>
      <td id="date02"><p>10:00</p></td>
      <td id="date02"><p>11:00</p></td>
      <td id="date02"><p>12:00</p></td>
      <td id="date02"><p>13:00</p></td>
      <td id="date02"><p>14:00</p></td>
      <td id="date02"><p>15:00</p></td>
      <td id="date02"><p>16:00</p></td>
      <td id="date02"><p>17:00</p></td>
      <td id="date02"><p>18:00</p></td>
      <td id="date02"><p>19:00</p></td>
      <td id="date02"><p>20:00</p></td>
      <td id="date02"><p>21:00</p></td>
      <td id="date02"><p>22:00</p></td>
      <td id="date02"><p>23:00</p></td>
      <td id="date03"><p></p></td>
    </tr>
  </table>
  </div>
</div>`;

var tableCinema_html = `
<div class="tableCinema__container" id={{filmData.list.cid}}>
<table class="tableCinema">
  <tr>
    <td id="cinema"><p id="cinema__name">{{filmData.list.cinema}}</p></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
    <td id="block"></td>
  </tr>
</table>
</div>`;

var filmContainer_html = `
<div class="film__container" id="{{filmData.list.full_id}}">
  <div class="film" id={{filmData.list.full_id}} title="{{filmData.list.name}} {{filmData.list.startTime}}-{{filmData.list.endTime}}"
  style="transform: translate({{filmData.list.left}}vw, -150px);
  width: {{filmData.list.long}}vw">
    <p id="film__name">{{filmData.list.name}}</p>
    <p id="film__time">
      {{filmData.list.startTime}}-{{filmData.list.endTime}}
    </p>
    <p class="film__fav" id="{{filmData.list.full_id}}" onclick="chooseFavorite(this.id)">❤</p>
  </div>
</div>`;

// 預設顯示所有片單
// 1. 設定一開始會用到的變數：日期、矩陣等
// 2. 用for迴圈處理每一筆資料
// 3. 顯示所有表頭：當前一筆日期與本筆資料相異，顯示表頭於時間表容器中
// 4. 顯示所有影廳表格：當前一筆影廳表格與本筆資料相異，顯示影廳表格於當日時間表容器
// 5. 顯示所有片單：顯示於該影廳表格中
// 6. 設定本次迴圈的日期、影廳id，用於下次回圈時進行if判斷時用

// 為了讓第一筆進入for迴圈的資料也有運算到，下面的變數都預設為無資料
// 設定變數：本次迴圈的日期id
var current_date = '';
// 設定變數：本次迴圈的影廳id
var current_cinema = '';
// 設定變數：前次迴圈的日期id
var last_cinema = '';
// 設定變數：前次迴圈的影廳id
var last_date = '';

// 為了顯示所有的片單，因此設定迴圈次數[i] = 片單數量
for (var i = 0; i < filmData.list.length; i++) {
  // 設定變數：本次迴圈跑的資料
  var film = filmData.list[i];
  // 設定變數：本次迴圈的日期id
  var current_date = film.did;
  // 設定變數：本次迴圈的影廳id
  var current_cinema = film.cid;

  // 顯示每個日期的表頭
  // 當「本次迴圈的日期id」不為「前次迴圈的日期id」時，執行以下動作
  if (current_date != last_date) {
    // 設定變數：本次迴圈的表頭html
    var current_tableHeading_html = timeHeading_html
      // html的id變更為「本次迴圈的日期id」，利於放入影廳表格時指認
      .replaceAll('{{filmData.list.did}}', filmData.list[i].did)
      // 帶入表頭日期文字
      .replaceAll('{{filmData.list.date}}', filmData.list[i].date);
    // 將帶入日期的表頭顯示在時間表容器中
    $('.timeline__container').append(current_tableHeading_html);
  }

  // 顯示每個影廳的表格
  // 當「本次迴圈的影廳id」不為「前次迴圈的影廳id」時，執行以下動作
  if (current_cinema != last_cinema) {
    // 設定變數：本次迴圈的影廳表格html
    var current_tableCinema_html = tableCinema_html
      // html的id變更為「本次迴圈的影廳id」，利於放入片單時指認
      .replaceAll('{{filmData.list.cid}}', filmData.list[i].cid)
      // 帶入影廳名稱文字
      .replace('{{filmData.list.cinema}}', filmData.list[i].cinema);
    // 將帶入影廳名稱的表格顯示在當日時間表容器中
    $('#' + filmData.list[i].did).append(current_tableCinema_html);
  }

  // 顯示所有片單（所有資料都要跑過，所以不用if判斷）
  // 設定變數：本次迴圈的片單html
  const long = filmData.list[i].long * 0.1;
  const left = 8 + filmData.list[i].left * 0.1;
  var current_filmContainer_html = filmContainer_html
    // html的id變更為「本次迴圈的片單id」，利於後續選擇時指涉；因不止放入一處，使用.replaceAll
    .replaceAll('{{filmData.list.full_id}}', filmData.list[i].full_id)
    // html的x軸位置變更為「本次迴圈的left」，以在表格上呈現正確位置
    .replace('{{filmData.list.left}}', left)
    // html的width變更為「本次迴圈的long」，以在表格上正確寬度
    .replace('{{filmData.list.long}}', long)
    // 帶入電影名稱文字
    .replaceAll('{{filmData.list.name}}', filmData.list[i].name)
    // 帶入電影開始時間文字
    .replaceAll('{{filmData.list.startTime}}', filmData.list[i].startTime)
    // 帶入電影結束時間文字
    .replaceAll('{{filmData.list.endTime}}', filmData.list[i].endTime);

  // 設定變數：本次迴圈的影廳id，用來指稱要放入的div是誰，讓片單放入正確容器中
  var currentCinemaId = filmData.list[i].cid;
  $('#' + currentCinemaId).append(current_filmContainer_html);

  // 設定本次迴圈的日期、影廳id，用於下次回圈時進行if判斷時用
  last_date = film.did;
  last_cinema = film.cid;
}

// (2) 選擇日期範圍
// 設定變數：開始/結束日期選單的div
const startDate_selector = document.querySelector('#startDate_selector');
const endDate_selector = document.querySelector('#endDate_selector');

function changeDate(event) {
  // 設定變數：開始/結束日期選單的值
  // 選擇邏輯：開始日期選單的div > 被選到的option > 值
  const inputStartValue =
    startDate_selector.options[startDate_selector.selectedIndex].value;
  const inputEndValue =
    endDate_selector.options[endDate_selector.selectedIndex].value;

  // 隱藏所有的資料
  // 選擇所有日期的容器，「選擇所有（querySelectorAll）」會變成陣列，因此用for迴圈一一隱藏
  var all_daily_div = document.querySelectorAll('.tableDaily__container');
  for (i = 0; i < all_daily_div.length; i++) {
    all_daily_div[i].style.display = 'none';
  }

  // 比較「開始」、「結束」日期的值的大小
  // 開始日期不得大於結束日期、結束日期不得單獨選擇
  // 設定與日期id一樣的陣列，比較所選值的index
  var dateArray = [
    'D08',
    'D09',
    'D10',
    'D11',
    'D12',
    'D13',
    'D14',
    'D15',
    'D16',
    'D17',
    'D18',
  ];

  startIndex = dateArray.indexOf(inputStartValue);
  endIndex = dateArray.indexOf(inputEndValue);

  // 如果「開始」、「結束」日期的值無資料，不執行
  if (inputStartValue == '' && inputEndValue == '') {
    var all_daily_div = document.querySelectorAll('.tableDaily__container');
    for (i = 0; i < all_daily_div.length; i++) {
      all_daily_div[i].style.display = 'block';
    }
    // 如果「開始」日期的值 > 「結束」日期的值，跳出警告視窗
  } else if (inputStartValue == '' && inputEndValue !== '') {
    alert('請選擇開始日期');
    // 如果「開始」日期的值 <= 「結束」日期的值，顯示包含這些日期id的div
  } else if (inputStartValue !== '' && inputEndValue == '') {
    let x = startIndex;
    document.querySelector('#' + dateArray[x]).style.display = 'block';
  } else {
    for (i = startIndex; i <= endIndex; i++) {
      document.querySelector('#' + dateArray[i]).style.display = 'block';
    }
  }
}

// 改變「開始」日期的值時，執行函式
startDate_selector.addEventListener('change', function (event) {
  changeDate(event);
  // changeCinema(event);
});

// 改變「結束」日期的值時，執行函式
endDate_selector.addEventListener('change', function (event) {
  changeDate(event);
  // changeCinema(event);
});

// (3) 選擇影廳

// 設定變數：影廳選單的div
let cinema_selector = document.querySelector('#cinema_selector');

function changeCinema(event) {
  // 設定變數：影廳選單的值
  // 選擇邏輯：影廳選單的div > 被選到的第i個option > 值
  const inputCinemaValue =
    cinema_selector.options[cinema_selector.selectedIndex].value;

  // 隱藏所有的資料
  // 選擇所有影廳的容器，「選擇所有（querySelectorAll）」會變成陣列，因此用for迴圈一一隱藏
  var all_cinema_div = document.querySelectorAll('.tableCinema__container');
  for (i = 0; i < all_cinema_div.length; i++) {
    // all_cinema_div[i].style.backgroundColor = 'red';
    // all_cinema_div[i].style.height = '200px';
    all_cinema_div[i].style.display = 'none';
  }

  // 設定變數：包含選擇值的 id
  var includeValue = '[id*=' + inputCinemaValue + ']';

  // 設定 array 為包含選擇值的全部 id
  var array = document.querySelectorAll(includeValue);

  // 選擇任一選項後會進入動作
  if (inputCinemaValue !== '') {
    // 利用for迴圈block每個符合條件的id
    for (i = 0; i < array.length; i++) {
      array[i].style.display = 'block';
    }
  }

  // 並非所有影廳每日皆有上片，當天放映影廳表格會被影藏，表頭也要跟著影藏
  // 其中0414 ~ 0417期間，影廳C01、C03沒有放映
  // 設定#D14 ~ #D17的陣列，在選擇div時使用

  // 當日期容器內的影廳容器是隱藏狀態，日器容器跟著隱藏
  var all_daily_div = document.querySelectorAll('.tableDaily__container');

  for (i = 0; i < all_daily_div.length; i++) {
    var count = 0;

    if (all_daily_div[i].style.display != 'none') {
      var daily_cinema_div = all_daily_div[i].querySelectorAll(
        '.tableCinema__container',
      );
      for (x = 0; x < daily_cinema_div.length; x++) {
        if (daily_cinema_div[x].style.display == 'none') {
          count++;
        }
      }

      if (count == daily_cinema_div.length) {
        all_daily_div[i].style.display = 'none';
      } else {
        all_daily_div[i].style.display = 'block';
      }
    }
  }
}

// 改變「影廳」的值時，執行函式
cinema_selector.addEventListener('change', function (event) {
  changeDate(event);
  changeCinema(event);
});

// (4) 載入時，已選片單變紅色
function showClicked() {
  // 變數：載入時，預選的id；預設為空值
  let chosenId = '';
  // 檢查：瀏覽器暫存片單(obj)所有資料
  for (i = 0; i < localData.length; i++) {
    // 判斷：是否有預選id，有的話欲渲染片單的HTML變色
    if ((chosenId = localData[i].full_id)) {
      const clickedHTML = document.querySelector('.film > #' + chosenId);
      clickedHTML.style.color = '#EA5136';
    }
  }
}
showClicked();

// (5) 當點擊愛心時，影片加入我的片單
function chooseFavorite(clickedId) {
  // 變數：設定(1)檢查片單存在與否的i、(2)片單存在狀態、(3)欲渲染片單的HTML
  let current_i = -1;
  let check = '還沒有這部片';
  const clickedHTML = document.querySelector('.film > #' + clickedId);

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
    clickedHTML.style.color = 'rgba(0, 0, 0, 0.2)';
  } else if (check == '還沒有這部片') {
    localData.push({ full_id: clickedId });
    localStorage.setItem('片單', JSON.stringify(localData));
    // 渲染：未選片單變色
    showClicked();
  }
  // 渲染：顯示已選片單數量
  if (localData.length == 0) {
    document.getElementById('film_amount').style.opacity = '0';
  } else {
    document.getElementById('film_amount').style.opacity = '1';
    document.getElementById('film_amount').innerText = localData.length;
  }
}
