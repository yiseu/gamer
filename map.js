function buildMap() {
  blocks = [];
  keyPlatforms = [];

  // The numbers in brackets mark pickup positions across each platform.
  // Negative offsets are left of centre, and positive ones are right.
  // Start with wide steps and short jumps.
  addGround(0, 365, 520, [-24, 28, 80, 132]);
  addPickupBlock(
    new Block(createVector(540, 530), createVector(225, 20)),
    [-78, -26, 26, 78]
  );
  addKeyStep(815, 520, 210);
  addGround(965, 1270, 505, [-126, 0, 126]);
  addPickupBlock(
    new WorldBlock(createVector(1435, 525), createVector(200, 20), 0),
    [-72, -24, 24, 72]
  );
  addPickupBlock(
    new WorldBlock(createVector(1690, 515), createVector(205, 20), 1),
    [-72, -24, 24, 72]
  );
  addGround(1835, 2180, 500, [-144, 0, 144]);
  addPickupBlock(
    new MovingBlock(createVector(2340, 510), createVector(200, 20), 1),
    [-72, -24, 24, 72]
  );

  // The second half has narrower steps, higher jumps and moving platforms.
  addPickupBlock(
    new WorldBlock(createVector(2585, 470), createVector(140, 20), 1),
    [-48, 0, 48]
  );
  addGround(2730, 3030, 470, [-124, 0, 124]);
  addPickupBlock(
    new MovingBlock(createVector(3190, 435), createVector(150, 20), 1.1),
    [-50, 0, 50]
  );
  addPickupBlock(
    new WorldBlock(createVector(3410, 395), createVector(140, 20), 1),
    [-48, 0, 48]
  );
  addGround(3560, 4170, 380, [-272, -220, -168, -116, -64, -12, 40, 92, 144, 196, 248]);

  // Climb a Dream step, then switch to the Other Side for the second key.
  addPickupBlock(
    new WorldBlock(createVector(3925, 305), createVector(150, 20), 0),
    [-50, 0, 50]
  );
  addKeyStep(4035, 220, 210);
  blocks.push(new CharmBlock(createVector(4410, 375), createVector(480, 30)));
  addGround(4650, WORLD_WIDTH, 360);
  door = new Door(createVector(WORLD_WIDTH - 90, 318));

  // Switch sides to pass the two walls on each of these islands.
  addWall(1055, 505, 1);
  addWall(1180, 505, 0);
  addWall(1940, 500, 0);
  addWall(2070, 500, 1);
  addWall(2820, 470, 0);
  addWall(2950, 470, 1);
}

function addGround(left, right, top, offsets = []) {
  let b = new Block(
    createVector((left + right) / 2, top + 15),
    createVector(right - left, 30)
  );
  b.safe = true;
  addPickupBlock(b, offsets);
}

function addPickupBlock(b, offsets) {
  b.pickupOffsets = offsets;
  blocks.push(b);
}

function addKeyStep(x, y, w) {
  let step = new WorldBlock(createVector(x, y), createVector(w, 20), 1);
  step.keyHost = true;
  keyPlatforms.push(step);
  blocks.push(step);
}

function addWall(x, groundTop, side) {
  let h = 260;
  let wall = new WorldBlock(
    createVector(x, groundTop - h / 2),
    createVector(28, h),
    side
  );
  wall.wall = true;
  blocks.push(wall);
}

function createEnemies() {
  enemies = [];
  for (let i = 0; i < 3; i++) {
    let pos = createVector(random(520, 840) + i * 1240, random(300, 470));
    enemies.push(new Enemy(pos, 4.6));
  }
}

function updateEnemyDifficulty() {
  if (difficultyChecked || player.pos.x < WORLD_WIDTH / 2) {
    return;
  }
  difficultyChecked = true;
  // Score and damage in the first half set the challenge in the second half.
  if (player.score >= 3 && player.damageTaken <= 2) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].speed = 5.1;
    }
    let pos = createVector(random(3500, 3800), random(300, 470));
    enemies.push(new Enemy(pos, 5.1));
  }
}