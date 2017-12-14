var $myCanvas = $('.js-canvas');
var $rectBtn = $('.js-draw-rect');
var $lineBtn = $('.js-draw-line');
var $circleBtn = $('.js-draw-circle');
var $arrowBtn = $('.js-draw-arrow');
var $lineBtn = $('.js-draw-line');
var $penBtn = $('.js-draw-pen');
var $erraserBtn = $('.js-draw-erraser');
var $textBtn = $('.js-draw-text');
var $cnvMouseEv = $('.js-canvas-mouse-ev');
var action = 'pen';
var width = $myCanvas.width();
var height = $myCanvas.height();
var cnsEvent = {};
cnsEvent.pen = false;
cnsEvent.erraser = false;
cnsEvent.text = false;
cnsEvent.color = '#99cc00';
cnsEvent.size = 1;
var canvasPosition = $myCanvas.offset();


var socket =  io('http://nx86.ru:1489');
socket.on('connect', function(){
  console.log('connected')
  initListeners()
  socket.emit('restore', {})
});

function update(jscolor) {
  cnsEvent.color =  '#' + jscolor;
}

function updateSize(val) {
  cnsEvent.size =  val;
}

$myCanvas.drawRect({
  fillStyle: 'white',
  x: 0,
  y: 0,
  fromCenter: false,
  width: width,
  height: height
});

function btnActivate(item) {
  $('.btn-style').removeClass('_active');
  item.addClass('_active');
}

$rectBtn.click(function() {
  action = 'rectangle';
  btnActivate($(this));
})

$arrowBtn.click(function() {
  action = 'arrow';
  btnActivate($(this));
})

$circleBtn.click(function() {
  action = 'circle';
  btnActivate($(this));
})

$lineBtn.click(function() {
  action = 'line';
  btnActivate($(this));
})

$penBtn.click(function() {
  action = 'pen';
  btnActivate($(this));
})

$erraserBtn.click(function() {
  action = 'erraser';
  btnActivate($(this));
})

$textBtn.click(function() {
  action = 'text';
  btnActivate($(this));
})

function getSize() {
  cnsEvent.width = Math.abs(cnsEvent.x1 - cnsEvent.x0);
  cnsEvent.height = Math.abs(cnsEvent.y1 - cnsEvent.y0);
}

function actionErraser(evnt) {
  cnsEvent.x0 = cnsEvent.x1;
  cnsEvent.y0 = cnsEvent.y1;
  cnsEvent.x1 = (evnt.pageX - canvasPosition.left);
  cnsEvent.y1 = (evnt.pageY - canvasPosition.top);

  actionLine('#ffffff', cnsEvent.x0, cnsEvent.y0, cnsEvent.x1, cnsEvent.y1);
}

function actionPen(evnt) {
  cnsEvent.x0 = cnsEvent.x1;
  cnsEvent.y0 = cnsEvent.y1;
  cnsEvent.x1 = (evnt.pageX - canvasPosition.left);
  cnsEvent.y1 = (evnt.pageY - canvasPosition.top);

  actionLine(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.x1, cnsEvent.y1);
}

function actionText(evnt) {
  actionLetter(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.x1, cnsEvent.y1, cnsEvent.buf);
}

function penStart(evnt) {
  cnsEvent.pen = true;
  cnsEvent.x1 = (evnt.pageX - canvasPosition.left);
  cnsEvent.y1 = (evnt.pageY - canvasPosition.top);
}

function erraserStart(evnt) {
  cnsEvent.erraser = true;
  cnsEvent.x1 = (evnt.pageX - canvasPosition.left);
  cnsEvent.y1 = (evnt.pageY - canvasPosition.top);
}

function textStart(evnt) {
  cnsEvent.text = true;
  cnsEvent.buf = '';
  cnsEvent.x1 = (evnt.pageX - canvasPosition.left);
  cnsEvent.y1 = (evnt.pageY - canvasPosition.top);
}

function penFinish() {
  cnsEvent.pen = false;
}

function erraserFinish() {
  cnsEvent.erraser = false;
}

function textFinish() {
}

function actionRect(color, x0, y0, width, height) {
  socket.emit('rectangle', cnsEvent)
}

function actionCircle(color, x0, y0, width) {
  socket.emit('circle', cnsEvent)
}

function actionArrow(color, x0, y0, x1, y1) {
  socket.emit('arrow', cnsEvent)
}

function actionLine(color, x0, y0, x1, y1) {
  socket.emit('line', cnsEvent)
}

function actionLetter(evnt) {
  socket.emit('text', cnsEvent)
}

function initListeners() {
  socket.on('rectangle', function(cnsEvent) {
    cnsEvent.x0 = Math.min(cnsEvent.x0, cnsEvent.x1);
    cnsEvent.y0 = Math.min(cnsEvent.y0, cnsEvent.y1);  

    $myCanvas.drawRect({
      fillStyle: cnsEvent.color,
      x: cnsEvent.x0,
      y: cnsEvent.y0,
      fromCenter: false,
      width: cnsEvent.width,
      height: cnsEvent.height,
    })
  })

  socket.on('circle', function(cnsEvent) {
    $myCanvas.drawArc({
      fillStyle: cnsEvent.color,
      layer: true,
      x: cnsEvent.x0,
      y: cnsEvent.y0,
      radius: cnsEvent.width
    });
  })

  socket.on('arrow', function(cnsEvent) {
    $myCanvas.drawLine({
      strokeStyle: cnsEvent.color,
      strokeWidth: cnsEvent.size,
      rounded: true,
      startArrow: true,
      arrowRadius: 15,
      layer: true,
      x1: cnsEvent.x1,
      y1: cnsEvent.y1,
      x2: cnsEvent.x0,
      y2: cnsEvent.y0,
    });
  })

  socket.on('line', function(cnsEvent) {
    $myCanvas.drawLine({
      strokeStyle: cnsEvent.color,
      strokeWidth: cnsEvent.size,
      rounded: true,
      layer: true,
      x1: cnsEvent.x0,
      y1: cnsEvent.y0,
      x2: cnsEvent.x1,
      y2: cnsEvent.y1,
    });
  })

  socket.on('text', function(cnsEvent) {
    $myCanvas.drawText({
      fillStyle: cnsEvent.color,
      fontSize: (10 + cnsEvent.size) + 'pt',
      fontFamily: 'Trebuchet MS, sans-serif',
      text: cnsEvent.buf,
      x: cnsEvent.x0,
      y: cnsEvent.y0,
      align: 'left',
      respectAlign: true,
    });
  })
}

$cnvMouseEv
  .mouseup(function(e) {
    console.log(cnsEvent);
    cnsEvent.x1 = (e.pageX - canvasPosition.left);
    cnsEvent.y1 = (e.pageY - canvasPosition.top);
    getSize();

    switch (action) {
      case 'circle':
        actionCircle(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.width);
        break;
      case 'arrow':
        actionArrow(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.x1, cnsEvent.y1);
        break;
      case 'rectangle':
        actionRect(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.width, cnsEvent.height);
        break;
      case 'line':
        actionLine(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.x1, cnsEvent.y1);
        break;
      case 'pen':
        penFinish();
        break;
      case 'erraser':
        erraserFinish();
        break;
      case 'text':
        textFinish();
        break;
      default:
        actionRect(cnsEvent.color, cnsEvent.x0, cnsEvent.y0, cnsEvent.width, cnsEvent.height);
    }
  })
  .mousedown(function(e) {
    cnsEvent.x0 = (e.pageX - canvasPosition.left);
    cnsEvent.y0 = (e.pageY - canvasPosition.top);

    if (action == 'pen') {
      cnsEvent.color = '#' + $('.jscolor').val();
      penStart(e);
    }

    if (action == 'erraser') {
      cnsEvent.color = '#ffffff';
      erraserStart(e);
    }

    if (action == 'text') {
      textStart(e);
    }
  })
  .mousemove(function(e) {
    if (cnsEvent.pen) {
      actionPen(e);
    }

    if (cnsEvent.erraser) {

      actionPen(e);
      // actionErraser(e);
    }
  });

  $('body').keyup(function(e) {
    if (cnsEvent.text) {
      var letter = String.fromCharCode(e.which);
      cnsEvent.buf += letter;
      actionText(e);
    }
  });
