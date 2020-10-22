
var   monkey, monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;

var PLAY = 1;
var END =0;
var gamestate = PLAY;
var time=0;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  
  monkey = createSprite(200,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.09;

  
  
  ground = createSprite(200,380,600,5);
  
  ground.x = ground.width/2;
  ground.shapeColor = "green"
  
  obstacleGroup = new Group();
FoodGroup = new Group();
  
 
  
  textSize(15);
  fill("blue")
  
}


function draw() {
  background("lightgreen");
  text("survived for : "+time, 300,50);
 
  
  
  if(gamestate === PLAY){
    monkey.visible = true;
   ground.visible = true; 
  spawnFood();
 
    
  ground.velocityX = -(5 + 3*score/3);
  
  if(ground.x < 350){
   ground.x = ground.width/2; 
  }       
  
  if(keyDown("space") && monkey.y>349){
     
    monkey.velocityY = -14;
    
     }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
    
    time =   Math.round(frameCount/100)
    
  
  if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach(); 
    score = score +1;
  }
     drawSprites();
  text("Bananas:"+score, 480,50)
  
  if(obstacleGroup.isTouching(monkey)){
    gamestate = END;
    
     FoodGroup.destroyEach(); 
     obstacleGroup.destroyEach(); 
  } 
   
  }
  
  if(gamestate === END){
    background("black")
    text("press p to play again", 220,260)
   text("GAME OVER !", 250,200);
      
    if(keyDown("p") && gamestate===END){
   gamestate = PLAY; 
      monkey.addAnimation("running",monkey_running)
  time=0
  score=0;
       
  }
  
  
  }
    
   
  
   
  

}



function spawnFood() {
 
  if(frameCount% 160 === 0){
   banana = createSprite(600,Math.round(random(200,300)))
  banana.addImage(bananaImage);
  banana.scale = 0.07;
      FoodGroup.add(banana)
    banana.velocityX = -(5 + 2*score/3);
    obstacle = createSprite(600,360)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -(5 + 2*score/3);
    obstacleGroup.add(obstacle);
} 
  }







