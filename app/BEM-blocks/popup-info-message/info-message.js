$(document).ready(function(){

  $('.tempBTN2').click(function(){
  	$('.info-message').css({'right':'0px'});

  	var closeInfoPopup = setTimeout(function(){
  		$('.info-message').css({'right':'-290px'});
  	},4000);

	  $('.info-message__close-btn').click(function(){
	  	$('.info-message').css({'right':'-290px'});
	  	clearTimeout(closeInfoPopup);
	  });

	  $('.info-message').mouseenter(function(){
	  	clearTimeout(closeInfoPopup);
	  });

	  $('.info-message').mouseleave(function(){
	  	$('.info-message').css({'right':'-290px'});
	  });
  });

});