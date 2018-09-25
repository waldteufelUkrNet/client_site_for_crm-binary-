$(document).ready(function() {

  //open
  $('#profile-editor').click(function() {
    $('.profile-editor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.profile-editor').css({ 'left': '0%' });

    // // ↓↓↓ close menu ↓↓↓
    // $('.menu-btn__1-line').css({'transition':'.5s','transform':'rotate(0deg)'});
    // $('.menu-btn__3-line').css({'transition':'.5s','transform':'rotate(0deg)'});
    // $('.menu-btn__2-line').css({'transition-delay':'.5s','transition-duration':'.5s','opacity':'1'});
    // setTimeout(function(){
    //   $('.menu-btn__1-line').css({'transition-duration':'.5s','top':'0px'});
    //   $('.menu-btn__3-line').css({'transition-duration':'.5s','top':'18px'});
    // },500);
    // var isMenuOpen = false;
    // var isClickAble = true;
    // var arrOfLinks = $('.menu-list-a');
    // var temp1 = 0;
    // var temp2 = '0s';
    // for (var i = 0; i < arrOfLinks.length; i++) {
    //   $(arrOfLinks[i]).css({'transition':'.2s','transition-delay':temp2,'left':'100%'});
    //   temp1 += 0.1;
    //   temp2 = temp1 + 's';
    // }
    // setTimeout(function(){
    //   $('.menu').css({'border-width':'0px'})
    //     .css({'transition':'.5s','height':'0px'});
    // },600);
    // // ↑↑↑ close menu ↑↑↑
  });

  // simple close
  $('.profile-editor__close-btn').click(function() {
      closeProfilePopup();
  });

  // ↓↓↓ phone-input - number selection ↓↓↓
  $("#prof-phone").keypress(function(e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);

    if(!$("#prof-phone").val()) {
      if(chr != 1 && chr != 2 && chr != 3 &&
         chr != 4 && chr != 5 && chr != 6 &&
         chr != 7 && chr != 8 && chr != 9 &&
         chr != 0 && chr != '+' && e.keyCode != 8) {
        return false
      }
    } else {
      if(chr != 1 && chr != 2 && chr != 3 &&
         chr != 4 && chr != 5 && chr != 6 &&
         chr != 7 && chr != 8 && chr != 9 &&
         chr != 0 && e.keyCode != 8) {
        return false
      }
    }
  });
  // ↑↑↑ phone-input - number selection ↑↑↑

  // ↓↓↓ validation and close ↓↓↓
  $('.profile-editor__btn').click(function(e) {

    if ($('#prof-fname').val().length < 2) {
      e.preventDefault();
      $('#prof-fname-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
      return
    }

    if ($('#prof-lname').val().length < 2) {
      e.preventDefault();
      $('#prof-lname-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
      return
    }

    if ($('#prof-country').val().length < 3) {
      e.preventDefault();
      $('#prof-country-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
      return
    }

    if ($('#prof-phone').val().length < 13) {
      e.preventDefault();
      $('#prof-phone-info').css({'transition':'height .5s','height':'30px', 'margin-top':'10px'});
      return
    }
    closeProfilePopup();
  });

  $('#prof-fname').keyup(function(){
    if ($('#prof-fname').val().length >= 2) {
      $('#prof-fname-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
    }
  });

  $('#prof-lname').keyup(function(){
    if ($('#prof-lname').val().length >= 2) {
      $('#prof-lname-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
    }
  });

  $('#prof-country').keyup(function(){
    if ($('#prof-country').val().length >= 3) {
      $('#prof-country-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
    }
  });

  $('#prof-phone').keyup(function(){
    if ($('#prof-phone').val().length >= 13) {
      $('#prof-phone-info').css({'transition':'height .5s','height':'0px', 'margin-top':'0px'});
    }
  });
  // ↑↑↑ validation and close ↑↑↑

  function getChar(event) {
    if (event.which == null) { // IE
      if (event.keyCode < 32) return null; // спец. символ
      return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) { // все кроме IE
      if (event.which < 32) return null; // спец. символ
      return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
  }

  function closeProfilePopup() {
    $('.profile-editor').css({ 'left': '110%' });
    var tempProfileEditorWidth = $('.profile-editor__holder').css('width');
    var tempProfileEditorPadding = $('.profile-editor__holder').css('padding-left');
    setTimeout(function() {
        $('.profile-editor__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.profile-editor__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.profile-editor').css({ 'left': '-110%' });
        //$('#prof-lname, #prof-fname, #prof-country, #prof-phone').val('');
    }, 500);
    setTimeout(function() {
        $('.profile-editor__validation-warning').css({'height':'0px', 'margin-top':'0px'});
        $('.profile-editor__holder').css({ 'width': tempProfileEditorWidth, 'padding': tempProfileEditorPadding });
    }, 1000);
  }

});