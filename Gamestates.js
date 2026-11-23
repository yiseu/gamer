function gamePlay() {
  runFrames++;
  door.update();
  if (door.isExpired()) {
    loseMessage = "Time up! The exit locked.";
    gameState = LOST;
    return;
  }
  player.vel.x = 0;
  if (left) {
    player.move(leftAcc);
  }
  if (right) {
    player.move(rightAcc);
  }
  if (run) {
    player.vel.x *= 2;
  }
  if (up && !player.jumping) {
    player.jump(upAcc);
  }
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].update(player);
  }
  player.update();
  cameraX = player.pos.x - width / 3;
  if (cameraX < 0) {
    cameraX = 0;
  }
  if (cameraX > WORLD_WIDTH - width) {
    cameraX = WORLD_WIDTH - width;
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update(player);
  }
  if (player.hp <= 0) {
    loseMessage = "You lost all your health.";
    gameState = LOST;
    return;
  }
  updateTokens();
  updateEnemyDifficulty();
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].drawMe();
  }
  for (let i = 0; i < tokens.length; i++) {
    tokens[i].drawMe();
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].drawMe();
  }
  door.drawMe();
  player.drawMe();
  drawHUD();
  if (door.canEnter(player)) {
    doorSnd.play();
    gameState = WON;
  }
}

function drawHUD() {
  push();
  noStroke();
  fill(65, 55, 80);
  textSize(17);
  textAlign(LEFT);
  text("Health " + player.hp + "/10", 20, 28);
  text("Coins " + player.score, 20, 70);
  text("Keys " + player.keys + "/" + KEYS_NEEDED, 20, 94);

  // Fill the health bar in proportion to the current health
  let healthPercent = player.hp / 10;
  fill(82, 160, 103);
  rect(20, 36, 140 * healthPercent, 12);
  noFill();
  stroke(65, 55, 80);
  rect(20, 36, 140, 12);
  noStroke();

  fill(65, 55, 80);
  textAlign(CENTER);
  text("Time " + formatRunTime(runFrames), width / 2, 28);
  let exitText = "Exit locked";
  if (door.isOpen()) {
    let secondsLeft = int((door.timer.f + 59) / 60);
    exitText = "Exit closes in " + secondsLeft + "s";
  } else if (player.keys >= KEYS_NEEDED) {
    exitText = "Press K near the bridge";
  }
  text(exitText, width / 2, 52);

  if (world === 1) {
    textAlign(RIGHT);
    text("Other Side", width - 46, 28);
    fill(250, 222, 157);
    circle(width - 29, 23, 20);
    fill(203, 169, 129);
    circle(width - 32, 21, 5);
    circle(width - 26, 26, 3);
  }
  pop();
}

function formatRunTime(frames) {
  let seconds = int(frames / 60);
  let hundredths = int(((frames % 60) * 100) / 60);
  return nf(int(seconds / 60), 2) + ":" + nf(seconds % 60, 2) + "." + nf(hundredths, 2);
}

function mainMenu() {
  fill(65, 55, 80);
  textSize(32);
  text("Between Two Dreams", 270, 180);
  textSize(17);
  text("Find two keys on the Other Side, where ghosts roam.", 250, 235);
  text("A/D move, Space jumps, S falls faster, L reveals the Other Side.", 225, 280);
  text("With both keys, press K near the bridge to open the exit.", 228, 325);
  text("Hold Shift for long jumps and faster escapes; running costs health.", 205, 370);
  text("Click or press Enter to start.", 370, 435);
  textSize(14);
  text("Enter the exit within " + EXIT_SECONDS + " seconds of pressing K.", 310, 475);
}

function endScreen(words) {
  push();
  background(239, 232, 243);
  noStroke();
  fill(65, 55, 80);
  textAlign(CENTER);
  textSize(30);
  text(words, width / 2, 220);
  textSize(18);
  if (gameState === WON) {
    text("Finish time " + formatRunTime(runFrames), width / 2, 266);
  }
  text("Coins " + player.score, width / 2, 304);
  text("Click or press Enter to restart.", width / 2, 342);
  pop();
}
