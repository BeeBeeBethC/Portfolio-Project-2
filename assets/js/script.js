const cardsList = [
    { name: 'world', image: './assets/images/default.png' },
    { name: 'unicorn', image: './assets/images/1.png' },
    { name: 'unicorn', image: './assets/images/1.png' },
    { name: 'fae-folk', image: './assets/images/2.png' },
    { name: 'fae-folk', image: './assets/images/2.png' },
    { name: 'alchemist', image: './assets/images/3.png' },
    { name: 'alchemist', image: './assets/images/3.png' },
    { name: 'wizard', image: './assets/images/4.png' },
    { name: 'wizard', image: './assets/images/4.png' },
    { name: 'pirate', image: './assets/images/5.png' },
    { name: 'pirate', image: './assets/images/5.png' },
    { name: 'elven-folk', image: './assets/images/6.png' },
    { name: 'elven-folk', image: './assets/images/6.png' },
    { name: 'witch', image: './assets/images/7.png' },
    { name: 'witch', image: './assets/images/7.png' },
    { name: 'dragon', image: './assets/images/8.png' },
    { name: 'dragon', image: './assets/images/8.png' }
];
cardsList.sort( () => 0.5 - Math.random() );

var gameGrid = document.getElementById('game-container');

const flipsHolder = document.querySelector('.flipsHolder');
const matchHolder = document.querySelector('.matchHolder');
const cardsInGame = 16;

var flips = 0;
var matches = 0;
flipsHolder.textContent = flips;
matchHolder.textContent = matches;

var chosenCards = [];
var chosenCardsIds = [];

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