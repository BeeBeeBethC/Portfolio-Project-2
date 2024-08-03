
/*const gridContainer = document.querySelector(".grid-container");
//global variables
let cards = [];
let firstCard, secondCard; // used to compare variables of two cards
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

// collects data from linked json file and produces an array in console on dev tools.
async function fetchData() {
await fetch("./assets/data/tile.json")
    .then(res => res.json())
    .then(data => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

    fetchData();
}

console.log('array');

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
    const container = document.getElementById('grid-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    console.log('Container element found:', container);
// need to generate html elements in js here before generating the gridbox.

const ul = document.querySelector('.grid-container');
    const newUnorderedList = document.createElement("ul");


let x = 4;
totalPairs = (x * x) / 2;
let gridBox=``;

for (let a = 0; a < totalPairs; a++){
        for (let b = 0; b < 2; b++){ //inner for loop which in theory should generate gridbox?
            gridContainer = `${gridBox}
                <div class="card-wrap" data-cardvalue="${('a + 1')}">
                    <div class="card card-back">
                        <img class="back-image" src="assets/images/default.png" alt="back of card"/>
                    </div>
                    <div class="card card-front">
                        <img class="front-image" src="assets/images/${('a + 1')}.png alt="character picture"/>                
                    </div>
                </div>`;
        }
}}

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
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

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
    */