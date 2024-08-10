const gameArea = document.querySelector(".game-area");
const defaultImage = ("../assets/images/default.png");
let outcome = document.getElementById(".outcome");
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
        cardElement.innerHTML = `
        <div class="card-front">
            <img src=${defaultImage}>
        </div>
        <div class="card-back">
            <img class="card-face" src=${card.image}>
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

    card2 = this;
    flips++;
    lockPlay = true;

    checkForMatch();
}

// checks two cards selected and if both cards are the same the class matched is added
function checkForMatch() {
    let isMatched = card1.dataset.name === card2.dataset.name;
    isMatched ? cardFreeze() : flipCardBack();
}

function cardFreeze() {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matches++;
    if (matches === 8) {
        document.querySelector(".matches").textContent = matches;
        document.querySelector(".flips").textContent = flips;
    }
    resetGamePlay();
}

function flipCardBack() {
    setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        resetGamePlay();
    }, 750);
}

function resetGamePlay() {
    firstCard = null;
    secondCard = null;
    lockPlay = false;
};

function restart() {
    resetGamePlay();
    shuffleCards();
    createDeck();
    resetButton.addEventListener("click", restart);
}