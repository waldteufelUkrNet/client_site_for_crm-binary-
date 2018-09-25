$(document).ready(function(){
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
});