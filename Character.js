class Character {
  constructor(pos) {
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.dim = createVector(36, 40);
    this.jumping = true;
    this.block = null;
    this.home = null; // Last ordinary ground island.
  }

  move(acc) {
    this.vel.add(acc);
  }

  jump(force) {
    this.vel.y = 0;
    this.move(force);
    this.jumping = true;
    this.block = null;
  }

  landOn(b) {
    this.pos.y = b.pos.y - b.dim.y / 2 - this.dim.y / 2;
    this.vel.y = 0;
    this.jumping = false;
    this.block = b;
    if (b.safe) {
      this.home = b;
    }
  }

  collision(c) {
    return (abs(this.pos.x - c.pos.x) < (this.dim.x + c.dim.x) / 2 && abs(this.pos.y - c.pos.y) < (this.dim.y + c.dim.y) / 2);
  }

  update() {
    let halfW = this.dim.x / 2;
    let halfH = this.dim.y / 2;
    this.pos.x += this.vel.x;
    if (this.pos.x < halfW) {
      this.pos.x = halfW;
    }
    if (this.pos.x > WORLD_WIDTH - halfW) {
      this.pos.x = WORLD_WIDTH - halfW;
    }
    // Resolve side contact before moving vertically.
    for (let i = 0; i < blocks.length; i++) {
      let b = blocks[i];
      if (b.isSolid() && b.bump(this) && this.pos.y + halfH > b.pos.y - b.dim.y / 2 + 2) {
        if (this.vel.x > 0) {
          this.pos.x = b.pos.x - b.dim.x / 2 - halfW;
        }
        if (this.vel.x < 0) {
          this.pos.x = b.pos.x + b.dim.x / 2 + halfW;
        }
        if (this.vel.x !== 0) {
          bumpSnd.play();
        }
        this.vel.x = 0;
      }
    }
    let oldY = this.pos.y;
    let wasJumping = this.jumping;
    this.move(gravForce);
    if (down && this.jumping) {
      this.vel.y += 0.4;
    }
    if (this.vel.y > 15) {
      this.vel.y = 15;
    }
    this.pos.y += this.vel.y;
    this.block = null;
    this.jumping = true;
    for (let i = 0; i < blocks.length; i++) {
      let b = blocks[i];
      if (b.isSolid() && b.bump(this)) {
        if (this.vel.y >= 0 && oldY + halfH <= b.pos.y - b.dim.y / 2 + 3) {
          this.landOn(b);
          if (wasJumping) {
            landSnd.play();
          }
        } else if (this.vel.y < 0 && oldY - halfH >= b.pos.y + b.dim.y / 2 - 3) {
          this.pos.y = b.pos.y + b.dim.y / 2 + halfH;
          this.vel.y = 0;
          bumpSnd.play();
        }
      }
    }
  }
}