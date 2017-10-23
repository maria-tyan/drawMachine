var $myCanvas = $('.js-canvas');
var $rectBtn = $('.js-draw-rect');
var $lineBtn = $('.js-draw-line');
var $circleBtn = $('.js-draw-circle');
var $arrowBtn = $('.js-draw-arrow');
var color = '#eee';
var action = 'rectangle'
var width = $myCanvas.width();
var height = $myCanvas.height();
var cnsEvent = {};
var canvasPosition = $myCanvas.offset();

$myCanvas.drawRect({
  fillStyle: 'white',
  x: 0,
  y: 0,
  fromCenter: false,
  width: width,
  height: height
});

$rectBtn.click(function() {
  $myCanvas.drawRect({
    fillStyle: color,
    x: 10,
    y: 10,
    fromCenter: false,
    width: 100,
    height: 100,
    layer: true,
    draggable: true,
    mousemove: function(layer) {
      var delta = Math.sqrt(Math.pow(layer.dx, 2) + Math.pow(layer.dy, 2));
      if (delta !== 0) {
        layer.opacity = 1 / delta;
      }
    }
  })
})

$arrowBtn.click(function() {
  $myCanvas.drawVector({
    strokeStyle: '#000',
    strokeWidth: 4,
    rounded: true,
    endArrow: true,
    arrowRadius: 15,
    arrowAngle: 90,
    layer: true,
    x: 50, y: 50,
    a1: 180, l1: 100,
    a2: 90, l2: 100
  });
})

$circleBtn.click(function() {
  $myCanvas.drawArc({
    fillStyle: color,
    layer: true,
    x: 100, y: 100,
    radius: 50
  });
})

$myCanvas.on('mousedown', function(e) {
  getStartCoor(e);
  console.log(cnsEvent);
});

$myCanvas.mouseup(function(e) {
  getFinishCoor(e);
  getSize();
  console.log(cnsEvent);

  $myCanvas.drawRect({
    fillStyle: color,
    x: cnsEvent.x0,
    y: cnsEvent.y0,
    fromCenter: false,
    width: Math.abs(cnsEvent.x0 - cnsEvent.x1),
    height: Math.abs(cnsEvent.y0 - cnsEvent.y1),
  })
});

function getStartCoor(cnsEvent) {
  cnsEvent.x0 = (cnsEvent.pageX - canvasPosition.left);
  cnsEvent.y0 = (cnsEvent.pageY - canvasPosition.top);
}

function getFinishCoor(cnsEvent) {
  cnsEvent.x1 = (cnsEvent.pageX - canvasPosition.left);
  cnsEvent.y1 = (cnsEvent.pageY - canvasPosition.top);
}

function getSize() {
  cnsEvent.width = Math.abs(cnsEvent.x0 - cnsEvent.x1);
  cnsEvent.height = Math.abs(cnsEvent.y0 - cnsEvent.y1);
}