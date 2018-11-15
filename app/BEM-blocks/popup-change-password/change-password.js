// change-password
// open
$('.tempBTN3').click(function(){
  $('.change-password__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.change-password').css({'left':'0%'});
});
// close
$('.change-password__btn-close, .change-password__close-btn').click(function() {
  $('.change-password').css({'left':'110%'});
  var tempChangePasswordWidth = $('.change-password__holder').css('width');
  var tempChangePasswordPadding = $('.change-password__holder').css('padding-left');
  setTimeout(function(){
    $('.change-password__holder').css({'width':'0px','padding':'0px'});
    $('.change-password__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.change-password').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.change-password__holder').css({'width':tempChangePasswordWidth,'padding':tempChangePasswordPadding});
  },1000);
});
// validation
$('.change-password__btn-send').click(function(e){
  if ( $('.change-password__input').val() == '' ) {
    e.preventDefault();
  } else {
    $('.change-password').css({'left':'110%'});
    var tempChangePasswordWidth = $('.change-password__holder').css('width');
    var tempChangePasswordPadding = $('.change-password__holder').css('padding-left');
    setTimeout(function(){
      $('.change-password__holder').css({'width':'0px','padding':'0px'});
      $('.change-password__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
      $('.change-password').css({'left':'-110%'});
    },500);
    setTimeout(function(){
      $('.change-password__holder').css({'width':tempChangePasswordWidth,'padding':tempChangePasswordPadding});
    },1000);
  }
});