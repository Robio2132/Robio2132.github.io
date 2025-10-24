/* ============================================================================
Name: Robbie Bennett
Class: CS321 - Software Engineering
File: flappybird.js
Purpose: Implements the Flappy Bird gameplay, physics, rendering, and input.
============================================================================ */

// ===== Board Setup =====
let board, context;
const boardWidth = 360;
const boardHeight = 640;

// ===== Bird Setup =====
const bird = {
  x: boardWidth / 8,
  y: boardHeight / 2,
  width: 70,
  height: 70,
};
let birdIMG;

// ===== Pipes =====
let pipeArray = [];
const pipeWidth = 64;
const pipeHeight = 512;
const pipeX = boardWidth;
const pipeY = 0;
let topPipeIMG, bottomPipeIMG;

// ===== Background =====
let backgroundIMG;

// ===== Physics =====
let velocityY = 0;
let velocityX = -3; // slightly faster to prevent pipe buildup
const gravity = 0.4;

// ===== Game Logic =====
let gameOver = false;
let score = 0;
let lastPipeTime = 0; // timestamp control for pipe spawn
const PIPE_INTERVAL = 2000; // time between new pipes (ms)

// ===== Initialize Game =====
window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // ===== Load Assets =====
  birdIMG = new Image();
  birdIMG.src = "./Photos/protagonist.png";

  topPipeIMG = new Image();
  topPipeIMG.src = "./Photos/toppipe.png";

  bottomPipeIMG = new Image();
  bottomPipeIMG.src = "./Photos/bottompipe.png";

  backgroundIMG = new Image();
  backgroundIMG.src = "./Photos/Background.png";

  // ===== Start Game Loop =====
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveBird);
};

// ===== Main Update Loop =====
function update(timestamp) {
  requestAnimationFrame(update);
  if (gameOver) return drawGameOver();

  // Clear and redraw background
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.drawImage(backgroundIMG, 0, 0, boardWidth, boardHeight);

  // === Bird Physics ===
  velocityY += gravity;
  bird.y += velocityY;
  bird.y = Math.max(bird.y, 0);
  bird.y = Math.min(bird.y, boardHeight - bird.height);
  context.drawImage(birdIMG, bird.x, bird.y, bird.width, bird.height);

  // === Pipe Movement ===
  for (let pipe of pipeArray) {
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    // Score
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    // Collision check
    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  // === Clean up offscreen pipes ===
  pipeArray = pipeArray.filter((p) => p.x > -pipeWidth);

  // === Place new pipes (time-based) ===
  if (!lastPipeTime || timestamp - lastPipeTime > PIPE_INTERVAL) {
    placePipes();
    lastPipeTime = timestamp;
  }

  // === Score display ===
  context.fillStyle = "red";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);
}

// ===== Pipe Placement =====
function placePipes() {
  if (gameOver) return;

  const randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  const openingSpace = boardHeight / 2.8;

  const topPipe = {
    img: topPipeIMG,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  const bottomPipe = {
    img: bottomPipeIMG,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe, bottomPipe);
}

// ===== Bird Controls =====
function moveBird(e) {
  if (["Space", "ArrowUp", "KeyX"].includes(e.code)) e.preventDefault();

  // Restart
  if (gameOver) {
    resetGame();
    return;
  }

  // Flap
  if (["Space", "ArrowUp", "KeyX"].includes(e.code)) {
    velocityY = -8;
  }
}

// ===== Collision Detection =====
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// ===== Draw Game Over Screen =====
function drawGameOver() {
  context.fillStyle = "red";
  context.font = "45px sans-serif";
  context.fillText("Game Over", 5, 90);
  context.fillText(`Score: ${score}`, 5, 140);
}

// ===== Reset Game =====
function resetGame() {
  bird.y = boardHeight / 2;
  pipeArray = [];
  score = 0;
  velocityY = 0;
  gameOver = false;
  lastPipeTime = 0;
}
