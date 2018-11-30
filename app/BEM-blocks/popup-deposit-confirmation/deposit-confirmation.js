/* ↓↓↓ BEM-block: deposit-confirmation ↓↓↓ */
// open
$('.tempBTN3').click(function () {
  // $('.make-cash-withdrawal__input').val('');
  $('.deposit-confirmation__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
  $('.deposit-confirmation').css({ 'left': '0%' });
});
// close
$('.deposit-confirmation__close-btn, .deposit-confirmation__btn-no').click(function () {
  $('.deposit-confirmation').css({ 'left': '110%' });
  closeDepositConfirmationPopup()
});

$('.deposit-confirmation__btn-yes').click(function(){
  // do something and then:
  alert("do something");
  closeDepositConfirmationPopup()
});

function closeDepositConfirmationPopup() {
  var tempDepositConfirmationWidth = $('.make-cash-withdrawal__holder').css('width');
  var tempDepositConfirmationPadding = $('.make-cash-withdrawal__holder').css('padding-left');
  setTimeout(function () {
    $('.deposit-confirmation__holder').css({ 'width': '0px', 'padding': '0px' });
    $('.deposit-confirmation__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
    $('.deposit-confirmation').css({ 'left': '-110%' });
  }, 500);
  setTimeout(function () {
    $('.deposit-confirmation__holder').css({ 'width': tempDepositConfirmationWidth, 'padding': tempDepositConfirmationPadding });
  }, 1000);
}
/* ↑↑↑ /BEM-block: deposit-confirmation ↑↑↑ */