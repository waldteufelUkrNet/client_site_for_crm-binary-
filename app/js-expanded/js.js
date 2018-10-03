// $(document).ready(function(){

  $( '.wares-slider' ).slick();
  $( '#history-slider, #deposit-slider, #withdrawal-slider' ).slick({
    centerMode: true,
    variableWidth: true
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

  /* ↓↓↓ wares change ↓↓↓ */
  $('.wares-change__item').click(function(e) {
    //console.log("e.currentTarget.tagName:", e.currentTarget.tagName, "; e.target.tagName:", e.target.tagName);

    // open
    if ( e.target.tagName == 'A' ) {
      // console.log('ckick on a');
      $('.wares-change__item').css({'left':'0px'});
    // choice & close
    } else if ( e.target.tagName == 'LI' || e.target.tagName == 'SPAN' ) {
      // console.log('ckick on li');
      var thisEl = this;

      var tempObj = $('.wares-change__item');
      for (var i = 0; i < tempObj.length; i++) {
        if ( tempObj[i] == this ) {
          var I = i;
        }
      }
      // obj -> arr
      var tempArr = [];
      for ( var i = 0; i < tempObj.length; i++ ) {
        if ( i == I ) continue;
        tempArr.push(tempObj[i])
      }
      // part of arr before this-element
      var tempPart1 = tempArr.slice(0,I);

      // delete and add "изменить"-link
      $('li.wares-change__item a.wares-change__changelink').remove();
      $(thisEl).css({'top':'0px'})
               .append('<a class="wares-change__changelink">изменить</a>');

      $(tempArr).css({'left':'-250px'});
      setTimeout(function(){
        var tempVal = 50;
        for ( var i = 0; i < tempArr.length; i++ ) {
          var tempTop = tempVal + 'px';
          $(tempArr[i]).css({'top':tempTop});
          tempVal += 50;
        }
        $(thisEl).after(tempPart1);
      },tempArr.length * .2 * 1000);

    }

  });
  /* ↑↑↑ /wares change ↑↑↑ */

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

/* ↓↓↓ FUNCTION DECLARATIONS ↓↓↓ */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/* ↑↑↑ /FUNCTION DECLARATIONS ↑↑↑ */