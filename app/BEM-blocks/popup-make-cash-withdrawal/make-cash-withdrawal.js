// open
$('.tempBTN2').click(function(){
  $('.make-cash-withdrawal__input').val('');
  $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'8888','background-color':'rgba(0,0,0,.8)'});
  $('.make-cash-withdrawal').css({'left':'0%'});
});
// close
$('.make-cash-withdrawal__btn-close, .make-cash-withdrawal__close-btn').click(function(){
  $('.make-cash-withdrawal').css({'left':'110%'});
  var tempMakeCashWithdrawalWidth = $('.make-cash-withdrawal__holder').css('width');
  var tempMakeCashWithdrawalPadding = $('.make-cash-withdrawal__holder').css('padding-left');
  setTimeout(function(){
    $('.make-cash-withdrawal__holder').css({'width':'0px','padding':'0px'});
    $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
    $('.make-cash-withdrawal').css({'left':'-110%'});
  },500);
  setTimeout(function(){
    $('.make-cash-withdrawal__holder').css({'width':tempMakeCashWithdrawalWidth,'padding':tempMakeCashWithdrawalPadding});
  },1000);
});
// validation
$('.make-cash-withdrawal__btn-send').click(function(e){
  if ( $('.make-cash-withdrawal__input').val() == '' ) {
    e.preventDefault();
  } else {
    $('.make-cash-withdrawal').css({'left':'110%'});
    var tempMakeCashWithdrawalWidth = $('.make-cash-withdrawal__holder').css('width');
    var tempMakeCashWithdrawalPadding = $('.make-cash-withdrawal__holder').css('padding-left');
    setTimeout(function(){
      $('.make-cash-withdrawal__holder').css({'width':'0px','padding':'0px'});
      $('.make-cash-withdrawal__positioning-wrapper').css({'zIndex':'-1','background-color':'rgba(0,0,0,0)'});
      $('.make-cash-withdrawal').css({'left':'-110%'});
    },500);
    setTimeout(function(){
      $('.make-cash-withdrawal__holder').css({'width':tempMakeCashWithdrawalWidth,'padding':tempMakeCashWithdrawalPadding});
    },1000);
  }
});
// input - only for numbers
$('.make-cash-withdrawal__input').keypress(function(e){
  e = e || event;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  var chr = getChar(e);
  // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
  if (chr == null) return;
  if (chr < '0' || chr > '9') {
    return false;
  }
});