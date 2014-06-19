
var location = 0;

//function moveLocation(direction)
//{
//  if((direction<0) && (location >0)){
//    location--;
//    }
//  if((direction>0) && (location <3)){
//    location++;
//   } 
//}

function drawBoard(canvas,width,height) {

  // draw spaces
  for(var i=0;i<4;i++)
  {
    var tl = width/8;
    var tr = width/8 + 80;
    canvas.rect(tl+i*100,height/8,80,80);
  }
  canvas.lineWidth = 5;
  canvas.strokeStyle = 'blue';
  canvas.stroke();

  //draw location
  //var tl = width/8 + 5;
  //var tr = width/8 + 80 + 5;
  //canvas.rect(tl+location*100,height/8,70,70);
  //canvas.fillStyle = 'red';
  //canvas.fill();
  
}