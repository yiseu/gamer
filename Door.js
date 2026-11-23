const EXIT_SECONDS = 16;

class Door {
  constructor(pos) {
    this.pos = pos;
    this.dim = createVector(52, 84);
    this.timer = new Timer();
    this.started = false;
  }

  open() {
    if (!this.started) {
      this.started = true;
      this.timer.start(EXIT_SECONDS);
      unlockSnd.play();
    }
  }

  update() {
    if (this.started) {
      this.timer.tick();
    }
  }

  isOpen() {
    return this.started && !this.timer.isEnded();
  }

  isExpired() {
    return this.started && this.timer.isEnded();
  }

  canEnter(c) {
    return (this.isOpen() && abs(this.pos.x - c.pos.x) < (this.dim.x + c.dim.x) / 2 && abs(this.pos.y - c.pos.y) < (this.dim.y + c.dim.y) / 2);
  }

  drawMe() {
    fill(125, 85, 100);
    if (this.isOpen()) {
      fill(115, 200, 180);
    }
    rect(this.pos.x - cameraX - 26, this.pos.y - 42, 52, 84);
    fill(255, 225, 140);
    circle(this.pos.x - cameraX + 12, this.pos.y, 7);
    if (!this.isOpen()) {
      fill(65, 55, 80);
      textSize(13);
      text(KEYS_NEEDED + " keys", this.pos.x - cameraX - 24, this.pos.y - 50);
    }
  }
}