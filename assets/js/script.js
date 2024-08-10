const gameArea = document.querySelector(".game-area");
const defaultImage = ("../assets/images/default.png");
let playButton = document.getElementById("start");
let resetButton = document.getElementById("stop");
let cards = [];
let card1, card2;
let flips = 0;
let matches = 0;
let lockPlay = false;

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

window.addEventListener("DOMContentLoaded", function() { 
    console.log('DOM CONTENT LOADED');
    // Code to be executed when the DOM is ready   



shuffleCards();

createDeck();

// shuffles the cards array
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = cards[i];
        cards[i] = cards[j];
        cards[j] = k;
    }
    return cards;
}

console.log('CARDS', cards);

function createDeck() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.setAttribute("order", card.image); 
        cardElement.innerHTML = `
        <div class="card-front">
            <img alt="default-image" src=${defaultImage}>
        </div>
        <div class="card-back">
            <img class="card-face" alt="individual-character-cards" src=${card.image}>
        </div>
        `;
        gameArea.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockPlay) return;
    if (this === card1) return;
    this.classList.add("flipped");
    if (!card1) {
        card1 = this;
        return;
    }

    console.log("CARD VALUES", card1, this);

    card2 = this;
    flips++;
    lockPlay = true;

    console.log('CARD VALUES', card2, this);

    checkForMatch();
}

// checks two cards selected and if both cards are the same the class matched is added
function checkForMatch() {
    card1 = cards.name, cards.image;
    card2 = cards.name, cards.image;
    if (card1 === card2) {
        cardFreeze();
    } else {
        (card1 !== card2); {
            flipCardBack();
        }
    }
};

function cardFreeze() {
    card1.classList.remove("flipped").add("matched");
    card2.classList.remove("flipped").add("matched");
    matches++;
    if (matches === 8) {
        document.querySelector(".flips").textContent = flips;
    }
    resetGamePlay();
}

function flipCardBack() {
    setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        resetGamePlay();
    }, 900);
}

function resetGamePlay() {
    firstCard = null;
    secondCard = null;
    lockPlay = false;
};

function restart() {
    resetButton.addEventListener("click", restart);
    resetGamePlay();
    shuffleCards();
    flips = 0;
    matches = 0;
    document.querySelector(".flips").textContent = flips;
    gameArea.innerHTML = "";
    createDeck();
}});