class KeyToken extends Token {
  constructor(pos, block) {
    super(pos, 3, keyFrames, block);
  }

  resolveCollision(c) {
    super.resolveCollision(c);
    c.keys++;
    this.b.keyClaimed = true;
    keySnd.play();
  }
}
