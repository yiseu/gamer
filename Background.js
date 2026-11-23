class Background {
  constructor(img, otherImg, speed) {
    this.img = img;
    this.otherImg = otherImg;
    this.speed = speed;
  }

  drawMe() {
    let img = this.img;
    if (world === 1) {
      img = this.otherImg;
    }
    let x = (cameraX * this.speed + frameCount * 0.15) % width;
    image(img, -x, 0, width, height);
    image(img, width - x, 0, width, height);
  }
}