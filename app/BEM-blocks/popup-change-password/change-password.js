// change-password
// open
$('.tempBTN3').click(function(){
  // видалити старі підказки, якщо вони були
  $('#change-password-validation-label, #change-password-input-validation, #new-password-validation-label, #new-password-input-validation').remove();
  $('#change-password-input, #new-password-input').val('');
  // проанімувати
  $('.change-password__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.change-password').css({'left':'0%'});
});
// close
$('.change-password__btn-close, .change-password__close-btn').click(function(){
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
  if ( $('#change-password-input').val().length < 6 ) {
    e.preventDefault();

    if ( !$('#change-password-input-validation')[0] ) {
      if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
        var tempLang = min6Symb[0]
      } else {
        var tempLang = min6Symb[1]
      }

      $('#change-password-input').after('<label id="change-password-validation-label"></label>\
                                         <div id="change-password-input-validation">'
                                             + tempLang +
                                         '</div>');
      $('#change-password-input-validation').css('height','30px');
    }

  } else if ( $('#change-password-input').val() != $('#new-password-input').val() ) {
    e.preventDefault();

    if ( !$('#new-password-input-validation')[0] ) {
      if ( $('#language-span').text().toLowerCase() == 'язык:' ) {
        var tempLang = notSamePass[0]
      } else {
        var tempLang = notSamePass[1]
      }
      $('#new-password-input').after('<label></label>\
                                      <div id="new-password-input-validation">'
                                          + tempLang +
                                      '</div>');
      $('#new-password-input-validation').css('height','30px');
    }

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
$('#change-password-input').keyup(function(e) {
  if ( $('#change-password-input').val().length >= 6 ) {
    $('#change-password-input-validation').css('height','0px');
    setTimeout(function(){
      $('#change-password-validation-label, #change-password-input-validation').remove();
    }, 500);
  }
});
$('#new-password-input').keyup(function(e) {
  if ( $('#change-password-input').val() != $('#new-password-input').val() ) {
    $('#new-password-input-validation').css('height','0px');
    setTimeout(function(){
      $('#new-password-validation-label, #new-password-input-validation').remove();
    }, 500);
  }
});