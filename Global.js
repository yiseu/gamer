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
  foxFrames.push(await loadImage("assets/kistune_0.png"));
  foxFrames.push(await loadImage("assets/kistune_1.png"));
  foxFrames.push(await loadImage("assets/kistune_2.png"));
  // Load both ghost animation frames into an array.
  ghostFrames.push(await loadImage("assets/ghost_0.png"));
  ghostFrames.push(await loadImage("assets/ghost_1.png"));

  dreamFar = await loadImage("assets/dream_far.png");
  dreamNear = await loadImage("assets/dream_near.png");
  otherFar = await loadImage("assets/other_far.png");
  otherNear = await loadImage("assets/other_near.png");

  coinFrames.push(await loadImage("assets/coin_0.png"));
  coinFrames.push(await loadImage("assets/coin_1.png"));
  coinFrames.push(await loadImage("assets/coin_2.png"));
  coinFrames.push(await loadImage("assets/coin_3.png"));

  healthFrames.push(await loadImage("assets/health_0.png"));
  healthFrames.push(await loadImage("assets/health_1.png"));
  healthFrames.push(await loadImage("assets/health_2.png"));
  healthFrames.push(await loadImage("assets/health_3.png"));

  bigHealthFrames.push(await loadImage("assets/big_health_0.png"));
  bigHealthFrames.push(await loadImage("assets/big_health_1.png"));
  bigHealthFrames.push(await loadImage("assets/big_health_2.png"));
  bigHealthFrames.push(await loadImage("assets/big_health_3.png"));

  keyFrames.push(await loadImage("assets/key_0.png"));
  keyFrames.push(await loadImage("assets/key_1.png"));
  keyFrames.push(await loadImage("assets/key_2.png"));
  keyFrames.push(await loadImage("assets/key_3.png"));

  landSnd = await loadSound("sound/land.wav");
  bumpSnd = await loadSound("sound/bump.wav");
  coinSnd = await loadSound("sound/coin.wav");
  healSnd = await loadSound("sound/heal.wav");
  bigHealSnd = await loadSound("sound/big_heal.wav");
  keySnd = await loadSound("sound/key.wav");
  hurtSnd = await loadSound("sound/hurt.wav");
  fallSnd = await loadSound("sound/fall.wav");
  unlockSnd = await loadSound("sound/unlock.wav");
  switchSnd = await loadSound("sound/switch.wav");
  doorSnd = await loadSound("sound/door.wav");
}