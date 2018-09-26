$(document).ready(function(){

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
  $('.wares-change__changelink').click(function(){ console.log(1);
    var tempArr = $('.wares-change__item'),
        tempVal = 0,
        tempTransDelay;
    for (var i = 0; i < tempArr.length; i++) {
      tempTransDelay = tempVal + 's';
      $(tempArr[i]).css({'left':'0px'});
      tempVal = tempVal + 0.2;
    }
  });
  /* ↑↑↑ /wares change ↑↑↑ */
});
//          transition: background-color .3s ease 0s, left .3s ease 0s;