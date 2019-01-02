/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayType,                                    // short/normal/long
    parlayTime                            = 0,     // час ДО закриття ставки - в мілісекундах
    pairType,                                      // 0 - валюта, 1 - акції, 2 - товари, 3 - криптовалюта
    breakInTrade,                                  // 0 - біржа активна, 1 - перерва у вибраної пари
    deactivationTimer,                             // таймер для деактивації списків можливих ставок
    flagIsTradingPossible_investmentInput = false, // мінімальна ставка більше 5
    flagIsTradingPossible_selectedTime    = false, // вибрано час ставки
    flag;                                          // визначає, чи був клік на пару

var exchangeDontWork = [
    'Торги невозможны, на данный момент биржа закрыта. Акционная биржа работает с 13:30 до 20:00 по UTC с понедельника по пятницу с учетом государственных праздников США.',
    'Trades are not possible because the exchange is closed. Stock exchange is open from 13:30 to 20:00 UTC from Monday to Friday, considering US public holidays.'
    ],
    noAccessibleParlay = [
        'Нет доступных ставок',
        'No parlays available'
    ],
    min6Symb = [
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
/* ↓↓↓ datetimer ↓↓↓ */
var datetimer = document.getElementById('UTC-datetimer');
setInterval(function () {
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
/* ↑↑↑ /БЛОК ЧАСУ ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ БЛОК ВИБОРУ СТАВОК ↓↓↓ */
// перший запуск оновлення списку ставок
rewriteParlayLists();

// періодичне оновлення списку ставок
var timerForListBuilding = setInterval(function(){ rewriteParlayLists() }, 30000);

// оновлення списку ставок при кліку на стрілки слайдера ставок
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){
  console.log('click on parlay-slider arrows');
  rewriteParlayLists();
});

// оновлення списку ставок при свайпі
$('.parlay-slider').on('swipe', function(event, slick, direction){
  console.log('swipe parlay-slider');
  rewriteParlayLists();
});

// вибір часу ставки
$('.parlay-slider__parlay-choise-btn').click(function() {
  console.log('click on time-buttons');
});

// клік на кнопки ВГОРУ/ВНИЗ
$('.parlay-btns__btn').click(function () {
  console.log('click on up/down-btns');
});
/* ↑↑↑ /БЛОК ВИБОРУ СТАВОК ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function deActivationParlayBtns() {
// перевіряє, чи в полі інвестицій значення більше 5 та чи вибраний час ставки,
// якщо так - активує кнопки ВГОРУ/ВНИЗ, якщо ні - деактивує
  if (flagIsTradingPossible_investmentInput && flagIsTradingPossible_selectedTime) {
    $('.parlay-btns__cover').css('display', 'none');
  } else {
    $('.parlay-btns__cover').css('display', 'flex');
  }
}
function rewriteParlayLists() {
// визначає, чим є поточна торгова пара (валюта/акції/товари/криптовалюта)
// pairType = $('#currentStockPairId').attr('data-typestock'); 0 - валюта, 1 - акції, 2 - товари, 3 - криптовалюта
// визначає тип ставок ('short'/'normal'/'long')
// parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType');
// breakInTrade = $('#currentStockPairId').attr('data-break'); // 0 - біржа активна, 1 - перерва у вибраної пари
// перевіряє на вихідні і не робочі дні та години, якщо робочі - будує список

  pairType   = $('#currentStockPairId').attr('data-typestock') || 0;
  parlayType = $( $('.parlay-slider').find('.slick-current')[0] ).attr('data-parlayType') || 'short';
  var time   = new Date();

  var temp = timeHandler(time);
  console.log("temp", temp);

pairType = 3;

  console.log("pairType   :", pairType);
  console.log("parlayType :", parlayType);

  if ( pairType == 0 ) {
    // 0 - валюта
    // перевірка на вихідні: п'ятниця 21:30 - неділя 21:30
    // doSomething();

    // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок

  } else if ( pairType == 1 ) {
    // 1 - акції
    // перевірка на вихідні: святкові дні в США, субота та неділя - вихідні, робота: пн-пт, з 13:30 до 20:00 по UTC
    // doSomething();

    // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок

  } else if ( pairType == 2 ) {
    // 2 - товари
    // перевірка на вихідні: п'ятниця 21:30 - неділя 21:30
    // doSomething();

    // якщо робочий час - у залежності від типу ставки (short/normal/long) побудувати список ставок

  } else if ( pairType == 3 ) {
    // 3 - криптовалюта
    // перевірка на вихідні: працюють безперервно
    // у залежності від типу ставки (short/normal/long) побудувати список ставок
    if ( parlayType  == 'short' ) {
      rewriteShortParlayList ()
    } else if ( parlayType  == 'normal' ) {
      // від поточного часу до 24:00
      // startTime  = time.getUTCHour + ':' + tempUTCMinutes;
      // finishTime = '20:00';
      rewriteNormalParlayList (startTime, finishTime)
    } else if ( parlayType  == 'long' ) {

    }
  }
}

function rewriteShortParlayList () {
// створює список коротких ставок
  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // створення нового списку
  if ($('#language-span').text().toLowerCase() == 'язык:') {
    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                      .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 секунд</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 минута</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 минуты</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 минуты</div>\
                                                              ');
  } else {
    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                      .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 seconds</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 minute</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 minutes</div>\
                                                               <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 minutes</div>\
                                                              ');
  }
}

function rewriteNormalParlayList (start, end) {
// створює список нормальних ставок - від поточного часу до 24:00 (для акцій - до 20:00) з інтервалом 30хв
  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // створення нового списку
}

function rewriteLongParlayList () {
// створює список довгих ставок
  // видалення попередньо створеного списку
  $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // створення нового списку
}

function timeHandler(time) {
// приймає аргументом час (якщо аргумент не переданий - працює з поточним часом)
// та повертає об'єкт з різними форматами часу та його компонентами
  if (!time) {
    var time = new Date();
    console.log("time-time", time);
  } else {
    var time = time;
    console.log("time-arg", time);
  }


  var timeObj     = {};
  timeObj.yyyy    = time.getFullYear();                   // повний рік
  timeObj.yy      = +timeObj.yyyy.toString().slice(2);    // скорочений рік
  timeObj.mm      = time.getMonth() + 1;                  // місяць 1 - 12
  timeObj.dd      = time.getDate();                       // число
  timeObj.wd      = time.getDay();                        // день тижня 0 - неділя, 6 - субота
  timeObj.hh      = time.getHours();                      // години
  timeObj.mn      = time.getMinutes();                    // хвилини
  timeObj.ss      = time.getSeconds();                    // секунди
  timeObj.ms      = time.getMilliseconds();               // мілісекунди
  timeObj.yyyyUTC = time.getUTCFullYear();                // повний рік (UTC)
  timeObj.yyUTC   = +timeObj.yyyyUTC.toString().slice(2); // скорочений рік (UTC)
  timeObj.mmUTC   = time.getUTCMonth(); + 1;              // місяць 1 - 12 (UTC)
  timeObj.ddUTC   = time.getUTCDate();                    // число (UTC)
  timeObj.wdUTC   = time.getUTCDay();                     // день тижня 0 - неділя, 6 - субота (UTC)
  timeObj.hhUTC   = time.getUTCHours();                   // години (UTC)

  if (timeObj.yy < 10) { timeObj.yyStr = '0' + timeObj.yy} else { timeObj.yyStr = '' + timeObj.yy }
  if (timeObj.mm < 10) { timeObj.mmStr = '0' + timeObj.mm} else { timeObj.mmStr = '' + timeObj.mm }
  if (timeObj.dd < 10) { timeObj.ddStr = '0' + timeObj.dd} else { timeObj.ddStr = '' + timeObj.dd }
  if (timeObj.hh < 10) { timeObj.hhStr = '0' + timeObj.hh} else { timeObj.hhStr = '' + timeObj.hh }
  if (timeObj.mn < 10) { timeObj.mnStr = '0' + timeObj.mn} else { timeObj.mnStr = '' + timeObj.mn }
  if (timeObj.ss < 10) { timeObj.ssStr = '0' + timeObj.ss} else { timeObj.ssStr = '' + timeObj.ss }

  if (timeObj.yyUTC < 10) { timeObj.yyUTCStr = '0' + timeObj.yyUTC} else { timeObj.yyUTCStr = '' + timeObj.yyUTC }
  if (timeObj.mmUTC < 10) { timeObj.mmUTCStr = '0' + timeObj.mmUTC} else { timeObj.mmUTCStr = '' + timeObj.mmUTC }
  if (timeObj.ddUTC < 10) { timeObj.ddUTCStr = '0' + timeObj.ddUTC} else { timeObj.ddUTCStr = '' + timeObj.ddUTC }
  if (timeObj.hhUTC < 10) { timeObj.hhUTCStr = '0' + timeObj.hhUTC} else { timeObj.hhUTCStr = '' + timeObj.hhUTC }

  return(timeObj);
}

function getChar(event) {
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
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */


// function createListOfNormalParlay(startTime, finishTime, currentDateTime) {
//     // видаляє старий список нормальних ставок (якщо він є)
//     // якщо біржа закрита - виводить повідомлення
//     // циклом формує список можливих нормальних ставок з інтервалом у півгодини

//     // спочатку потрібно видалити старий список, якщо він є
//     $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

//     // якщо startTime = finishTime = false - торги не можливі
//     if (startTime == false) {
//         //біржа не працює
//         if ($('#language-span').text().toLowerCase() == 'язык:') {
//             showInfoMessage(exchangeDontWork[0]);
//         } else {
//             showInfoMessage(exchangeDontWork[1]);
//         }
//         return
//     }

//     // визначення першого можливого часу ставки: ставки робляться або в 00хв, або в 30хв,
//     // але так, щоб до кінця ставки було щонайменше 5 хв

//     // розібрати рядки startTime / finishTime
//     var tempUTCTimeHours = +startTime.slice(0, 2),
//         tempUTCTimeMinutes = +startTime.slice(3),
//         tempUTCTimeFinishHours = +finishTime.slice(0, 2),
//         tempUTCTimeFinishMinutes = +finishTime.slice(3);

//     var tempUTCTimeInMinutes = tempUTCTimeHours * 60 + tempUTCTimeMinutes,
//         tempUTCTimeFinishInMinutes = tempUTCTimeFinishHours * 60 + tempUTCTimeFinishMinutes;

//     // округлення часу першої можливої ставки до 00хв або 30хв
//     if (25 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 55) {
//         // оркуглити до 00, додати 1 годину
//         currentDateTime.setUTCMinutes(60);
//     } else if (0 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 25) {
//         // оркуглити до 30
//         currentDateTime.setUTCMinutes(30);
//     } else if (55 <= tempUTCTimeMinutes && tempUTCTimeMinutes <= 59) {
//         // округлити до 30, додати годину
//         currentDateTime.setUTCMinutes(90);
//     }

//     // сформувати рядок дати ( у список для вибору клієнту )
//     tempUTCFullYear = currentDateTime.getUTCFullYear();
//     if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
//     tempUTCMonth = currentDateTime.getUTCMonth() + 1;
//     if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
//     tempUTCDate = currentDateTime.getUTCDate();
//     if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
//     tempUTCHours = currentDateTime.getUTCHours();
//     if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
//     tempUTCMinutes = currentDateTime.getUTCMinutes();
//     if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

//     var tempDateTimeString = tempUTCFullYear + '-' +
//         tempUTCMonth + '-' +
//         tempUTCDate + ' ' +
//         tempUTCHours + ':' +
//         tempUTCMinutes;

//     // це щоб перша ставка формувалася лише тоді, коли час робочий
//     if (tempUTCTimeHours * 60 + tempUTCTimeMinutes < (tempUTCTimeFinishHours * 60 + tempUTCTimeFinishMinutes - 5)) {
//         $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
//             .children('.parlay-slider__parlay-choise-btn-holder')
//             .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString+' " onclick="deActivationParlayBtns(this)">' + tempDateTimeString +'</div>');
//     }

//     while (tempUTCTimeInMinutes < tempUTCTimeFinishInMinutes - 60) {
//         currentDateTime.setMinutes(currentDateTime.getMinutes() + 30)
//         // сформувати рядок дати ( у список для вибору клієнту )
//         tempUTCFullYear = currentDateTime.getUTCFullYear();
//         if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
//         tempUTCMonth = currentDateTime.getUTCMonth() + 1;
//         if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
//         tempUTCDate = currentDateTime.getUTCDate();
//         if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
//         tempUTCHours = currentDateTime.getUTCHours();
//         if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
//         tempUTCMinutes = currentDateTime.getUTCMinutes();
//         if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

//         var tempDateTimeString = tempUTCFullYear + '-' +
//             tempUTCMonth + '-' +
//             tempUTCDate + ' ' +
//             tempUTCHours + ':' +
//             tempUTCMinutes;
//         $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
//             .children('.parlay-slider__parlay-choise-btn-holder')
//             .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString + '"\
//                                                                      onclick="deActivationParlayBtns(this)">'
//             + tempDateTimeString +
//             '</div>');
//         tempUTCTimeInMinutes += 30;
//     }
// }













// var parlayBtnInnerHTML;
// $('.parlay-slider__parlay-choise-btn').click(function() {
//     parlayBtnInnerHTML = $(this).text();
//     console.log("parlayBtnInnerHTML", parlayBtnInnerHTML);
// });




























// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////



// /* ↓↓↓ create active-slider-item ↓↓↓ */
// $('.parlay-btns__btn').click(function () {
//   console.log('click on up/down-btns');

//   // підготовка даних для попапу-підтвердження ставки та створення ставки
//   var parlayAnticipation   = $(this).attr('data-parlayAnticipation');                                            // очікування     : up/down
//   var parlayInvestment     = +$('#investment-input').val();                                                      // розмір ставки  : 25
//       parlayType           = $($('.parlay-slider').find('.slick-current')[0]).attr('data-parlayType');           // тип ставки     : short/normal/long
//   var parlayTypeForBackEnd = $($('.parlay-slider').find('.slick-current')[0]).attr('data-parlayTypeForBackEnd'); // тип ставки     : 0/1/2
//   var parlayPairName       = $('.trade-pair__name').text();                                                      // назва пари     : BTC/ETH
//   var parlayPairId         = $('#currentStockPairId').val();                                                     // ід. номер пари : 1

//   var parlayAnticipationForPopup,                                                                                // очікування     : up/down/вверх/вниз
//       parlayAnticipationForBackEnd,                                                                              // очікування     : true/false
//       parlayAnticipationForFontAwesome;                                                                          // очікування     : html
//   if (parlayAnticipation == 'up') {
//     parlayAnticipationForBackEnd = true;
//     parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
//     if ($('#language-span').text().toLowerCase() == 'язык:') {
//       parlayAnticipationForPopup = 'вверх'
//     } else {
//       parlayAnticipationForPopup = 'up'
//     }
//   } else {
//     parlayAnticipationForBackEnd = false;
//     parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-down" style="color:red"';
//     if ($('#language-span').text().toLowerCase() == 'язык:') {
//       parlayAnticipationForPopup = 'вниз'
//     } else {
//       parlayAnticipationForPopup = 'down'
//     }
//   }

//   var highlightingEl;
//   var tempArr = $('.parlay-slider__parlay-choise-btn');
//   for (var i = 0; i < tempArr.length; i++) {
//     if ($(tempArr[i]).css('background-color') == 'rgba(0, 0, 0, 0.3)') {
//       highlightingEl = tempArr[i];
//       var parlayTimeAsString = $(highlightingEl).text();                                                         // час закриття у формі рядка
//       if ($(highlightingEl).attr('data-timeToEndInMS')) {
//         parlayTime = +$(highlightingEl).attr('data-timeToEndInMS');                                              // час до закриття ставки у мілісекундах
//       } else if ($(highlightingEl).attr('data-timeToEnd')) {
//         parlayTime = $(highlightingEl).attr('data-timeToEnd');

//         var UTCDate = new Date();
//         UTCDate = UTCDate.setHours(UTCDate.getUTCHours());

//         parlayTime = new Date(parlayTime.slice(0, 4),                                                            // час до закриття ставки у мілісекундах
//                               parlayTime.slice(5, 7) - 1,
//                               parlayTime.slice(8, 10),
//                               parlayTime.slice(11, 13),
//                               parlayTime.slice(14, 16)) - UTCDate;
//       }
//     }
//   }

//   console.log("parlayInvestment                 :", parlayInvestment);
//   console.log("parlayPairName                   :", parlayPairName);
//   console.log("parlayPairId                     :", parlayPairId);
//   console.log("==================================");

//   console.log("parlayType                       :", parlayType);
//   console.log("parlayTypeForBackEnd             :", parlayTypeForBackEnd);
//   console.log("==================================");

//   console.log("parlayAnticipation               :", parlayAnticipation);
//   console.log("parlayAnticipationForPopup       :", parlayAnticipationForPopup);
//   console.log("parlayAnticipationForBackEnd     :", parlayAnticipationForBackEnd);
//   console.log("parlayAnticipationForFontAwesome :", parlayAnticipationForFontAwesome);
//   console.log("==================================");

//   console.log("parlayTime                       :", parlayTime);
//   console.log("parlayTimeAsString               :", parlayTimeAsString);

//   // заповнення полів попапа-підтвердження
//   $('#tradePair').text(parlayPairName);
//   $('#tradeSumm').text(parlayInvestment);
//   $('#tradeTime').text(parlayTimeAsString);
//   $('#tradeParlay').text(parlayAnticipationForPopup);

//   // відкриття попапа
//   $('.parlay-confirmation__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
//   $('.parlay-confirmation').css({ 'left': '0%' });

//   // закриття попапа
//   $('.parlay-confirmation__btn-no, .parlay-confirmation__close-btn').click(function () {
//     closeParlayConfirmationPopup()
//   });
//   // таймер на самозакриття попапа

//   var parlayConfirmationCount = 11;
//   var parlayConfirmationInterval = setInterval(function(){
//     if (parlayConfirmationCount > 1) {
//       parlayConfirmationCount -= 1;
//       $('.parlay-confirmation__timer').text(parlayConfirmationCount);
//     } else {
//       closeParlayConfirmationPopup();
//     }
//   },1000);

//   // відправка даних на сервер для формування ставки
//   $('.parlay-confirmation__btn-yes').click(function () {

//     var dat = {
//       idStock    : parlayPairId,
//       timeOrder  : parlayTime,
//       typeOrder  : parlayAnticipationForBackEnd,
//       invest     : parlayInvestment,
//       classOrder : parlayTypeForBackEnd
//     }

//     $.ajax({
//       url: "/Order/OpenOrder",
//       type: "POST",
//       data: dat,
//       success: function (data) {
//         // тут возвращаем попап об ошибке
//         console.log(data);
//       }
//     });

//     // тут створюємо ставку - код в testJs.js

//     closeParlayConfirmationPopup()
//   });

//   function closeParlayConfirmationPopup() {
//     $('.parlay-confirmation__timer').text('');
//     clearInterval(parlayConfirmationInterval);

//     $('.parlay-confirmation').css({ 'left': '110%' });
//     var tempParlayConfirmationWidth   = $('.parlay-confirmation__holder').css('width');
//     var tempParlayConfirmationPadding = $('.parlay-confirmation__holder').css('padding-left');
//     setTimeout(function () {
//       $('.parlay-confirmation__holder').css({ 'width': '0px', 'padding': '0px' });
//       $('.parlay-confirmation__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
//       $('.parlay-confirmation').css({ 'left': '-110%' });
//     }, 500);
//     setTimeout(function () {
//       $('.parlay-confirmation__holder').css({ 'width': tempParlayConfirmationWidth, 'padding': tempParlayConfirmationPadding });
//     }, 1000);
//   }


//   parlayTime = 0;
//   $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');
//   $('.parlay-btns__cover').css('display', 'flex');
//   $('#investment-input').val('25');
// });
// /* ↑↑↑ /create active-slider-item ↑↑↑ */



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////




























// /* ↓↓↓ динамічне формування списків можливих ставок ↓↓↓ */
// var startTime, finishTime, currentDateTime;
// $($('.parlay-slider').children('.slick-arrow')).click(function () {

//     clearTimeout(deactivationTimer);
//     $('.parlay-slider__reactivation-field').css({ 'display': 'none' });

//     $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');

//     rewriteParlayLists();

//     deactivationTimer = setTimeout(function () {
//         deactivationParlays()
//     }, 30000);
// });
// /* ↑↑↑ /динамічне формування списків можливих ставок ↑↑↑ */

// /* ↓↓↓ після завантаження сторінки, якщо активна вкладка акцій - розраховувати можливість торгівлі акціями ↓↓↓ */
// $(document).ready(function () {
//     rewriteParlayLists();

//     deactivationTimer = setTimeout(function () {
//         deactivationParlays()
//     }, 30000);

//     $('.parlay-slider__reactivation-field-btn').click(function () {
//         $('.parlay-slider__reactivation-field, .parlay-btns__cover').css({ 'display': 'none' });

//         rewriteParlayLists();
//         // зробити перший елемент активним та правильно його відпозиціонувати
//         $('.parlay-slider').slick('unslick').slick({ 'draggable': 'false' });
//         // після unslick на кнопки нового слайдера потрібно навішувати обробники
//         $($('.parlay-slider').children('.slick-arrow')).click(function () {
//             clearTimeout(deactivationTimer);

//             $('.parlay-slider__reactivation-field, .parlay-btns__cover').css({ 'display': 'none' });

//             rewriteParlayLists();

//             deactivationTimer = setTimeout(function () {
//                 deactivationParlays()
//             }, 30000);
//         });
//         deactivationTimer = setTimeout(function () {
//             deactivationParlays()
//         }, 30000);
//     });
// });
// /* ↑↑↑ /після завантаження сторінки, якщо активна вкладка акцій - розраховувати можливість торгівлі акціями ↑↑↑ */



// /* ↓↓↓ showParlayInfoMessage ↓↓↓ */
// $('.tempBTN5').click(function () {
//     $('.info-parlay-result').css('right', '0px');
// });
// // close
// $('.info-parlay-result__close-btn').click(function () {
//     $('.info-parlay-result').css('right', '-290px');
// });
// /* ↑↑↑ /showParlayInfoMessage ↑↑↑ */

// /* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
// function rewriteParlayLists() {
//     //

//     // прибирати повідомлення, якщо воно є
//     $('.info-message').css({ 'right': '-290px' });

//     if (!flag) {
//         parlayType = $($('.parlay-slider').find('.slick-current')[0]).attr('data-parlayType');
//     } else {
//         flag = false;
//         parlayType = 'short';
//     }

//     currentDateTime = new Date();

//     var tempUTCYear = currentDateTime.getUTCFullYear();
//     if (tempUTCYear < 10) tempUTCYear = '0' + tempUTCYear;
//     var tempUTCDate = currentDateTime.getUTCDate();
//     if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
//     var tempUTCMonth = currentDateTime.getUTCMonth() + 1;
//     if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
//     var tempUTCHour = currentDateTime.getUTCHours();
//     if (tempUTCHour < 10) tempUTCHour = '0' + tempUTCHour;
//     var tempUTCMinutes = currentDateTime.getUTCMinutes();
//     if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;
//     var tempUTCSeconds = currentDateTime.getUTCSeconds();
//     if (tempUTCSeconds < 10) tempUTCSeconds = '0' + tempUTCSeconds;

//     var currentUTCDateString = tempUTCYear + '-' +
//         tempUTCMonth + '-' +
//         tempUTCDate;
//     var breakInTrade = $('#currentStockPairId').attr('data-break'); // тут мы получаем 0 - биржа активна, 1 - перерыв у выбранной активной пары.
//     if (parlayType == 'short') {
//         // контроль для акцій: контроль, чи працює поставник котирувань - ajax, якщо так - максимально можлива ставка - за 5 хв до закриття біржі, робочий день - 13:30-20:00 по UTC
//         // data-typeStock: Тип символа: 0 - ВАЛЮТЫ, 1 - АКЦИИ, 2 - ТОВАРЫ, 3 - крипта
//         //if ($($('.slick-current').children('.wares-slider__item-header')[0]).text().toLowerCase() == 'акции' ||
//         //    $($('.slick-current').children('.wares-slider__item-header')[0]).text().toLowerCase() == 'actions') {
//         if ($('#currentStockPairId').attr('data-typestock') == 1 ) {
//             // очистити старий список ставок
//             $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

//             if (breakInTrade == 0) {
//                 if ((13 * 60 + 30) <= (+tempUTCHour * 60 + +tempUTCMinutes) && (+tempUTCHour * 60 + +tempUTCMinutes) < (19 * 60 + 50)) {

//                     if ($('#language-span').text().toLowerCase() == 'язык:') {
//                         $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
//                             .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 секунд</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 минута</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 минуты</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 минуты</div>\
//                                                                       ');
//                     } else {
//                         $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
//                             .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 seconds</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 minute</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 minutes</div>\
//                                                                        <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 minutes</div>\
//                                                                       ');
//                     }
//                 } else {
//                     //біржа не працює
//                     if ($('#language-span').text().toLowerCase() == 'язык:') {
//                         showInfoMessage(exchangeDontWork[0]);
//                     } else {
//                         showInfoMessage(exchangeDontWork[1]);
//                     }
//                 }
//             }
//             else {
//                 //біржа не працює
//                 if ($('#language-span').text().toLowerCase() == 'язык:') {
//                     showInfoMessage(exchangeDontWork[0]);
//                 } else {
//                     showInfoMessage(exchangeDontWork[1]);
//                 }
//             }

//         } else {
//             $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();
//             $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();
//             $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

//             if ($('#language-span').text().toLowerCase() == 'язык:') {
//                 $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
//                     .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 секунд</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 минута</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 минуты</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 минуты</div>\
//                                                                    ');
//             } else {
//                 $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder')
//                     .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="30000"> 30 seconds</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="60000"> 1 minute</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="120000"> 2 minutes</div>\
//                                                                     <div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="180000"> 3 minutes</div>\
//                                                                    ');
//             }
//         }
//     } else if (parlayType == 'long') {


//         // очистити старий список ставок
//         $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();



//         // контроль для акцій: контроль, чи працює поставник котирувань - ajax, якщо так - перевірка, чи час закриття припадає на робочий час
//         if ($('#currentStockPairId').attr('data-typestock') == 1) {

//             var isLongParlayListNotEmptyMarker = false;

//             if (breakInTrade == 0) {
//                 var endTime = new Date(+new Date(new Date()) + 24 * 60 * 60 * 1000); // 86400000

//                 for (var i = 0; i < 31; i++) {

//                     endTime = new Date(endTime);

//                     var endYear = endTime.getUTCFullYear();
//                     if (endYear < 10) endYear = '0' + endYear;
//                     var endDate = endTime.getUTCDate();
//                     if (endDate < 10) endDate = '0' + endDate;
//                     var endMonth = endTime.getUTCMonth() + 1;
//                     if (endMonth < 10) endMonth = '0' + endMonth;
//                     var endHours = endTime.getHours();
//                     if (endHours < 10) endHours = '0' + endHours;
//                     var endMinutes = endTime.getUTCMinutes();
//                     if (endMinutes < 10) endMinutes = '0' + endMinutes;
//                     var endSeconds = endTime.getUTCSeconds();
//                     if (endSeconds < 10) endSeconds = '0' + endSeconds;

//                     var endTimeString = endYear + '-' +
//                         endMonth + '-' +
//                         endDate;

//                     var timeToEndInMS = +endTime - +new Date();

//                     var url = 'http://god.ares.local/api/Hol/GetDate?value=' + endTimeString; // на роботі (локалка)
//                     // var url = 'http://62.216.34.146:9000/api/Hol/GetDate?value=' + endTimeString; // вдома (інет)

//                     if (isActionsTradingPossible(url, endTime)) {
//                         $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder')
//                             .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="'
//                             + timeToEndInMS + '">'
//                             + endTimeString + '</div>');
//                         isLongParlayListNotEmptyMarker = true;
//                     }

//                     endTime = +new Date(endTime) + 24 * 60 * 60 * 1000;

//                 }

//                 // якщо після циклу не відмалювалася жодна ставка - попап, що ставки не можливі
//                 if (!isLongParlayListNotEmptyMarker) {
//                     if ($('#language-span').text().toLowerCase() == 'язык:') {
//                         showInfoMessage(noAccessibleParlay[0]);
//                     } else {
//                         showInfoMessage(noAccessibleParlay[1]);
//                     }
//                 }

//             } else {
//                 //біржа не працює
//                 if ($('#language-span').text().toLowerCase() == 'язык:') {
//                     showInfoMessage(exchangeDontWork[0]);
//                 } else {
//                     showInfoMessage(exchangeDontWork[1]);
//                 }
//             }

//         } else {
//             // якщо не акції
//             var startTime = new Date();
//             var startUTCTime = new Date(startTime.setHours(startTime.getUTCHours()));

//             var endTime = +new Date(startUTCTime) + 24 * 60 * 60 * 1000;

//             for (var i = 0; i < 30; i++) {

//                 endTime = new Date(endTime);

//                 var endYear = endTime.getFullYear();
//                 if (endYear < 10) endYear = '0' + endYear;
//                 var endDate = endTime.getDate();
//                 if (endDate < 10) endDate = '0' + endDate;
//                 var endMonth = endTime.getMonth() + 1;
//                 if (endMonth < 10) endMonth = '0' + endMonth;

//                 var endTimeString = endYear + '-' +
//                     endMonth + '-' +
//                     endDate;

//                 var timeToEndInMS = endTime - +new Date(startUTCTime);

//                 $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder')
//                     .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="'
//                     + timeToEndInMS + '">'
//                     + endTimeString + '</div>');

//                 endTime = +new Date(endTime) + 24 * 60 * 60 * 1000;
//             }

//         }

//     } else if (parlayType == 'normal') {
//         // побудова списку можливих ставок
//         // контроль можливості торгівлі акціями (торги на них не цілодобові)
//         if ($('#currentStockPairId').attr('data-typestock') == 1) {

//             // очистити старий список ставок
//             $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

//             // перевірка на державні свята США / короткі робочі дні в США
//             var url = 'http://god.ares.local/api/Hol/GetDate?value=' + currentUTCDateString; // на роботі (локалка)
//             // var url = 'http://62.216.34.146:9000/api/Hol/GetDate?value=' + currentUTCDateString; // вдома (інет)

//             if (isActionsTradingPossible(url, currentDateTime)) {
//                 startTime = tempUTCHour + ':' + tempUTCMinutes;
//                 finishTime = '20:00';
//                 createListOfNormalParlay(startTime, finishTime, currentDateTime);
//             } else {
//                 //біржа не працює
//                 if ($('#language-span').text().toLowerCase() == 'язык:') {
//                     showInfoMessage(exchangeDontWork[0]);
//                 } else {
//                     showInfoMessage(exchangeDontWork[1]);
//                 }
//             }

//             // startTime  = tempUTCHour + ':' + tempUTCMinutes;
//             // finishTime = '20:00';
//             // createListOfNormalParlay (startTime, finishTime, currentDateTime);
//         } else {
//             // якщо не акції - від поточного часу до 24:00 (startTime, finishTime)
//             startTime = tempUTCHour + ':' + tempUTCMinutes;
//             finishTime = '24:00';
//             createListOfNormalParlay(startTime, finishTime, currentDateTime)
//         }
//     }

//     parlayTime = 0;
//     // прибирання підсвіток
//     // деактивувати кнопки ставок
//     $('.parlay-btns__cover').css('display', 'flex');
// }

// function deActivationParlayBtns(clickedElem) {
//     // розраховує прибуток
//     // активує/деактивує кнопки вгору/вниз
//     // підсвічує обрану ставку

//     var inputValue   = +$('#investment-input').val(),
//         percentValue = +$('#investment-percent').text();

//     var tempArr = $('.parlay-slider__parlay-choise-btn');
//     for (var i = 0; i < tempArr.length; i++) {
//         if ($(tempArr[i]).css('background-color') == 'rgba(0, 0, 0, 0.3)') {
//             var tempClickedElem = $(tempArr[i]);
//         }
//     }
//     if ($(clickedElem).attr('data-timeToEnd') || $(tempClickedElem).attr('data-timeToEnd')) {
//         parlayTime = $(clickedElem).attr('data-timeToEnd') || $(tempClickedElem).attr('data-timeToEnd');
//         parlayTime = Date.now() - new Date(parlayTime.slice(0, 4),
//             parlayTime.slice(5, 7) - 1,
//             parlayTime.slice(8, 10),
//             parlayTime.slice(11, 13),
//             parlayTime.slice(14, 16));

//     } else if ($(clickedElem).attr('data-timeToEndInMS') || $(tempClickedElem).attr('data-timeToEndInMS')) {
//         parlayTime = +$(clickedElem).attr('data-timeToEndInMS') || +$(tempClickedElem).attr('data-timeToEndInMS');
//     } else {
//         parlayTime = 0;
//     }

//     /* ↓↓↓ highlighting ↓↓↓ */
//     $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');
//     if (clickedElem) {
//         $(clickedElem).css('background-color', 'rgba(0,0,0,.3)');
//     } else {
//         $(tempClickedElem).css('background-color', 'rgba(0,0,0,.3)');
//     }
//     /* ↑↑↑ /highlighting ↑↑↑ */

//     /* ↓↓↓ investment calculator ↓↓↓ */
//     var resultValue = (inputValue * percentValue) / 100 + inputValue;

//     $($('#investment-result')).text(resultValue);
//     /* ↑↑↑ /investment calculator ↑↑↑ */

//     /* ↓↓↓ activation/deactivation btns ↓↓↓ */
//     if (inputValue > 4 && parlayTime != 0) {
//         $('.parlay-btns__cover').css('display', 'none');
//     } else {
//         $('.parlay-btns__cover').css('display', 'flex');
//     }
//     /* ↑↑↑ /activation/deactivation btns ↑↑↑ */

//     if (clickedElem.tagName == 'input') return;
//     parlayBtnInnerHTML = $(clickedElem).text();
// }

// function createListOfNormalParlay(startTime, finishTime, currentDateTime) {
//     // видаляє старий список нормальних ставок (якщо він є)
//     // якщо біржа закрита - виводить повідомлення
//     // циклом формує список можливих нормальних ставок з інтервалом у півгодини

//     // спочатку потрібно видалити старий список, якщо він є
//     $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

//     // якщо startTime = finishTime = false - торги не можливі
//     if (startTime == false) {
//         //біржа не працює
//         if ($('#language-span').text().toLowerCase() == 'язык:') {
//             showInfoMessage(exchangeDontWork[0]);
//         } else {
//             showInfoMessage(exchangeDontWork[1]);
//         }
//         return
//     }

//     // визначення першого можливого часу ставки: ставки робляться або в 00хв, або в 30хв,
//     // але так, щоб до кінця ставки було щонайменше 5 хв

//     // розібрати рядки startTime / finishTime
//     var tempUTCTimeHours = +startTime.slice(0, 2),
//         tempUTCTimeMinutes = +startTime.slice(3),
//         tempUTCTimeFinishHours = +finishTime.slice(0, 2),
//         tempUTCTimeFinishMinutes = +finishTime.slice(3);

//     var tempUTCTimeInMinutes = tempUTCTimeHours * 60 + tempUTCTimeMinutes,
//         tempUTCTimeFinishInMinutes = tempUTCTimeFinishHours * 60 + tempUTCTimeFinishMinutes;

//     // округлення часу першої можливої ставки до 00хв або 30хв
//     if (25 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 55) {
//         // оркуглити до 00, додати 1 годину
//         currentDateTime.setUTCMinutes(60);
//     } else if (0 <= tempUTCTimeMinutes && tempUTCTimeMinutes < 25) {
//         // оркуглити до 30
//         currentDateTime.setUTCMinutes(30);
//     } else if (55 <= tempUTCTimeMinutes && tempUTCTimeMinutes <= 59) {
//         // округлити до 30, додати годину
//         currentDateTime.setUTCMinutes(90);
//     }

//     // сформувати рядок дати ( у список для вибору клієнту )
//     tempUTCFullYear = currentDateTime.getUTCFullYear();
//     if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
//     tempUTCMonth = currentDateTime.getUTCMonth() + 1;
//     if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
//     tempUTCDate = currentDateTime.getUTCDate();
//     if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
//     tempUTCHours = currentDateTime.getUTCHours();
//     if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
//     tempUTCMinutes = currentDateTime.getUTCMinutes();
//     if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

//     var tempDateTimeString = tempUTCFullYear + '-' +
//         tempUTCMonth + '-' +
//         tempUTCDate + ' ' +
//         tempUTCHours + ':' +
//         tempUTCMinutes;

//     // це щоб перша ставка формувалася лише тоді, коли час робочий
//     if (tempUTCTimeHours * 60 + tempUTCTimeMinutes < (tempUTCTimeFinishHours * 60 + tempUTCTimeFinishMinutes - 5)) {
//         $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
//             .children('.parlay-slider__parlay-choise-btn-holder')
//             .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString+' " onclick="deActivationParlayBtns(this)">' + tempDateTimeString +'</div>');
//     }

//     while (tempUTCTimeInMinutes < tempUTCTimeFinishInMinutes - 60) {
//         currentDateTime.setMinutes(currentDateTime.getMinutes() + 30)
//         // сформувати рядок дати ( у список для вибору клієнту )
//         tempUTCFullYear = currentDateTime.getUTCFullYear();
//         if (tempUTCFullYear < 10) tempUTCFullYear = '0' + tempUTCFullYear;
//         tempUTCMonth = currentDateTime.getUTCMonth() + 1;
//         if (tempUTCMonth < 10) tempUTCMonth = '0' + tempUTCMonth;
//         tempUTCDate = currentDateTime.getUTCDate();
//         if (tempUTCDate < 10) tempUTCDate = '0' + tempUTCDate;
//         tempUTCHours = currentDateTime.getUTCHours();
//         if (tempUTCHours < 10) tempUTCHours = '0' + tempUTCHours;
//         tempUTCMinutes = currentDateTime.getUTCMinutes();
//         if (tempUTCMinutes < 10) tempUTCMinutes = '0' + tempUTCMinutes;

//         var tempDateTimeString = tempUTCFullYear + '-' +
//             tempUTCMonth + '-' +
//             tempUTCDate + ' ' +
//             tempUTCHours + ':' +
//             tempUTCMinutes;
//         $('.parlay-slider__item[data-parlayType="normal"]').children('.parlay-slider__item-choice-field')
//             .children('.parlay-slider__parlay-choise-btn-holder')
//             .append('<div class="parlay-slider__parlay-choise-btn" data-timeToEnd="' + tempDateTimeString + '"\
//                                                                      onclick="deActivationParlayBtns(this)">'
//             + tempDateTimeString +
//             '</div>');
//         tempUTCTimeInMinutes += 30;
//     }
// }

// function isActionsTradingPossible(url, dateTime) {
//     // перевіряє, чи робочий день і час
//     var isActions = arguments[2];
//     $.ajax({
//         url: url,
//         success: function (data) {
//             //debugger
//             if (isActions == 'noActions') {
//                 debugger
//                 return true;
//             } else {
//                 if (data == 1) { // святковий день
//                     //debugger
//                     return false;
//                 }
//                 if (data == 0) { // не святковий день
//                    // debugger
//                     // перевірка на вихідний день (субота/неділя)
//                     if (dateTime.getUTCDay() == 6 || dateTime.getUTCDay() == 0) { // вихідний день (субота/неділя)
//                       //  debugger
//                         return false;
//                     } else { // робочий день - 13:30-20:00 по UTC noActions
//                         // перевести години в хвилини, додати до хвилин
//                         var timeInMinutes = dateTime.getUTCHours() * 60 + dateTime.getUTCMinutes();
//                         if (timeInMinutes >= 1200 || timeInMinutes < 810) { // неробочий час
//                            // debugger
//                             return false;
//                         } else { // робочий час
//                             //debugger
//                             return true;
//                         }
//                     }
//                 }
//             }
//         }
//     });
// }

// function deactivationParlays() {
//     $('.parlay-slider__reactivation-field').css({
//         'display': 'flex'
//     });

//     $('.parlay-btns__cover').css({'display': 'flex'});
// }

// function showInfoMessage(message) {

//     $('p.info-message__body').text(message);
//     $('.info-message').css({ 'right': '0px' });

//     $('.info-message__close-btn').click(function () {
//         $('.info-message').css({ 'right': '-290px' });
//     });

//     setTimeout(function() {
//         $('.info-message').css({ 'right': '-290px' });
//     }, 5000);
// }

// function investmentReset() {
//     // обнулення інвестицій при зміні торгових пар
//     clearTimeout(deactivationTimer);

//     $('.parlay-slider__reactivation-field').css({ 'display': 'none' });

//     // прибирати повідомлення, якщо вони є
//     $('.info-message').css({ 'right': '-290px' });

//     /* ↓↓↓ відновлння списків після того, як акції їх позатирали (в не робочий час) ↓↓↓ */

//         rewriteParlayLists();
//     /* ↑↑↑ /відновлння списків після того, як акції їх позатирали (в не робочий час) ↑↑↑ */

//     $('#investment-input').val('25');
//     $('.parlay-btns__cover').css('display', 'flex');
//     parlayTime = 0;
//     $('.parlay-slider__parlay-choise-btn').css('background-color', 'transparent');

//     // зробити перший елемент активним та правильно його відпозиціонувати
//     $('.parlay-slider').slick('unslick').slick({ 'draggable': 'false' });
//     // після unslick на кнопки нового слайдера потрібно навішувати обробники
//     $($('.parlay-slider').children('.slick-arrow')).click(function () {

//         clearTimeout(deactivationTimer);

//         $('.parlay-slider__reactivation-field').css({ 'display': 'none' });

//         rewriteParlayLists();

//         deactivationTimer = setTimeout(function () {
//             deactivationParlays()
//         }, 30000);
//     });

//     deactivationTimer = setTimeout(function () {
//         deactivationParlays()
//     }, 30000);
// }

// function getCoords(elem) {
//     var box = elem.getBoundingClientRect();
//     return {
//         top: box.top + pageYOffset,
//         bottom: box.bottom + pageYOffset,
//         left: box.left + pageXOffset,
//         right: box.right + pageXOffset,
//         height: box.bottom - box.top
//     };
// }

/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */

// made by waldteufel@ukr.net