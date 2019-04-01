// створення ставки

var tempObj1 = {
    IdOrder      : 1,           // id контейнера
    Investments  : 5555,        // зроблена ставка
    Simbol       : 'BTC/ETH',   // пара
    OpenPrise    : 145.678,     // початкова ціна
    CurrentPrise : 146.222,     // поточна ціна
    TypeOrder    : true,        // очікування, угору - true, вниз - false
    Time         : 60,          // поточний час до закінчення
    StartTime    : 60,          // початковий час до закінчення (тривалість ставки)
    graphicArr   : [
                    {"TimePoint":"2018-11-26T12:58:40Z","Point":1},
                    {"TimePoint":"2018-11-26T12:58:41Z","Point":2},
                    {"TimePoint":"2018-11-26T12:58:42Z","Point":3},
                    {"TimePoint":"2018-11-26T12:58:43Z","Point":4},
                    {"TimePoint":"2018-11-26T12:58:44Z","Point":5},
                    {"TimePoint":"2018-11-26T12:58:45Z","Point":6},
                    {"TimePoint":"2018-11-26T12:58:46Z","Point":7},
                    {"TimePoint":"2018-11-26T12:58:47Z","Point":8},
                    {"TimePoint":"2018-11-26T12:58:48Z","Point":9},
                    {"TimePoint":"2018-11-26T12:58:49Z","Point":10},
                    {"TimePoint":"2018-11-26T12:58:50Z","Point":11},
                    {"TimePoint":"2018-11-26T12:58:51Z","Point":12},
                    {"TimePoint":"2018-11-26T12:58:52Z","Point":13},
                    {"TimePoint":"2018-11-26T12:58:53Z","Point":14},
                    {"TimePoint":"2018-11-26T12:58:54Z","Point":15},
                    {"TimePoint":"2018-11-26T12:58:55Z","Point":16},
                    {"TimePoint":"2018-11-26T12:58:56Z","Point":17},
                    {"TimePoint":"2018-11-26T12:58:57Z","Point":18},
                    {"TimePoint":"2018-11-26T12:58:58Z","Point":19},
                    {"TimePoint":"2018-11-26T12:58:59Z","Point":20},
                    {"TimePoint":"2018-11-26T12:59:00Z","Point":1},
                    {"TimePoint":"2018-11-26T12:59:01Z","Point":2},
                    {"TimePoint":"2018-11-26T12:59:02Z","Point":3},
                    {"TimePoint":"2018-11-26T12:59:03Z","Point":4},
                    {"TimePoint":"2018-11-26T12:59:04Z","Point":5},
                    {"TimePoint":"2018-11-26T12:59:05Z","Point":6},
                    {"TimePoint":"2018-11-26T12:59:06Z","Point":7},
                    {"TimePoint":"2018-11-26T12:59:07Z","Point":8},
                    {"TimePoint":"2018-11-26T12:59:08Z","Point":9},
                    {"TimePoint":"2018-11-26T12:59:09Z","Point":10},
                    {"TimePoint":"2018-11-26T12:59:10Z","Point":11},
                    {"TimePoint":"2018-11-26T12:59:11Z","Point":12},
                    {"TimePoint":"2018-11-26T12:59:12Z","Point":13},
                    {"TimePoint":"2018-11-26T12:59:13Z","Point":14},
                    {"TimePoint":"2018-11-26T12:59:14Z","Point":15},
                    {"TimePoint":"2018-11-26T12:59:15Z","Point":16},
                    {"TimePoint":"2018-11-26T12:59:16Z","Point":17},
                    {"TimePoint":"2018-11-26T12:59:17Z","Point":18},
                    {"TimePoint":"2018-11-26T12:59:18Z","Point":19},
                    {"TimePoint":"2018-11-26T12:59:19Z","Point":20},
                    {"TimePoint":"2018-11-26T12:59:20Z","Point":1},
                    {"TimePoint":"2018-11-26T12:59:21Z","Point":2},
                    {"TimePoint":"2018-11-26T12:59:22Z","Point":3},
                    {"TimePoint":"2018-11-26T12:59:23Z","Point":4},
                    {"TimePoint":"2018-11-26T12:59:24Z","Point":5},
                    {"TimePoint":"2018-11-26T12:59:25Z","Point":6},
                    {"TimePoint":"2018-11-26T12:59:26Z","Point":7},
                    {"TimePoint":"2018-11-26T12:59:27Z","Point":8},
                    {"TimePoint":"2018-11-26T12:59:28Z","Point":9},
                    {"TimePoint":"2018-11-26T12:59:29Z","Point":10},
                    {"TimePoint":"2018-11-26T12:59:30Z","Point":11},
                    {"TimePoint":"2018-11-26T12:59:31Z","Point":12},
                    {"TimePoint":"2018-11-26T12:59:32Z","Point":13},
                    {"TimePoint":"2018-11-26T12:59:33Z","Point":14},
                    {"TimePoint":"2018-11-26T12:59:34Z","Point":15},
                    {"TimePoint":"2018-11-26T12:59:35Z","Point":16},
                    {"TimePoint":"2018-11-26T12:59:36Z","Point":17},
                    {"TimePoint":"2018-11-26T12:59:37Z","Point":18},
                    {"TimePoint":"2018-11-26T12:59:38Z","Point":19},
                    {"TimePoint":"2018-11-26T12:59:39Z","Point":20}
                   ]           // масив для побудови графіка
};

var tempObj2 = {
    IdOrder      : 2,           // id контейнера
    Investments  : 1293,        // зроблена ставка
    Simbol       : 'BTC/USD',   // пара
    OpenPrise    : 4235.6278,   // початкова ціна
    CurrentPrise : 3935.6218,   // поточна ціна
    TypeOrder    : false,       // очікування, угору - true, вниз - false
    Time         : 30,          // поточний час до закінчення
    StartTime    : 30,          // початковий час до закінчення (тривалість ставки)
    graphicArr   : [
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
                   ]           // масив для побудови графіка
};


$('.tempBTN6').click(function(){
  createActiveParlay(tempObj1);
});

$('.tempBTN7').click(function(){
  createActiveParlay(tempObj2);
});

function createActiveParlay(curObj) {
  var stopWatch = curObj.Time;
  var timer = setInterval(function () {

    if ($('#order' + curObj.IdOrder)[0]) {
      // якщо такий div існує - змінити висоту полоси прогресу
      stopWatch -= 1;
      if ( stopWatch <= 0 ) {

        // зупинити slick
        $('#active-slider').slick('unslick');

        $( $('#order' + curObj.IdOrder)[0] ).remove();

        // перезапустити slick
        $('#active-slider').slick({
          centerMode: false,
          variableWidth: true,
          infinite: false
      });
        clearInterval(timer);
      }
      var indicator = 186 * stopWatch / curObj.StartTime + 'px';
      $( $('#order' + curObj.IdOrder)[0] ).find('.active-slider__time-candle-wrapper').css('height', indicator);

      // якщо клієнт вгадує (ставка вверх і котирування вверх, або ставка вниз і котирування вниз)
      if ( (curObj.TypeOrder == true && curObj.CurrentPrise > curObj.OpenPrise) || (curObj.TypeOrder == false && curObj.CurrentPrise <= curObj.OpenPrise) ) {
        $('#order' + curObj.IdOrder).css('border-color','dodgerblue');
      } else {
        $('#order' + curObj.IdOrder).css('border-color','red');
      }

    } else {
      // якщо такого div не існує - створити
      // формуємо значки вверх/вниз
      var parlayAnticipationForFontAwesome;
      if (curObj.TypeOrder == true) {
        parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-up" style="color:dodgerblue"';
      } else {
        parlayAnticipationForFontAwesome = 'class="fas fa-angle-double-down" style="color:red"';
      }

      // зупинити slick
      $('#active-slider').slick('unslick');

      //додаємо елемент слайдеру
      $('#active-slider').prepend('<div class="active-slider__item" id="order' + curObj.IdOrder + '">\
                                     <div class="active-slider__item-timer-wrapper">\
                                       <div class="active-slider__time-candle-wrapper">\
                                         <div class="active-slider__time-candle"></div>\
                                       </div>\
                                     </div>\
                                     <div class="active-slider__item-graphic" id="smallContainer"></div>\
                                     <div class="active-slider__info">\
                                       <span class="active-slider__pair-name">' + curObj.Simbol + '</span>\
                                       <span class="active-slider__parlay"> ' + curObj.Investments + ' </span>\
                                         <i ' + parlayAnticipationForFontAwesome + '></i>\
                                       <div class="active-slider__start-price">' + curObj.OpenPrise + '</div>\
                                       <div class="active-slider__current-price" id="currentprice' + curObj.IdOrder + '"></div>\
                                     </div>\
                                   </div>');
      // перезапустити slick
      $('#active-slider').slick({
        centerMode: false,
        variableWidth: true,
        infinite: false
      });

      drawSmallChart(curObj);

    }
  }, 1000);
}

function drawSmallChart(currentObj) {
  var graphicArr         = currentObj.graphicArr,
      objId              = currentObj.IdOrder,
      resultArrSmall     = [],
      tempresultArrSmall = [],
      pointStartSmall,
      startTimeSmall;

  // [{...},{...},{...}] -> [[...],[...],[...]]
  for (var i = 0; i < graphicArr.length; i++) {
    var tempArr = [];
    var tempTime = new Date(graphicArr[i].TimePoint);
    tempArr.push(tempTime);
    tempArr.push(graphicArr[i].Point);
    tempresultArrSmall.push(tempArr);
  }

  pointStartSmall = tempresultArrSmall[0],
  startTimeSmall  = pointStartSmall[0].getTime();
  resultArrSmall  = [];
  resultArrSmall.push(tempresultArrSmall[0]);
  // так помилок в консолі не буде: resultArrSmall  = tempresultArrSmall[0];

  Highcharts.stockChart({
    chart                  : {
      renderTo             : 'smallContainer',
      backgroundColor      : 'white',
      spacingRight         : 10,
      events               : {
        load               :  function () {
                                // remove "Highcharts.com"-marker
                                $('.highcharts-credits').remove();

                                var THIS = this;
                                redrawSmallPlotline(THIS, tempresultArrSmall[0][1], objId);

                                var count = 1;

                                var tempTimer = setInterval(function () {

                                  if ( count < 20 ) {
                                    // додавати точку
                                    resultArrSmall.push(tempresultArrSmall[count]);
                                  } else {
                                    // прибирати крайню ліву точку, додавати точку справа - точок постійно 60шт
                                    resultArrSmall.shift();
                                    resultArrSmall.push(tempresultArrSmall[count]);

                                    // коли точка зліва починає затиратися, потрібно змінювати стартовий час в графіку (брати з першої точки поточного масиву)
                                    pointStartSmall = resultArrSmall[0],
                                    startTimeSmall  = pointStartSmall[0].getTime();
                                  }

                                  count += 1;

                                  THIS.yAxis[0].removePlotLine('plot-line-2');
                                  redrawSmallPlotline(THIS, resultArrSmall[resultArrSmall.length-1][1], objId);

                                  redrawSmallChart (THIS, resultArrSmall, startTimeSmall);
                                  // коли закривається ставка, зупиняти таймер
                                  if ( !$('#order' + objId)[0] ) clearInterval(tempTimer)
                                }, 1000);

                              }
      }
    },
    data                   : { dataRefreshRate: 1 },
    navigator              : { enabled: false },
    scrollbar              : { enabled: false },
    rangeSelector          : { enabled: false },

    series                 : [{
      type                 : 'areaspline',
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
          color            : 'black',
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
          color            : 'black',
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

function redrawSmallChart (nameOfChart, currentArr, currentStartTime) {
  // видаляє графік, перемальовує графік

  nameOfChart.series[0].remove();
  nameOfChart.addSeries({
    data                 : currentArr,
    pointStart           : currentStartTime,
    pointInterval        : 1000,
    type                 : 'areaspline',
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

  nameOfChart.redraw();
}

function redrawSmallPlotline(nameOfChart, currentYCoordValue, objId) {
  // перемальовує плот-лінію та поточне значення

  nameOfChart.yAxis[0].addPlotLine({
    color         : 'red',
    id            : 'plot-line-2',
    dashStyle     : 'solid',
    width         : 1,
    zIndex        : 9988,
    value         : currentYCoordValue
  });

  $('#currentprice' + objId).text(currentYCoordValue);

};