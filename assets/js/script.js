const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockboard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./assets/data/tile.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });