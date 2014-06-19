$(document).ready(function(){

	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	var FPS = 30;
	
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
	  "' height='" + CANVAS_HEIGHT + "'></canvas");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('#cat');

	setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);

	var x=0;
	var y=0;


	function update() {
	//$(document).keydown(function(){
	  if(keydown.space) {
	  }

	  if(keydown.left) {
		moveLocation(-1)
	  }

	  if(keydown.right) {
		moveLocation(+1)
	  }

	}
	//);


	function draw() {
	  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	  
	  //
	  drawBoard(canvas, CANVAS_WIDTH, CANVAS_HEIGHT);
	}

});