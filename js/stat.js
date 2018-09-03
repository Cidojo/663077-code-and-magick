'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 20;
var BAR_GAP = 50;
var FONT_SIZE = 16;
var FONT_GAP = 8;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - GAP * 2 - FONT_SIZE * 4 - FONT_GAP * 2;


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxTime(array) {
  var maxTime = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxTime) {
      maxTime = array[i];
    }
  }
  return Math.round(maxTime);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = 'black';
  ctx.font = FONT_SIZE + ' ' + 'PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + FONT_SIZE * 2);

  var scaleMultiplier = barHeight / getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomSaturay = Math.round(Math.random()) * 100;
      ctx.fillStyle = 'hsl(240, ' + randomSaturay + '%, 50%)';
    }
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - FONT_GAP, BAR_WIDTH, (-1) * Math.round(times[i]) * scaleMultiplier);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - FONT_GAP * 2 - Math.round(times[i]) * scaleMultiplier);
  }
};
