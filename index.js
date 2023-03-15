let currentGame;
let opponentSpawnBuffer;
let opponentSpawnDifficulty;
let backgroundImage;
let canvas;
let player = { x: 600, y: 380, w: 60, h: 70 };
let Opponent = { x: 600, y: 380, w: 60, h: 70 };
let gameOver;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    gameOver.style.display = "none";
    player = { x: 600, y: 380, w: 60, h: 70 };
    Opponent = { x: 600, y: 380, w: 60, h: 70 };
    startGame();
  };

function startGame() {
  let mainScreen = document.getElementById("main-menu");
  mainScreen.style.display = "none";
 }
}

function preload() {
  backgroundImage = loadImage('/assets/images/aff.png');
  player = loadImage('/assets/images/player1.gif');
  Opponent = loadImage('/assets/images/opponent1.gif')
  touchDownSound = loadSound('');
  gameOverSound = loadSound('');
}

function setup() {
  createCanvas(450, 700);
  currentGame = new Game();
  noLoop();
}

function gameSetUp() {
  currentGame = new Game();
  currentGame.Player = new Player();
  opponentSpawnBuffer = 0;
  loop();
}

function detectCollision(Opponent) {
  let isColliding = (
    currentGame.Player.y + currentGame.Player.height > Opponent.y &&
    currentGame.Player.y < Opponent.y + Opponent.height &&
    currentGame.Player.x + currentGame.Player.width > Opponent.x &&
    currentGame.Player.x < Opponent.x + Opponent.width
  );
  if (isColliding) {
    if (currentGame.Opponent.length >= currentGame.touchdownScore) {
      touchDownSound.play();

      currentGame.score += 7;
      document.getElementById("score").innerHTML = currentGame.score;
      alert("Touchdown!");
      
      currentGame.touchdownScore += 10;
    } else {
      gameOverSound.play();
      currentGame.collided = true;
    }
  }

  return isColliding;
}

function createOpponent() {
  let randomOpponentX = Math.floor(Math.random() * 450);
  let randomOpponentWidth = Math.floor(Math.random() * 50) + 20;
  let randomOpponentHeight = Math.floor(Math.random() * 50) + 20;
  let newOpponent = new Opponent(
    randomOpponentX,
    0,
    randomOpponentWidth,
    randomOpponentHeight
  );

  currentGame.Opponent.push(newOpponent);

  if (currentGame.Opponent.length >= currentGame.touchdownScore) {
    touchDownSound.play();

    currentGame.score += 7;
    document.getElementById("score").innerHTML = currentGame.score;
    alert("Touchdown!");
    
    currentGame.touchdownScore += 10;
  }
}

function draw() {
  image(currentGame.field, 0, 0, 500, 700);
  currentGame.Player.drawPlayer();
  if (currentGame.collided) {
    image(
      explosionImg,
      currentGame.Player.x - currentGame.Player.width,
      currentGame.Player.y - currentGame.Player.height,
      150,
      150
    );
    alert(`Well done!! Your score was ${currentGame.score}`);
    noLoop();
    return;
  } else {
    opponentSpawnBuffer++;

    if (opponentSpawnBuffer % currentGame.opponentSpawnDifficulty === 1) {
      createOpponent();
      currentGame.opponentSpawnDifficulty--;
    }

    for (let i = 0; i < currentGame.Opponent1.length; i++) {
      if (detectCollision(currentGame.Opponent[i])) {
        currentGame.collided = true;
        image(
          explosionImg,
          currentGame.Player.x - 50,
          currentGame.Player.y - 75,
          150,
          150
        );
        return;
      } else {
        currentGame.Opponent[i].y += 1;
        currentGame.Opponent[i].drawObstacle();
      }
      // Obstacle moved outside the canvas
      if (
        currentGame.Opponent.length > 0 &&
        currentGame.Opponent[i].y >= 700
      ) {
        currentGame.Opponent.splice(i, 1);
        currentGame.score++;
        document.getElementById("score").innerHTML = currentGame.score;
      }
    }
  }
}
