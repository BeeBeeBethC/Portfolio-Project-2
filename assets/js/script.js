const flips = document.querySelector('.flip-count').textContent = 0;
const matches = document.querySelector('.match-count').textContent = 0;
const gameContainer = document.getElementById(".game-area");
const controls = document.querySelector(".control-panel");
const outcome = document.querySelector(".outcome");
const playButton = document.getElementById("start");
const endButton = document.getElementById("stop");
let cards;
let firstCard = false;
let secondCard = false;

const items = [{
        name: "unicorn",
        image: "1.png"
    },
    {
        name: "fae-folk",
        image: "2.png"
    },
    {
        name: "alchemist",
        image: "3.png"
    },
    {
        name: "wizard",
        image: "4.png"
    },
    {
        name: "pirate",
        image: "5.png"
    },
    {
        name: "elf-folk",
        image: "6.png"
    },
    {
        name: "witch",
        image: "7.png"
    },
    {
        name: "dragon",
        image: "8.png"
    }
];
// original flips and matches count
let flipCount = 0;
let matchCount = 0;
//To calculate flips
const flipCounter = () => {
    flipCount += 1;
    flips.innerHTML = `<span>Flips:</span> ${flipCount}`
};
//To calculate matches
const matchCounter = () => {
    matchCount += 1;
    matches.innerHTML = `<span>Matches:</span> ${matchCount}`;
};
// chooses random objects from the items array
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
    for (let i = 0; i < size * size; i++) {

        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-front"></div>
            <div class="card-back">
            <img src="${cardValues[i].image}" class="image"></div>
        </div>
        `;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    flipCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        matchCount += 1;
                        if (matchCount == Math.floor(cardValues.length / 2)) {
                            outcome.innerHTML = `<h2>Well Done</h2>
                            <h4>Flips: ${flipCount}</h4>`;
                            endGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 400);
                    }
                }
            }
        });
    });
};

//play game
playButton.addEventListener("click", () => {
    flipCount = 0;
    matchCount = 0;
    controls.classList.add("hide");
    endButton.classList.remove("hide");
    playButton.classList.add("hide");
    flips.innerHTML = `<span>Flips:</span> ${flipCount}`
    matches.innerHTML = `<span>Matches:</span> ${matchCount}`;
    initializeBoard();
});
//end game
endButton.addEventListener("click", (endGame = () => {
    controls.classList.remove("hide");
    endButton.classList.add("hide");
    playButton.classList.remove("hide");
})
);
// initializing game content now 

const initializeBoard = () => {
    let cardValues = randomGenerator();
    console.log('CARDS', cardValues);
    cardMatrix(cardValues);
};