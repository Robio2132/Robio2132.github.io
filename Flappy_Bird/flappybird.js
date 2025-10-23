// ===== Board Setup =====
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// ===== Bird (Your Face) =====
let birdWidth = 70;
let birdHeight = 70;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdIMG;

// ===== Pipes (Classic) =====
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeIMG;
let bottomPipeIMG;

// ===== Background (Static Resume) =====
let backgroundIMG;

// ===== Physics =====
let velocityY = 0;
let velocityX = -2;
let gravity = 0.4;

// ===== Game Logic =====
let gameOver = false;
let score = 0;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight
};

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // ===== Load Images =====
  birdIMG = new Image();
  birdIMG.src = "./Photos/protagonist.png";   // your face

  topPipeIMG = new Image();
  topPipeIMG.src = "./Photos/toppipe.png";             // original pipes

  bottomPipeIMG = new Image();
  bottomPipeIMG.src = "./Photos/bottompipe.png";       // original pipes

  backgroundIMG = new Image();
  backgroundIMG.src = "./Photos/Background.png"; // static upright resume background

  // ===== Start Game =====
  requestAnimationFrame(update);
  setInterval(placePipes, 1800);
  document.addEventListener("keydown", moveBird);
};

function update() {
  requestAnimationFrame(update);

  if (gameOver) return;

  // ===== Draw Background =====
  context.drawImage(backgroundIMG, 0, 0, boardWidth, boardHeight);

  // ===== Bird Physics =====
  velocityY += gravity;
  bird.y += velocityY;
  bird.y = Math.max(bird.y, 0);
  bird.y = Math.min(bird.y, boardHeight - bird.height);

  // ===== Draw Bird =====
  context.drawImage(birdIMG, bird.x, bird.y, bird.width, bird.height);

  // ===== Draw Pipes =====
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }
    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  // ===== Remove Off-Screen Pipes =====
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // ===== Draw Score =====
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("Game Over", 5, 90);
  }
}

function placePipes() {
  if (gameOver) return;

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = boardHeight / 2.8;

  let topPipe = {
    img: topPipeIMG,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeIMG,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  // Prevent page from scrolling
  if (["Space", "ArrowUp", "KeyX"].includes(e.code)) {
    e.preventDefault();
  }

  if (gameOver) {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
  }

  if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
    velocityY = -8;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
