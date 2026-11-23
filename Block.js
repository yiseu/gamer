class Block {
  constructor(pos, dim) {
    this.pos = pos;
    this.dim = dim;
    this.safe = false;
    this.wall = false; // Tall WorldBlocks are obstacles, not token hosts.
    this.keyHost = false; // Reserved places for the stage's keys.
    this.col = color(59, 125, 65);
  }

  isSolid() {
    return true;
  }

  isOn(c) {
    return abs(this.pos.x - c.pos.x) < (this.dim.x + c.dim.x) / 2;
  }

  bump(c) {
    return this.isOn(c) && abs(this.pos.y - c.pos.y) < (this.dim.y + c.dim.y) / 2;
  }

  update(c) {
    // Ordinary blocks stay still.
  }

  drawMe() {
    push();
    stroke(this.col);
    fill(this.col);
    if (!this.isSolid()) {
      noFill();
    }
    rect(
      this.pos.x - cameraX - this.dim.x / 2,
      this.pos.y - this.dim.y / 2,
      this.dim.x,
      this.dim.y
    );
    pop();
  }
}