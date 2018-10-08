function showInfoMessage(message) {

  $('p.info-message__body').text(message);
	$('.info-message').css({'right':'0px'});

  $('.info-message__close-btn').click(function(){
  	$('.info-message').css({'right':'-290px'});
  });

}