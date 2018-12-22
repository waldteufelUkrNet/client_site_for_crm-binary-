$(document).ready(function(){

  // поява
  $('.central-part__btn').click(function(){

    $('.make-lodgement__positioning-wrapper').css({'z-index':'8888','background-color':'rgba(0,0,0,.8'});

    $('.make-lodgement').css({'transition':'top .2s','top':'50%'});

    setTimeout(function(){
      $('.make-lodgement').css({'transition':'width .3s','width':'90%'});
    },200);

    setTimeout(function(){
      $('.make-lodgement').css({'transition':'height .3s','height':'162px'});
      $('.make-lodgement__pay-system').css({'display':'block'});
    },500);

    setTimeout(function(){
      $('.make-lodgement__pay-system').css({'transition':'.3s','left':'0px'});
    },800);

    setTimeout(function(){
      $('.make-lodgement__close-btn').css({'transition':'.5s','transform':'rotate(180deg)'});
      $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({'transition':'width .5s','width':'24px'});
    },1100);

    setTimeout(function(){
      $('.make-lodgement__triangle').css({'transition':'.3s','right':'8px'});
    },1600);
  });

// кліки
$('.make-lodgement__pay-system:first').click(function () {
    $('.make-lodgement__triangle').css({ 'transition': '.5s', 'top': '44px' });
    $('.make-lodgement').css({ 'transition': 'height .3s', 'height': '250px' });
    $('.make-lodgement-MasterCard').css({ 'transition': '.5s', 'height': '80px' });
    $('.make-lodgement-VISA').css({ 'transition': '.5s', 'height': '0px' });
});

$('.make-lodgement__pay-system:last').click(function () {
    $('.make-lodgement__triangle').css({ 'transition': '.5s', 'top': '104px' });
    $('.make-lodgement').css({ 'transition': 'height .3s', 'height': '250px' });
    $('.make-lodgement-VISA').css({ 'transition': '.5s', 'height': '80px' });
    $('.make-lodgement-MasterCard').css({ 'transition': '.5s', 'height': '0px' });
});

  // закриття
  $('.make-lodgement__close-btn').click(function(){

    $('.make-lodgement-VISA').css({'transition':'.3s','height':'0px'});
    $('.make-lodgement-MasterCard').css({'transition':'.3s','height':'0px'});
    $('.make-lodgement').css({'transition':'height .3s','height':'162px'});
    $('.make-lodgement__triangle').css({'transition':'.3s','right':'-12px'});

    setTimeout(function(){
      $('.make-lodgement__triangle').css({'top':'74px'});
    },300);

    setTimeout(function(){
      $('.make-lodgement__pay-system:even').css({'transition':'.3s','left':'120%'});
      $('.make-lodgement__pay-system:odd').css({'transition':'.3s','left':'-120%'});
    },400);

    setTimeout(function(){
      $('.make-lodgement__close-btn').css({'transition':'.5s','transform':'rotate(0deg)'});
      $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({'transition':'width .5s','width':'0px'});
    },700);

    setTimeout(function(){
      $('.make-lodgement').css({'transition':'height .3s','height':'20px'});
      $('.make-lodgement__pay-system').css({'display':'none'});
    },1200);

    setTimeout(function(){
      $('.make-lodgement').css({'transition':'width .3s','width':'120px'});
    },1500);

    setTimeout(function(){
      $('.make-lodgement').css({'transition':'top .2s','top':'-10%'});
      $('.make-lodgement__positioning-wrapper').css({'transition':'background-color .5s','z-index':'-1','background-color':'rgba(0,0,0,0'});
    },1800);
  });

  // inputs - only for numbers and dots
  $('.make-lodgement__pay-block input').keypress(function(e){
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
      return false;
    }
    function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
      }
      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
      }
      return null; // специальная клавиша
    }
  });

});