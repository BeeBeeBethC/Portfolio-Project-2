const gridContainer = document.querySelector(".grid-container");
//global variables
let cards = [];
let firstCard, secondCard;
// used to compare variables of two cards
let lockBoard = false;
let score = 0;
let imagePath = ".assets/data/tile.json"

document.querySelector(".score").textContent = score;
// collects data from linked json file and produces an array.
fetch("./assets/data/tile.json")
    .then(res => res.json())
    .then(data => {
        const imagePath = data.backgroundImage;
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });
// fisher-yates shuffle algorithm.
function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    generateCards();
});

function generateCards() {
    const container = document.getElementById('game-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    console.log('Container element found:', container);

}
// sets up the data from json file to provide a name to compare cards
    for (let card of cards) {
        const card = document.createElement("div");
        card.classList = 'card';
        card.setAttribute = "data-name", card.name;
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" "url(${imagePath})"/>
            </div>
            <div class="back"></div>
        `;
        
        gameContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}