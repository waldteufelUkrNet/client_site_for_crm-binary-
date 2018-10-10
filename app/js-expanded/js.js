// $(document).ready(function(){

/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayInvestment,     // розмір ставки
    parlayType,           // short/normal/long
    parlayTime,           // час ДО закриття ставки - в секундах
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
$( '.wares-slider, .parlay-slider' ).slick();
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
    highlightingParlayChoiseBtn();
    // блокування кнопок для активації ставки, якщо ставка == 0
    $('.parlay-btns__cover').css('display','flex');
  } else {
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

/* ↓↓↓ parlay-slider ↓↓↓ */
// $('.parlay-accordion__btn').click(function(){

//   // контроль можливості торгівлі акціями (торги на них не цілодобові)
//   var date = new Date;
//   var currentTimeInMinutes = date.getUTCHours() * 60 + date.getUTCMinutes(),
//       minTimeInMinutes = 10 * 60 + 00,
//       maxTimeInMinutes = 14 * 60 + 00;
//   if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text() == 'Акции'
//       && (currentTimeInMinutes < minTimeInMinutes || currentTimeInMinutes > maxTimeInMinutes) ) {
//     showInfoMessage('Акционная биржа на данный момент закрыта. Торговать акциями возможно только с 10:00 до 17:00\
//                      по Гринвичу (часовой пояс UTC)');
//     return
//   }
//   console.log('тут код для акордеона');

// });
/* ↑↑↑ /parlay-slider ↑↑↑ */
































/* ↓↓↓ динамічне формування списків можливих ставок ↓↓↓ */
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){

  parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
  if (parlayType == 'normal') {
    var tempDateTime   = new Date,
        tempUTCMinutes = tempDateTime.getUTCMinutes(),
        tempUTCFullYear,
        tempUTCMonth,
        tempUTCDate,
        tempUTCHours;

console.log("tempDateTime   ", tempDateTime);
var tempEndDateTime = tempDateTime;
tempEndDateTime.setUTCDate(tempEndDateTime.getUTCDate() + 1);
tempEndDateTime.setUTCMinutes(0);
tempEndDateTime.setUTCHours(0);
console.log("tempEndDateTime", tempEndDateTime);

    // округлення часу ставки до 00хв або 30хв
    if ( 25 <= tempUTCMinutes && tempUTCMinutes < 55 ) {
      // оркуглити до 00, додати 1 годину
      tempDateTime.setUTCMinutes(60);
    } else if ( 0 <= tempUTCMinutes && tempUTCMinutes < 25 ) {
      // оркуглити до 30
      tempDateTime.setUTCMinutes(30);
    } else if ( 55 <= tempUTCMinutes && tempUTCMinutes <= 59 ) {
      // округлити до 30, додати годину
      tempDateTime.setUTCMinutes(90);
    }

    // сформувати рядок дати
    tempUTCDate = tempDateTime.getUTCDate();
    if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;

    tempUTCMonth = tempDateTime.getUTCMonth() + 1;
    if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;

    tempUTCFullYear = tempDateTime.getUTCFullYear();
    if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;

    tempUTCHours = tempDateTime.getUTCHours();
    if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;

    tempUTCMinutes = tempDateTime.getUTCMinutes();
    if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

    tempDateTimeString = tempUTCFullYear + '-' +
                         tempUTCMonth    + '-' +
                         tempUTCDate     + ' ' +
                         tempUTCHours    + ':' +
                         tempUTCMinutes;

    $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
                                                       .children('.parlay-slider__parlay-choise-btn-holder')
                                                       .append('<div class="parlay-slider__parlay-choise-btn"\
                                                                     onclick="highlightingParlayChoiseBtn(this)">'
                                                                    + tempDateTimeString +
                                                               '</div>');

  }
  // прибирання підсвіток
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  // деактивувати кнопки ставок
  $('.parlay-btns__cover').css('display','flex');
});
/* ↑↑↑ /динамічне формування списків можливих ставок ↑↑↑ */
















































/* ↓↓↓ попередній вибір ставки ↓↓↓ */
$('.parlay-slider__parlay-choise-btn').click(function(){
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
  // parlayTime,           // час ДО закриття ставки - в секундах
  parlayInvestment = +$('#investment-input').val();
  //console.log("parlayInvestment", parlayInvestment);
  parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
  //console.log("parlayType", parlayType);
  parlayAnticipation = $(this).attr('data-parlayAnticipation');
  //console.log("parlayAnticipation", parlayAnticipation);
  parlayPairName = $('.trade-pair__name').text();
  //console.log("parlayPairName", parlayPairName);
  parlayCurrentPrice = $('.trade-pair__price').text();
  //console.log("parlayCurrentPrice", parlayCurrentPrice);
});
//createParlay(args);
/* ↑↑↑ /create active-slider-item ↑↑↑ */

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function createParlay(){
  // активних ставок - не більше 10
  if( $('#active-slider .active-slider__item').not('.slick-cloned').length >= 10 ) {
    showInfoMessage("Вы достигли максимально возможного количества одновременно открытых ставок.\
                     Для открытия новой ставки дождитесь, пожалуйста, закрытия активных торгов.")
  }
  else {
    // зупинити slick
    $( '#active-slider' ).slick('unslick');
    // створити ставку
    var tempNumber = $('#active-slider .active-slider__item').not('.slick-cloned').length + 1;
    $( '#active-slider' ).append('<div class="active-slider__item">\
                                      <div class="active-slider__item-timer-wrapper">\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_days"\
                                               data-date = "2018-11-01 00:00:00">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_hours"\
                                               data-date = "2018-11-01 00:00:00">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_minutes"\
                                               data-date = "2018-11-01 00:00:00">\
                                          </div>\
                                          <div class     = "active-slider__item-timer active-slider__item-timer_seconds"\
                                               data-date = "2018-11-01 00:00:00">\
                                          </div>\
                                      </div>\
                                      <div class="active-slider__item-graphic">'
                                        + tempNumber +
                                      '</div>\
                                      <div class="active-slider__info">\
                                          <span class="active-slider__pair-name">BTC/ETH</span>\
                                          <span class="active-slider__parlay"> 30 </span>\
                                              <i class="fas fa-angle-double-up" style="color:dodgerblue"></i>\
                                          <div class="active-slider__current-price">12345.67890</div>\
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

    var translateValue = startTranslateValue - ( (tempNumber - 1) * halfOfSliderItemWithMargins * 2 );

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
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  $(elem).css('background-color','rgba(0,0,0,.3)');
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */