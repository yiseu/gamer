class BigHealth extends Token {
  constructor(pos, block) {
    super(pos, 2, bigHealthFrames, block);
  }

  resolveCollision(c) {
    super.resolveCollision(c);
    c.heal(5);
    bigHealSnd.play();
  }
}