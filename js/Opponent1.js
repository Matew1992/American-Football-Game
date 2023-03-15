class Opponent1 {
    constructor() {
      this.x = 220;
      this.y = 520;
      this.width = 50;
      this.height = 80;
      this.img = loadImage("./assets/images/opponent1.gif");
    }
  
    drawOpponent1() {
      image(this.img, this.x, this.y, this.width, this.height);
    }
}