/* ============================================================================
Name: Robbie Bennett
Class: CS321 - Software Engineering
File: app.js
Purpose: Implements classic Space Invaders gameplay logic, rendering, and controls.
============================================================================ */

// ===== DOM Elements =====
const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
const startOverBtn = document.getElementById("startOver");
const exitBtn = document.getElementById("exitBtn");

// ===== Game Setup =====
const width = 15;
let currentShooterIndex = 202;
let invadersID, goingRight = true, direction = 1;
let aliensRemoved = [], alienInvaders = [];
let results = 0, gameRunning = true;

// ===== Create Grid =====
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}
const squares = Array.from(document.querySelectorAll(".grid div"));

// ===== Create Alien Wave =====
function createWave() {
  alienInvaders = [];
  const rows = 3, cols = 10, startRow = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) alienInvaders.push(startRow * width + r * width + c);
  }
  aliensRemoved = [];
  draw();
}

// ===== Draw / Remove Invaders =====
function draw() {
  alienInvaders.forEach((index, i) => {
    if (!aliensRemoved.includes(i) && squares[index])
      squares[index].classList.add("invader");
  });
}
function remove() {
  alienInvaders.forEach(i => squares[i]?.classList.remove("invader"));
}

// ===== Shooter Controls =====
squares[currentShooterIndex].classList.add("shooter");
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  if (e.key === "ArrowLeft" && currentShooterIndex % width !== 0) currentShooterIndex--;
  if (e.key === "ArrowRight" && currentShooterIndex % width < width - 1) currentShooterIndex++;
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

// ===== Move Invaders =====
function moveInvaders() {
  if (!gameRunning) return;
  const leftEdge = alienInvaders.some(i => i % width === 0);
  const rightEdge = alienInvaders.some(i => i % width === width - 1);

  remove();

  if (rightEdge && goingRight) {
    alienInvaders = alienInvaders.map(i => i + width);
    direction = -1; goingRight = false;
  } else if (leftEdge && !goingRight) {
    alienInvaders = alienInvaders.map(i => i + width);
    direction = 1; goingRight = true;
  }

  alienInvaders = alienInvaders.map(i => i + direction);
  draw();

  // Game Over / Bottom Reached
  if (
    squares[currentShooterIndex].classList.contains("invader") &&
    squares[currentShooterIndex].classList.contains("shooter")
  ) endGame();
  if (alienInvaders.some(i => i >= squares.length - width)) endGame();

  // New Wave
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = `Score: ${results}`;
    createWave();
  }
}
invadersID = setInterval(moveInvaders, 700);

// ===== Shoot Function =====
function shoot(e) {
  if (!gameRunning || e.key !== "ArrowUp") return;

  let currentLaserIndex = currentShooterIndex;
  const laserID = setInterval(() => {
    squares[currentLaserIndex]?.classList.remove("laser");
    currentLaserIndex -= width;
    if (currentLaserIndex < 0) return clearInterval(laserID);

    squares[currentLaserIndex].classList.add("laser");
    const hitIndex = alienInvaders.indexOf(currentLaserIndex);
    if (hitIndex !== -1 && !aliensRemoved.includes(hitIndex)) {
      squares[currentLaserIndex].classList.remove("laser", "invader");
      squares[currentLaserIndex].classList.add("boom");
      setTimeout(() => squares[currentLaserIndex]?.classList.remove("boom"), 300);
      clearInterval(laserID);
      aliensRemoved.push(hitIndex);
      results++;
      resultsDisplay.innerHTML = `Score: ${results}`;
    }
  }, 100);
}
document.addEventListener("keydown", shoot);

// ===== End Game =====
function endGame() {
  gameRunning = false;
  clearInterval(invadersID);
  resultsDisplay.innerHTML = "GAME OVER";
  grid.innerHTML = "";
  document.body.classList.add("blank-screen");
  startOverBtn.style.display = "block";
}

// ===== Initialize =====
createWave();
