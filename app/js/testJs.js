var tempObj = {
    IdOrder     : 1,           // id контейнера
    Investments : 5555,        // зроблена ставка
    Simbol      : 'BTC/ETH',   // пара
    OpenPrise   : 145.678,     // початкова ціна
    TypeOrder   : true,        // очікування, угору - true, вниз - false
    Time        : 180,        // поточний час до закінчення
    StartTime   : 180,        // початковий час до закінчення (тривалість ставки)
    graphicArr  : []           // масив для побудови графіка
};

// .active-slider__time-candle-wrapper
$('.tempBTN6').click(function(){
  var timer = setInterval(function () {
    if ($('#order' + 1)[0]) {
      // if exist - change
      tempObj.Time -= 1;
      if ( tempObj.Time <= 0 ) {
        console.log(1);
        $( $('#order' + 1)[0] ).remove();
        clearInterval(timer);
      }
      var indicator = 186 * tempObj.Time / tempObj.StartTime + 'px';
      $( $('#order' + 1)[0] ).find('.active-slider__time-candle-wrapper').css('height', indicator);

    } else {
      // if don't exist - create
      // формуємо значки вверх/вниз
      var parlayAnticipation;
      if (tempObj.TypeOrder == true) {
        parlayAnticipation = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
      } else {
        parlayAnticipation = 'class="fas fa-angle-double-down" style="color:red"';
      }

      // зупинити slick
      $('#active-slider').slick('unslick');

      //додаємо елемент слайдеру
      $('#active-slider').prepend('<div class="active-slider__item" id="order' + tempObj.IdOrder + '">\
                                     <div class="active-slider__item-timer-wrapper">\
                                       <div class="active-slider__time-candle-wrapper">\
                                         <div class="active-slider__time-candle"></div>\
                                       </div>\
                                     </div>\
                                     <div class="active-slider__item-graphic"></div>\
                                     <div class="active-slider__info">\
                                       <span class="active-slider__pair-name">' + tempObj.Simbol + '</span>\
                                       <span class="active-slider__parlay"> ' + tempObj.Investments + ' </span>\
                                         <i ' + parlayAnticipation + '></i>\
                                       <div class="active-slider__start-price">' + tempObj.OpenPrise + '</div>\
                                     </div>\
                                   </div>');
      // перезапустити slick
      $('#active-slider').slick({
        centerMode: false,
        variableWidth: true,
        infinite: false
      });
    }
  }, 1000)
});