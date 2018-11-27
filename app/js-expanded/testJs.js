// створення ставки

var tempObj = {
    IdOrder      : 1,           // id контейнера
    Investments  : 5555,        // зроблена ставка
    Simbol       : 'BTC/ETH',   // пара
    OpenPrise    : 145.678,     // початкова ціна
    CurrentPrise : 146.222,     // поточна ціна
    TypeOrder    : true,        // очікування, угору - true, вниз - false
    Time         : 150,         // поточний час до закінчення
    StartTime    : 150,         // початковий час до закінчення (тривалість ставки)
    graphicArr   : []           // масив для побудови графіка
};

var tempJSONForTesting = [
  {"TimePoint":"2018-11-26T12:58:40Z","Point":0.95019},
  {"TimePoint":"2018-11-26T12:58:41Z","Point":0.92719},
  {"TimePoint":"2018-11-26T12:58:42Z","Point":0.95719},
  {"TimePoint":"2018-11-26T12:58:43Z","Point":0.95419},
  {"TimePoint":"2018-11-26T12:58:44Z","Point":0.95719},
  {"TimePoint":"2018-11-26T12:58:45Z","Point":0.85719},
  {"TimePoint":"2018-11-26T12:58:46Z","Point":0.95319},
  {"TimePoint":"2018-11-26T12:58:47Z","Point":0.95379},
  {"TimePoint":"2018-11-26T12:58:48Z","Point":0.95719},
  {"TimePoint":"2018-11-26T12:58:49Z","Point":0.91719},
  {"TimePoint":"2018-11-26T12:58:50Z","Point":0.95195},
  {"TimePoint":"2018-11-26T12:58:51Z","Point":0.95744},
  {"TimePoint":"2018-11-26T12:58:52Z","Point":0.98329},
  {"TimePoint":"2018-11-26T12:58:53Z","Point":0.98419},
  {"TimePoint":"2018-11-26T12:58:54Z","Point":0.96349},
  {"TimePoint":"2018-11-26T12:58:55Z","Point":0.91719},
  {"TimePoint":"2018-11-26T12:58:56Z","Point":0.90419},
  {"TimePoint":"2018-11-26T12:58:57Z","Point":0.74719},
  {"TimePoint":"2018-11-26T12:58:58Z","Point":0.11719},
  {"TimePoint":"2018-11-26T12:58:59Z","Point":0.21719},
  {"TimePoint":"2018-11-26T12:59:00Z","Point":0.28519},
  {"TimePoint":"2018-11-26T12:59:01Z","Point":0.31519},
  {"TimePoint":"2018-11-26T12:59:02Z","Point":0.38719},
  {"TimePoint":"2018-11-26T12:59:03Z","Point":0.31519},
  {"TimePoint":"2018-11-26T12:59:04Z","Point":0.37619},
  {"TimePoint":"2018-11-26T12:59:05Z","Point":0.44519},
  {"TimePoint":"2018-11-26T12:59:06Z","Point":0.43719},
  {"TimePoint":"2018-11-26T12:59:07Z","Point":0.48519},
  {"TimePoint":"2018-11-26T12:59:08Z","Point":0.50719},
  {"TimePoint":"2018-11-26T12:59:09Z","Point":0.52719},
  {"TimePoint":"2018-11-26T12:59:10Z","Point":0.59719},
  {"TimePoint":"2018-11-26T12:59:11Z","Point":0.61219},
  {"TimePoint":"2018-11-26T12:59:12Z","Point":0.75419},
  {"TimePoint":"2018-11-26T12:59:13Z","Point":0.72119},
  {"TimePoint":"2018-11-26T12:59:14Z","Point":0.84789},
  {"TimePoint":"2018-11-26T12:59:15Z","Point":0.83619},
  {"TimePoint":"2018-11-26T12:59:16Z","Point":0.89519},
  {"TimePoint":"2018-11-26T12:59:17Z","Point":0.95219},
  {"TimePoint":"2018-11-26T12:59:18Z","Point":0.99719},
  {"TimePoint":"2018-11-26T12:59:19Z","Point":1.05719},
  {"TimePoint":"2018-11-26T12:59:20Z","Point":1.25799},
  {"TimePoint":"2018-11-26T12:59:21Z","Point":1.97719},
  {"TimePoint":"2018-11-26T12:59:22Z","Point":0.95719},
  {"TimePoint":"2018-11-26T12:59:23Z","Point":1.25632},
  {"TimePoint":"2018-11-26T12:59:24Z","Point":0.95645},
  {"TimePoint":"2018-11-26T12:59:25Z","Point":0.95432},
  {"TimePoint":"2018-11-26T12:59:26Z","Point":0.94719},
  {"TimePoint":"2018-11-26T12:59:27Z","Point":0.74149},
  {"TimePoint":"2018-11-26T12:59:28Z","Point":0.95419},
  {"TimePoint":"2018-11-26T12:59:29Z","Point":0.94519},
  {"TimePoint":"2018-11-26T12:59:30Z","Point":0.84719},
  {"TimePoint":"2018-11-26T12:59:31Z","Point":0.94569},
  {"TimePoint":"2018-11-26T12:59:32Z","Point":0.96559},
  {"TimePoint":"2018-11-26T12:59:33Z","Point":0.76619},
  {"TimePoint":"2018-11-26T12:59:34Z","Point":0.95345},
  {"TimePoint":"2018-11-26T12:59:35Z","Point":0.96559},
  {"TimePoint":"2018-11-26T12:59:36Z","Point":0.95119},
  {"TimePoint":"2018-11-26T12:59:37Z","Point":0.91519},
  {"TimePoint":"2018-11-26T12:59:38Z","Point":0.89727},
  {"TimePoint":"2018-11-26T12:59:39Z","Point":0.74727}
  ]


$('.tempBTN6').click(function(){
  var timer = setInterval(function () {
    if ($('#order' + 1)[0]) {
      // якщо такий div існує - змінити висоту полоси прогресу
      tempObj.Time -= 1;
      if ( tempObj.Time <= 0 ) {
        $( $('#order' + 1)[0] ).remove();
        clearInterval(timer);
      }
      var indicator = 186 * tempObj.Time / tempObj.StartTime + 'px';
      $( $('#order' + 1)[0] ).find('.active-slider__time-candle-wrapper').css('height', indicator);

      // якщо клієнт вгадує (ставка вверх і котирування вверх, або ставка вниз і котирування вниз)
      if ( (tempObj.TypeOrder == true && tempObj.CurrentPrise > tempObj.OpenPrise) || (tempObj.TypeOrder == false && tempObj.CurrentPrise <= tempObj.OpenPrise) ) {
        $('#order' + 1).css('border-color','dodgerblue');
      } else {
        $('#order' + 1).css('border-color','red');
      }

    } else {
      // якщо такого div не існує - створити
      // формуємо значки вверх/вниз
      var parlayAnticipationForFontAwesome;
      if (tempObj.TypeOrder == true) {
        parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
      } else {
        parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-down" style="color:red"';
      }

      // зупинити slick
      $('#active-slider').slick('unslick');

      //додаємо елемент слайдеру
      $('#active-slider').prepend('<div class="active-slider__item" id="order' + tempObj.IdOrder + '">\
                                     <div class="active-slider__item-timer-wrapper">\
                                       <div class="active-slider__time-candle-wrapper">\
                                         <div class="active-slider__time-candle"></div>\
                                       </div>\
                                     </div>\
                                     <div class="active-slider__item-graphic" id="smallContainer"></div>\
                                     <div class="active-slider__info">\
                                       <span class="active-slider__pair-name">' + tempObj.Simbol + '</span>\
                                       <span class="active-slider__parlay"> ' + tempObj.Investments + ' </span>\
                                         <i ' + parlayAnticipationForFontAwesome + '></i>\
                                       <div class="active-slider__start-price">' + tempObj.OpenPrise + '</div>\
                                     </div>\
                                   </div>');
      // перезапустити slick
      $('#active-slider').slick({
        centerMode: false,
        variableWidth: true,
        infinite: false
      });

      drawSmallChart();

    }
  }, 1000)

});

// // // // //
var chart1;
var resultArrSmall     = [],
    tempresultArrSmall = [],
    pointStartSmall,
    startTimeSmall;
function drawSmallChart() {

  // [{...},{...},{...}] -> [[...],[...],[...]]
  for (var i = 0; i < tempJSONForTesting.length; i++) {
    var tempArr = [];
    var tempTime = new Date(tempJSONForTesting[i].TimePoint);
    tempArr.push(tempTime);
    tempArr.push(tempJSONForTesting[i].Point);
    tempresultArrSmall.push(tempArr);
  }

  pointStartSmall = tempresultArrSmall[0],
  startTimeSmall  = pointStartSmall[0].getTime();
  resultArrSmall  = tempresultArrSmall[0];

  chart1 = Highcharts.stockChart({
    chart                  : {
      renderTo             : 'smallContainer',
      backgroundColor      : '#1d2a38',
      spacingRight         : 10,
      events               : {
        load               :  function () {
                                // remove "Highcharts.com"-marker
                                $('.highcharts-credits').remove();
                                var count = 0;
                                setInterval(function () {

                                  count += 1;

                                  if ( count <= 30 ) {
                                    // добавляти точку
                                    resultArrSmall.push(tempresultArrSmall[count]);

                                  } else {
                                    // прибирати крайню ліву точку, додавати точку справа - точок постійно 60шт
                                    resultArrSmall.shift();
                                    resultArrSmall.push(tempresultArrSmall[count]);
                                  }
                                  redrawSmallChart();
                                }, 1000);


                              }
      }
    },
    data                   : { dataRefreshRate: 1 },
    navigator              : { enabled: false },
    scrollbar              : { enabled: false },
    rangeSelector          : { enabled: false },

    series                 : [{
      type                 : dataType,
      threshold            : null,
      data                 : resultArrSmall,
      color                : 'dodgerblue',
      showInNavigator      : false,
      pointStart           : startTimeSmall,
      pointInterval        : 1000,
      fillColor            : {
        linearGradient     : {
          x1               : 0,
          y1               : -3,
          x2               : 0,
          y2               : 1
        },
        stops              : [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
      }
    }],
    xAxis                  : {
      type                 : 'datetime',
      crosshair            : true,
      scrollbar            : { enabled: false },
      lineColor            : 'rgba(111, 111, 115, 0.2)',
      gridLineColor        : 'rgba(111, 111, 115, 0.3)',
      gridLineWidth        : 1,
      labels               : {
        style              : {
          color            : 'white',
          fontSize         : '8px'
        }
      },
      dateTimeLabelFormats : { hour : '%H:%M' },
      tickColor            : 'rgba(111, 111, 115, 0.2)',
      tickmarkPlacement    : 'on',
      minorGridLineColor   : 'rgba(111, 111, 115, 0.1)',
      // minorTicks           : true,
      minorTickLength      : 0
    },
    yAxis                  : {
      crosshair            : true,
      scrollbar            : { enabled: false },
      opposite             : true,
      lineColor            : 'rgba(111, 111, 115, 0.2)',
      gridLineColor        : 'rgba(111, 111, 115, 0.3)',
      gridLineWidth        : 1,
      labels               : {
        style              : {
          color            : 'white',
          fontSize         : '8px'
        },
        align              : 'left',
        x                  : 8,
        y                  : 4
      },
      tickColor            : 'rgba(111, 111, 115, 0.2)',
      tickWidth            : 0,
      minorGridLineColor   : 'rgba(111, 111, 115, 0.1)',
      // minorTicks           : true,
      minorTickLength      : 0
    },
    tooltip                : {
      backgroundColor      : 'rgba(0, 0, 0, 0.85)',
      style                : {
        color              : '#F0F0F0',
        fontSize           : '10px'
      },
      padding: 4
    }
  });
}

function redrawSmallChart () {
  // видаляє графік, перемальовує графік

  chart1.series[0].remove();
  chart1.addSeries({
    data                 : resultArrSmall,
    pointStart           : startTimeSmall,
    pointInterval        : 1000,
    type                 : dataType,
    threshold            : null,
    color                : 'dodgerblue',
    showInNavigator      : false,
    fillColor            : {
      linearGradient     : {
        x1               : 0,
        y1               : -3,
        x2               : 0,
        y2               : 1
      },
      stops              : [
        [0, Highcharts.getOptions().colors[0]],
        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      ]
    }
  }, false);

  chart1.redraw();
}