var player,diamond,diamondImage, diamondsGroup,score = 0,invisibleground,laserbeam, laserImage, laserbeamGroup,life=10,blank1,blank2, blank1Image,blank2Image,strawberry,strawberryImage, strawberryGroup, collider, colliderGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){

diamondImage = loadAnimation("Diamond.png");
laserImage = loadAnimation("laser.png");
blank1Image = loadAnimation("win.png"); 
blank2Image = loadAnimation("Loose.png");
strawberryImage = loadAnimation("Strawberry.png");
}

function setup() {
canvas = createCanvas(displayWidth-20,displayHeight-150);

diamondsGroup = new Group();
laserbeamGroup= new Group();
strawberryGroup=new Group();
colliderGroup = new Group();


player = createSprite(50,300,20,20);
player.setCollider("circle",0,0);
player.debug = true;

invisibleground = createSprite(200,550,100000,10);

blank1 = createSprite(camera.x,200,400,400);
blank1.addAnimation("blank",blank1Image);
blank1.visible = false;
blank1.scale = 2.2;

blank2 = createSprite(camera.x,200,400,400);
blank2.addAnimation("blank",blank2Image);
blank2.visible = false;
blank2.scale = 2;
  
}
function draw() {
    background("green");
if (gameState === PLAY){

camera.x = player.x;

spawndiamonds();
spawnstrawberry();
spawnlaserbeam();
spawncollider();
 
if (keyDown("space")){
player.velocityY = -10;
}else{
player.velocityY = 4;
}
if (keyDown(RIGHT_ARROW)){
player.x = player.x + 10;
}
if (keyDown(LEFT_ARROW)){
player.x = player.x - 10;
}

player.velocityY = player.velocityY + 0.40; 
player.collide(invisibleground);
    
if (player.isTouching(diamondsGroup)){
diamondsGroup.destroyEach();
score = score+5;
}
if (player.isTouching(strawberryGroup)){
strawberryGroup.destroyEach();
score = score+1;
}
if (player.isTouching(laserbeamGroup)){
laserbeamGroup.destroyEach();
life = life-2;
}

if (player.isTouching(colliderGroup)){
player.velocityY = 0;
}
  
if (score===20){
blank1.visible=true;
camera.position.x=50;
camera.position.y=300;
gameState = END;
}
if (life<1){
gameState = END;
blank2.visible=true;
}
if (gameState ===END){
score.visible = false;
life= 0;
strawberryGroup.destroyEach();
colliderGroup.destroyEach();
}
drawSprites();
fill("red");
textSize(20);
text("Score:"+score,camera.x+100,50);
text("Life:"+life,camera.x,50)
text("USE RIGHT AND LEFT ARROW KEYS",10,200)
}
}
function spawndiamonds(){
if (frameCount%600===0){
diamond = createSprite(camera.x+width/2,400,490,20,20);
diamond.addAnimation("diamond",diamondImage);
diamond.scale = 0.3;
player.depth = diamond.depth;
player.depth = player.depth+1;
diamondsGroup.add(diamond);
}
}
function spawnlaserbeam(){
if (frameCount%60===0){
laserbeam = createSprite(camera.x+width/2,490,40,40);
laserbeam.addAnimation("laser",laserImage);
laserbeam.scale = 0.13;
//laserbeam.collide(ground);
laserbeam.setlifetime = 150;
player.depth = laserbeam.depth;
player.depth = player.depth+1;
laserbeamGroup.add(laserbeam);
}
}
function spawnstrawberry(){
if (frameCount%100===0){
strawberry = createSprite(camera.x+width/2,490,20,20);  
strawberry.addAnimation("strawberry",strawberryImage);
strawberry.scale = 0.3;
player.depth = strawberry.depth; 
player.depth = player.depth+1;
strawberry.collide(invisibleground);
strawberryGroup.add(strawberry);
}
}
function spawncollider(){
if (frameCount%50===0){
collider = createSprite(camera.x+width/2,300,50,10);
colliderGroup.add(collider);
} 
}