// Ghosts only exist on the Other Side. They can fly through platforms.
class Enemy extends Character {
  constructor(pos, speed) {
    super(pos);
    this.dim = createVector(32, 32);
    this.speed = speed;
    this.wanderTimer = new Timer();
    this.currentImgIdx = 0; // Current frame of the ghost animation.
  }

  update(c) {
    if (world !== 1) {
      return;
    }

    this.wanderTimer.tick();

    if (this.pos.dist(c.pos) < 220) {
      this.vel = createVector(c.pos.x - this.pos.x, c.pos.y - this.pos.y);
    } else if (this.wanderTimer.isEnded()) {
      this.vel = createVector(random(-1, 1), random(-0.5, 0.5));
      this.wanderTimer.start(1);
    }

    let length = this.vel.mag();
    if (length > 0) {
      this.vel.div(length);
      this.vel.mult(this.speed);
    }

    this.pos.add(this.vel);
    this.checkLimit();

    //change image every 6 frames.
    if (frameCount % 6 === 0) {
      this.currentImgIdx++;
      if (this.currentImgIdx >= ghostFrames.length) {
        this.currentImgIdx = 0;
      }
    }

    if (this.collision(c)) {
      c.takeDamage();
    }
  }

  // Correcting position also prevents a chasing ghost from going off-map.
  checkLimit() {
    if (this.pos.x < 420) {
      this.pos.x = 420;
      this.vel.x = abs(this.vel.x);
    } else if (this.pos.x > WORLD_WIDTH - 200) {
      this.pos.x = WORLD_WIDTH - 200;
      this.vel.x = -abs(this.vel.x);
    }

    if (this.pos.y < 230) {
      this.pos.y = 230;
      this.vel.y = abs(this.vel.y);
    } else if (this.pos.y > 510) {
      this.pos.y = 510;
      this.vel.y = -abs(this.vel.y);
    }
  }

  drawMe() {
    if (world !== 1) {
      return;
    }

    push();
    noSmooth(); // Keep the pixel art sharp.
    imageMode(CENTER);
    image(
      ghostFrames[this.currentImgIdx],
      this.pos.x - cameraX,
      this.pos.y,
      this.dim.x,
      this.dim.y
    );
    pop();
  }
}