/* ↓↓↓ адаптивка ↓↓↓ */
// відкрити/закрити меню
var isNavigationOpen = false;
$('.navigation__btn').click(function() {
  if (!isNavigationOpen) {
    // if ( $('body').width() < 576 || $('body').width() > 320 && $('body').width() < 992 && $('body').height() > 590 && $('body').height() < 660
    //                              || $('body').width() > 992 && $('body').height() > 590 && $('body').height() < 600 ) {
    if ( $('body').width() < 576 ) {
      $('.navigation').css('height', '170px');
    } else {
      $('.navigation').css('height', '240px');
    }
    $('.navigation__btn-rotor:eq(0) svg').css('transform','rotate(180deg)');
    $('.navigation__btn-rotor:eq(1) svg').css('transform','rotate(-180deg)');
    $('.navigation__items').removeClass('navigation__items_active');
    isNavigationOpen = true;
  } else {
    closeNavigation()
  }
});
// вибрати котировку
var isLeftColumnOpen = false;
$('.navigation__items:eq(0)').click(function() {
  if (!isLeftColumnOpen) {
    $('.navigation__items').removeClass('navigation__items_active');
    $(this).addClass('navigation__items_active');
    $('.left-column').css('left','0px');
    $('.right-column').css('right','-200px');
    isRightColumnOpen = false;
    isLeftColumnOpen = true;
  } else {
    $('.left-column').css('left','-200px');
    $('.navigation__items').removeClass('navigation__items_active');
    isLeftColumnOpen = false;
  }
});
// зробити ставку
var isRightColumnOpen = false;
$('.navigation__items:eq(1)').click(function() {
  if (!isRightColumnOpen) {
    $('.navigation__items').removeClass('navigation__items_active');
    $(this).addClass('navigation__items_active');
    $('.right-column').css('right','0px');
    $('.left-column').css('left','-200px');
    isLeftColumnOpen = false;
    isRightColumnOpen = true;
  } else {
    $('.right-column').css('right','-200px');
    $('.navigation__items').removeClass('navigation__items_active');
    isRightColumnOpen = false;
  }
});
// активні
$('.navigation__items:eq(2)').click(function() {
  $('.navigation__items').removeClass('navigation__items_active');
  $(this).addClass('navigation__items_active');
  closeNavigation();
  $('.slider-area__slider').css({ 'display': 'none' });
  $( $('.slider-area__slider')[0] ).css({ 'display': 'block' });
});
// історія
$('.navigation__items:eq(3)').click(function() {
  $('.navigation__items').removeClass('navigation__items_active');
  $(this).addClass('navigation__items_active');
  closeNavigation();
  $('.slider-area__slider').css({ 'display': 'none' });
  $( $('.slider-area__slider')[1] ).css({ 'display': 'block' });
});
// депозити
$('.navigation__items:eq(4)').click(function() {
  $('.navigation__items').removeClass('navigation__items_active');
  $(this).addClass('navigation__items_active');
  closeNavigation();
  $('.slider-area__slider').css({ 'display': 'none' });
  $( $('.slider-area__slider')[2] ).css({ 'display': 'block' });
});
// виводи
$('.navigation__items:eq(5)').click(function() {
  $('.navigation__items').removeClass('navigation__items_active');
  $(this).addClass('navigation__items_active');
  closeNavigation();
  $('.slider-area__slider').css({ 'display': 'none' });
  $( $('.slider-area__slider')[3] ).css({ 'display': 'block' });
});

function closeNavigation() {
  if ( $('body').width() < 576 || $('body').width() > 320 && $('body').width() < 992 && $('body').height() > 590 && $('body').height() < 660
                               || $('body').width() > 992 && $('body').height() > 590 && $('body').height() < 600 ) {
    $('.navigation').css('height', '50px');
  } else {
    $('.navigation').css('height', '60px');
  }
  $('.navigation__btn-rotor svg').css('transform','rotate(0deg)');
  $('.left-column').css('left','-200px');
  $('.right-column').css('right','-200px');
  isNavigationOpen  = false;
  isLeftColumnOpen  = false;
  isRightColumnOpen = false;
}
/* ↑↑↑ /адаптивка ↑↑↑ */