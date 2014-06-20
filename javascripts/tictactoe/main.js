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

function drawGrid(myContext,myW,myH){
  myContext.beginPath();
  
  // vertical lines
  myContext.moveTo(myW/3,0);
  myContext.lineTo(myW/3,myH);
  myContext.moveTo(2*myW/3,0);
  myContext.lineTo(2*myW/3,myH);

  //horizontal lines
  myContext.moveTo(0,myH/3);
  myContext.lineTo(myW,myH/3);
  myContext.moveTo(0, 2*myH/3);
  myContext.lineTo(myW,2*myH/3);
  myContext.lineWidth = 15;

  myContext.stroke();

}


function drawMarks(myContext,myW,myH){
  myContext.beginPath();
  
  for(var row=0;row<3;row++){
    for(var col=0;col<3;col++){
      if(boardValues[row][col] ==1){
        context.fillStyle= "green";  
        context.fillRect(col*h.width/3+h.width/12,row*h.height/3+h.height/12, h.width/6, h.height/6);   
      }
      if(boardValues[row][col] ==2){
        context.fillStyle= "pink";  
        context.fillRect(col*h.width/3+h.width/12,row*h.height/3+h.height/12, h.width/6, h.height/6);   
      }
    }
  }
}

var boardValues = [[0,0,0],[0,0,0],[0,0,0]];
var turnValue = 1;


var h=document.getElementById("guicanvas");
var context = h.getContext('2d');

context.clearRect(0, 0, h.width, h.height);
context.beginPath()
drawGrid(context, h.width, h.height);




h.addEventListener("mousemove", function(evt){
  
  
      context.clearRect(0, 0, h.width, h.height);
      context.beginPath()

      var mousePos = getMousePos(canvasElement.get(0), evt);
      //console.log("test " + mousePos.x + " " + mousePos.y + " " +h.width/3 + " " + h.height/3);
      highlightMouseOver(h, mousePos);
      drawGrid(context, h.width, h.height);
      drawMarks(context, h.width, h.height);
    }, false);





h.addEventListener("mousedown", function(mousePos){
  
  var row=0;
  var col=0;
  var adjX = mousePos.x - h.offsetLeft;
  var adjY = mousePos.y - h.offsetTop;
  // Draw mouse over box
  if((adjX < h.width/3)){
    col =0;
  }
  else if((adjX < 2*h.width/3)){
    col =1;
  }
  else if((adjX < h.width)){
    col =2;
  }


  if((adjY < h.height/3)){
    row =0;
  }
  else if((adjY < 2*h.height/3)){
    row =1;
  }
  else if((adjY < h.height)){
    row =2;
  }    


  if(boardValues[row][col] == 0){
    boardValues[row][col] = turnValue;
    if(turnValue == 1)
      turnValue = 2;
    else
      turnValue = 1;
  }
  console.log("x" + adjX + " y " + adjY);
  console.log("Clicked in row " + row + " and col " + col);

    }, false);



});
