// $(document).ready(function(){

$(".active-slider__item-timer").TimeCircles({
  fg_width    : 0.03,
  text_size   : 0.15,
  number_size : 0.3
});

  $( '.wares-slider, .parlay-slider' ).slick();
  $( '#active-slider, #history-slider, #deposit-slider, #withdrawal-slider' ).slick({
    centerMode    : true,
    variableWidth : true,
    infinite      : false
  });
  $( '#datepicker' ).datepicker();

  /* ↓↓↓ field switch ↓↓↓ */
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
  /* ↑↑↑ /field switch ↑↑↑ */

/* ↓↓↓ investment calculator ↓↓↓ */
$('#investment-input').bind('blur keyup', function(event) {
  var inputValue   = +$('#investment-input').val(),
      percentValue = +$('#investment-percent').text();

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

/* ↓↓↓ create active-slider-item ↓↓↓ */
$('.tempBTN').click(function(){
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
});
/* ↑↑↑ /create active-slider-item ↑↑↑ */

/* ↓↓↓ parlay-slider ↓↓↓ */
$('.parlay-accordion__btn').click(function(){

  // контроль можливості торгівлі акціями (торги на них не цілодобові)
  var date = new Date;
  var currentTimeInMinutes = date.getUTCHours() * 60 + date.getUTCMinutes(),
      minTimeInMinutes = 10 * 60 + 00,
      maxTimeInMinutes = 14 * 60 + 00;
  if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text() == 'Акции'
      && (currentTimeInMinutes < minTimeInMinutes || currentTimeInMinutes > maxTimeInMinutes) ) {
    showInfoMessage('Акционная биржа на данный момент закрыта. Торговать акциями возможно только с 10:00 до 17:00\
                     по Гринвичу (часовой пояс UTC)');
    return
  }
  console.log('тут код для акордеона');

});

$('.parlay-slider__parlay-choise-btn').click(function(){
  $('.parlay-btns__cover').css('display','none');
  // підсвітка по кліку!!!
});
/* ↑↑↑ /parlay-slider ↑↑↑ */

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */