// parlay-confirmation
// open
$('.tempBTN4').click(function(){

  $('.parlay-confirmation__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.parlay-confirmation').css({'left':'0%'});
});

// close
$('.parlay-confirmation__btn-no, .parlay-confirmation__close-btn').click(function(){
  $('.parlay-confirmation').css({'left':'110%'});
  var tempParlayConfirmationWidth = $('.parlay-confirmation__holder').css('width');
  var tempParlayConfirmationPadding = $('.parlay-confirmation__holder').css('padding-left');
  setTimeout(function(){
    $('.parlay-confirmation__holder').css({'width':'0px','padding':'0px'});
    $('.parlay-confirmation__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.parlay-confirmation').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.parlay-confirmation__holder').css({'width':tempParlayConfirmationWidth,'padding':tempParlayConfirmationPadding});
  },1000);
});
// do something
$('.parlay-confirmation__btn-yes').click(function(){
  console.log('do something');

  $('.parlay-confirmation').css({'left':'110%'});
  var tempParlayConfirmationWidth = $('.parlay-confirmation__holder').css('width');
  var tempParlayConfirmationPadding = $('.parlay-confirmation__holder').css('padding-left');
  setTimeout(function(){
    $('.parlay-confirmation__holder').css({'width':'0px','padding':'0px'});
    $('.parlay-confirmation__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.parlay-confirmation').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.parlay-confirmation__holder').css({'width':tempParlayConfirmationWidth,'padding':tempParlayConfirmationPadding});
  },1000);
});