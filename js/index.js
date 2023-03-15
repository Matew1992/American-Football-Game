let currentGame;
let opponentSpawnBuffer;

document.getElementById("start-button").onclick = () => {
  gameSetUp();
};

document.addEventListener("keydown", (e) => {
  keyCode = e.code;
  currentGame.Player1.movePlayer(keyCode);
});

function preload() {
  background = loadImage("/assets/images/aff.png");
  player1 = loadImage("/assets/images/player1.gif");
  touchDownSound = loadSound("");
  gameOverSound = loadSound("");
}

function setup() {
  createCanvas(500, 700);
  currentGame = new Game();
  noLoop();
}

function gameSetUp() {
  currentGame = new Game();
  currentGame.Player1 = new Player();
  opponentSpawnBuffer = 0;
  loop();
}

function detectCollision(Opponent1) {
  return (
    currentGame.Player1.y + currentGame.Player1.height > Opponent1.y &&
    currentGame.Player1.y < Opponent1.y + Opponent1.height &&
    currentGame.Player1.x + currentGame.Player1.width > Opponent1.x &&
    currentGame.Player1.x < Opponent1.x + Opponent1.width
  );
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
}

function draw() {
  image(currentGame.field, 0, 0, 500, 700);
  currentGame.Player1.drawPlayer1();
  if (currentGame.collided) {
    image(
      explosionImg,
      currentGame.Player1.x - currentGame.Player1.width,
      currentGame.Player1.y - currentGame.Player1.height,
      150,
      150
    );
    alert(`Congratulations, your score was ${currentGame.score}`);
    noLoop();
    return;
  } else {
    opponentSpawnBuffer++;

    if (opponentSpawnBuffer % currentGame.opponentSpawnDifficulty === 1) {
      createOpponent();
      currentGame.opponentSpawnDifficulty--;
    }

    for (let i = 0; i < currentGame.Opponent1.length; i++) {
      if (detectCollision(currentGame.Opponent1[i])) {
        currentGame.collided = true;
        image(
          explosionImg,
          currentGame.Player1.x - 50,
          currentGame.Player1.y - 75,
          150,
          150
        );
        return;
      } else {
        currentGame.Opponent1[i].y += 1;
        currentGame.Opponent1[i].drawObstacle();
      }
      // Obstacle moved outside the canvas
      if (
        currentGame.Opponent1.length > 0 &&
        currentGame.Opponent1[i].y >= 700
      ) {
        currentGame.Opponent1.splice(i, 1);
        currentGame.score++;
        document.getElementById("score").innerHTML = currentGame.score;
      }
    }
  }
}
