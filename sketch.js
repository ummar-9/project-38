/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var shrubsGroup;
var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  kangaroo = createSprite(100,350,20,20);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.scale = 0.2;

  invisiblejungle = createSprite(400,400,800,100);
  invisiblejungle.visible = false;
  
  kangaroo.setCollider("circle",0,0,300);
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x = camera.position.x-270;
if(gameState === PLAY){
jungle.velocityX = -6;

if(jungle.x<100)
{
   jungle.x=400
}
if(keyDown("space")){
  jumpSound.play();
kangaroo.velocityY = -12;
}
kangaroo.velocityY = kangaroo.velocityY +1
spawnShrubs();
spawnObstacles();

if(obstaclesGroup.isTouching(kangaroo)){
  collidedSound.play();
  gameState = END;
}
if(shrubsGroup.isTouching(kangaroo)){
  shrubsGroup.destroyEach();
}
}
else if (gameState === END) {
 
  kangaroo.velocityY = 0;
  jungle.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  shrubsGroup.setVelocityXEach(0);
  kangaroo.changeAnimation("collided",kangaroo_collided);
  obstaclesGroup.setLifetimeEach(-1);
  shrubsGroup.setLifetimeEach(-1);
  
}
kangaroo.collide(invisiblejungle);
drawSprites();

}
function spawnShrubs() {
 
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,40,10);
    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.5;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
    
    shrub.scale = 0.1;
    shrub.lifetime = 400;
    shrubsGroup.add(shrub);
    
  }
}
function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.2;
          
   
    obstacle.lifetime = 400;

    obstaclesGroup.add(obstacle);
    
  }
}