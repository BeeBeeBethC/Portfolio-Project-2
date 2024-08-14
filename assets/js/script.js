const gameArea = document.querySelector(".game-area");
const defaultImage = ("./assets/images/default.png");
const controls = document.getElementById(".controls-container");
const reset = document.getElementById(".reset");
let matches = document.getElementById("match-count");
let timeValue = document.getElementById("time");
let cards = [];
let interval; 
let card1, card2;
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
        cardElement.setAttribute("data-order", card.image);
        cardElement.addEventListener("click", flipCard);
        cardElement.innerHTML =`
            <div class="card-front">
                <img alt="default-image" src=${defaultImage}>
            </div>
            <div class="card-back">
                <img class="card-face" alt="individual-character-cards" src=${card.image}>
            </div>
        `;
        gameArea.appendChild(cardElement);
    }
}

function flipCard() {
    if (lockPlay || this === card1) return; 
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
}

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
    card1.removeEventListener("click", flipCard);
    card1.classList.add("matched");
    card2.removeEventListener("click", flipCard);
    card2.classList.add("matched");      
    resetGamePlay();
};

function flipCardBack() {
    setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        resetGamePlay();
    }, 1000);
};

function resetGamePlay() {
    card1 = null;
    card2 = null;
    lockPlay = false;
};