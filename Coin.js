class Coin extends Token {
  constructor(pos, block) {
    super(pos, 0, coinFrames, block);
  }

  resolveCollision(c) {
    super.resolveCollision(c);
    c.score++;
    coinSnd.play();
  }
}
