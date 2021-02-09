var PLAY = 1;
var END = 0;
var START = 1;
var gameState = PLAY;

var cloud, cloud_Image, cloud_death;
var backgr, background_image;
var obstaclesGroup, obstacle1, obstacle2;
var score = 0;

function preload(){
  
  cloud_Image = loadAnimation("cloud.png");
  
  mountainImg = loadImage("Ground.png");
  
  background_image = loadImage("bg image2.png");
  
   background2_image = loadImage("Instruction box.png");
  
  obstacle1 = loadImage("bird1.png");
  obstacle2 = loadImage("blackCloud.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restet botton.png");
  
  cloudDeath = loadAnimation("cloudDeath.png");
  
  dieSound = loadSound("salamisound-3603409-sfx-power-up-30-games.mp3");
  
  checkPoint = loadSound("salamisound-4809067-sfx-power-up-27-games.mp3")

}

function setup() {
  createCanvas(400, 600);

  backgr = createSprite(200,300,400,600);
  backgr.addImage(background_image);
  backgr.scale = 1;
  backgr.x = backgr.width /2;

  cloud = createSprite(50,300,20,50);
  cloud.addAnimation("cloudImg",cloud_Image);
  cloud.scale = 0.3;
  cloud.addAnimation("Death",cloudDeath);
  cloud.setCollider("rectangle",0,0,200,350);
  cloud.debug = false;
  cloud.velocityY = 0;   
  
  invisibleGround = createSprite(200,590,600,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(200,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,500);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  backgr2 = createSprite(200,300,400,600);
  backgr2.addImage(background2_image);
  backgr2.scale = 1.3;
  backgr2.visible = false;

  
   obstaclesGroup1 = new Group();
   obstaclesGroup2 = new Group();
}

function draw() {
  background(220);
   if(cloud.isTouching(obstaclesGroup1)||cloud.isTouching(obstaclesGroup2)){
    gameState = END;
    dieSound.play() ;            
  }
 if (cloud.isTouching(invisibleGround)){
    gameState = END;
  }
  
  if (gameState==PLAY){
   
    if(keyDown("space") && cloud.y >= 159) {
      cloud.velocityY = -12;
    }
    backgr.velocityX = -6;
    
     score = score + Math.round(getFrameRate()/60);
  
     cloud.velocityY = cloud.velocityY + 0.8;
    
      spawnObstacles();
   if(score>0 && score%100 === 0){
     checkPoint.play();
   }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    backgr.velocityX = -0;
    
    cloud.velocityY = 0;
    
   cloud.changeAnimation("Death",cloudDeath);
    cloud.scale = 0.9;
    
  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup1.setLifetimeEach(-1);
    obstaclesGroup2.setLifetimeEach(-1);
    

    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
    
    if (backgr.x < 150){
      backgr.x = backgr.width/2;
   }   
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 150,40);

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    bird = createSprite(600,305,10,40);
    bird.addImage(obstacle1);
    blackCloud = createSprite(600,165,10,40);
    blackCloud.addImage(obstacle2);
    bird.velocityX =-(6 + 3*score/100);
    blackCloud.velocityX = -(6 + 3*score/100);
  
    bird.y = Math.round(random(100,500));
    blackCloud.y = Math.round(random(100,500));

    bird.scale = 0.5;
    bird.lifetime = 200;
    
    blackCloud.scale = 0.6;
    blackCloud.lifetime = 200;
    
    bird.setCollider("circle",1000,300,40)
    bird.debug = true;
    
    bird.setCollider("circle",0,0,30);
    bird.debug = false;
    
    blackCloud.setCollider("rectangle",0,0,120,100);
    blackCloud.debug = false;
    
    obstaclesGroup1.add(bird);
    obstaclesGroup2.add(blackCloud);
    }
}
function reset(){
  gameState = PLAY;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup1.destroyEach();
  obstaclesGroup2.destroyEach();

  cloud.changeAnimation("cloudImg",cloud_Image);
  cloud.scale = 0.3;
  cloud.y = 300;
   score = 0;
}