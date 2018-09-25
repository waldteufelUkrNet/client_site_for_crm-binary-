$(document).ready(function(){

  var isMenuOpen;
  var isClickAble = true;
  $('.menu-btn').click(function(){
    toggleBtn();
  });

  // console.log("isMenuOpen :", isMenuOpen, ", isClickAble :", isClickAble);
  $(document).click(function(e){
    if (e.target.className != 'menu-btn' && isMenuOpen == true) {
      toggleBtn();
    }
  });

  function toggleBtn() {
    if (isClickAble) {        //блокування натискання кнопки частіше, ніж 0,5с
      isClickAble = false;
      setTimeout(function() {
        isClickAble = true;
      }, 500);

      $('.menu-btn').click = null;

      if (!isMenuOpen) {
        $('.menu-btn__1-line').css({'transition':'.5s','top':'9px'});
        $('.menu-btn__3-line').css({'transition':'.5s','top':'9px'});
        $('.menu-btn__2-line').css({'transition':'.5s','opacity':'0'});
        setTimeout(function(){
          $('.menu-btn__1-line').css({'transition':'.5s','transform':'rotate(45deg)'});
          $('.menu-btn__3-line').css({'transition':'.5s','transform':'rotate(-45deg)'});
        },500);
        isMenuOpen = true;

        toggleMenu(true);
        return
      }
      if (isMenuOpen) {
        $('.menu-btn__1-line').css({'transition':'.5s','transform':'rotate(0deg)'});
        $('.menu-btn__3-line').css({'transition':'.5s','transform':'rotate(0deg)'});
        $('.menu-btn__2-line').css({'transition-delay':'.5s','transition-duration':'.5s','opacity':'1'});
        setTimeout(function(){
          $('.menu-btn__1-line').css({'transition-duration':'.5s','top':'0px'});
          $('.menu-btn__3-line').css({'transition-duration':'.5s','top':'18px'});
        },500);
        isMenuOpen = false;

        toggleMenu(false);
        return
      }
    }
  }

  function toggleMenu (arg) {
    var arrOfLinks = $('.menu-list-a');

    if (arg == true) {
      $('.menu').css({'border-width':'1px'})
                .css({'transition':'.5s','height':'182px'});

      setTimeout(function(){
        var temp1 = 0;
        var temp2 = '0s';
        for (var i = 0; i < arrOfLinks.length; i++) {
          $(arrOfLinks[i]).css({'transition':'.2s','transition-delay':temp2,'left':'0%'});
          temp1 += 0.1;
          temp2 = temp1 + 's';
        }
      },500);
    }
    if (arg == false) {
      var temp1 = 0;
      var temp2 = '0s';
      for (var i = 0; i < arrOfLinks.length; i++) {
        $(arrOfLinks[i]).css({'transition':'.2s','transition-delay':temp2,'left':'100%'});
        temp1 += 0.1;
        temp2 = temp1 + 's';
      }
      setTimeout(function(){
        $('.menu').css({'border-width':'0px'})
          .css({'transition':'.5s','height':'0px'});
        },600);
    }
  };

});