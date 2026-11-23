class WorldBlock extends Block {
  constructor(pos, dim, side) {
    super(pos, dim);
    this.side = side;
    this.keyClaimed = false;
    this.col = color(80, 150, 155);
    if (side === 1) {
      this.col = color(155, 105, 180);
    }
  }

  isSolid() {
    return world === this.side;
  }
}