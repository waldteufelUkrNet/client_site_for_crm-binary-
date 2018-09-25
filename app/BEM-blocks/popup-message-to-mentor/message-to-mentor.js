$(document).ready(function(){
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
});