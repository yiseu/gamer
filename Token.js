
/* Token rules, also in the report. Times assume 60 frames per second.
 * Type         Maximum   Visible lifetime   Refill delay
 * Coin           12           180s               12s
 * HealthPack      1            30s               45s
 * BigHealth       1            10s               60s
 * KeyToken        2            60s               15s
 * Lifetimes pause offscreen and on the inactive side. Visible items behind
 * the fox still age. Items follow their platforms.
 * Coins and packs use random open spots above reachable platforms.
 * Spots are spaced apart, clear of walls, and 120 pixels clear of the door.
 * Coin/health spots become free after collection or expiration.
 * Each Other Side key ledge has one key at a random position. Collected key
 * spots stay used; expired key spots become free. Held keys count toward
 * the limit, and K spends both keys.
 * After a delay, refill one item per type. Retry after one second if the
 * chosen spot is too close to the fox or no open spot remains.
 */
const KEYS_NEEDED = 2;
const tokenLimits = [12, 1, 1, KEYS_NEEDED];
const tokenLifetimes = [180, 30, 10, 60];
const tokenDelays = [12, 45, 60, 15];
let tokenTimers = [];
let pickupSpots = [];
let keySpots = [];

class Token {
  constructor(pos, kind, frames, block) {
    this.pos = pos;
    this.kind = kind;
    this.b = block;
    this.offsetY = pos.y - block.pos.y;
    this.activeFrames = frames;
    this.currentFrame = 0;
    this.life = new Timer();
    this.life.start(tokenLifetimes[kind]);
    this.collected = false;
    this.spot = null;
  }

  inWindow() {
    return (
      this.b.isSolid() &&
      this.pos.x + TOKEN_SIZE / 2 >= cameraX &&
      this.pos.x - TOKEN_SIZE / 2 <= cameraX + width
    );
  }

  collision(c) {
    return (
      this.b.isSolid() &&
      abs(this.pos.x - c.pos.x) < TOKEN_SIZE / 2 + c.dim.x / 2 &&
      abs(this.pos.y - c.pos.y) < TOKEN_SIZE / 2 + c.dim.y / 2
    );
  }

  update() {
    this.pos.y = this.b.pos.y + this.offsetY;
    if (this.inWindow()) {
      this.life.tick();
    }
    if (frameCount % 6 === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.activeFrames.length;
    }
  }

  resolveCollision(c) {
    this.collected = true;
  }

  drawMe() {
    if (this.b.isSolid()) {
      let x = this.pos.x - cameraX - TOKEN_SIZE / 2;
      let y = this.pos.y - TOKEN_SIZE / 2;
      image(this.activeFrames[this.currentFrame], x, y, TOKEN_SIZE, TOKEN_SIZE);
    }
  }
}

function resetTokenPool() {
  tokens = [];
  tokenTimers = [];
  pickupSpots = [];
  keySpots = [];
  for (let i = 0; i < keyPlatforms.length; i++) {
    keySpots.push({ b: keyPlatforms[i], x: 0 });
  }
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (b.pickupOffsets) {
      for (let j = 0; j < b.pickupOffsets.length; j++) {
        pickupSpots.push({ b: b, x: b.pickupOffsets[j] });
      }
    }
  }
  for (let kind = 0; kind < tokenLimits.length; kind++) {
    tokenTimers.push(new Timer());
    for (let i = 0; i < tokenLimits[kind]; i++) {
      spawnToken(kind);
    }
  }
}

function spotPosition(spot) {
  let b = spot.b;
  return createVector(b.pos.x + spot.x, b.pos.y - (b.dim.y + TOKEN_SIZE) / 2 - 12);
}

function spawnToken(kind) {
  let spots = pickupSpots;
  if (kind === 3) {
    spots = keySpots;
  }
  if (spots.length === 0) {
    return false;
  }
  let spot = random(spots);
  let pos = spotPosition(spot);
  if (kind === 3) {
    let edge = (spot.b.dim.x - TOKEN_SIZE) / 2 - 8;
    pos.x += random(-edge, edge);
  }
  if (pos.dist(player.pos) <= TOKEN_SIZE + 20) {
    return false;
  }

  let item;
  if (kind === 0) {
    item = new Coin(pos, spot.b);
  } else if (kind === 1) {
    item = new HealthPack(pos, spot.b);
  } else if (kind === 2) {
    item = new BigHealth(pos, spot.b);
  } else {
    item = new KeyToken(pos, spot.b);
  }
  item.spot = spot;
  spots.splice(spots.indexOf(spot), 1);
  tokens.push(item);
  return true;
}

function updateTokens() {
  for (let kind = 0; kind < tokenTimers.length; kind++) {
    tokenTimers[kind].tick();
  }
  let count = [0, 0, 0, 0];
  for (let i = tokens.length - 1; i >= 0; i--) {
    let t = tokens[i];
    t.update();
    if (!t.life.isEnded() && t.collision(player)) {
      t.resolveCollision(player);
    }
    if (t.collected || t.life.isEnded()) {
      if (t.spot) {
        if (t.kind === 3) {
          // Used keys should not appear on the same ledge again.
          if (!t.collected) {
            keySpots.push(t.spot);
          }
        } else {
          pickupSpots.push(t.spot);
        }
      }
      tokens.splice(i, 1);
      // If several items vanish, don't restart the refill countdown.
      if (tokenTimers[t.kind].isEnded()) {
        tokenTimers[t.kind].start(tokenDelays[t.kind]);
      }
    } else {
      count[t.kind]++;
    }
  }
  count[3] += player.keys;
  if (door.started) {
    count[3] = KEYS_NEEDED;
  }
  for (let kind = 3; kind >= 0; kind--) {
    let timer = tokenTimers[kind];
    if (count[kind] < tokenLimits[kind] && timer.isEnded()) {
      if (spawnToken(kind)) {
        timer.start(tokenDelays[kind]);
      } else {
        timer.start(1);
      }
    }
  }
}