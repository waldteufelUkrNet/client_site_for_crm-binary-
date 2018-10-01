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


/* ↓↓↓ investment calculator ↓↓↓ */
$('#investment-input').bind('blur keyup', function(event) {
  var inputValue   = +$('#investment-input').val(),
      percentValue = +$('#investment-percent').text();

  var resultValue  = (inputValue * percentValue)/100 + inputValue;

  if ( !isNumeric(resultValue) ) {
    resultValue = 'ошибка ввода!';
    $( $('#investment-input') ).val('').css({'border':'1px solid red'});
  } else {
    $( $('#investment-input') ).css({'border':'none'});
  }

  $( $('#investment-result') ).text(resultValue);

});
/* ↑↑↑ /investment calculator ↑↑↑ */

/* ↓↓↓ FUNCTION DECLARATIONS ↓↓↓ */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/* ↑↑↑ /FUNCTION DECLARATIONS ↑↑↑ */