$(document).ready(function(){

  $( "#datepicker" ).datepicker();

  /* ↓↓↓ field switch ↓↓↓ */
  $('.act-btn').click(function(){
  	// buttons
  	$('.act-btn').addClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');

  	//fields
  	$('.act-btn-field').css({'transition':'.5s','opacity':'1'}).css({'z-index':'1'});
  	$('.active-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  	$('.history-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  });

  $('.active-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').addClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');

  	//fields
  	$('.act-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  	$('.active-btn-field').css({'transition':'.5s','opacity':'1'}).css({'z-index':'1'});
  	$('.history-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  });

  $('.history-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').addClass('work-change-btn_active');

  	//fields
  	$('.act-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  	$('.active-btn-field').css({'transition':'.5s','opacity':'0'}).css({'z-index':'-1'});
  	$('.history-btn-field').css({'transition':'.5s','opacity':'1'}).css({'z-index':'1'});
  });
  /* ↑↑↑ /field switch ↑↑↑ */


  /* ↓↓↓ ACCORDION ↓↓↓ */
  var arrOfAcCon = $('.accordion-content');
  var arrOfAcBtn = $('.accordion-btn');

  $(arrOfAcBtn).click(function(){

    //where was click
    outer:
    for (var i = 0; i < arrOfAcBtn.length; i++) {
      if (arrOfAcBtn[i] == this) {
        var temp = i;
        break outer;
      }
    }

    //open accordion content + button animation
    if (arrOfAcCon[temp].isOpen) {
      $(arrOfAcCon[temp]).css({'transition':'height .5s','height':'0px'}).css({'border-width':'0px'});
      arrOfAcCon[temp].isOpen = false;

      $(arrOfAcBtn[temp]).children('.accordion-btn__2-line').css({'transition':'width .5s','width':'0px'});
      setTimeout(function () {
        $(arrOfAcBtn[temp]).children('.accordion-btn__1-line').css({'height':'16px'});
        $(arrOfAcBtn[temp]).children('.accordion-btn__2-line').css({'width':'16px'})
      }, 500);
      $(arrOfAcBtn[temp]).removeClass('accordion-btn_active');

      return
    }

    if (!arrOfAcCon[temp].isOpen) {
      for (var i = 0; i < arrOfAcCon.length; i++) {
        $(arrOfAcCon[i]).css({'transition':'height .5s','height':'0px'}).css({'border-width':'0px'});
        arrOfAcCon[i].isOpen = false;

        $(arrOfAcBtn[i]).children('.accordion-btn__1-line').css({'height':'16px'});
        $(arrOfAcBtn[i]).children('.accordion-btn__2-line').css({'width':'16px'})
        $(arrOfAcBtn[i]).removeClass('accordion-btn_active');
      }

      $(arrOfAcCon[temp]).css({'border-width':'1px'}).css({'transition':'height .5s','height':'214px'});
      arrOfAcCon[temp].isOpen = true;

      $(arrOfAcBtn[temp]).children('.accordion-btn__1-line').css({'transition':'height .5s','height':'0px'});
      $(arrOfAcBtn[temp]).children('.accordion-btn__2-line').css({'transition':'width .5s','width':'0px'});
      setTimeout(function () {
        $(arrOfAcBtn[temp]).children('.accordion-btn__2-line').css({'width':'16px'})
      }, 500);
      $(arrOfAcBtn[temp]).addClass('accordion-btn_active');
    }

  });
  /* ↑↑↑ /ACCORDION ↑↑↑ */

});