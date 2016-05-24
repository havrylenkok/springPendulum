"use strict";

var toStop = false;

$(document).ready(function () {
  $("#start").on('click', start);
  $("#stop").on('click', stop);
  var height = 210;
  $("#img").height(height);
  $("#img").width(height * 1.5);
});

function start() {
  toStop = false;
  var height = 210;
  $("#img").height(height);
  $("#img").width(height * 1.5);
  $("#curT").text(0);
  var k = parseInt($("#k").val(), 10); // 5
  var m = parseInt($("#m").val(), 10); // 3
  var T = parseInt($("#T").val(), 10); // 70
  var h = 0.1;
  var n = T / h;
  var c = parseInt($("#c").val(), 10); // 1
  var y0 = parseInt($("#y0").val(), 10); // 3
  var v0 = parseInt($("#v0").val(), 10); // 0
  var y = [];
  y[0] = y0;
  var v = [];
  v[0] = v0;


  for (var i = 1; i < n; i++) {
    v[i] = v[i - 1] + (-c * v[i - 1] / m - k * y[i - 1] / m) * h;
    y[i] = y[i - 1] + v[i - 1] * h;
  }

  animate(n, y, h);
}

function animate(n, y, h) {
  var img = $("#img");
  var standartHeight = img.height();

  var T = 0;
  var counter = 0;
  console.log(n);
  for(var i = 0; i < n; i++) {
    if(toStop) {
      break;
    }
    $("#img").animate({height :  standartHeight + standartHeight * Math.abs(y[i])}, 100, function () {
      if(n % 10 == 0) {
        counter++;
        if(counter % 10 == 0) {
          $("#curT").text(++T);
        }
      }
    });
  }
}

function stop() {
  $("#img").stop(true, true);
  toStop = true;
}
