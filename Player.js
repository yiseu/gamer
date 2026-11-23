class Player extends Character {
  constructor(pos) {
    super(pos);
    this.hp = 10;
    this.score = 0;
    this.keys = 0;
    this.damageTaken = 0;
    this.runFrames = 0;
    this.hurtTimer = new Timer();
    this.currentImgIdx = 0; // Current frame of the fox walking animation.
    this.facing = 1; // Remember the last direction the fox faced.
  }

  update() {
    super.update();
    this.hurtTimer.tick();

    //change the walking frame every 6 frames.
    if (this.vel.x < 0) {
      this.facing = -1;
    } else if (this.vel.x > 0) {
      this.facing = 1;
    }
    if (this.jumping || this.vel.x === 0) {
      this.currentImgIdx = 0; // Show the first frame when idle or jumping.
    } else if (frameCount % 6 === 0) {
      this.currentImgIdx++;
      if (this.currentImgIdx >= foxFrames.length) {
        this.currentImgIdx = 0;
      }
    }
    if (run && this.vel.x !== 0) {
      this.runFrames++;
      if (this.runFrames >= 120) {
        this.hp--;
        this.runFrames = 0;
      }
    }
    if (this.pos.y > height + 40) {
      this.hp -= 2;
      this.damageTaken += 2;
      this.pos.x = this.home.pos.x;
      this.landOn(this.home);
      fallSnd.play();
    }
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  takeDamage() {
    if (this.hurtTimer.isEnded()) {
      this.hp--;
      this.damageTaken++;
      this.hurtTimer.start(1.5);
      hurtSnd.play();
    }
  }

  heal(amount) {
    this.hp += amount;
    if (this.hp > 10) {
      this.hp = 10;
    }
  }

  drawMe() {
    push();
    translate(this.pos.x - cameraX, this.pos.y);
    if (this.facing < 0) {
      scale(-1, 1); // Face left
    }
    noSmooth(); // Keep pixel-art edges sharp when scaled.
    imageMode(CENTER);
    image(foxFrames[this.currentImgIdx], 0, 0, this.dim.x, this.dim.y);
    pop();
  }
}