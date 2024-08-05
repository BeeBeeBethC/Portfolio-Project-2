const gameContainer = document.getElementById("game-container");
const flipsHolder = document.querySelector('.flipsHolder').textContent = "Flips";
const matchHolder = document.querySelector('.matchHolder').textContent = "Matches";
let cards = [];
let card1, card2;
let chosenCards = [];
let chosenCardsIds = [];
let flips = 0;
let matches = 0;

console.log('Path:','./assets/data/tile.json');

function fetch() {
fetch(resource.json)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Unexpected error occurred:' + response.status);
        }
    }
)}; 

generateBoard();
cardShuffle();

document.getElementById("game-container").innerHTML = cards;

function cardShuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = cards[i];
        cards[i] = cards[j];
        cards[j] = k;
    }

}

function generateBoard() {
    document.getElementById("game-container").innerHTML = cards;
    for (let card of cards) {
        const cardsElement = document.createElement("div");
        cardsElement.classList.add("cards");
        cardsElement.setAttribute("data-id", cards.name);
        cardsElement.innerHTML = `
            <div class="card card-back">
                <img class="back-image" src="assets/images/default.png" alt="hidden when flipped"/>
            </div>
            <div class="card card-front">
                <img class="front-image" src="assets/images/${i + 1}.png" alt="character picture"/>
            </div>`;

        cards.addEventListener('click', flipCard);
        gameContainer.appendChild(cards);
    }
}


    function checkForMatch() { // checks two cards selected and if both cards are the same the class matched is added
        card1 = chosenCardsIds[0];
        card2 = chosenCardsIds[1];
        if (chosenCards[0] === chosenCards[1]) {
            (document.querySelectorAll('img'))[card1].classList.add('matched');
            (document.querySelectorAll('img'))[card2].classList.add('matched');
        } else {
            (chosenCards[0] !== chosenCards[1]); {
                cards[card1].setAttribute('src', './assets/images/default.png');
                cards[card2].setAttribute('src', './assets/images/default.png');
                return;
            }
        }
    }