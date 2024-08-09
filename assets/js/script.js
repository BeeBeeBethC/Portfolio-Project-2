const gameContainer = document.getElementById(".area");
const flipsHolder = document.querySelector('.flipsHolder');
const matchHolder = document.querySelector('.matchHolder');
let cards = [];
let card1, card2;
let chosenCards = [0, 1];
let chosenCardsIds = [0, 1];

const items = [{name: "unicorn", image: "1.png"}, 
               {name: "fae-folk", image: "2.png"}, 
               {name: "alchemist", image: "3.png"}, 
               {name: "wizard", image: "4.png"}, 
               {name: "pirate", image: "5.png"}, 
               {name: "elf-folk", image: "6.png"}, 
               {name: "witch", image: "7.png"}, 
               {name: "dragon", image: "8.png"}
            ];

const flipsCounter = () => {
    flipsHolder += 1;
    flipsCounter.innerHTML = `<span>Flips:</span>${flipsHolder}`
};

const matchesCounter = () => {
    matchHolder += 1;
    matchesCounter.innerHTML = `<span>Matches:</span>${matchHolder}`;
};

const randomGenerator = (size = 4) => {
    let tempArr = [...items];
    let cardValues = [];
    size = (size * size) / 2; 
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArr.length);
        cardValues.push(tempArr[randomIndex]);
        tempArr.splice(randomIndex, 1);
    }
    return cardValues;
};

const cardMatrix = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size*size; i++){

    }
};

// initializing game content now initializeBoard();

const initializeBoard = () => {
    flipsCounter = 0;
    matchesCounter = 0;
    let cardValues = randomGenerator();
    console.log('CARDS', cardValues);
    cardMatrix(cardValues);
};

function flipCard() {
    console.log("I HAVE BEEN FLIPPED MWAHAHAHA")
    this.classList.toggle('flip');
}
cards.forEach(cards => cards.addEventListener('click', flipCard));

// checks two cards selected and if both cards are the same the class matched is added
function checkForMatch() { 
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
};