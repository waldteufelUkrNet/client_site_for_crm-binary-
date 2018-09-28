// $(document).ready(function(){

  $( "#datepicker" ).datepicker();

  /* ↓↓↓ field switch ↓↓↓ */
  $('.act-btn').click(function(){
  	// buttons
  	$('.act-btn').addClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');
  });

  $('.active-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').addClass('work-change-btn_active');
  	$('.history-btn').removeClass('work-change-btn_active');
  });

  $('.history-btn').click(function(){
  	// buttons
  	$('.act-btn').removeClass('work-change-btn_active');
  	$('.active-btn').removeClass('work-change-btn_active');
  	$('.history-btn').addClass('work-change-btn_active');
  });
  /* ↑↑↑ /field switch ↑↑↑ */


/* ↓↓↓ wares change ↓↓↓ */

  $('.wares-change__item').click(function(e) {
    //console.log("e.currentTarget.tagName:", e.currentTarget.tagName, "; e.target.tagName:", e.target.tagName);

    // open
    if ( e.target.tagName == 'A' ) {
      console.log('ckick on a');
      $('.wares-change__item').css({'left':'0px'});
    // choice & close
    } else if ( e.target.tagName == 'LI' || e.target.tagName == 'SPAN' ) {
      console.log('ckick on li');

      var tempArr = $('.wares-change__item');
      for (var i = 0; i < tempArr.length; i++) {
        if ( tempArr[i] == this ) {
          var I = i;
        }
      }
      var tempPart1 = tempArr.slice(0,I);
      var tempPart2 = tempArr.slice(I+1);
      //var tempPartArr3 = tempPartArr1.concat(tempPartArr2);

      var tempArr = $('.wares-change__item');
      for (var i = 0; i < tempArr.length; i++) {
        if ( tempArr[i] == this ) {
          $(tempArr[i]).css({'top':'0px'}).append('<a class="wares-change__changelink">изменить</a>');
          $(tempArr[i]).after(tempPart1);
        }
      }


    }

  });

/* ↑↑↑ /wares change ↑↑↑ */





//   /* ↓↓↓ wares change ↓↓↓ */
//   // open
//   // $('.wares-change__changelink').click(function(e) {
//   //   if ( $(e.target).hasClass('wares-change__changelink') ) { console.log(1) }
//   //   if ( $(e.target).hasClass('wares-change__item') ) { console.log(2) }
//   //   var tempArr = $('.wares-change__item');
//   //   for (var i = 0; i < tempArr.length; i++) {
//   //     $(tempArr[i]).css({'left':'0px'});
//   //   }
//   // });

//   // choice & close
//   $('.wares-change__item').click(function(e) {
//     if ( $(e.target).hasClass('wares-change__changelink') ) { console.log('зміна');
//       var tempArr = $('.wares-change__item');
//       for (var i = 0; i < tempArr.length; i++) {
//         $(tempArr[i]).css({'left':'0px'});
//       }
//       return
//     }
//     if ( $(e.target).hasClass('wares-change__item') || $('li.wares-change__item span').length != 0 ) { console.log('вибір');

//       // видаляємо "змінити"
//       $('.wares-change__item:first-of-type').children('a.wares-change__changelink').remove();

//       // піднімаємо елемент угору, додаємо йому "змінити"
//       $(this).css({'top':'0px','cursor':'default','background-image':'none','background-color':'dodgerblue'})
//              .append('<a class="wares-change__changelink">изменить</a>');

//       // анімуємо зникнення
//       var tempArr = $('.wares-change__item');
//       var tempTime = tempArr.length * .3 * 1000;
//       for (var i = 0; i < tempArr.length; i++) {
//         if (this == tempArr[i]) continue;
//         $(tempArr[i]).css({'left':'-100px'});
//       }

//       // після анімації перерозташовуємо елементи
//       var timer = setTimeout(function() {
//         var tempArr = $('.wares-change__item');
//         // знаходимо кнопку із елементом "змінити"
//         for (var i = 0; i < tempArr.length; i++) {
//           if ( $(tempArr[i]).children('a.wares-change__changelink').length != 0 ) {
//             var THIS = i;
//             break
//           }
//         }

//         // усі елементи перед ставимо позаду
//         // var tempArr = $('.wares-change__item'),
//         //     tempVal = 0,
//         //     tempTop;
//         // for (var i = THIS; i >= 0; i--) { console.log("i", i);
//         //   tempTop = tempVal + 'px';
//         //   $(tempArr[THIS]).after(tempArr[i]);

//         //   $(tempArr[i]).css({'top':tempTop})
//         //   tempVal += 50;
//         // }
//       }, 1200);
//     }
//   });

//   /* ↑↑↑ /wares change ↑↑↑ */
// // });

// /* ↓↓↓ FUNCTION DECLARATIONS ↓↓↓ */
// // function openMenu() {
// //   var tempArr = $('.wares-change__item');
// //   setTimeout(function(){
// //                         for (var i = 0; i < tempArr.length; i++) {
// //                           $(tempArr[i]).attr({'style':'left: 0px'});
// //                         }
// //                        },1);
// // }
// /* ↑↑↑ /FUNCTION DECLARATIONS ↑↑↑ */