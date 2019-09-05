export default class Paddle {
  constructor(paddleImage, gameHeight, gameWidth, ai) {
    this.width = 50;
    this.heigth = 50;
    this.image = paddleImage;

    if (ai) {
      this.position = {
        x: gameWidth - this.width - 5,
        y: gameHeight / 2 - this.heigth / 2
      };
    } else {
      this.position = {
        x: 5,
        y: gameHeight / 2 - this.heigth / 2
      };
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.heigth
    );
  }

  update(yPos) {
    this.position.y = yPos - this.width / 2;
  }
}
