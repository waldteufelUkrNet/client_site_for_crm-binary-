// $(document).ready(function(){

/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayInvestment,     // розмір ставки
    parlayType,           // short/normal/long
    parlayTime = 0,       // час ДО закриття ставки - в мілісекундах
    parlayAnticipation,   // up/down
    parlayPairName,       // назва пари
    parlayCurrentPrice;   // поточна котировка

var TradingHolidays  = [ '2018-11-22', '2018-12-25', '2019-01-01', '2019-01-21', '2019-02-18', '2019-04-19',
                         '2019-05-27', '2019-07-04', '2019-09-02', '2019-11-28', '2019-12-25', '2020-01-01',
                         '2020-01-20', '2020-02-17', '2020-04-10', '2020-05-25', '2020-07-03', '2020-09-07',
                         '2020-11-26', '2020-12-25'
                       ];
// Market closes at 1:00 p.m. ET.
var TradingShortDays = [ '2018-11-23', '2018-12-24', '2019-07-03', '2019-11-29', '2019-12-24', '2020-11-27',
                         '2020-12-24'
                       ];
/* ↑↑↑ /GLOBAL VARIABLES ↑↑↑ */

/* ↓↓↓ активація анімованих таймерів ↓↓↓ */
$(".active-slider__item-timer").TimeCircles({
  fg_width    : 0.03,
  text_size   : 0.15,
  number_size : 0.3
});
/* ↑↑↑ /активація анімованих таймерів ↑↑↑ */

/* ↓↓↓ активація слайдерів ↓↓↓ */
$( '.wares-slider, .parlay-slider' ).slick({
  draggable     : false
});
$( '#active-slider, #history-slider, #deposit-slider, #withdrawal-slider' ).slick({
  centerMode    : true,
  variableWidth : true,
  infinite      : false
});
/* ↑↑↑ /активація слайдерів ↑↑↑ */

/* ↓↓↓ field switch (активні ставки + історії) ↓↓↓ */
$('.slider-change-btn').click(function(){
  var tempArrBtn  = $('.slider-change-btn');
  var tempArrItem = $('.slider-area__slider');
  for ( var i = 0; i < tempArrBtn.length; i++ ) {
    if (tempArrBtn[i] == this) {
      var thisElNumber = i;
    }
  }
	// buttons
	$('.slider-change-btn').removeClass('slider-change-btn_active');
	$(this).addClass('slider-change-btn_active');
  //sliders
  $('.slider-area__slider').css({'display':'none'});
  $(tempArrItem[thisElNumber]).css({'display':'block'});
});
/* ↑↑↑ /field switch (активні ставки + історії) ↑↑↑ */

/* ↓↓↓ investment calculator ↓↓↓ */
$('#investment-input').bind('blur keyup', function(event) {
  var inputValue   = +$('#investment-input').val(),
      percentValue = +$('#investment-percent').text();

  if (inputValue == 0) {
    // прибирання підсвіток
    parlayTime = 0;
    highlightingParlayChoiseBtn();
    // блокування кнопок для активації ставки, якщо ставка == 0
    $('.parlay-btns__cover').css('display','flex');
  } else if (inputValue != 0 && parlayTime != 0) {
    // розблокування кнопок для активації ставки
    $('.parlay-btns__cover').css('display','none');
  }

  var resultValue  = (inputValue * percentValue)/100 + inputValue;
  if ( !isNumeric(resultValue) ) {
    resultValue = 'ошибка ввода!';
    $( $('#investment-input') ).val('').css({'border':'1px solid red'});
  } else {
    $( $('#investment-input') ).css({'border':'1px solid #102734'});
  }

  $( $('#investment-result') ).text(resultValue);
});
/* ↑↑↑ /investment calculator ↑↑↑ */

/* ↓↓↓ datetimer ↓↓↓ */
var datetimer = document.getElementById('UTC-datetimer');
setInterval(function() {
  var date = new Date();
  var dd = date.getUTCDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getUTCMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getUTCFullYear();
  if (yy < 10) yy = '0' + yy;

  var hh = date.getUTCHours();
  if (hh < 10) hh = '0' + hh;

  var mn = date.getUTCMinutes();
  if (mn < 10) mn = '0' + mn;

  var ss = date.getUTCSeconds();
  if (ss < 10) ss = '0' + ss;

  datetimer.innerHTML = dd + "." + mm + "." + yy + "   " + hh + ":" + mn + ":" + ss;
}, 1000);
/* ↑↑↑ /datetimer ↑↑↑ */





































/* ↓↓↓ динамічне формування списків можливих ставок ↓↓↓ */
var startTime, finishTime, currentDateTime;
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){

  parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
  if (parlayType == 'normal') {

  currentDateTime = new Date();

/////////////////////////////////////////////////////
  var xhttp = new XMLHttpRequest();
  console.log("xhttp", xhttp);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(1);
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "god.ares.local/Hol/GetDate?value=2018-11-10");
  xhttp.send();
/////////////////////////////////////////////////////




  // контроль можливості торгівлі акціями (торги на них не цілодобові)
  if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
      $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions') {
    currentDateTime = new Date();
    // перевірка на вихідний день (субота/неділя)
    if ( currentDateTime.getUTCDay() == 6 || currentDateTime.getUTCDay() == 0) {
      console.log('неробочий день');
      startTime = finishTime = false;
    } else if (1) {}
    //             перевірка на державні свята США
    // http://god.ares.local/Hol/GetDate?value=2018-11-10
    //             перевірка на короткий робочий день в США
  } else {
    // якщо не акції - від поточного часу до 24:00 (startTime, finishTime)
  }
  // виклик createListOfNormalParlay (startTime, finishTime)

    // var currentDateTime = new Date,
    //     tempUTCMinutes  = currentDateTime.getUTCMinutes(),
    //     tempUTCFullYear,
    //     tempUTCMonth,
    //     tempUTCDate,
    //     tempUTCHours;
  }

  parlayTime = 0;
  // прибирання підсвіток
  highlightingParlayChoiseBtn();
  // деактивувати кнопки ставок
  $('.parlay-btns__cover').css('display','flex');
});
/* ↑↑↑ /динамічне формування списків можливих ставок ↑↑↑ */
















































/* ↓↓↓ попередній вибір ставки ↓↓↓ */
$('.parlay-slider__parlay-choise-btn').click(function(){
  parlayTime = +$(this).attr('data-timeToEndInMS') || 0;
  // якщо є якесь значення ставки
  if ( +$('#investment-input').val() > 0 ) {
    // підсвітка по кліку
    highlightingParlayChoiseBtn(this)
    // активувати кнопки ставок
    $('.parlay-btns__cover').css('display','none');
  }
});
/* ↑↑↑ /попередній вибір ставки ↑↑↑ */

/* ↓↓↓ create active-slider-item ↓↓↓ */
$('.parlay-btns__btn').click(function(){

  parlayInvestment   = +$('#investment-input').val();
  parlayType         = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
  parlayAnticipation = $(this).attr('data-parlayAnticipation');
  parlayPairName     = $('.trade-pair__name').text();
  parlayCurrentPrice = +$('.trade-pair__price').text();

      {
        // тимчасовий блок, потрібен для перевірки правильності таймерів у активних ставках
        // бекендщикам достатньо кількості мілісекунд із атрибута data-timeToEndInMS
        var highlightingEl;
        var tempArr = $('.parlay-slider__parlay-choise-btn');
        for ( var i = 0; i < tempArr.length; i++ ) {
          if ( $(tempArr[i]).css('background-color') == 'rgba(0, 0, 0, 0.3)' ) {
            highlightingEl = tempArr[i];
            // кількість мілісекунд (тривалість) - те, чого достатньо бекендщикам
            parlayTime     = +$(tempArr[i]).attr('data-timeToEndInMS');
          }
        }
        // час закінчення = кількість мілісекунд (тривалість) + поточний час
        parlayTime =  Date.now() + parlayTime;
        parlayTime = new Date(parlayTime);

        // перетворення часу закінчення із мілісекунд у формат "2018-12-01 00:00:00"
        tempUTCDate = parlayTime.getUTCDate();
        if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
        tempUTCMonth = parlayTime.getUTCMonth() + 1;
        if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
        tempUTCFullYear = parlayTime.getUTCFullYear();
        if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
        tempUTCHours = parlayTime.getUTCHours() + 3;
        if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
        tempUTCMinutes = parlayTime.getUTCMinutes();
        if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;
        tempUTCІSeconds = parlayTime.getUTCSeconds();
        if (tempUTCІSeconds < 10) tempUTCІSeconds = '0' + tempUTCІSeconds;

        parlayTime = tempUTCFullYear + '-' +
                     tempUTCMonth    + '-' +
                     tempUTCDate     + ' ' +
                     tempUTCHours    + ':' +
                     tempUTCMinutes  + ':' +
                     tempUTCІSeconds;
      }

  createParlay(parlayPairName, parlayInvestment, parlayAnticipation, parlayTime, parlayCurrentPrice);

  parlayTime = 0;
  $('.parlay-btns__cover').css('display','flex');
  highlightingParlayChoiseBtn();
  $('#investment-input').val('');

});
//createParlay(args);
/* ↑↑↑ /create active-slider-item ↑↑↑ */

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function createParlay(parlayPairName, parlayInvestment, parlayAnticipation, parlayTime, parlayCurrentPrice) {
  // створення активної ставки - елементу акордеону

  if ( parlayAnticipation == 'up') {
    parlayAnticipation = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
  } else {
    parlayAnticipation = 'class="fas fa-angle-double-down" style="color:red"';
  }

  // активних ставок - не більше 10
  if( $('#active-slider .active-slider__item').not('.slick-cloned').length >= 10 ) {
    showInfoMessage("Вы достигли максимально возможного количества одновременно открытых ставок.\
                     Для открытия новой ставки дождитесь, пожалуйста, закрытия активных торгов.")
  }
  else {
    // зупинити slick
    $( '#active-slider' ).slick('unslick');
    // створити ставку
    $( '#active-slider' ).append('<div class="active-slider__item">\
                                      <div class="active-slider__item-timer-wrapper">\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_days"\
                                               data-date = "' + parlayTime + '">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_hours"\
                                               data-date = "' + parlayTime + '">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_minutes"\
                                               data-date = "' + parlayTime + '">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_seconds"\
                                               data-date = "' + parlayTime + '">\
                                          </div>\
                                      </div>\
                                      <div class="active-slider__item-graphic"></div>\
                                      <div class="active-slider__info">\
                                          <span class="active-slider__pair-name">' + parlayPairName + '</span>\
                                          <span class="active-slider__parlay"> ' + parlayInvestment + ' </span>\
                                              <i ' + parlayAnticipation + '></i>\
                                          <div class="active-slider__current-price">' + parlayCurrentPrice + '</div>\
                                      </div>\
                                  </div>');
    // перезапустити slick
    $( '#active-slider' ).slick({
      centerMode: true,
      variableWidth: true,
      infinite: false
    });

    // зробити останній доданий елемент активним та правильно його відпозиціонувати
    $('.active-slider__item').removeClass('slick-current slick-center')
                             .attr('tabindex','-1');
    $('.active-slider__item:last-of-type').addClass('slick-current slick-center')
                                          .attr('tabindex','0');

    setTimeout(function(){

    var halfOfSlickListInnerWidthWithoutPaddings = ( $('.slick-list').innerWidth()
                                                   - +$('.slick-list').css('padding-left').slice(0, -2)
                                                   - +$('.slick-list').css('padding-right').slice(0, -2) ) /2,
        halfOfSliderItemWithMargins = (  $('#active-slider .active-slider__item').outerWidth()
                 + +$('#active-slider .active-slider__item').css('margin-left').slice(0, -2)
                 + +$('#active-slider .active-slider__item').css('margin-right').slice(0, -2) ) /2,
        startTranslateValue = halfOfSlickListInnerWidthWithoutPaddings - halfOfSliderItemWithMargins;

    var translateValue = startTranslateValue - ( ($('#active-slider .active-slider__item').not('.slick-cloned').length -1) * halfOfSliderItemWithMargins * 2 );

        translateValue = 'translate3D(' + translateValue + 'px, 0px, 0px)';

      $('#active-slider .slick-track').css({'transition':'transform .3s','transform': translateValue});
    },501);

    // перезапустити таймери
    $(".active-slider__item-timer").TimeCircles({ // slick-current slick-center
      fg_width           : 0.03,
      text_size          : 0.15,
      number_size        : 0.3
    });

  }
}

function highlightingParlayChoiseBtn (elem) {
  // підсвічування активної ставки
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  $(elem).css('background-color','rgba(0,0,0,.3)');
}

function createListOfNormalParlay (startTime, finishTime) {
  // спочатку потрібно видалити старий список, якщо він є!!!
  //   // округлення часу ставки до 00хв або 30хв
  //   if ( 25 <= tempUTCMinutes && tempUTCMinutes < 55 ) {
  //     // оркуглити до 00, додати 1 годину
  //     tempDateTime.setUTCMinutes(60);
  //   } else if ( 0 <= tempUTCMinutes && tempUTCMinutes < 25 ) {
  //     // оркуглити до 30
  //     tempDateTime.setUTCMinutes(30);
  //   } else if ( 55 <= tempUTCMinutes && tempUTCMinutes <= 59 ) {
  //     // округлити до 30, додати годину
  //     tempDateTime.setUTCMinutes(90);
  //   }

  //   // сформувати рядок дати
  //   tempUTCDate = tempDateTime.getUTCDate();
  //   if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;

  //   tempUTCMonth = tempDateTime.getUTCMonth() + 1;
  //   if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;

  //   tempUTCFullYear = tempDateTime.getUTCFullYear();
  //   if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;

  //   tempUTCHours = tempDateTime.getUTCHours();
  //   if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;

  //   tempUTCMinutes = tempDateTime.getUTCMinutes();
  //   if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

  //   tempDateTimeString = tempUTCFullYear + '-' +
  //                        tempUTCMonth    + '-' +
  //                        tempUTCDate     + ' ' +
  //                        tempUTCHours    + ':' +
  //                        tempUTCMinutes;

  //   $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
  //                                                      .children('.parlay-slider__parlay-choise-btn-holder')
  //                                                      .append('<div class="parlay-slider__parlay-choise-btn"\
  //                                                                    onclick="highlightingParlayChoiseBtn(this)">'
  //                                                                   + tempDateTimeString +
  //                                                              '</div>');

  // }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */