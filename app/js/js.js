/* ↓↓↓ GLOBAL VARIABLES ↓↓↓ */
var parlayInvestment,     // розмір ставки
    parlayType,           // short/normal/long
    parlayTime = 0,       // час ДО закриття ставки - в мілісекундах
    parlayAnticipation,   // очікування - up/down
    parlayPairName,       // назва пари
    parlayCurrentPrice,   // поточна котировка
    deactivationTimer;    // таймер для деактивації списків можливих ставок

var exchangeDontWork   = [
                          'Торги невозможны по причине того, что на данный момент биржа закрыта. Акционная биржа работает с 13:30 до 20:00 по UTC-времени с понедельника по пятницу с учетом государственных праздников США.',
                          'Trades are not possible at the moment because the exchange is closed. Stock exchange is open from 13:30 to 20:00 UTC-time from Monday to Friday, considering US public holidays.'
                         ],
    noAccessibleParlay = [
                          'Нет доступных ставок',
                          'No parlays available'
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
  clearTimeout(deactivationTimer);

  $('.parlay-slider-deactivation-panel').css({'display':'none'});

  // прибирати повідомлення, якщо вони є
  $('.info-message').css({'right':'-290px'});

  /* ↓↓↓ відновлння списків після того, як акції їх позатирали (в не робочий час) ↓↓↓ */
  if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() != 'акции' &&
    $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() != 'actions' ) {

    $('.parlay-slider__item[data-parlayType="short"]').find('.parlay-slider__parlay-choise-btn-holder').empty();
    $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();
    $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

      if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
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

  } else {
    rewriteParlayLists();
  }
  /* ↑↑↑ /відновлння списків після того, як акції їх позатирали (в не робочий час) ↑↑↑ */

  $('#investment-input').val('25');
  $('.parlay-btns__cover').css('display','flex');
  parlayTime = 0;
  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');

  // зробити перший елемент активним та правильно його відпозиціонувати
  $('.parlay-slider').slick('unslick').slick({'draggable':'false'});
  // після unslick на кнопки нового слайдера потрібно навішувати обробники
  $( $('.parlay-slider').children('.slick-arrow') ).click(function(){
    clearTimeout(deactivationTimer);

    $('.parlay-slider-deactivation-panel').css({'display':'none'});

    rewriteParlayLists();

    deactivationTimer = setTimeout(function(){
      deactivationParlays()
    },30000);
  });

  deactivationTimer = setTimeout( function(){
    deactivationParlays()
  },30000);
});
/* ↑↑↑ /обнулення інвестицій при зміні торгових пар ↑↑↑ */

/* ↓↓↓ investment calculator + activation/deactivation btns ↓↓↓ */
$('#investment-input').bind('keypress keyup blur', function(e) {
  // в поле можна вводити тільки цілі додатні числа
  if ( e.type == 'keypress' ) {
  	e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    if (chr == null) false;
    if (chr < '0' || chr > '9') {
      return false;
    }
  }
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
  $('#investment-input').val('25');

});
/* ↑↑↑ /create active-slider-item ↑↑↑ */

/* ↓↓↓ динамічне формування списків можливих ставок ↓↓↓ */
var startTime, finishTime, currentDateTime;
$( $('.parlay-slider').children('.slick-arrow') ).click(function(){
  clearTimeout(deactivationTimer);
  $('.parlay-slider-deactivation-panel').css({'display':'none'});

  $('.parlay-slider__parlay-choise-btn').css('background-color','transparent');
  rewriteParlayLists();

  deactivationTimer = setTimeout( function(){
    deactivationParlays()
  },30000);
});
/* ↑↑↑ /динамічне формування списків можливих ставок ↑↑↑ */

/* ↓↓↓ після завантаження сторінки, якщо активна вкладка акцій - розраховувати можливість торгівлі акціями ↓↓↓ */
$(document).ready(function() {
  rewriteParlayLists();

  deactivationTimer = setTimeout( function(){
    deactivationParlays()
  },30000);

  $('.parlay-slider-deactivation-panel__btn').click(function(){
    $('.parlay-slider-deactivation-panel').css({'display':'none'});

    rewriteParlayLists();
  // зробити перший елемент активним та правильно його відпозиціонувати
  $('.parlay-slider').slick('unslick').slick({'draggable':'false'});
  // після unslick на кнопки нового слайдера потрібно навішувати обробники
  $( $('.parlay-slider').children('.slick-arrow') ).click(function(){
    clearTimeout(deactivationTimer);

    $('.parlay-slider-deactivation-panel').css({'display':'none'});

    rewriteParlayLists();

    deactivationTimer = setTimeout(function(){
      deactivationParlays()
    },30000);
  });
    deactivationTimer = setTimeout( function(){
      deactivationParlays()
    },30000);
  });
});
/* ↑↑↑ /після завантаження сторінки, якщо активна вкладка акцій - розраховувати можливість торгівлі акціями ↑↑↑ */

/* ↓↓↓ BEM-blocks ↓↓↓ */
var simpleSwitcherToggle = 'demo';
$('.simple-switcher__thumb').click(function(){
  if (simpleSwitcherToggle == 'demo') {
    $('.simple-switcher__thumb').css({'transition':'.2s','left':'35px'});
    simpleSwitcherToggle = 'real'

    $('.central-part__account-type span').text('Real');

    return
  }
  if (simpleSwitcherToggle == 'real') {
    $('.simple-switcher__thumb').css({'transition':'.2s','left':'0px'});
    simpleSwitcherToggle = 'demo'

    $('.central-part__account-type span').text('Demo');

    return
  }
});



var isMenuOpen;
var isClickAble = true;
$('.menu-btn').click(function(){
  toggleBtn();
});

$(document).click(function(e){
  if (e.target.className != 'menu-btn' && isMenuOpen == true) {
    toggleBtn();
  }
});

function toggleBtn() {
  if (isClickAble) {        //блокування натискання кнопки частіше, ніж 0,5с
    isClickAble = false;
    setTimeout(function() {
      isClickAble = true;
    }, 500);

    $('.menu-btn').click = null;

    if (!isMenuOpen) {
      $('.menu-btn__1-line').css({'transition':'.5s','top':'9px'});
      $('.menu-btn__3-line').css({'transition':'.5s','top':'9px'});
      $('.menu-btn__2-line').css({'transition':'.5s','opacity':'0'});
      setTimeout(function(){
        $('.menu-btn__1-line').css({'transition':'.5s','transform':'rotate(45deg)'});
        $('.menu-btn__3-line').css({'transition':'.5s','transform':'rotate(-45deg)'});
      },500);
      isMenuOpen = true;

      toggleMenu(true);
      return
    }
    if (isMenuOpen) {
      $('.menu-btn__1-line').css({'transition':'.5s','transform':'rotate(0deg)'});
      $('.menu-btn__3-line').css({'transition':'.5s','transform':'rotate(0deg)'});
      $('.menu-btn__2-line').css({'transition-delay':'.5s','transition-duration':'.5s','opacity':'1'});
      setTimeout(function(){
        $('.menu-btn__1-line').css({'transition-duration':'.5s','top':'0px'});
        $('.menu-btn__3-line').css({'transition-duration':'.5s','top':'18px'});
      },500);
      isMenuOpen = false;

      toggleMenu(false);
      return
    }
  }
}

function toggleMenu (arg) {
  var arrOfLinks = $('.menu-list-a');

  if (arg == true) {
    $('.menu').css({'border-width':'1px'})
              .css({'transition':'.5s','height':'182px'});

    setTimeout(function(){
      var temp1 = 0;
      var temp2 = '0s';
      for (var i = 0; i < arrOfLinks.length; i++) {
        $(arrOfLinks[i]).css({'transition':'.2s','transition-delay':temp2,'left':'0%'});
        temp1 += 0.1;
        temp2 = temp1 + 's';
      }
    },500);
  }
  if (arg == false) {
    var temp1 = 0;
    var temp2 = '0s';
    for (var i = 0; i < arrOfLinks.length; i++) {
      $(arrOfLinks[i]).css({'transition':'.2s','transition-delay':temp2,'left':'100%'});
      temp1 += 0.1;
      temp2 = temp1 + 's';
    }
    setTimeout(function(){
      $('.menu').css({'border-width':'0px'})
        .css({'transition':'.5s','height':'0px'});
      },600);
  }
};


var isLanguageSwitcherOpen  = false;
var isLanguageSwitcherOpen2 = false;
var selectedLanguage;
$('.language-switcher__btn').click(function() {
  if (isLanguageSwitcherOpen == false) {
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'300%','z-index':'8888'});
    isLanguageSwitcherOpen = true;
    return
  }

  $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
  isLanguageSwitcherOpen = false;
  return
});

$('.language-switcher__flag-en').click(function(){
  if (selectedLanguage == 'en' && isLanguageSwitcherOpen2 == false) {
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'200%','z-index':'8888'});
    $('.language-switcher__flag-ru').css({'display':'block','z-index':'8888'});
    isLanguageSwitcherOpen2 = true;
    return
  }
  if (isLanguageSwitcherOpen2 == true) {
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
    $('.language-switcher__flag-ru').css({'display':'none'});
    isLanguageSwitcherOpen2 = false;
    return
  }
  $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
  $('.language-switcher__btn').css({'display':'none'});
  $('.language-switcher__flag-ru').css({'display':'none'});
  isLanguageSwitcherOpen = false;
  selectedLanguage = 'en';
});

$('.language-switcher__flag-ru').click(function(){
  if (selectedLanguage == 'ru' && isLanguageSwitcherOpen2 == false) {
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'200%','z-index':'8888'});
    $('.language-switcher__flag-en').css({'display':'block'});
    isLanguageSwitcherOpen2 = true;
    return
  }
  if (isLanguageSwitcherOpen2 == true) {
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
    $('.language-switcher__flag-en').css({'display':'none'});
    isLanguageSwitcherOpen2 = false;
    return
  }
  $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
  $('.language-switcher__btn').css({'display':'none'});
  $('.language-switcher__flag-en').css({'display':'none'});
  isLanguageSwitcherOpen = false;
  selectedLanguage = 'ru';
});


function showInfoMessage(message) {

  $('p.info-message__body').text(message);
  $('.info-message').css({'right':'0px'});

  $('.info-message__close-btn').click(function(){
    $('.info-message').css({'right':'-290px'});
  });

}


// message-to-mentor
// open
$('.call-us-btn').click(function(){

  // clear previous values
  $('.message-to-mentor__subject').val('');
  $('.message-to-mentor__text').val('');

  $('.message-to-mentor__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.message-to-mentor').css({'left':'0%'});
});

// close
$('.message-to-mentor__close-btn').click(function(){
  closeMessageToMentor();
});

// validation and close
$('.message-to-mentor__btn').click(function(e){
  if($('.message-to-mentor__text').val().length < 10) {
    e.preventDefault();
    $('.message-to-mentor__validation-warning').css({'height':'30px'});
  } else {
    closeMessageToMentor();
  }
});
$('.message-to-mentor__text').keyup(function(){
  if ($(this).val().length >= 10) {
    $('.message-to-mentor__validation-warning').css({'height':'0px'});
  }
});

function closeMessageToMentor () {
  $('.message-to-mentor').css({'left':'110%'});
  var tempMessageToMentorWidth = $('.message-to-mentor__holder').css('width');
  var tempMessageToMentorPadding = $('.message-to-mentor__holder').css('padding-left');
  setTimeout(function(){
    $('.message-to-mentor__holder').css({'width':'0px','padding':'0px'});
    $('.message-to-mentor__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.message-to-mentor').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.message-to-mentor__validation-warning').css({'height':'0px'});
    $('.message-to-mentor__holder').css({'width':tempMessageToMentorWidth,'padding':tempMessageToMentorPadding});
  },1000);
}



// message-from-mentor
// open
$('.tempBTN').click(function(){

  $('.message-from-mentor__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.message-from-mentor').css({'left':'0%'});
});
// close
$('.message-from-mentor__btn, .message-from-mentor__close-btn').click(function(){
  $('.message-from-mentor').css({'left':'110%'});
  var tempMessageFromMentorWidth = $('.message-from-mentor__holder').css('width');
  var tempMessageFromMentorPadding = $('.message-from-mentor__holder').css('padding-left');
  setTimeout(function(){
    $('.message-from-mentor__holder').css({'width':'0px','padding':'0px'});
    $('.message-from-mentor__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.message-from-mentor').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.message-from-mentor__holder').css({'width':tempMessageFromMentorWidth,'padding':tempMessageFromMentorPadding});
  },1000);
});



// change-password
// open
$('.tempBTN3').click(function(){
  $('.change-password__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.change-password').css({'left':'0%'});
});
// close
$('.change-password__btn-close, .change-password__close-btn').click(function(){
  $('.change-password').css({'left':'110%'});
  var tempChangePasswordWidth = $('.change-password__holder').css('width');
  var tempChangePasswordPadding = $('.change-password__holder').css('padding-left');
  setTimeout(function(){
    $('.change-password__holder').css({'width':'0px','padding':'0px'});
    $('.change-password__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.change-password').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.change-password__holder').css({'width':tempChangePasswordWidth,'padding':tempChangePasswordPadding});
  },1000);
});
// validation
$('.change-password__btn-send').click(function(e){
  console.log($('#change-password-input').val().length);
  if ( $('#change-password-input').val().length < 6 ) {
    e.preventDefault();
    console.log( 'пароль повинен бути не менше ніж 6 символів' );
  } else if ( $('#change-password-input').val() != $('#new-password-input').val() ) {
    e.preventDefault();
    console.log( 'паролі не співпадають' );
  } else {
    $('.change-password').css({'left':'110%'});
    var tempChangePasswordWidth = $('.change-password__holder').css('width');
    var tempChangePasswordPadding = $('.change-password__holder').css('padding-left');
    setTimeout(function(){
      $('.change-password__holder').css({'width':'0px','padding':'0px'});
      $('.change-password__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
      $('.change-password').css({'left':'-110%'});
    },500);
    setTimeout(function(){
      $('.change-password__holder').css({'width':tempChangePasswordWidth,'padding':tempChangePasswordPadding});
    },1000);
  }
});



// make-cash-withdrawal
// open
$('.tempBTN2').click(function(){
  $('.make-cash-withdrawal__input').val('');
  $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.make-cash-withdrawal').css({'left':'0%'});
});
// close
$('.make-cash-withdrawal__btn-close, .make-cash-withdrawal__close-btn').click(function(){
  $('.make-cash-withdrawal').css({'left':'110%'});
  var tempMakeCashWithdrawalWidth = $('.make-cash-withdrawal__holder').css('width');
  var tempMakeCashWithdrawalPadding = $('.make-cash-withdrawal__holder').css('padding-left');
  setTimeout(function(){
    $('.make-cash-withdrawal__holder').css({'width':'0px','padding':'0px'});
    $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.make-cash-withdrawal').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.make-cash-withdrawal__holder').css({'width':tempMakeCashWithdrawalWidth,'padding':tempMakeCashWithdrawalPadding});
  },1000);
});
// validation
$('.make-cash-withdrawal__btn-send').click(function(e){
  if ( $('.make-cash-withdrawal__input').val() == '' ) {
    e.preventDefault();
  } else {
    $('.make-cash-withdrawal').css({'left':'110%'});
    var tempMakeCashWithdrawalWidth = $('.make-cash-withdrawal__holder').css('width');
    var tempMakeCashWithdrawalPadding = $('.make-cash-withdrawal__holder').css('padding-left');
    setTimeout(function(){
      $('.make-cash-withdrawal__holder').css({'width':'0px','padding':'0px'});
      $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
      $('.make-cash-withdrawal').css({'left':'-110%'});
    },500);
    setTimeout(function(){
      $('.make-cash-withdrawal__holder').css({'width':tempMakeCashWithdrawalWidth,'padding':tempMakeCashWithdrawalPadding});
    },1000);
  }
});
// input - only for numbers
$('.make-cash-withdrawal__input').keypress(function(e){
  e = e || event;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  var chr = getChar(e);
  // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
  if (chr == null) return;
  if (chr < '0' || chr > '9') {
    return false;
  }
});


// profile-editor
//open
$('#profile-editor').click(function() {
  $('.profile-editor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
  $('.profile-editor').css({ 'left': '0%' });
});

// simple close
$('.profile-editor__close-btn').click(function() {
    closeProfilePopup();
});

// ↓↓↓ phone-input - number selection ↓↓↓
$("#prof-phone").keypress(function(e) {
  e = e || event;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  var chr = getChar(e);

  if(!$("#prof-phone").val()) {
    if(chr != 1 && chr != 2 && chr != 3 &&
       chr != 4 && chr != 5 && chr != 6 &&
       chr != 7 && chr != 8 && chr != 9 &&
       chr != 0 && chr != '+' && e.keyCode != 8) {
      return false
    }
  } else {
    if(chr != 1 && chr != 2 && chr != 3 &&
       chr != 4 && chr != 5 && chr != 6 &&
       chr != 7 && chr != 8 && chr != 9 &&
       chr != 0 && e.keyCode != 8) {
      return false
    }
  }
});
// ↑↑↑ phone-input - number selection ↑↑↑

// ↓↓↓ validation and close ↓↓↓
$('.profile-editor__btn').click(function(e) {

  if ($('#prof-fname').val().length < 2) {
    e.preventDefault();
    $('#prof-fname-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
    return
  }

  if ($('#prof-lname').val().length < 2) {
    e.preventDefault();
    $('#prof-lname-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
    return
  }

  if ($('#prof-country').val().length < 3) {
    e.preventDefault();
    $('#prof-country-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
    return
  }

  if ($('#prof-phone').val().length < 13) {
    e.preventDefault();
    $('#prof-phone-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
    return
  }
  closeProfilePopup();
});

$('#prof-fname').keyup(function(){
  if ($('#prof-fname').val().length >= 2) {
    $('#prof-fname-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
  }
});

$('#prof-lname').keyup(function(){
  if ($('#prof-lname').val().length >= 2) {
    $('#prof-lname-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
  }
});

$('#prof-country').keyup(function(){
  if ($('#prof-country').val().length >= 3) {
    $('#prof-country-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
  }
});

$('#prof-phone').keyup(function(){
  if ($('#prof-phone').val().length >= 13) {
    $('#prof-phone-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
  }
});
// ↑↑↑ validation and close ↑↑↑

function closeProfilePopup() {
  $('.profile-editor').css({ 'left': '110%' });
  var tempProfileEditorWidth = $('.profile-editor__holder').css('width');
  var tempProfileEditorPadding = $('.profile-editor__holder').css('padding-left');
  setTimeout(function() {
      $('.profile-editor__holder').css({ 'width': '0px', 'padding': '0px' });
      $('.profile-editor__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
      $('.profile-editor').css({ 'left': '-110%' });
      //$('#prof-lname, #prof-fname, #prof-country, #prof-phone').val('');
  }, 500);
  setTimeout(function() {
      $('.profile-editor__validation-warning').css({'height':'0px', 'margin-top':'0px'});
      $('.profile-editor__holder').css({ 'width': tempProfileEditorWidth, 'padding': tempProfileEditorPadding });
  }, 1000);
}



// make-lodgement
// поява
$('.central-part__btn').click(function(){

  $('.make-lodgement__positioning-wrapper').css({'z-index':'8888','background-color':'rgba(0,0,0,.8'});

  $('.make-lodgement').css({'transition':'top .2s','top':'50%'});

  setTimeout(function(){
    $('.make-lodgement').css({'transition':'width .3s','width':'400px'});
  },200);

  setTimeout(function(){
    $('.make-lodgement').css({'transition':'height .3s','height':'162px'});
    $('.make-lodgement__pay-system').css({'display':'block'});
  },500);

  setTimeout(function(){
    $('.make-lodgement__pay-system').css({'transition':'.3s','left':'0px'});
  },800);

  setTimeout(function(){
    $('.make-lodgement__close-btn').css({'transition':'.5s','transform':'rotate(180deg)'});
    $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({'transition':'width .5s','width':'24px'});
  },1100);

  setTimeout(function(){
    $('.make-lodgement__triangle').css({'transition':'.3s','right':'8px'});
  },1600);
});

// кліки
$('.make-lodgement__pay-system:first').click(function(){
  $('.make-lodgement__triangle').css({'transition':'.5s','top':'44px'});
  $('.make-lodgement').css({'transition':'height .3s','height':'192px'});
  $('.make-lodgement-MasterCard').css({'transition':'.5s','height':'30px'});
  $('.make-lodgement-VISA').css({'transition':'.5s','height':'0px'});
});

$('.make-lodgement__pay-system:last').click(function(){
  $('.make-lodgement__triangle').css({'transition':'.5s','top':'104px'});
  $('.make-lodgement').css({'transition':'height .3s','height':'192px'});
  $('.make-lodgement-VISA').css({'transition':'.5s','height':'30px'});
  $('.make-lodgement-MasterCard').css({'transition':'.5s','height':'0px'});
});

// закриття
$('.make-lodgement__close-btn').click(function(){

  $('.make-lodgement-VISA').css({'transition':'.3s','height':'0px'});
  $('.make-lodgement-MasterCard').css({'transition':'.3s','height':'0px'});
  $('.make-lodgement').css({'transition':'height .3s','height':'162px'});
  $('.make-lodgement__triangle').css({'transition':'.3s','right':'-12px'});

  setTimeout(function(){
    $('.make-lodgement__triangle').css({'top':'74px'});
  },300);

  setTimeout(function(){
    $('.make-lodgement__pay-system:even').css({'transition':'.3s','left':'110%'});
    $('.make-lodgement__pay-system:odd').css({'transition':'.3s','left':'-110%'});
  },400);

  setTimeout(function(){
    $('.make-lodgement__close-btn').css({'transition':'.5s','transform':'rotate(0deg)'});
    $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({'transition':'width .5s','width':'0px'});
  },700);

  setTimeout(function(){
    $('.make-lodgement').css({'transition':'height .3s','height':'20px'});
    $('.make-lodgement__pay-system').css({'display':'none'});
  },1200);

  setTimeout(function(){
    $('.make-lodgement').css({'transition':'width .3s','width':'120px'});
  },1500);

  setTimeout(function(){
    $('.make-lodgement').css({'transition':'top .2s','top':'-10%'});
    $('.make-lodgement__positioning-wrapper').css({'transition':'background-color .5s','z-index':'-1','background-color':'rgba(0,0,0,0'});
  },1800);
});

// inputs - only for numbers
$('.make-lodgement__pay-block input').keypress(function(e){
  e = e || event;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  var chr = getChar(e);
  // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
  if (chr == null) return;
  if (chr < '0' || chr > '9') {
    return false;
  }
});

/* ↑↑↑ /BEM-blocks ↑↑↑ */

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function rewriteParlayLists() {
  //

  // прибирати повідомлення, якщо воно є
  $('.info-message').css({'right':'-290px'});

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

          if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
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
        } else {
          //біржа не працює
          if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
            showInfoMessage(exchangeDontWork[0]);
          } else {
            showInfoMessage(exchangeDontWork[1]);
          }
        }
      } else {
        //біржа не працює
        if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
          showInfoMessage(exchangeDontWork[0]);
        } else {
          showInfoMessage(exchangeDontWork[1]);
        }
      }

    }
  } else if ( parlayType == 'long' ) {

    // очистити старий список ставок
    $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder').empty();



    // контроль для акцій: контроль, чи працює поставник котирувань - ajax, якщо так - перевірка, чи час закриття припадає на робочий час
    if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
        $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions' ) {

      var isLongParlayListNotEmptyMarker = false;

      if ( isActionsTradingPossible() ) {

        var endTime = new Date(+new Date( new Date() ) + 24*60*60*1000); // 86400000

        for (var i = 0; i < 31; i++) {

          endTime = new Date(endTime);

          var endYear = endTime.getUTCFullYear();
          if (endYear < 10) endYear = '0' + endYear;
          var endDate = endTime.getUTCDate();
          if (endDate < 10) endDate = '0' + endDate;
          var endMonth = endTime.getUTCMonth() + 1;
          if (endMonth < 10) endMonth = '0' + endMonth;
          var endHours = endTime.getHours();
          if (endHours < 10) endHours = '0' + endHours;
          var endMinutes = endTime.getUTCMinutes();
          if (endMinutes < 10) endMinutes = '0' + endMinutes;
          var endSeconds = endTime.getUTCSeconds();
          if (endSeconds < 10) endSeconds = '0' + endSeconds;

          var endTimeString = endYear    + '-' +
                              endMonth   + '-' +
                              endDate;

          var timeToEndInMS = +endTime - +new Date();

          var url = 'http://god.ares.local/api/Hol/GetDate?value=' + endTimeString; // на роботі (локалка)
          // var url = 'http://62.216.34.146:9000/api/Hol/GetDate?value=' + endTimeString; // вдома (інет)

          if ( isActionsTradingPossible(url, endTime) ) {
            $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                             .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="'
                                                              + timeToEndInMS + '">'
                                                              + endTimeString + '</div>');
            isLongParlayListNotEmptyMarker = true;
          }

          endTime = +new Date( endTime ) + 24*60*60*1000;

        }

        // якщо після циклу не відмалювалася жодна ставка - попап, що ставки не можливі
        if ( !isLongParlayListNotEmptyMarker ) {
          if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
            showInfoMessage(noAccessibleParlay[0]);
          } else {
            showInfoMessage(noAccessibleParlay[1]);
          }
        }

      } else {
        //біржа не працює
        if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
          showInfoMessage(exchangeDontWork[0]);
        } else {
          showInfoMessage(exchangeDontWork[1]);
        }
      }

    } else {
      // якщо не акції
      var startTime = new Date();
      var startUTCTime = new Date( startTime.setHours( startTime.getUTCHours() ) );

      var endTime = +new Date( startUTCTime ) + 24*60*60*1000;

      for (var i = 0; i < 30; i++) {

        endTime = new Date(endTime);

        var endYear = endTime.getFullYear();
        if (endYear < 10) endYear = '0' + endYear;
        var endDate = endTime.getDate();
        if (endDate < 10) endDate = '0' + endDate;
        var endMonth = endTime.getMonth() + 1;
        if (endMonth < 10) endMonth = '0' + endMonth;

        var endTimeString = endYear  + '-' +
                            endMonth + '-' +
                            endDate;

        var timeToEndInMS = endTime - +new Date( startUTCTime );

        $('.parlay-slider__item[data-parlayType="long"]').find('.parlay-slider__parlay-choise-btn-holder')
                                                         .append('<div class="parlay-slider__parlay-choise-btn" onclick="deActivationParlayBtns(this)" data-timeToEndInMS="'
                                                          + timeToEndInMS + '">'
                                                          + endTimeString + '</div>');

        endTime = +new Date( endTime ) + 24*60*60*1000;
      }

    }

  } else if ( parlayType == 'normal' ) {
    // побудова списку можливих ставок
    // контроль можливості торгівлі акціями (торги на них не цілодобові)
    if( $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'акции' ||
        $( $('.slick-current').children('.wares-slider__item-header')[0] ).text().toLowerCase() == 'actions' ) {

        // очистити старий список ставок
        $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

        // перевірка на державні свята США / короткі робочі дні в США
        var url = 'http://god.ares.local/api/Hol/GetDate?value=' + currentUTCDateString; // на роботі (локалка)
        // var url = 'http://62.216.34.146:9000/api/Hol/GetDate?value=' + currentUTCDateString; // вдома (інет)

        if ( isActionsTradingPossible(url, currentDateTime) ) {
          startTime  = tempUTCHour + ':' + tempUTCMinutes;
          finishTime = '20:00';
          createListOfNormalParlay (startTime, finishTime, currentDateTime);
        } else {
          //біржа не працює
          if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
            showInfoMessage(exchangeDontWork[0]);
          } else {
            showInfoMessage(exchangeDontWork[1]);
          }
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

  $( $('#investment-result') ).text(resultValue);
  /* ↑↑↑ /investment calculator ↑↑↑ */

  /* ↓↓↓ activation/deactivation btns ↓↓↓ */
  if ( inputValue > 4 && parlayTime != 0 ) {
    $('.parlay-btns__cover').css('display','none');
  } else {
    $('.parlay-btns__cover').css('display','flex');
  }
  /* ↑↑↑ /activation/deactivation btns ↑↑↑ */
}

function createListOfNormalParlay (startTime, finishTime, currentDateTime) {
  // видаляє старий список нормальних ставок (якщо він є)
  // якщо біржа закрита - виводить повідомлення
  // циклом формує список можливих нормальних ставок з інтервалом у півгодини

  // спочатку потрібно видалити старий список, якщо він є
  $('.parlay-slider__item[data-parlayType="normal"]').find('.parlay-slider__parlay-choise-btn-holder').empty();

  // якщо startTime = finishTime = false - торги не можливі
  if ( startTime == false ) {
    //біржа не працює
    if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
      showInfoMessage(exchangeDontWork[0]);
    } else {
      showInfoMessage(exchangeDontWork[1]);
    }
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
  var isActions = arguments[2];
  var answer;
  $.ajax({
    url     : 'http://god.ares.local/api/status/get',
    async   : false,
    success :  function ( data ) {
                if (!!data == true) {
                  answer = true;
                } else {
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
    success : function ( data ) {
                if ( isActions == 'noActions' ) {
                  answer = true
                } else {
                  if ( data == 1 ) { // святковий день
                    answer = false
                  }
                  if ( data == 0 ) { // не святковий день
                    // перевірка на вихідний день (субота/неділя)
                    if ( dateTime.getUTCDay() == 6 || dateTime.getUTCDay() == 0 ) { // вихідний день (субота/неділя)
                      answer = false
                    } else { // робочий день - 13:30-20:00 по UTC noActions
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
              },
    error   : function () {
                answer = false;
              }
  })
  return answer
}

function deactivationParlays(){
  var parlaySliderTop  = getCoords( $('.parlay-slider__item-choice-field')[0] ).top;
  var parlaySliderLeft = getCoords( $('.parlay-slider')[0] ).left;

  $('.parlay-slider-deactivation-panel').css({
                                              'top'     : parlaySliderTop,
                                              'left'    : parlaySliderLeft,
                                              'display' : 'flex'
  });
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top    : box.top + pageYOffset,
    bottom : box.bottom + pageYOffset,
    left   : box.left + pageXOffset,
    right  : box.right + pageXOffset,
    height : box.bottom - box.top
  };
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

// made by waldteufel@ukr.net