'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_HEIGHT = 16;
var GAP = 60;
var BAR_WIDTH = 40;
var BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = 'black';
  ctx.font = `${TEXT_HEIGHT} \'PT Mono\'`;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + TEXT_HEIGHT);

  for (var i = 1; i < times.length; i++) {
    var maxTime = times[0];
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  var scaleMultiplier = maxTime/150;

  ctx.fillRect(170, 250, -40, -150);

  ctx.fillText(Math.round(maxTime), 130, 270);
};
