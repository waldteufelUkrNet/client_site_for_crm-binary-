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
    var tempArr = $('.wares-change__item'),
        tempVal = 0,
        tempTransDelay;
    for (var i = 0; i < tempArr.length; i++) {
      tempTransDelay = tempVal + 's';
      $(tempArr[i]).css({'left':'0px'});
      tempVal = tempVal + 0.2;
    }
  });

  // choice & close
  $('.wares-change__item:not(:first-of-type)').click(function(){

    // видаляємо "змінити"
    $('.wares-change__item:first-of-type').children('a.wares-change__changelink').remove();

    // піднімаємо елемент угору, додаємо йому "змінити"
    $(this).css({'top':'0px','cursor':'default','background-image':'none','background-color':'dodgerblue'})
           .append('<a class="wares-change__changelink" onclick=reorder(this)>изменить</a>');

    // в циклі даємо елементам затримку, анімуємо
    var tempArr = $('.wares-change__item'),
        tempVal = 0,
        tempTransDelay;
    for (var i = 0; i < tempArr.length; i++) {
      if (this == tempArr[i]) continue;
      tempTransDelay = tempVal + 's';
      $(tempArr[i]).css({'left':'-200px'});
      tempVal = tempVal + 0.2;
    }

    // після анімації перерозташовуємо елементи
    var timer = setTimeout(function(){

      for (var i = 0; i < tempArr.length; i++) {
        if ( $(tempArr[i]).children('a.wares-change__changelink').length != 0 ) {
          break
        } else {
          console.log( $(tempArr[i]).css('top') );
        }
      }
    }, 1200);
  });

  /* ↑↑↑ /wares change ↑↑↑ */
// });

function reorder(THIS){
  // var tempEl = $(THIS).parents('li.wares-change__item')[0];
  // var tempArr = $('.wares-change__item');

  // for (var i = 0; i < tempArr.length; i++) {
  //   if ( tempArr[i] != tempEl ) {
  //     $(tempArr[i]).css({'top':tempTop});
  //   } else continue
  // }
}