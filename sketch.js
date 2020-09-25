var player, heli, playButton, playButton_IMG, reset, reset_IMG;
var rocks, rocks2, rocks_IMG;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var rocksGroup;
var score = 0;
var count = 80;

function preload() {
  heli = loadImage("heli.png");
  playButton_IMG = loadImage("PlayButtonHighlight.png")
  rocks_IMG = loadImage("rocks.png");
  reset_IMG = loadImage("reset.png");
}

function setup() {
  createCanvas(800,700);
  player = createSprite(400, 200, 50, 50);
  player.addImage(heli);
  player.scale = 2;
  player.visible = false;
  player.setCollider("circle", 0, -10, 15);

  playButton = createSprite(390, 340, 30, 15);
  playButton.addImage(playButton_IMG);
  playButton.scale = 0.2;

  rocksGroup = new Group();

  reset = createSprite(390, 430, 50, 50);
  reset.addImage(reset_IMG);
  reset.scale = 0.3;
  reset.visible = false;
}

function draw() {
  background(0);
if(gameState === START) {
  if(mousePressedOver(playButton)) {
      player.visible = true;
      playButton.visible = false;
      gameState = PLAY;
  }
}

  edges = createEdgeSprites();
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
  player.bounceOff(edges[2]);
  player.bounceOff(edges[3]);

  if(gameState === PLAY) {
    
    playButton.destroy();

    spawnRocks();
    spawnRocks2();

    score = score+Math.round(getFrameRate()/60);

    if(keyWentDown(UP_ARROW)) {
      player.velocityY = -5;
    }
    if(keyWentDown(DOWN_ARROW)) {
      player.velocityY = 5;
    }
    if(keyWentDown(LEFT_ARROW)) {
      player.velocityX = -5;
    }
    if(keyWentDown(RIGHT_ARROW)) {
      player.velocityX = 5;
    }

    if(keyWentDown("space")) {
      if(player.velocityX > 0) {
        player.velocityX = player.velocityX + 2;
      }
      if(player.velocityX < 0) {
        player.velocityX = player.velocityX - 2;
      }
      if(player.velocityY > 0) {
        player.velocityY = player.velocityY + 2;
      }
      if(player.velocityY < 0) {
        player.velocityY = player.velocityY - 2;
      }
    }

    if(rocksGroup.isTouching(player)) {
      gameState = END;
    }
  }
  else if(gameState === END) {
    player.setVelocity(0, 0);
    rocksGroup.setLifetimeEach(-1);
    rocksGroup.setVelocityEach(0, 0);

    reset.visible = true;

    textSize(50);
    fill("white");
    text("Game Over", 270, 350);

    if(mousePressedOver(reset)) {
      restart();
    }
  }
  
  textSize(15);
  fill("white");
  text("Score: "+score, 20, 20);

  drawSprites();
}

function restart() {
  count = 80;
  score = 0;
  rocksGroup.destroyEach();
  gameState = PLAY;
  reset.visible = false;
}

function spawnRocks() {
  if (frameCount % count === 0) {
    rocks = createSprite(800, 400, 50, 50);
    rocks.y = random(0, 700);
    rocks.addImage(rocks_IMG);
    rocks.scale = 0.1;
    
    var rand = Math.round(random(1, 2));
    if(rand === 1) {
      rocks.x = 0;
      rocks.velocityX = 5;
    }
    if(rand === 2) {
      rocks.x = 800;
      rocks.velocityX = -5;
    }
    
    rocks.lifetime = 160;
    
    rocksGroup.add(rocks);
  }
  if( count > 20) {
    if(frameCount % 100 === 0) {
      count = count - 5;
    }
  }
  
  console.log(frameCount);
  console.log(count);
}

function spawnRocks2() {
  if (frameCount % count === 0) {
    rocks2 = createSprite(400, 700, 50, 50);
    rocks2.x = random(0, 800);
    rocks2.addImage(rocks_IMG);
    rocks2.scale = 0.1;
    
    var rand2 = Math.round(random(1, 2));
    if(rand2 === 1) {
      rocks2.y = 0;
      rocks2.velocityY = 5;
    }
    if(rand2 === 2) {
      rocks2.y = 700;
      rocks2.velocityY = -5;
    }
    
    rocks2.lifetime = 160;
    rocksGroup.add(rocks2);
  }
  if(count > 20) {
    if(frameCount % 100 === 0) {
      count = count - 5;
    }
  }
}