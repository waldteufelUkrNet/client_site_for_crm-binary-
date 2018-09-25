var startTime,
    pointStart,
    lastPoint,
    tempPoint,
    YPlotLinesValue,
    interval,
    resultArr          = [],
    stringType         = '?',
    stringSymbol       = 'BTCETH',
    nameOfChart        = 'BTC/ETH',
    dataType           = 'areaspline',
    timeStep           = 5,
    dataArr            = 'http://stock.peoplesender.info:9000/api/Stock' + stringType + 'timer=' + timeStep + '&symbol=' + stringSymbol,
    dataOne            = 'http://stock.peoplesender.info:9000/api/Stock?timer=realOne&symbol=' + stringSymbol,
    isDrawing          = false,
    labelValue1        = labelValue2 = YPlotLinesValue,
    labelBorderColor   = 'white',
    minorTickXInterval = 0,
    minorTickYInterval = 0;

getDataArr();

// ↓↓↓ type/time-switch-buttons behavior ↓↓↓
var arrOfTimerBtns = $('.timer-buttons-li');
var arrOfTypeBtns  = $('.type-buttons-li');

$('.type-buttons-li').click(function(){

  // type-buttons highlighting
  for (var i = 0; i < arrOfTypeBtns.length; i++) {
    $(arrOfTypeBtns[i]).removeClass('type-buttons-li_active');
    $(this).addClass('type-buttons-li_active');
    dataType = $(this).attr('data-type');
  }

  // time-buttons highlighting
  if (dataType == 'candlestick' || dataType == 'ohlc') {

    for (var i = 0; i < arrOfTimerBtns.length; i++) {
      if ($(arrOfTimerBtns[i]).attr('data-time') != '30' && $(arrOfTimerBtns[i]).attr('data-time') != '60') {
          if ($(arrOfTimerBtns[i]).hasClass('timer-buttons-li_active')) {
            $(arrOfTimerBtns[3]).addClass('timer-buttons-li_active');
            timeStep = 30;
          }
        $(arrOfTimerBtns[i]).css({'display':'none'}).removeClass('timer-buttons-li_active');
      }
    }
    stringType = 'Ohlc?';
  } else {
    for (var i = 0; i < arrOfTimerBtns.length; i++) {
      $(arrOfTimerBtns[i]).css({'display':'inline-block'});
    }
    stringType = '?';
  }

  getDataArr();
});

$('.timer-buttons-li').click(function(){

  for (var i = 0; i < arrOfTimerBtns.length; i++) {
    $(arrOfTimerBtns[i]).removeClass('timer-buttons-li_active');
    $(this).addClass('timer-buttons-li_active');
  }
  timeStep = +$(this).attr('data-time');

  getDataArr();
});
// ↑↑↑ type/time-switch-buttons behavior ↑↑↑


// ↓↓↓ functions declarations ↓↓↓
function getDataArr(){
  // формує рядок запиту, визначає тип графіку і формує масив, придатний для обробки бібліотекою.
  // Викликає функцію перемальовування графіку.

  dataArr = 'http://stock.peoplesender.info:9000/api/Stock' + stringType + 'timer=' + timeStep + '&symbol=' + stringSymbol;
  $.ajax({
    url: dataArr,
    success: function (data) {
      resultArr  = [];
      pointStart = 0;
      startTime  = 0;

      if (dataType == 'areaspline') {

        YPlotLinesValue = data[data.length-1].Value;

        // [{...},{...},{...}] -> [[...],[...],[...]]
        for (var i = 0; i < data.length; i++) {
          var tempArr = [];
          var tempTime = new Date(data[i].Date);
          tempArr.push(tempTime);
          tempArr.push(data[i].Value);
          resultArr.push(tempArr);
        }
        // в перший раз тимчасова точка (145 рандомна) = 144
        resultArr.push(resultArr[resultArr.length-1]);

      } else if (dataType == 'candlestick' || dataType == 'ohlc') {

        YPlotLinesValue = data[data.length-1].Close;

        // [{'DateOpen':'date1', 'DateClose':'date2', 'Open':'number1', 'Hight':'number2', 'Low':'number3', 'Close':'number4'}, {...},{...}]
        // -> -> -> -> ->
        // [[date2, number1, number2, number3, number4],[...],[...]]

        for (var i = 0; i < data.length; i++) {
          var tempArr = [];
          var tempTime = new Date(data[i].DateClose);
          tempArr.push(tempTime);
          tempArr.push(data[i].Open);
          tempArr.push(data[i].Hight);
          tempArr.push(data[i].Low);
          tempArr.push(data[i].Close);
          resultArr.push(tempArr);
        }
        lastPoint = resultArr[resultArr.length-1];
        tempPoint = [];

        // в перший раз тимчасова точка (145 рандомна) бере значення у Close 144-ї
        tempPoint.push([lastPoint[0],lastPoint[4],lastPoint[4],lastPoint[4],lastPoint[4]]);
        resultArr.push(tempPoint);
      } else {
        console.log('dataType is not "areaspline", "candlestick" or "ohlc"')
      }
      pointStart = resultArr[0];
      startTime  = pointStart[0].getTime();

      // якщо точок забагато, контейнер їх не вміщує, і свічки замість 30/60 хв. стають по 1 - 6 годині
      var containerWidth = $('#container').width();
      if (872 <= containerWidth && containerWidth < 1032) {
        resultArr = resultArr.slice(24);
      } else if (742 <= containerWidth && containerWidth < 872) {
        resultArr = resultArr.slice(44);
      } else if (621 <= containerWidth && containerWidth < 742) {
        resultArr = resultArr.slice(64);
      } else if (468 <= containerWidth && containerWidth < 621) {
        resultArr = resultArr.slice(84);
      } else if (340 <= containerWidth && containerWidth < 468) {
        resultArr = resultArr.slice(104);
      } else if (containerWidth < 340) {
        resultArr = resultArr.slice(124);
      } else {}

      drawChart();
      calculateMinorTickInterval();
      drawChart();
    }
  });
}

function drawChart() {
  // створює графік

  chart = Highcharts.stockChart({
    chart                  : {
      renderTo             : 'container',
      backgroundColor      : '#1d2a38',
      spacingRight         : 50,
      events               : {
        load               :  function () {

                                // через появу зв'язки drawChart() - calculateMinorTickInterval() - drawChart()
                                // потрібно відсікати перший drawChart()
                                if (!isDrawing) {
                                  isDrawing = true;
                                  return;
                                }

                                var series = this.series[0];

                                redrawPlotline(this, YPlotLinesValue);
                                redrawPlotlineValueRectangle(YPlotLinesValue);

                                clearInterval(interval);

                                interval = setInterval(function () {

                                  $.getJSON(dataOne, function (data) { // data = [{Sumbol,Value,'date'}]
                                    var x = new Date(data[0].Date),
                                        y = data[0].Value;

                                    // зробити окрему функцію без ajax попросили бекендщики
                                    redrawSerie(x,y);
                                  });
                                }, 3000);
                                tugOfWarAnimation();
                                // remove "Highcharts.com"-marker
                                $('.highcharts-credits').remove();
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
      name                 : stringSymbol,
      data                 : resultArr,
      color                : 'dodgerblue',
      showInNavigator      : false,
      pointStart           : startTime,
      pointInterval        : timeStep * 60 * 1000,
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
    yAxis                  : {
      crosshair            : true,
      scrollbar            : { enabled: false },
      opposite             : true,
      lineColor            : 'rgba(111, 111, 115, 0.2)',
      gridLineColor        : 'rgba(111, 111, 115, 0.3)',
      gridLineWidth        : 1,
      labels               : {
        style              : { color: '#E0E0E3' },
        align              : 'left',
        x                  : 8,
        y                  : 4
      },
      tickColor            : 'rgba(111, 111, 115, 0.2)',
      tickWidth            : 0,
      minorGridLineColor   : 'rgba(111, 111, 115, 0.1)',
      minorTickInterval    : minorTickYInterval,
      minorTickLength      : 0
    },
    xAxis                  : {
      type                 : 'datetime',
      crosshair            : true,
      scrollbar            : { enabled: false },
      lineColor            : 'rgba(111, 111, 115, 0.2)',
      gridLineColor        : 'rgba(111, 111, 115, 0.3)',
      gridLineWidth        : 1,
      labels               : {
        style              : { color: 'white' } //'#E0E0E3' }
      },
      dateTimeLabelFormats : { hour : '%H:%M' },
      tickColor            : 'rgba(111, 111, 115, 0.2)',
      tickmarkPlacement    : 'on',
      minorGridLineColor   : 'rgba(111, 111, 115, 0.1)',
      minorTickInterval    : minorTickXInterval,
      minorTickLength      : 0
    },
    tooltip                : {
      backgroundColor      : 'rgba(0, 0, 0, 0.85)',
      style                : { color : '#F0F0F0' }
    }
  });
}

function redrawChart () {
  // видаляє графік, перемальовує графік

  chart.series[0].remove();
  chart.addSeries({
    type                 : dataType,
    threshold            : null,
    name                 : stringSymbol,
    data                 : resultArr,
    color                : 'dodgerblue',
    showInNavigator      : false,
    pointStart           : startTime,
    pointInterval        : timeStep * 60 * 1000,
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

  chart.redraw();

  chart.yAxis[0].removePlotLine('plot-line-1');
  redrawPlotline(chart, YPlotLinesValue);
  tugOfWarAnimation();
  redrawPlotlineValueRectangle(YPlotLinesValue);

}

function redrawPlotline(nameOfChart, currentYCoordValue) {
  // перемальовує плот-лінію та викликає функцію перемальовування поточного значення

  nameOfChart.yAxis[0].addPlotLine({
    color         : 'red',
    id            : 'plot-line-1',
    dashStyle     : 'solid',
    width         : 1,
    zIndex        : 9988,
    label         : {
      text        : currentYCoordValue.toFixed(5),
      textAlign   : 'left',
      align       : 'right',
      x           : 5,
      y           : 3,
      style       : {
        color     : 'transparent',
        fontSize  : '11px'
      }
    },
    value         : currentYCoordValue
  });
}

function redrawPlotlineValueRectangle(Value) {
  // функція перемальовує поточне значення плот-лінії

  var labelCoordTop  = $('.highcharts-plot-line-label').position().top;
  var labelCoordLeft = $('.highcharts-plot-line-label').position().left;

  if (labelValue1 > labelValue2) {
    labelBorderColor = 'red';
  } else if (labelValue1 < labelValue2) {
    labelBorderColor = 'dodgerblue';
  } else {
    labelBorderColor = 'white';
  }

  labelValue1 = labelValue2;
  labelValue2 = Value;

  $('#labelBorder').css({'min-width'       :'10px',
                         'height'          :'20px',
                         'top'             :labelCoordTop,
                         'left'            :labelCoordLeft,
                         'border'          :'1px solid',
                         'border-color'    : labelBorderColor
                   })
                   .text(Value.toFixed(5));

  $('#labelIndicator').css({'width'        :'4px',
                            'height'       :'4px',
                            'top'          :labelCoordTop+8,
                            'left'         :labelCoordLeft-7
                      });
};

function redrawSerie(x,y){
  // приймає поточні значення котировки, визначає тип графіка, формує тимчасову точку та
  // запускає функцію redrawChart(), яка перемальовує графік. Якщо час тимчасової точки
  // більше за час останньої точки більше ніж на крок графіка, додає точку до масиву значень
  // та видаляє першу точку

  //x = new Date(x); - так треба бекендщикам, бо у них дата - не рядок з json
  YPlotLinesValue = y;
  lastPoint = resultArr[resultArr.length-2];

  chart.yAxis[0].removePlotLine('plot-line-1');
  redrawPlotline(chart, YPlotLinesValue);

  if (dataType == 'areaspline') {

    tempPoint = [x,y];
    resultArr[resultArr.length-1] = tempPoint;

  } else if (dataType == 'candlestick' || dataType == 'ohlc') {

    if (tempPoint == null) {
      tempPoint = [x, y, y, y, y]; // tempPoint = [x, open, high, low, close];
    }
    tempPoint[0] = x;
    if (tempPoint[2] < y) { tempPoint[2] = y }
    if (tempPoint[3] > y) { tempPoint[3] = y }
    tempPoint[4] = y;

    resultArr[resultArr.length-1] = tempPoint;

  } else {
    console.log('dataType is not "areaspline", "candlestick" or "ohlc"')
  }

  var deltaTime = x.getTime() - lastPoint[0].getTime();

  if (deltaTime >= timeStep * 60 * 1000) {

    resultArr.shift();
    lastPoint = tempPoint;
    resultArr.push(tempPoint);
    tempPoint = null;
  }
  redrawChart ();
}

function calculateMinorTickInterval () {
  // функція розраховує ціну поділки для допоміжних ліній

  // yAxis
  minorTickYInterval = ($('.highcharts-yaxis-labels > text')[1].innerHTML - $('.highcharts-yaxis-labels > text')[0].innerHTML).toFixed(5) / 5;
  chart.yAxis[0].minorTickInterval = minorTickYInterval;

  // xAxis
  var xAxisFirstLabelsValue  = $('.highcharts-xaxis-labels > text')[0].innerHTML;
  var xAxisSecondLabelsValue;
  if(!$('.highcharts-xaxis-labels > text')[1]) {
    xAxisSecondLabelsValue = xAxisFirstLabelsValue;
  } else {
    xAxisSecondLabelsValue = $('.highcharts-xaxis-labels > text')[1].innerHTML;
  }

  if (xAxisFirstLabelsValue.charAt(2) == ':') {
    xAxisFirstLabelsValue = +xAxisFirstLabelsValue.substr(0,2);
  } else {
    xAxisFirstLabelsValue = 0;
  }

  if (xAxisSecondLabelsValue.charAt(2) == ':') {
    xAxisSecondLabelsValue = +xAxisSecondLabelsValue.substr(0,2);
  } else {
    xAxisSecondLabelsValue = 24;
  }

  minorTickXInterval = (xAxisSecondLabelsValue - xAxisFirstLabelsValue) * 60 * 60 * 1000 / 6;
  chart.xAxis[0].minorTickInterval = minorTickXInterval;
}

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}
// ↑↑↑ functions declarations ↑↑↑

// ↓↓↓ BEM-blocks: tug-of-war (start) ↓↓↓
function tugOfWarAnimation() {
  // функція циклом визначає найбільшу і найменшу точки графіку, приймає їх за 100% та 0% відповідно,
  // потім бере першу і останню точки, переводить їх у проценти, знаходить їх різницю і ділить на два,
  // отримане значення або додає, або віднімає від 50% у залежності від тенденції.

  var firstTOWPoint,
      lastTOWPoint,
      minTOWPoint,
      maxTOWPoint,
      firstTOWPointInPercent,
      lastTOWPointInPercent,
      shiftTOW;

  $('#bull1').css({'display':'none'});
  $('#bull2').css({'display':'block'});
  $('#bear1').css({'display':'none'});
  $('#bear2').css({'display':'block'});

  if (dataType == 'areaspline') {
    minTOWPoint = maxTOWPoint = firstTOWPoint = resultArr[0][1];
    lastTOWPoint  = resultArr[resultArr.length-2][1];

    for(var i = 0; i < resultArr.length-1; i++) {
      if(resultArr[i][1] > maxTOWPoint) {
        maxTOWPoint = resultArr[i][1];
      }
      if(resultArr[i][1] < minTOWPoint) {
        minTOWPoint = resultArr[i][1];
      }
    }

  }
  if (dataType == 'candlestick' || dataType == 'ohlc') {
    minTOWPoint = maxTOWPoint = firstTOWPoint = resultArr[0][1];
    lastTOWPoint  = resultArr[resultArr.length-2][4];

    for(var i = 0; i < resultArr.length-1; i++) {
      if(resultArr[i][4] > maxTOWPoint) {
        maxTOWPoint = resultArr[i][4];
      }
      if(resultArr[i][4] < minTOWPoint) {
        minTOWPoint = resultArr[i][4];
      }
    }
  }

  firstTOWPointInPercent = (firstTOWPoint * 100) / (maxTOWPoint - minTOWPoint);
  lastTOWPointInPercent  = (lastTOWPoint * 100) / (maxTOWPoint - minTOWPoint);

  if (firstTOWPointInPercent < lastTOWPointInPercent) {
    shiftTOW = 50 + (lastTOWPointInPercent - firstTOWPointInPercent) / 2;
  } else if (firstTOWPointInPercent > lastTOWPointInPercent) {
    shiftTOW = 50 - ((firstTOWPointInPercent - lastTOWPointInPercent) / 2);
  } else {
    shiftTOW = 50;
  }

  if (shiftTOW > 80) {
    $('#bull1,#bear2').css({'display':'block'});
    $('#bull2,#bear1').css({'display':'none'});
  } else if (shiftTOW < 20) {
    $('#bull1,#bear2').css({'display':'none'});
    $('#bull2,#bear1').css({'display':'block'});
  } else {
    $('#bull1,#bear1').css({'display':'none'});
    $('#bull2,#bear2').css({'display':'block'});
  }

  shiftTOW += '%';

  $('.tug-of-war__indicator').css({'left':shiftTOW});
  $('.tug-of-war__lightbulb').css({'left':shiftTOW});
}
// ↑↑↑ BEM-blocks: tug-of-war (end) ↑↑↑

// made by waldteufel@ukr.net