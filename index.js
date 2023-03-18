// const restartButton = document.getElementById('restart-button');
// const retryButton = document.getElementById('start-button');
// let highScoreArr = [0];
// let opponentSpawnBuffer;
// let opponentSpawnDifficulty;
let backgroundImage;
let canvas;
let player = { x: 500, y: 300, w: 50, h: 50 };
let playerGoingLeft = false;
let playerGoingRight = false;
let playerGoingUp = false;
let playerGoingDown = false;
let opponent1;
let opponent2;
let opponent3;
let opponent4;
let enemiesSpeed = 5;
let opponentsArray = [];
let healthBar = 100;
let score = 0;
let introSound;
let inGameSound;
let gameOverSound;
let collisionSound;
let matchpointSound;
let woohSound;
let width = window.innerWidth;
let height = window.innerHeight;
let gameOverScreen = document.querySelector("#game-over");
let gameWinnerScreen = document.querySelector("#game-winner");

window.onload = () => {
  introSound.play();
  gameOverScreen.style.display = "none";
  gameWinnerScreen.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function startGame() {
  // opponentSpawnBuffer =0;
  // opponentSpawnDifficulty=10;
  healthBar = 100;
  player.x = 30;
  player.y = height/2;
  introSound.stop();
  let mainScreen = document.getElementById("game-intro");
  mainScreen.style.display = "none";
  let nflTitle = document.getElementById("title-NFL");
  nflTitle.style.display = "none";
  canvas.show();
  opponentsArray = [
    { img: opponent1, y: random(80, 900), x: width -50, w: 50, h: 50 },
    { img: opponent2, y: random(80, 900), x: width -50, w: 50, h: 50 },
    { img: opponent3, y: random(80, 900), x: width -50, w: 50, h: 50 },
    { img: opponent4, y: random(80, 900), x: width -50, w: 50, h: 50 },
  ];
  loop();
  inGameSound.play();
  inGameSound.loop();
}

function restartGame() {
  // document.getElementById("restart-button").onclick = () => {
  //   startGame();
  // };
  // player.x = 30;
  // player.y = height/2;
  // introSound.stop();
  // let mainScreen = document.getElementById("game-intro");
  // mainScreen.style.display = "none";
  // let nflTitle = document.getElementById("title-NFL");
  // nflTitle.style.display = "none";
  // canvas.show();
  // opponentsArray = [
  //   { img: opponent1, y: random(80, 500), x: width - 70, w: 50, h: 50 },
  //   { img: opponent2, y: random(80, 500), x: width - 70, w: 50, h: 50 },
  //   { img: opponent3, y: random(80, 500), x: width - 70, w: 50, h: 50 },
  //   { img: opponent4, y: random(80, 500), x: width - 70, w: 50, h: 50 },
  // ];
  // Loop();
}

function preload() {
  backgroundImage = loadImage("/assets/images/aff.png");
  player.img = loadImage("/assets/images/player1.gif");
  opponent1 = loadImage("/assets/images/opponent1.gif");
  opponent2 = loadImage("/assets/images/opponent2.gif");
  opponent3 = loadImage("/assets/images/opponent3.gif");
  opponent4 = loadImage("/assets/images/opponent4.gif");
  introSound = createAudio("/assets/sounds/introSound.wav");
  inGameSound = createAudio("/assets/sounds/inGameSound.wav");
  gameOverSound = createAudio("/assets/sounds/GameOverSound.wav");
  collisionSound = createAudio("/assets/sounds/collisionSound.wav");
  matchpointSound = createAudio("/assets/sounds/matchpointSound.wav");
  woohSound = createAudio("/assets/sounds/wooh.wav");
}

function setup() {
  noLoop();
  canvas = createCanvas(width, height);
  canvas.hide();
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    gameOverScreen.style.display = "none";
    startGame();
    console.log('hello')
 }
} 

function collideOpponents() {
  for (let i = 0; i < opponentsArray.length; i++) {
    if (
      player.x < opponentsArray[i].x + opponentsArray[i].w &&
      player.x + player.w > opponentsArray[i].x &&
      player.y < opponentsArray[i].y + opponentsArray[i].h &&
      player.y + player.h > opponentsArray[i].y
    ) {
      healthBar -= 2; // set to 0.3, the higher, the more they hurt
      collisionSound.play();
      return true;
    }
  }
}

function touchDown() {
  for (let i = opponentsArray.length - 1; i > 0; i--) {
    image(
      opponentsArray[i].img,
      opponentsArray[i].x,
      opponentsArray[i].y,
      opponentsArray[i].w,
      opponentsArray[i].h
    );
    opponentsArray[i].x -= 1; // higher the number the faster they come
    if (opponentsArray[i].x < 1) {
      opponentsArray.splice;
    }
  }
  if (player.x >= 2600) {
    woohSound.play()
    score++;
    enemiesSpeed = enemiesSpeed + 2;
    opponentsArray = [];
    player.x = 0;
    healthBar += 1; //set to 1 if the game will get harder
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

function matchPoint() {
  if (score >= 3 ) { //set this to 5 points
    canvas.hide();
    noLoop();
    gameWinnerScreen.style.display = "block";
    document.getElementById("score").innerText = score;
    inGameSound.stop();
    matchpointSound.play();
  }
}

function gameOver() {
  if (healthBar <= 0) {
    canvas.hide();
    noLoop();
    gameOverScreen.style.display = "block";
    document.getElementById("score").innerText = score;
    inGameSound.stop();
    gameOverSound.play();
  }
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  image(player.img, player.x, player.y, 50, 50);
  textSize(20);
  fill(0, 200, 0);
  text(`Score: ${score}`, 580, 50);
  if (healthBar <= 0 || collideOpponents()) {
    gameOver();
  }
  strokeWeight(0);
  fill(0, 200, 0);
  rect(20, 20, healthBar, 20);
  if (frameCount % 120 === 0) {
    opponentsArray.push({
      img: opponent1,
      y: random(80, 900),
      x: width - 50,
      w: 50,
      h: 50,
    });
    opponentsArray.push({
      img: opponent2,
      y: random(80, 900),
      x: width - 50,
      w: 50,
      h: 50,
    });
    opponentsArray.push({
      img: opponent3,
      y: random(80, 900),
      x: width - 50,
      w: 50,
      h: 50,
    });
    opponentsArray.push({
      img: opponent4,
      y: random(80, 900),
      x: width - 50,
      w: 50,
      h: 50,
    });
  }
  for (let i = opponentsArray.length - 1; i > 0; i--) {
    image(
      opponentsArray[i].img,
      opponentsArray[i].x,
      opponentsArray[i].y,
      opponentsArray[i].w,
      opponentsArray[i].h
    );
    opponentsArray[i].x -= enemiesSpeed; // higher the number the faster they come
    if (opponentsArray[i].x < 1) {
      opponentsArray.splice;
    }
  }
  let mainScreen = document.getElementById("game-over");
  mainScreen.style.display = "none";
  collideOpponents();
  touchDown();
  matchPoint();
  gameOver();
  restartGame();
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
