var trex;
var trexAnim;
var edges;
var ground;
var groundAnim;
var ground2;
var check;
var clouds;
var cloudsAnim;
var obstacle;
var o1;
var o2;
var o3;
var o4;
var o5;
var o6;
var score = 0;
var cloudsGroup;
var obsGroup;
var PLAY = 1;
var END = 0;
var gameState;
var TrexDied;
var gameOver;
var restart;
var gameOverAnim;
var restartAnim;
var dieSound;
var jumpSound;
var checkpointsound;

gameState = PLAY


function preload()
{
trexAnim=
loadAnimation("trex1.png","trex3.png","trex4.png");
groundAnim=
loadImage("ground2.png");
cloudsAnim= loadImage("cloud.png");
o1 = loadImage ("obstacle1.png");
o2 = loadImage ("obstacle2.png");
o3 = loadImage ("obstacle3.png");
o4 = loadImage ("obstacle4.png");
o5 = loadImage ("obstacle5.png");
o6 = loadImage ("obstacle6.png");
TrexDied= loadAnimation ("trex_collided.png");
gameOverAnim = loadImage ("gameOver.png");
restartAnim = loadImage ("restart.png");
dieSound = loadSound ("die.mp3")
jumpSound = loadSound ("jump.mp3")
checkpointSound = loadSound ("checkPoint.mp3")
}


function setup()
{
  createCanvas(400,400);
  trex = createSprite(50,300,10,10);
  trex.addAnimation("run", trexAnim);
  trex.scale = 0.5;
  trex.addAnimation("dead" , TrexDied);
  
  //trex.debug=true;
  //trex.setCollider ("rectangle",0,0,150,100)
  trex.setCollider ("circle",0,0,30)
  
  
  edges = createEdgeSprites()

  ground = createSprite(200,380,400,10)
  ground.addImage(groundAnim);
  ground2 = createSprite(200,390,400,10)
  ground2.visible = false;
  check=Math.round(random(1 ,10));
  console.log=(check);
  cloudsGroup = new Group();
  obsGroup = new Group();
  
 gameOver = createSprite(200,200,40,10)
 gameOver.addImage(gameOverAnim);
 gameOver.scale = 0.6
 restart =  createSprite(200,240,40,10)
 restart.addImage(restartAnim);
 restart.scale = 0.6
  
}
function draw()
{

  background(250);
  if (gameState===PLAY)
  {
      ground.velocityX = -(2+score/100);
      if(keyDown("space") && trex.y > 360  )
     {
       trex.velocityY = -10;
       trex.velocityX = 0;
       
       jumpSound.play()
       
     }
       if(ground.x < 0)
      {
        ground.x = 200  
        ground.y = 380
      }
    
    if(frameCount%50===0)
 {
  spawnClouds();
 }
  
 if(frameCount%70===0)
 {
  spawnObstacles(); 
 }
  
  if(frameCount%1===0)
  {
    score = score+1
  }
    trex.velocityY = trex.velocityY + 0.5; 
  
if(trex.isTouching (obsGroup))
{
 gameState=END; 
  //trex.velocityY = -10
  dieSound.play()
}
    
gameOver.visible = false
restart.visible = false
    
if (score%100===0 && score>0)
{
  checkpointSound.play()
}
    

  }
 
  
  
  else if (gameState===END)
  {
    ground.velocityX = 0;
    
     gameOver.visible = true
     restart.visible = true
    
    cloudsGroup.setVelocityXEach(0)
    obsGroup.setVelocityXEach(0)
    
    obsGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
    trex.changeAnimation( "dead" , TrexDied )
    trex.velocityY = 0;
    
      if(mousePressedOver(restart))
    {
      reset();
    }
  
  } 
  

  trex.collide(ground2)
  


  drawSprites();
  
 
  text("score : " + score, 330, 30)
  
  console.log = (trex.y) 
  
} 

function spawnClouds()
{
  clouds = createSprite (360, 360, 10, 10);
  clouds.y=Math.round(random(75 ,200));
  clouds.addImage(cloudsAnim)
  clouds.scale = 0.6
  clouds.velocityX = -4;
  clouds.lifetime = 100;
  
  cloudsGroup.add(clouds);
}

function spawnObstacles()
{
  obstacle = createSprite (360, 370,  10, 10);
  obstacle.velocityX = -(3+score/100);   
  var cactus = Math.round(random(1,6));
  switch(cactus)
 {
   case 1: obstacle.addImage(o1)
   break;
   
   case 2: obstacle.addImage(o2)
   break;
   
   case 3: obstacle.addImage(o3)
   break;
   
   case 4: obstacle.addImage(o4)
   break;
   
   case 5: obstacle.addImage(o5)
   break;
   
   case 6: obstacle.addImage(o6)
   break;
  
 }
  obstacle.scale = 0.5
  obsGroup.add(obstacle);
  obstacle.lifetime = 100;
  
  
}

function reset()
{
  gameState=PLAY;
  obsGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("run",trexAnim);
  score=0;
}