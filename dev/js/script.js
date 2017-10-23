var project = {
    init: function() {
        this.initCache();
        this.initCanvas();
    },

    initCache: function() {
        this.$body = $('body');
        this.$canvas = $('.js-canvas');
        
    },
    initCanvas: function () {
        var $myCanvas = $('#canvas');
        console.log($myCanvas);

        // rectangle shape 
        $myCanvas.drawRect({
          fillStyle: 'red',
          strokeStyle: 'blue',
          strokeWidth: 4,
          x: 190,
          y: 50,
          fromCenter: false,
          width: 200,
          height: 100
        });
    }

};

$(document).ready(function () {
    project.init();
});


