const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const startOverBtn = document.getElementById('startOver');
let currentShooterIndex = 202;
const width = 15;
let invadersID;
let goingRight = true;
let direction = 1;
let aliensRemoved = [];
let results = 0;
let gameRunning = true;

// Create grid
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}
const squares = Array.from(document.querySelectorAll('.grid div'));

// ===== HORIZONTAL INVADERS (FUNCTION FOR WAVES) =====
let alienInvaders = [];
const startRow = 0;
const numRows = 3;
const numCols = 10;

function createWave() {
  alienInvaders = [];
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      alienInvaders.push(startRow * width + r * width + c);
    }
  }
  aliensRemoved = [];
  draw();
}

function draw() {
  alienInvaders.forEach((index, i) => {
    if (!aliensRemoved.includes(i) && squares[index]) {
      squares[index].classList.add('invader');
    }
  });
}

function remove() {
  alienInvaders.forEach(index => {
    if (squares[index]) squares[index].classList.remove('invader');
  });
}

// initial wave
createWave();

// ===== SHOOTER =====
squares[currentShooterIndex].classList.add('shooter');
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter');
  if (e.key === 'ArrowLeft' && currentShooterIndex % width !== 0) currentShooterIndex -= 1;
  if (e.key === 'ArrowRight' && currentShooterIndex % width < width - 1) currentShooterIndex += 1;
  squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

// ===== MOVE INVADERS (SLOWER SPEED) =====
function moveInvaders() {
  if (!gameRunning) return;

  const leftEdge = alienInvaders.some(i => i % width === 0);
  const rightEdge = alienInvaders.some(i => i % width === width - 1);

  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width;
    }
    direction = -1;
    goingRight = false;
  } else if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width;
    }
    direction = 1;
    goingRight = true;
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  // === GAME OVER ===
  if (
    squares[currentShooterIndex].classList.contains('invader') &&
    squares[currentShooterIndex].classList.contains('shooter')
  ) {
    endGame();
  }

  // === INVADER REACHES BOTTOM ===
  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] >= squares.length - width) {
      endGame();
    }
  }

  // === NEW WAVE ===
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = `Score: ${results}`;
    createWave();
  }
}
invadersID = setInterval(moveInvaders, 700); // slower movement

// ===== SHOOT FUNCTION =====
function shoot(e) {
  if (!gameRunning) return;

  let laserID;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    if (currentLaserIndex < 0) {
      clearInterval(laserID);
      return;
    }
    squares[currentLaserIndex].classList.add('laser');

    const hitIndex = alienInvaders.indexOf(currentLaserIndex);
    if (hitIndex !== -1 && !aliensRemoved.includes(hitIndex)) {
      squares[currentLaserIndex].classList.remove('laser', 'invader');
      squares[currentLaserIndex].classList.add('boom');
      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
      clearInterval(laserID);
      aliensRemoved.push(hitIndex);
      results++;
      resultsDisplay.innerHTML = `Score: ${results}`;
    }
  }

  if (e.key === 'ArrowUp') laserID = setInterval(moveLaser, 100);
}
document.addEventListener('keydown', shoot);

// ===== END GAME =====
function endGame() {
  gameRunning = false;
  clearInterval(invadersID);
  resultsDisplay.innerHTML = 'GAME OVER';
  grid.innerHTML = ''; // clear all squares
  document.body.classList.add('blank-screen');
  startOverBtn.style.display = 'block';
}

// ===== START OVER =====
startOverBtn.addEventListener('click', () => {
  window.location.reload();
});

const exitBtn = document.getElementById('exitBtn');
exitBtn.addEventListener('click', () => {
  gameRunning = false;
  clearInterval(invadersID);
  document.body.classList.add('blank-screen');
  grid.innerHTML = '';
  resultsDisplay.innerHTML = 'Game exited.';
});
