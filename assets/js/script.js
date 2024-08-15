const gameArea = document.querySelector(".game-area");
const defaultImage = "./assets/images/default.png";
const matchCountDisplay = document.querySelector("#match-count");
let matchCount = 0;
let timeValue = document.querySelector("#time-remaining");
let shuffleCardsComplete = false;
let createDeckComplete = false;
let countdownInterval;
let card1, card2;
let isBusy = false;

const cards = [
  { name: "unicorn", image: "assets/images/1.png" },
  { name: "fae-folk", image: "assets/images/2.png" },
  { name: "alchemist", image: "assets/images/3.png" },
  { name: "wizard", image: "assets/images/4.png" },
  { name: "pirate", image: "assets/images/5.png" },
  { name: "elf-folk", image: "assets/images/6.png" },
  { name: "witch", image: "assets/images/7.png" },
  { name: "dragon", image: "assets/images/8.png" },
  { name: "unicorn", image: "assets/images/1.png" },
  { name: "fae-folk", image: "assets/images/2.png" },
  { name: "alchemist", image: "assets/images/3.png" },
  { name: "wizard", image: "assets/images/4.png" },
  { name: "pirate", image: "assets/images/5.png" },
  { name: "elf-folk", image: "assets/images/6.png" },
  { name: "witch", image: "assets/images/7.png" },
  { name: "dragon", image: "assets/images/8.png" }
];

const overlays = [
  { id: "overlay-text", loaded: "false" },
  { id: "game-over-text", loaded: "false" },
  { id: "you-won-text", loaded: "false" }
];

function startGame() {
    clearInterval(countdownInterval);
    timeValue.innerText = 90;
    matchCount = 0;
    matchCountDisplay.innerText = matchCount;
    isBusy = true;
    setTimeout(() => {
    shuffleCards();
    countdownInterval = startCountdown();
    isBusy = false;
  }, 1000);
}

// Countdown function
function startCountdown() {
    return setInterval(() => {
    let timeRemaining = parseInt(timeValue.innerText, 10);
    timeRemaining--;
    timeValue.innerText = timeRemaining;
    if (timeRemaining === 0) {
      gameOver();
    }
  }, 1000);
}

// Game over function
function gameOver() {
    clearInterval(countdownInterval);
    document.getElementById('game-over-text').classList.add('visible');
    setTimeout(() => {
    document.getElementById('game-over-text').classList.remove('visible');
    matchCount = 0;
    timeValue.innerText = 90;
    resetGamePlay();
  }, 1500);
}

// Winner function
function winner() {
    clearInterval(countdownInterval);
    document.getElementById('you-won-text').classList.add('visible');
    setTimeout(() => {
    document.getElementById('you-won-text').classList.remove('visible');
    resetGamePlay();
  }, 1500);
}

// Reset cards function
function resetCards() {
  let cardElements = document.querySelectorAll('.card');
  cardElements.forEach(card => {
    card.classList.remove('flipped');
    card.classList.remove('matched');
    card.removeEventListener("click", canFlipCard);
    card.addEventListener("click", canFlipCard);
  });
}

// Reset game play
function resetGamePlay() {
  card1 = null;
  card2 = null;
  isBusy = false;
  resetCards();
  clearInterval(countdownInterval);
  timeValue.innerText = 90;
  matchCount = 0;
  matchCountDisplay.innerText = matchCount;
}

shuffleCards();
createDeck();
loadOverlays();

// Shuffles the cards array
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = cards[i];
    cards[i] = cards[j];
    cards[j] = k;
  }
  shuffleCardsComplete = true;
  checkIfReady();
}

// Creates the deck
function createDeck() {
  gameArea.innerHTML = '';
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.setAttribute("data-order", card.image);
    cardElement.addEventListener("click", canFlipCard);
    cardElement.innerHTML = `
      <div class="card-front">
        <img alt="default-image" src=${defaultImage}>
      </div>
      <div class="card-back">
        <img class="card-face" alt="individual-character-cards" src=${card.image}>
      </div>
    `;
    gameArea.appendChild(cardElement);
  });
  createDeckComplete = true;
  checkIfReady();
}

// Loads overlays
function loadOverlays() {
  overlays.forEach(overlay => {
    const overlayElement = document.getElementById(overlay.id);
    if (overlayElement) {
      overlayElement.addEventListener("click", () => {
        overlay.loaded = true;
        overlayElement.classList.remove('visible');
        isBusy = false;
        checkIfReady();
      });
    }
  });
}

function checkIfReady() {
  if (shuffleCardsComplete && createDeckComplete && overlays.every(o => o.loaded)) {
    ready();
  }
}

function ready() {
  let overlayElements = Array.from(document.getElementsByClassName('overlay-text'));
  overlayElements.forEach(overlay => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove('visible');
      isBusy = false;
      startGame();
    });
  });
}

function canFlipCard() {
  if (isBusy || this === card1 || this.classList.contains("matched")) return;

  this.classList.add("flipped");

  if (!card1) {
    card1 = this;
    isBusy = false;
  } else {
    card2 = this;
    isBusy = true;
    checkForMatch();
  }
}

function checkForMatch() {
  if (card1 && card2) {
    if (card1.dataset.name === card2.dataset.name && card1.dataset.order === card2.dataset.order) {
      matchCount++;
      matchCountDisplay.innerText = matchCount;
      cardFreeze();
    } else {
      flipCardBack();
    }
  }
}

function cardFreeze() {
  card1.removeEventListener("click", canFlipCard);
  card1.classList.add("matched");
  card2.removeEventListener("click", canFlipCard);
  card2.classList.add("matched");
  resetSelectedCards();
  if (matchCount === 8) {
    winner();
  } else {
    isBusy = false;
  }
}

function flipCardBack() {
  setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    resetSelectedCards();
    isBusy = false;
  }, 800);
}

function resetSelectedCards() {
  card1 = null;
  card2 = null;
}