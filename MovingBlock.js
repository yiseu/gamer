class MovingBlock extends Block {
  constructor(pos, dim, speed) {
    super(pos, dim);
    let travel = 17;
    this.top = pos.y - travel;
    this.bottom = pos.y + travel;
    this.vel = createVector(0, -speed);
    this.col = color(190, 150, 110);
  }

  update(c) {
    if (this.pos.y <= this.top || this.pos.y >= this.bottom) {
      this.vel.y *= -1;
    }
    this.pos.add(this.vel);
    if (c.block === this) {
      c.pos.add(this.vel);
    }
  }
}