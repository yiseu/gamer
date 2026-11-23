class CharmBlock extends Block {
  constructor(pos, dim) {
    super(pos, dim);
    this.col = color(215, 175, 85);
  }

  isSolid() {
    return door.isOpen();
  }

  // K can activate this bridge only near its left entrance.
  isNear(c) {
    let entranceX = this.pos.x - this.dim.x / 2;
    return abs(c.pos.x - entranceX) < 140 &&
      abs(c.pos.y - this.pos.y) < 120;
  }
}