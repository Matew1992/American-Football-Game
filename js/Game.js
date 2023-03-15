class Game {
  constructor() {
    this.Player1 = new Player();
    this.Opponent1 = [];
    this.score = 0;
    this.opponentSpawnDifficulty = 60;
    this.collided = false;
    this.field = loadImage("assets/images/aff.png");
  }
}
