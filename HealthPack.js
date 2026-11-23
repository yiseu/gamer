class HealthPack extends Token {
  constructor(pos, block) {
    super(pos, 1, healthFrames, block);
  }

  resolveCollision(c) {
    super.resolveCollision(c);
    c.heal(1);
    healSnd.play();
  }
}