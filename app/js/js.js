/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayInvestment,     // розмір ставки
    parlayType,           // short/normal/long
    parlayTime = 0,       // час ДО закриття ставки - в мілісекундах
    parlayAnticipation,   // очікування - up/down
    parlayPairName,       // назва пари
    parlayCurrentPrice;   // поточна котировка
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
  draggable: false
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
  // sliders
  $('.slider-area__slider').css({'display':'none'});
  $(tempArrItem[thisElNumber]).css({'display':'block'});
});
/* ↑↑↑ /field switch (активні ставки + історії) ↑↑↑ */

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

/* ↓↓↓ обнулення інвестицій при зміні торгових пар ↓↓↓ */
$( $('.wares-slider').children('.slick-arrow') ).click(function(){
  $('#investment-input').val('');
  $('.parlay-btns__cover').css('display','flex');
  parlayTime = 0;
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');

  // зробити перший елемент активним та правильно його відпозиціонувати
  $('.parlay-slider').slick('unslick').slick({'draggable':'false'});
  // після unslick на кнопки нового слайдера потрібно навішувати обробники
  $( $('.parlay-slider').children('.slick-arrow') ).click(function(){
    clickOnParlaySliderArrow();
  });
});
/* ↑↑↑ /обнулення інвестицій при зміні торгових пар ↑↑↑ */

/* ↓↓↓ investment calculator + activation/deactivation btns ↓↓↓ */
$('#investment-input').bind('blur keyup', function() {
  deActivationParlayBtns();
});
/* ↑↑↑ /investment calculator + activation/deactivation btns ↑↑↑ */

/* ↓↓↓ create active-slider-item ↓↓↓ */
$('.parlay-btns__btn').click(function(){
  // по кліку на кнопки формування ставок вибирає потрібні значення для формування нової ставки
  // викликає функцію формування ставок createParlay
  // обнулює значення, деактивує кнопки формування ставок та знімає підсвічування обраної ставки в списку

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
            if ( $(highlightingEl).attr('data-timeToEndInMS') ) {
              parlayTime = +$(highlightingEl).attr('data-timeToEndInMS');
            } else if ( $(highlightingEl).attr('data-timeToEnd') ) {
              parlayTime = $(highlightingEl).attr('data-timeToEnd');

              var UTCDate = new Date();
              UTCDate = UTCDate.setHours(UTCDate.getUTCHours());

              parlayTime =  new Date(parlayTime.slice(0,4),
                                    parlayTime.slice(5,7) - 1,
                                    parlayTime.slice(8,10),
                                    parlayTime.slice(11,13),
                                    parlayTime.slice(14,16)) - UTCDate;
            }
          }
        }
        // час закінчення = кількість мілісекунд (тривалість) + поточний час
        parlayTime =  Date.now() + parlayTime;
        parlayTime = new Date(parlayTime);

        // перетворення часу закінчення із мілісекунд у формат "2018-12-01 00:00:00"
        var tempUTCDate = parlayTime.getUTCDate();
        if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
        var tempUTCMonth = parlayTime.getUTCMonth() + 1;
        if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
        var tempUTCFullYear = parlayTime.getUTCFullYear();
        if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
        var tempUTCHours = parlayTime.getUTCHours() + 2;
        if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
        var tempUTCMinutes = parlayTime.getUTCMinutes();
        if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;
        var tempUTCІSeconds = parlayTime.getUTCSeconds();
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
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  $('.parlay-btns__cover').css('display','flex');
  $('#investment-input').val('');

});
/* ↑↑↑ /create active-slider-item ↑↑↑ */

/* ↓↓↓ динамічне формування списків можливих ставок ↓↓↓ */
var startTime, finishTime, currentDateTime;
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  clickOnParlaySliderArrow()
});
/* ↑↑↑ /динамічне формування списків можливих ставок ↑↑↑ */

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function clickOnParlaySliderArrow() {
  //

  parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
  currentDateTime = new Date();

  var tempUTCYear = currentDateTime.getUTCFullYear();
  if (tempUTCYear < 10) tempUTCYear = '0' + tempUTCYear;
  var tempUTCDate = currentDateTime.getUTCDate();
  if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
  var tempUTCMonth = currentDateTime.getUTCMonth() + 1;
  if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
  var tempUTCHour = currentDateTime.getUTCHours();
  if (tempUTCHour < 10) tempUTCHour = '0' + tempUTCHour;
  var tempUTCMinutes = currentDateTime.getUTCMinutes();
  if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;
  var tempUTCSeconds = currentDateTime.getUTCSeconds();
  if (tempUTCSeconds < 10) tempUTCSeconds = '0' + tempUTCSeconds;

  var currentUTCDateString = tempUTCYear  + '-' +
                             tempUTCMonth + '-' +
                             tempUTCDate;

  if ( parlayType == 'short' ) {
    // контроль для акцій: контроль, чи працює поставник котирувань - ajax, якщо так - максимально можлива ставка - за 5 хв до закриття біржі, робочий день - 13:30-20:00 по UTC
    if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
        $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions' ) {

      // очистити старий список ставок
      $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

      if ( isActionsTradingPossible() ) {

        if ( (13*60 + 30) <= (+tempUTCHour * 60 + +tempUTCMinutes) && (+tempUTCHour * 60 + +tempUTCMinutes) < (19*60 + 50) ) {
          // тут буде потрібна інтернаціоналізація
          $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                            .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 секунд</div>\
                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 минута</div>\
                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 минуты</div>\
                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 минуты</div>\
                                                                    ');
        } else {
          console.log('біржа не працює - тут зробити попап');
        }
      } else {
        console.log('біржа не працює - тут зробити попап');
      }

    }
  } else if ( parlayType == 'long' ) {
    // контроль для акцій: контроль, чи працює поставник котирувань - ajax, якщо так - перевірка, чи час закриття припадає на робочий час
    if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
        $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions' ) {

      // очистити старий список ставок
      $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

      if ( isActionsTradingPossible() ) {
///////////////////////////////////////////////////////////
        var endTimeInMSArray   = [86400000,432000000,864000000,1296000000,2592000000];
        var endTimeInDaysArray = ['1 сутки','5 суток','10 суток','15 суток','30 суток'];
        var endTimeInMS        = +currentDateTime + +endTimeInMSArray[0];
        var endTimeInObj       = new Date(endTimeInMS);

///////////////////////////////////////////////////////////
      } else {
        console.log('біржа не працює - тут зробити попап');
      }

    }
  } else if ( parlayType == 'normal' ) {
    // побудова списку можливих ставок
    // контроль можливості торгівлі акціями (торги на них не цілодобові)
    if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
        $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions' ) {

        // перевірка на державні свята США / короткі робочі дні в США
        var url = 'http://god.ares.local/api/Hol/GetDate?value=' + currentUTCDateString; // на роботі (локалка)
        // var url = 'http://62.216.34.146:9000/api/Hol/GetDate?value=' + currentUTCDateString; // вдома (інет)

        if ( isActionsTradingPossible(url, currentDateTime) ) {
          startTime  = tempUTCHour + ':' + tempUTCMinutes;
          finishTime = '20:00';
          createListOfNormalParlay (startTime, finishTime, currentDateTime);
        } else {
          console.log('біржа закрита - попап');
        }

        // startTime  = tempUTCHour + ':' + tempUTCMinutes;
        // finishTime = '20:00';
        // createListOfNormalParlay (startTime, finishTime, currentDateTime);
    } else {
      // якщо не акції - від поточного часу до 24:00 (startTime, finishTime)
      startTime  = tempUTCHour + ':' + tempUTCMinutes;
      finishTime = '24:00';
      createListOfNormalParlay (startTime, finishTime, currentDateTime)
    }
  }

  parlayTime = 0;
  // прибирання підсвіток
  // деактивувати кнопки ставок
  $('.parlay-btns__cover').css('display','flex');
}

function createParlay(parlayPairName, parlayInvestment, parlayAnticipation, parlayTime, parlayCurrentPrice) {
  // створює активну ставку - елемент акордеону
  // контролює, щоб ставок було не більше 10

  // console.log("parlayCurrentPrice :", parlayCurrentPrice);
  // console.log("parlayTime         :", parlayTime);
  // console.log("parlayAnticipation :", parlayAnticipation);
  // console.log("parlayInvestment   :", parlayInvestment);
  // console.log("parlayPairName     :", parlayPairName);

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

function deActivationParlayBtns(clickedElem) {
  // розраховує прибуток
  // активує/деактивує кнопки вгору/вниз
  // підсвічує обрану ставку

  var inputValue   = +$('#investment-input').val(),
      percentValue = +$('#investment-percent').text();

  var tempArr = $('.parlay-slider__parlay-choise-btn');
  for ( var i = 0; i < tempArr.length; i++ ) {
    if ( $(tempArr[i]).css('background-color') == 'rgba(0, 0, 0, 0.3)' ) {
      var tempClickedElem = $(tempArr[i]);
    }
  }
  if ( $(clickedElem).attr('data-timeToEnd') || $(tempClickedElem).attr('data-timeToEnd') ) {
    parlayTime = $(clickedElem).attr('data-timeToEnd') || $(tempClickedElem).attr('data-timeToEnd');
    parlayTime =  Date.now() - new Date(parlayTime.slice(0,4),
                                        parlayTime.slice(5,7) - 1,
                                        parlayTime.slice(8,10),
                                        parlayTime.slice(11,13),
                                        parlayTime.slice(14,16));

  } else if ( $(clickedElem).attr('data-timeToEndInMS') || $(tempClickedElem).attr('data-timeToEndInMS') ) {
    parlayTime = +$(clickedElem).attr('data-timeToEndInMS') || +$(tempClickedElem).attr('data-timeToEndInMS');
  } else {
    parlayTime = 0;
  }

  /* ↓↓↓ highlighting ↓↓↓ */
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  if ( clickedElem ) {
    $(clickedElem).css('background-color','rgba(0,0,0,.3)');
  } else {
    $(tempClickedElem).css('background-color','rgba(0,0,0,.3)');
  }
  /* ↑↑↑ /highlighting ↑↑↑ */

  /* ↓↓↓ investment calculator ↓↓↓ */
  var resultValue  = (inputValue * percentValue)/100 + inputValue;
  if ( !isNumeric(resultValue) ) {
    resultValue = 'ошибка ввода!';
    $( $('#investment-input') ).val('').css({'border':'1px solid red'});
  } else {
    $( $('#investment-input') ).css({'border':'1px solid #102734'});
  }

  $( $('#investment-result') ).text(resultValue);
  /* ↑↑↑ /investment calculator ↑↑↑ */

  /* ↓↓↓ activation/deactivation btns ↓↓↓ */
  if ( inputValue != 0 && parlayTime != 0 ) {
    $('.parlay-btns__cover').css('display','none');
  } else {
    $('.parlay-btns__cover').css('display','flex');
  }
  /* ↑↑↑ /activation/deactivation btns ↑↑↑ */
};

function createListOfNormalParlay (startTime, finishTime, currentDateTime) {
  // видаляє старий список нормальних ставок (якщо він є)
  // якщо біржа закрита - виводить повідомлення
  // циклом формує список можливих нормальних ставок з інтервалом у півгодини

  // спочатку потрібно видалити старий список, якщо він є
  $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // якщо startTime = finishTime = false - торги не можливі
  if ( startTime == false ) {
    // біржа закрита - потрібно буде зробити відповідне інфооформлення - попап або вікно
    console.log('біржа закрита');
    return
  }

  // визначення першого можливого часу ставки: ставки робляться або в 00хв, або в 30хв,
  // але так, щоб до кінця ставки було щонайменше 5 хв

  // розібрати рядки startTime / finishTime
  var tempUTCTimeHours         = +startTime.slice(0,2),
      tempUTCTimeMinutes       = +startTime.slice(3),
      tempUTCTimeFinishHours   = +finishTime.slice(0,2),
      tempUTCTimeFinishMinutes = +finishTime.slice(3);

  var tempUTCTimeInMinutes       = tempUTCTimeHours * 60 + tempUTCTimeMinutes,
      tempUTCTimeFinishInMinutes = tempUTCTimeFinishHours * 60 + tempUTCTimeFinishMinutes;

  // округлення часу першої можливої ставки до 00хв або 30хв
  if ( 25 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 55 ) {
    // оркуглити до 00, додати 1 годину
    currentDateTime.setUTCMinutes(60);
  } else if ( 0 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 25 ) {
    // оркуглити до 30
    currentDateTime.setUTCMinutes(30);
  } else if ( 55 <= tempUTCTimeMinutes && tempUTCTimeMinutes <= 59 ) {
    // округлити до 30, додати годину
    currentDateTime.setUTCMinutes(90);
  }

  // сформувати рядок дати ( у список для вибору клієнту )
  tempUTCFullYear = currentDateTime.getUTCFullYear();
  if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
  tempUTCMonth = currentDateTime.getUTCMonth() + 1;
  if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
  tempUTCDate = currentDateTime.getUTCDate();
  if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
  tempUTCHours = currentDateTime.getUTCHours();
  if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
  tempUTCMinutes = currentDateTime.getUTCMinutes();
  if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

  var tempDateTimeString = tempUTCFullYear + '-' +
                           tempUTCMonth    + '-' +
                           tempUTCDate     + ' ' +
                           tempUTCHours    + ':' +
                           tempUTCMinutes;

  // це щоб перша ставка формувалася лише тоді, коли час робочий
  if ( tempUTCTimeHours*60 + tempUTCTimeMinutes < ( tempUTCTimeFinishHours*60 + tempUTCTimeFinishMinutes-5 ) ) {
    $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
                                                       .children('.parlay-slider__parlay-choise-btn-holder')
                                                       .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString + '"\
                                                                     onclick="deActivationParlayBtns(this)">'
                                                                     + tempDateTimeString +
                                                               '</div>');
  }

  while (tempUTCTimeInMinutes < tempUTCTimeFinishInMinutes - 60) {
    currentDateTime.setMinutes(currentDateTime.getMinutes() + 30)
    // сформувати рядок дати ( у список для вибору клієнту )
    tempUTCFullYear = currentDateTime.getUTCFullYear();
    if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
    tempUTCMonth = currentDateTime.getUTCMonth() + 1;
    if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
    tempUTCDate = currentDateTime.getUTCDate();
    if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
    tempUTCHours = currentDateTime.getUTCHours();
    if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
    tempUTCMinutes = currentDateTime.getUTCMinutes();
    if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

    var tempDateTimeString = tempUTCFullYear + '-' +
                             tempUTCMonth    + '-' +
                             tempUTCDate     + ' ' +
                             tempUTCHours    + ':' +
                             tempUTCMinutes;
    $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
                                                       .children('.parlay-slider__parlay-choise-btn-holder')
                                                       .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString + '"\
                                                                     onclick="deActivationParlayBtns(this)">'
                                                                     + tempDateTimeString +
                                                               '</div>');
    tempUTCTimeInMinutes += 30;
  }
}

function isActionsTradingPossible(url, dateTime) {
  // перевіряє, чи працює поставник котирувань
  // якщо ні - видає return false
  // якщо так - перевіряє, чи робочий день і час
  var answer;
  $.ajax({
    url     : 'http://god.ares.local/api/status/get',
    async   : false,
    success :  function ( data ) {
      if (!!data == true) {
        answer = true;
      } else { console.log('else');
        answer = false;
      }
    },
    error   : function () {
      answer = false;
    }
  });

  if (answer == false) return answer;

  $.ajax({
    url     : url,
    async   : false,
    success :  function ( data ) {
                if ( data == 1 ) { // святковий день
                  answer = false
                }
                if ( data == 0 ) { // не святковий день
                  // перевірка на вихідний день (субота/неділя)
                  if ( dateTime.getUTCDay() == 6 || dateTime.getUTCDay() == 0 ) { // вихідний день (субота/неділя)
                    answer = false
                  } else { // робочий день - 13:30-20:00 по UTC
                    // перевести години в хвилини, додати до хвилин
                    var timeInMinutes = dateTime.getUTCHours()*60 + dateTime.getUTCMinutes();
                    if ( timeInMinutes >= 1200 || timeInMinutes < 810 ) { // неробочий час
                      answer = false
                    } else { // робочий час
                      answer = true
                    }
                  }
                }
              }
  })
  return answer
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */