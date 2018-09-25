$('document').ready(function(){

  /* ↓↓↓ keys filfering ↓↓↓ */
  $('#investment').keypress(function(e){
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.keyCode  == 8  || e.keyCode  == 13 || e.charCode == 46 ||
        e.charCode == 48 || e.charCode == 49 || e.charCode == 50 ||
        e.charCode == 51 || e.charCode == 52 || e.charCode == 53 ||
        e.charCode == 54 || e.charCode == 55 || e.charCode == 56 ||
        e.charCode == 57) {
        //multipleShoulder();
    } else {
      return false;
    }
  });
  /* ↑↑↑ /keys filfering ↑↑↑ */

  /* ↓↓↓ calculation ↓↓↓ */
  $('#investment').keyup(function(){
    multipleShoulder();
  });
  /* ↑↑↑ /calculation ↑↑↑ */

  /* ↓↓↓ onoff switcher ↓↓↓ */
  var onoffSwitcherToggle = 'off';
  $('.onoff-switcher__thumb').click(function(){
    if (onoffSwitcherToggle == 'off') {
      $('.onoff-switcher__thumb').css({'transition':'.5s','left':'35px'});
      $('.shoulder__body').css({'transition':'0.5s','height':'64px'});

      $('.shoulder__round1').addClass('shoulder-point shoulder__round_active');
      shoulderValue = 50;
      $('#shoulderValue').val(shoulderValue);

      multipleShoulder();
      onoffSwitcherToggle = 'on';
      return
    }
    if (onoffSwitcherToggle == 'on') {
      $('.onoff-switcher__thumb').css({'transition':'.5s','left':'0px'});
      $('.shoulder__body').css({'transition':'.5s','height':'0px'});

      removeChangeShoulder();
      onoffSwitcherToggle = 'off';
      return
    }
  });
  /* ↑↑↑ /onoff switcher ↑↑↑ */

  /* ↓↓↓ shoulder thumb ↓↓↓ */
  var arrOfPoints = $('.shoulder-point');
  var arrOfLines = $('.shoulder-line');
  var shoulderValue = 0;

  $(arrOfPoints).click(function (){
    for (var i = 0; i < arrOfPoints.length; i++) {
      if (arrOfPoints[i] == this) {
        changeShoulder(i);
        return;
      }
    }
  });

  function changeShoulder(arg) {
    removeChangeShoulder ();

    for (var i = 0; i <= arg; i++) {
      $(arrOfLines[i-1]).addClass('shoulder__subline_active');
      $(arrOfPoints[i-1]).addClass('shoulder__round_sub-active');
    }
    $(arrOfPoints[arg]).addClass('shoulder__round_active');
    shoulderValue = 50 * (i);
    $('#shoulderValue').val(shoulderValue);
    multipleShoulder(shoulderValue);
  }

  function removeChangeShoulder() {
    for (var i = 0; i < arrOfPoints.length; i++) {
      $(arrOfLines[i]).removeClass('shoulder__subline_active');
      $(arrOfPoints[i]).removeClass('shoulder__round_sub-active shoulder__round_active');
    }
    shoulderValue = 0;
    $('#shoulderValue').val(shoulderValue);
  }

  function multipleShoulder() {
    var temp = $('#investment').val();
    var result = temp * shoulderValue;
    $('#investment-result').text(result);
  }

  $('#investment').change(function(){
    multipleShoulder(shoulderValue);
  });
  /* ↑↑↑ /shoulder thumb ↑↑↑ */

});