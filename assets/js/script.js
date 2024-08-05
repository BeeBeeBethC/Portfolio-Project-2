
cardsList.sort( () => 0.5 - Math.random() );

let gameGrid = document.getElementById('game-container');

const flipsHolder = document.querySelector('.flipsHolder');
const matchHolder = document.querySelector('.matchHolder');
const cardsInGame = 16;

let flips = 0;
let matches = 0;
flipsHolder.textContent = flips;
matchHolder.textContent = matches;

let chosenCards = [];
let chosenCardsIds = [];

function generateBoard(){
    for (var i = 0; i < cardsList.length; i++){
        var card = document.createElement('img');
        card.setAttribute('src', './assets/images/default.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    }
}

function flipCard(){
    if(chosenCards.length != 2){        
        var cardId = this.getAttribute('data-id');
            if(this.classList.contains('matched') || (this.getAttribute('src') == './assets/images/default.png')) {
                return;
            }
                chosenCards.push(cardsList[cardId].name);
                chosenCardsIds.push(cardId);
                this.setAttribute('src', cardsList[cardId].image);
            
            if(chosenCards.length === 2){
                setTimeout(checkForMatch, 400);
            }
        }
    }

function checkForMatch() {
    var cards = document.querySelectorAll('img');
    var firstCard = chosenCardsIds[0];
    var secondCard = chosenCardsIds[1];
    if(chosenCards[0] === chosenCards[1]) {
        cards[firstCard].classList.add('matched');
        cards[secondCard].classList.add('matched');
        matchHolder++;
    } else {
        cards[firstCard].setAttribute('src', './assets/images/default.png');
        cards[secondCard].setAttribute('src', './assets/images/default.png');
    }

    chosenCards = [];
    chosenCardsIds = [];
    flipsHolder.textContent = flips;
    matchHolder.textContent = matches;
    if(matchHolder == cardsInGame){
        alert('Well done!')
    }
}

document.addEventListener('DOMContentLoaded', function() {
    generateBoard();
});