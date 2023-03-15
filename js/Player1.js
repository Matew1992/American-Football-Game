class Player1 {
  constructor() {
    this.x = 220;
    this.y = 520;
    this.width = 50;
    this.height = 80;
    this.img = loadImage("./assets/images/player1.gif");
  }

  drawPlayer1() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  movePlayer1(keyCode) {
    switch (keyCode) {
      case "ArrowLeft":
        if (this.x > 20) {
          this.x -= 10;
        }
        break;
      case "ArrowUp":
        if (this.y >= 20) {
          this.y -= 10;
        }
        break;
      case "ArrowRight":
        if (this.x < 430) {
          this.x += 10;
        }
        break;
      case "ArrowDown":
        if (this.y <= 610) {
          this.y += 10;
        }
        break;
    }
  }
}
