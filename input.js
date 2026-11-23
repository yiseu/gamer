// A=65, D=68, Space=32, S=83, Shift=16, L=76, K=75, Enter=13.
let up, down, left, right;
let run, switchHeld, charmHeld;

function resetInput() {
  left = false;
  right = false;
  up = false;
  down = false;
  run = false;
  switchHeld = false;
  charmHeld = false;
}

function keyPressed() {
  if (!gameReady) {
    return false;
  }
  userStartAudio(); // Browser audio needs a click or a key press.
  if (keyCode == 13) {
    mousePressed();
  }
  if (gameState !== GAMEPLAY) {
    return;
  }
  if (keyCode == 65) {
    left = true;
  } // A
  if (keyCode == 68) {
    right = true;
  } // D
  if (keyCode == 32) {
    up = true;
  } // Space
  if (keyCode == 83) {
    down = true;
  } // S
  if (keyCode == 16) {
    run = true;
  }
  if (keyCode == 76 && !switchHeld) {
    switchHeld = true;
    switchWorld();
  }
  if (keyCode == 75 && !charmHeld) {
    charmHeld = true;
    useKey();
  }
  return false;
}

function keyReleased(event) {
  let releasedKey = event.keyCode;
  if (releasedKey == 65) {
    left = false;
  }
  if (releasedKey == 68) {
    right = false;
  }
  if (releasedKey == 32) {
    up = false;
  }
  if (releasedKey == 83) {
    down = false;
  }
  if (releasedKey == 16) {
    run = false;
  }
  if (releasedKey == 76) {
    switchHeld = false;
  }
  if (releasedKey == 75) {
    charmHeld = false;
  }
  return false;
}

function mousePressed() {
  if (!gameReady) {
    return false;
  }
  userStartAudio();
  if (gameState !== GAMEPLAY) {
    newGame();
  }
}

function switchWorld() {
  let next = 1 - world;
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (b instanceof WorldBlock && b.side === next && b.bump(player)) {
      return;
    }
  }
  world = next;
  switchSnd.play();
}

function useKey() {
  if (player.keys < KEYS_NEEDED || door.started) {
    return;
  }
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (b instanceof CharmBlock && b.isNear(player)) {
      player.keys -= KEYS_NEEDED;
      door.open();
      return;
    }
  }
}