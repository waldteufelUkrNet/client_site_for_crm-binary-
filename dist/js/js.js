// made by waldteufel@ukr.net
/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayType,                                    // short/normal/long
    parlayTime                            = 0,     // час ДО закриття ставки - в мілісекундах
    pairType,                                      // 0 - валюта, 1 - акції, 2 - товари, 3 - криптовалюта
    breakInTrade,                                  // 0 - біржа активна, 1 - перерва у вибраної пари
    infoMessageTimer,                              // таймер для приховування повідомлень
    flagIsTradingPossible_investmentInput = false, // мінімальна ставка більше 5
    flagIsTradingPossible_selectedTime    = false, // вибрано час ставки
    timerForListBuilding,                          // інтервал для оновлення списків ставок
    timeForListBuildingTimer = 30000,              // період оновлення списків
    flag;                                          // визначає, чи був клік на пару

var parlayTime1;

var dictionary = {
  ActionsExchangeDontWork : [
                              'Торги невозможны, на данный момент биржа закрыта. Акционная биржа работает с 13:30 до 20:00 по UTC с понедельника по пятницу с учетом государственных праздников США.',
                              'Trades are not possible because the exchange is closed. Stock exchange is open from 13:30 to 20:00 UTC from Monday to Friday, considering US public holidays.'
                            ],
  noAccessibleParlay      : [
                              'Нет доступных ставок',
                              'No parlays available'
                            ],
  exchangeDontWork        : [
                              'На данный момент биржа закрыта',
                              'The exchange is closed.'
                            ],
  moneyExchangeDontWork   : [
                              'Торги невозможны, на данный момент биржа закрыта. Биржа должна возобновить роботу в воскресенье, в 21:00 по UTC.',
                              'Trades are not possible because the exchange is closed. The exchange must resume work on Sunday, at 21:00 UTC.'
                            ],
  createParlayError       : [ 'При попытке связаться с сервером возникла ошибка. Попробуйте позже либо свяжитесь с брокером.',
                              'An error occurred while trying to contact the server. Try again later or contact your broker.'
                            ]
};

var min6Symb = [
        'минимум 6 символов',
        'minimum 6 characters'
    ],
    notSamePass = [
        'пароли не совпадают',
        'passwords do not match'
    ];
/* ↑↑↑ /GLOBAL VARIABLES ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ ЗАГАЛЬНИЙ БЛОК ↓↓↓ */
/* ↓↓↓ активація слайдерів ↓↓↓ */
$('.wares-slider').slick({
  draggable: false
});
$('.parlay-slider').slick({});
$('#active-slider, #history-slider, #deposit-slider, #withdrawal-slider').slick({
  centerMode    : false,
  variableWidth : true,
  infinite      : false
});
/* ↑↑↑ /активація слайдерів ↑↑↑ */

/* ↓↓↓ field switch (активні ставки + історії) ↓↓↓ */
$('.slider-change-btn').click(function () {
  var tempArrBtn = $('.slider-change-btn');
  var tempArrItem = $('.slider-area__slider');
  for (var i = 0; i < tempArrBtn.length; i++) {
    if (tempArrBtn[i] == this) {
      var thisElNumber = i;
    }
  }
  // buttons
  $('.slider-change-btn').removeClass('slider-change-btn_active');
  $(this).addClass('slider-change-btn_active');
  // sliders
  $('.slider-area__slider').css({ 'display': 'none' });
  $(tempArrItem[thisElNumber]).css({ 'display': 'block' });
});
/* ↑↑↑ /field switch (активні ставки + історії) ↑↑↑ */
/* ↑↑↑ /ЗАГАЛЬНИЙ БЛОК ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ БЛОК ІНВЕСТИЦІЙ ↓↓↓ */
/* ↓↓↓ investment calculator + activation/deactivation btns ↓↓↓ */
// обрахунок прибутку при завантаженні сторінки
var inputValue   = +$('#investment-input').val(),
    percentValue = +$('#investment-percent').text();
$('#investment-result').text( inputValue * percentValue/100 + inputValue );
flagIsTradingPossible_investmentInput = true;

// обрахунок прибутку при клацанні по полю + активація/деактивація кнопок ставок
$('#investment-input').bind('keypress keyup blur', function (e) {
  // в поле можна вводити тільки цілі додатні числа
  if (e.type == 'keypress') {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);

    if (chr == null) false;
    if (chr < '0' || chr > '9') {
      return false;
    }
  }
  // перша цифра не може бути нулем
  if (e.type == 'keyup') {
    if ( $('#investment-input').val() == '0' ) {
      $('#investment-input').val('');
    };
  }
  inputValue = +$('#investment-input').val();
  $('#investment-result').text( inputValue * percentValue/100 + inputValue );

  // мінімальна ставка - 5
  if (inputValue < 5) {
    flagIsTradingPossible_investmentInput = false;
    deActivationParlayBtns();
  } else {
    flagIsTradingPossible_investmentInput = true;
    deActivationParlayBtns();
  }
});
/* ↑↑↑ /investment calculator + activation/deactivation btns ↑↑↑ */
/* ↑↑↑ /БЛОК ІНВЕСТИЦІЙ ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ БЛОК ЧАСУ ↓↓↓ */

// для правильного визначення часу звертаємося до сервера (у клієнта на компі може стояти неправильний час)
var newUTCTimeObj = {};
var dateString;
(function() {
  // запускається один раз при старті, ajax'ом робить запит на сервер, забирає час і далі самостійно через setInterval робить відлік часу і записує в об'єкт
  // ajax-запит "2019-03-22T10:16:31Z"
  $.ajax({
    url     : 'http://localhost/api/UtcTime',
    success : function (data) {
                newUTCTimeObj.yyyySTR    = data.slice(0,4);
                newUTCTimeObj.yyyyNUM    = +data.slice(0,4);
                newUTCTimeObj.yySTR      = data.slice(2,4);
                newUTCTimeObj.yyNUM      = +data.slice(2,4);
                newUTCTimeObj.mmSTR      = data.slice(5,7);
                newUTCTimeObj.mmNUM      = +data.slice(5,7);
                newUTCTimeObj.ddSTR      = data.slice(8,10);
                newUTCTimeObj.ddNUM      = +data.slice(8,10);
                newUTCTimeObj.hhSTR      = data.slice(11,13);
                newUTCTimeObj.hhNUM      = +data.slice(11,13);
                newUTCTimeObj.minSTR     = data.slice(14,16);
                newUTCTimeObj.minNUM     = +data.slice(14,16);
                newUTCTimeObj.ssSTR      = data.slice(17,19);
                newUTCTimeObj.ssNUM      = +data.slice(17,19);
                newUTCTimeObj.timeInMS   = Date.parse(data);
                newUTCTimeObj.date       = new Date(newUTCTimeObj.timeInMS);
                newUTCTimeObj.weekday    = newUTCTimeObj.date.getDay();                    // день тижня 0 - неділя, 6 - субота
                newUTCTimeObj.hh_mm      = newUTCTimeObj.hhSTR + ':' + newUTCTimeObj.minSTR;
                newUTCTimeObj.yyyy_mm_dd = newUTCTimeObj.yyyySTR + '-' + newUTCTimeObj.mmSTR + '-' + newUTCTimeObj.ddSTR;

                dateString = data;
// dateString = '2019-05-13T16:32:00Z';
                timer ()
              },
    error   : function() {
                var date = new Date();
                newUTCTimeObj.yyyySTR   = '' +date.getUTCFullYear();
                newUTCTimeObj.yyyyNUM   = date.getUTCFullYear();
                newUTCTimeObj.yySTR     = newUTCTimeObj.yyyySTR.slice(2,4);
                newUTCTimeObj.yyNUM     = +newUTCTimeObj.yyyySTR.slice(2,4);
                newUTCTimeObj.mmNUM     = date.getUTCMonth() + 1;
                if (newUTCTimeObj.mmNUM < 10) {newUTCTimeObj.mmSTR = '0' + newUTCTimeObj.mmNUM } else {newUTCTimeObj.mmSTR = '' + newUTCTimeObj.mmNUM};
                newUTCTimeObj.ddNUM     = date.getUTCDate();
                if (newUTCTimeObj.ddNUM < 10) {newUTCTimeObj.ddSTR = '0' + newUTCTimeObj.ddNUM } else {newUTCTimeObj.ddSTR = '' + newUTCTimeObj.ddNUM};
                newUTCTimeObj.hhNUM     = date.getUTCHours();
                if (newUTCTimeObj.hhNUM < 10) {newUTCTimeObj.hhSTR = '0' + newUTCTimeObj.hhNUM } else {newUTCTimeObj.hhSTR = '' + newUTCTimeObj.hhNUM};
                newUTCTimeObj.minNUM    = date.getUTCMinutes();
                if (newUTCTimeObj.minNUM < 10) {newUTCTimeObj.minSTR = '0' + newUTCTimeObj.minNUM } else {newUTCTimeObj.minSTR = '' + newUTCTimeObj.minNUM};
                newUTCTimeObj.ssNUM     = date.getUTCSeconds();
                if (newUTCTimeObj.ssNUM < 10) {newUTCTimeObj.ssSTR = '0' + newUTCTimeObj.ssNUM } else {newUTCTimeObj.ssSTR = '' + newUTCTimeObj.ssNUM};

                newUTCTimeObj.timeInMS   = +date;
                newUTCTimeObj.date       = date;
                newUTCTimeObj.weekday    = date.getDay(); // день тижня 0 - неділя, 6 - субота
                newUTCTimeObj.hh_mm      = newUTCTimeObj.hhSTR + ':' + newUTCTimeObj.minSTR;
                newUTCTimeObj.yyyy_mm_dd = newUTCTimeObj.yyyySTR + '-' + newUTCTimeObj.mmSTR + '-' + newUTCTimeObj.ddSTR;

                dateString = newUTCTimeObj.yyyySTR + '-' + newUTCTimeObj.mmSTR + '-' + newUTCTimeObj.ddSTR +'T' + newUTCTimeObj.hhSTR + ':' + newUTCTimeObj.minSTR + ':' + newUTCTimeObj.ssSTR + 'Z';
// dateString = '2019-05-13T16:32:00Z';
                timer ()
              }
  });
})();

function timer () {
  var currentDate = Date.parse(dateString);
  currentDate     = new Date(currentDate);

  setInterval(function() {
    currentDate.setSeconds(currentDate.getSeconds() +1);

    newUTCTimeObj.yyyySTR    = '' +currentDate.getUTCFullYear();
    newUTCTimeObj.yyyyNUM    = currentDate.getUTCFullYear();
    newUTCTimeObj.yySTR      = newUTCTimeObj.yyyySTR.slice(2,4);
    newUTCTimeObj.yyNUM      = +newUTCTimeObj.yyyySTR.slice(2,4);
    newUTCTimeObj.mmNUM      = currentDate.getUTCMonth() + 1;
    if (newUTCTimeObj.mmNUM < 10) {newUTCTimeObj.mmSTR = '0' + newUTCTimeObj.mmNUM } else {newUTCTimeObj.mmSTR = '' + newUTCTimeObj.mmNUM};
    newUTCTimeObj.ddNUM      = currentDate.getUTCDate();
    if (newUTCTimeObj.ddNUM < 10) {newUTCTimeObj.ddSTR = '0' + newUTCTimeObj.ddNUM } else {newUTCTimeObj.ddSTR = '' + newUTCTimeObj.ddNUM};
    newUTCTimeObj.hhNUM      = currentDate.getUTCHours();
    // console.log("newUTCTimeObj.hhNUM", newUTCTimeObj.hhNUM);
    if (newUTCTimeObj.hhNUM < 10) {newUTCTimeObj.hhSTR = '0' + newUTCTimeObj.hhNUM } else {newUTCTimeObj.hhSTR = '' + newUTCTimeObj.hhNUM};
    newUTCTimeObj.minNUM     = currentDate.getUTCMinutes();
    // console.log("newUTCTimeObj.minNUM", newUTCTimeObj.minNUM);
    if (newUTCTimeObj.minNUM < 10) {newUTCTimeObj.minSTR = '0' + newUTCTimeObj.minNUM } else {newUTCTimeObj.minSTR = '' + newUTCTimeObj.minNUM};
    newUTCTimeObj.ssNUM      = currentDate.getUTCSeconds();
    if (newUTCTimeObj.ssNUM < 10) {newUTCTimeObj.ssSTR = '0' + newUTCTimeObj.ssNUM } else {newUTCTimeObj.ssSTR = '' + newUTCTimeObj.ssNUM};

    newUTCTimeObj.timeInMS   = +currentDate;
    newUTCTimeObj.date       = currentDate;
    newUTCTimeObj.weekday    = currentDate.getDay(); // день тижня 0 - неділя, 6 - субота
    newUTCTimeObj.hh_mm      = newUTCTimeObj.hhSTR + ':' + newUTCTimeObj.minSTR;
    newUTCTimeObj.yyyy_mm_dd = newUTCTimeObj.yyyySTR + '-' + newUTCTimeObj.mmSTR + '-' + newUTCTimeObj.ddSTR;
  },1000);
}

/* ↓↓↓ datetimer ↓↓↓ */
var datetimer = document.getElementById('UTC-datetimer');
setInterval(function () {
  datetimer.innerHTML = newUTCTimeObj.yyyySTR + "-" + newUTCTimeObj.mmSTR + "-" + newUTCTimeObj.ddSTR + "   " + newUTCTimeObj.hhSTR + ":" + newUTCTimeObj.minSTR + ":" + newUTCTimeObj.ssSTR;
}, 1000);
/* ↑↑↑ /datetimer ↑↑↑ */
/* ↑↑↑ /БЛОК ЧАСУ ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ БЛОК ВИБОРУ СТАВОК ↓↓↓ */
// перший запуск оновлення списку ставок
rewriteParlayLists();

// періодичне оновлення списку ставок
// setInterval(function(){ rewriteParlayLists() }, 310000) перенесено в rewriteParlayLists() та інші функції;

// оновлення списку ставок при кліку на стрілки слайдера ставок
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){
  rewriteParlayLists();
});

// оновлення списку ставок при свайпі
$('.parlay-slider').on('swipe', function(event, slick, direction){
  rewriteParlayLists();
});

// вибір часу ставки
// клік на .parlay-slider__parlay-choise-btn викликає ф-ю clickOnParlayTimeButtons(this) - прописано в html

/* ↓↓↓ клік на кнопки ВГОРУ/ВНИЗ ↓↓↓ */
$('.parlay-btns__btn').click(function () {

  // підготовка даних для попапу-підтвердження ставки та створення ставки
  var parlayAnticipation   = $(this).attr('data-parlayAnticipation');                                            // очікування     : up/down
  var parlayInvestment     = +$('#investment-input').val();                                                      // розмір ставки  : 25
      parlayType           = $($('.parlay-slider').find('.slick-current')[0]).attr('data-parlayType');           // тип ставки     : short/normal/long
  var parlayTypeForBackEnd = $($('.parlay-slider').find('.slick-current')[0]).attr('data-parlayTypeForBackEnd'); // тип ставки     : 0/1/2
  var parlayPairName       = $('.trade-pair__name').text();                                                      // назва пари     : BTC/ETH
  var parlayPairId         = $('#currentStockPairId').val();                                                     // ід. номер пари : 1

  var parlayAnticipationForPopup,                                                                                // очікування     : up/down/вверх/вниз
      parlayAnticipationForBackEnd,                                                                              // очікування     : true/false
      parlayAnticipationForFontAwesome;                                                                          // очікування     : html
  if (parlayAnticipation == 'up') {
    parlayAnticipationForBackEnd = true;
    parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
    if ($('#language-span').text().toLowerCase() == 'язык:') {
      parlayAnticipationForPopup = 'вверх'
    } else {
      parlayAnticipationForPopup = 'up'
    }
  } else {
    parlayAnticipationForBackEnd = false;
    parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-down" style="color:red"';
    if ($('#language-span').text().toLowerCase() == 'язык:') {
      parlayAnticipationForPopup = 'вниз'
    } else {
      parlayAnticipationForPopup = 'down'
    }
  }

  var highlightingEl;
  var tempArr = $('.parlay-slider__parlay-choise-btn');
  for (var i = 0; i < tempArr.length; i++) {
    if ($(tempArr[i]).css('background-color') == 'rgba(0, 0, 0, 0.3)') {
      highlightingEl = tempArr[i];
      var parlayTimeAsString = $(highlightingEl).text();                                                         // час закриття у формі рядка
      // short/long
      if ( $(highlightingEl).attr('data-timeToEndInMS') ) {
        parlayTime = +$(highlightingEl).attr('data-timeToEndInMS');
        parlayTime1 = parlayTime;                                             // час до закриття ставки у мілісекундах
        // normal
      } else if ( $(highlightingEl).attr('data-timeToEnd') ) {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // parlayTime = $(highlightingEl).attr('data-timeToEnd');
        // console.log("parlayTime", parlayTime);

        // var UTCDate = new Date();
        // UTCDate = UTCDate.setHours(UTCDate.getUTCHours());

        // parlayTime = new Date(parlayTime.slice(0, 4),                                                            // час до закриття ставки у мілісекундах
        //                       parlayTime.slice(5, 7) - 1,
        //                       parlayTime.slice(8, 10),
        //                       parlayTime.slice(11, 13),
        //                       parlayTime.slice(14, 16)) - UTCDate;
        // console.log("parlayTime", parlayTime);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        parlayTime = $(highlightingEl).attr('data-timeToEnd');
        console.log("parlayTime", parlayTime);

        var tempStartTimeInMinutes  = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;
        var tempFinishTimeInMinutes = (+parlayTime.slice(11,13)) * 60 + +parlayTime.slice(14,16);
        parlayTime = (tempFinishTimeInMinutes - tempStartTimeInMinutes) * 60 * 1000;
        parlayTime1 = parlayTime; 
        console.log("parlayTime", parlayTime);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    }
  }

  // console.log("parlayInvestment                 :", parlayInvestment);
  // console.log("parlayPairName                   :", parlayPairName);
  // console.log("parlayPairId                     :", parlayPairId);
  // console.log("==================================");

  // console.log("parlayType                       :", parlayType);
  // console.log("parlayTypeForBackEnd             :", parlayTypeForBackEnd);
  // console.log("==================================");

  // console.log("parlayAnticipation               :", parlayAnticipation);
  // console.log("parlayAnticipationForPopup       :", parlayAnticipationForPopup);
  // console.log("parlayAnticipationForBackEnd     :", parlayAnticipationForBackEnd);
  // console.log("parlayAnticipationForFontAwesome :", parlayAnticipationForFontAwesome);
  // console.log("==================================");

  // console.log("parlayTime                       :", parlayTime);
  // console.log("parlayTimeAsString               :", parlayTimeAsString);

  // заповнення полів попапа-підтвердження
  $('#tradePair').text(parlayPairName);
  $('#tradeSumm').text(parlayInvestment);
  $('#tradeTime').text(parlayTimeAsString);
  $('#tradeParlay').text(parlayAnticipationForPopup);

  // відкриття попапа
  $('.parlay-confirmation__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
  $('.parlay-confirmation').css({ 'left': '0%' });

  // закриття попапа
  $('.parlay-confirmation__btn-no, .parlay-confirmation__close-btn').click(function () {
    closeParlayConfirmationPopup()
  });

  // таймер на самозакриття попапа
  var parlayConfirmationCount    = 11;
  var parlayConfirmationInterval = setInterval(function(){
    if (parlayConfirmationCount > 1) {
      parlayConfirmationCount -= 1;
      $('.parlay-confirmation__timer').text(parlayConfirmationCount);
    } else {
      closeParlayConfirmationPopup();
    }
  },1000);

  // відправка даних на сервер для формування ставки
  $('.parlay-confirmation__btn-yes').click(function () {

    var dat = {
      idStock    : parlayPairId,
      timeOrder  : parlayTime1,
      typeOrder  : parlayAnticipationForBackEnd,
      invest     : parlayInvestment,
      classOrder : parlayTypeForBackEnd
    }

    $.ajax({
      url: "/Order/OpenOrder",
      type: "POST",
      data: dat,
      success: function (data) {
        // тут возвращаем попап об ошибке
        console.log('createParlayError');
      }
    });

    // тут створюємо ставку - код в testJs.js

    closeParlayConfirmationPopup()
  });


  parlayTime = 0;
  $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');
  $('.parlay-btns__cover').css('display', 'flex');
  $('#investment-input').val('25');

});
/* ↑↑↑ клік на кнопки ВГОРУ/ВНИЗ ↑↑↑ */
/* ↑↑↑ /БЛОК ВИБОРУ СТАВОК ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function deActivationParlayBtns () {
// перевіряє, чи в полі інвестицій значення більше 5 та чи вибраний час ставки,
// якщо так - активує кнопки ВГОРУ/ВНИЗ, якщо ні - деактивує
  if (flagIsTradingPossible_investmentInput && flagIsTradingPossible_selectedTime) {
    $('.parlay-btns__cover').css('display', 'none');
  } else {
    $('.parlay-btns__cover').css('display', 'flex');
  }
}
async function rewriteParlayLists () {
// призупиняє setInterval, який викликає цю функцію
// визначає, чи біржа активна
// breakInTrade = $('#currentStockPairId').attr('data-break'); // 0 - біржа активна, 1 - перерва у вибраної пари
// визначає, чим є поточна торгова пара (валюта/акції/товари/криптовалюта)
// pairType = $('#currentStockPairId').attr('data-typestock'); 0 - валюта, 1 - акції, 2 - товари, 3 - криптовалюта
// визначає тип ставок ('short'/'normal'/'long')
// parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
// перевіряє на вихідні і не робочі дні та години, якщо робочі - будує список
// запускає setInterval
  var tempTimeInMinutes = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;

  if ( !tempTimeInMinutes ) {
    await sleep(2000);
    var tempTimeInMinutes = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;
  }

  // зупинка інтервалу
  clearInterval(timerForListBuilding);

  // деактивація кнопок ВГОРУ/ВНИЗ
  flagIsTradingPossible_selectedTime = false;
  deActivationParlayBtns();

  // перевірка роботи біржі по конкретній парі
  breakInTrade = $('#currentStockPairId').attr('data-break');
  if ( breakInTrade == 1 ) {
    showInfoMessage('exchangeDontWork');
  } else if ( breakInTrade == 0 ) {
    pairType   = $('#currentStockPairId').attr('data-typestock');

    parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType') || 'short';

    if ( pairType == 0 ) {
    // 0 - валюта
      // перевірка на вихідні: п'ятниця 21:30 - неділя 21:30
      // 21:30 = 21 * 60 + 30 = 1290
      var weekday           = newUTCTimeObj.weekday,
          tempTimeInMinutes = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;

      if ( weekday == 5 && tempTimeInMinutes >= 1285 || // -5хв - для запасу на короткі ставки
           weekday == 6 ||
           weekday == 0 && tempTimeInMinutes <= 1290 ) {
        showInfoMessage('moneyExchangeDontWork');
      } else {
        // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок
        if ( parlayType  == 'short' ) {
          rewriteShortParlayList ()
        } else if ( parlayType  == 'normal' ) {
          var startTime  = newUTCTimeObj.hh_mm;
          if ( weekday <= 0 && weekday >= 4 ) {
            var finishTime = '24:00';
          } else {
            var finishTime = '21:30';
          }
          rewriteNormalParlayList (startTime, finishTime)
        } else if ( parlayType  == 'long' ) {
          rewriteLongParlayList ()
        }
      }
    } else if ( pairType == 1 ) {
    // 1 - акції

      // перевірка на вихідні (субота та неділя)
      var weekday = newUTCTimeObj.weekday;
      if ( weekday == 6 || weekday == 0 ) {
        showInfoMessage('ActionsExchangeDontWork');
        // відновлення інтервалу
        timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, timeForListBuildingTimer);
        return
      }

      // перевірка на робочий час (13:30 - 20:00 по UTC)
      // 13:30 = 13 * 60 + 30 = 810;
      // 20:00 = 20 * 60 = 1200;
      var tempTimeInMinutes = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;

      if ( tempTimeInMinutes < 810 || tempTimeInMinutes > 1195 || !tempTimeInMinutes ) { // -5хв - для запасу на короткі ставки
        showInfoMessage('ActionsExchangeDontWork');
        // відновлення інтервалу
        timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, timeForListBuildingTimer);
        return
      }

      // перевірка на державні святкові дні в США
      var tempDate = newUTCTimeObj.yyyy_mm_dd;
      if ( isFeastDayInUSA('tempDate') ) {
        showInfoMessage('ActionsExchangeDontWork');
        // відновлення інтервалу
        timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, timeForListBuildingTimer);
        return
      }

      // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок
      if ( parlayType  == 'short' ) {
        rewriteShortParlayList ()
      } else if ( parlayType  == 'normal' ) {
        var startTime  = newUTCTimeObj.hh_mm;
        var finishTime = '20:00';
        rewriteNormalParlayList (startTime, finishTime)
      } else if ( parlayType  == 'long' ) {
        rewriteLongParlayList ()
      }
    } else if ( pairType == 2 ) {
    // 2 - товари
      // перевірка на вихідні: п'ятниця 21:30 - неділя 21:30
      // 21:30 = 21 * 60 + 30 = 1290
      var weekday           = newUTCTimeObj.weekday,
          tempTimeInMinutes = newUTCTimeObj.hhNUM * 60 + newUTCTimeObj.minNUM;

      if ( weekday == 5 && tempTimeInMinutes >= 1285 || // -5хв - для запасу на короткі ставки
           weekday == 6 ||
           weekday == 0 && tempTimeInMinutes <= 1290 ) {
        showInfoMessage('moneyExchangeDontWork');
      } else {
        // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок
        if ( parlayType  == 'short' ) {
          rewriteShortParlayList ()
        } else if ( parlayType  == 'normal' ) {
          var startTime  = newUTCTimeObj.hh_mm;
          if ( weekday <= 0 && weekday >= 4 ) {
            var finishTime = '24:00';
          } else {
            var finishTime = '21:30';
          }
          rewriteNormalParlayList (startTime, finishTime)
        } else if ( parlayType  == 'long' ) {
          rewriteLongParlayList ()
        }
      }
    } else if ( pairType == 3 ) {
    // 3 - криптовалюта
      // перевірка на вихідні: працюють безперервно
      // у залежності від типу ставки (short/normal/long) побудувати список ставок
      if ( parlayType  == 'short' ) {
        rewriteShortParlayList ()
      } else if ( parlayType  == 'normal' ) {
        var startTime  = newUTCTimeObj.hh_mm,
            finishTime = '24:00';
        rewriteNormalParlayList (startTime, finishTime)
      } else if ( parlayType  == 'long' ) {
        rewriteLongParlayList ()
      }
    }
  }

  // відновлення інтервалу
  timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, timeForListBuildingTimer);
}

function rewriteShortParlayList () {
// створює список коротких ставок
  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // створення нового списку
  if ($('#language-span').text().toLowerCase() == 'язык:') {
    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                      .append('<div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="30000"> 30 секунд</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="60000"> 1 минута</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="120000"> 2 минуты</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="180000"> 3 минуты</div>\
                                                              ');
  } else {
    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                      .append('<div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="30000"> 30 seconds</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="60000"> 1 minute</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="120000"> 2 minutes</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="180000"> 3 minutes</div>\
                                                              ');
  }

  // навішування hover-ефекту
  $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn').hover(function(e){
    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn').css({'transition':'letter-spacing .5s','letter-spacing':'0px'});
    $(this).css('letter-spacing', '1px');
  });
}

function rewriteNormalParlayList (start, finish) {
// створює список нормальних ставок - від поточного часу до 24:00 (для акцій - до 20:00) з інтервалом 30хв
// для запасу міцності: закінчення останньої ставки - за півгодини до закриття (тобто 23:30 та 19:30 відповідно)
  var tempTimeString; // зміна у форматі yyyy-mm-dd hh:mn для створення елемену ставки

  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // розібрати рядки startTime / finishTime
  var tempStartTimeUTCHours    = +start.slice(0, 2),
      tempStartTimeUTCMinutes  = +start.slice(3),
      tempFinishTimeUTCHours   = +finish.slice(0, 2),
      tempFinishTimeUTCMinutes = +finish.slice(3);

  var tempStartTimeInMinutes  = tempStartTimeUTCHours * 60 + tempStartTimeUTCMinutes,
      tempFinishTimeInMinutes = tempFinishTimeUTCHours * 60 + tempFinishTimeUTCMinutes;

  // визначення, чи ставки можливі впринципі (мінімум 35хв до 24:00 (для акцій - до 20:00) )
  if ( tempFinishTimeInMinutes - 35 <= tempStartTimeInMinutes ) return;

  // округлення часу першої можливої ставки до 00хв або 30хв
  if (25 <= tempStartTimeUTCMinutes && tempStartTimeUTCMinutes < 55) {
    // оркуглити до 00, додати 1 годину
    tempStartTimeUTCHours   = +tempStartTimeUTCHours + 1;
    if ( tempStartTimeUTCHours < 10 ) tempStartTimeUTCHours = '0' + +tempStartTimeUTCHours;
    tempStartTimeUTCMinutes = '00';
  } else if (0 <= tempStartTimeUTCMinutes && tempStartTimeUTCMinutes < 25) {
    // оркуглити до 30
    tempStartTimeUTCMinutes = '30';
  } else if (55 <= tempStartTimeUTCMinutes && tempStartTimeUTCMinutes <= 59) {
    // округлити до 30, додати годину
    tempStartTimeUTCHours   = +tempStartTimeUTCHours + 1;
    if ( tempStartTimeUTCHours < 10 ) tempStartTimeUTCHours = '0' + +tempStartTimeUTCHours;
    tempStartTimeUTCMinutes = '30';
  }

  // створення першої ставки і далі створення в циклі нового списку
  while ( tempFinishTimeInMinutes > tempStartTimeInMinutes ) {
    if (tempStartTimeUTCHours < 10) tempStartTimeUTCHours = '0' + +tempStartTimeUTCHours;
    if ( tempStartTimeUTCMinutes == 0 ) {
      tempStartTimeUTCMinutes = '00'
    }

    tempTimeString = newUTCTimeObj.yyyy_mm_dd + ' ' + tempStartTimeUTCHours + ':' + tempStartTimeUTCMinutes;
    $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
                                                       .children('.parlay-slider__parlay-choise-btn-holder')
                                                       .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="'
                                                                + tempTimeString +
                                                                ' " onclick="clickOnParlayTimeButtons(this)">'
                                                                + tempTimeString +
                                                                '</div>');
    // збільшуємо час на 30хв
    tempStartTimeInMinutes  = tempStartTimeUTCHours * 60 + +tempStartTimeUTCMinutes + 30;
    tempStartTimeUTCHours   = Math.floor(tempStartTimeInMinutes/60);
    tempStartTimeUTCMinutes = tempStartTimeInMinutes - tempStartTimeUTCHours*60;
  }

  // навішування hover-ефекту
  $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn').hover(function(e){
    $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn').css({'transition':'letter-spacing .5s','letter-spacing':'0px'});
    $(this).css('letter-spacing', '1px');
  })
}

function rewriteLongParlayList () {
// створює список довгих ставок
  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // потрібно використати newUTCTimeObj.date, але вираз startTime = newUTCTimeObj.date посилається на об'єкт,
  // а не на примітив, відповідно його змінює і ламає код. Щоб цього не було, потрібно створити клон об'єкту. Для цього
  // використовуємо наступний канделябр: беремо час на компі клієнта, вираховуємо різницю між цим часом та UTC, отриману
  // різницю віднімаємо/додаємо від/до часу компа і отримуємо новий об'єкт-час уже в UTC

  var tempTime = Date.now();
  if ( tempTime > +newUTCTimeObj.date ) {
    var delta = tempTime - +newUTCTimeObj.date;
    var startTime = new Date( tempTime - delta );
  } else if ( tempTime < +newUTCTimeObj.date ) {
    var delta = +newUTCTimeObj.date - tempTime;
    var startTime = new Date( tempTime + delta );
  } else if ( tempTime = +newUTCTimeObj.date ) {
    var startTime = new Date( tempTime );
  }

  var timeToEndInMS = 86400000; // 24*60*60*1000

  // створення нового списку
  for (var i = 0; i < 31; i++) {
    // додаємо по одній добі
    startTime.setUTCDate(startTime.getUTCDate() + 1);

    var tempDateSTR       = {};
    tempDateSTR.yyyySTR   = '' +startTime.getUTCFullYear();
    tempDateSTR.mmNUM     = startTime.getUTCMonth() + 1;
    if (tempDateSTR.mmNUM < 10) {tempDateSTR.mmSTR = '0' + tempDateSTR.mmNUM } else {tempDateSTR.mmSTR = '' + tempDateSTR.mmNUM};
    tempDateSTR.ddNUM     = startTime.getUTCDate();
    if (tempDateSTR.ddNUM < 10) {tempDateSTR.ddSTR = '0' + tempDateSTR.ddNUM } else {tempDateSTR.ddSTR = '' + tempDateSTR.ddNUM};
    var tempDatehhNUM     = startTime.getUTCHours();
    var tempDateminNUM    = startTime.getUTCMinutes();

    var weekday           = startTime.getDay();

    tempDateSTR           = tempDateSTR.yyyySTR + '-' + tempDateSTR.mmSTR + '-' + tempDateSTR.ddSTR;

    // додаткова перевірка для акцій (по дню закінчення)
    if ( pairType == 1 ) {
      if ( weekday == 6 || weekday == 0 ) continue;
      if ( isFeastDayInUSA( tempDateSTR ) ) continue;
    }

    // додаткова перевірка для валюти та товарів (по дню закінчення)
    if ( pairType == 0 || pairType == 2 ) {

      var tempTimeInMinutes = tempDatehhNUM * 60 + tempDateminNUM;

      if ( weekday == 5 && tempTimeInMinutes >= 1285 ||
           weekday == 6 ||
           weekday == 0 && tempTimeInMinutes <= 1290 ) {
        continue
      }

    }

    $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                     .append('<div class="parlay-slider__parlay-choise-btn" onclick="clickOnParlayTimeButtons(this)" data-timeToEndInMS="'
                                                              + timeToEndInMS + '">'
                                                              + tempDateSTR + '</div>');
    timeToEndInMS += 86400000;
  }

  // навішування hover-ефекту
  $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn').hover(function(e){
    $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn').css({'transition':'letter-spacing .5s','letter-spacing':'0px'});
    $(this).css('letter-spacing', '1px');
  })
}

function clickOnParlayTimeButtons (elem) {
// підсвічує обраний час, викликає ф-ю активації кнопок ВВЕРХ/ВНИЗ
  // зупинка інтервалу
  clearInterval(timerForListBuilding);

  // підсвітка вибраного часу
  $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');
  $(elem).css('background-color', 'rgba(0, 0, 0, 0.3)');

  // позначення того, що час ставки обрано і можна активувати кнопки ВВЕРХ/ВНИЗ
  flagIsTradingPossible_selectedTime = true;
  deActivationParlayBtns();

  // відновлення інтервалу
  timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, timeForListBuildingTimer);
}

function isFeastDayInUSA (date) {
// перевіряє, чи є вказаний день святковим в США: 1 - святковий, 0 - не святковий
  var url = 'https://central.investingcase.com/api/Hol/GetDate?value=' + date;
  var ansver;
  $.ajax({
      url     : url,
      async   : false,
      success : function (data) {
                  if (data == 1) {        // святковий день
                    ansver = true;
                  } else if (data == 0) { // не святковий день
                    ansver = false;
                  }
                }
  });
  return ansver
}

function showInfoMessage (message) {
  var langIndex,
      langSpanText = $('#language-span').text().toLowerCase().slice(0,4);

  // визначити, яка мова використовується
  if ( langSpanText == 'язык' ) {
    langIndex = 0;
  } else if ( langSpanText == 'lang' ) {
    langIndex = 1;
  }

  // підготувати відповідне повідомлення
  $('p.info-message__body').text(dictionary[message][langIndex]);

  // витерти попередній таймер, якщо він був
  clearTimeout(infoMessageTimer);

  // проанімувати появу повідомлення
  $('.info-message').css({ 'right': '0px' });

  // таймер на самозакриття повідомлення
  infoMessageTimer = setTimeout(function() {
    $('.info-message').css({ 'right': '-290px' });
  }, 10000);

  // закрити повідомлення
  $('.info-message__close-btn').click(function () {
      $('.info-message').css({ 'right': '-290px' });
  });

  // зупинка теймеру закриття повідомлення при наведенні на нього мишкою
  $('.info-message').mouseover(function() {
    clearTimeout(infoMessageTimer)
  });

  // приховування повідомлення
  $('.info-message').mouseleave(function() {
    infoMessageTimer = setTimeout(function() {
      $('.info-message').css({ 'right': '-290px' });
  }, 2000);
  });
}

function closeParlayConfirmationPopup() {
// анімує закриття спливаючого вікна - підтвердження ставки
  $('.parlay-confirmation__timer').text('');
  clearInterval(parlayConfirmationInterval);

  $('.parlay-confirmation').css({ 'left': '110%' });
  var tempParlayConfirmationWidth   = $('.parlay-confirmation__holder').css('width');
  var tempParlayConfirmationPadding = $('.parlay-confirmation__holder').css('padding-left');
  setTimeout(function () {
    $('.parlay-confirmation__holder').css({ 'width': '0px', 'padding': '0px' });
    $('.parlay-confirmation__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
    $('.parlay-confirmation').css({ 'left': '-110%' });
  }, 500);
  setTimeout(function () {
    $('.parlay-confirmation__holder').css({ 'width': tempParlayConfirmationWidth, 'padding': tempParlayConfirmationPadding });
  }, 1000);
}

function getChar (event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }
  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }
  return null; // спец. символ
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */
// made by waldteufel@ukr.net