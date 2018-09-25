$(document).ready(function(){

  var simpleSwitcherToggle = 'demo';
  $('.simple-switcher__thumb').click(function(){
    if (simpleSwitcherToggle == 'demo') {
      $('.simple-switcher__thumb').css({'transition':'.2s','left':'35px'});
      simpleSwitcherToggle = 'real'

      $('.central-part__account-type span').text('Real');

      return
    }
    if (simpleSwitcherToggle == 'real') {
      $('.simple-switcher__thumb').css({'transition':'.2s','left':'0px'});
      simpleSwitcherToggle = 'demo'

      $('.central-part__account-type span').text('Demo');

      return
    }
  });

});