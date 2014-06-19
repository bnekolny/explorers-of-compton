$(document).ready(function(){

  var CANVAS_WIDTH = 300;
  var CANVAS_HEIGHT = 300;
  
  var canvasElement = $("<canvas id='guicanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('#gui');

  function writeMessage(canvasElement, message) {
    var context = canvasElement.getContext('2d');
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  }

  function getMousePos(canvasElement, evt) {
    var rect = canvasElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  function highlightMouseOver(h, mousePos)
  {
    var context = h.getContext('2d');
    context.fillStyle= "yellow";
    
    var xStart=0;
    var yStart=0;
    // Draw mouse over box
    if((mousePos.x < h.width/3)){
      xStart =0;
    }
    else if((mousePos.x < 2*h.width/3)){
      xStart =h.width/3;
    }
    else if((mousePos.x < h.width)){
      xStart =2*h.width/3;
    }
    if((mousePos.y < h.height/3)){
      yStart =0;
    }
    else if((mousePos.y < 2*h.height/3)){
      yStart =h.height/3;
    }
    else if((mousePos.y < h.height)){
      yStart =2*h.height/3;
    }    
    
    context.fillRect(xStart,yStart, h.width/3, h.height/3);   
  }

  var h=document.getElementById("guicanvas");
  h.addEventListener("mousemove", function(evt){
        var context = h.getContext('2d');
    
    
        context.clearRect(0, 0, h.width, h.height);
        context.beginPath()
  
        var mousePos = getMousePos(canvasElement.get(0), evt);
        //console.log("test " + mousePos.x + " " + mousePos.y + " " +h.width/3 + " " + h.height/3);
          highlightMouseOver(h, mousePos);
        
      }, false);



});
