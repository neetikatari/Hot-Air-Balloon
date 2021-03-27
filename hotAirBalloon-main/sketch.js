var balloon;
var database;
var position;
function preload(){
  backgroundImage = loadImage("Hot Air Ballon-01.png");
  balloonImage = loadImage("Hot Air Ballon-02.png");
  balloonImage2 = loadImage("Hot Air Ballon-03.png");
  balloonImage3 = loadImage("Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1500,900);
  database = firebase.database();
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);
  balloon = createSprite(200,200,20,20);
  balloon.addImage(balloonImage);
  
  

}
//reading from firebase 
function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}


function draw() {
  background(backgroundImage);  
  textSize(30);
  fill("black");
  stroke("brown");
  text("Use arrow keys to move the hot air balloon",20,120);
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10;
  }
  if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10;
  }
  if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;
  }
  
  if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage3);
    balloon.scale = balloon.scale+0.01;
  }

  drawSprites();
}
function updatePosition(x,y){
   database.ref("balloon/height").update({
     x:height.x+x,
     y:height.y+y
    });
}
function showError(){
  console.log("Error in writing to the database");
}