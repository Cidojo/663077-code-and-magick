'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 20;
var FONT_SIZE = 16;
var FONT_GAP = 12;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - GAP*2 - FONT_SIZE*4 + FONT_GAP*2;


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxTime(array) {
  for (var i = 1; i < array.length; i++) {
    var maxTime = array[0];
    if (array[i] > maxTime) {
      maxTime = array[i];
    }
    return maxTime;
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = 'black';
  ctx.font = `${FONT_SIZE} \'PT Mono\'`;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + FONT_SIZE*2);

  // var scaleMultiplier = maxTime/150;

  ctx.fillText(Math.round(getMaxTime(times)), CLOUD_X + GAP, GAP + FONT_SIZE*3 + FONT_GAP);
  ctx.fillRect(CLOUD_X + GAP, GAP + (FONT_SIZE)*3 + FONT_GAP*2, BAR_WIDTH, barHeight);
  ctx.fillText(names[0], CLOUD_X + GAP, CLOUD_Y + CLOUD_HEIGHT - GAP);

};
