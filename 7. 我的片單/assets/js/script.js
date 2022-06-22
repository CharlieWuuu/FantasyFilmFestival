const localData = JSON.parse(localStorage.getItem('片單'))
  ? JSON.parse(localStorage.getItem('片單'))
  : [];

// (1) 在表格中渲染最愛片單的資料

// 1-1 載入時取得最愛片單資料
// 變數：最終渲染用的陣列資料
const favArrayData = [];

function getFavFilmData() {
  // 迴圈：逐一取出full_id準備檢查
  for (i = 0; i < localData.length; i++) {
    // 迴圈：進入片單原始資料逐一檢查
    for (x = 0; x < filmData.list.length; x++) {
      // 判斷：若片單原始資料包full_id，將此筆原始片單資料放入陣列favArrayData中
      if (filmData.list[x].full_id == localData[i].full_id) {
        favArrayData.splice(0, 0, filmData.list[x]);
      }
    }
  }
}

getFavFilmData();

// 1-2 在表格中渲染最愛片單的資料
const testFilmHTML = `
<div class="film" id="{{full_id}}"
style="transform: translate({{xaxis}}vw, {{yaxis}}vh); height: {{height}}vh">
  <div class="film__content__container">
    <p class="film__name"><a href="/FantasyFilmFestival/6. 影片介紹/index.html">{{name}}</a></p>
    <span class="film__time">{{startTime}}-{{endTime}}</span>
    <span class="film__cinema__name">{{cinema}}</span>
    <span class="film__delete" onclick="remove(this.parentNode.parentNode)" title="刪除影片">x</span>
  </div>
</div>
`;

// 函式：為了顯示所有的片單，因此設定迴圈次數[i] = 片單數量
function renderFilm() {
  // 判斷：8-12還是13-17
  for (var i = 0; i < favArrayData.length; i++) {
    const favArrayI = favArrayData[i];
    const varCinema = favArrayI.c_num;
    const varLeft = favArrayI.left;
    const varLong = favArrayI.long;
    const yaxis = -168 + varLeft * 0.2;
    const height = varLong * 0.2;
    const current_testFilmHTML = testFilmHTML
      .replace('{{full_id}}', favArrayI.full_id)
      .replace('{{yaxis}}', yaxis)
      .replace('{{height}}', height)
      .replace('{{startTime}}', favArrayI.startTime)
      .replace('{{endTime}}', favArrayI.endTime)
      .replace('{{name}}', favArrayI.name)
      .replace('{{cinema}}', favArrayI.cinema);
    if (favArrayI.d_num < 5) {
      const varDay8 = favArrayI.d_num;
      const xaxis = 6.5 + varDay8 * 16 + varCinema * 2;
      const current_testFilmHTML1 = current_testFilmHTML.replace(
        '{{xaxis}}',
        xaxis,
      );
      $('#film__container1').append(current_testFilmHTML1);
    } else {
      const varDay13 = favArrayI.d_num - 5;
      const xaxis = 6.5 + varDay13 * 16 + varCinema * 3;
      const current_testFilmHTML2 = current_testFilmHTML.replace(
        '{{xaxis}}',
        xaxis,
      );
      $('#film__container2').append(current_testFilmHTML2);
    }
  }
}

renderFilm();

// (3) 切換時間表
// 變數：滑動時間表的HTML
const favTableSlideContainerHTML = document.querySelector(
  '.favTableSlide__container',
);

// 函式：隱藏除 id=introduction 以外的區塊
function wrapper() {
  $('.favorite__select__button>#after').click(function () {
    favTableSlideContainerHTML.style.transform = 'translateX(-45vw)';
    document.querySelector('#favoriteSelectText').innerText = '4/13～17';
  });

  $('.favorite__select__button>#before').click(function () {
    favTableSlideContainerHTML.style.transform = 'translateX(45vw)';
    document.querySelector('#favoriteSelectText').innerText = '4/08～12';
  });
}

wrapper();

// (4) 刪除按到的片單
function remove(selectedFilm) {
  selectedFilm.remove(selectedFilm);
  // 刪除localStorage
  for (i = 0; i < localData.length; i++) {
    if (selectedFilm.id == localData[i].full_id) {
      current_i = i;
      localData.splice(current_i, 1);
      localStorage.setItem('片單', JSON.stringify(localData));
    }
  }
  // 刪除favArrayData
  for (x = 0; x < favArrayData.length; x++) {
    if (selectedFilm.id == favArrayData[x].full_id) {
      current_x = x;
      favArrayData.splice(current_x, 1);
    }
  }
  // 刪除sessionStorage
  sessionData.splice(0, 1);
  sessionStorage.setItem('filmHeight', JSON.stringify(sessionData));
  // 顯示片單數量（>900px）
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
  // 顯示衝堂
  conflict();
}

// (5) 顯示衝堂
function conflict() {
  let check = '';
  // 依序取出各天資料;
  dateData = [
    'D17',
    'D16',
    'D15',
    'D14',
    'D13',
    'D12',
    'D11',
    'D10',
    'D09',
    'D08',
  ];

  for (d = 0; d < dateData.length; d++) {
    const todayData = dateData[d];
    for (x = 0; x < favArrayData.length; x++) {
      // 選出要進行比對的資料;
      const favArrayX = favArrayData[x];
      if (favArrayX.did !== todayData) {
        // 不是這天的資料;
      } else if (favArrayX.did == todayData) {
        const x1 = parseFloat(favArrayX.left);
        const x2 = parseFloat(favArrayX.left) + parseFloat(favArrayX.long);
        for (y = 0; y < favArrayData.length; y++) {
          // 比較當天所有的資料;
          const favArrayY = favArrayData[y];
          if (favArrayY.did !== todayData) {
            // 不是這天的資料;
          } else if (favArrayX.full_id == favArrayY.full_id) {
            // favArrayX.name + '與' + favArrayY.name + '不衝突';
            check = 0;
          } else if (favArrayY.did == todayData) {
            y1 = parseFloat(favArrayY.left);
            y2 = parseFloat(favArrayY.left) + parseFloat(favArrayY.long);
            // 如果X的範圍比Y都小或大，代表不衝突；除此之外的狀況顯示為衝堂
            if ((x1 <= y1 && x2 <= y1) || (x1 >= y2 && x2 >= y2)) {
              // favArrayX.name + '與' + favArrayY.name + '不衝突';
              check = 0;
            } else {
              // favArrayX.name + '與' + favArrayY.name + '衝突';
              check = 1;
              break;
            }
          }
        }
        const conflictFilm = document.querySelector('#' + favArrayX.full_id);
        if (check == 1) {
          $(conflictFilm).addClass('active');
        } else if (check == 0) {
          $(conflictFilm).removeClass('active');
        }
      }
    }
  }
}

conflict();

// (6) hover後顯示完整片單內容
const sessionData = JSON.parse(sessionStorage.getItem('片單'))
  ? JSON.parse(sessionStorage.getItem('片單'))
  : [];

$('.film').hover(
  function () {
    const thisHeight = $(this).css('height');
    $(this).css('height', 'auto'); // 高度偷偷變auto
    const currentHeight = $(this).css('height');
    $(this).css('height', thisHeight); // 高度偷偷變回來

    if (parseFloat(thisHeight) > parseFloat(currentHeight)) {
      sessionData.push({ this_height: thisHeight });
      sessionStorage.setItem('filmHeight', JSON.stringify(sessionData));
    } else {
      sessionData.push({ this_height: thisHeight });
      sessionStorage.setItem('filmHeight', JSON.stringify(sessionData));
      $(this).css('height', 'auto');
    }
  },
  function () {
    $(this).css('height', sessionData[0].this_height);
    sessionData.splice(0, 1);
    sessionStorage.setItem('filmHeight', JSON.stringify(sessionData));
  },
);

// (7) 刪除所有片單
function removeAll() {
  $('.film').remove();
  localData.splice(0);
  localStorage.setItem('片單', JSON.stringify(localData));
  favArrayData.splice(0);
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
