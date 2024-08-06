const gameContainer = document.getElementById("gameContainer");
const flipsHolder = document.querySelector('.flipsHolder').textContent = "0";
const matchHolder = document.querySelector('.matchHolder').textContent = "0";
let cards = [];
let card1, card2;
let chosenCards = [];
let chosenCardsIds = [];
let flips = 0;
let matches = 0;

console.log('I AM CONNECTED');

// removing the function ensures the fetch is conducted during the page load, rather than when a function is called
fetch("assets/data/tile.json")
    .then(response => {
        console.log('IT WORKS!')
        return response.json();
    })
    .then(loadedCards => {

        // load the cards response from the tile.json file to your cards array
        cards = loadedCards;
        console.log('CARDS: ', cards)
    })
    .catch(error => console.log(error));

generateBoard(); 

function generateBoard() {

const cards = document.createElement("div");
        cards.imageContent = "cardName" + "dataImgPath";
        gameContainer.appendChild(cards);
};

cardShuffle();
/* 
fisher yates shuffle algorithm this loop loops backwards through the cards array.
*/
function cardShuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        this.cards[j].style.order = i;
        this.cards[i].style.order = cards[j];
    }
}

console.log('CARD SHUFFLE COMPLETE');

document.addEventListener("DOMContentLoaded")
console.log('DOM CONTENT READY')

function flipCard() {
    console.log("I HAVE BEEN FLIPPED MWAHAHAHA")
    this.classList.toggle('flip');
}
cards.forEach(cards => cards.addEventListener('click', flipCard));


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

function reset() {

}