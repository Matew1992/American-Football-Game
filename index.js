let currentGame;
let opponentSpawnBuffer;
let opponentSpawnDifficulty;
let backgroundImage;
let canvas;
let player = { x: 600, y: 380, w: 60, h: 70 };
let playerGoingLeft = false;
let playerGoingRight = false;
let playerGoingUp = false;
let playerGoingDown = false;
let opponent1;
let opponent2;
let opponent3;
let opponent4;
let opponentsArray = [];
let healthBar = 50;
let highScoreArr = [0];
let highScore = 0;
let gameOver;

window.onload = () => {

};

function startGame() {
  let mainScreen = document.getElementById("game-intro");
  mainScreen.style.display = "none";
  let nflTitle = document.getElementById("title-NFL");
  nflTitle.style.display = "none"
  canvas.show();
  opponentsArray = [
    { img: opponent1, y: random(80, 500), x: width - 70, w: 50, h: 50 },
    { img: opponent2, y: random(80, 500), x: width - 70, w: 50, h: 50 },
    { img: opponent3, y: random(80, 500), x: width - 70, w: 50, h: 50 },
    { img: opponent4, y: random(80, 500), x: width - 70, w: 50, h: 50 },
  ];
  loop();
  inPlayMusic.play();
  Music.loop();
}

function preload() {
  backgroundImage = loadImage("/assets/images/aff.png");
  player.img = loadImage("/assets/images/player1.gif");
  opponent1 = loadImage("/assets/images/opponent1.gif");
  opponent2 = loadImage("/assets/images/opponent2.gif");
  opponent3 = loadImage("/assets/images/opponent3.gif");
  opponent4 = loadImage("/assets/images/opponent4.gif");
  Opponent = loadImage("/assets/images/opponent1.gif");
  touchDownSound = loadSound("");
  gameOverSound = loadSound("");
}

function setup() {
  noLoop();
  canvas = createCanvas(900, 700);
  canvas.hide();
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    gameOver.style.display = "none";

    startGame();
  };
}

function collideOpponents() {
  for (let i = 0; i < opponentsArray.length; i++) {
    if (
      player.x < opponentsArray[i].x + opponentsArray[i].w &&
      player.x + player.w > opponentsArray[i].x &&
      player.y < opponentsArray[i].y + opponentsArray[i].h &&
      player.y + player.h > opponentsArray[i].y
    ) {
      opponentssArray[i].y = -20;
      opponentsArray[i].x = random(80, 50);
      return true;
    }
  }
}

function draw() {
  image(backgroundImage, 0, 0, 900, 700);
  image(player.img, player.x, player.y, 50, 50);
  textSize(20);
  fill(0, 200, 0);
  text(`Score: ${highScore}`, 580, 50);

  strokeWeight(0);
  fill(0, 200, 0);
  rect(20, 20, healthBar, 20);
  if (frameCount % 120 === 0) {
    opponentsArray.push({ img: opponent1, y: random(80, 500), x: width - 70, w: 50, h: 50 });
  }
  for (let i = opponentsArray.length - 1; i > 0; i--) {
    image(
      opponentsArray[i].img,
      opponentsArray[i].x,
      opponentsArray[i].y,
      opponentsArray[i].w,
      opponentsArray[i].h
    );
    opponentsArray[i].x -=2;
    if (opponentsArray[i].x < 0) {
      opponentsArray.splice
    }
  }
  //this is needed when the player dies
  let mainScreen = document.getElementById("game-over");
  mainScreen.style.display = "none";

  if (playerGoingRight) {
    player.x += 4;
  }
  if (playerGoingLeft) {
    player.x -= 4;
  }
  if (playerGoingUp) {
    player.y -= 4;
  }
  if (playerGoingDown) {
    player.y += 4;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    playerGoingRight = true;
  }
  if (keyCode === LEFT_ARROW) {
    playerGoingLeft = true;
  }
  if (keyCode === UP_ARROW) {
    playerGoingUp = true;
  }
  if (keyCode === DOWN_ARROW) {
    playerGoingDown = true;
  }
}

function keyReleased() {
  playerGoingLeft = false;
  playerGoingRight = false;
  playerGoingDown = false;
  playerGoingUp = false;
}
