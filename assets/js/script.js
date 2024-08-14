const gameArea = document.querySelector(".game-area");
const defaultImage = "./assets/images/default.png";
const controls = document.querySelector(".controls-container");
let flipCount = document.getElementById("flip-count");
let timeValue = document.getElementById("time-remaining");
let cards = [];
let overlays = [];
let interval;
let card1, card2;
let lockPlay = false;
let shuffleCardsComplete = false;
let createDeckComplete = false;
let loadOverlaysComplete = false;

cards = [{
        name: "unicorn",
        image: "assets/images/1.png"
    },
    {
        name: "fae-folk",
        image: "assets/images/2.png"
    },
    {
        name: "alchemist",
        image: "assets/images/3.png"
    },
    {
        name: "wizard",
        image: "assets/images/4.png"
    },
    {
        name: "pirate",
        image: "assets/images/5.png"
    },
    {
        name: "elf-folk",
        image: "assets/images/6.png"
    },
    {
        name: "witch",
        image: "assets/images/7.png"
    },
    {
        name: "dragon",
        image: "assets/images/8.png"
    },
    {
        name: "unicorn",
        image: "assets/images/1.png"
    },
    {
        name: "fae-folk",
        image: "assets/images/2.png"
    },
    {
        name: "alchemist",
        image: "assets/images/3.png"
    },
    {
        name: "wizard",
        image: "assets/images/4.png"
    },
    {
        name: "pirate",
        image: "assets/images/5.png"
    },
    {
        name: "elf-folk",
        image: "assets/images/6.png"
    },
    {
        name: "witch",
        image: "assets/images/7.png"
    },
    {
        name: "dragon",
        image: "assets/images/8.png"
    }
];

overlays = [{
        id: "overlay-text",
        loaded: "false"
    },
    {
        id: "game-over-text",
        loaded: "false"
    },
    {
        id: "you-won-text",
        loaded: "false"
    },
];

class MysticMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.flipCount = 0;
        this.timer = document.getElementById("time-remaining");
        this.flips = document.getElementById("flip-count");
    }
    
    startGame() {
        this.flipCount = 0;
        this.timeRemaining = this.totalTime;
        this.lockPlay = true;
        setTimeout(() => {
            shuffleCards();
            this.countdown = this.startCountdown();
            this.lockPlay = false;
        }, 1000)
        this.resetGamePlay();
        this.timer.innerText = this.timeRemaining;
        this.flips.innerText = this.flipCount;
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }

    winner() {
        clearInterval(this.countdown);
        document.getElementById('you-won-text').classList.add('visible');
    }
    
    resetGamePlay() {
        card1 = null;
        card2 = null;
        lockPlay = false;
    }
};

shuffleCards();

createDeck();

ready();

// shuffles the cards array
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = cards[i];
        cards[i] = cards[j];
        cards[j] = k;
    }   
    console.log('SHUFFLE CARDS FUNCTION COMPLETE', cards);
    shuffleCardsComplete = true;
    checkIfReady();    
};

function createDeck() {
    for (let card of cards) {
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
    }   
    console.log('CREATE DECK FUNCTION COMPLETE', cards);
    createDeckComplete = true;
    checkIfReady();
};

function checkIfReady() {
    if (shuffleCardsComplete === true && createDeckComplete === true) {
        ready();
        console.log("BOTH FUNCTIONS ARE COMPLETE. READY FUNCTION CALLED");
    } else {
        console.log("WAITING FOR FUNCTIONS TO COMPLETE");
    }
};

console.log("CARDS SHUFFLED AND DECK READY", cards);

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let game = new MysticMatch(90, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
};

function canFlipCard() {
    if (lockPlay || this === card1) return;
    flipCount++;
    flipCount.innerText = document.getElementById("flip-count");
    // prevents > two cards being clicked and also disables interaction with matched cards.
    this.classList.add("flipped");
    console.log('CARD FLIPPED:', this);

    if (!card1) {
        card1 = this;
        console.log("FIRST CARD VALUES", card1);
    } else {
        card2 = this;
        console.log('SECOND CARD VALUES', card2);
        lockPlay = true;
        checkForMatch();
    }
};

// checks two cards selected and if both cards are the same cards are frozen on display.
function checkForMatch() {
    if (card1.dataset.name === card2.dataset.name && card1.dataset.order === card2.dataset.order) {
        console.log('BOTH ELEMENTS HAVE THE SAME DATA-NAME AND DATA-ORDER');
        cardFreeze();
    } else {
        if (card1.dataset.name !== card2.dataset.name && card1.dataset.order !== card2.dataset.order) {
            console.log('DATA ELEMENTS DO NOT MATCH');
            flipCardBack();
        }
    }
};

function cardFreeze() {
    card1.removeEventListener("click", canFlipCard);
    card1.classList.add("matched");
    card2.removeEventListener("click", canFlipCard);
    card2.classList.add("matched");
    resetGamePlay();
};

function flipCardBack() {
    setTimeout(() => {
        card1.classList.remove("flipped");
        card1.classList.remove("matched");
        card2.classList.remove("flipped");
        card2.classList.remove("matched");
        resetGamePlay();
    }, 800);
};

function resetGamePlay() {
    card1 = null;
    card2 = null;
    lockPlay = false;
}