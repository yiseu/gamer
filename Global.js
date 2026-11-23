// Each token is drawn at TOKEN_SIZE; its original image size may be different.
const TOKEN_SIZE = 32;
let dreamFar, dreamNear, otherFar, otherNear;

let foxFrames = []; // Array of walking images
let ghostFrames = []; // Array of ghost animation images

let coinFrames = [],
  healthFrames = [],
  bigHealthFrames = [],
  keyFrames = [];

let landSnd, bumpSnd, coinSnd, healSnd, bigHealSnd, keySnd;
let hurtSnd, fallSnd, unlockSnd, switchSnd, doorSnd;

async function loadAssets() {
  // Load both fox walking frames into an array
  foxFrames.push(await loadImage("kistune_0.png"));
  foxFrames.push(await loadImage("kistune_1.png"));
  foxFrames.push(await loadImage("kistune_2.png"));
  // Load both ghost animation frames into an array.
  ghostFrames.push(await loadImage("ghost_0.png"));
  ghostFrames.push(await loadImage("ghost_1.png"));

  dreamFar = await loadImage("dream_far.png");
  dreamNear = await loadImage("dream_near.png");
  otherFar = await loadImage("other_far.png");
  otherNear = await loadImage("other_near.png");

  coinFrames.push(await loadImage("coin_0.png"));
  coinFrames.push(await loadImage("coin_1.png"));
  coinFrames.push(await loadImage("coin_2.png"));
  coinFrames.push(await loadImage("coin_3.png"));

  healthFrames.push(await loadImage("health_0.png"));
  healthFrames.push(await loadImage("health_1.png"));
  healthFrames.push(await loadImage("health_2.png"));
  healthFrames.push(await loadImage("health_3.png"));

  bigHealthFrames.push(await loadImage("big_health_0.png"));
  bigHealthFrames.push(await loadImage("big_health_1.png"));
  bigHealthFrames.push(await loadImage("big_health_2.png"));
  bigHealthFrames.push(await loadImage("big_health_3.png"));

  keyFrames.push(await loadImage("key_0.png"));
  keyFrames.push(await loadImage("key_1.png"));
  keyFrames.push(await loadImage("key_2.png"));
  keyFrames.push(await loadImage("key_3.png"));

  landSnd = await loadSound("land.wav");
  bumpSnd = await loadSound("bump.wav");
  coinSnd = await loadSound("coin.wav");
  healSnd = await loadSound("heal.wav");
  bigHealSnd = await loadSound("big_heal.wav");
  keySnd = await loadSound("key.wav");
  hurtSnd = await loadSound("hurt.wav");
  fallSnd = await loadSound("fall.wav");
  unlockSnd = await loadSound("unlock.wav");
  switchSnd = await loadSound("switch.wav");
  doorSnd = await loadSound("door.wav");
}
