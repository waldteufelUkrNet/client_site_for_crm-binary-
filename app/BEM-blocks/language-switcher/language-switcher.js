$(document).ready(function(){

  var isLanguageSwitcherOpen = false;
  var isLanguageSwitcherOpen2 = false;
  var selectedLanguage;
  $('.language-switcher__btn').click(function(){
  	if (isLanguageSwitcherOpen == false) {
  		$('.language-switcher__flag-container').css({'transition':'height .5s','height':'300%','z-index':'8888'});
  		isLanguageSwitcherOpen = true;
  		return
  	}

    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
		isLanguageSwitcherOpen = false;
		return
  });

  $('.language-switcher__flag-en').click(function(){
    if (selectedLanguage == 'en' && isLanguageSwitcherOpen2 == false) {
      $('.language-switcher__flag-container').css({'transition':'height .5s','height':'200%','z-index':'8888'});
      $('.language-switcher__flag-ru').css({'display':'block','z-index':'8888'});
      isLanguageSwitcherOpen2 = true;
      return
    }
    if (isLanguageSwitcherOpen2 == true) {
      $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
      $('.language-switcher__flag-ru').css({'display':'none'});
      isLanguageSwitcherOpen2 = false;
      return
    }
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
    $('.language-switcher__btn').css({'display':'none'});
    $('.language-switcher__flag-ru').css({'display':'none'});
    isLanguageSwitcherOpen = false;
    selectedLanguage = 'en';
  });

  $('.language-switcher__flag-ru').click(function(){
    if (selectedLanguage == 'ru' && isLanguageSwitcherOpen2 == false) {
      $('.language-switcher__flag-container').css({'transition':'height .5s','height':'200%','z-index':'8888'});
      $('.language-switcher__flag-en').css({'display':'block'});
      isLanguageSwitcherOpen2 = true;
      return
    }
    if (isLanguageSwitcherOpen2 == true) {
      $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
      $('.language-switcher__flag-en').css({'display':'none'});
      isLanguageSwitcherOpen2 = false;
      return
    }
    $('.language-switcher__flag-container').css({'transition':'height .5s','height':'100%','z-index':'8888'});
    $('.language-switcher__btn').css({'display':'none'});
    $('.language-switcher__flag-en').css({'display':'none'});
    isLanguageSwitcherOpen = false;
    selectedLanguage = 'ru';
  });

});