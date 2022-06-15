// header物件跟著滑鼠動的動畫
function myFunction(e) {
  // 減去一半的螢幕寬/高，讓滑鼠在中間時，接近原本的版面配置
  var x = e.pageX - screen.width * 0.5;
  var y = e.pageY - screen.height * 0.5;

  // 背景大尾巴

  $('#tailBig').css('top', 'calc( -10vh + ' + -0.02 * y + 'px )');
  $('#tailBig').css('left', 'calc( 15% + ' + -0.02 * x + 'px)');

  // 背景小尾巴(左)

  $('#tailSmall1').css('bottom', 'calc( 0vh + ' + -0.01 * y + 'px )');
  $('#tailSmall1').css('left', 'calc( -10% + ' + 0.01 * x + 'px)');

  // 背景小尾巴(右)

  $('#tailSmall2').css('top', 'calc( -20vh + ' + 0.01 * y + 'px )');
  $('#tailSmall2').css('right', 'calc( -15% + ' + -0.01 * x + 'px)');

  //馬

  $('#horse').css('top', 'calc( 5vh + ' + 0.01 * y + 'px )');
  $('#horse').css('right', 'calc( 10% + ' + -0.01 * x + 'px)');

  //彩虹

  $('#rainbow').css('top', 'calc( 5vh + ' + -0.03 * y + 'px )');
  $('#rainbow').css('right', 'calc( 0% + ' + 0.03 * x + 'px)');

  //三角錐(橘)

  $('#cornO').css('top', 'calc( 68vh + ' + -0.03 * y + 'px )');
  $('#cornO').css('right', 'calc( 5% + ' + 0.03 * x + 'px)');

  //三角錐(綠)

  $('#cornG').css('top', 'calc( 40vh + ' + 0.06 * y + 'px )');
  $('#cornG').css('right', 'calc( 15% + ' + -0.06 * x + 'px)');

  //三角錐(粉)
  $('#cornP').css('top', 'calc( 70vh + ' + 0.18 * y + 'px )');
  $('#cornP').css('right', 'calc( 23% + ' + -0.15 * x + 'px)');
}
