// $(document).ready(function(){

  $( "#datepicker" ).datepicker();

  /* ↓↓↓ field switch ↓↓↓ */
  $('.act-btn').click(function(){
  	// buttons
  	$('.act-btn').addClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');
  });

  $('.active-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').addClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');
  });

  $('.history-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').addClass('work-change-btn_active');
  });
  /* ↑↑↑ /field switch ↑↑↑ */


  /* ↓↓↓ wares change ↓↓↓ */
  // open
  $('.wares-change__changelink').click(function() {
    var tempArr = $('.wares-change__item');
    for (var i = 0; i < tempArr.length; i++) {
      $(tempArr[i]).css({'left':'0px'});
    }
  });

  // choice & close
  $('.wares-change__item').click(function(){

    // видаляємо "змінити"
    $('.wares-change__item:first-of-type').children('a.wares-change__changelink').remove();

    // піднімаємо елемент угору, додаємо йому "змінити"
    $(this).css({'top':'0px','cursor':'default','background-image':'none','background-color':'dodgerblue'})
           .append('<a class="wares-change__changelink" onclick=openMeny()>изменить</a>');

    // анімуємо зникнення
    var tempArr = $('.wares-change__item');
    var tempTime = tempArr.length * .3 * 1000;
    for (var i = 0; i < tempArr.length; i++) {
      if (this == tempArr[i]) continue;
      $(tempArr[i]).css({'left':'-250px'});
    }

    // після анімації перерозташовуємо елементи
    var timer = setTimeout(function() {

      // знаходимо кнопку із елементом "змінити"
      for (var i = 0; i < tempArr.length; i++) {
        if ( $(tempArr[i]).children('a.wares-change__changelink').length != 0 ) {
          var THIS = i;
          break
        }
      }

      // усі елементи перед ставимо позаду
      for (var i = THIS; i >= 0; i--) {
        $(tempArr[THIS]).after(tempArr[i]);
      }
    }, tempTime);
  });

  /* ↑↑↑ /wares change ↑↑↑ */
// });

/* ↓↓↓ FUNCTION DECLARATIONS ↓↓↓ */
function openMeny() {
  var tempArr = $('.wares-change__item');
  setTimeout(function(){
                        for (var i = 0; i < tempArr.length; i++) {
                          $(tempArr[i]).attr({'style':'left: 0px'});
                        }
                       },1);
}
/* ↑↑↑ /FUNCTION DECLARATIONS ↑↑↑ */