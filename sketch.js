const MENU = 0;
const GAMEPLAY = 1;
const WON = 2;
const LOST = 3;
const WORLD_WIDTH = 4800; // Five times the canvas width.
let gameState = MENU;
let gameReady = false;
let loseMessage = "You lost all your health.";
let difficultyChecked = false;
let world = 0;
let cameraX = 0;
let runFrames = 0;
let player, door;

let keyPlatforms = [];
let blocks = [], tokens = [], enemies = [], bg = [];
let leftAcc, rightAcc, upAcc, gravForce;

async function setup() {
  createCanvas(960, 600);
  background(225, 231, 238);
  fill(65, 55, 80);
  text("Loading images and sounds...", 350, 300);
  
  await loadAssets();
  
  frameRate(60);
  leftAcc = createVector(-4, 0);
  rightAcc = createVector(4, 0);
  upAcc = createVector(0, -12.5);
  gravForce = createVector(0, 0.6);
  
  bg.push(new Background(dreamFar, otherFar, 0.12));
  bg.push(new Background(dreamNear, otherNear, 0.35));
  gameReady = true;
}

function draw() {
  background(225, 231, 238);
  for (let i = 0; i < bg.length; i++) {
    bg[i].drawMe();
  }
  if (gameState === GAMEPLAY) {
    gamePlay();
  }
  if (gameState === MENU) {
    mainMenu();
  }
  if (gameState === WON) {
    endScreen("You win! The fox is home.");
  }
  if (gameState === LOST) {
    endScreen(loseMessage);
  }
}

function newGame() {
  loseMessage = "You lost all your health.";
  world = 0;
  cameraX = 0;
  runFrames = 0;
  difficultyChecked = false;
  player = new Player(createVector(70, 500));
  buildMap();
  player.landOn(blocks[0]);
  createEnemies();
  resetTokenPool();
  resetInput();
  gameState = GAMEPLAY;
}