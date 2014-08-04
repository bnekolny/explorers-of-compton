$(document).ready(function(){

  var CANVAS_WIDTH = 300;
  var CANVAS_HEIGHT = 300;

  var canvasElement = $("<canvas id='guicanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('#gui');


  var boardValues = [[0,0,0],[0,0,0],[0,0,0]];
  var turnValue = 1;
  var winnerFound = 0;
  var winnerValue = 0;
  var winnerLine = [[0,0],[0,0]];
  var stalemate = 0;


  var h=document.getElementById("guicanvas");
  var context = h.getContext('2d');

  context.clearRect(0, 0, h.width, h.height);
  context.beginPath()
  drawGrid(context, h.width, h.height);




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
    var xImgRef=document.getElementById("x");
    var oImgRef=document.getElementById("o");

    
    for(var row=0;row<3;row++){
      for(var col=0;col<3;col++){
        if(boardValues[row][col] ==1){
          //myContext.fillStyle= "green";  
          //myContext.fillRect(col*h.width/3+h.width/12,row*h.height/3+h.height/12, h.width/6, h.height/6);   
          myContext.beginPath();
          myContext.drawImage(xImgRef,col*h.width/3,row*h.height/3);
        }
        if(boardValues[row][col] ==2){
          //myContext.fillStyle= "pink";  
          //myContext.fillRect(col*h.width/3+h.width/12,row*h.height/3+h.height/12, h.width/6, h.height/6);   
          myContext.beginPath();
          myContext.drawImage(oImgRef,col*h.width/3,row*h.height/3);
        }
      }
    }
  }



  var drawCanvas = function(mousePos){
    
        context.clearRect(0, 0, h.width, h.height);
        context.beginPath()

        var mousePos = getMousePos(canvasElement.get(0), mousePos);
        //console.log("test " + mousePos.x + " " + mousePos.y + " " +h.width/3 + " " + h.height/3);
        highlightMouseOver(h, mousePos);
        drawGrid(context, h.width, h.height);
        drawMarks(context, h.width, h.height);
        drawWinner(context, h.width, h.height);


  }

  // Draw line through winning path and output text
  var drawWinner = function(myContext,myW,myH){
    if(winnerFound){
      var horzOffset = myW/6;
      var vertOffset = myH/6;

      myContext.beginPath();
      
      myContext.moveTo(myW/3*winnerLine[0][1]+vertOffset,myH/3*winnerLine[0][0]+horzOffset);
      myContext.lineTo(myW/3*(winnerLine[1][1])+vertOffset,myH/3*(winnerLine[1][0])+horzOffset);
      myContext.lineWidth = 15;
      myContext.lineCap = "round";
      myContext.strokeStyle = "#FF0000";
      myContext.stroke();
      myContext.strokeStyle = "#000000";


      var grd = myContext.createLinearGradient(0, 0, myW, myH);

      grd.addColorStop(0.14, '#FF0000'); 
      grd.addColorStop(0.285714286, '#FF7F00'); 
      grd.addColorStop(0.428571429, '#FFFF00'); 
      grd.addColorStop(0.571428571, '#00FF00'); 
      grd.addColorStop(0.714285714, '#0000FF'); 
      grd.addColorStop(0.857142857, '#4B0082'); 
      grd.addColorStop(1.0, '#8F00FF');

      myContext.fillStyle = grd;


      if(winnerValue == 1){        
        myContext.font = "bold 80px Arial";
        myContext.fillText("X Wins!",0,myH/2);
      }
      else{
        myContext.font = "bold 80px Arial";
        myContext.fillText("O Wins!",0,myH/2);        
      }
    }
    else if(stalemate){
      myContext.font = "bold 80px Arial";
      myContext.fillText("Draw!",0,myH/2);
    }


      myContext.fillStyle = "#000000";
  }

  // Process a mouse click
  var calcClick = function(mousePos){

    var mousePos = getMousePos(canvasElement.get(0), mousePos);

    if(winnerFound == 0){
      var row=0;
      var col=0;
      var adjX = mousePos.x;
      var adjY = mousePos.y;
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
      //console.log("x" + adjX + " y " + adjY);
      //console.log("Clicked in row " + row + " and col " + col);

      //update drawing with new click
      detectWinner();
      drawCanvas(mousePos);
    }
  }


  // Look at board and search for a winner
  var detectWinner = function(){
    var boardZeros=0; 
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(boardValues[i][j] == 0)
          boardZeros++;
      }
    }
    if(boardZeros == 0){
      stalemate = 1;
    }
    // vertical line
    for(var i=0;i<3;i++){
      if( (boardValues[0][i] == boardValues[1][i]) && (boardValues[0][i] == boardValues[2][i]) && boardValues[0][i]){
        winnerFound = 1;
        winnerLine= [[0,i],[2,i]];
        winnerValue = boardValues[0][i];
      }
    }
    //horizontal line
    for(var i=0;i<3;i++){
      if( (boardValues[i][0] == boardValues[i][1]) && (boardValues[i][0] == boardValues[i][2]) && boardValues[i][0]){
        winnerFound = 1;
        winnerLine= [[i,0],[i,2]];
        winnerValue = boardValues[i][0];
      }
    }
    //diagonals
    if( (boardValues[0][0] == boardValues[1][1]) && (boardValues[0][0] == boardValues[2][2]) && boardValues[0][0]){
      winnerFound = 1;
      winnerLine= [[0,0],[2,2]];
        winnerValue = boardValues[1][1];
    }
    if( (boardValues[0][2] == boardValues[1][1]) && (boardValues[0][2] == boardValues[2][0]) && boardValues[0][2]){
      winnerFound = 1;
      winnerLine= [[0,2],[2,0]];
        winnerValue = boardValues[1][1];
    }
  }



  //event handlers
  h.addEventListener("mousemove", drawCanvas, false);
  h.addEventListener("mousedown", calcClick, false);



});
